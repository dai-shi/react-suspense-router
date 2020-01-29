import React from 'react';

import { Switch, Route, LazyFetcher } from 'react-suspense-router';

const Index = React.lazy(() => import('./pages/Index'));
const Posts = React.lazy(() => import('./pages/Posts'));
const User = React.lazy(() => import('./pages/User'));
const fetchUserData = LazyFetcher(() => import('./pages/User.data'));

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Index />
    </Route>
    <Route path="/posts">
      <Posts />
    </Route>
    <Route path="/user/:uid" fetchData={fetchUserData}>
      <User />
    </Route>
  </Switch>
);

export default Routes;
