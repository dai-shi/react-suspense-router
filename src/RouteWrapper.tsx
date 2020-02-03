import React, { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { matchRoutes } from 'react-router';

import { RouteDataProvider } from './RouteDataContext';
import { match as Match, History, HistoryEvent } from './types';

const INITIALIZED_MAP = Symbol('INITIALIZED_MAP');

// HACK we mutate history for global cache
const getInitializedMap = <Key extends unknown, Value>(history: History) => {
  const hackedHistory = history as {
    [INITIALIZED_MAP]?: Map<Key, Value>;
  };
  let initializedMap = hackedHistory[INITIALIZED_MAP];
  if (!initializedMap) {
    initializedMap = new Map();
    hackedHistory[INITIALIZED_MAP] = initializedMap;
  }
  return initializedMap;
};

type FetchData = (m: Match) => object;

const getInitialRouteData = (
  history: History,
  fetchData: FetchData,
  path: string,
  basename: string,
  caseSensitive: boolean,
  match: Match,
) => {
  type Item = {
    data: object;
    commit: () => void;
    cleanup: () => void;
  };
  const initializedMap = getInitializedMap<string, Item>(history);
  const key = JSON.stringify({
    path,
    basename,
    caseSensitive,
    match,
  }); // HACK we need a consistent key in concurrent mode
  if (!initializedMap.has(key)) {
    const data = fetchData(match);
    const timer = setTimeout(() => {
      initializedMap.delete(key);
    }, 30 * 1000); // HACK 30 sec cleanup timeout
    const commit = () => {
      clearTimeout(timer);
    };
    const cleanup = () => {
      initializedMap.delete(key);
      clearTimeout(timer);
    };
    initializedMap.set(key, { data, commit, cleanup });
  }
  return initializedMap.get(key) as Item;
};

type Props = {
  history: History;
  routePath: string;
  basename: string;
  caseSensitive: boolean;
  fetchData: FetchData;
  match: Match;
};

export const RouteWrapper: React.FC<Props> = ({
  history,
  routePath,
  basename,
  caseSensitive,
  fetchData,
  match,
  children,
}) => {
  const commit = useRef<() => void>();
  const cleanup = useRef<() => void>();
  const [routeData, setRouteData] = useState<object>(() => {
    const item = getInitialRouteData(
      history,
      fetchData,
      routePath,
      basename,
      caseSensitive,
      match,
    );
    commit.current = item.commit;
    cleanup.current = item.cleanup;
    return item.data;
  });
  useEffect(() => {
    const unlisten = history.listen(({ location }: HistoryEvent) => {
      if (commit.current) commit.current();
      const matches = matchRoutes([{ path: routePath }], location, basename, caseSensitive);
      if (matches && matches.length) {
        // TODO we do not have parentParams here
        const m: Match = {
          params: matches[0].params,
          pathname: matches[0].pathname,
        };
        setRouteData(fetchData(m));
        if (cleanup.current) cleanup.current();
      }
    });
    // FIXME route could be change before this effect is handled?
    return () => {
      if (cleanup.current) cleanup.current();
      unlisten();
    };
  }, [history, routePath, basename, caseSensitive, fetchData]);
  return (
    <RouteDataProvider data={routeData}>
      {children}
    </RouteDataProvider>
  );
};

export default RouteWrapper;
