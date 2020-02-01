import React, { createElement, useMemo } from 'react';
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

import { Route, match as Match, hasRouteElement } from './types';
import { RouteWrapper } from './RouteWrapper';
import { useHistory } from './HistoryContext';

// HACK because RouteContext is not exported.
const EMPTY_PATHNAME = { pathname: null };
const usePathname = () => useResolvedLocation(EMPTY_PATHNAME).pathname;

export const useRoutes = (
  routesOrig: Route[],
  basenameOrig = '',
  caseSensitive = false,
) => {
  const history = useHistory();
  const location = useLocation();
  const parentPathname = usePathname();
  const parentParams = useParams();

  const basename = basenameOrig
    ? `${parentPathname}/${basenameOrig}`.replace(/\/\/+/g, '/')
    : parentPathname;

  const matches = useMemo(
    () => matchRoutes(routesOrig, location, basename, caseSensitive),
    [routesOrig, location, basename, caseSensitive],
  );

  const routes = [...routesOrig];
  (matches || []).forEach((match: Match & { route?: Route }) => {
    if (!match.route) return;
    const routeIndex = routes.indexOf(match.route);
    if (routeIndex === -1) return;
    const route = routes[routeIndex];
    if (!hasRouteElement(route)) return;
    const { fetchData } = route.element.props;
    if (!fetchData) return;
    const params = { ...parentParams, ...match.params };
    const element = createElement(RouteWrapper, {
      history,
      routePath: route.path,
      basename,
      caseSensitive,
      fetchData,
      match: { params, pathname: match.pathname },
    }, route.element);
    routes[routeIndex] = { ...route, element };
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
