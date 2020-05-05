import { prepare, run, prefetch } from 'react-suspense-fetch';

import { Match } from './types';

type FetchFunc<T extends object> = (m: Match) => Promise<T>;

export const FetchData = <T extends object>(fetchFunc: FetchFunc<T>) => {
  const fetchData = (match: Match) => prefetch(fetchFunc, match);
  return fetchData;
};

export const FetchDataLazy = <T extends object>(
  factory: () => Promise<{ default: FetchFunc<T> }>,
) => {
  const preparedFetcher = prepare(factory);
  const invokeFetcher = async (
    [fetchData, match]: readonly [FetchFunc<T>, Match],
  ) => fetchData(match);
  const fetchDataLazy = (match: Match) => {
    run(preparedFetcher, null);
    return prefetch(
      invokeFetcher,
      [preparedFetcher, match] as const,
      (source) => [
        source[0].default, // can suspend
        source[1],
      ] as const,
    );
  };
  return fetchDataLazy;
};
