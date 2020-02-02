/* eslint camelcase: off */
/* eslint @typescript-eslint/camelcase: off */

import { createContainer } from 'react-tracked';

const passDataProp = ({ data }: { data: object | null }) => [
  data,
  null, // we don't use useUpdate
] as const;

const {
  Provider,
  useTrackedState,
  useSelector,
} = createContainer(passDataProp);

export const RouteDataProvider = Provider;

type UseTrackedState = <State>(opts: {
  unstable_ignoreStateEquality?: boolean;
}) => State;

export const useRouteData = () => (useTrackedState as UseTrackedState)({
  // Because Suspendable by react-suspense-fetch is a mutable object,
  // we need this special mode to handle it.
  unstable_ignoreStateEquality: true,
});

export const useRouteDataSelector = useSelector;
