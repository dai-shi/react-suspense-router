import { match as Match } from './types';
declare type FetchFunc<T extends object, P> = (m: Match<P>) => Promise<T>;
export declare const FetchData: <T extends object, P>(fetchFunc: FetchFunc<T, P>) => (match: Match<P>) => import("react-suspense-fetch").Suspendable<T, Match<P>>;
export declare const FetchDataLazy: <T extends object, P>(factory: () => Promise<{
    default: FetchFunc<T, P>;
}>) => (match: Match<P>) => import("react-suspense-fetch").Suspendable<T, readonly [import("react-suspense-fetch").Suspendable<{
    default: FetchFunc<T, P>;
}, unknown>, Match<P>]>;
export {};
