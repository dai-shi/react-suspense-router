import { createContainer } from 'react-tracked';

const passDataProp = ({ data }: { data: object } = { data: {} }) => [
  // Because Suspendable by react-suspense-fetch is a mutable object,
  // we need to expand it here. Othrewise, state usage tracking
  // by react-tracked doesn't work.
  { ...data },
  null, // we don't use useUpdate
] as const;

export const {
  Provider: RouteDataProvider,
  useTrackedState: useRouteData,
  useSelector: useRouteDataSelector,
} = createContainer(passDataProp);
