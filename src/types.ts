import { ReactElement, ReactNode } from 'react';

type RouteWithElement = {
  path: string;
  element: ReactElement;
  children: ReactNode;
};

type RouteWithRedirectTo = {
  path: string;
  redirectTo: string;
};

export type Route = RouteWithElement | RouteWithRedirectTo;

export const hasRouteElement = (route: Route): route is RouteWithElement => (
  !!(route as RouteWithElement).element
);

export type match<Params extends { [K in keyof Params]?: string } = {}> = {
  params: Params;
  pathname: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type History = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HistoryEvent = any;
