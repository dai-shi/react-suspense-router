import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { createHashHistory } from 'history';

import { Router } from './Router';
import { History } from './types';

type Props = {
  window?: unknown;
  timeout?: number;
};

export const HashRouter: React.FC<Props> = ({
  window,
  timeout,
  children,
}) => {
  const history = useRef<History>();
  if (!history.current) {
    history.current = createHashHistory({ window });
  }
  return (
    <Router history={history.current} timeout={timeout}>
      {children}
    </Router>
  );
};

export default HashRouter;
