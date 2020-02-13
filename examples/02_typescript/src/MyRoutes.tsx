import React from 'react';

import { Routes, Route, FetchDataLazy } from 'react-suspense-router';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Index = React.lazy(() => import('./pages/Index'));
const About = React.lazy(() => import('./pages/About'));
const User = React.lazy(async () => { await sleep(1000); return import('./pages/User'); });
const fetchUserData = FetchDataLazy(() => import('./pages/User.data'));

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about/:name" element={<About />} />
    <Route path="/user/:uid" element={<User />} fetchData={fetchUserData} />
  </Routes>
);

export default MyRoutes;
