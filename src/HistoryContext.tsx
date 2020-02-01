import React, { createContext, useContext } from 'react';

import { History } from './types';

const HistoryContext = createContext<History | null>(null);

type Props = {
  history: History;
};

export const HistoryProvider: React.FC<Props> = ({
  history,
  children,
}) => (
  <HistoryContext.Provider value={history}>
    {children}
  </HistoryContext.Provider>
);

export const useHistory = () => {
  const history = useContext(HistoryContext);
  if (!history) throw new Error('missing <HistoryContext>');
  return history;
};
