var e,t=require("react-router"),r=require("react-router-dom"),n=require("react-router-dom/server"),u=require("react"),o=(e=u)&&"object"==typeof e&&"default"in e?e.default:e,a=require("react-tracked"),c=require("react-suspense-fetch");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var s=function(){return null},f=a.createContainer(function(e){return[e.data,s]}),p=f.Provider,l=f.useUpdate,m=f.useTrackedState,d=function(e){var t=e.setNotify,r=l();return u.useEffect(function(){t(r)}),null},b=function(e){var t=e.children;return o.createElement(p,{data:e.data},o.createElement(d,{setNotify:e.setNotify}),t)},y=f.useSelector,P=function(e){return u.isValidElement(e.element)},g={pathname:void 0},v=function(e){var r=t.useResolvedLocation(g).pathname;return e?(r+"/"+e).replace(/\/\/+/g,"/"):r},h=function(e,t,r){return e.map(function(e){if(!P(e))return e;if("function"!=typeof e.element.props.fetchData)return e;var n=t[e.path];return i({},e,{element:n&&o.createElement(b,{data:n,setNotify:function(t){r&&r.set(e.path,t)},children:e.element})})})},O=function(e,t){var r={};return(e||[]).forEach(function(e){var n=e.params,u=e.pathname,o=e.route;if(o&&P(o)){var a=o.element.props.fetchData;if("function"==typeof a){var c=a({params:i({},t,n),pathname:u});r[o.path]=c}}}),r},j=function(e){try{var t=window.__ROUTE_DATA_MAP_CACHE__;return t[e]||(t[e]={}),t[e]}catch(e){return{}}},x="undefined"==typeof window||void 0===window.navigator||(""+window.navigator.userAgent).includes("ServerSideRendering")?function(e,r){void 0===r&&(r="");var n=t.createRoutesFromArray(e),u=v(r),o=t.useParams(),a=t.useLocation(),c=t.matchRoutes(n,a,u),i=j(u);0===Object.keys(i).length&&Object.assign(i,O(c,o));var s=h(n,i);return t.useRoutes(s,r)}:function(e,r){void 0===r&&(r="");var n=t.createRoutesFromArray(e),o=t.useLocationListen(),a=v(r),c=t.useParams(),i=u.useState(function(){return j(a)}),s=i[0],f=i[1],p=u.useRef(new Map),l=u.useRef();u.useEffect(function(){l.current={routesOrig:n,basename:a,parentParams:c}}),u.useEffect(function(){var e={};return o(function(r){var n,u,o,a;if(!function(e){try{var t=window.__ROUTE_DATA_MAP_CACHE__;return!!t[e]&&(delete t[e],!0)}catch(e){return!1}}((null==(n=l.current)?void 0:n.basename)||"")){var c=t.matchRoutes((null==(u=l.current)?void 0:u.routesOrig)||[],r,null==(o=l.current)?void 0:o.basename);e=O(c||[],(null==(a=l.current)?void 0:a.parentParams)||{}),f(function(t){return 0===Object.keys(t).length&&0===Object.keys(e).length?t:e}),Object.keys(e).forEach(function(e){var t=p.current.get(e);t&&t()})}})},[o]);var m=h(n,s,p.current);return t.useRoutes(m,r)},R=t.Route;Object.defineProperty(exports,"MemoryRouter",{enumerable:!0,get:function(){return t.MemoryRouter}}),Object.defineProperty(exports,"Navigate",{enumerable:!0,get:function(){return t.Navigate}}),Object.defineProperty(exports,"Outlet",{enumerable:!0,get:function(){return t.Outlet}}),Object.defineProperty(exports,"Router",{enumerable:!0,get:function(){return t.Router}}),Object.defineProperty(exports,"createRoutesFromArray",{enumerable:!0,get:function(){return t.createRoutesFromArray}}),Object.defineProperty(exports,"createRoutesFromChildren",{enumerable:!0,get:function(){return t.createRoutesFromChildren}}),Object.defineProperty(exports,"generatePath",{enumerable:!0,get:function(){return t.generatePath}}),Object.defineProperty(exports,"matchPath",{enumerable:!0,get:function(){return t.matchPath}}),Object.defineProperty(exports,"matchRoutes",{enumerable:!0,get:function(){return t.matchRoutes}}),Object.defineProperty(exports,"resolveLocation",{enumerable:!0,get:function(){return t.resolveLocation}}),Object.defineProperty(exports,"useBlocker",{enumerable:!0,get:function(){return t.useBlocker}}),Object.defineProperty(exports,"useHref",{enumerable:!0,get:function(){return t.useHref}}),Object.defineProperty(exports,"useInRouterContext",{enumerable:!0,get:function(){return t.useInRouterContext}}),Object.defineProperty(exports,"useLocation",{enumerable:!0,get:function(){return t.useLocation}}),Object.defineProperty(exports,"useLocationListen",{enumerable:!0,get:function(){return t.useLocationListen}}),Object.defineProperty(exports,"useLocationPending",{enumerable:!0,get:function(){return t.useLocationPending}}),Object.defineProperty(exports,"useMatch",{enumerable:!0,get:function(){return t.useMatch}}),Object.defineProperty(exports,"useNavigate",{enumerable:!0,get:function(){return t.useNavigate}}),Object.defineProperty(exports,"useOutlet",{enumerable:!0,get:function(){return t.useOutlet}}),Object.defineProperty(exports,"useParams",{enumerable:!0,get:function(){return t.useParams}}),Object.defineProperty(exports,"useResolvedLocation",{enumerable:!0,get:function(){return t.useResolvedLocation}}),Object.defineProperty(exports,"BrowserRouter",{enumerable:!0,get:function(){return r.BrowserRouter}}),Object.defineProperty(exports,"HashRouter",{enumerable:!0,get:function(){return r.HashRouter}}),Object.defineProperty(exports,"Link",{enumerable:!0,get:function(){return r.Link}}),Object.defineProperty(exports,"NavLink",{enumerable:!0,get:function(){return r.NavLink}}),Object.defineProperty(exports,"Prompt",{enumerable:!0,get:function(){return r.Prompt}}),Object.defineProperty(exports,"createSearchParams",{enumerable:!0,get:function(){return r.createSearchParams}}),Object.defineProperty(exports,"usePrompt",{enumerable:!0,get:function(){return r.usePrompt}}),Object.defineProperty(exports,"useSearchParams",{enumerable:!0,get:function(){return r.useSearchParams}}),Object.defineProperty(exports,"StaticRouter",{enumerable:!0,get:function(){return n.StaticRouter}}),exports.FetchData=function(e){return function(t){return c.prefetch(e,t)}},exports.FetchDataLazy=function(e){var t=c.prepare(e),r=function(e){var t=e[0],r=e[1];try{return Promise.resolve(t(r))}catch(e){return Promise.reject(e)}};return function(e){return c.run(t,null),c.prefetch(r,[t,e],function(e){return[e[0].default,e[1]]})}},exports.Route=R,exports.Routes=function(e){var r=e.basename,n=void 0===r?"":r,u=t.createRoutesFromChildren(e.children);return x(u,n)},exports.useRouteData=function(){return m({unstable_ignoreStateEquality:!0})},exports.useRouteDataSelector=y,exports.useRoutes=x;
//# sourceMappingURL=index.js.map
