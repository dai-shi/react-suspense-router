/* eslint react/no-children-prop: off */

import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useResolvedLocation,
  createRoutesFromChildren,
  useRoutes as useRoutesOrig,
  useListen,
  matchRoutes,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router';

import {
  Route,
  hasRouteElement,
  match as Match,
  HistoryEvent,
} from './types';
import { RouteDataProvider } from './RouteDataContext';

// HACK because RouteContext is not exported.
const EMPTY_PATHNAME = { pathname: null };
const usePathname = () => useResolvedLocation(EMPTY_PATHNAME).pathname;

export const useRoutes = (
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

  const [routeDataMap, setRouteDataMap] = useState<{ [path: string]: object }>({});

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
    const callback = (location: HistoryEvent['location']) => {
      const matches = matchRoutes(
        ref.current?.routesOrig,
        location,
        ref.current?.basename,
        ref.current?.caseSensitive,
      );
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
        setRouteDataMap((prev) => ({ ...prev, [route.path]: routeData }));
      });
    };
    const unlisten = listen((location: HistoryEvent['location']) => {
      callback(location);
    });
    return unlisten;
  }, [listen]);

  const routes = routesOrig.map((route) => {
    if (!hasRouteElement(route)) return route;
    const { fetchData } = route.element.props;
    if (!fetchData) return route;
    const routeData = routeDataMap[route.path] as object | undefined;
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
