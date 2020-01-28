import {
  BrowserRouter,
  Route,
  LazyFetcher,
  useRouteData,
  useRouteDataSelector,
  useSuspensePending,
} from '../src/index';

describe('basic spec', () => {
  it('exported function', () => {
    expect(BrowserRouter).toBeDefined();
    expect(Route).toBeDefined();
    expect(LazyFetcher).toBeDefined();
    expect(useRouteData).toBeDefined();
    expect(useRouteDataSelector).toBeDefined();
    expect(useSuspensePending).toBeDefined();
  });
});
