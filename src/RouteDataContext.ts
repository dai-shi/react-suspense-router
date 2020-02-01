import { createContainer } from 'react-tracked';

const passDataProp = ({ data }: { data: object | null }) => [
  // Because Suspendable by react-suspense-fetch is a mutable object,
  // we need to wrap it here. Othrewise, state usage tracking
  // by react-tracked doesn't work.
  // XXX we now have triple Proxies. It should be improved.
  data && new Proxy(data, {}),
  null, // we don't use useUpdate
] as const;

export const {
  Provider: RouteDataProvider,
  useTrackedState: useRouteData,
  useSelector: useRouteDataSelector,
} = createContainer(passDataProp);
