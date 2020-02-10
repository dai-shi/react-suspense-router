import React, { Suspense } from 'react';

import Nav from './Nav';
import MyRoutes from './MyRoutes';

const App: React.FC = () => (
  <>
    <Nav />
    <hr />
    <Suspense fallback={<div>Loading...</div>}>
      <MyRoutes />
    </Suspense>
  </>
);

export default App;
