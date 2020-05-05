import { Match } from './types';
declare type FetchFunc<T extends object> = (m: Match) => Promise<T>;
export declare const FetchData: <T extends object>(fetchFunc: FetchFunc<T>) => (match: Pick<import("react-router").RouteMatch, "pathname" | "params">) => import("react-suspense-fetch").Suspendable<T, Pick<import("react-router").RouteMatch, "pathname" | "params">>;
export declare const FetchDataLazy: <T extends object>(factory: () => Promise<{
    default: FetchFunc<T>;
}>) => (match: Pick<import("react-router").RouteMatch, "pathname" | "params">) => import("react-suspense-fetch").Suspendable<T, readonly [import("react-suspense-fetch").Suspendable<{
    default: FetchFunc<T>;
}, unknown>, Pick<import("react-router").RouteMatch, "pathname" | "params">]>;
export {};
