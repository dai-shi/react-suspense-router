/// <reference types="react" />
/// <reference types="react/experimental" />
export declare const RouteDataProvider: import("react").ComponentType<{
    data: object | null;
}>;
export declare const useRouteData: () => unknown;
export declare const useRouteDataSelector: <V>(selector: (state: object | null) => V, equalityFn?: import("react-tracked").EqlFn<V> | undefined) => V;
