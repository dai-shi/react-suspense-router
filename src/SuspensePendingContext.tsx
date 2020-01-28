import React, { createContext, useContext } from 'react';

const SuspensePendingContext = createContext(false);

type Props = {
  suspensePending: boolean;
};

export const SuspensePendingProvider: React.FC<Props> = ({
  suspensePending,
  children,
}) => (
  <SuspensePendingContext.Provider value={suspensePending}>
    {children}
  </SuspensePendingContext.Provider>
);

export const useSuspensePending = () => useContext(SuspensePendingContext);
