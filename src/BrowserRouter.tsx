// eslint-disable-next-line spaced-comment
/// <reference types="react/experimental" />

import React, {
  SuspenseConfig,
  TransitionStartFunction,
  useRef,
  useTransition,
} from 'react';
import { Router } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';
import {
  createBrowserHistory as createBrowserHistoryOrig,
  BrowserHistoryBuildOptions,
  History,
  Location,
  Action,
} from 'history';

import { SuspensePendingProvider } from './SuspensePendingContext';

type Options = BrowserHistoryBuildOptions & {
  startTransiton: TransitionStartFunction;
};

const createBrowserHistory = (options?: Options) => {
  const history = createBrowserHistoryOrig(options);
  const { startTransiton } = options || {};
  if (startTransiton) {
    const savedListen = history.listen;
    history.listen = (listener: History.LocationListener<History.PoorMansUnknown>) => {
      const unlisten = savedListen((
        location: Location<History.PoorMansUnknown>,
        action: Action,
      ) => {
        startTransiton(() => {
          listener(location, action);
        });
      });
      return unlisten;
    };
  }
  return history;
};

type Props = BrowserRouterProps & {
  suspenseConfig?: SuspenseConfig;
};

export const BrowserRouter: React.FC<Props> = ({
  suspenseConfig,
  children,
  ...props
}) => {
  const [startTransiton, isPending] = useTransition(suspenseConfig);
  const history = useRef<History>();
  if (!history.current) {
    history.current = createBrowserHistory({
      ...props,
      startTransiton,
    });
  }
  return (
    <SuspensePendingProvider suspensePending={isPending}>
      <Router history={history.current}>
        {children}
      </Router>
    </SuspensePendingProvider>
  );
};

export default BrowserRouter;
