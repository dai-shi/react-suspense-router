import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { createMemoryHistory } from 'history';

import { Router } from './Router';
import { History } from './types';

type Props = {
  initialEntries: number;
  initialIndex: number;
  timeout?: number;
};

export const MemoryRouter: React.FC<Props> = ({
  initialEntries,
  initialIndex,
  timeout,
  children,
}) => {
  const history = useRef<History>();
  if (!history.current) {
    history.current = createMemoryHistory({ initialEntries, initialIndex });
  }
  return (
    <Router history={history.current} timeout={timeout}>
      {children}
    </Router>
  );
};

export default MemoryRouter;
