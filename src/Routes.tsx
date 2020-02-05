/* eslint react/no-children-prop: off */

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
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

  useEffect(() => {
    const callback = ({ location }: HistoryEvent) => {
      const matches = matchRoutes(
        routesOrig,
        location,
        basename,
        caseSensitive,
      );
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
        setRouteDataMap((prev) => ({ ...prev, [route.path]: routeData }));
      });
    };
    const unlisten = history.listen(callback);
    callback({ location: initialLocation.current });
    return unlisten;
  }, [history, routesOrig, basename, caseSensitive, parentParams]);

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
  const routes = useMemo(
    () => createRoutesFromChildren(children),
    [children],
  );
  return useRoutes(routes, basename, caseSensitive);
};
