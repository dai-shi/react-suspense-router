import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-suspense-router';

import Nav from './Nav';
import Routes from './Routes';

const App: React.FC = () => (
  <BrowserRouter suspenseConfig={{ timeoutMs: 1000 }}>
    <Nav />
    <hr />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  </BrowserRouter>
);

export default App;
