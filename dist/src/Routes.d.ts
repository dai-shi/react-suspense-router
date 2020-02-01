import React from 'react';
import { Route } from './types';
export declare const useRoutes: (routesOrig: Route[], basenameOrig?: string, caseSensitive?: boolean) => any;
declare type Props = {
    basename?: string;
    caseSensitive?: boolean;
};
export declare const Routes: React.FC<Props>;
export {};
