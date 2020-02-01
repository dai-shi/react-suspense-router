import {
  LazyFetcher,
  useRouteData,
  useRouteDataSelector,
  useSuspensePending,
} from '../src/index';

describe('basic spec', () => {
  it('exported function', () => {
    expect(LazyFetcher).toBeDefined();
    expect(useRouteData).toBeDefined();
    expect(useRouteDataSelector).toBeDefined();
    expect(useSuspensePending).toBeDefined();
  });
});
