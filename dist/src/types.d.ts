import { ReactElement, ReactNode } from 'react';
declare type RouteWithElement = {
    path: string;
    element: ReactElement;
    children: ReactNode;
};
declare type RouteWithRedirectTo = {
    path: string;
    redirectTo: string;
};
export declare type Route = RouteWithElement | RouteWithRedirectTo;
export declare const hasRouteElement: (route: Route) => route is RouteWithElement;
export declare type match<Params extends {
    [K in keyof Params]?: string;
} = {}> = {
    params: Params;
    pathname: string;
};
export declare type History = any;
export declare type HistoryEvent = any;
export {};
