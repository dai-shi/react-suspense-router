/* eslint react/no-children-prop: off */

import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useResolvedLocation,
  createRoutesFromChildren,
  useRoutes as useRoutesOrig,
  useListen, // by fork
  useLocation,
  matchRoutes,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router';

import {
  Route,
  hasRouteElement,
  match as Match,
  Location,
} from './types';
import { RouteDataProvider } from './RouteDataContext';

// HACK because RouteContext is not exported.
const EMPTY_PATHNAME = { pathname: null };
const usePathname = () => useResolvedLocation(EMPTY_PATHNAME).pathname;

const useBasename = (basenameOrig: string) => {
  const parentPathname = usePathname();
  const basename = basenameOrig
    ? `${parentPathname}/${basenameOrig}`.replace(/\/\/+/g, '/')
    : parentPathname;
  return basename;
};

type RouteDataMap = { [path: string]: object };

const attachRouteData = (
  routesOrig: Route[],
  routeDataMap: RouteDataMap,
) => routesOrig.map((route) => {
  if (!hasRouteElement(route)) return route;
  const { fetchData } = route.element.props;
  if (!fetchData) return route;
  const routeData = routeDataMap[route.path];
  return {
    ...route,
    element: routeData && (
      <RouteDataProvider data={routeData} children={route.element} />
    ),
  };
});

const createRouteDataMap = (
  matches: (Match & { route?: Route })[],
  parentParams: { [key: string]: string },
) => {
  const map: RouteDataMap = {};
  (matches || []).forEach((match: Match & { route?: Route }) => {
    const { params, pathname, route } = match;
    if (!route || !hasRouteElement(route)) return;
    const { fetchData } = route.element.props;
    if (!fetchData) return;
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
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const basename = useBasename(basenameOrig);
  const parentParams = useParams();

  const location = useLocation();
  const matches = matchRoutes(routesOrig, location, basename, caseSensitive);
  const routeDataMap = getCachedRouteDataMap(basename);
  if (Object.keys(routeDataMap).length === 0) {
    Object.assign(routeDataMap, createRouteDataMap(matches, parentParams));
  }

  const routes = attachRouteData(routesOrig, routeDataMap);
  return useRoutesOrig(routes, basenameOrig, caseSensitive);
};

export const useRoutes = isSsr ? useRoutesSsr : (
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const listen = useListen();
  const basename = useBasename(basenameOrig);
  const parentParams = useParams();

  const [routeDataMap, setRouteDataMap] = useState<RouteDataMap>(
    () => getCachedRouteDataMap(basename),
  );

  const ref = useRef<{
    routesOrig: Route[];
    basename: string;
    caseSensitive: boolean;
    parentParams: { [key: string]: string };
  }>();
  // Should we useLayoutEffect here?
  useEffect(() => {
    ref.current = {
      routesOrig,
      basename,
      caseSensitive,
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
        ref.current?.routesOrig,
        location,
        ref.current?.basename,
        ref.current?.caseSensitive,
      );
      map = createRouteDataMap(matches || [], ref.current?.parentParams || {});
      setRouteDataMap((prev) => {
        if (Object.keys(prev).length === 0 && Object.keys(map).length === 0) {
          // bail out
          return prev;
        }
        return map;
      });
    });
    return unlisten;
  }, [listen]);

  const routes = attachRouteData(routesOrig, routeDataMap);
  return useRoutesOrig(routes, basenameOrig, caseSensitive);
};

type Props = {
  basename?: string;
  caseSensitive?: boolean;
};

export const Routes: React.FC<Props> = ({
  basename = '',
  caseSensitive = false,
  children,
}) => {
  const routes = createRoutesFromChildren(children);
  return useRoutes(routes, basename, caseSensitive);
};
