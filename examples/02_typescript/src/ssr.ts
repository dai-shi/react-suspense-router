import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { StaticRouter } from 'react-suspense-router';

import App from './App';

const ssr = (location: string) => {
  const RootElement = createElement(
    StaticRouter,
    { location, children: createElement(App) },
  );
  return renderToString(RootElement);
};

export default ssr;
