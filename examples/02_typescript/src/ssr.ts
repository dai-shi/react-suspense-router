import { createElement } from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { StaticRouter } from 'react-suspense-router';

import App from './App';

const ssr = (location: string) => {
  const RootElement = createElement(
    StaticRouter,
    { location, children: createElement(App) },
  );
  return renderToNodeStream(RootElement);
};

export default ssr;
