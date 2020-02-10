export { Router, MemoryRouter, Navigate, Outlet, Redirect, Route, createRoutesFromChildren, generatePath, matchRoutes, resolveLocation, useBlocker, useHref, useLocation, useMatch, useNavigate, useOutlet, useParams, useResolvedLocation, usePending, } from 'react-router';
export { BrowserRouter, HashRouter, Link, NavLink, Prompt, usePrompt, } from 'react-router-dom';
export { StaticRouter } from './StaticRouter';
/**
 * Routes for Suspense Render-as-You-Fetch
 *
 * Its usage is the same with react-router,
 * except that Route accepts `fetchData` prop.
 * Specify a result created by LazyFetcher.
 *
 * @example
 * import { Routes, Route } from 'react-suspense-router';
 *
 * const MyRoutes = () => (
 *   <Routes>
 *     <Route path="/" element={<Index />} />
 *     <Route path="/double/:number" element={<Double />} fetchData={fetchDouble} />
 *   </Routes>
 * );
 */
export { Routes } from './Routes';
/**
 * useRoutes for Suspense Render-as-You-Fetch
 *
 * Its usage is the same with react-router,
 * except that Route accepts `fetchData` prop.
 * Specify a result created by LazyFetcher.
 */
export { useRoutes } from './Routes';
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
export { match } from './types';
