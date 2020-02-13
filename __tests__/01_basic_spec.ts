import {
  FetchData,
  FetchDataLazy,
  useRouteData,
  useRouteDataSelector,
} from '../src/index';

describe('basic spec', () => {
  it('exported function', () => {
    expect(FetchData).toBeDefined();
    expect(FetchDataLazy).toBeDefined();
    expect(useRouteData).toBeDefined();
    expect(useRouteDataSelector).toBeDefined();
  });
});
