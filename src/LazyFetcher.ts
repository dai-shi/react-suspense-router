import { match as Match } from 'react-router';
import { prepare, run, prefetch } from 'react-suspense-fetch';

export const LazyFetcher = <T extends object, P>(
  factory: () => Promise<{ default: (m: Match<P>) => T }>,
) => {
  const preparedFetcher = prepare(factory);
  const invokeFetcher = async (
    [fetcher, match]: readonly [(m: Match<P>) => T, Match<P>],
  ) => fetcher(match);
  return (match: Match<P>) => {
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
};

export default LazyFetcher;
