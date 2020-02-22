export {
  Router,
  MemoryRouter,
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

  usePending, // by fork
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router';

export {
  BrowserRouter,
  HashRouter,
  Link,
  NavLink,
  Prompt,
  usePrompt,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router-dom';

export {
  StaticRouter,
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
} from 'react-router-dom/server';

/**
 * Routes for Suspense Render-as-You-Fetch
 *
 * Its usage is the same with react-router,
 * except that Route accepts `fetchData` prop.
 * Specify a function created by FetchData or FetchDataLazy.
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
 * Specify a function created by FetchData or FetchDataLazy.
 */
export { useRoutes } from './Routes';

/**
 * FetchData
 *
 * This will wrap an async function and create `fetchData`
 * that canbe passed to `fetchData` prop in <Route>.
 *
 * @example
 * import { FetchData, Route } from 'react-suspense-router';
 *
 * const fetchDouble = FetchData(async (match) => {
 *   await sleep(1000);
 *   return { result: match.params.number * 2 };
 * });
 *
 * <Route path="..." element={...} fetchData={fetchDouble} />
 */
export { FetchData } from './FetchData';

/**
 * FetchDataLazy
 *
 * This is lazy loading version of FetchData.
 * It will be used like React.lazy, but for route data.
 *
 * @example
 * import { FetchDataLazy, Route } from 'react-suspense-router';
 *
 * const fetchUserData = FetchDataLazy(() => import('./pages/User.data'));
 *
 * <Route path="..." element={...} fetchData={fetchUserData} />
 */
export { FetchDataLazy } from './FetchData';

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

// types
export { match } from './types';
