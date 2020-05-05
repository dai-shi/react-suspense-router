/* eslint react/no-children-prop: off */

import React, { useEffect, useState, useRef } from 'react';
import { Location } from 'history';
import {
  useParams,
  useResolvedLocation,
  createRoutesFromChildren,
  useRoutes as useRoutesOrig,
  useLocationListen, // by fork
  useLocation,
  matchRoutes,
  RouteMatch,
  PartialRouteObject,
  RouteObject,
  createRoutesFromArray,
} from 'react-router';

import { RouteDataProvider } from './RouteDataContext';

import { hasRouteElement, Match } from './types';


// HACK because RouteContext is not exported.
const EMPTY_PATHNAME = { pathname: undefined };
const usePathname = () => useResolvedLocation(EMPTY_PATHNAME).pathname;

const useBasename = (basenameOrig: string) => {
  const parentPathname = usePathname();
  const basename = basenameOrig
    ? `${parentPathname}/${basenameOrig}`.replace(/\/\/+/g, '/')
    : parentPathname;
  return basename;
};

type RouteDataMap = { [path: string]: object };
type RouteNotifyMap = Map<string, () => void>;

const attachRouteData = (
  routesOrig: RouteObject[],
  routeDataMap: RouteDataMap,
  routeNotifyMap?: RouteNotifyMap,
) => routesOrig.map((route) => {
  if (!hasRouteElement(route)) return route;
  const { fetchData } = route.element.props as { fetchData: unknown };
  if (typeof fetchData !== 'function') return route;
  const routeData = routeDataMap[route.path];
  const setNotify = (notify: () => void) => {
    if (routeNotifyMap) {
      routeNotifyMap.set(route.path, notify);
    }
  };
  return {
    ...route,
    element: routeData && (
      <RouteDataProvider data={routeData} setNotify={setNotify} children={route.element} />
    ),
  };
});

const createRouteDataMap = (
  matches: RouteMatch[] | null,
  parentParams: { [key: string]: string },
) => {
  const map: RouteDataMap = {};
  (matches || []).forEach((match: RouteMatch) => {
    const { params, pathname, route } = match;
    if (!route || !hasRouteElement(route)) return;
    const { fetchData } = route.element.props as { fetchData: unknown };
    if (typeof fetchData !== 'function') return;
    const m: Match = {
      params: { ...parentParams, ...params },
      pathname,
    };
    const routeData = fetchData(m);
    map[route.path] = routeData;
  });
  return map;
};

const getCachedRouteDataMap = (basename: string) => {
  try {
    const cache = (window as unknown as {
      __ROUTE_DATA_MAP_CACHE__: { [basename: string]: RouteDataMap };
    }).__ROUTE_DATA_MAP_CACHE__;
    if (!cache[basename]) {
      cache[basename] = {};
    }
    return cache[basename];
  } catch (e) {
    return {} as RouteDataMap;
  }
};

const consumeCachedRouteDataMap = (basename: string) => {
  try {
    const cache = (window as unknown as {
      __ROUTE_DATA_MAP_CACHE__: { [basename: string]: RouteDataMap };
    }).__ROUTE_DATA_MAP_CACHE__;
    if (cache[basename]) {
      delete cache[basename];
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

// for ssr
const isSsr = (
  typeof window === 'undefined'
  || typeof window.navigator === 'undefined'
  || `${window.navigator.userAgent}`.includes('ServerSideRendering')
);

const useRoutesSsr = (
  partialRoutesOrig: PartialRouteObject[],
  basenameOrig = '',
) => {
  const routesOrig = createRoutesFromArray(partialRoutesOrig);
  const basename = useBasename(basenameOrig);
  const parentParams = useParams();

  const location = useLocation();
  const matches = matchRoutes(routesOrig, location, basename);
  const routeDataMap = getCachedRouteDataMap(basename);
  if (Object.keys(routeDataMap).length === 0) {
    Object.assign(routeDataMap, createRouteDataMap(matches, parentParams));
  }

  const routes = attachRouteData(routesOrig, routeDataMap);
  return useRoutesOrig(routes, basenameOrig);
};

export const useRoutes = isSsr ? useRoutesSsr : (
  partialRoutesOrig: PartialRouteObject[],
  basenameOrig = '',
) => {
  const routesOrig = createRoutesFromArray(partialRoutesOrig);
  const listen = useLocationListen();
  const basename = useBasename(basenameOrig);
  const parentParams = useParams();

  const [routeDataMap, setRouteDataMap] = useState<RouteDataMap>(
    () => getCachedRouteDataMap(basename),
  );
  const routeNotifyMap = useRef<RouteNotifyMap>(new Map());

  const ref = useRef<{
    routesOrig: RouteObject[];
    basename: string;
    parentParams: { [key: string]: string };
  }>();
  // Should we useLayoutEffect here?
  useEffect(() => {
    ref.current = {
      routesOrig,
      basename,
      parentParams,
    };
  });

  useEffect(() => {
    let map: RouteDataMap = {};
    const unlisten = listen((location: Location) => {
      if (consumeCachedRouteDataMap(ref.current?.basename || '')) {
        // we assume hydration this time
        return;
      }
      const matches = matchRoutes(
        ref.current?.routesOrig || [],
        location,
        ref.current?.basename,
      );
      map = createRouteDataMap(matches || [], ref.current?.parentParams || {});
      setRouteDataMap((prev) => {
        if (Object.keys(prev).length === 0 && Object.keys(map).length === 0) {
          // bail out
          return prev;
        }
        return map;
      });
      Object.keys(map).forEach((path) => {
        const notify = routeNotifyMap.current.get(path);
        if (notify) notify();
      });
    });
    return unlisten;
  }, [listen]);

  const routes = attachRouteData(routesOrig, routeDataMap, routeNotifyMap.current);
  return useRoutesOrig(routes, basenameOrig);
};

type Props = {
  basename?: string;
};

export const Routes: React.FC<Props> = ({
  basename = '',
  children,
}) => {
  const routes = createRoutesFromChildren(children);
  return useRoutes(routes, basename);
};
