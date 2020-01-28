import React from 'react';
import { RouteProps, match as Match } from 'react-router';
declare type Props = RouteProps & {
    fetchData?: (m: Match) => object;
};
export declare const Route: React.FC<Props>;
export default Route;
