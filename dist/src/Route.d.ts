import React from 'react';
import { RouteProps, match as Match } from 'react-router';
declare type FetchData = (m: Match) => object;
declare type Props = RouteProps & {
    fetchData?: FetchData;
};
export declare const Route: React.FC<Props>;
export default Route;
