import React, { useEffect, useState } from 'react';
import {
  RouteProps,
  match as Match,
  Route as OrigRoute,
  matchPath,
  useHistory,
} from 'react-router';
import {
  Location,
  History,
} from 'history';

import { RouteDataProvider } from './RouteDataContext';

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

// HACK
const removeCircular = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seen: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (key: any, val: any) => {
    if (key === 'children') return null;
    if (seen.includes(val)) return null;
    seen.push(val);
    return val;
  };
};

type FetchData = (m: Match) => object;

// we somehow need global cache
// HACK it there any better way???
const getInitialRouteData = (
  history: History,
  fetchData: FetchData,
  props: RouteProps & { computedMatch?: Match },
) => {
  const match = props.computedMatch || matchPath(history.location.pathname, props);
  const initializedMap = getInitializedMap(history);
  const key = JSON.stringify(props, removeCircular()); // HACK
  if (!initializedMap.has(key)) {
    initializedMap.set(
      key,
      match ? fetchData(match) : null,
    );
    // FIXME no cleanup
  }
  return initializedMap.get(key) as object | null;
};

type Props = RouteProps & {
  fetchData?: FetchData;
};

export const Route: React.FC<Props> = ({ fetchData, ...props }) => {
  const history = useHistory();
  const [routeDataState, setRouteData] = useState<object | null>(null);
  const routeData = (fetchData && routeDataState === null
    ? getInitialRouteData(history, fetchData, props)
    : routeDataState);
  useEffect(() => {
    // BUG it doesn't work properly with <Switch>
    const unlisten = history.listen((location: Location) => {
      const match = matchPath(location.pathname, props);
      if (match && fetchData) {
        setRouteData(fetchData(match));
      }
    });
    // FIXME route could be change before this effect is handled?
    return unlisten;
  }, [props, fetchData, history]);
  return (
    <RouteDataProvider data={routeData}>
      <OrigRoute {...props} />
    </RouteDataProvider>
  );
};

export default Route;
