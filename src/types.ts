import { isValidElement, ReactElement } from 'react';
import { RouteMatch, PartialRouteObject, RouteObject } from 'react-router';

export type Match = Omit<RouteMatch, 'route'>;

type RouteWithElement = RouteObject & {
  element: ReactElement;
};

export const hasRouteElement = (
  route: PartialRouteObject,
): route is RouteWithElement => (
  isValidElement((route as RouteWithElement).element)
);
