import React from 'react';

import { Route, LazyFetcher } from 'react-suspense-router';

const Index = React.lazy(() => import('./pages/Index'));
const About = React.lazy(() => import('./pages/About'));
const User = React.lazy(() => import('./pages/User'));
const fetchUserData = LazyFetcher(() => import('./pages/User.data'));

const Routes: React.FC = () => (
  <>
    <Route exact path="/">
      <Index />
    </Route>
    <Route path="/about/:name">
      <About />
    </Route>
    <Route path="/user/:uid" fetchData={fetchUserData}>
      <User />
    </Route>
  </>
);

export default Routes;
