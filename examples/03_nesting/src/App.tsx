import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-suspense-router';

import Nav from './Nav';
import MyRoutes from './MyRoutes';

const App: React.FC = () => (
  <BrowserRouter timeout={1000}>
    <Nav />
    <hr />
    <Suspense fallback={<div>Loading...</div>}>
      <MyRoutes />
    </Suspense>
  </BrowserRouter>
);

export default App;
