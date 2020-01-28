import { match as Match } from 'react-router';
export declare const LazyFetcher: <T extends object, P>(factory: () => Promise<{
    default: (m: Match<P>) => T;
}>) => (match: Match<P>) => import("react-suspense-fetch").Suspendable<T, readonly [import("react-suspense-fetch").Suspendable<{
    default: (m: Match<P>) => T;
}, unknown>, Match<P>]>;
export default LazyFetcher;
