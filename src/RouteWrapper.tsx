import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { matchRoutes } from 'react-router';

import { RouteDataProvider } from './RouteDataContext';
import { match as Match, History, HistoryEvent } from './types';

const INITIALIZED_MAP = Symbol('INITIALIZED_MAP');

// HACK
const getInitializedMap = (history: History) => {
  const hackedHistory = history as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [INITIALIZED_MAP]?: Map<any, any>;
  };
  let initializedMap = hackedHistory[INITIALIZED_MAP];
  if (!initializedMap) {
    initializedMap = new Map();
    hackedHistory[INITIALIZED_MAP] = initializedMap;
  }
  return initializedMap;
};

type FetchData = (m: Match) => object;

// we somehow need global cache
// HACK it there any better way???
const getInitialRouteData = (
  history: History,
  fetchData: FetchData,
  path: string,
  basename: string,
  caseSensitive: boolean,
  match: Match,
) => {
  const initializedMap = getInitializedMap(history);
  const key = JSON.stringify({
    path,
    basename,
    caseSensitive,
    match,
  }); // HACK
  if (!initializedMap.has(key)) {
    initializedMap.set(
      key,
      match ? fetchData(match) : null,
    );
    // FIXME no cleanup
  }
  return initializedMap.get(key) as object | null;
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
  const [routeDataState, setRouteData] = useState<object | null>(null);
  const routeData = (routeDataState === null ? getInitialRouteData(
    history,
    fetchData,
    routePath,
    basename,
    caseSensitive,
    match,
  ) : routeDataState);
  useEffect(() => {
    const unlisten = history.listen(({ location }: HistoryEvent) => {
      const matches = matchRoutes([{ path: routePath }], location, basename, caseSensitive);
      if (matches && matches.length) {
        // TODO we do not have parentParams here
        const m: Match = {
          params: matches[0].params,
          pathname: matches[0].pathname,
        };
        setRouteData(fetchData(m));
      }
    });
    // FIXME route could be change before this effect is handled?
    return unlisten;
  }, [history, routePath, basename, caseSensitive, fetchData]);
  return (
    <RouteDataProvider data={routeData}>
      {children}
    </RouteDataProvider>
  );
};

export default RouteWrapper;
