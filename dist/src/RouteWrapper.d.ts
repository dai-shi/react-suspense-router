import React from 'react';
import { match as Match, History } from './types';
declare type FetchData = (m: Match) => object;
declare type Props = {
    history: History;
    routePath: string;
    basename: string;
    caseSensitive: boolean;
    fetchData: FetchData;
    match: Match;
};
export declare const RouteWrapper: React.FC<Props>;
export default RouteWrapper;
