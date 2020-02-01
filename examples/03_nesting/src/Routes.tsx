import React from 'react';

import { Switch, Route, LazyFetcher } from 'react-suspense-router';

const Index = React.lazy(() => import('./pages/Index'));
const Posts = React.lazy(() => import('./pages/Posts'));
const FirstUser = React.lazy(() => import('./pages/FirstUser'));
const User = React.lazy(() => import('./pages/User'));
const fetchFirstUserData = LazyFetcher(() => import('./pages/FirstUser.data'));
const fetchUserData = LazyFetcher(() => import('./pages/User.data'));

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Index />
    </Route>
    <Route path="/posts">
      <Posts />
    </Route>
    <Route path="/user/1" fetchData={fetchFirstUserData}>
      <FirstUser />
    </Route>
    <Route path="/user/:uid" fetchData={fetchUserData}>
      <User />
    </Route>
    <Route>
      <h1>Not Found</h1>
    </Route>
  </Switch>
);

export default Routes;
