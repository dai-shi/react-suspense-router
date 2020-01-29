/// <reference types="react" />
/// <reference types="react/experimental" />
export declare const RouteDataProvider: import("react").ComponentType<{
    data: object | null;
}>, useRouteData: () => {} | null, useRouteDataSelector: <V>(selector: (state: {} | null) => V, equalityFn?: import("react-tracked").EqlFn<V> | undefined) => V;
