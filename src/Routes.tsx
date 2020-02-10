/* eslint react/no-children-prop: off */

import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useResolvedLocation,
  createRoutesFromChildren,
  useRoutes as useRoutesOrig,
  useListen,
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

const isSsr = typeof window === 'undefined' || !!(window as { isSsr?: boolean }).isSsr;
const cacheForSsr: { [basename: string]: Map<string, object> } = {};

const useRoutesSsr = (
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const parentPathname = usePathname();
  const parentParams = useParams();

  const basename = basenameOrig
    ? `${parentPathname}/${basenameOrig}`.replace(/\/\/+/g, '/')
    : parentPathname;

  const location = useLocation();
  const matches = matchRoutes(
    routesOrig,
    location,
    basename,
    caseSensitive,
  );
  let routeDataMap = cacheForSsr[basename];
  if (!routeDataMap) {
    routeDataMap = new Map<string, object>();
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
      routeDataMap.set(route.path, routeData);
    });
    cacheForSsr[basename] = routeDataMap;
  }

  const routes = routesOrig.map((route) => {
    if (!hasRouteElement(route)) return route;
    const { fetchData } = route.element.props;
    if (!fetchData) return route;
    const routeData = routeDataMap.get(route.path);
    return {
      ...route,
      element: routeData && (
        <RouteDataProvider data={routeData} children={route.element} />
      ),
    };
  });

  return useRoutesOrig(routes, basenameOrig, caseSensitive);
};

export const useRoutes = isSsr ? useRoutesSsr : (
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const listen = useListen();
  const parentPathname = usePathname();
  const parentParams = useParams();

  const basename = basenameOrig
    ? `${parentPathname}/${basenameOrig}`.replace(/\/\/+/g, '/')
    : parentPathname;

  const [routeDataMap, setRouteDataMap] = useState(new Map<string, object>());

  const ref = useRef<{
    routesOrig: Route[];
    basename: string;
    caseSensitive: boolean;
    parentParams: { [key: string]: string };
  }>();
  useEffect(() => {
    ref.current = {
      routesOrig,
      basename,
      caseSensitive,
      parentParams,
    };
  });

  useEffect(() => {
    let map = new Map<string, object>();
    const unlisten = listen((location: Location) => {
      const matches = matchRoutes(
        ref.current?.routesOrig,
        location,
        ref.current?.basename,
        ref.current?.caseSensitive,
      );
      map = new Map<string, object>();
      (matches || []).forEach((match: Match & { route?: Route }) => {
        const { params, pathname, route } = match;
        if (!route || !hasRouteElement(route)) return;
        const { fetchData } = route.element.props;
        if (!fetchData) return;
        const m: Match = {
          params: { ...ref.current?.parentParams, ...params },
          pathname,
        };
        const routeData = fetchData(m);
        map.set(route.path, routeData);
      });
      setRouteDataMap((prev) => {
        if (prev.size === 0 && map.size === 0) return prev; // bail out
        return map;
      });
    });
    return unlisten;
  }, [listen]);

  const routes = routesOrig.map((route) => {
    if (!hasRouteElement(route)) return route;
    const { fetchData } = route.element.props;
    if (!fetchData) return route;
    const routeData = routeDataMap.get(route.path);
    return {
      ...route,
      element: routeData && (
        <RouteDataProvider data={routeData} children={route.element} />
      ),
    };
  });

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
