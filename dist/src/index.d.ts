export { MemoryRouter, Prompt, Redirect, Router, StaticRouter, // TODO?
Switch, // TODO
generatePath, matchPath, withRouter, useHistory, useLocation, useParams, useRouteMatch, match, } from 'react-router';
export { HashRouter, // TODO
Link, NavLink, } from 'react-router-dom';
/**
 * BrowserRouter for Suspsense
 *
 * This accepts `suspenseConfig` prop for useTransition.
 *
 * @example
 * import { BrowserRouter } from 'react-suspense-router';
 *
 * const App = () => (
 *   <BrowserRouter suspenseConfig={{ timeoutMs: 3000 }}>
 *     <Nav />
 *     <Suspense fallback={<span>Loading...</span>}>
 *       <Routes />
 *     </Suspense>
 *   </BrowserRouter>
 * );
 */
export { BrowserRouter } from './BrowserRouter';
/**
 * LazyFetcher
 *
 * This will be used like React.lazy, but for route data.
 *
 * @example
 * import { LazyFetcher } from 'react-suspense-router';
 *
 * const fetchUserData = LazyFetcher(() => import('./pages/User.data'));
 */
export { LazyFetcher } from './LazyFetcher';
/**
 * Route for Suspense
 *
 * This accepts `fetchData` prop for route data.
 * It is usaually loaded by `LazyFetcher`.
 *
 * @example
 * import { Route } from 'react-suspense-router';
 *
 * const Routes = () => (
 *   <>
 *     <Route exact path="/">
 *       <Index />
 *     </Route>
 *     <Route exact path="/user/:uid" fetchData={fetchUserData}>
 *       <User />
 *     </Route>
 *   </>
 * );
 */
export { Route } from './Route';
/**
 * useRouteData hook
 *
 * This will return route data in components inside a route.
 * It utilizes proxy-based tracking by React Tracked.
 *
 * @example
 * import { useRouteData } from 'react-suspense-fetch';
 *
 * const FirstName = () => {
 *   const userData = useRouteData();
 *   return <div>userData.firstName</div>
 * };
 */
export { useRouteData } from './RouteDataContext';
/**
 * useRouteDataSelector hook
 *
 * This will return route data in components inside a route.
 * It takes a selector function.
 * Use this if proxy-based tracking doesn't work.
 *
 * @example
 * import { useRouteDataSelector } from 'react-suspense-fetch';
 *
 * const selectFirstName = data => data.firstName;
 * const FirstName = () => {
 *   const firstName = useRouteDataSelector(selectFirstName);
 *   return <div>firstName</div>
 * };
 */
export { useRouteDataSelector } from './RouteDataContext';
/**
 * useSuspensePending hook
 *
 * This will return isPending boolean from useTransition in Router.
 *
 * @example
 * import { useSuspensePending } from 'react-suspense-router';
 *
 * const Nav = () => {
 *   const isPending = useSuspensePending();
 *   return (
 *     <div>
 *       {isPending && 'Pending...'}
 *       ...
 *     </div>
 *   );
 * };
 */
export { useSuspensePending } from './SuspensePendingContext';
