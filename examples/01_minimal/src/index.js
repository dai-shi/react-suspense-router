import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { prefetch } from 'react-suspense-fetch';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useRouteData,
  usePending,
} from 'react-suspense-router';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchDouble = (match) => prefetch(async (number) => {
  await sleep(1000);
  return { result: number * 2 };
}, match.params.number);

const Double = () => {
  const { number } = useParams();
  const routeData = useRouteData();
  return (
    <div>
      <h1>Double</h1>
      {number} x 2 = {routeData.result}
    </div>
  );
};

const Index = () => (
  <div>
    <h1>Hello World</h1>
  </div>
);

const MyRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/double/:number" element={<Double />} fetchData={fetchDouble} />
  </Routes>
);

const Nav = () => {
  const isPending = usePending();
  return (
    <div>
      <div style={{ position: 'absolute', top: 0 }}>{isPending && 'Pending...'}</div>
      <ul style={{ marginTop: 20 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/double/3">Double 3</Link>
        </li>
        <li>
          <Link to="/double/5">Double 5</Link>
        </li>
      </ul>
    </div>
  );
};

const App = () => (
  <BrowserRouter timeout={3000}>
    <Nav />
    <Suspense fallback={<span>Loading...</span>}>
      <MyRoutes />
    </Suspense>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
