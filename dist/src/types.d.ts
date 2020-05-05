import { ReactElement } from 'react';
import { RouteMatch, PartialRouteObject, RouteObject } from 'react-router';
export declare type Match = Omit<RouteMatch, 'route'>;
declare type RouteWithElement = RouteObject & {
    element: ReactElement;
};
export declare const hasRouteElement: (route: PartialRouteObject) => route is RouteWithElement;
export {};
