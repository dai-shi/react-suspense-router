// eslint-disable-next-line spaced-comment
/// <reference types="react/experimental" />

import React, {
  TransitionStartFunction,
  useRef,
  useTransition,
} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Router as RouterOrig } from 'react-router';

import { History, HistoryEvent } from './types';
import { HistoryProvider } from './HistoryContext';
import { SuspensePendingProvider } from './SuspensePendingContext';

type Props = {
  history: History;
  timeout?: number;
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

export const Router: React.FC<Props> = ({
  history,
  timeout = 2000,
  children,
}) => {
  const [startTransiton, isPending] = useTransition({ timeoutMs: timeout });
  const historyRef = useRef<History>();
  if (!historyRef.current) {
    historyRef.current = wrapHistory(startTransiton)(history);
  }
  return (
    <HistoryProvider history={historyRef.current}>
      <SuspensePendingProvider suspensePending={isPending}>
        <RouterOrig history={historyRef.current} timeout={timeout}>
          {children}
        </RouterOrig>
      </SuspensePendingProvider>
    </HistoryProvider>
  );
};

export default Router;
