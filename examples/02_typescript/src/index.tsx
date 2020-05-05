// eslint-disable-next-line spaced-comment
/// <reference types="react-dom/experimental" />

import React from 'react';
import { createRoot } from 'react-dom';

import { BrowserRouter } from 'react-suspense-router';

import App from './App';

const RootElement = (
  <BrowserRouter timeout={2000}>
    <App />
  </BrowserRouter>
);

const ele = document.getElementById('app');
if (!ele) throw new Error('no app');
if (ele.innerHTML) {
  createRoot(ele, { hydrate: true }).render(RootElement);
} else {
  createRoot(ele).render(RootElement);
}
