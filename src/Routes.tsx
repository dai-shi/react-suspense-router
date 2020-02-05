/* eslint react/no-children-prop: off */

import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useResolvedLocation,
  createRoutesFromChildren,
  useRoutes as useRoutesOrig,
  useLocation,
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
import { useHistory } from './HistoryContext';
import { RouteDataProvider } from './RouteDataContext';

// HACK because RouteContext is not exported.
const EMPTY_PATHNAME = { pathname: null };
const usePathname = () => useResolvedLocation(EMPTY_PATHNAME).pathname;

export const useRoutes = (
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const history = useHistory();
  const parentPathname = usePathname();
  const parentParams = useParams();
  const initialLocation = useRef(useLocation());

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
    const callback = ({ location }: HistoryEvent) => {
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
    const unlisten = history.listen(callback);
    callback({ location: initialLocation.current });
    return unlisten;
  }, [history]);

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
