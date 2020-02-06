export {
  Navigate,
  Outlet,
  Redirect,
  Route,
  createRoutesFromChildren,
  generatePath,
  matchRoutes,
  resolveLocation,
  useBlocker,
  useHref,
  useLocation,
  useMatch,
  useNavigate,
  useOutlet,
  useParams,
  useResolvedLocation,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router';

export {
  Link,
  NavLink,
  Prompt,
  usePrompt,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router-dom';

/**
 * Router for Suspsense Render-as-You-Fetch
 *
 * Its usage is the same with react-router.
 *
 * @example
 * import { Router } from 'react-suspense-router';
 *
 * const history = ...;
 * const App = () => (
 *   <Router history={history} timeout={3000}>
 *     <Nav />
 *     <Suspense fallback={<span>Loading...</span>}>
 *       <MyRoutes />
 *     </Suspense>
 *   </Router>
 * );
 */
export { Router } from './Router';
export { MemoryRouter } from './MemoryRouter';

/**
 * BrowserRouter for Suspsense Render-as-You-Fetch
 *
 * Its usage is the same with react-router-dom.
 *
 * @example
 * import { BrowserRouter } from 'react-suspense-router';
 *
 * const App = () => (
 *   <BrowserRouter timeout={3000}>
 *     <Nav />
 *     <Suspense fallback={<span>Loading...</span>}>
 *       <MyRoutes />
 *     </Suspense>
 *   </BrowserRouter>
 * );
 */
export { BrowserRouter } from './BrowserRouter';
export { HashRouter } from './HashRouter';

/**
 * useRoutes for Suspense Render-as-You-Fetch
 *
 * Its usage is the same with react-router,
 * except that Route accepts `fetchData` prop.
 * Specify a result created by LazyFetcher.
 */
export { useRoutes } from './Routes';

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

// types
export { match } from './types';
