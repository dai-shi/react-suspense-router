import React from 'react';

import { Routes, Route, FetchDataLazy } from 'react-suspense-router';

const Index = React.lazy(() => import('./pages/Index'));
const Posts = React.lazy(() => import('./pages/Posts'));
const FirstUser = React.lazy(() => import('./pages/FirstUser'));
const User = React.lazy(() => import('./pages/User'));
const fetchFirstUserData = FetchDataLazy(() => import('./pages/FirstUser.data'));
const fetchUserData = FetchDataLazy(() => import('./pages/User.data'));

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/posts/*" element={<Posts />} />
    <Route path="/user/1" element={<FirstUser />} fetchData={fetchFirstUserData} />
    <Route path="/user/:uid" element={<User />} fetchData={fetchUserData} />
    <Route element={<h1>Not Found</h1>} />
  </Routes>
);

export default MyRoutes;
