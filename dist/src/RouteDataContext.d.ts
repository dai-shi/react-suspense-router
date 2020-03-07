import React from 'react';
export declare const RouteDataProvider: React.FC<{
    data: object;
    setNotify: (notify: () => void) => void;
}>;
export declare const useRouteData: () => unknown;
export declare const useRouteDataSelector: <V>(selector: (state: object) => V, equalityFn?: import("react-tracked").EqlFn<V> | undefined) => V;
