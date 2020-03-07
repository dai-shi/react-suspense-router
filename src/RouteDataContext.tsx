/* eslint camelcase: off */
/* eslint @typescript-eslint/camelcase: off */

import React, { useEffect } from 'react';
import { createContainer } from 'react-tracked';

const noop = () => null;

const passDataProp = ({ data }: { data: object }) => [
  data,
  noop, // dummy update function, only used to notify updates
] as const;

const {
  Provider,
  useUpdate,
  useTrackedState,
  useSelector,
} = createContainer(passDataProp);

const SetNotify: React.FC<{
  setNotify: (notify: () => void) => void;
}> = ({ setNotify }) => {
  const notify = useUpdate();
  useEffect(() => {
    setNotify(notify);
  });
  return null;
};

export const RouteDataProvider: React.FC<{
  data: object;
  setNotify: (notify: () => void) => void;
}> = ({ data, setNotify, children }) => (
  <Provider data={data}>
    <SetNotify setNotify={setNotify} />
    {children}
  </Provider>
);

type UseTrackedState = <State>(opts: {
  unstable_ignoreStateEquality?: boolean;
}) => State;

export const useRouteData = () => (useTrackedState as UseTrackedState)({
  // Because Suspendable by react-suspense-fetch is a mutable object,
  // we need this special mode to handle it.
  unstable_ignoreStateEquality: true,
});

export const useRouteDataSelector = useSelector;
