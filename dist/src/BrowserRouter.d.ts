/// <reference types="react/experimental" />
import React, { SuspenseConfig } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
declare type Props = BrowserRouterProps & {
    suspenseConfig?: SuspenseConfig;
};
export declare const BrowserRouter: React.FC<Props>;
export default BrowserRouter;
