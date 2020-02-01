// eslint-disable-next-line spaced-comment
/// <reference types="react/experimental" />

import React, {
  TransitionStartFunction,
  useRef,
  useTransition,
} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Router } from 'react-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { createBrowserHistory } from 'history';

import { History, HistoryEvent } from './types';
import { HistoryProvider } from './HistoryContext';
import { SuspensePendingProvider } from './SuspensePendingContext';

type Props = {
  timeout?: number;
  window?: unknown;
};

const wrapHistory = (startTransiton: TransitionStartFunction) => (history: History) => {
  const listen = (listener: (e: HistoryEvent) => void) => {
    const unlisten = history.listen((e: HistoryEvent) => {
      startTransiton(() => {
        listener(e);
      });
    });
    return unlisten;
  };
  return { ...history, listen };
};

export const BrowserRouter: React.FC<Props> = ({
  timeout,
  window,
  children,
}) => {
  const [startTransiton, isPending] = useTransition(timeout ? { timeoutMs: timeout } : null);
  const history = useRef<History>();
  if (!history.current) {
    history.current = wrapHistory(startTransiton)(createBrowserHistory({ window }));
  }
  return (
    <HistoryProvider history={history.current}>
      <SuspensePendingProvider suspensePending={isPending}>
        <Router history={history.current} timeout={timeout}>
          {children}
        </Router>
      </SuspensePendingProvider>
    </HistoryProvider>
  );
};

export default BrowserRouter;
