import { prepare, run, prefetch } from 'react-suspense-fetch';

import { match as Match } from './types';

type FetchFunc<T extends object, P> = (m: Match<P>) => Promise<T>;

export const FetchData = <T extends object, P>(fetchFunc: FetchFunc<T, P>) => {
  const fetchData = (match: Match<P>) => prefetch(fetchFunc, match);
  return fetchData;
};

export const FetchDataLazy = <T extends object, P>(
  factory: () => Promise<{ default: FetchFunc<T, P> }>,
) => {
  const preparedFetcher = prepare(factory);
  const invokeFetcher = async (
    [fetchData, match]: readonly [FetchFunc<T, P>, Match<P>],
  ) => fetchData(match);
  const fetchDataLazy = (match: Match<P>) => {
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
