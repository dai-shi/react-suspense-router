/// <reference types="react" />
/// <reference types="react/experimental" />
export declare const RouteDataProvider: import("react").ComponentType<{
    data: object;
}>, useRouteData: () => {}, useRouteDataSelector: <V>(selector: (state: {}) => V, equalityFn?: import("react-tracked").EqlFn<V> | undefined) => V;
