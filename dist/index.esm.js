import{useListen as e,useResolvedLocation as r,useParams as t,matchRoutes as n,useRoutes as a,createRoutesFromChildren as o}from"react-router";export{MemoryRouter,Navigate,Outlet,Redirect,Route,Router,createRoutesFromChildren,generatePath,matchRoutes,resolveLocation,useBlocker,useHref,useLocation,useMatch,useNavigate,useOutlet,useParams,usePending,useResolvedLocation}from"react-router";export{BrowserRouter,HashRouter,Link,NavLink,Prompt,usePrompt}from"react-router-dom";import u,{useState as i,useRef as c,useEffect as s}from"react";import{createContainer as l}from"react-tracked";import{prepare as m,run as f,prefetch as p}from"react-suspense-fetch";function v(){return(v=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var d=function(e){return!!e.element},h=l(function(e){return[e.data,null]}),g=h.useTrackedState,P=h.Provider,R=function(){return g({unstable_ignoreStateEquality:!0})},O=h.useSelector,b={pathname:null},y=function(o,l,m){void 0===l&&(l=""),void 0===m&&(m=!1);var f=e(),p=r(b).pathname,h=t(),g=l?(p+"/"+l).replace(/\/\/+/g,"/"):p,R=i(new Map),O=R[0],y=R[1],S=c();s(function(){S.current={routesOrig:o,basename:g,caseSensitive:m,parentParams:h}}),s(function(){var e=new Map;return f(function(r){var t,a,o,u=n(null==(t=S.current)?void 0:t.routesOrig,r,null==(a=S.current)?void 0:a.basename,null==(o=S.current)?void 0:o.caseSensitive);e=new Map,(u||[]).forEach(function(r){var t,n=r.params,a=r.pathname,o=r.route;if(o&&d(o)){var u=o.element.props.fetchData;if(u){var i=u({params:v({},null==(t=S.current)?void 0:t.parentParams,{},n),pathname:a});e.set(o.path,i)}}}),y(function(r){return 0===r.size&&0===e.size?r:e})})},[f]);var k=o.map(function(e){if(!d(e))return e;if(!e.element.props.fetchData)return e;var r=O.get(e.path);return v({},e,{element:r&&u.createElement(P,{data:r,children:e.element})})});return a(k,l,m)},S=function(e){var r=e.basename,t=void 0===r?"":r,n=e.caseSensitive,a=void 0!==n&&n,u=o(e.children);return y(u,t,a)},k=function(e){var r=m(e),t=function(e){var r=e[0],t=e[1];try{return Promise.resolve(r(t))}catch(e){return Promise.reject(e)}};return function(e){return f(r,null),p(t,[r,e],function(e){return[e[0].default,e[1]]})}};export{k as LazyFetcher,S as Routes,R as useRouteData,O as useRouteDataSelector,y as useRoutes};
//# sourceMappingURL=index.esm.js.map
