!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react-router"),require("react-router-dom"),require("react-router-dom/server"),require("react"),require("react-tracked"),require("react-suspense-fetch")):"function"==typeof define&&define.amd?define(["exports","react-router","react-router-dom","react-router-dom/server","react","react-tracked","react-suspense-fetch"],t):t((e=e||self).reactSuspenseRouter={},e.ReactRouter,e.ReactRouterDOM,e.server,e.react,e.reactTracked,e.reactSuspenseFetch)}(this,function(e,t,r,n,u,o,a){var c="default"in u?u.default:u;function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var f=function(){return null},s=o.createContainer(function(e){return[e.data,f]}),l=s.Provider,m=s.useUpdate,d=s.useTrackedState,p=function(e){var t=e.setNotify,r=m();return u.useEffect(function(){t(r)}),null},b=function(e){var t=e.children;return c.createElement(l,{data:e.data},c.createElement(p,{setNotify:e.setNotify}),t)},y=s.useSelector,P=function(e){return u.isValidElement(e.element)},v={pathname:void 0},g=function(e){var r=t.useResolvedLocation(v).pathname;return e?(r+"/"+e).replace(/\/\/+/g,"/"):r},h=function(e,t,r){return e.map(function(e){if(!P(e))return e;if("function"!=typeof e.element.props.fetchData)return e;var n=t[e.path];return i(i({},e),{},{element:n&&c.createElement(b,{data:n,setNotify:function(t){r&&r.set(e.path,t)},children:e.element})})})},O=function(e,t){var r={};return(e||[]).forEach(function(e){var n=e.params,u=e.pathname,o=e.route;if(o&&P(o)){var a=o.element.props.fetchData;if("function"==typeof a){var c=a({params:i(i({},t),n),pathname:u});r[o.path]=c}}}),r},R=function(e){try{var t=window.__ROUTE_DATA_MAP_CACHE__;return t[e]||(t[e]={}),t[e]}catch(e){return{}}},j="undefined"==typeof window||void 0===window.navigator||(""+window.navigator.userAgent).includes("ServerSideRendering")?function(e,r){void 0===r&&(r="");var n=t.createRoutesFromArray(e),u=g(r),o=t.useParams(),a=t.useLocation(),c=t.matchRoutes(n,a,u),i=R(u);0===Object.keys(i).length&&Object.assign(i,O(c,o));var f=h(n,i);return t.useRoutes(f,r)}:function(e,r){void 0===r&&(r="");var n=t.createRoutesFromArray(e),o=t.useLocationListen(),a=g(r),c=t.useParams(),i=u.useState(function(){return R(a)}),f=i[0],s=i[1],l=u.useRef(new Map),m=u.useRef();u.useEffect(function(){m.current={routesOrig:n,basename:a,parentParams:c}}),u.useEffect(function(){var e={};return o(function(r){var n,u,o,a;if(!function(e){try{var t=window.__ROUTE_DATA_MAP_CACHE__;return!!t[e]&&(delete t[e],!0)}catch(e){return!1}}((null==(n=m.current)?void 0:n.basename)||"")){var c=t.matchRoutes((null==(u=m.current)?void 0:u.routesOrig)||[],r,null==(o=m.current)?void 0:o.basename);e=O(c||[],(null==(a=m.current)?void 0:a.parentParams)||{}),s(function(t){return 0===Object.keys(t).length&&0===Object.keys(e).length?t:e}),Object.keys(e).forEach(function(e){var t=l.current.get(e);t&&t()})}})},[o]);var d=h(n,f,l.current);return t.useRoutes(d,r)},L=t.Route;Object.defineProperty(e,"MemoryRouter",{enumerable:!0,get:function(){return t.MemoryRouter}}),Object.defineProperty(e,"Navigate",{enumerable:!0,get:function(){return t.Navigate}}),Object.defineProperty(e,"Outlet",{enumerable:!0,get:function(){return t.Outlet}}),Object.defineProperty(e,"Router",{enumerable:!0,get:function(){return t.Router}}),Object.defineProperty(e,"createRoutesFromArray",{enumerable:!0,get:function(){return t.createRoutesFromArray}}),Object.defineProperty(e,"createRoutesFromChildren",{enumerable:!0,get:function(){return t.createRoutesFromChildren}}),Object.defineProperty(e,"generatePath",{enumerable:!0,get:function(){return t.generatePath}}),Object.defineProperty(e,"matchPath",{enumerable:!0,get:function(){return t.matchPath}}),Object.defineProperty(e,"matchRoutes",{enumerable:!0,get:function(){return t.matchRoutes}}),Object.defineProperty(e,"resolveLocation",{enumerable:!0,get:function(){return t.resolveLocation}}),Object.defineProperty(e,"useBlocker",{enumerable:!0,get:function(){return t.useBlocker}}),Object.defineProperty(e,"useHref",{enumerable:!0,get:function(){return t.useHref}}),Object.defineProperty(e,"useInRouterContext",{enumerable:!0,get:function(){return t.useInRouterContext}}),Object.defineProperty(e,"useLocation",{enumerable:!0,get:function(){return t.useLocation}}),Object.defineProperty(e,"useLocationListen",{enumerable:!0,get:function(){return t.useLocationListen}}),Object.defineProperty(e,"useLocationPending",{enumerable:!0,get:function(){return t.useLocationPending}}),Object.defineProperty(e,"useMatch",{enumerable:!0,get:function(){return t.useMatch}}),Object.defineProperty(e,"useNavigate",{enumerable:!0,get:function(){return t.useNavigate}}),Object.defineProperty(e,"useOutlet",{enumerable:!0,get:function(){return t.useOutlet}}),Object.defineProperty(e,"useParams",{enumerable:!0,get:function(){return t.useParams}}),Object.defineProperty(e,"useResolvedLocation",{enumerable:!0,get:function(){return t.useResolvedLocation}}),Object.defineProperty(e,"BrowserRouter",{enumerable:!0,get:function(){return r.BrowserRouter}}),Object.defineProperty(e,"HashRouter",{enumerable:!0,get:function(){return r.HashRouter}}),Object.defineProperty(e,"Link",{enumerable:!0,get:function(){return r.Link}}),Object.defineProperty(e,"NavLink",{enumerable:!0,get:function(){return r.NavLink}}),Object.defineProperty(e,"Prompt",{enumerable:!0,get:function(){return r.Prompt}}),Object.defineProperty(e,"createSearchParams",{enumerable:!0,get:function(){return r.createSearchParams}}),Object.defineProperty(e,"usePrompt",{enumerable:!0,get:function(){return r.usePrompt}}),Object.defineProperty(e,"useSearchParams",{enumerable:!0,get:function(){return r.useSearchParams}}),Object.defineProperty(e,"StaticRouter",{enumerable:!0,get:function(){return n.StaticRouter}}),e.FetchData=function(e){return function(t){return a.prefetch(e,t)}},e.FetchDataLazy=function(e){var t=a.prepare(e),r=function(e){var t=e[0],r=e[1];try{return Promise.resolve(t(r))}catch(e){return Promise.reject(e)}};return function(e){return a.run(t,null),a.prefetch(r,[t,e],function(e){return[e[0].default,e[1]]})}},e.Route=L,e.Routes=function(e){var r=e.basename,n=void 0===r?"":r,u=t.createRoutesFromChildren(e.children);return j(u,n)},e.useRouteData=function(){return d({unstable_ignoreStateEquality:!0})},e.useRouteDataSelector=y,e.useRoutes=j});
//# sourceMappingURL=index.umd.js.map
