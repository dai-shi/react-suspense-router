import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { StaticRouter } from 'react-suspense-router';

import App from './App';

const ssr = (location: string) => {
  const RootElement = (
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );
  return renderToNodeStream(RootElement);
};

export default ssr;
