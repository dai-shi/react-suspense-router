import React from 'react';
import { PartialRouteObject } from 'react-router';
export declare const useRoutes: (partialRoutesOrig: PartialRouteObject[], basenameOrig?: string) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
declare type Props = {
    basename?: string;
};
export declare const Routes: React.FC<Props>;
export {};
