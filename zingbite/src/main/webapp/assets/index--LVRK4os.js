const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/OrderTracking-Bys--VcG.js","assets/chevron-right-BxY0ugEN.js","assets/ChatWidget-Cy1_XXDd.js","assets/DeliveryDashboard-C3IZR2lF.js","assets/indian-rupee-CzGNaXe5.js","assets/RestaurantDashboard-BF9FC2FJ.js","assets/CareerPortal-CeEVhM2O.js","assets/SuperAdminDashboard-BD7ms4wp.js","assets/VRPDashboard-fv29JPz8.js"])))=>i.map(i=>d[i]);
var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function ee(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return ee(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function O(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var te=/\/+/g;function k(e,t){return typeof e==`object`&&e&&e.key!=null?O(``+e.key):t.toString(36)}function ne(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function re(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,re(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+k(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(te,`$&/`)+`/`),re(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(te,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+k(a,u),c+=re(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+k(a,u++),c+=re(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return re(ne(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ie(e,t,n){if(e==null)return e;var r=[],i=0;return re(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ae(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var A=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},j={map:ie,forEach:function(e,t,n){ie(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ie(e,function(){t++}),t},toArray:function(e){return ie(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=j,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ee(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ee(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ae}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,A)}catch(e){A(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.7`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&k(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function ee(){return g?!0:!(e.unstable_now()-T<w)}function E(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&k(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var O=new MessageChannel,te=O.port2;O.port1.onmessage=E,D=function(){te.postMessage(null)}}else D=function(){_(E,0)};function k(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,k(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}var m=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),ee=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),O=Symbol.for(`react.activity`),te=Symbol.for(`react.memo_cache_sentinel`),k=Symbol.iterator;function ne(e){return typeof e!=`object`||!e?null:(e=k&&e[k]||e[`@@iterator`],typeof e==`function`?e:null)}var re=Symbol.for(`react.client.reference`);function ie(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case ee:return`SuspenseList`;case O:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?ie(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}var ae=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,oe={pending:!1,data:null,method:null,action:null},se=[],ce=-1;function le(e){return{current:e}}function M(e){0>ce||(e.current=se[ce],se[ce]=null,ce--)}function N(e,t){ce++,se[ce]=e.current,e.current=t}var ue=le(null),de=le(null),fe=le(null),pe=le(null);function me(e,t){switch(N(fe,t),N(de,e),N(ue,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}M(ue),N(ue,e)}function he(){M(ue),M(de),M(fe)}function ge(e){e.memoizedState!==null&&N(pe,e);var t=ue.current,n=Hd(t,e.type);t!==n&&(N(de,e),N(ue,n))}function _e(e){de.current===e&&(M(ue),M(de)),pe.current===e&&(M(pe),Qf._currentValue=oe)}var ve,ye;function be(e){if(ve===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ve=t&&t[1]||``,ye=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ve+e+ye}var xe=!1;function Se(e,t){if(!e||xe)return``;xe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{xe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?be(n):``}function Ce(e,t){switch(e.tag){case 26:case 27:case 5:return be(e.type);case 16:return be(`Lazy`);case 13:return e.child!==t&&t!==null?be(`Suspense Fallback`):be(`Suspense`);case 19:return be(`SuspenseList`);case 0:case 15:return Se(e.type,!1);case 11:return Se(e.type.render,!1);case 1:return Se(e.type,!0);case 31:return be(`Activity`);default:return``}}function we(e){try{var t=``,n=null;do t+=Ce(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Te=Object.prototype.hasOwnProperty,Ee=t.unstable_scheduleCallback,De=t.unstable_cancelCallback,Oe=t.unstable_shouldYield,ke=t.unstable_requestPaint,Ae=t.unstable_now,je=t.unstable_getCurrentPriorityLevel,Me=t.unstable_ImmediatePriority,Ne=t.unstable_UserBlockingPriority,Pe=t.unstable_NormalPriority,Fe=t.unstable_LowPriority,Ie=t.unstable_IdlePriority,Le=t.log,Re=t.unstable_setDisableYieldValue,ze=null,Be=null;function Ve(e){if(typeof Le==`function`&&Re(e),Be&&typeof Be.setStrictMode==`function`)try{Be.setStrictMode(ze,e)}catch{}}var He=Math.clz32?Math.clz32:Ge,Ue=Math.log,We=Math.LN2;function Ge(e){return e>>>=0,e===0?32:31-(Ue(e)/We|0)|0}var Ke=256,qe=262144,Je=4194304;function Ye(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Xe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ye(n))):i=Ye(o):i=Ye(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ye(n))):i=Ye(o)):i=Ye(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ze(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Qe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $e(){var e=Je;return Je<<=1,!(Je&62914560)&&(Je=4194304),e}function et(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function nt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-He(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&rt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function rt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-He(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function it(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-He(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function at(e,t){var n=t&-t;return n=n&42?1:ot(n),(n&(e.suspendedLanes|t))===0?n:0}function ot(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function st(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ct(){var e=j.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function lt(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var ut=Math.random().toString(36).slice(2),P=`__reactFiber$`+ut,dt=`__reactProps$`+ut,ft=`__reactContainer$`+ut,pt=`__reactEvents$`+ut,mt=`__reactListeners$`+ut,ht=`__reactHandles$`+ut,gt=`__reactResources$`+ut,_t=`__reactMarker$`+ut;function vt(e){delete e[P],delete e[dt],delete e[pt],delete e[mt],delete e[ht]}function yt(e){var t=e[P];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ft]||n[P]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[P])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function bt(e){if(e=e[P]||e[ft]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function xt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function St(e){var t=e[gt];return t||=e[gt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ct(e){e[_t]=!0}var wt=new Set,Tt={};function Et(e,t){Dt(e,t),Dt(e+`Capture`,t)}function Dt(e,t){for(Tt[e]=t,e=0;e<t.length;e++)wt.add(t[e])}var Ot=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),kt={},At={};function jt(e){return Te.call(At,e)?!0:Te.call(kt,e)?!1:Ot.test(e)?At[e]=!0:(kt[e]=!0,!1)}function Mt(e,t,n){if(jt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Nt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Pt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Ft(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function It(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Lt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Rt(e){if(!e._valueTracker){var t=It(e)?`checked`:`value`;e._valueTracker=Lt(e,t,``+e[t])}}function zt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=It(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Bt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Vt=/[\n"\\]/g;function Ht(e){return e.replace(Vt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ut(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Ft(t)):e.value!==``+Ft(t)&&(e.value=``+Ft(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Gt(e,o,Ft(n)):Gt(e,o,Ft(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Ft(s):e.removeAttribute(`name`)}function Wt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Rt(e);return}n=n==null?``:``+Ft(n),t=t==null?n:``+Ft(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Rt(e)}function Gt(e,t,n){t===`number`&&Bt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Kt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Ft(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function qt(e,t,n){if(t!=null&&(t=``+Ft(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Ft(n)}function Jt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ae(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Ft(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Rt(e)}function Yt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Zt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Xt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Qt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Zt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Zt(e,o,t[o])}function $t(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var en=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),tn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function nn(e){return tn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function rn(){}var an=null;function on(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sn=null,cn=null;function ln(e){var t=bt(e);if(t&&(e=t.stateNode)){var n=e[dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ut(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Ht(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[dt]||null;if(!a)throw Error(i(90));Ut(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&zt(r)}break a;case`textarea`:qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Kt(e,!!n.multiple,t,!1)}}}var un=!1;function dn(e,t,n){if(un)return e(t,n);un=!0;try{return e(t)}finally{if(un=!1,(sn!==null||cn!==null)&&(bu(),sn&&(t=sn,e=cn,cn=sn=null,ln(t),e)))for(t=0;t<e.length;t++)ln(e[t])}}function fn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var pn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),mn=!1;if(pn)try{var hn={};Object.defineProperty(hn,"passive",{get:function(){mn=!0}}),window.addEventListener(`test`,hn,hn),window.removeEventListener(`test`,hn,hn)}catch{mn=!1}var gn=null,_n=null,vn=null;function yn(){if(vn)return vn;var e,t=_n,n=t.length,r,i=`value`in gn?gn.value:gn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return vn=i.slice(e,1<r?1-r:void 0)}function bn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xn(){return!0}function Sn(){return!1}function Cn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?xn:Sn,this.isPropagationStopped=Sn,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=xn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=xn)},persist:function(){},isPersistent:xn}),t}var wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tn=Cn(wn),En=m({},wn,{view:0,detail:0}),Dn=Cn(En),On,kn,An,jn=m({},En,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==An&&(An&&e.type===`mousemove`?(On=e.screenX-An.screenX,kn=e.screenY-An.screenY):kn=On=0,An=e),On)},movementY:function(e){return`movementY`in e?e.movementY:kn}}),F=Cn(jn),Mn=Cn(m({},jn,{dataTransfer:0})),Nn=Cn(m({},En,{relatedTarget:0})),Pn=Cn(m({},wn,{animationName:0,elapsedTime:0,pseudoElement:0})),Fn=Cn(m({},wn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),In=Cn(m({},wn,{data:0})),Ln={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Rn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},zn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Bn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=zn[e])?!!t[e]:!1}function Vn(){return Bn}var Hn=Cn(m({},En,{key:function(e){if(e.key){var t=Ln[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=bn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Rn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vn,charCode:function(e){return e.type===`keypress`?bn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?bn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Un=Cn(m({},jn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Wn=Cn(m({},En,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vn})),Gn=Cn(m({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Kn=Cn(m({},jn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),qn=Cn(m({},wn,{newState:0,oldState:0})),Jn=[9,13,27,32],Yn=pn&&`CompositionEvent`in window,Xn=null;pn&&`documentMode`in document&&(Xn=document.documentMode);var Zn=pn&&`TextEvent`in window&&!Xn,Qn=pn&&(!Yn||Xn&&8<Xn&&11>=Xn),$n=` `,er=!1;function tr(e,t){switch(e){case`keyup`:return Jn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function nr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var rr=!1;function ir(e,t){switch(e){case`compositionend`:return nr(t);case`keypress`:return t.which===32?(er=!0,$n):null;case`textInput`:return e=t.data,e===$n&&er?null:e;default:return null}}function ar(e,t){if(rr)return e===`compositionend`||!Yn&&tr(e,t)?(e=yn(),vn=_n=gn=null,rr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Qn&&t.locale!==`ko`?null:t.data;default:return null}}var or={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function sr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!or[e.type]:t===`textarea`}function cr(e,t,n,r){sn?cn?cn.push(r):cn=[r]:sn=r,t=Ed(t,`onChange`),0<t.length&&(n=new Tn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var lr=null,ur=null;function dr(e){yd(e,0)}function fr(e){if(zt(xt(e)))return e}function pr(e,t){if(e===`change`)return t}var mr=!1;if(pn){var hr;if(pn){var gr=`oninput`in document;if(!gr){var _r=document.createElement(`div`);_r.setAttribute(`oninput`,`return;`),gr=typeof _r.oninput==`function`}hr=gr}else hr=!1;mr=hr&&(!document.documentMode||9<document.documentMode)}function vr(){lr&&(lr.detachEvent(`onpropertychange`,yr),ur=lr=null)}function yr(e){if(e.propertyName===`value`&&fr(ur)){var t=[];cr(t,ur,e,on(e)),dn(dr,t)}}function br(e,t,n){e===`focusin`?(vr(),lr=t,ur=n,lr.attachEvent(`onpropertychange`,yr)):e===`focusout`&&vr()}function xr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return fr(ur)}function Sr(e,t){if(e===`click`)return fr(t)}function Cr(e,t){if(e===`input`||e===`change`)return fr(t)}function wr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Tr=typeof Object.is==`function`?Object.is:wr;function Er(e,t){if(Tr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Te.call(t,i)||!Tr(e[i],t[i]))return!1}return!0}function Dr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Or(e,t){var n=Dr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Dr(n)}}function kr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?kr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ar(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Bt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Bt(e.document)}return t}function jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Mr=pn&&`documentMode`in document&&11>=document.documentMode,Nr=null,Pr=null,Fr=null,Ir=!1;function Lr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ir||Nr==null||Nr!==Bt(r)||(r=Nr,`selectionStart`in r&&jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fr&&Er(Fr,r)||(Fr=r,r=Ed(Pr,`onSelect`),0<r.length&&(t=new Tn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Nr)))}function Rr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var zr={animationend:Rr(`Animation`,`AnimationEnd`),animationiteration:Rr(`Animation`,`AnimationIteration`),animationstart:Rr(`Animation`,`AnimationStart`),transitionrun:Rr(`Transition`,`TransitionRun`),transitionstart:Rr(`Transition`,`TransitionStart`),transitioncancel:Rr(`Transition`,`TransitionCancel`),transitionend:Rr(`Transition`,`TransitionEnd`)},Br={},Vr={};pn&&(Vr=document.createElement(`div`).style,`AnimationEvent`in window||(delete zr.animationend.animation,delete zr.animationiteration.animation,delete zr.animationstart.animation),`TransitionEvent`in window||delete zr.transitionend.transition);function Hr(e){if(Br[e])return Br[e];if(!zr[e])return e;var t=zr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Vr)return Br[e]=t[n];return e}var Ur=Hr(`animationend`),Wr=Hr(`animationiteration`),Gr=Hr(`animationstart`),Kr=Hr(`transitionrun`),qr=Hr(`transitionstart`),Jr=Hr(`transitioncancel`),Yr=Hr(`transitionend`),Xr=new Map,Zr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Zr.push(`scrollEnd`);function Qr(e,t){Xr.set(e,t),Et(t,[e])}var $r=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ei=[],ti=0,ni=0;function ri(){for(var e=ti,t=ni=ti=0;t<e;){var n=ei[t];ei[t++]=null;var r=ei[t];ei[t++]=null;var i=ei[t];ei[t++]=null;var a=ei[t];if(ei[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&I(n,i,a)}}function ii(e,t,n,r){ei[ti++]=e,ei[ti++]=t,ei[ti++]=n,ei[ti++]=r,ni|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ai(e,t,n,r){return ii(e,t,n,r),si(e)}function oi(e,t){return ii(e,null,null,t),si(e)}function I(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-He(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function si(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ci={};function li(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,t,n,r){return new li(e,t,n,r)}function di(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fi(e,t){var n=e.alternate;return n===null?(n=ui(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function pi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)di(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,ue.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case O:return e=ui(31,n,t,a),e.elementType=O,e.lanes=o,e;case y:return hi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ui(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ui(13,n,t,a),e.elementType=T,e.lanes=o,e;case ee:return e=ui(19,n,t,a),e.elementType=ee,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ui(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function hi(e,t,n,r){return e=ui(7,e,r,t),e.lanes=n,e}function gi(e,t,n){return e=ui(6,e,null,t),e.lanes=n,e}function _i(e){var t=ui(18,null,null,0);return t.stateNode=e,t}function vi(e,t,n){return t=ui(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var yi=new WeakMap;function bi(e,t){if(typeof e==`object`&&e){var n=yi.get(e);return n===void 0?(t={value:e,source:t,stack:we(t)},yi.set(e,t),t):n}return{value:e,source:t,stack:we(t)}}var xi=[],Si=0,Ci=null,wi=0,Ti=[],Ei=0,Di=null,L=1,Oi=``;function ki(e,t){xi[Si++]=wi,xi[Si++]=Ci,Ci=e,wi=t}function Ai(e,t,n){Ti[Ei++]=L,Ti[Ei++]=Oi,Ti[Ei++]=Di,Di=e;var r=L;e=Oi;var i=32-He(r)-1;r&=~(1<<i),n+=1;var a=32-He(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,L=1<<32-He(t)+i|n<<i|r,Oi=a+e}else L=1<<a|n<<i|r,Oi=e}function ji(e){e.return!==null&&(ki(e,1),Ai(e,1,0))}function Mi(e){for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null;for(;e===Di;)Di=Ti[--Ei],Ti[Ei]=null,Oi=Ti[--Ei],Ti[Ei]=null,L=Ti[--Ei],Ti[Ei]=null}function Ni(e,t){Ti[Ei++]=L,Ti[Ei++]=Oi,Ti[Ei++]=Di,L=t.id,Oi=t.overflow,Di=e}var Pi=null,R=null,z=!1,Fi=null,Ii=!1,Li=Error(i(519));function Ri(e){throw Wi(bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Li}function zi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[P]=e,t[dt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Wt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Jt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=rn),t=!0):t=!1,t||Ri(e,!0)}function Bi(e){for(Pi=e.return;Pi;)switch(Pi.tag){case 5:case 31:case 13:Ii=!1;return;case 27:case 3:Ii=!0;return;default:Pi=Pi.return}}function Vi(e){if(e!==Pi)return!1;if(!z)return Bi(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&R&&Ri(e),Bi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=uf(e)}else t===27?(t=R,Zd(e.type)?(e=lf,lf=null,R=e):R=t):R=Pi?cf(e.stateNode.nextSibling):null;return!0}function Hi(){R=Pi=null,z=!1}function Ui(){var e=Fi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Fi=null),e}function Wi(e){Fi===null?Fi=[e]:Fi.push(e)}var Gi=le(null),Ki=null,qi=null;function Ji(e,t,n){N(Gi,t._currentValue),t._currentValue=n}function Yi(e){e._currentValue=Gi.current,M(Gi)}function Xi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Zi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Xi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Xi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Qi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Tr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===pe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Zi(t,e,n,r),t.flags|=262144}function $i(e){for(e=e.firstContext;e!==null;){if(!Tr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ea(e){Ki=e,qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ta(e){return ra(Ki,e)}function na(e,t){return Ki===null&&ea(e),ra(e,t)}function ra(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},qi===null){if(e===null)throw Error(i(308));qi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else qi=qi.next=t;return n}var ia=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},aa=t.unstable_scheduleCallback,oa=t.unstable_NormalPriority,sa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ca(){return{controller:new ia,data:new Map,refCount:0}}function la(e){e.refCount--,e.refCount===0&&aa(oa,function(){e.controller.abort()})}var ua=null,da=0,fa=0,pa=null;function ma(e,t){if(ua===null){var n=ua=[];da=0,fa=dd(),pa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return da++,t.then(ha,ha),t}function ha(){if(--da===0&&ua!==null){pa!==null&&(pa.status=`fulfilled`);var e=ua;ua=null,fa=0,pa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ga(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var _a=A.S;A.S=function(e,t){eu=Ae(),typeof t==`object`&&t&&typeof t.then==`function`&&ma(e,t),_a!==null&&_a(e,t)};var va=le(null);function ya(){var e=va.current;return e===null?q.pooledCache:e}function ba(e,t){t===null?N(va,va.current):N(va,t.pool)}function xa(){var e=ya();return e===null?null:{parent:sa._currentValue,pool:e}}var Sa=Error(i(460)),Ca=Error(i(474)),wa=Error(i(542)),Ta={then:function(){}};function Ea(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Da(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(rn,rn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e;default:if(typeof t.status==`string`)t.then(rn,rn);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ja(e),e}throw ka=t,Sa}}function Oa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ka=e,Sa):e}}var ka=null;function Aa(){if(ka===null)throw Error(i(459));var e=ka;return ka=null,e}function ja(e){if(e===Sa||e===wa)throw Error(i(483))}var Ma=null,Na=0;function Pa(e){var t=Na;return Na+=1,Ma===null&&(Ma=[]),Da(Ma,e,t)}function Fa(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ia(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function La(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=fi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=gi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&Oa(i)===t.type)?(t=a(t,n.props),Fa(t,n),t.return=e,t):(t=mi(n.type,n.key,n.props,null,e.mode,r),Fa(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=vi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=hi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=gi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=mi(t.type,t.key,t.props,null,e.mode,n),Fa(n,t),n.return=e,n;case v:return t=vi(t,e.mode,n),t.return=e,t;case D:return t=Oa(t),f(e,t,n)}if(ae(t)||ne(t))return t=hi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Pa(t),n);if(t.$$typeof===C)return f(e,na(e,t),n);Ia(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=Oa(n),p(e,t,n,r)}if(ae(n)||ne(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Pa(n),r);if(n.$$typeof===C)return p(e,t,na(e,n),r);Ia(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=Oa(r),m(e,t,n,r,i)}if(ae(r)||ne(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Pa(r),i);if(r.$$typeof===C)return m(e,t,n,na(t,r),i);Ia(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&ki(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&ki(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&ki(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&ki(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&ki(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&ki(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&Oa(l)===r.type){n(e,r.sibling),c=a(r,o.props),Fa(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=hi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=mi(o.type,o.key,o.props,null,e.mode,c),Fa(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=vi(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=Oa(o),b(e,r,o,c)}if(ae(o))return h(e,r,o,c);if(ne(o)){if(l=ne(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Pa(o),c);if(o.$$typeof===C)return b(e,r,na(e,o),c);Ia(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=gi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Na=0;var i=b(e,t,n,r);return Ma=null,i}catch(t){if(t===Sa||t===wa)throw t;var a=ui(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ra=La(!0),za=La(!1),Ba=!1;function Va(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ha(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ua(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Wa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=si(e),I(e,null,n),t}return ii(e,r,t,n),si(e)}function Ga(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,it(e,n)}}function Ka(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var qa=!1;function Ja(){if(qa){var e=pa;if(e!==null)throw e}}function Ya(e,t,n,r){qa=!1;var i=e.updateQueue;Ba=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===fa&&(qa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=m({},d,f);break a;case 2:Ba=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Xa(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Za(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Xa(n[e],t)}var Qa=le(null),B=le(0);function $a(e,t){e=Ul,N(B,e),N(Qa,t),Ul=e|t.baseLanes}function eo(){N(B,Ul),N(Qa,Qa.current)}function V(){Ul=B.current,M(Qa),M(B)}var to=le(null),no=null;function ro(e){var t=e.alternate;N(co,co.current&1),N(to,e),no===null&&(t===null||Qa.current!==null||t.memoizedState!==null)&&(no=e)}function io(e){N(co,co.current),N(to,e),no===null&&(no=e)}function ao(e){e.tag===22?(N(co,co.current),N(to,e),no===null&&(no=e)):oo(e)}function oo(){N(co,co.current),N(to,to.current)}function so(e){M(to),no===e&&(no=null),M(co)}var co=le(0);function lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var uo=0,H=null,U=null,fo=null,po=!1,mo=!1,ho=!1,go=0,_o=0,W=null,vo=0;function G(){throw Error(i(321))}function yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Tr(e[n],t[n]))return!1;return!0}function bo(e,t,n,r,i,a){return uo=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?Ls:Rs,ho=!1,a=n(r,i),ho=!1,mo&&(a=So(t,n,r,i)),xo(e),a}function xo(e){A.H=Is;var t=U!==null&&U.next!==null;if(uo=0,fo=U=H=null,po=!1,_o=0,W=null,t)throw Error(i(300));e===null||tc||(e=e.dependencies,e!==null&&$i(e)&&(tc=!0))}function So(e,t,n,r){H=e;var a=0;do{if(mo&&(W=null),_o=0,mo=!1,25<=a)throw Error(i(301));if(a+=1,fo=U=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=zs,o=t(n,r)}while(mo);return o}function Co(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?Ao(t):t,e=e.useState()[0],(U===null?null:U.memoizedState)!==e&&(H.flags|=1024),t}function wo(){var e=go!==0;return go=0,e}function To(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Eo(e){if(po){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}po=!1}uo=0,fo=U=H=null,mo=!1,_o=go=0,W=null}function Do(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fo===null?H.memoizedState=fo=e:fo=fo.next=e,fo}function Oo(){if(U===null){var e=H.alternate;e=e===null?null:e.memoizedState}else e=U.next;var t=fo===null?H.memoizedState:fo.next;if(t!==null)fo=t,U=e;else{if(e===null)throw H.alternate===null?Error(i(467)):Error(i(310));U=e,e={memoizedState:U.memoizedState,baseState:U.baseState,baseQueue:U.baseQueue,queue:U.queue,next:null},fo===null?H.memoizedState=fo=e:fo=fo.next=e}return fo}function ko(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(e){var t=_o;return _o+=1,W===null&&(W=[]),e=Da(W,e,t),t=H,(fo===null?t.memoizedState:fo.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?Ls:Rs),e}function jo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Ao(e);if(e.$$typeof===C)return ta(e)}throw Error(i(438,String(e)))}function Mo(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=H.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ko(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=te;return t.index++,n}function No(e,t){return typeof t==`function`?t(e):t}function Po(e){return Fo(Oo(),U,e)}function Fo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(uo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===fa&&(d=!0);else if((uo&p)===p){u=u.next,p===fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,H.lanes|=p,Gl|=p;f=u.action,ho&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,H.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Tr(o,e.memoizedState)&&(tc=!0,d&&(n=pa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Io(e){var t=Oo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Tr(o,t.memoizedState)||(tc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Lo(e,t,n){var r=H,a=Oo(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Tr((U||a).memoizedState,n);if(s&&(a.memoizedState=n,tc=!0),a=a.queue,cs(Bo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||fo!==null&&fo.memoizedState.tag&1){if(r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||uo&127||Ro(r,t,n)}return n}function Ro(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=ko(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zo(e,t,n,r){t.value=n,t.getSnapshot=r,Vo(t)&&Ho(e)}function Bo(e,t,n){return n(function(){Vo(t)&&Ho(e)})}function Vo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Tr(e,n)}catch{return!0}}function Ho(e){var t=oi(e,2);t!==null&&hu(t,e,2)}function Uo(e){var t=Do();if(typeof e==`function`){var n=e;if(e=n(),ho){Ve(!0);try{n()}finally{Ve(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:e},t}function Wo(e,t,n,r){return e.baseState=n,Fo(e,U,typeof r==`function`?r:No)}function Go(e,t,n,r,a){if(Ns(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ko(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ko(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),qo(e,t,s)}catch(n){Yo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),qo(e,t,a)}catch(n){Yo(e,t,n)}}function qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Jo(e,t,n)},function(n){return Yo(e,t,n)}):Jo(e,t,n)}function Jo(e,t,n){t.status=`fulfilled`,t.value=n,Xo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ko(e,n)))}function Yo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Xo(t),t=t.next;while(t!==r)}e.action=null}function Xo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zo(e,t){return t}function Qo(e,t){if(z){var n=q.formState;if(n!==null){a:{var r=H;if(z){if(R){b:{for(var i=R,a=Ii;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){R=cf(i.nextSibling),r=i.data===`F!`;break a}}Ri(r)}r=!1}r&&(t=n[0])}}return n=Do(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},n.queue=r,n=As.bind(null,H,r),r.dispatch=n,r=Uo(!1),a=Ms.bind(null,H,!1,r.queue),r=Do(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Go.bind(null,H,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function $o(e){return es(Oo(),U,e)}function es(e,t,n){if(t=Fo(e,t,Zo)[0],e=Po(No)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Ao(t)}catch(e){throw e===Sa?wa:e}else r=t;t=Oo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,rs(9,{destroy:void 0},ts.bind(null,i,n),null)),[r,a,e]}function ts(e,t){e.action=t}function ns(e){var t=Oo(),n=U;if(n!==null)return es(t,n,e);Oo(),t=t.memoizedState,n=Oo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=H.updateQueue,t===null&&(t=ko(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function is(){return Oo().memoizedState}function as(e,t,n,r){var i=Do();H.flags|=e,i.memoizedState=rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function os(e,t,n,r){var i=Oo();r=r===void 0?null:r;var a=i.memoizedState.inst;U!==null&&r!==null&&yo(r,U.memoizedState.deps)?i.memoizedState=rs(t,a,n,r):(H.flags|=e,i.memoizedState=rs(1|t,a,n,r))}function ss(e,t){as(8390656,8,e,t)}function cs(e,t){os(2048,8,e,t)}function ls(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=ko(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function us(e){var t=Oo().memoizedState;return ls({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ds(e,t){return os(4,2,e,t)}function fs(e,t){return os(4,4,e,t)}function ps(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ms(e,t,n){n=n==null?null:n.concat([e]),os(4,4,ps.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&yo(t,r[1]))return r[0];if(r=e(),ho){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||uo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),H.lanes|=e,Gl|=e,n)}function ys(e,t,n,r){return Tr(n,t)?n:Qa.current===null?!(uo&42)||uo&1073741824&&!(Y&261930)?(tc=!0,e.memoizedState=n):(e=mu(),H.lanes|=e,Gl|=e,t):(e=vs(e,n,r),Tr(e,t)||(tc=!0),e)}function bs(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};A.T=s,Ms(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?js(e,t,ga(c,r),pu(e)):js(e,t,r,pu(e))}catch(n){js(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,oe,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:oe,baseState:oe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:oe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),js(e,t.next.queue,{},pu())}function Ts(){return ta(Qf)}function Es(){return Oo().memoizedState}function Ds(){return Oo().memoizedState}function Os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ua(n);var r=Wa(t,e,n);r!==null&&(hu(r,t,n),Ga(r,t,n)),t={cache:ca()},e.payload=t;return}t=t.return}}function ks(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ns(e)?Ps(t,n):(n=ai(e,t,n,r),n!==null&&(hu(n,e,r),Fs(n,t,r)))}function As(e,t,n){js(e,t,n,pu())}function js(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ns(e))Ps(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Tr(s,o))return ii(e,t,i,0),q===null&&ri(),!1}catch{}if(n=ai(e,t,i,r),n!==null)return hu(n,e,r),Fs(n,t,r),!0}return!1}function Ms(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ns(e)){if(t)throw Error(i(479))}else t=ai(e,n,r,2),t!==null&&hu(t,e,2)}function Ns(e){var t=e.alternate;return e===H||t!==null&&t===H}function Ps(e,t){mo=po=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,it(e,n)}}var Is={readContext:ta,use:jo,useCallback:G,useContext:G,useEffect:G,useImperativeHandle:G,useLayoutEffect:G,useInsertionEffect:G,useMemo:G,useReducer:G,useRef:G,useState:G,useDebugValue:G,useDeferredValue:G,useTransition:G,useSyncExternalStore:G,useId:G,useHostTransitionStatus:G,useFormState:G,useActionState:G,useOptimistic:G,useMemoCache:G,useCacheRefresh:G};Is.useEffectEvent=G;var Ls={readContext:ta,use:jo,useCallback:function(e,t){return Do().memoizedState=[e,t===void 0?null:t],e},useContext:ta,useEffect:ss,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),as(4194308,4,ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return as(4194308,4,e,t)},useInsertionEffect:function(e,t){as(4,2,e,t)},useMemo:function(e,t){var n=Do();t=t===void 0?null:t;var r=e();if(ho){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Do();if(n!==void 0){var i=n(t);if(ho){Ve(!0);try{n(t)}finally{Ve(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ks.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=Do();return e={current:e},t.memoizedState=e},useState:function(e){e=Uo(e);var t=e.queue,n=As.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Do(),e,t)},useTransition:function(){var e=Uo(!1);return e=bs.bind(null,H,e.queue,!0,!1),Do().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=H,a=Do();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||Ro(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ss(Bo.bind(null,r,o,e),[e]),r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,o,n,t),null),n},useId:function(){var e=Do(),t=q.identifierPrefix;if(z){var n=Oi,r=L;n=(r&~(1<<32-He(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=vo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:Qo,useActionState:Qo,useOptimistic:function(e){var t=Do();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ms.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:Mo,useCacheRefresh:function(){return Do().memoizedState=Os.bind(null,H)},useEffectEvent:function(e){var t=Do(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Rs={readContext:ta,use:jo,useCallback:gs,useContext:ta,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Po,useRef:is,useState:function(){return Po(No)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(Oo(),U.memoizedState,e,t)},useTransition:function(){var e=Po(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){return Wo(Oo(),U,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};Rs.useEffectEvent=us;var zs={readContext:ta,use:jo,useCallback:gs,useContext:ta,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Io,useRef:is,useState:function(){return Io(No)},useDebugValue:hs,useDeferredValue:function(e,t){var n=Oo();return U===null?vs(n,e,t):ys(n,U.memoizedState,e,t)},useTransition:function(){var e=Io(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){var n=Oo();return U===null?(n.baseState=e,[e,n.queue.dispatch]):Wo(n,U,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};zs.useEffectEvent=us;function Bs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:m({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ua(r);i.payload=t,n!=null&&(i.callback=n),t=Wa(e,i,r),t!==null&&(hu(t,e,r),Ga(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ua(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Wa(e,i,r),t!==null&&(hu(t,e,r),Ga(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ua(n);r.tag=2,t!=null&&(r.callback=t),t=Wa(e,r,n),t!==null&&(hu(t,e,n),Ga(t,e,n))}};function Hs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Er(n,r)||!Er(i,a):!0}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vs.enqueueReplaceState(t,t.state,null)}function Ws(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=m({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Gs(e){$r(e)}function Ks(e){console.error(e)}function qs(e){$r(e)}function Js(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){return n=Ua(n),n.tag=3,n.payload={element:null},n.callback=function(){Js(e,t)},n}function Zs(e){return e=Ua(e),e.tag=3,e}function Qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ys(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ys(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function $s(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Qi(t,n,a,!0),n=to.current,n!==null){switch(n.tag){case 31:case 13:return no===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ta?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(z)return t=to.current,t===null?(r!==Li&&(t=Error(i(423),{cause:r}),Wi(bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=bi(r,n),a=Xs(e.stateNode,r,a),Ka(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Li&&(e=Error(i(422),{cause:r}),Wi(bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=bi(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Xs(n.stateNode,r,e),Ka(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Zs(a),Qs(a,e,n,r),Ka(n,a),!1}n=n.return}while(n!==null);return!1}var ec=Error(i(461)),tc=!1;function nc(e,t,n,r){t.child=e===null?za(t,null,n,r):Ra(t,e.child,n,r)}function rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ea(t),r=bo(e,t,n,o,a,i),s=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(z&&s&&ji(t),t.flags|=1,nc(e,t,r,i),t.child)}function ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!di(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ac(e,t,a,r,i)):(e=mi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Oc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Er:n,n(o,r)&&e.ref===t.ref)return Dc(e,t,i)}return t.flags|=1,e=fi(a,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Er(a,r)&&e.ref===t.ref)if(tc=!1,t.pendingProps=r=a,Oc(e,i))e.flags&131072&&(tc=!0);else return t.lanes=e.lanes,Dc(e,t,i)}return pc(e,t,n,r,i)}function oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return cc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ba(t,a===null?null:a.cachePool),a===null?eo():$a(t,a),ao(t);else return r=t.lanes=536870912,cc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ba(t,null),eo(),oo(t)):(ba(t,a.cachePool),$a(t,a),oo(t),t.memoizedState=null);return nc(e,t,i,n),t.child}function sc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cc(e,t,n,r,i){var a=ya();return a=a===null?null:{parent:sa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ba(t,null),eo(),ao(t),e!==null&&Qi(e,t,r,!0),t.childLanes=i,null}function lc(e,t){return t=Sc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function uc(e,t,n){return Ra(t,e.child,null,n),e=lc(t,t.pendingProps),e.flags|=2,so(t),t.memoizedState=null,e}function dc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=lc(t,r),t.lanes=536870912,sc(null,e);if(io(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Di===null?null:{id:L,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return t.lanes=536870912,null}return lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(io(t),a)if(t.flags&256)t.flags&=-257,t=uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(tc||Qi(e,t,n,!1),a=(n&e.childLanes)!==0,tc||a){if(r=q,r!==null&&(s=at(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,oi(e,s),hu(r,e,s),ec;Du(),t=uc(e,t,n)}else e=o.treeContext,R=cf(s.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=lc(t,r),t.flags|=4096;return t}return e=fi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pc(e,t,n,r,i){return ea(t),n=bo(e,t,n,r,void 0,i),r=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(z&&r&&ji(t),t.flags|=1,nc(e,t,n,i),t.child)}function mc(e,t,n,r,i,a){return ea(t),t.updateQueue=null,n=So(t,r,n,i),xo(e),r=wo(),e!==null&&!tc?(To(e,t,a),Dc(e,t,a)):(z&&r&&ji(t),t.flags|=1,nc(e,t,n,a),t.child)}function hc(e,t,n,r,i){if(ea(t),t.stateNode===null){var a=ci,o=n.contextType;typeof o==`object`&&o&&(a=ta(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Vs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Va(t),o=n.contextType,a.context=typeof o==`object`&&o?ta(o):ci,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Bs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Vs.enqueueReplaceState(a,a.state,null),Ya(t,r,a,i),Ja(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ws(n,s);a.props=c;var l=a.context,u=n.contextType;o=ci,typeof u==`object`&&u&&(o=ta(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Us(t,a,r,o),Ba=!1;var f=t.memoizedState;a.state=f,Ya(t,r,a,i),Ja(),l=t.memoizedState,s||f!==l||Ba?(typeof d==`function`&&(Bs(t,n,d,r),l=t.memoizedState),(c=Ba||Hs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ha(e,t),o=t.memoizedProps,u=Ws(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ci,typeof l==`object`&&l&&(c=ta(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Us(t,a,r,c),Ba=!1,f=t.memoizedState,a.state=f,Ya(t,r,a,i),Ja();var p=t.memoizedState;o!==d||f!==p||Ba||e!==null&&e.dependencies!==null&&$i(e.dependencies)?(typeof s==`function`&&(Bs(t,n,s,r),p=t.memoizedState),(u=Ba||Hs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&$i(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,fc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ra(t,e.child,null,i),t.child=Ra(t,null,n,i)):nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Dc(e,t,i),e}function gc(e,t,n,r){return Hi(),t.flags|=256,nc(e,t,n,r),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:xa()}}function yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function bc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(co.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(z){if(a?ro(t):oo(t),(e=R)?(e=rf(e,Ii),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Di===null?null:{id:L,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Pi=t,R=null)):e=null,e===null)throw Ri(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(oo(t),a=t.mode,c=Sc({mode:`hidden`,children:c},a),r=hi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(null,r)):(ro(t),xc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(ro(t),t.flags&=-257,t=Cc(e,t,n)):t.memoizedState===null?(oo(t),c=r.fallback,a=t.mode,r=Sc({mode:`visible`,children:r.children},a),c=hi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ra(t,e.child,null,n),r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,t=sc(null,r)):(oo(t),t.child=e.child,t.flags|=128,t=null);else if(ro(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Wi({value:r,source:null,stack:null}),t=Cc(e,t,n)}else if(tc||Qi(e,t,n,!1),s=(n&e.childLanes)!==0,tc||s){if(s=q,s!==null&&(r=at(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,oi(e,r),hu(s,e,r),ec;af(c)||Du(),t=Cc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,R=cf(c.nextSibling),Pi=t,z=!0,Fi=null,Ii=!1,e!==null&&Ni(t,e),t=xc(t,r.children),t.flags|=4096);return t}return a?(oo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=fi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=hi(c,a,n,null),c.flags|=2):c=fi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,sc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=vc(n):(a=c.cachePool,a===null?a=xa():(l=sa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(e.child,r)):(ro(t),n=e.child,e=n.sibling,n=fi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function xc(e,t){return t=Sc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Sc(e,t){return e=ui(22,e,null,t),e.lanes=0,e}function Cc(e,t,n){return Ra(t,e.child,null,n),e=xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Xi(e.return,t,n)}function Tc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=co.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,N(co,o),nc(e,t,r,n),r=z?wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wc(e,n,t);else if(e.tag===19)wc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&lo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Tc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&lo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Tc(t,!0,n,null,a,r);break;case`together`:Tc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Dc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Qi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=fi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=fi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&$i(e))):!0}function kc(e,t,n){switch(t.tag){case 3:me(t,t.stateNode.containerInfo),Ji(t,sa,e.memoizedState.cache),Hi();break;case 27:case 5:ge(t);break;case 4:me(t,t.stateNode.containerInfo);break;case 10:Ji(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,io(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(ro(t),e=Dc(e,t,n),e===null?null:e.sibling):bc(e,t,n):(ro(t),t.flags|=128,null);ro(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Qi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),N(co,co.current),r)break;return null;case 22:return t.lanes=0,oc(e,t,n,t.pendingProps);case 24:Ji(t,sa,e.memoizedState.cache)}return Dc(e,t,n)}function Ac(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)tc=!0;else{if(!Oc(e,n)&&!(t.flags&128))return tc=!1,kc(e,t,n);tc=!!(e.flags&131072)}else tc=!1,z&&t.flags&1048576&&Ai(t,wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Oa(t.elementType),t.type=e,typeof e==`function`)di(e)?(r=Ws(e,r),t.tag=1,t=hc(null,t,e,r,n)):(t.tag=0,t=pc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=rc(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=ic(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return pc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ws(r,t.pendingProps),hc(e,t,r,a,n);case 3:a:{if(me(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ha(e,t),Ya(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ji(t,sa,r),r!==o.cache&&Zi(t,[sa],n,!0),Ja(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=gc(e,t,r,n);break a}else if(r!==a){a=bi(Error(i(424)),t),Wi(a),t=gc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(R=cf(e.firstChild),Pi=t,z=!0,Fi=null,Ii=!0,n=za(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Hi(),r===a){t=Dc(e,t,n);break a}nc(e,t,r,n)}t=t.child}return t;case 26:return fc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(n=t.type,e=t.pendingProps,r=Bd(fe.current).createElement(n),r[P]=t,r[dt]=e,Pd(r,n,e),Ct(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ge(t),e===null&&z&&(r=t.stateNode=ff(t.type,t.pendingProps,fe.current),Pi=t,Ii=!0,a=R,Zd(t.type)?(lf=a,R=cf(r.firstChild)):R=a),nc(e,t,t.pendingProps.children,n),fc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=R)&&(r=tf(r,t.type,t.pendingProps,Ii),r===null?a=!1:(t.stateNode=r,Pi=t,R=cf(r.firstChild),Ii=!1,a=!0)),a||Ri(t)),ge(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=bo(e,t,Co,null,null,n),Qf._currentValue=a),fc(e,t),nc(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=R)&&(n=nf(n,t.pendingProps,Ii),n===null?e=!1:(t.stateNode=n,Pi=t,R=null,e=!0)),e||Ri(t)),null;case 13:return bc(e,t,n);case 4:return me(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ra(t,null,r,n):nc(e,t,r,n),t.child;case 11:return rc(e,t,t.type,t.pendingProps,n);case 7:return nc(e,t,t.pendingProps,n),t.child;case 8:return nc(e,t,t.pendingProps.children,n),t.child;case 12:return nc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ji(t,t.type,r.value),nc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ea(t),a=ta(a),r=r(a),t.flags|=1,nc(e,t,r,n),t.child;case 14:return ic(e,t,t.type,t.pendingProps,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 19:return Ec(e,t,n);case 31:return dc(e,t,n);case 22:return oc(e,t,n,t.pendingProps);case 24:return ea(t),r=ta(sa),e===null?(a=ya(),a===null&&(a=q,o=ca(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Va(t),Ji(t,sa,a)):((e.lanes&n)!==0&&(Ha(e,t),Ya(t,null,null,n),Ja()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ji(t,sa,r),r!==a.cache&&Zi(t,[sa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ji(t,sa,r))),nc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function jc(e){e.flags|=4}function Mc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw ka=Ta,Ca}else e.flags&=-16777217}function Nc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw ka=Ta,Ca}function Pc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:$e(),e.lanes|=t,Yl|=t)}function Fc(e,t){if(!z)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ic(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(Mi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ic(t),null;case 1:return Ic(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Yi(sa),he(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Vi(t)?jc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ui())),Ic(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(jc(t),o===null?(Ic(t),Mc(t,a,null,r,n)):(Ic(t),Nc(t,o))):o?o===e.memoizedState?(Ic(t),t.flags&=-16777217):(jc(t),Ic(t),Nc(t,o)):(e=e.memoizedProps,e!==r&&jc(t),Ic(t),Mc(t,a,e,r,n)),null;case 27:if(_e(t),n=fe.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}e=ue.current,Vi(t)?zi(t,e):(e=ff(a,r,n),t.stateNode=e,jc(t))}return Ic(t),null;case 5:if(_e(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}if(o=ue.current,Vi(t))zi(t,o);else{var s=Bd(fe.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[P]=t,o[dt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&jc(t)}}return Ic(t),Mc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=fe.current,Vi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Pi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[P]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ri(t,!0)}else e=Bd(e).createTextNode(r),e[P]=t,t.stateNode=e}return Ic(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Vi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[P]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),e=!1}else n=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(so(t),t):(so(t),null);if(t.flags&128)throw Error(i(558))}return Ic(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Vi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[P]=t}else Hi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),a=!1}else a=Ui(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(so(t),t):(so(t),null)}return so(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pc(t,t.updateQueue),Ic(t),null);case 4:return he(),e===null&&Sd(t.stateNode.containerInfo),Ic(t),null;case 10:return Yi(t.type),Ic(t),null;case 19:if(M(co),r=t.memoizedState,r===null)return Ic(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Fc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=lo(e),o!==null){for(t.flags|=128,Fc(r,!1),e=o.updateQueue,t.updateQueue=e,Pc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)pi(n,e),n=n.sibling;return N(co,co.current&1|2),z&&ki(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ae()>tu&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}else{if(!a)if(e=lo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pc(t,e),Fc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!z)return Ic(t),null}else 2*Ae()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Ic(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ae(),e.sibling=null,n=co.current,N(co,a?n&1|2:n&1),z&&ki(t,r.treeForkCount),e);case 22:case 23:return so(t),V(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Ic(t),t.subtreeFlags&6&&(t.flags|=8192)):Ic(t),n=t.updateQueue,n!==null&&Pc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&M(va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Yi(sa),Ic(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(Mi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yi(sa),he(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return _e(t),null;case 31:if(t.memoizedState!==null){if(so(t),t.alternate===null)throw Error(i(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(so(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Hi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return M(co),null;case 4:return he(),null;case 10:return Yi(t.type),null;case 22:case 23:return so(t),V(),e!==null&&M(va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Yi(sa),null;case 25:return null;default:return null}}function zc(e,t){switch(Mi(t),t.tag){case 3:Yi(sa),he();break;case 26:case 27:case 5:_e(t);break;case 4:he();break;case 31:t.memoizedState!==null&&so(t);break;case 13:so(t);break;case 19:M(co);break;case 10:Yi(t.type);break;case 22:case 23:so(t),V(),e!==null&&M(va);break;case 24:Yi(sa)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Za(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[dt]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=rn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[P]=e,t[dt]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=Ar(e),jr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Za(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(Be&&typeof Be.onCommitFiberUnmount==`function`)try{Be.onCommitFiberUnmount(ze,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[_t]||o[P]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[P]=e,Ct(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[P]=e,Ct(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{Yt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Ae()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Yt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Xa(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&la(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&la(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:la(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=ta(sa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ta(sa).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:A.T===null?ct():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||z){var e=qe;qe<<=1,!(qe&3932160)&&(qe=262144),Jl=e}else Jl=536870912;return e=to.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),tt(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Ze(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Ae(),10<a)){if(yu(r,t,Jl,!Bl),Xe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:rn},jl(t,a,d);var m=(a&62914560)===a?$l-Ae():(a&4194048)===a?eu-Ae():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Tr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-He(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&rt(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,qi=Ki=null,Eo(e),Ma=null,Na=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=fi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=Ze(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-He(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,ri(),n}function Cu(e,t){H=null,A.H=Is,t===Sa||t===wa?(t=Aa(),X=3):t===Ca?(t=Aa(),X=4):X=t===ec?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Js(e,bi(t,e.current)))}function wu(){var e=to.current;return e===null?!0:(Y&4194048)===Y?no===null:(Y&62914560)===Y||Y&536870912?e===no:!1}function Tu(){var e=A.H;return A.H=Is,e===null?Is:e}function Eu(){var e=A.A;return A.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&to.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:to.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,qi=Ki=null,K=r,A.H=i,A.A=a,J===null&&(q=null,Y=0,ri()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Ae()+500,Su(e,t)):Vl=Ze(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Ea(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Ea(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return qi=Ki=null,A.H=r,A.A=a,K=n,J===null?(q=null,Y=0,ri(),Wl):0}function ju(){for(;J!==null&&!Oe();)Mu(J)}function Mu(e){var t=Ac(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=mc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=mc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Eo(t);default:zc(n,t),t=J=pi(t,Ul),t=Ac(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){qi=Ki=null,Eo(t),Ma=null,Na=0;var i=t.return;try{if($s(e,i,t,n,Y)){Wl=1,Js(e,bi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Js(e,bi(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=to.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ni,nt(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Pe,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=A.T,A.T=null,a=j.p,j.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,j.p=a,A.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Ar(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&kr(s.ownerDocument.documentElement,s)){if(c!==null&&jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Or(s,h),v=Or(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,j.p=r,A.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,j.p=r,A.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,ke();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),st(n),t=t.stateNode,Be&&typeof Be.onCommitFiberRoot==`function`)try{Be.onCommitFiberRoot(ze,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=A.T,i=j.p,j.p=2,A.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{A.T=t,j.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,la(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=st(su),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),Be&&typeof Be.onPostCommitFiberRoot==`function`)try{Be.onPostCommitFiberRoot(ze,o)}catch{}return!0}finally{j.p=a,A.T=r,Vu(e,t)}}function Wu(e,t,n){t=bi(n,t),t=Xs(e.stateNode,t,2),e=Wa(e,t,2),e!==null&&(tt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=bi(n,e),n=Zs(2),r=Wa(t,n,2),r!==null&&(Qs(n,r,t,e),tt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Ae()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=$e()),e=oi(e,t),e!==null&&(tt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ee(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-He(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Xe(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ze(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ae(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-He(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Qe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Xe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&De(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ze(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&De(r),st(n)){case 2:case 8:n=Ne;break;case 32:n=Pe;break;case 268435456:n=Ie;break;default:n=Pe}return r=cd.bind(null,e),n=Ee(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&De(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Xe(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Ae()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Ee(Me,ad):od()})}function dd(){if(nd===0){var e=fa;e===0&&(e=Ke,Ke<<=1,!(Ke&261888)&&(Ke=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:nn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[dt]||null).action),o=r.submitter;o&&(t=(t=o[dt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Tn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Zr.length;hd++){var gd=Zr[hd];Qr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Qr(Ur,`onAnimationEnd`),Qr(Wr,`onAnimationIteration`),Qr(Gr,`onAnimationStart`),Qr(`dblclick`,`onDoubleClick`),Qr(`focusin`,`onFocus`),Qr(`focusout`,`onBlur`),Qr(Kr,`onTransitionRun`),Qr(qr,`onTransitionStart`),Qr(Jr,`onTransitionCancel`),Qr(Yr,`onTransitionEnd`),Dt(`onMouseEnter`,[`mouseout`,`mouseover`]),Dt(`onMouseLeave`,[`mouseout`,`mouseover`]),Dt(`onPointerEnter`,[`pointerout`,`pointerover`]),Dt(`onPointerLeave`,[`pointerout`,`pointerover`]),Et(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Et(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Et(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Et(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){$r(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){$r(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[pt];n===void 0&&(n=t[pt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,wt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=yt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}dn(function(){var r=a,i=on(n),s=[];a:{var c=Xr.get(e);if(c!==void 0){var l=Tn,u=e;switch(e){case`keypress`:if(bn(n)===0)break a;case`keydown`:case`keyup`:l=Hn;break;case`focusin`:u=`focus`,l=Nn;break;case`focusout`:u=`blur`,l=Nn;break;case`beforeblur`:case`afterblur`:l=Nn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=F;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Mn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Wn;break;case Ur:case Wr:case Gr:l=Pn;break;case Yr:l=Gn;break;case`scroll`:case`scrollend`:l=Dn;break;case`wheel`:l=Kn;break;case`copy`:case`cut`:case`paste`:l=Fn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Un;break;case`toggle`:case`beforetoggle`:l=qn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=fn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==an&&(u=n.relatedTarget||n.fromElement)&&(yt(u)||u[ft]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?yt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=F,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Un,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:xt(l),h=u==null?c:xt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,yt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?xt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=pr;else if(sr(c))if(mr)v=Cr;else{v=xr;var y=br}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&$t(r.elementType)&&(v=pr):v=Sr;if(v&&=v(e,r)){cr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Gt(c,`number`,c.value)}switch(y=r?xt(r):window,e){case`focusin`:(sr(y)||y.contentEditable===`true`)&&(Nr=y,Pr=r,Fr=null);break;case`focusout`:Fr=Pr=Nr=null;break;case`mousedown`:Ir=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Ir=!1,Lr(s,n,i);break;case`selectionchange`:if(Mr)break;case`keydown`:case`keyup`:Lr(s,n,i)}var b;if(Yn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else rr?tr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Qn&&n.locale!==`ko`&&(rr||x!==`onCompositionStart`?x===`onCompositionEnd`&&rr&&(b=yn()):(gn=i,_n=`value`in gn?gn.value:gn.textContent,rr=!0)),y=Ed(r,x),0<y.length&&(x=new In(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=nr(n),b!==null&&(x.data=b)))),(b=Zn?ir(e,n):ar(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new In(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=fn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=fn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=fn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=fn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Yt(e,``+r);break;case`className`:Nt(e,`class`,r);break;case`tabIndex`:Nt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Nt(e,n,r);break;case`style`:Qt(e,r,o);break;case`data`:if(t!==`object`){Nt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=rn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=nn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Mt(e,`popover`,r);break;case`xlinkActuate`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Mt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=en.get(n)||n,Mt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Qt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Yt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=rn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Tt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[dt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Mt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Wt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Kt(e,!!r,n,!0):Kt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Jt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if($t(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Ut(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Kt(e,!!n,n?[]:``,!1):Kt(e,!!n,t,!0)):Kt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if($t(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[_t]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[_t])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);vt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=j.d;j.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=bt(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Ht(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Ht(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Ht(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Ht(n.imageSizes)+`"]`)):i+=`[href="`+Ht(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=m({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Ht(r)+`"][href="`+Ht(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=m({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Ct(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=St(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=m({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Ct(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=fe.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=St(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=St(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=St(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Ht(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Ct(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Ht(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Ht(n.href)+`"]`);if(r)return t.instance=r,Ct(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ct(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Ct(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Ct(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Ct(a),a):(r=n,(a=mf.get(o))&&(r=m({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ct(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[_t]||a[P]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ct(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Ct(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:oe,_currentValue2:oe,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=et(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=et(0),this.hiddenUpdates=et(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ui(3,null,null,t),e.current=a,a.stateNode=e,t=ca(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Va(a),e}function tp(e){return e?(e=ci,e):ci}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ua(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Wa(e,r,t),n!==null&&(hu(n,e,t),Ga(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=oi(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ot(t);var n=oi(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,up(e,t,n,r)}finally{j.p=a,A.T=i}}function lp(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,up(e,t,n,r)}finally{j.p=a,A.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=bt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ye(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-He(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Ae()+500,id(0,!1))}}break;case 31:case 13:s=oi(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=on(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=yt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(je()){case Me:return 2;case Ne:return 8;case Pe:case Fe:return 32;case Ie:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=bt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=yt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,lt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,lt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);an=r,n.target.dispatchEvent(r),an=null}else return t=bt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=bt(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[dt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[dt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ft]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{ze=zp.inject(Rp),Be=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Gs,s=Ks,c=qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ft]=t.current,Sd(e),new Fp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=l(d(),1),y=l(h(),1),b=l(_(),1),x=`modulepreload`,S=function(e){return`/zingbite/`+e},C={},w=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=S(t,n),t in C)return;C[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:x,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},T=`popstate`;function ee(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function E(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ne(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:re(t)}return ae(t,n,null,e)}function D(e,t){if(e===!1||e==null)throw Error(t)}function O(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function te(){return Math.random().toString(36).substring(2,10)}function k(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ne(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?ie(t):t,state:n,key:t&&t.key||r||te(),mask:i}}function re({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function ie(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ae(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=ee(e)?e:ne(h.location,e,t);n&&n(r,e),l=u()+1;let d=k(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=ee(e)?e:ne(h.location,e,t);n&&n(r,e),l=u();let i=k(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return A(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(T,d),c=e,()=>{i.removeEventListener(T,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function A(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),D(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:re(t);return i=i.replace(/ $/,`%20`),!n&&i.startsWith(`//`)&&(i=r+i),new URL(i,r)}function j(e,t,n=`/`){return oe(e,t,n,!1)}function oe(e,t,n,r,i){let a=Ce((typeof t==`string`?ie(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ce(e),s=null,c=Se(a);for(let e=0;s==null&&e<o.length;++e)s=ye(o[e],c,r);return s}function se(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function ce(e){let t=le(e);return N(t),t}function le(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;D(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Me([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(D(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),le(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:_e(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of M(e.path))a(e,t,!0,n)}),t}function M(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=M(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function N(e){e.sort((e,t)=>e.score===t.score?ve(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ue=/^:[\w-]+$/,de=3,fe=2,pe=1,me=10,he=-2,ge=e=>e===`*`;function _e(e,t){let n=e.split(`/`),r=n.length;return n.some(ge)&&(r+=he),t&&(r+=fe),n.filter(e=>!ge(e)).reduce((e,t)=>e+(ue.test(t)?de:t===``?pe:me),r)}function ve(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ye(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Me([a,u.pathname]),pathnameBase:Pe(Me([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Me([a,u.pathnameBase]))}return o}function be(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xe(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function xe(e,t=!1,n=!0){O(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Se(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return O(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ce(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var we=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Te(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?ie(e):e,a;return n?(n=je(n),a=n.startsWith(`/`)?Ee(n.substring(1),`/`):Ee(n,t)):a=t,{pathname:a,search:Fe(r),hash:Ie(i)}}function Ee(e,t){let n=Ne(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function De(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Oe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ke(e){let t=Oe(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ae(e,t,n,r=!1){let i;typeof e==`string`?i=ie(e):(i={...e},D(!i.pathname||!i.pathname.includes(`?`),De(`?`,`pathname`,`search`,i)),D(!i.pathname||!i.pathname.includes(`#`),De(`#`,`pathname`,`hash`,i)),D(!i.search||!i.search.includes(`#`),De(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Te(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var je=e=>e.replace(/\/\/+/g,`/`),Me=e=>je(e.join(`/`)),Ne=e=>e.replace(/\/+$/,``),Pe=e=>Ne(e).replace(/^\/*/,`/`),Fe=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ie=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Le=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Re(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function ze(e){return Me(e.map(e=>e.route.path).filter(Boolean))||`/`}var Be=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ve(e,t){let n=e;if(typeof n!=`string`||!we.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Be)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=Ce(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{O(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var He=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(He);var Ue=[`GET`,...He];new Set(Ue);var We=v.createContext(null);We.displayName=`DataRouter`;var Ge=v.createContext(null);Ge.displayName=`DataRouterState`;var Ke=v.createContext(!1);function qe(){return v.useContext(Ke)}var Je=v.createContext({isTransitioning:!1});Je.displayName=`ViewTransition`;var Ye=v.createContext(new Map);Ye.displayName=`Fetchers`;var Xe=v.createContext(null);Xe.displayName=`Await`;var Ze=v.createContext(null);Ze.displayName=`Navigation`;var Qe=v.createContext(null);Qe.displayName=`Location`;var $e=v.createContext({outlet:null,matches:[],isDataRoute:!1});$e.displayName=`Route`;var et=v.createContext(null);et.displayName=`RouteError`;var tt=`REACT_ROUTER_ERROR`,nt=`REDIRECT`,rt=`ROUTE_ERROR_RESPONSE`;function it(e){if(e.startsWith(`${tt}:${nt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function at(e){if(e.startsWith(`${tt}:${rt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Le(t.status,t.statusText,t.data)}catch{}}function ot(e,{relative:t}={}){D(st(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=v.useContext(Ze),{hash:i,pathname:a,search:o}=pt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Me([n,a])),r.createHref({pathname:s,search:o,hash:i})}function st(){return v.useContext(Qe)!=null}function ct(){return D(st(),`useLocation() may be used only in the context of a <Router> component.`),v.useContext(Qe).location}var lt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ut(e){v.useContext(Ze).static||v.useLayoutEffect(e)}function P(){let{isDataRoute:e}=v.useContext($e);return e?Mt():dt()}function dt(){D(st(),`useNavigate() may be used only in the context of a <Router> component.`);let e=v.useContext(We),{basename:t,navigator:n}=v.useContext(Ze),{matches:r}=v.useContext($e),{pathname:i}=ct(),a=JSON.stringify(ke(r)),o=v.useRef(!1);return ut(()=>{o.current=!0}),v.useCallback((r,s={})=>{if(O(o.current,lt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ae(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Me([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}v.createContext(null);function ft(){let{matches:e}=v.useContext($e);return e[e.length-1]?.params??{}}function pt(e,{relative:t}={}){let{matches:n}=v.useContext($e),{pathname:r}=ct(),i=JSON.stringify(ke(n));return v.useMemo(()=>Ae(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function mt(e,t){return ht(e,t)}function ht(e,t,n){D(st(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=v.useContext(Ze),{matches:i}=v.useContext($e),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Pt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ct(),d;if(t){let e=typeof t==`string`?ie(t):t;D(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):j(e,{pathname:p});O(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),O(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=St(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Me([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Me([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?v.createElement(Qe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function gt(){let e=jt(),t=Re(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=v.createElement(v.Fragment,null,v.createElement(`p`,null,`💿 Hey developer 👋`),v.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,v.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,v.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),v.createElement(v.Fragment,null,v.createElement(`h2`,null,`Unexpected Application Error!`),v.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?v.createElement(`pre`,{style:i},n):null,o)}var _t=v.createElement(gt,null),vt=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=at(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:v.createElement($e.Provider,{value:this.props.routeContext},v.createElement(et.Provider,{value:e,children:this.props.component}));return this.context?v.createElement(bt,{error:e},t):t}};vt.contextType=Ke;var yt=new WeakMap;function bt({children:e,error:t}){let{basename:n}=v.useContext(Ze);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=it(t.digest);if(e){let r=yt.get(t);if(r)throw r;let i=Ve(e.location,n);if(Be&&!yt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw yt.set(t,n),n}return v.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function xt({routeContext:e,match:t,children:n}){let r=v.useContext(We);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement($e.Provider,{value:e},n)}function St(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);D(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:ze(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||_t,o&&(s<0&&c===0?(Pt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?v.createElement(n.route.Component,null):n.route.element?n.route.element:e,v.createElement(xt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?v.createElement(vt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Ct(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function wt(e){let t=v.useContext(We);return D(t,Ct(e)),t}function Tt(e){let t=v.useContext(Ge);return D(t,Ct(e)),t}function Et(e){let t=v.useContext($e);return D(t,Ct(e)),t}function Dt(e){let t=Et(e),n=t.matches[t.matches.length-1];return D(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ot(){return Dt(`useRouteId`)}function kt(){let e=Tt(`useNavigation`);return v.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function At(){let{matches:e,loaderData:t}=Tt(`useMatches`);return v.useMemo(()=>e.map(e=>se(e,t)),[e,t])}function jt(){let e=v.useContext(et),t=Tt(`useRouteError`),n=Dt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Mt(){let{router:e}=wt(`useNavigate`),t=Dt(`useNavigate`),n=v.useRef(!1);return ut(()=>{n.current=!0}),v.useCallback(async(r,i={})=>{O(n.current,lt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Nt={};function Pt(e,t,n){!t&&!Nt[e]&&(Nt[e]=!0,O(!1,n))}v.memo(Ft);function Ft({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return ht(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function It({to:e,replace:t,state:n,relative:r}){D(st(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=v.useContext(Ze);O(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=v.useContext($e),{pathname:o}=ct(),s=P(),c=Ae(e,ke(a),o,r===`path`),l=JSON.stringify(c);return v.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function Lt(e){D(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Rt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){D(!st(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=v.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=ie(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=v.useMemo(()=>{let e=Ce(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return O(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:v.createElement(Ze.Provider,{value:c},v.createElement(Qe.Provider,{children:t,value:h}))}function zt({children:e,location:t}){return mt(Bt(e),t)}v.Component;function Bt(e,t=[]){let n=[];return v.Children.forEach(e,(e,r)=>{if(!v.isValidElement(e))return;let i=[...t,r];if(e.type===v.Fragment){n.push.apply(n,Bt(e.props.children,i));return}D(e.type===Lt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),D(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Bt(e.props.children,i)),n.push(a)}),n}var Vt=`get`,Ht=`application/x-www-form-urlencoded`;function Ut(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Wt(e){return Ut(e)&&e.tagName.toLowerCase()===`button`}function Gt(e){return Ut(e)&&e.tagName.toLowerCase()===`form`}function Kt(e){return Ut(e)&&e.tagName.toLowerCase()===`input`}function qt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Jt(e,t){return e.button===0&&(!t||t===`_self`)&&!qt(e)}function Yt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Xt(e,t){let n=Yt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Zt=null;function Qt(){if(Zt===null)try{new FormData(document.createElement(`form`),0),Zt=!1}catch{Zt=!0}return Zt}var $t=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function en(e){return e!=null&&!$t.has(e)?(O(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ht}"`),null):e}function tn(e,t){let n,r,i,a,o;if(Gt(e)){let o=e.getAttribute(`action`);r=o?Ce(o,t):null,n=e.getAttribute(`method`)||Vt,i=en(e.getAttribute(`enctype`))||Ht,a=new FormData(e)}else if(Wt(e)||Kt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?Ce(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Vt,i=en(e.getAttribute(`formenctype`))||en(o.getAttribute(`enctype`))||Ht,a=new FormData(o,e),!Qt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Ut(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Vt,r=null,i=Ht,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var nn={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},rn=/[&><\u2028\u2029]/g;function an(e){return e.replace(rn,e=>nn[e])}function on(e,t){if(e===!1||e==null)throw Error(t)}function sn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&Ce(i.pathname,t)===`/`?i.pathname=`${Ne(t)}/_root.${r}`:i.pathname=`${Ne(i.pathname)}.${r}`,i}async function cn(e,t){if(e.id in t)return t[e.id];try{let n=await w(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ln(e){return e!=null&&typeof e.page==`string`}function un(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function dn(e,t,n){return gn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await cn(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(un).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function fn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function pn(e,t,{includeHydrateFallback:n}={}){return mn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function mn(e){return[...new Set(e)]}function hn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function gn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!ln(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(hn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function _n(){let e=v.useContext(We);return on(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function vn(){let e=v.useContext(Ge);return on(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var yn=v.createContext(void 0);yn.displayName=`FrameworkContext`;function bn(){let e=v.useContext(yn);return on(e,`You must render this element inside a <HydratedRouter> element`),e}function xn(e,t){let n=v.useContext(yn),[r,i]=v.useState(!1),[a,o]=v.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=v.useRef(null);v.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),v.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Sn(s,p),onBlur:Sn(c,m),onMouseEnter:Sn(l,p),onMouseLeave:Sn(u,m),onTouchStart:Sn(d,p)}]:[a,f,{}]:[!1,f,{}]}function Sn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Cn({page:e,...t}){let n=qe(),{router:r}=_n(),i=v.useMemo(()=>j(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?v.createElement(Tn,{page:e,matches:i,...t}):v.createElement(En,{page:e,matches:i,...t}):null}function wn(e){let{manifest:t,routeModules:n}=bn(),[r,i]=v.useState([]);return v.useEffect(()=>{let r=!1;return dn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Tn({page:e,matches:t,...n}){let r=ct(),{future:i}=bn(),{basename:a}=_n(),o=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=sn(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return v.createElement(v.Fragment,null,o.map(e=>v.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function En({page:e,matches:t,...n}){let r=ct(),{future:i,manifest:a,routeModules:o}=bn(),{basename:s}=_n(),{loaderData:c,matches:l}=vn(),u=v.useMemo(()=>fn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=v.useMemo(()=>fn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=sn(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=v.useMemo(()=>pn(d,a),[d,a]),m=wn(d);return v.createElement(v.Fragment,null,f.map(e=>v.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>v.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>v.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Dn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}v.Component;var On=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{On&&(window.__reactRouterVersion=`7.16.0`)}catch{}function kn({basename:e,children:t,useTransitions:n,window:r}){let i=v.useRef();i.current??=E({window:r,v5Compat:!0});let a=i.current,[o,s]=v.useState({action:a.action,location:a.location}),c=v.useCallback(e=>{n===!1?s(e):v.startTransition(()=>s(e))},[n]);return v.useLayoutEffect(()=>a.listen(c),[a,c]),v.createElement(Rt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function An({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=v.useState({action:n.action,location:n.location}),o=v.useCallback(e=>{r===!1?a(e):v.startTransition(()=>a(e))},[r]);return v.useLayoutEffect(()=>n.listen(o),[n,o]),v.createElement(Rt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}An.displayName=`unstable_HistoryRouter`;var jn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,F=v.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=v.useContext(Ze),y=typeof l==`string`&&jn.test(l),b=Ve(l,h);l=b.to;let x=ot(l,{relative:r}),S=ct(),C=null;if(o){let e=Ae(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Me([h,e.pathname])),C=g.createHref(e)}let[w,T,ee]=xn(n,p),E=Rn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(b.isExternal||i),te=v.createElement(`a`,{...p,...ee,href:(O?C:void 0)||b.absoluteURL||x,onClick:O?D:e,ref:Dn(m,T),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?v.createElement(v.Fragment,null,te,v.createElement(Cn,{page:x})):te});F.displayName=`Link`;var Mn=v.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=pt(a,{relative:c.relative}),d=ct(),f=v.useContext(Ge),{navigator:p,basename:m}=v.useContext(Ze),h=f!=null&&Yn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=Ce(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=_===g||!r&&_.startsWith(g)&&_.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,T;T=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let ee=typeof i==`function`?i(C):i;return v.createElement(F,{...c,"aria-current":w,className:T,ref:l,style:ee,to:a,viewTransition:o},typeof s==`function`?s(C):s)});Mn.displayName=`NavLink`;var Nn=v.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Vt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=v.useContext(Ze),g=Hn(),_=Un(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&jn.test(s);return v.createElement(`form`,{ref:m,method:y,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?v.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});Nn.displayName=`Form`;function Pn({getKey:e,storageKey:t,...n}){let r=v.useContext(yn),{basename:i}=v.useContext(Ze),a=ct(),o=At();qn({getKey:e,storageKey:t});let s=v.useMemo(()=>{if(!r||!e)return null;let t=Kn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return v.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${an(JSON.stringify(t||Wn))}, ${an(JSON.stringify(s))})`}})}Pn.displayName=`ScrollRestoration`;function Fn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function In(e){let t=v.useContext(We);return D(t,Fn(e)),t}function Ln(e){let t=v.useContext(Ge);return D(t,Fn(e)),t}function Rn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=P(),d=ct(),f=pt(e,{relative:o});return v.useCallback(p=>{if(Jt(p,t)){p.preventDefault();let t=n===void 0?re(d)===re(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?v.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function zn(e){O(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=v.useRef(Yt(e)),n=v.useRef(!1),r=ct(),i=v.useMemo(()=>Xt(r.search,n.current?null:t.current),[r.search]),a=P();return[i,v.useCallback((e,t)=>{let r=Yt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var Bn=0,Vn=()=>`__${String(++Bn)}__`;function Hn(){let{router:e}=In(`useSubmit`),{basename:t}=v.useContext(Ze),n=Ot(),r=e.fetch,i=e.navigate;return v.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=tn(e,t);a.navigate===!1?await r(a.fetcherKey||Vn(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Un(e,{relative:t}={}){let{basename:n}=v.useContext(Ze),r=v.useContext($e);D(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...pt(e||`.`,{relative:t})},o=ct();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Me([n,a.pathname])),re(a)}var Wn=`react-router-scroll-positions`,Gn={};function Kn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:Ce(e.pathname,n)||e.pathname},t)),i??=e.key,i}function qn({getKey:e,storageKey:t}={}){let{router:n}=In(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Ln(`useScrollRestoration`),{basename:a}=v.useContext(Ze),o=ct(),s=At(),c=kt();v.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Jn(v.useCallback(()=>{if(c.state===`idle`){let t=Kn(o,s,a,e);Gn[t]=window.scrollY}try{sessionStorage.setItem(t||Wn,JSON.stringify(Gn))}catch(e){O(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(v.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Wn);e&&(Gn=JSON.parse(e))}catch{}},[t]),v.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Gn,()=>window.scrollY,e?(t,n)=>Kn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),v.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{O(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Jn(e,t){let{capture:n}=t||{};v.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Yn(e,{relative:t}={}){let n=v.useContext(Je);D(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=In(`useViewTransitionState`),i=pt(e,{relative:t});if(!n.isTransitioning)return!1;let a=Ce(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ce(n.nextLocation.pathname,r)||n.nextLocation.pathname;return be(i.pathname,o)!=null||be(i.pathname,a)!=null}function Xn(e,t){return function(){return e.apply(t,arguments)}}var{toString:Zn}=Object.prototype,{getPrototypeOf:Qn}=Object,{iterator:$n,toStringTag:er}=Symbol,tr=(e=>t=>{let n=Zn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),nr=e=>(e=e.toLowerCase(),t=>tr(t)===e),rr=e=>t=>typeof t===e,{isArray:ir}=Array,ar=rr(`undefined`);function or(e){return e!==null&&!ar(e)&&e.constructor!==null&&!ar(e.constructor)&&ur(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var sr=nr(`ArrayBuffer`);function cr(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&sr(e.buffer),t}var lr=rr(`string`),ur=rr(`function`),dr=rr(`number`),fr=e=>typeof e==`object`&&!!e,pr=e=>e===!0||e===!1,mr=e=>{if(tr(e)!==`object`)return!1;let t=Qn(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(er in e)&&!($n in e)},hr=e=>{if(!fr(e)||or(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},gr=nr(`Date`),_r=nr(`File`),vr=e=>!!(e&&e.uri!==void 0),yr=e=>e&&e.getParts!==void 0,br=nr(`Blob`),xr=nr(`FileList`),Sr=e=>fr(e)&&ur(e.pipe);function Cr(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var wr=Cr(),Tr=wr.FormData===void 0?void 0:wr.FormData,Er=e=>{if(!e)return!1;if(Tr&&e instanceof Tr)return!0;let t=Qn(e);if(!t||t===Object.prototype||!ur(e.append))return!1;let n=tr(e);return n===`formdata`||n===`object`&&ur(e.toString)&&e.toString()===`[object FormData]`},Dr=nr(`URLSearchParams`),[Or,kr,Ar,jr]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(nr),Mr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function Nr(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),ir(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(or(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Pr(e,t){if(or(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}var Fr=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,Ir=e=>!ar(e)&&e!==Fr;function Lr(...e){let{caseless:t,skipUndefined:n}=Ir(this)&&this||{},r={},i=(e,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=t&&Pr(r,i)||i,o=Yr(r,a)?r[a]:void 0;mr(o)&&mr(e)?r[a]=Lr(o,e):mr(e)?r[a]=Lr({},e):ir(e)?r[a]=e.slice():(!n||!ar(e))&&(r[a]=e)};for(let t=0,n=e.length;t<n;t++)e[t]&&Nr(e[t],i);return r}var Rr=(e,t,n,{allOwnKeys:r}={})=>(Nr(t,(t,r)=>{n&&ur(t)?Object.defineProperty(e,r,{__proto__:null,value:Xn(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{__proto__:null,value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),zr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Br=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Vr=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&Qn(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Hr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Ur=e=>{if(!e)return null;if(ir(e))return e;let t=e.length;if(!dr(t))return null;let n=Array(t);for(;t-- >0;)n[t]=e[t];return n},Wr=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&Qn(Uint8Array)),Gr=(e,t)=>{let n=(e&&e[$n]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},Kr=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},qr=nr(`HTMLFormElement`),Jr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),Yr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Xr=nr(`RegExp`),Zr=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};Nr(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},Qr=e=>{Zr(e,(t,n)=>{if(ur(e)&&[`arguments`,`caller`,`callee`].includes(n))return!1;let r=e[n];if(ur(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},$r=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return ir(e)?r(e):r(String(e).split(t)),n},ei=()=>{},ti=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function ni(e){return!!(e&&ur(e.append)&&e[er]===`FormData`&&e[$n])}var ri=e=>{let t=new WeakSet,n=e=>{if(fr(e)){if(t.has(e))return;if(or(e))return e;if(!(`toJSON`in e)){t.add(e);let r=ir(e)?[]:{};return Nr(e,(e,t)=>{let i=n(e);!ar(i)&&(r[t]=i)}),t.delete(e),r}}return e};return n(e)},ii=nr(`AsyncFunction`),ai=e=>e&&(fr(e)||ur(e))&&ur(e.then)&&ur(e.catch),oi=((e,t)=>e?setImmediate:t?((e,t)=>(Fr.addEventListener(`message`,({source:n,data:r})=>{n===Fr&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),Fr.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,ur(Fr.postMessage)),I={isArray:ir,isArrayBuffer:sr,isBuffer:or,isFormData:Er,isArrayBufferView:cr,isString:lr,isNumber:dr,isBoolean:pr,isObject:fr,isPlainObject:mr,isEmptyObject:hr,isReadableStream:Or,isRequest:kr,isResponse:Ar,isHeaders:jr,isUndefined:ar,isDate:gr,isFile:_r,isReactNativeBlob:vr,isReactNative:yr,isBlob:br,isRegExp:Xr,isFunction:ur,isStream:Sr,isURLSearchParams:Dr,isTypedArray:Wr,isFileList:xr,forEach:Nr,merge:Lr,extend:Rr,trim:Mr,stripBOM:zr,inherits:Br,toFlatObject:Vr,kindOf:tr,kindOfTest:nr,endsWith:Hr,toArray:Ur,forEachEntry:Gr,matchAll:Kr,isHTMLForm:qr,hasOwnProperty:Yr,hasOwnProp:Yr,reduceDescriptors:Zr,freezeMethods:Qr,toObjectSet:$r,toCamelCase:Jr,noop:ei,toFiniteNumber:ti,findKey:Pr,global:Fr,isContextDefined:Ir,isSpecCompliantForm:ni,toJSONObject:ri,isAsyncFn:ii,isThenable:ai,setImmediate:oi,asap:typeof queueMicrotask<`u`?queueMicrotask.bind(Fr):typeof process<`u`&&process.nextTick||oi,isIterable:e=>e!=null&&ur(e[$n])},si=I.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),ci=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&si[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t};function li(e){let t=0,n=e.length;for(;t<n;){let n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;n>t;){let t=e.charCodeAt(n-1);if(t!==9&&t!==32)break;--n}return t===0&&n===e.length?e:e.slice(t,n)}var ui=RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`,`g`),di=RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`,`g`);function fi(e,t){return I.isArray(e)?e.map(e=>fi(e,t)):li(String(e).replace(t,``))}var pi=e=>fi(e,ui),mi=e=>fi(e,di);function hi(e){let t=Object.create(null);return I.forEach(e.toJSON(),(e,n)=>{t[n]=mi(e)}),t}var gi=Symbol(`internals`);function _i(e){return e&&String(e).trim().toLowerCase()}function vi(e){return e===!1||e==null?e:I.isArray(e)?e.map(vi):pi(String(e))}function yi(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var bi=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function xi(e,t,n,r,i){if(I.isFunction(r))return r.call(this,t,n);if(i&&(t=n),I.isString(t)){if(I.isString(r))return t.indexOf(r)!==-1;if(I.isRegExp(r))return r.test(t)}}function Si(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Ci(e,t){let n=I.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var wi=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=_i(t);if(!i)throw Error(`header name must be a non-empty string`);let a=I.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=vi(e))}let a=(e,t)=>I.forEach(e,(e,n)=>i(e,n,t));if(I.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(I.isString(e)&&(e=e.trim())&&!bi(e))a(ci(e),t);else if(I.isObject(e)&&I.isIterable(e)){let n={},r,i;for(let t of e){if(!I.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);n[i=t[0]]=(r=n[i])?I.isArray(r)?[...r,t[1]]:[r,t[1]]:t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=_i(e),e){let n=I.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return yi(e);if(I.isFunction(t))return t.call(this,e,n);if(I.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=_i(e),e){let n=I.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||xi(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=_i(e),e){let i=I.findKey(n,e);i&&(!t||xi(n,n[i],i,t))&&(delete n[i],r=!0)}}return I.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||xi(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return I.forEach(this,(r,i)=>{let a=I.findKey(n,i);if(a){t[a]=vi(r),delete t[i];return}let o=e?Si(i):String(i).trim();o!==i&&delete t[i],t[o]=vi(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return I.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&I.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[gi]=this[gi]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=_i(e);t[r]||(Ci(n,e),t[r]=!0)}return I.isArray(e)?e.forEach(r):r(e),this}};wi.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),I.reduceDescriptors(wi.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),I.freezeMethods(wi);var Ti=`[REDACTED ****]`;function Ei(e){if(I.hasOwnProp(e,`toJSON`))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(I.hasOwnProp(t,`toJSON`))return!0;t=Object.getPrototypeOf(t)}return!1}function Di(e,t){let n=new Set(t.map(e=>String(e).toLowerCase())),r=[],i=e=>{if(typeof e!=`object`||!e||I.isBuffer(e))return e;if(r.indexOf(e)!==-1)return;e instanceof wi&&(e=e.toJSON()),r.push(e);let t;if(I.isArray(e))t=[],e.forEach((e,n)=>{let r=i(e);I.isUndefined(r)||(t[n]=r)});else{if(!I.isPlainObject(e)&&Ei(e))return r.pop(),e;t=Object.create(null);for(let[r,a]of Object.entries(e)){let e=n.has(r.toLowerCase())?Ti:i(a);I.isUndefined(e)||(t[r]=e)}}return r.pop(),t};return i(e)}var L=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return s.cause=t,s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){let e=this.config,t=e&&I.hasOwnProp(e,`redact`)?e.redact:void 0,n=I.isArray(t)&&t.length>0?Di(e,t):I.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};L.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,L.ERR_BAD_OPTION=`ERR_BAD_OPTION`,L.ECONNABORTED=`ECONNABORTED`,L.ETIMEDOUT=`ETIMEDOUT`,L.ECONNREFUSED=`ECONNREFUSED`,L.ERR_NETWORK=`ERR_NETWORK`,L.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,L.ERR_DEPRECATED=`ERR_DEPRECATED`,L.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,L.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,L.ERR_CANCELED=`ERR_CANCELED`,L.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,L.ERR_INVALID_URL=`ERR_INVALID_URL`,L.ERR_FORM_DATA_DEPTH_EXCEEDED=`ERR_FORM_DATA_DEPTH_EXCEEDED`;function Oi(e){return I.isPlainObject(e)||I.isArray(e)}function ki(e){return I.endsWith(e,`[]`)?e.slice(0,-2):e}function Ai(e,t,n){return e?e.concat(t).map(function(e,t){return e=ki(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function ji(e){return I.isArray(e)&&!e.some(Oi)}var Mi=I.toFlatObject(I,{},null,function(e){return/^is[A-Z]/.test(e)});function Ni(e,t,n){if(!I.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=I.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!I.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||d,a=n.dots,o=n.indexes,s=n.Blob||typeof Blob<`u`&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,l=s&&I.isSpecCompliantForm(t);if(!I.isFunction(i))throw TypeError(`visitor must be a function`);function u(e){if(e===null)return``;if(I.isDate(e))return e.toISOString();if(I.isBoolean(e))return e.toString();if(!l&&I.isBlob(e))throw new L(`Blob is not supported. Use a Buffer instead.`);return I.isArrayBuffer(e)||I.isTypedArray(e)?l&&typeof Blob==`function`?new Blob([e]):Buffer.from(e):e}function d(e,n,i){let s=e;if(I.isReactNative(t)&&I.isReactNativeBlob(e))return t.append(Ai(i,n,a),u(e)),!1;if(e&&!i&&typeof e==`object`){if(I.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(I.isArray(e)&&ji(e)||(I.isFileList(e)||I.endsWith(n,`[]`))&&(s=I.toArray(e)))return n=ki(n),s.forEach(function(e,r){!(I.isUndefined(e)||e===null)&&t.append(o===!0?Ai([n],r,a):o===null?n:n+`[]`,u(e))}),!1}return Oi(e)?!0:(t.append(Ai(i,n,a),u(e)),!1)}let f=[],p=Object.assign(Mi,{defaultVisitor:d,convertValue:u,isVisitable:Oi});function m(e,n,r=0){if(!I.isUndefined(e)){if(r>c)throw new L(`Object is too deeply nested (`+r+` levels). Max depth: `+c,L.ERR_FORM_DATA_DEPTH_EXCEEDED);if(f.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));f.push(e),I.forEach(e,function(e,a){(!(I.isUndefined(e)||e===null)&&i.call(t,e,I.isString(a)?a.trim():a,n,p))===!0&&m(e,n?n.concat(a):[a],r+1)}),f.pop()}}if(!I.isObject(e))throw TypeError(`data must be an object`);return m(e),t}function Pi(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(e){return t[e]})}function R(e,t){this._pairs=[],e&&Ni(e,this,t)}var z=R.prototype;z.append=function(e,t){this._pairs.push([e,t])},z.toString=function(e){let t=e?function(t){return e.call(this,t,Pi)}:Pi;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function Fi(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function Ii(e,t,n){if(!t)return e;let r=n&&n.encode||Fi,i=I.isFunction(n)?{serialize:n}:n,a=i&&i.serialize,o;if(o=a?a(t,i):I.isURLSearchParams(t)?t.toString():new R(t,i).toString(r),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var Li=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){I.forEach(this.handlers,function(t){t!==null&&e(t)})}},Ri={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},zi={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:R,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},Bi=s({hasBrowserEnv:()=>Vi,hasStandardBrowserEnv:()=>Ui,hasStandardBrowserWebWorkerEnv:()=>Wi,navigator:()=>Hi,origin:()=>Gi}),Vi=typeof window<`u`&&typeof document<`u`,Hi=typeof navigator==`object`&&navigator||void 0,Ui=Vi&&(!Hi||[`ReactNative`,`NativeScript`,`NS`].indexOf(Hi.product)<0),Wi=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,Gi=Vi&&window.location.href||`http://localhost`,Ki={...Bi,...zi};function qi(e,t){return Ni(e,new Ki.classes.URLSearchParams,{visitor:function(e,t,n,r){return Ki.isNode&&I.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}function Ji(e){return I.matchAll(/\w+|\[(\w*)]/g,e).map(e=>e[0]===`[]`?``:e[1]||e[0])}function Yi(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function Xi(e){function t(e,n,r,i){let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&I.isArray(r)?r.length:a,s?(I.hasOwnProp(r,a)?r[a]=I.isArray(r[a])?r[a].concat(n):[r[a],n]:r[a]=n,!o):((!I.hasOwnProp(r,a)||!I.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&I.isArray(r[a])&&(r[a]=Yi(r[a])),!o)}if(I.isFormData(e)&&I.isFunction(e.entries)){let n={};return I.forEachEntry(e,(e,r)=>{t(Ji(e),r,n,0)}),n}return null}var Zi=(e,t)=>e!=null&&I.hasOwnProp(e,t)?e[t]:void 0;function Qi(e,t,n){if(I.isString(e))try{return(t||JSON.parse)(e),I.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var $i={transitional:Ri,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=I.isObject(e);if(i&&I.isHTMLForm(e)&&(e=new FormData(e)),I.isFormData(e))return r?JSON.stringify(Xi(e)):e;if(I.isArrayBuffer(e)||I.isBuffer(e)||I.isStream(e)||I.isFile(e)||I.isBlob(e)||I.isReadableStream(e))return e;if(I.isArrayBufferView(e))return e.buffer;if(I.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){let t=Zi(this,`formSerializer`);if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return qi(e,t).toString();if((a=I.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let n=Zi(this,`env`),r=n&&n.FormData;return Ni(a?{"files[]":e}:e,r&&new r,t)}}return i||r?(t.setContentType(`application/json`,!1),Qi(e)):e}],transformResponse:[function(e){let t=Zi(this,`transitional`)||$i.transitional,n=t&&t.forcedJSONParsing,r=Zi(this,`responseType`),i=r===`json`;if(I.isResponse(e)||I.isReadableStream(e))return e;if(e&&I.isString(e)&&(n&&!r||i)){let n=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e,Zi(this,`parseReviver`))}catch(e){if(n)throw e.name===`SyntaxError`?L.from(e,L.ERR_BAD_RESPONSE,this,null,Zi(this,`response`)):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ki.classes.FormData,Blob:Ki.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};I.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`],e=>{$i.headers[e]={}});function ea(e,t){let n=this||$i,r=t||n,i=wi.from(r.headers),a=r.data;return I.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function ta(e){return!!(e&&e.__CANCEL__)}var na=class extends L{constructor(e,t,n){super(e??`canceled`,L.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function ra(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new L(`Request failed with status code `+n.status,n.status>=400&&n.status<500?L.ERR_BAD_REQUEST:L.ERR_BAD_RESPONSE,n.config,n.request,n))}function ia(e){let t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||``}function aa(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function oa(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var sa=(e,t,n=3)=>{let r=0,i=aa(50,250);return oa(n=>{if(!n||typeof n.loaded!=`number`)return;let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=o==null?a:Math.min(a,o),c=Math.max(0,s-r),l=i(c);r=Math.max(r,s),e({loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:l||void 0,estimated:l&&o?(o-s)/l:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},ca=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},la=e=>(...t)=>I.asap(()=>e(...t)),ua=Ki.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Ki.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Ki.origin),Ki.navigator&&/(msie|trident)/i.test(Ki.navigator.userAgent)):()=>!0,da=Ki.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];I.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),I.isString(r)&&s.push(`path=${r}`),I.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),I.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.split(`;`);for(let n=0;n<t.length;n++){let r=t[n].replace(/^\s+/,``),i=r.indexOf(`=`);if(i!==-1&&r.slice(0,i)===e)return decodeURIComponent(r.slice(i+1))}return null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function fa(e){return typeof e==`string`?/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e):!1}function pa(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}function ma(e,t,n){let r=!fa(t);return e&&(r||n===!1)?pa(e,t):t}var ha=e=>e instanceof wi?{...e}:e;function ga(e,t){t||={};let n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(e,t,n,r){return I.isPlainObject(e)&&I.isPlainObject(t)?I.merge.call({caseless:r},e,t):I.isPlainObject(t)?I.merge({},t):I.isArray(t)?t.slice():t}function i(e,t,n,i){if(!I.isUndefined(t))return r(e,t,n,i);if(!I.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!I.isUndefined(t))return r(void 0,t)}function o(e,t){if(!I.isUndefined(t))return r(void 0,t);if(!I.isUndefined(e))return r(void 0,e)}function s(n,i,a){if(I.hasOwnProp(t,a))return r(n,i);if(I.hasOwnProp(e,a))return r(void 0,n)}let c={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:s,headers:(e,t,n)=>i(ha(e),ha(t),n,!0)};return I.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=I.hasOwnProp(c,r)?c[r]:i,o=a(I.hasOwnProp(e,r)?e[r]:void 0,I.hasOwnProp(t,r)?t[r]:void 0,r);I.isUndefined(o)&&a!==s||(n[r]=o)}),n}var _a=[`content-type`,`content-length`];function va(e,t,n){if(n!==`content-only`){e.set(t);return}Object.entries(t).forEach(([t,n])=>{_a.includes(t.toLowerCase())&&e.set(t,n)})}var ya=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),ba=e=>{let t=ga({},e),n=e=>I.hasOwnProp(t,e)?t[e]:void 0,r=n(`data`),i=n(`withXSRFToken`),a=n(`xsrfHeaderName`),o=n(`xsrfCookieName`),s=n(`headers`),c=n(`auth`),l=n(`baseURL`),u=n(`allowAbsoluteUrls`),d=n(`url`);if(t.headers=s=wi.from(s),t.url=Ii(ma(l,d,u),e.params,e.paramsSerializer),c&&s.set(`Authorization`,`Basic `+btoa((c.username||``)+`:`+(c.password?ya(c.password):``))),I.isFormData(r)&&(Ki.hasStandardBrowserEnv||Ki.hasStandardBrowserWebWorkerEnv?s.setContentType(void 0):I.isFunction(r.getHeaders)&&va(s,r.getHeaders(),n(`formDataHeaderPolicy`))),Ki.hasStandardBrowserEnv&&(I.isFunction(i)&&(i=i(t)),i===!0||i==null&&ua(t.url))){let e=a&&o&&da.read(o);e&&s.set(a,e)}return t},xa=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=ba(e),i=r.data,a=wi.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=wi.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());ra(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.startsWith(`file:`))||setTimeout(g)},h.onabort=function(){h&&=(n(new L(`Request aborted`,L.ECONNABORTED,e,h)),m(),null)},h.onerror=function(t){let r=new L(t&&t.message?t.message:`Network Error`,L.ERR_NETWORK,e,h);r.event=t||null,n(r),m(),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||Ri;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new L(t,i.clarifyTimeoutError?L.ETIMEDOUT:L.ECONNABORTED,e,h)),m(),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&I.forEach(hi(a),function(e,t){h.setRequestHeader(t,e)}),I.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=sa(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=sa(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new na(null,e,h):t),h.abort(),m(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=ia(r.url);if(_&&!Ki.protocols.includes(_)){n(new L(`Unsupported protocol `+_+`:`,L.ERR_BAD_REQUEST,e));return}h.send(i||null)})},Sa=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;let n=new AbortController,r=!1,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof L?t:new na(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new L(`timeout of ${t}ms exceeded`,L.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i));let{signal:s}=n;return s.unsubscribe=()=>I.asap(o),s},Ca=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},wa=async function*(e,t){for await(let n of Ta(e))yield*Ca(n,t)},Ta=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},Ea=(e,t,n,r)=>{let i=wa(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})};function Da(e){if(!e||typeof e!=`string`||!e.startsWith(`data:`))return 0;let t=e.indexOf(`,`);if(t<0)return 0;let n=e.slice(5,t),r=e.slice(t+1);if(/;base64/i.test(n)){let e=r.length,t=r.length;for(let n=0;n<t;n++)if(r.charCodeAt(n)===37&&n+2<t){let t=r.charCodeAt(n+1),i=r.charCodeAt(n+2);(t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102)&&(i>=48&&i<=57||i>=65&&i<=70||i>=97&&i<=102)&&(e-=2,n+=2)}let n=0,i=t-1,a=e=>e>=2&&r.charCodeAt(e-2)===37&&r.charCodeAt(e-1)===51&&(r.charCodeAt(e)===68||r.charCodeAt(e)===100);i>=0&&(r.charCodeAt(i)===61?(n++,i--):a(i)&&(n++,i-=3)),n===1&&i>=0&&(r.charCodeAt(i)===61||a(i))&&n++;let o=Math.floor(e/4)*3-(n||0);return o>0?o:0}if(typeof Buffer<`u`&&typeof Buffer.byteLength==`function`)return Buffer.byteLength(r,`utf8`);let i=0;for(let e=0,t=r.length;e<t;e++){let n=r.charCodeAt(e);if(n<128)i+=1;else if(n<2048)i+=2;else if(n>=55296&&n<=56319&&e+1<t){let t=r.charCodeAt(e+1);t>=56320&&t<=57343?(i+=4,e++):i+=3}else i+=3}return i}var Oa=`1.16.1`,ka=64*1024,{isFunction:Aa}=I,ja=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Ma=e=>{let t=I.global!==void 0&&I.global!==null?I.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=I.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);let{fetch:i,Request:a,Response:o}=e,s=i?Aa(i):typeof fetch==`function`,c=Aa(a),l=Aa(o);if(!s)return!1;let u=s&&Aa(n),d=s&&(typeof r==`function`?(e=>t=>e.encode(t))(new r):async e=>new Uint8Array(await new a(e).arrayBuffer())),f=c&&u&&ja(()=>{let e=!1,t=new a(Ki.origin,{body:new n,method:`POST`,get duplex(){return e=!0,`half`}}),r=t.headers.has(`Content-Type`);return t.body!=null&&t.body.cancel(),e&&!r}),p=l&&u&&ja(()=>I.isReadableStream(new o(``).body)),m={stream:p&&(e=>e.body)};s&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!m[e]&&(m[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new L(`Response type '${e}' is not supported`,L.ERR_NOT_SUPPORT,n)})});let h=async e=>{if(e==null)return 0;if(I.isBlob(e))return e.size;if(I.isSpecCompliantForm(e))return(await new a(Ki.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(I.isArrayBufferView(e)||I.isArrayBuffer(e))return e.byteLength;if(I.isURLSearchParams(e)&&(e+=``),I.isString(e))return(await d(e)).byteLength},g=async(e,t)=>I.toFiniteNumber(e.getContentLength())??h(t);return async e=>{let{url:t,method:n,data:s,signal:l,cancelToken:u,timeout:d,onDownloadProgress:h,onUploadProgress:_,responseType:v,headers:y,withCredentials:b=`same-origin`,fetchOptions:x,maxContentLength:S,maxBodyLength:C}=ba(e),w=I.isNumber(S)&&S>-1,T=I.isNumber(C)&&C>-1,ee=i||fetch;v=v?(v+``).toLowerCase():`text`;let E=Sa([l,u&&u.toAbortSignal()],d),D=null,O=E&&E.unsubscribe&&(()=>{E.unsubscribe()}),te;try{if(w&&typeof t==`string`&&t.startsWith(`data:`)&&Da(t)>S)throw new L(`maxContentLength size of `+S+` exceeded`,L.ERR_BAD_RESPONSE,e,D);if(T&&n!==`get`&&n!==`head`){let t=await g(y,s);if(typeof t==`number`&&isFinite(t)&&t>C)throw new L(`Request body larger than maxBodyLength limit`,L.ERR_BAD_REQUEST,e,D)}if(_&&f&&n!==`get`&&n!==`head`&&(te=await g(y,s))!==0){let e=new a(t,{method:`POST`,body:s,duplex:`half`}),n;if(I.isFormData(s)&&(n=e.headers.get(`content-type`))&&y.setContentType(n),e.body){let[t,n]=ca(te,sa(la(_)));s=Ea(e.body,ka,t,n)}}I.isString(b)||(b=b?`include`:`omit`);let i=c&&`credentials`in a.prototype;if(I.isFormData(s)){let e=y.getContentType();e&&/^multipart\/form-data/i.test(e)&&!/boundary=/i.test(e)&&y.delete(`content-type`)}y.set(`User-Agent`,`axios/`+Oa,!1);let l={...x,signal:E,method:n.toUpperCase(),headers:hi(y.normalize()),body:s,duplex:`half`,credentials:i?b:void 0};D=c&&new a(t,l);let u=await(c?ee(D,x):ee(t,l));if(w){let t=I.toFiniteNumber(u.headers.get(`content-length`));if(t!=null&&t>S)throw new L(`maxContentLength size of `+S+` exceeded`,L.ERR_BAD_RESPONSE,e,D)}let d=p&&(v===`stream`||v===`response`);if(p&&u.body&&(h||w||d&&O)){let t={};[`status`,`statusText`,`headers`].forEach(e=>{t[e]=u[e]});let n=I.toFiniteNumber(u.headers.get(`content-length`)),[r,i]=h&&ca(n,sa(la(h),!0))||[],a=0;u=new o(Ea(u.body,ka,t=>{if(w&&(a=t,a>S))throw new L(`maxContentLength size of `+S+` exceeded`,L.ERR_BAD_RESPONSE,e,D);r&&r(t)},()=>{i&&i(),O&&O()}),t)}v||=`text`;let k=await m[I.findKey(m,v)||`text`](u,e);if(w&&!p&&!d){let t;if(k!=null&&(typeof k.byteLength==`number`?t=k.byteLength:typeof k.size==`number`?t=k.size:typeof k==`string`&&(t=typeof r==`function`?new r().encode(k).byteLength:k.length)),typeof t==`number`&&t>S)throw new L(`maxContentLength size of `+S+` exceeded`,L.ERR_BAD_RESPONSE,e,D)}return!d&&O&&O(),await new Promise((t,n)=>{ra(t,n,{data:k,headers:wi.from(u.headers),status:u.status,statusText:u.statusText,config:e,request:D})})}catch(t){if(O&&O(),E&&E.aborted&&E.reason instanceof L){let n=E.reason;throw n.config=e,D&&(n.request=D),t!==n&&(n.cause=t),n}throw t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)?Object.assign(new L(`Network Error`,L.ERR_NETWORK,e,D,t&&t.response),{cause:t.cause||t}):L.from(t,t&&t.code,e,D,t&&t.response)}}},Na=new Map,Pa=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=Na;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:Ma(t)),l=c;return c};Pa();var Fa={http:null,xhr:xa,fetch:{get:Pa}};I.forEach(Fa,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});var Ia=e=>`- ${e}`,La=e=>I.isFunction(e)||e===null||e===!1;function Ra(e,t){e=I.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!La(r)&&(i=Fa[(n=String(r)).toLowerCase()],i===void 0))throw new L(`Unknown adapter '${n}'`);if(i&&(I.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new L(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(Ia).join(`
`):` `+Ia(e[0]):`as no adapter specified`),`ERR_NOT_SUPPORT`)}return i}var za={getAdapter:Ra,adapters:Fa};function Ba(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new na(null,e)}function Va(e){return Ba(e),e.headers=wi.from(e.headers),e.data=ea.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),za.getAdapter(e.adapter||$i.adapter,e)(e).then(function(t){Ba(e),e.response=t;try{t.data=ea.call(e,e.transformResponse,t)}finally{delete e.response}return t.headers=wi.from(t.headers),t},function(t){if(!ta(t)&&(Ba(e),t&&t.response)){e.response=t.response;try{t.response.data=ea.call(e,e.transformResponse,t.response)}finally{delete e.response}t.response.headers=wi.from(t.response.headers)}return Promise.reject(t)})}var Ha={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{Ha[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var Ua={};Ha.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Oa+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new L(r(i,` has been removed`+(t?` in `+t:``)),L.ERR_DEPRECATED);return t&&!Ua[i]&&(Ua[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),e?e(n,i,a):!0}},Ha.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function Wa(e,t,n){if(typeof e!=`object`)throw new L(`options must be an object`,L.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-- >0;){let a=r[i],o=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new L(`option `+a+` must be `+n,L.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new L(`Unknown option `+a,L.ERR_BAD_OPTION)}}var Ga={assertOptions:Wa,validators:Ha},Ka=Ga.validators,qa=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Li,response:new Li}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=(()=>{if(!t.stack)return``;let e=t.stack.indexOf(`
`);return e===-1?``:t.stack.slice(e+1)})();try{if(!e.stack)e.stack=n;else if(n){let t=n.indexOf(`
`),r=t===-1?-1:n.indexOf(`
`,t+1),i=r===-1?``:n.slice(r+1);String(e.stack).endsWith(i)||(e.stack+=`
`+n)}}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=ga(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&Ga.assertOptions(n,{silentJSONParsing:Ka.transitional(Ka.boolean),forcedJSONParsing:Ka.transitional(Ka.boolean),clarifyTimeoutError:Ka.transitional(Ka.boolean),legacyInterceptorReqResOrdering:Ka.transitional(Ka.boolean)},!1),r!=null&&(I.isFunction(r)?t.paramsSerializer={serialize:r}:Ga.assertOptions(r,{encode:Ka.function,serialize:Ka.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),Ga.assertOptions(t,{baseUrl:Ka.spelling(`baseURL`),withXsrfToken:Ka.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&I.merge(i.common,i[t.method]);i&&I.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`,`common`],e=>{delete i[e]}),t.headers=wi.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||Ri;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[Va.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=Va.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=ga(this.defaults,e),Ii(ma(e.baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}};I.forEach([`delete`,`get`,`head`,`options`],function(e){qa.prototype[e]=function(t,n){return this.request(ga(n||{},{method:e,url:t,data:(n||{}).data}))}}),I.forEach([`post`,`put`,`patch`,`query`],function(e){function t(t){return function(n,r,i){return this.request(ga(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}qa.prototype[e]=t(),e!==`query`&&(qa.prototype[e+`Form`]=t(!0))});var Ja=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new na(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function Ya(e){return function(t){return e.apply(null,t)}}function Xa(e){return I.isObject(e)&&e.isAxiosError===!0}var Za={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Za).forEach(([e,t])=>{Za[t]=e});function Qa(e){let t=new qa(e),n=Xn(qa.prototype.request,t);return I.extend(n,qa.prototype,t,{allOwnKeys:!0}),I.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return Qa(ga(e,t))},n}var B=Qa($i);B.Axios=qa,B.CanceledError=na,B.CancelToken=Ja,B.isCancel=ta,B.VERSION=Oa,B.toFormData=Ni,B.AxiosError=L,B.Cancel=B.CanceledError,B.all=function(e){return Promise.all(e)},B.spread=Ya,B.isAxiosError=Xa,B.mergeConfig=ga,B.AxiosHeaders=wi,B.formToJSON=e=>Xi(I.isHTMLForm(e)?new FormData(e):e),B.getAdapter=za.getAdapter,B.HttpStatusCode=Za,B.default=B;var $a=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),eo=o(((e,t)=>{t.exports=$a()})),V=eo();B.defaults.withCredentials=!0,B.defaults.baseURL=typeof window<`u`?window.location.origin+`/zingbite`:`/zingbite`;var to=null,no=e=>{to=e};B.interceptors.request.use(e=>(to&&[`post`,`put`,`delete`].includes(e.method?.toLowerCase())&&(e.headers[`X-CSRF-Token`]=to),e));var ro=(0,v.createContext)(),io=({children:e})=>{let[t,n]=(0,v.useState)(null),[r,i]=(0,v.useState)(!0);return(0,v.useEffect)(()=>{(async()=>{try{let e=await B.get(`/api/login`);e.data.loggedIn&&(n(e.data.user),e.data.csrfToken&&no(e.data.csrfToken))}catch(e){console.error(`Auth check failed`,e)}finally{i(!1)}})()},[]),(0,V.jsx)(ro.Provider,{value:{user:t,loading:r,login:async(e,t)=>{try{let r=await B.post(`/api/login`,{email:e,password:t});return r.data.success?(n(r.data.user),r.data.csrfToken&&no(r.data.csrfToken),{success:!0,user:r.data.user}):{success:!1,error:r.data.error}}catch(e){return e.response&&e.response.data?{success:!1,error:e.response.data.error||`Login failed`}:{success:!1,error:`Network error or server down`}}},logout:async()=>{try{await B.post(`/api/logout`)}catch(e){console.error(`Failed to call logout API:`,e)}n(null),to=null},updateUser:e=>{n(e)}},children:e})},ao=async(e,t={})=>{try{await B.post(`/api/analytics`,{eventType:e,eventData:JSON.stringify(t)})}catch(t){console.warn(`[Analytics] Log failure:`,e,t.message)}},oo=e=>{ao(`PAGE_VIEW`,{page:e})},so=(0,v.createContext)(),co=({children:e})=>{let[t,n]=(0,v.useState)({items:[],total:0,subtotal:0,itemCount:0,shipping:0,tax:0}),[r,i]=(0,v.useState)(!0),[a,o]=(0,v.useState)(null),[s,c]=(0,v.useState)(null),[l,u]=(0,v.useState)(null),d=async()=>{try{let e=await B.get(`/api/cart`);e.data&&n(e.data)}catch(e){console.error(e)}finally{i(!1)}};(0,v.useEffect)(()=>{d()},[]),(0,v.useEffect)(()=>{(t?.items?Array.isArray(t.items)?t.items:Object.values(t.items):[]).length===0&&u(null)},[t]);let f=e=>{let n=e.toUpperCase().trim();return n===`ZING50`?(u({code:`ZING50`,type:`percent`,value:50,cap:150,description:`50% OFF up to ₹150`}),{success:!0,message:`Coupon ZING50 applied!`}):n===`FREEDEL`?(u({code:`FREEDEL`,type:`free_delivery`,value:t.shipping,description:`Free Delivery Applied`}),{success:!0,message:`Free Delivery coupon applied!`}):n===`WELCOME20`?(u({code:`WELCOME20`,type:`flat`,value:20,description:`Flat ₹20 OFF`}),{success:!0,message:`Flat ₹20 discount applied!`}):{success:!1,message:`Invalid Coupon Code`}},p=()=>{u(null)},m=()=>{if(!t)return{items:[],subtotal:0,shipping:0,tax:0,total:0,itemCount:0,discount:0};let e=t.subtotal||0,n=t.shipping||0,r=t.tax||0,i=0;l&&(l.type===`percent`?(i=e*l.value/100,l.cap&&(i=Math.min(i,l.cap))):l.type===`flat`?i=Math.min(l.value,e):l.type===`free_delivery`&&(i=n,n=0));let a=Math.max(0,e+n+r-i);return{...t,subtotal:e,shipping:n,tax:r,discount:i,total:a}},h=async(e,t)=>{try{let r=await B.post(`/api/cart`,{action:`add`,itemId:e,quantity:t});return r.data.restaurantConflict?(o({itemId:e,quantity:t}),!1):(n(r.data),c(null),ao(`ADD_TO_CART`,{itemId:e,quantity:t}),!0)}catch(e){return c(e.response?.data?.error||`Failed to add item to cart`),console.error(e),setTimeout(()=>c(null),4e3),!1}},g=async(e,r)=>{if(r<=0)return _(e);let i=(t?.items?Array.isArray(t.items)?t.items:Object.values(t.items):[]).find(t=>t.itemId===e||t.menuId===e),a=i?i.quantity:0,o=r>a;try{n((await B.post(`/api/cart`,{action:`updateQuantity`,itemId:e,quantity:r})).data),c(null),o&&ao(`ADD_TO_CART`,{itemId:e,quantity:r-a})}catch(e){c(e.response?.data?.error||`Failed to update cart`),console.error(e),setTimeout(()=>c(null),4e3)}},_=async e=>{try{n((await B.post(`/api/cart`,{action:`remove`,itemId:e})).data)}catch(e){console.error(e)}};return(0,V.jsx)(so.Provider,{value:{cart:m(),loading:r,addToCart:h,updateQuantity:g,removeFromCart:_,conflictPopup:a,setConflictPopup:o,clearAndAdd:async(e,t)=>{try{n((await B.post(`/api/cart`,{action:`clearAndAdd`,itemId:e,quantity:t})).data),o(null),ao(`ADD_TO_CART`,{itemId:e,quantity:t})}catch(e){console.error(e)}},clearCart:async()=>{try{n((await B.post(`/api/cart`,{action:`clear`})).data)}catch(e){console.error(e)}},coupon:l,applyCoupon:f,removeCoupon:p,cartError:s,setCartError:c},children:e})},lo=()=>(0,v.useContext)(so),uo=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),H=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),U=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),fo=e=>{let t=U(e);return t.charAt(0).toUpperCase()+t.slice(1)},po={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},mo=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},ho=(0,v.createContext)({}),go=()=>(0,v.useContext)(ho),_o=(0,v.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=go()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,v.createElement)(`svg`,{ref:c,...po,width:t??l??po.width,height:t??l??po.height,stroke:e??f,strokeWidth:m,className:uo(`lucide`,p,i),...!a&&!mo(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,v.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),W=(e,t)=>{let n=(0,v.forwardRef)(({className:n,...r},i)=>(0,v.createElement)(_o,{ref:i,iconNode:t,className:uo(`lucide-${H(fo(e))}`,`lucide-${e}`,n),...r}));return n.displayName=fo(e),n},vo=W(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),G=W(`arrow-up-right`,[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]),yo=W(`award`,[[`path`,{d:`m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526`,key:`1yiouv`}],[`circle`,{cx:`12`,cy:`8`,r:`6`,key:`1vp47v`}]]),bo=W(`banknote`,[[`rect`,{width:`20`,height:`12`,x:`2`,y:`6`,rx:`2`,key:`9lu3g6`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}],[`path`,{d:`M6 12h.01M18 12h.01`,key:`113zkx`}]]),xo=W(`bike`,[[`circle`,{cx:`18.5`,cy:`17.5`,r:`3.5`,key:`15x4ox`}],[`circle`,{cx:`5.5`,cy:`17.5`,r:`3.5`,key:`1noe27`}],[`circle`,{cx:`15`,cy:`5`,r:`1`,key:`19l28e`}],[`path`,{d:`M12 17.5V14l-3-3 4-3 2 3h2`,key:`1npguv`}]]),So=W(`book-open`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z`,key:`ruj8y`}]]),Co=W(`briefcase`,[[`path`,{d:`M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16`,key:`jecpp`}],[`rect`,{width:`20`,height:`14`,x:`2`,y:`6`,rx:`2`,key:`i6l2r4`}]]),wo=W(`building-2`,[[`path`,{d:`M10 12h4`,key:`a56b0p`}],[`path`,{d:`M10 8h4`,key:`1sr2af`}],[`path`,{d:`M14 21v-3a2 2 0 0 0-4 0v3`,key:`1rgiei`}],[`path`,{d:`M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2`,key:`secmi2`}],[`path`,{d:`M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16`,key:`16ra0t`}]]),To=W(`calendar`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}]]),Eo=W(`camera`,[[`path`,{d:`M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z`,key:`18u6gg`}],[`circle`,{cx:`12`,cy:`13`,r:`3`,key:`1vg3eu`}]]),Do=W(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),Oo=W(`circle-alert`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]]),ko=W(`circle-check-big`,[[`path`,{d:`M21.801 10A10 10 0 1 1 17 3.335`,key:`yps3ct`}],[`path`,{d:`m9 11 3 3L22 4`,key:`1pflzl`}]]),Ao=W(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),jo=W(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),Mo=W(`clipboard-list`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`M12 11h4`,key:`1jrz19`}],[`path`,{d:`M12 16h4`,key:`n85exb`}],[`path`,{d:`M8 11h.01`,key:`1dfujw`}],[`path`,{d:`M8 16h.01`,key:`18s6g9`}]]),No=W(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),Po=W(`compass`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z`,key:`9ktpf1`}]]),Fo=W(`cookie`,[[`path`,{d:`M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5`,key:`laymnq`}],[`path`,{d:`M8.5 8.5v.01`,key:`ue8clq`}],[`path`,{d:`M16 15.5v.01`,key:`14dtrp`}],[`path`,{d:`M12 12v.01`,key:`u5ubse`}],[`path`,{d:`M11 17v.01`,key:`1hyl5a`}],[`path`,{d:`M7 14v.01`,key:`uct60s`}]]),Io=W(`credit-card`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`2`,key:`ynyp8z`}],[`line`,{x1:`2`,x2:`22`,y1:`10`,y2:`10`,key:`1b3vmo`}]]),Lo=W(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),Ro=W(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),zo=W(`flame`,[[`path`,{d:`M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4`,key:`1slcih`}]]),Bo=W(`globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),Vo=W(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),Ho=W(`house`,[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]]),Uo=W(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),Wo=W(`info`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 16v-4`,key:`1dtifu`}],[`path`,{d:`M12 8h.01`,key:`e9boi3`}]]),Go=W(`loader`,[[`path`,{d:`M12 2v4`,key:`3427ic`}],[`path`,{d:`m16.2 7.8 2.9-2.9`,key:`r700ao`}],[`path`,{d:`M18 12h4`,key:`wj9ykh`}],[`path`,{d:`m16.2 16.2 2.9 2.9`,key:`1bxg5t`}],[`path`,{d:`M12 18v4`,key:`jadmvz`}],[`path`,{d:`m4.9 19.1 2.9-2.9`,key:`bwix9q`}],[`path`,{d:`M2 12h4`,key:`j09sii`}],[`path`,{d:`m4.9 4.9 2.9 2.9`,key:`giyufr`}]]),Ko=W(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),qo=W(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),Jo=W(`mail`,[[`path`,{d:`m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`,key:`132q7q`}],[`rect`,{x:`2`,y:`4`,width:`20`,height:`16`,rx:`2`,key:`izxlao`}]]),Yo=W(`map-pin`,[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]),Xo=W(`message-circle`,[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,key:`1sd12s`}]]),Zo=W(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),Qo=W(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),$o=W(`package`,[[`path`,{d:`M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z`,key:`1a0edw`}],[`path`,{d:`M12 22V12`,key:`d0xqtd`}],[`polyline`,{points:`3.29 7 12 12 20.71 7`,key:`ousv84`}],[`path`,{d:`m7.5 4.27 9 5.15`,key:`1c824w`}]]),es=W(`percent`,[[`line`,{x1:`19`,x2:`5`,y1:`5`,y2:`19`,key:`1x9vlm`}],[`circle`,{cx:`6.5`,cy:`6.5`,r:`2.5`,key:`4mh3h7`}],[`circle`,{cx:`17.5`,cy:`17.5`,r:`2.5`,key:`1mdrzq`}]]),ts=W(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),ns=W(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),rs=W(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),is=W(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),as=W(`send`,[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]),os=W(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),ss=W(`shield`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]),cs=W(`shopping-bag`,[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]),ls=W(`shopping-cart`,[[`circle`,{cx:`8`,cy:`21`,r:`1`,key:`jimo8o`}],[`circle`,{cx:`19`,cy:`21`,r:`1`,key:`13723u`}],[`path`,{d:`M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`,key:`9zh506`}]]),us=W(`smartphone`,[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,ry:`2`,key:`1yt0o3`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}]]),ds=W(`square-pen`,[[`path`,{d:`M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7`,key:`1m0v6g`}],[`path`,{d:`M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z`,key:`ohrbg2`}]]),fs=W(`star`,[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]),ps=W(`store`,[[`path`,{d:`M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5`,key:`slp6dd`}],[`path`,{d:`M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244`,key:`o0xfot`}],[`path`,{d:`M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05`,key:`wn3emo`}]]),ms=W(`sun`,[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M12 20v2`,key:`1lh1kg`}],[`path`,{d:`m4.93 4.93 1.41 1.41`,key:`149t6j`}],[`path`,{d:`m17.66 17.66 1.41 1.41`,key:`ptbguv`}],[`path`,{d:`M2 12h2`,key:`1t8f8n`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}],[`path`,{d:`m6.34 17.66-1.41 1.41`,key:`1m8zz5`}],[`path`,{d:`m19.07 4.93-1.41 1.41`,key:`1shlcs`}]]),hs=W(`tag`,[[`path`,{d:`M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z`,key:`vktsd0`}],[`circle`,{cx:`7.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`kqv944`}]]),gs=W(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),_s=W(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),vs=W(`truck`,[[`path`,{d:`M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2`,key:`wrbu53`}],[`path`,{d:`M15 18H9`,key:`1lyqi6`}],[`path`,{d:`M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14`,key:`lysw3i`}],[`circle`,{cx:`17`,cy:`18`,r:`2`,key:`332jqn`}],[`circle`,{cx:`7`,cy:`18`,r:`2`,key:`19iecd`}]]),ys=W(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),bs=W(`users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`,key:`16gr8j`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),xs=W(`utensils-crossed`,[[`path`,{d:`m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8`,key:`n7qcjb`}],[`path`,{d:`M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7`,key:`d0u48b`}],[`path`,{d:`m2.1 21.8 6.4-6.3`,key:`yn04lh`}],[`path`,{d:`m19 5-7 7`,key:`194lzd`}]]),Ss=W(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),Cs=W(`zap`,[[`path`,{d:`M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z`,key:`1xq2db`}]]),ws=(0,v.createContext)(),Ts=({children:e})=>{let[t,n]=(0,v.useState)({show:!1,title:``,message:``,type:`info`,onClose:null}),r=(e,t=`info`,r=``,i=null)=>{let a=r;a||=t===`success`?`Success`:t===`error`?`Error`:t===`warning`?`Warning`:`Information`;let o=e=>e?e.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2700}-\u{27BF}\u{1F680}-\u{1F6FF}\u{24C2}-\u{1F251}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,``):``;n({show:!0,title:o(a).trim(),message:o(e),type:t,onClose:i})},i=()=>{if(t.onClose)try{t.onClose()}catch(e){console.error(`Error in modal onClose callback:`,e)}n(e=>({...e,show:!1}))};return(0,V.jsxs)(ws.Provider,{value:{showAlert:r},children:[e,t.show&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
            .premium-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(15, 12, 30, 0.45);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 99999;
              animation: premiumModalFadeIn 0.25s ease-out;
            }
            .premium-modal-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              border: 1px solid rgba(247, 55, 79, 0.2);
              box-shadow: 0 24px 48px rgba(247, 55, 79, 0.12), 0 0 0 1px rgba(247, 55, 79, 0.02);
              width: 90%;
              max-width: 440px;
              padding: 30px;
              position: relative;
              animation: premiumModalSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .premium-modal-close-btn {
              position: absolute;
              top: 18px;
              right: 18px;
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 50%;
            }
            .premium-modal-close-btn:hover {
              background: var(--bg-surface-hover);
              color: var(--text-primary);
            }

            .premium-modal-header {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 16px;
              margin-bottom: 20px;
            }

            .premium-modal-icon {
              padding: 12px;
              border-radius: 16px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: rgba(247, 55, 79, 0.08);
              color: var(--brand-red);
            }

            .premium-modal-title {
              font-family: 'Outfit', sans-serif;
              font-size: 1.35rem;
              font-weight: 800;
              color: var(--text-primary);
              margin: 0;
            }

            .premium-modal-body {
              font-size: 0.92rem;
              color: var(--text-secondary);
              line-height: 1.6;
              text-align: center;
              margin-bottom: 26px;
              white-space: pre-line;
            }

            .premium-modal-actions {
              display: flex;
              justify-content: center;
            }

            .premium-modal-btn {
              color: white;
              border: none;
              padding: 12px 36px;
              border-radius: 30px;
              font-weight: 700;
              font-size: 0.95rem;
              cursor: pointer;
              transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
              background: linear-gradient(135deg, #F7374F 0%, #ff5263 100%);
              box-shadow: 0 4px 14px rgba(247, 55, 79, 0.3);
              min-width: 150px;
              text-align: center;
            }
            .premium-modal-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(247, 55, 79, 0.4);
            }
            .premium-modal-btn:active {
              transform: translateY(0);
            }

            @keyframes premiumModalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes premiumModalSlideUp {
              from { transform: translateY(28px) scale(0.95); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}),(0,V.jsx)(`div`,{className:`premium-modal-overlay`,onClick:i,children:(0,V.jsxs)(`div`,{className:`premium-modal-card`,onClick:e=>e.stopPropagation(),children:[(0,V.jsx)(`button`,{className:`premium-modal-close-btn`,onClick:i,children:(0,V.jsx)(Ss,{size:18})}),(0,V.jsxs)(`div`,{className:`premium-modal-header`,children:[(()=>{switch(t.type){case`success`:return(0,V.jsx)(Ao,{className:`premium-modal-icon`,size:38});case`error`:return(0,V.jsx)(_s,{className:`premium-modal-icon`,size:38});case`warning`:return(0,V.jsx)(_s,{className:`premium-modal-icon`,size:38});default:return(0,V.jsx)(Wo,{className:`premium-modal-icon`,size:38})}})(),(0,V.jsx)(`h3`,{className:`premium-modal-title`,children:t.title})]}),(0,V.jsx)(`div`,{className:`premium-modal-body`,children:t.message}),(0,V.jsx)(`div`,{className:`premium-modal-actions`,children:(0,V.jsx)(`button`,{className:`premium-modal-btn`,onClick:i,children:`OK`})})]})})]})]})},Es=()=>{let e=(0,v.useContext)(ws);if(!e)throw Error(`useModal must be used within a ModalProvider`);return e},Ds=(0,v.createContext)(),Os=({children:e})=>{let[t,n]=(0,v.useState)(()=>{let e=localStorage.getItem(`zingbite_theme`);return e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches});return(0,v.useEffect)(()=>{let e=document.documentElement;t?(e.setAttribute(`data-theme`,`dark`),localStorage.setItem(`zingbite_theme`,`dark`)):(e.removeAttribute(`data-theme`),localStorage.setItem(`zingbite_theme`,`light`))},[t]),(0,V.jsx)(Ds.Provider,{value:{darkMode:t,toggleTheme:()=>n(e=>!e)},children:e})},ks=()=>(0,v.useContext)(Ds),As=({onClose:e})=>{let{user:t}=(0,v.useContext)(ro),[n,r]=(0,v.useState)([]),[i,a]=(0,v.useState)(null),[o,s]=(0,v.useState)(!0),[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(!1),f=(0,v.useRef)(null),p=async()=>{if(t)try{let e=u?`?all=true`:``;r((await B.get(`/api/emails${e}`)).data||[]),l(``)}catch(e){console.error(`Failed to fetch simulated emails:`,e),l(`Failed to load mailbox.`)}finally{s(!1)}};(0,v.useEffect)(()=>{s(!0),p(),f.current=setInterval(()=>{document.visibilityState===`visible`&&p()},7500);let e=()=>{document.visibilityState===`visible`&&p()};return document.addEventListener(`visibilitychange`,e),()=>{f.current&&clearInterval(f.current),document.removeEventListener(`visibilitychange`,e)}},[u]);let m=e=>{if(!e)return`N/A`;let t=new Date(e);return isNaN(t.getTime())?e:t.toLocaleDateString([],{month:`short`,day:`numeric`})+` `+t.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})},h=e=>{switch(e){case`SENT`:return{backgroundColor:`rgba(96,178,70,0.12)`,color:`#60b246`,icon:(0,V.jsx)(ko,{size:12})};case`FAILED`:return{backgroundColor:`rgba(226,55,68,0.12)`,color:`#e23744`,icon:(0,V.jsx)(Oo,{size:12})};case`DISABLED`:return{backgroundColor:`rgba(158,158,158,0.12)`,color:`#9e9e9e`,icon:(0,V.jsx)(jo,{size:12})};default:return{backgroundColor:`rgba(245,166,35,0.12)`,color:`#f5a623`,icon:(0,V.jsx)(jo,{size:12})}}},g=e=>e?e.replace(/<[^>]*>/g,``).substring(0,80)+`...`:``;return(0,V.jsx)(`div`,{style:{position:`fixed`,inset:0,zIndex:50,display:`flex`,alignItems:`center`,justifyContent:`center`,backgroundColor:`rgba(0,0,0,0.5)`,backdropFilter:`blur(4px)`,fontFamily:`'Inter', sans-serif`},children:(0,V.jsxs)(`div`,{style:{backgroundColor:`#fff`,borderRadius:`16px`,boxShadow:`0 24px 64px rgba(28,28,28,0.2)`,width:`100%`,maxWidth:`900px`,height:`600px`,display:`flex`,flexDirection:`column`,overflow:`hidden`},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`16px 24px`,borderBottom:`1px solid #f0f0f0`,backgroundColor:`#F7374F`,color:`#fff`},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,V.jsx)(Jo,{size:22}),(0,V.jsx)(`h2`,{style:{fontSize:`17px`,fontWeight:700,margin:0},children:`ZingBite Notification Mailbox`})]}),(0,V.jsx)(`button`,{onClick:e,style:{background:`transparent`,border:`none`,color:`#fff`,cursor:`pointer`,padding:`4px`,borderRadius:`50%`,display:`flex`,alignItems:`center`,transition:`background-color 0.2s`},onMouseEnter:e=>e.target.style.backgroundColor=`rgba(0,0,0,0.15)`,onMouseLeave:e=>e.target.style.backgroundColor=`transparent`,children:(0,V.jsx)(Ss,{size:20})})]}),t?.role===`super_admin`&&(0,V.jsxs)(`div`,{style:{padding:`8px 24px`,borderBottom:`1px solid #f0f0f0`,backgroundColor:`#f8f9fa`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,V.jsx)(`input`,{type:`checkbox`,id:`show-all-system`,checked:u,onChange:e=>d(e.target.checked),style:{accentColor:`#F7374F`,cursor:`pointer`}}),(0,V.jsx)(`label`,{htmlFor:`show-all-system`,style:{fontSize:`11px`,color:`#696969`,fontWeight:600,cursor:`pointer`},children:`Show all system notification logs (Super Admin)`})]}),(0,V.jsxs)(`div`,{style:{flex:1,display:`flex`,overflow:`hidden`},children:[(0,V.jsx)(`div`,{style:{width:`40%`,borderRight:`1px solid #f0f0f0`,overflowY:`auto`,backgroundColor:`#fff`},children:o?(0,V.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:`100%`},children:(0,V.jsx)(Go,{size:24,style:{animation:`spin 1s linear infinite`},color:`#F7374F`})}):c?(0,V.jsx)(`div`,{style:{padding:`16px`,textAlign:`center`,fontSize:`13px`,color:`#e23744`},children:c}):n.length===0?(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,height:`100%`,color:`#9e9e9e`,gap:`4px`},children:[(0,V.jsx)(Uo,{size:40,style:{opacity:.5}}),(0,V.jsx)(`p`,{style:{fontSize:`13px`},children:`Mailbox is empty`})]}):n.map(e=>{let t=i?.id===e.id,n=h(e.status);return(0,V.jsxs)(`button`,{onClick:()=>a(e),style:{width:`100%`,textAlign:`left`,padding:`14px 16px`,borderBottom:`1px solid #f8f9fa`,cursor:`pointer`,display:`flex`,flexDirection:`column`,gap:`3px`,border:`none`,outline:`none`,fontFamily:`'Inter', sans-serif`,backgroundColor:t?`rgba(247,55,79,0.06)`:`#fff`,borderLeft:t?`3px solid #F7374F`:`3px solid transparent`,transition:`background-color 0.15s, border-left 0.15s`},onMouseEnter:e=>{t||(e.currentTarget.style.backgroundColor=`#f8f9fa`)},onMouseLeave:e=>{t||(e.currentTarget.style.backgroundColor=`#fff`)},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,width:`100%`},children:[(0,V.jsxs)(`span`,{style:{fontWeight:600,fontSize:`11px`,color:`#9e9e9e`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,maxWidth:`65%`},children:[`To: `,e.recipientEmail||`User #${e.userId}`]}),(0,V.jsxs)(`span`,{style:{fontSize:`10px`,color:`#9e9e9e`,display:`flex`,alignItems:`center`,gap:`3px`,flexShrink:0},children:[(0,V.jsx)(To,{size:10}),m(e.sentDate)]})]}),(0,V.jsx)(`span`,{style:{fontWeight:700,fontSize:`13px`,color:`#1c1c1c`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,width:`100%`},children:e.subject}),(0,V.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,width:`100%`},children:[(0,V.jsx)(`span`,{style:{fontSize:`11px`,color:`#9e9e9e`,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,maxWidth:`70%`},children:g(e.body)}),(0,V.jsxs)(`span`,{style:{fontSize:`9px`,fontWeight:700,padding:`2px 6px`,borderRadius:`9999px`,backgroundColor:n.backgroundColor,color:n.color,display:`flex`,alignItems:`center`,gap:`3px`,flexShrink:0},children:[n.icon,` `,e.status]})]})]},e.id)})}),(0,V.jsx)(`div`,{style:{width:`60%`,overflowY:`auto`,backgroundColor:`#f8f9fa`,padding:`24px`,display:`flex`,flexDirection:`column`},children:i?(0,V.jsxs)(`div`,{style:{backgroundColor:`#fff`,borderRadius:`12px`,border:`1px solid #f0f0f0`,boxShadow:`0 2px 8px rgba(28,28,28,0.05)`,padding:`24px`,flex:1,display:`flex`,flexDirection:`column`},children:[(0,V.jsxs)(`div`,{style:{borderBottom:`1px solid #f0f0f0`,paddingBottom:`16px`,marginBottom:`16px`},children:[(0,V.jsx)(`h3`,{style:{fontWeight:700,fontSize:`16px`,color:`#1c1c1c`,margin:`0 0 10px 0`,fontFamily:`'Outfit', sans-serif`},children:i.subject}),(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`3px`,fontSize:`11px`,color:`#696969`},children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{style:{fontWeight:700},children:`From:`}),` ZingBite Operations <support@zingbite.com>`]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{style:{fontWeight:700},children:`To:`}),` `,i.recipientEmail||`User #${i.userId}`]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{style:{fontWeight:700},children:`Date:`}),` `,m(i.sentDate)]}),(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,V.jsx)(`span`,{style:{fontWeight:700},children:`Status:`}),(()=>{let e=h(i.status);return(0,V.jsxs)(`span`,{style:{padding:`2px 8px`,borderRadius:`9999px`,fontSize:`10px`,fontWeight:700,backgroundColor:e.backgroundColor,color:e.color,display:`inline-flex`,alignItems:`center`,gap:`3px`},children:[e.icon,` `,i.status]})})()]})]})]}),(0,V.jsx)(`div`,{style:{flex:1,fontSize:`13px`,color:`#1c1c1c`,overflowY:`auto`,border:`1px solid #f0f0f0`,borderRadius:`8px`,padding:`16px`,backgroundColor:`#fff`,lineHeight:1.6},dangerouslySetInnerHTML:{__html:i.body}})]}):(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,height:`100%`,color:`#9e9e9e`,gap:`6px`,textAlign:`center`},children:[(0,V.jsx)(Jo,{size:48,style:{opacity:.5}}),(0,V.jsx)(`p`,{style:{fontSize:`14px`,fontWeight:600},children:`No Email Selected`}),(0,V.jsx)(`p`,{style:{fontSize:`12px`,maxWidth:`260px`,lineHeight:1.4},children:`Select a simulated notification email from the left pane to preview its rendered markup styling.`})]})})]})]})})},js=()=>{let{user:e,logout:t}=(0,v.useContext)(ro),{cart:n}=lo(),r=P(),i=ct(),[a,o]=(0,v.useState)(!1),[s,c]=(0,v.useState)(!1),[l,u]=(0,v.useState)(0),[d,f]=(0,v.useState)(!1),[p,m]=(0,v.useState)({x:.5,y:.5}),h=(0,v.useRef)(null);(0,v.useEffect)(()=>{let e=()=>{o(window.scrollY>10);let e=window.scrollY,t=document.documentElement.scrollHeight-window.innerHeight;u(t>0?Math.min(e/t*100,100):0)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]),(0,v.useEffect)(()=>{if(!s)return;let e=document.body.style.overflow;document.body.style.overflow=`hidden`;let t=e=>{e.key===`Escape`&&c(!1)};return window.addEventListener(`keydown`,t),()=>{document.body.style.overflow=e,window.removeEventListener(`keydown`,t)}},[s]),(0,v.useEffect)(()=>{if(e&&e.role&&e.role!==`customer`){let t=i.pathname;([`/`,`/home`,`/menu`,`/cart`,`/checkout`,`/profile`,`/track-order`].includes(t)||t.startsWith(`/info/`))&&(e.role===`delivery_partner`?r(`/delivery`):e.role===`restaurant_admin`?r(`/restaurant-admin`):e.role===`super_admin`&&r(`/admin`))}},[e,i.pathname,r]);let g=()=>{t(),c(!1),r(`/`)},_=()=>c(!1),y=()=>{c(!1)},b=()=>e?e.role===`delivery_partner`?`/delivery`:e.role===`restaurant_admin`?`/restaurant-admin`:e.role===`super_admin`?`/admin`:`/`:`/`,x=e=>i.pathname===e,S=(0,v.useCallback)(e=>{if(!h.current)return;let t=h.current.getBoundingClientRect();m({x:(e.clientX-t.left)/t.width,y:(e.clientY-t.top)/t.height})},[]);return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(32px) saturate(220%);
          -webkit-backdrop-filter: blur(32px) saturate(220%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.5s var(--ease-premium);
          padding: 0 20px;
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at ${p.x*100}% ${p.y*100}%, rgba(247,55,79,0.04), transparent 60%);
          pointer-events: none;
          transition: background 0.3s ease;
        }
        .header.scrolled {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(0,0,0,0.03);
          backdrop-filter: blur(40px) saturate(250%);
          -webkit-backdrop-filter: blur(40px) saturate(250%);
        }
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.15), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .header.scrolled::after {
          opacity: 1;
        }
        .scroll-progress {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff7a8a, #ffb347, var(--brand-red));
          background-size: 200% 100%;
          transition: width 0.1s linear;
          z-index: 2;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 12px rgba(247,55,79,0.5), 0 0 24px rgba(247,55,79,0.2);
          animation: progressGlow 2s linear infinite;
        }
        @keyframes progressGlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          height: 72px;
          transition: height 0.5s var(--ease-premium);
          gap: 18px;
          transform-style: preserve-3d;
        }
        .header.scrolled .header-inner {
          height: 64px;
        }
        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          transition: transform 0.5s var(--ease-spring);
          transform-style: preserve-3d;
        }
        .logo-link:hover {
          transform: scale(1.04) translateZ(20px);
        }
        .logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 2px 12px rgba(247, 55, 79, 0.3);
          transition: box-shadow 0.5s var(--ease-premium), transform 0.6s var(--ease-spring);
          transform-style: preserve-3d;
          animation: logoFloat3D 4s var(--ease-premium) infinite;
        }
        @keyframes logoFloat3D {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg) translateZ(0); }
          25% { transform: rotateY(5deg) rotateX(-3deg) translateZ(6px); }
          50% { transform: rotateY(0deg) rotateX(0deg) translateZ(0); }
          75% { transform: rotateY(-5deg) rotateX(3deg) translateZ(6px); }
        }
        .logo-link:hover .logo-icon {
          box-shadow: 0 8px 30px rgba(247, 55, 79, 0.5), 0 0 40px rgba(247,55,79,0.15);
          transform: rotate(-8deg) scale(1.08) translateZ(16px);
          animation: none;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
          transition: color 0.3s ease;
          text-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .logo-text span {
          color: var(--brand-red);
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          min-width: 0;
          flex: 1;
          flex-wrap: nowrap;
          transform-style: preserve-3d;
        }
        .nav-link {
          position: relative;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: all 0.35s var(--ease-premium);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 600px;
          backface-visibility: hidden;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: linear-gradient(90deg, var(--brand-red), #ff7a8a, var(--brand-red));
          background-size: 200% 100%;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s var(--ease-premium);
          border-radius: 2px;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
          transform: translateZ(12px) rotateX(-2deg);
        }
        .nav-link:hover::before {
          transform: scaleX(1);
          animation: shimmerUnderline 2s linear infinite;
        }
        @keyframes shimmerUnderline {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .nav-link.active {
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.06);
        }
        .nav-link.active::before {
          transform: scaleX(1);
          animation: shimmerUnderline 2s linear infinite;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-sm);
          background: radial-gradient(circle at center, rgba(247,55,79,0.08), transparent 70%);
          pointer-events: none;
        }
        .nav-welcome {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 12px;
          background: var(--bg-surface);
          border-radius: 20px;
          transform-style: preserve-3d;
        }
        .nav-btn-logout {
          background: none;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          font-size: 0.9rem;
          font-family: inherit;
          padding: 8px 18px;
          border-radius: 20px;
          transition: all 0.35s var(--ease-premium);
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .nav-btn-logout::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(226,55,68,0.08), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: 20px;
        }
        .nav-btn-logout:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
          transform: translateY(-2px) translateZ(8px);
          box-shadow: 0 4px 16px rgba(226,55,68,0.15);
        }
        .nav-btn-logout:hover::before {
          opacity: 1;
        }
        .nav-btn-signup {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          padding: 9px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.4s var(--ease-premium);
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.25);
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .nav-btn-signup::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .nav-btn-signup:hover::after {
          transform: translateX(100%);
        }
        .nav-btn-signup::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg, var(--brand-red), #ffb347, var(--brand-red), #ff6b7a);
          background-size: 300% 300%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: glowRotate 3s linear infinite;
        }
        @keyframes glowRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nav-btn-signup:hover {
          background: linear-gradient(135deg, var(--brand-red-hover), #e55a6a);
          color: #fff;
          transform: translateY(-3px) translateZ(16px) scale(1.02);
          box-shadow: 0 8px 28px rgba(247, 55, 79, 0.45), 0 0 40px rgba(247,55,79,0.15);
        }
        .nav-btn-signup:hover::before {
          opacity: 1;
          filter: blur(6px);
        }
        .cart-badge {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          border-radius: 10px;
          padding: 1px 7px;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 18px;
          text-align: center;
          animation: badgePop3D 0.5s var(--ease-spring) both;
          display: inline-block;
          transform-style: preserve-3d;
          box-shadow: 0 2px 8px rgba(247,55,79,0.3);
        }
        @keyframes badgePop3D {
          0% { transform: scale(0) rotateY(180deg) translateZ(-20px); opacity: 0; }
          60% { transform: scale(1.2) rotateY(-10deg) translateZ(10px); opacity: 1; }
          100% { transform: scale(1) rotateY(0deg) translateZ(0); opacity: 1; }
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s, transform 0.3s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .hamburger:hover {
          background: var(--bg-surface);
          transform: translateZ(6px);
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          margin: 5px 0;
          border-radius: 2px;
          transition: all 0.35s var(--ease-premium);
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
          width: 20px;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px) scaleX(0.5);
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
          width: 20px;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          max-width: 85%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow: -10px 0 60px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 24px 20px;
          z-index: 1000;
          transform: translateX(100%) rotateY(-10deg);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 1px solid rgba(0, 0, 0, 0.06);
          perspective: 800px;
          transform-style: preserve-3d;
        }
        .mobile-menu.open {
          transform: translateX(0) rotateY(0deg);
        }
        .mobile-menu .nav-link {
          padding: 14px 16px;
          font-size: 1rem;
          white-space: normal;
          overflow: visible;
          border-radius: var(--radius-sm);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .mobile-menu .nav-link:hover {
          background: rgba(247, 55, 79, 0.05);
          transform: translateX(8px) translateZ(12px);
        }
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 999;
          animation: fadeIn 0.35s ease-out;
          border: 0;
          cursor: pointer;
        }
        .close-btn-hover {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.3s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .close-btn-hover:hover {
          background: var(--bg-surface);
          transform: rotate(90deg) translateZ(8px);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mobileItemSlide3D {
          from { opacity: 0; transform: translateX(40px) rotateY(15deg) translateZ(-20px); }
          to { opacity: 1; transform: translateX(0) rotateY(0deg) translateZ(0); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: block; }
        }
        @media (max-width: 1120px) {
          .header-inner { width: 96%; }
          .nav-link { padding: 8px 9px; font-size: 0.84rem; }
          .nav-btn-logout { padding: 8px 13px; }
          .nav-btn-signup { padding: 9px 16px; }
        }
      `}),(0,V.jsxs)(`header`,{className:`header ${a?`scrolled`:``}`,ref:h,onMouseMove:S,children:[(0,V.jsx)(`div`,{className:`scroll-progress`,style:{width:`${l}%`}}),(0,V.jsxs)(`div`,{className:`header-inner`,children:[(0,V.jsxs)(F,{to:b(),onClick:y,className:`logo-link`,children:[(0,V.jsx)(`div`,{className:`logo-icon`,children:(0,V.jsx)(zo,{size:18,color:`#fff`})}),(0,V.jsxs)(`h1`,{className:`logo-text`,children:[`Zing`,(0,V.jsx)(`span`,{children:`Bite`})]})]}),(0,V.jsxs)(`nav`,{className:`nav-desktop`,"aria-label":`Primary navigation`,children:[(!e||e.role===`customer`)&&(0,V.jsxs)(F,{to:`/`,onClick:y,className:`nav-link ${x(`/`)||x(`/home`)?`active`:``}`,children:[(0,V.jsx)(Ho,{size:16}),` Home`]}),(!e||e.role===`customer`)&&(0,V.jsxs)(F,{to:`/track-order`,onClick:y,className:`nav-link ${x(`/track-order`)?`active`:``}`,children:[(0,V.jsx)(Yo,{size:16}),` Track Order`]}),(0,V.jsxs)(F,{to:`/careers`,onClick:y,className:`nav-link ${x(`/careers`)?`active`:``}`,children:[(0,V.jsx)(Co,{size:16}),` Careers`]}),e&&e.role===`delivery_partner`&&(0,V.jsxs)(F,{to:`/delivery`,onClick:y,className:`nav-link ${x(`/delivery`)?`active`:``}`,children:[(0,V.jsx)(xo,{size:16}),` Delivery Portal`]}),e&&e.role===`restaurant_admin`&&(0,V.jsxs)(F,{to:`/restaurant-admin`,onClick:y,className:`nav-link ${x(`/restaurant-admin`)?`active`:``}`,children:[(0,V.jsx)(ps,{size:16}),` Restaurant Portal`]}),e&&e.role===`super_admin`&&(0,V.jsxs)(F,{to:`/admin`,onClick:y,className:`nav-link ${x(`/admin`)?`active`:``}`,children:[(0,V.jsx)(ss,{size:16}),` Admin Panel`]}),e&&e.role===`super_admin`&&(0,V.jsxs)(F,{to:`/vrp`,onClick:y,className:`nav-link ${x(`/vrp`)?`active`:``}`,children:[(0,V.jsx)(Po,{size:16}),` VRP Dispatch`]}),e?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(F,{to:`/profile`,onClick:y,className:`nav-link ${x(`/profile`)?`active`:``}`,children:[(0,V.jsx)(ys,{size:16}),` Profile`]}),(!e||e.role===`customer`)&&(0,V.jsxs)(F,{to:`/cart`,onClick:y,className:`nav-link ${x(`/cart`)?`active`:``}`,children:[(0,V.jsx)(ls,{size:16}),` Cart`,n?.itemCount>0&&(0,V.jsx)(`span`,{className:`cart-badge`,children:n.itemCount})]}),(0,V.jsxs)(`button`,{type:`button`,onClick:()=>f(!0),className:`nav-link`,style:{background:`none`,border:`none`,cursor:`pointer`,fontSize:`0.9rem`,color:`inherit`,display:`flex`,alignItems:`center`,gap:`6px`,padding:`8px 12px`},children:[(0,V.jsx)(Jo,{size:16}),` Mailbox`]}),(0,V.jsx)(`button`,{type:`button`,onClick:g,className:`nav-btn-logout`,children:`Logout`})]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(F,{to:`/login`,onClick:y,className:`nav-link ${x(`/login`)?`active`:``}`,children:`Login`}),(0,V.jsx)(F,{to:`/register`,onClick:y,className:`nav-btn-signup`,children:`Sign Up`})]})]}),(0,V.jsxs)(`button`,{type:`button`,className:`hamburger ${s?`open`:``}`,onClick:()=>c(!s),"aria-label":s?`Close navigation menu`:`Open navigation menu`,"aria-expanded":s,"aria-controls":`mobile-navigation`,children:[(0,V.jsx)(`span`,{}),(0,V.jsx)(`span`,{}),(0,V.jsx)(`span`,{})]})]})]}),s&&(0,V.jsx)(`button`,{type:`button`,className:`sidebar-backdrop`,onClick:_,"aria-label":`Close navigation menu`}),(0,V.jsxs)(`div`,{id:`mobile-navigation`,className:`mobile-menu ${s?`open`:``}`,"aria-hidden":!s,children:[(0,V.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`,paddingBottom:`12px`,borderBottom:`1px solid var(--border-light)`},children:[(0,V.jsxs)(`div`,{className:`logo-link`,style:{pointerEvents:`none`},children:[(0,V.jsx)(`div`,{className:`logo-icon`,children:(0,V.jsx)(zo,{size:18,color:`#fff`})}),(0,V.jsxs)(`h1`,{className:`logo-text`,style:{fontSize:`1.3rem`},children:[`Zing`,(0,V.jsx)(`span`,{children:`Bite`})]})]}),(0,V.jsx)(`button`,{type:`button`,onClick:_,className:`close-btn-hover`,"aria-label":`Close navigation menu`,children:(0,V.jsx)(Ss,{size:22,color:`var(--text-primary)`})})]}),(!e||e.role===`customer`)&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(F,{to:`/`,onClick:_,className:`nav-link mobile-nav-item ${x(`/`)||x(`/home`)?`active`:``}`,children:[(0,V.jsx)(Ho,{size:16}),` Home`]}),(0,V.jsxs)(F,{to:`/track-order`,onClick:_,className:`nav-link mobile-nav-item ${x(`/track-order`)?`active`:``}`,children:[(0,V.jsx)(Yo,{size:16}),` Track Order`]})]}),(0,V.jsxs)(F,{to:`/careers`,onClick:_,className:`nav-link mobile-nav-item ${x(`/careers`)?`active`:``}`,children:[(0,V.jsx)(Co,{size:16}),` Careers`]}),e&&(e.role===`delivery_partner`||e.role===`restaurant_admin`||e.role===`super_admin`)&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`div`,{style:{padding:`8px 16px`,fontWeight:700,color:`var(--brand-red)`,fontSize:`0.85rem`,textTransform:`uppercase`,letterSpacing:`0.5px`},children:`My Portal`}),e.role===`delivery_partner`&&(0,V.jsxs)(F,{to:`/delivery`,onClick:_,className:`nav-link mobile-nav-item`,style:{paddingLeft:`24px`},children:[(0,V.jsx)(xo,{size:16}),` Delivery Portal`]}),e.role===`restaurant_admin`&&(0,V.jsxs)(F,{to:`/restaurant-admin`,onClick:_,className:`nav-link mobile-nav-item`,style:{paddingLeft:`24px`},children:[(0,V.jsx)(ps,{size:16}),` Restaurant Portal`]}),e.role===`super_admin`&&(0,V.jsxs)(F,{to:`/admin`,onClick:_,className:`nav-link mobile-nav-item`,style:{paddingLeft:`24px`},children:[(0,V.jsx)(ss,{size:16}),` Admin Panel`]}),e.role===`super_admin`&&(0,V.jsxs)(F,{to:`/vrp`,onClick:_,className:`nav-link mobile-nav-item`,style:{paddingLeft:`24px`},children:[(0,V.jsx)(Po,{size:16}),` VRP Dispatch`]}),(0,V.jsx)(`div`,{style:{height:`1px`,background:`var(--border-light)`,margin:`8px 0`}})]}),e?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(F,{to:`/profile`,onClick:_,className:`nav-link mobile-nav-item ${x(`/profile`)?`active`:``}`,children:[(0,V.jsx)(ys,{size:16}),` Profile`]}),(!e||e.role===`customer`)&&(0,V.jsxs)(F,{to:`/cart`,onClick:_,className:`nav-link mobile-nav-item ${x(`/cart`)?`active`:``}`,children:[(0,V.jsx)(ls,{size:16}),` Cart `,n?.itemCount>0&&(0,V.jsx)(`span`,{className:`cart-badge`,children:n.itemCount})]}),(0,V.jsxs)(`button`,{type:`button`,onClick:()=>{f(!0),_()},className:`nav-link mobile-nav-item`,style:{background:`none`,border:`none`,cursor:`pointer`,width:`100%`,textAlign:`left`,color:`inherit`},children:[(0,V.jsx)(Jo,{size:16}),` Mailbox`]}),(0,V.jsx)(`div`,{style:{marginTop:`auto`,paddingTop:`20px`},children:(0,V.jsx)(`button`,{type:`button`,onClick:g,className:`nav-btn-logout`,style:{width:`100%`},children:`Logout`})})]}):(0,V.jsxs)(`div`,{style:{marginTop:`auto`,display:`flex`,flexDirection:`column`,gap:`10px`,paddingTop:`20px`},children:[(0,V.jsx)(F,{to:`/login`,onClick:_,className:`nav-link mobile-nav-item`,style:{justifyContent:`center`,border:`1px solid var(--border-medium)`},children:`Login`}),(0,V.jsx)(F,{to:`/register`,onClick:_,className:`nav-btn-signup`,style:{textAlign:`center`},children:`Sign Up`})]})]}),(0,V.jsx)(`style`,{children:`
        .mobile-menu.open .mobile-nav-item {
          animation: mobileItemSlide3D 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .mobile-menu.open .mobile-nav-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu.open .mobile-nav-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-menu.open .mobile-nav-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu.open .mobile-nav-item:nth-child(4) { animation-delay: 0.2s; }
        .mobile-menu.open .mobile-nav-item:nth-child(5) { animation-delay: 0.25s; }
        .mobile-menu.open .mobile-nav-item:nth-child(6) { animation-delay: 0.3s; }
        .mobile-menu.open .mobile-nav-item:nth-child(7) { animation-delay: 0.35s; }
        .mobile-menu.open .mobile-nav-item:nth-child(8) { animation-delay: 0.4s; }
        .mobile-menu.open .mobile-nav-item:nth-child(9) { animation-delay: 0.45s; }
        .mobile-menu.open .mobile-nav-item:nth-child(10) { animation-delay: 0.5s; }
      `}),d&&(0,V.jsx)(As,{onClose:()=>f(!1)})]})},Ms=v.memo(()=>{let[e,t]=(0,v.useState)(null),[n,r]=(0,v.useState)({x:.5,y:.5}),[i,a]=(0,v.useState)([]),o=(0,v.useRef)(null);return(0,v.useEffect)(()=>{let e=[];for(let t=0;t<20;t++)e.push({id:t,x:Math.random()*100,y:Math.random()*100,size:Math.random()*3+1,speed:Math.random()*.3+.1,opacity:Math.random()*.3+.05,delay:Math.random()*5});a(e)},[]),(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        .site-footer {
          background:
            radial-gradient(circle at 20% 0%, rgba(247,55,79,0.15), transparent 40%),
            radial-gradient(circle at 80% 100%, rgba(247,55,79,0.08), transparent 30%),
            linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
          color: #fff;
          padding: 64px 20px 30px;
          margin-top: auto;
          position: relative;
          overflow: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.1), rgba(247,55,79,0.5), #ffb347, rgba(247,55,79,0.5), rgba(247,55,79,0.1), transparent);
          background-size: 200% 100%;
          animation: glowBorder 3s linear infinite;
          filter: blur(1px);
        }
        .site-footer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.3), transparent);
          filter: blur(3px);
          animation: glowBorderPulse 2s ease-in-out infinite;
        }
        @keyframes glowBorder {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes glowBorderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .footer-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(247, 55, 79, 0.15);
          pointer-events: none;
          animation: particleFloat var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: var(--opacity); }
          25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: calc(var(--opacity) * 1.5); }
          50% { transform: translateY(-10px) translateX(-10px) scale(0.9); opacity: var(--opacity); }
          75% { transform: translateY(-30px) translateX(5px) scale(1.1); opacity: calc(var(--opacity) * 1.3); }
        }
        .footer-inner {
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          z-index: 1;
          transform-style: preserve-3d;
        }
        .footer-brand-section {
          transform-style: preserve-3d;
          transition: transform 0.6s var(--ease-premium);
        }
        .footer-brand-section:hover {
          transform: translateZ(20px);
        }
        .footer-brand-section h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-section h2 span {
          color: var(--brand-red);
        }
        .footer-brand-icon {
          display: inline-flex;
          animation: footerFlame3D 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes footerFlame3D {
          0%, 100% { transform: scale(1) rotateY(0deg) rotateZ(0deg) translateZ(0); }
          25% { transform: scale(1.15) rotateY(15deg) rotateZ(-4deg) translateZ(10px); }
          50% { transform: scale(1) rotateY(0deg) rotateZ(0deg) translateZ(0); }
          75% { transform: scale(1.1) rotateY(-15deg) rotateZ(4deg) translateZ(10px); }
        }
        .footer-brand-section p {
          color: #777;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 300px;
          transition: color 0.3s ease;
        }
        .footer-brand-section:hover p {
          color: #999;
        }
        .footer-col {
          transform-style: preserve-3d;
          perspective: 600px;
        }
        .footer-col h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 20px;
          font-weight: 600;
          position: relative;
          display: inline-block;
          transition: transform 0.4s var(--ease-premium), color 0.3s ease;
          transform-style: preserve-3d;
        }
        .footer-col h3::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 24px;
          height: 2px;
          background: linear-gradient(90deg, var(--brand-red), #ff7a8a);
          border-radius: 2px;
          transition: width 0.4s var(--ease-premium), transform 0.4s var(--ease-premium);
        }
        .footer-col:hover h3 {
          color: #888;
          transform: translateZ(12px);
        }
        .footer-col:hover h3::after {
          width: 100%;
          transform: translateZ(4px);
        }
        .footer-col a {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #999;
          text-decoration: none;
          padding: 7px 0;
          font-size: 0.92rem;
          transition: all 0.4s var(--ease-premium);
          position: relative;
          width: fit-content;
          transform-style: preserve-3d;
          perspective: 400px;
          backface-visibility: hidden;
        }
        .footer-col a .link-arrow {
          opacity: 0;
          transform: translateX(-6px) translateZ(-8px);
          transition: all 0.4s var(--ease-premium);
          color: var(--brand-red);
        }
        .footer-col a:hover {
          color: #fff;
          padding-left: 6px;
          transform: translateZ(16px) rotateX(-2deg);
        }
        .footer-col a:hover .link-arrow {
          opacity: 1;
          transform: translateX(0) translateZ(0);
        }
        .footer-col a::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--brand-red), #ffb347);
          transition: width 0.4s var(--ease-premium);
        }
        .footer-col a:hover::before {
          width: 100%;
        }
        .footer-col a::after {
          content: '';
          position: absolute;
          inset: -4px -8px;
          background: radial-gradient(circle at center, rgba(247,55,79,0.08), transparent 70%);
          opacity: 0;
          border-radius: 6px;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .footer-col a:hover::after {
          opacity: 1;
        }
        .footer-col:nth-child(2) { --reveal-delay: 0s; }
        .footer-col:nth-child(3) { --reveal-delay: 0.1s; }
        .footer-col:nth-child(4) { --reveal-delay: 0.2s; }
        @keyframes footerReveal {
          from { opacity: 0; transform: translateY(30px) translateZ(-20px) rotateX(5deg); }
          to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0deg); }
        }
        .footer-bottom {
          max-width: 1400px;
          width: 92%;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          position: relative;
          z-index: 1;
          transform-style: preserve-3d;
        }
        .footer-bottom p {
          color: #555;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.3s ease;
        }
        .footer-bottom:hover p {
          color: #777;
        }
        .footer-bottom p .brand-dot {
          color: var(--brand-red);
        }
        .footer-socials {
          display: flex;
          gap: 10px;
          perspective: 800px;
          transform-style: preserve-3d;
        }
        .footer-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          border: none;
          color: #888;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .footer-social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          opacity: 0;
          transition: opacity 0.4s var(--ease-premium);
        }
        .footer-social-btn::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-red), #ffb347, var(--brand-red));
          background-size: 200% 200%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          filter: blur(4px);
          animation: socialGlow 2s linear infinite;
        }
        @keyframes socialGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .footer-social-btn:hover {
          color: #fff;
          transform: translateY(-6px) translateZ(24px) scale(1.1) rotateX(-5deg);
          box-shadow: 0 8px 24px rgba(247,55,79,0.3);
        }
        .footer-social-btn:hover::before {
          opacity: 1;
        }
        .footer-social-btn:hover::after {
          opacity: 1;
        }
        .footer-social-btn:active {
          transform: translateY(-2px) translateZ(8px) scale(0.95);
        }
        .footer-social-btn svg {
          position: relative;
          z-index: 1;
          transition: transform 0.4s var(--ease-premium);
        }
        .footer-social-btn:hover svg {
          transform: scale(1.2) rotateY(10deg);
        }
        .footer-col a:nth-child(2) { transition-delay: 0.03s; }
        .footer-col a:nth-child(3) { transition-delay: 0.06s; }
        .footer-col a:nth-child(4) { transition-delay: 0.09s; }
        .footer-col a:nth-child(5) { transition-delay: 0.12s; }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand-section p {
            max-width: 100%;
          }
          .footer-col {
            transform: none !important;
          }
          .footer-col h3::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-col a {
            justify-content: center;
            width: 100%;
          }
          .footer-col a .link-arrow {
            display: none;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-socials {
            justify-content: center;
          }
          .footer-col a:hover {
            padding-left: 0;
          }
        }
      `}),(0,V.jsxs)(`footer`,{className:`site-footer`,ref:o,onMouseMove:e=>{if(!o.current)return;let t=o.current.getBoundingClientRect();r({x:(e.clientX-t.left)/t.width,y:(e.clientY-t.top)/t.height})},children:[i.map(e=>(0,V.jsx)(`div`,{className:`footer-particle`,style:{left:`${e.x}%`,top:`${e.y}%`,width:`${e.size}px`,height:`${e.size}px`,"--duration":`${4+e.speed*6}s`,"--delay":`${e.delay}s`,"--opacity":e.opacity,opacity:e.opacity}},e.id)),(0,V.jsxs)(`div`,{className:`footer-inner`,children:[(0,V.jsxs)(`div`,{className:`footer-brand-section`,children:[(0,V.jsxs)(`h2`,{children:[(0,V.jsx)(`span`,{className:`footer-brand-icon`,children:(0,V.jsx)(zo,{size:22,color:`var(--brand-red)`})}),`Zing`,(0,V.jsx)(`span`,{children:`Bite`})]}),(0,V.jsx)(`p`,{children:`Delivering happiness and delicious food to your door. Fresh, fast, and always satisfying.`})]}),(0,V.jsxs)(`div`,{className:`footer-col`,children:[(0,V.jsx)(`h3`,{children:`Company`}),(0,V.jsxs)(F,{to:`/info/about-us`,onMouseEnter:()=>t(`about`),onMouseLeave:()=>t(null),children:[`About Us `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/careers`,onMouseEnter:()=>t(`careers`),onMouseLeave:()=>t(null),children:[`Careers `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/team`,onMouseEnter:()=>t(`team`),onMouseLeave:()=>t(null),children:[`Team `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/blog`,onMouseEnter:()=>t(`blog`),onMouseLeave:()=>t(null),children:[`Blog `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]})]}),(0,V.jsxs)(`div`,{className:`footer-col`,children:[(0,V.jsx)(`h3`,{children:`Support`}),(0,V.jsxs)(F,{to:`/info/help-faq`,onMouseEnter:()=>t(`faq`),onMouseLeave:()=>t(null),children:[`Help & FAQ `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/contact-us`,onMouseEnter:()=>t(`contact`),onMouseLeave:()=>t(null),children:[`Contact Us `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/partner-with-us`,onMouseEnter:()=>t(`partner`),onMouseLeave:()=>t(null),children:[`Partner With Us `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/ride-with-us`,onMouseEnter:()=>t(`ride`),onMouseLeave:()=>t(null),children:[`Ride With Us `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]})]}),(0,V.jsxs)(`div`,{className:`footer-col`,children:[(0,V.jsx)(`h3`,{children:`Legal`}),(0,V.jsxs)(F,{to:`/info/terms`,onMouseEnter:()=>t(`terms`),onMouseLeave:()=>t(null),children:[`Terms & Conditions `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/privacy`,onMouseEnter:()=>t(`privacy`),onMouseLeave:()=>t(null),children:[`Privacy Policy `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/cookies`,onMouseEnter:()=>t(`cookies`),onMouseLeave:()=>t(null),children:[`Cookie Policy `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]}),(0,V.jsxs)(F,{to:`/info/refunds`,onMouseEnter:()=>t(`refunds`),onMouseLeave:()=>t(null),children:[`Refund Policy `,(0,V.jsx)(G,{size:12,className:`link-arrow`})]})]})]}),(0,V.jsxs)(`div`,{className:`footer-bottom`,children:[(0,V.jsxs)(`p`,{children:[`© 2026 ZingBite. Made with `,(0,V.jsx)(Vo,{size:13,fill:`var(--brand-red)`,color:`var(--brand-red)`,style:{display:`inline`}}),` for food lovers`]}),(0,V.jsxs)(`div`,{className:`footer-socials`,children:[(0,V.jsx)(`button`,{className:`footer-social-btn`,"aria-label":`Website`,children:(0,V.jsx)(Bo,{size:15})}),(0,V.jsx)(`button`,{className:`footer-social-btn`,"aria-label":`Chat`,children:(0,V.jsx)(Xo,{size:15})}),(0,V.jsx)(`button`,{className:`footer-social-btn`,"aria-label":`Instagram`,children:(0,V.jsx)(Eo,{size:15})}),(0,V.jsx)(`button`,{className:`footer-social-btn`,"aria-label":`LinkedIn`,children:(0,V.jsx)(Co,{size:15})})]})]})]})]})});function Ns({children:e,className:t=``,style:n={}}){let r=(0,v.useRef)(null),[i,a]=(0,v.useState)(!1);return(0,v.useEffect)(()=>{let e=r.current;if(!e)return;let t=new IntersectionObserver(([n])=>{n.isIntersecting&&(a(!0),t.unobserve(e))},{threshold:.1,rootMargin:`0px 0px -40px 0px`});return t.observe(e),()=>t.disconnect()},[]),(0,V.jsx)(`div`,{ref:r,className:`${t} ${i?`visible`:``}`,style:n,children:e})}var Ps=[`🍕`,`🍔`,`🌮`,`🍣`,`🥗`,`🍝`,`🥘`,`🍩`,`🧁`,`🥐`,`🍜`,`🥟`],Fs=`https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop`,Is=`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,Ls=8,Rs=e=>{let t=String(e??``).match(/\d+/);return t?Number(t[0]):2**53-1},zs=e=>{let t=String(e??``).trim();return t?/\b(min|mins|minutes)\b/i.test(t)?t:`${t} min`:`30-40 min`},Bs=e=>{let t=Number(e);return Number.isFinite(t)&&t>0?t.toFixed(1):`New`};function Vs(){let e=(0,v.useMemo)(()=>Array.from({length:18},(e,t)=>({id:t,left:`${(t*5.5+3)%100}%`,top:`${20+t*7%60}%`,size:3+t%4*2,delay:t*.5,duration:8+t%5*3,driftX:(t%7-3)*15,driftZ:t%4*20})),[]),t=(0,v.useMemo)(()=>Array.from({length:8},(e,t)=>({id:`food-${t}`,emoji:Ps[t%Ps.length],left:`${5+(t*12.5+7)%90}%`,top:`${15+t*11%65}%`,delay:t*.6+.3,duration:14+t%4*4,driftX:(t%5-2)*25,driftZ:30+t%5*25,rotateEnd:(t+1)*120})),[]);return(0,V.jsxs)(`div`,{className:`particles-bg-3d`,children:[(0,V.jsx)(`div`,{className:`particles-bg`,children:e.map(e=>(0,V.jsx)(`div`,{className:`particle particle-3d`,style:{left:e.left,top:e.top,width:e.size,height:e.size,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`,"--drift-x":`${e.driftX}px`,"--drift-z":`${e.driftZ}px`}},e.id))}),t.map(e=>(0,V.jsx)(`div`,{className:`hero-floating-food`,style:{left:e.left,top:e.top,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`,"--food-drift-x":`${e.driftX}px`,"--food-drift-z":`${e.driftZ}px`,"--food-rotate-end":`${e.rotateEnd}deg`},children:e.emoji},e.id))]})}function Hs({target:e,suffix:t=``,duration:n=2e3}){let[r,i]=(0,v.useState)(0),a=(0,v.useRef)(null),o=(0,v.useRef)(!1);return(0,v.useEffect)(()=>{let t=a.current;if(!t)return;let r=new IntersectionObserver(([a])=>{if(a.isIntersecting&&!o.current){o.current=!0;let a=Date.now(),s=()=>{let t=Date.now()-a,r=Math.min(t/n,1),o=1-(1-r)**3;i(Math.floor(o*e)),r<1&&requestAnimationFrame(s)};requestAnimationFrame(s),r.unobserve(t)}},{threshold:.3});return r.observe(t),()=>r.disconnect()},[e,n]),(0,V.jsxs)(`span`,{ref:a,className:`count-up`,children:[r,t]})}var Us={restaurants:null,suggestion:null,resultCount:0,isSearch:!1,timestamp:0,key:``},Ws=()=>{let[e,t]=(0,v.useState)([]),[n,r]=(0,v.useState)(!0),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(``),[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(`All`),[f,p]=(0,v.useState)(`default`),[m,h]=(0,v.useState)(Ls),[g,_]=(0,v.useState)(null),[y,b]=(0,v.useState)(0),[x,S]=(0,v.useState)(!1),[C,w]=(0,v.useState)(null),[T,ee]=(0,v.useState)(!1),[E,D]=(0,v.useState)(0),O=(0,v.useRef)(null),te=(0,v.useRef)(``);(0,v.useEffect)(()=>{let e=()=>{D(window.scrollY*.15)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]),(0,v.useEffect)(()=>{let e=new Image;e.src=Fs,e.onload=()=>ee(!0)},[]);let k=async()=>{let e=JSON.stringify({q:c.trim(),lat:C?.lat,lng:C?.lng}),n=Us.restaurants!==null&&Us.key===e,i=n&&Date.now()-Us.timestamp>15e3;if(n){if(t(Us.restaurants),_(Us.suggestion),b(Us.resultCount),S(Us.isSearch),r(!1),a(``),!i)return}else r(!0),a(``);try{let n=new URLSearchParams;c.trim()&&n.append(`q`,c.trim()),C&&(n.append(`lat`,C.lat),n.append(`lng`,C.lng));let r=n.toString(),i=r?`/api/home?${r}`:`/api/home`,o=await B.get(i),s,l,u,d;o.data&&typeof o.data==`object`&&!Array.isArray(o.data)?(s=o.data.restaurants||[],l=o.data.suggestion||null,u=o.data.resultCount||0,d=o.data.isSearch||!1):(s=Array.isArray(o.data)?o.data:[],l=null,u=o.data?o.data.length:0,d=!1),t(s),_(l),b(u),S(d),Us={restaurants:s,suggestion:l,resultCount:u,isSearch:d,timestamp:Date.now(),key:e},a(``)}catch(e){console.error(e),n||a(`We could not load restaurants right now. Please try again.`)}finally{n||r(!1)}},ne=()=>k();(0,v.useEffect)(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(e=>w({lat:e.coords.latitude,lng:e.coords.longitude}),e=>console.warn(`Geolocation permission denied or failed, falling back.`,e),{enableHighAccuracy:!1,timeout:5e3,maximumAge:6e4})},[]),(0,v.useEffect)(()=>{k()},[c,C]),(0,v.useEffect)(()=>{let e=setTimeout(()=>l(o),400);return()=>clearTimeout(e)},[o]),(0,v.useEffect)(()=>{let e=c.trim();e&&e!==te.current&&(ao(`SEARCH`,{query:e}),te.current=e)},[c]),(0,v.useEffect)(()=>{h(Ls)},[c,u,f,C]);let re=e.filter(e=>{let t=e.cusineType?e.cusineType.toLowerCase():``;return u===`All`||t.includes(u.toLowerCase())}).sort((e,t)=>f===`rating`?Number(t.rating||0)-Number(e.rating||0):f===`time`?Rs(e.deliveryTime)-Rs(t.deliveryTime):0),ie=re.slice(0,m),ae=m<re.length,A=re.length-m;return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        /* ===== GLOBAL 3D PERSPECTIVE ===== */
        .scene-3d {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* ===== 3D KEYFRAME ANIMATIONS ===== */
        @keyframes float3d {
          0%, 100% { transform: translateY(0px) translateZ(10px) rotateX(0deg); }
          33% { transform: translateY(-8px) translateZ(25px) rotateX(2deg); }
          66% { transform: translateY(-4px) translateZ(18px) rotateX(-1deg); }
        }
        @keyframes floatFood3d {
          0% { transform: translate3d(0, 0, 0) rotate(0deg) rotateX(0deg) scale(0.6); opacity: 0; }
          10% { opacity: 0.9; transform: translate3d(0, 10px, 10px) rotate(20deg) rotateX(10deg) scale(0.8); }
          50% { opacity: 0.8; transform: translate3d(var(--food-drift-x, 30px), -80px, var(--food-drift-z, 40px)) rotate(180deg) rotateX(60deg) scale(1); }
          90% { opacity: 0.5; }
          100% { transform: translate3d(calc(var(--food-drift-x, 30px) * 1.5), -200px, calc(var(--food-drift-z, 40px) * 1.5)) rotate(var(--food-rotate-end, 360deg)) rotateX(180deg) scale(0.4); opacity: 0; }
        }
        @keyframes particleFloat3d {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.4; }
          100% { transform: translate3d(var(--drift-x, 20px), -180px, var(--drift-z, 30px)); opacity: 0; }
        }
        @keyframes popIn3d {
          0% { transform: scale(0.3) translateZ(-40px); opacity: 0; }
          50% { transform: scale(1.15) translateZ(20px); opacity: 1; }
          70% { transform: scale(0.95) translateZ(5px); }
          100% { transform: scale(1) translateZ(0); opacity: 1; }
        }
        @keyframes tiltGlow3d {
          0%, 100% { box-shadow: 0 12px 30px rgba(247,55,79,0.35), 0 0 0 rgba(247,55,79,0); }
          50% { box-shadow: 0 20px 50px rgba(247,55,79,0.5), 0 0 40px rgba(247,55,79,0.15); }
        }
        @keyframes floatTag3d {
          0%, 100% { transform: translateY(0px) translateZ(10px) rotateX(0deg); }
          50% { transform: translateY(-6px) translateZ(25px) rotateX(2deg); }
        }
        @keyframes depthShadow3d {
          0%, 100% { box-shadow: 0 8px 30px rgba(28,28,28,0.06), 0 0 0 rgba(247,55,79,0); }
          50% { box-shadow: 0 16px 50px rgba(28,28,28,0.1), 0 0 30px rgba(247,55,79,0.04); }
        }
        @keyframes shineStar3d {
          0% { filter: brightness(1) drop-shadow(0 0 0 rgba(255,184,0,0)); }
          50% { filter: brightness(1.4) drop-shadow(0 0 8px rgba(255,184,0,0.5)); }
          100% { filter: brightness(1) drop-shadow(0 0 0 rgba(255,184,0,0)); }
        }
        @keyframes cardFloat3d {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-4px) translateZ(12px); }
        }
        @keyframes iconFloat3d {
          0%, 100% { transform: translateY(0) rotateY(0deg) translateZ(0) scale(1); }
          25% { transform: translateY(-8px) rotateY(10deg) translateZ(15px) scale(1.05); }
          50% { transform: translateY(-3px) rotateY(-5deg) translateZ(8px) scale(1.02); }
          75% { transform: translateY(-10px) rotateY(8deg) translateZ(12px) scale(1.04); }
        }
        @keyframes gradientShift3d {
          0% { background-position: 0% 50%; transform: rotateX(0deg) scale(1.05); }
          25% { transform: rotateX(1.5deg) scale(1.06); }
          50% { background-position: 100% 50%; transform: rotateX(0deg) scale(1.05); }
          75% { transform: rotateX(-1.5deg) scale(1.06); }
          100% { background-position: 0% 50%; transform: rotateX(0deg) scale(1.05); }
        }
        @keyframes textReveal3d {
          0% { opacity: 0; transform: translateY(40px) rotateX(15deg) translateZ(-30px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg) translateZ(0); }
        }
        @keyframes floatSearch3d {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-2px) translateZ(8px); }
        }

        /* ===== HERO SECTION ===== */
        .home-hero {
          position: relative;
          min-height: min(75vh, 660px);
          padding: 80px 20px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0d0d0d;
          color: #fff;
          perspective: 1000px;
        }
        .home-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 100%),
            url('${Fs}');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 0.1s linear, opacity 0.8s ease;
          opacity: ${+!!T};
          animation: ${T?`gradientShift3d 20s ease-in-out infinite`:`none`};
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(247,55,79,0.12) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .home-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.2), transparent);
          z-index: 2;
        }
        .hero-content {
          max-width: 700px;
          width: min(92%, 1400px);
          margin: 0 auto;
          position: relative;
          z-index: 3;
          text-align: left;
          transform-style: preserve-3d;
          transform: translateZ(20px);
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          animation: floatTag3d 4s ease-in-out infinite, premiumFadeIn 0.6s var(--ease-premium) both;
          transform-style: preserve-3d;
        }
        .hero-tag:hover {
          animation: floatTag3d 2s ease-in-out infinite, premiumFadeIn 0.6s var(--ease-premium) both;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.08;
          margin-bottom: 16px;
          color: #fff;
          animation: textReveal3d 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, var(--brand-red), #ff8a9e, #ff6b7a, var(--brand-red));
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift3d 6s ease-in-out infinite;
          display: inline-block;
          transform: translateZ(15px);
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          max-width: 560px;
          margin: 0;
          animation: textReveal3d 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
          transform: translateZ(10px);
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.3s both;
          transform-style: preserve-3d;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.35s var(--ease-premium);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .hero-btn.primary {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          box-shadow: 0 12px 30px rgba(247,55,79,0.35);
          animation: tiltGlow3d 4s ease-in-out infinite;
        }
        .hero-btn.primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .hero-btn.primary:hover::after {
          transform: translateX(100%);
        }
        .hero-btn.primary:hover {
          transform: translateY(-3px) scale(1.03) translateZ(15px);
          box-shadow: 0 20px 50px rgba(247,55,79,0.55), 0 0 40px rgba(247,55,79,0.2);
          animation: none;
        }
        .hero-btn.secondary {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero-btn.secondary:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-3px) translateZ(10px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
          color: #fff;
        }
        .hero-chips {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.4s both;
          transform-style: preserve-3d;
        }
        .hero-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          transition: all 0.35s var(--ease-premium);
          cursor: default;
          transform-style: preserve-3d;
          transform: translateZ(5px);
        }
        .hero-chip:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-4px) translateZ(20px) rotateX(2deg);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        /* ===== PARTICLES & FLOATING FOOD ===== */
        .particles-bg-3d {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .particles-bg {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .particle-3d {
          transform-style: preserve-3d;
          animation: particleFloat3d linear infinite;
          will-change: transform, opacity;
        }
        .hero-floating-food {
          position: absolute;
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          pointer-events: none;
          animation: floatFood3d linear infinite;
          will-change: transform, opacity;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
          transform-style: preserve-3d;
          z-index: 2;
        }

        /* ===== STATS BAR ===== */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          max-width: 1400px;
          width: 92%;
          margin: -32px auto 32px;
          padding: 24px 32px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(247,55,79,0.08);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 30px rgba(28,28,28,0.06);
          position: relative;
          z-index: 5;
          flex-wrap: wrap;
          transform-style: preserve-3d;
          perspective: 800px;
          animation: depthShadow3d 6s ease-in-out infinite;
          transform: translateZ(10px);
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          cursor: default;
        }
        .stat-item:hover {
          transform: translateY(-6px) translateZ(20px) scale(1.05);
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(247,55,79,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-red);
          flex-shrink: 0;
          transition: all 0.4s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .stat-item:hover .stat-icon {
          background: rgba(247,55,79,0.15);
          transform: scale(1.1) rotateY(10deg) translateZ(10px);
          box-shadow: 0 8px 20px rgba(247,55,79,0.15);
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .count-up {
          display: inline-block;
          animation: popIn3d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ===== HOME STATUS CARD ===== */
        .home-status-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 56px 24px;
          color: var(--text-secondary);
          border: 1px dashed rgba(247,55,79,0.18);
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.96);
        }
        .home-status-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .retry-btn {
          margin-top: 18px;
          border: none;
          background: var(--brand-red);
          color: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .retry-btn:hover {
          background: var(--brand-red-hover);
          transform: translateY(-2px) translateZ(10px);
          box-shadow: 0 8px 20px rgba(247,55,79,0.3);
        }

        /* ===== SECTION TITLE ===== */
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .section-title-row h2 {
          font-size: 1.45rem;
          color: var(--text-primary);
        }
        .section-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* ===== RESTAURANT GRID ===== */
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 48px;
          perspective: 1200px;
        }
        .rest-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transform-style: preserve-3d;
          will-change: transform;
        }
        .rest-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(247,55,79,0.08), transparent 65%);
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .rest-card:hover::before {
          opacity: 1;
        }
        .rest-card.visible {
          opacity: 1;
          transform: translateY(0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        }
        .rest-card:hover {
          transform: translateY(-8px) scale(1.01) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          box-shadow: 0 24px 48px rgba(28,28,28,0.12), 0 0 40px rgba(247,55,79,0.08);
          border-color: rgba(247,55,79,0.2);
        }
        .rest-card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          transform-style: preserve-3d;
        }
        .rest-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 60%;
          overflow: hidden;
          border-radius: var(--radius-lg);
          transform-style: preserve-3d;
        }
        .rest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateZ(0);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.12) translateZ(10px);
        }
        .rest-card-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .rest-card-offer {
          position: absolute;
          bottom: 10px;
          left: 12px;
          z-index: 2;
          background: linear-gradient(135deg, #171a29 0%, #2d3143 100%);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 6px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transform: translateZ(5px);
          animation: cardFloat3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .rest-card-offer:hover {
          animation-play-state: paused;
        }
        .rest-card-rating {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 3px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transform: translateZ(8px);
        }
        .rest-card-rating .star {
          color: #FFB800;
          animation: shineStar3d 3s ease-in-out infinite;
          display: inline-flex;
        }
        .star-rating-3d {
          display: inline-block;
          transform: translateZ(3px);
        }
        .rest-card-details {
          padding: 12px 4px 8px;
          transform: translateZ(5px);
        }
        .rest-card-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }
        .rest-card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .rest-card-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
        }

        /* ===== LOAD MORE ===== */
        .load-more-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto 48px;
          border: 1px solid rgba(247,55,79,0.2);
          background: rgba(255,255,255,0.96);
          color: var(--brand-red);
          border-radius: 999px;
          padding: 12px 28px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .load-more-btn:hover {
          background: var(--brand-red);
          color: #fff;
          transform: translateY(-3px) translateZ(15px);
          box-shadow: 0 12px 30px rgba(247,55,79,0.35);
        }
        .load-more-icon {
          transition: transform 0.3s ease;
        }
        .load-more-btn:hover .load-more-icon {
          transform: translateX(4px);
        }

        /* ===== CONTROL BAR ===== */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 24px auto 12px;
          gap: 16px;
        }
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          max-width: 400px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid rgba(247,55,79,0.12);
          padding: 8px 16px;
          border-radius: 30px;
          width: 100%;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          perspective: 500px;
        }
        .search-box:focus-within {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08), 0 8px 25px rgba(247,55,79,0.1);
          transform: scale(1.02) translateZ(10px);
        }
        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .suggestion-box {
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding-left: 12px;
          animation: slideUp 0.3s var(--ease-premium) both;
        }
        .suggestion-btn {
          background: none;
          border: none;
          color: var(--brand-red);
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          transition: color var(--transition-fast);
        }
        .suggestion-btn:hover {
          color: var(--brand-red-hover);
        }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sort-box label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .sort-box select {
          padding: 8px 36px 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(247,55,79,0.12);
          background: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .sort-box select:hover {
          border-color: var(--brand-red);
          transform: translateY(-1px) translateZ(5px);
          box-shadow: 0 4px 12px rgba(247,55,79,0.08);
        }
        .sort-box select:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1), 0 4px 15px rgba(247,55,79,0.08);
        }

        /* ===== CUISINE FILTERS ===== */
        .cuisine-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 20px;
          overflow-x: auto;
          padding: 4px 0;
          perspective: 600px;
        }
        .cuisine-chip {
          padding: 8px 18px;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
          transform-style: preserve-3d;
          perspective: 500px;
        }
        .cuisine-chip:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          transform: translateY(-2px) perspective(800px) rotateX(4deg) rotateY(-4deg) translateZ(8px);
          box-shadow: 0 8px 24px rgba(247,55,79,0.15);
        }
        .cuisine-chip.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25), 0 0 30px rgba(247,55,79,0.1);
          transform: translateZ(5px);
        }
        .cuisine-chip.active:hover {
          transform: translateY(-2px) perspective(800px) rotateX(3deg) translateZ(12px);
          box-shadow: 0 8px 30px rgba(247,55,79,0.35), 0 0 40px rgba(247,55,79,0.15);
        }

        /* ===== PROMISE / TRUST SECTION ===== */
        .promise-card {
          perspective: 800px;
          transform-style: preserve-3d;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .promise-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at var(--pmx, 50%) var(--pmy, 50%), rgba(247,55,79,0.04), transparent 50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }
        .promise-card:hover::before {
          opacity: 1;
        }
        .promise-card:hover {
          transform: translateY(-8px) translateZ(15px) scale(1.02) !important;
          box-shadow: 0 24px 50px rgba(28,28,28,0.1), 0 0 40px rgba(247,55,79,0.04) !important;
          border-color: rgba(247,55,79,0.15) !important;
        }

        @media (max-width: 768px) {
          .home-hero { padding: 40px 16px 32px; min-height: 70vh; }
          .hero-title { font-size: 2rem; }
          .hero-content { text-align: center; }
          .hero-subtitle { margin: 0 auto; }
          .hero-actions, .hero-chips { justify-content: center; }
          .stats-bar { flex-direction: column; gap: 16px; margin-top: -24px; padding: 20px; }
          .stat-item { justify-content: center; }
          .restaurant-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .control-bar { flex-direction: column; align-items: stretch; gap: 12px; }
          .search-container { max-width: 100%; }
          .sort-box { justify-content: space-between; }
          .sort-box select { flex: 1; max-width: 200px; }
          .cuisine-filters { justify-content: flex-start; padding-bottom: 8px; }
          .hero-floating-food { display: none; }
        }
      `}),(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`section`,{className:`home-hero`,ref:O,children:[(0,V.jsx)(Vs,{}),(0,V.jsx)(`div`,{className:`home-hero-bg`,style:{transform:`scale(1.05) translateY(${E}px)`}}),(0,V.jsxs)(`div`,{className:`hero-content`,children:[(0,V.jsxs)(`div`,{className:`hero-tag`,children:[(0,V.jsx)(zo,{size:16}),` Fresh meals, fast routes`]}),(0,V.jsxs)(`h2`,{className:`hero-title`,children:[`Your food,`,` `,(0,V.jsx)(`span`,{className:`highlight`,children:`delivered with love`}),(0,V.jsx)(`br`,{}),`right on time.`]}),(0,V.jsx)(`p`,{className:`hero-subtitle`,children:`Explore trusted local restaurants, order in a few taps, and track every step from kitchen prep to doorstep delivery.`}),(0,V.jsxs)(`div`,{className:`hero-actions`,children:[(0,V.jsxs)(`a`,{href:`#restaurants`,className:`hero-btn primary`,children:[`Explore restaurants `,(0,V.jsx)(vo,{size:17})]}),(0,V.jsxs)(F,{to:`/track-order`,className:`hero-btn secondary`,children:[(0,V.jsx)(Yo,{size:16}),` Track an order`]})]}),(0,V.jsxs)(`div`,{className:`hero-chips`,children:[(0,V.jsxs)(`div`,{className:`hero-chip`,children:[(0,V.jsx)(Cs,{size:16}),` Fast checkout`]}),(0,V.jsxs)(`div`,{className:`hero-chip`,children:[(0,V.jsx)(vs,{size:16}),` Live delivery updates`]}),(0,V.jsxs)(`div`,{className:`hero-chip`,children:[(0,V.jsx)(xs,{size:16}),` Local favorites`]}),(0,V.jsxs)(`div`,{className:`hero-chip`,children:[(0,V.jsx)(os,{size:16}),` Secure payments`]})]})]})]}),(0,V.jsx)(Ns,{children:(0,V.jsxs)(`div`,{className:`stats-bar`,children:[(0,V.jsxs)(`div`,{className:`stat-item`,children:[(0,V.jsx)(`div`,{className:`stat-icon`,children:(0,V.jsx)(yo,{size:22})}),(0,V.jsxs)(`div`,{className:`stat-info`,children:[(0,V.jsx)(`span`,{className:`stat-number`,children:(0,V.jsx)(Hs,{target:200,suffix:`+`})}),(0,V.jsx)(`span`,{className:`stat-label`,children:`Restaurant Partners`})]})]}),(0,V.jsxs)(`div`,{className:`stat-item`,children:[(0,V.jsx)(`div`,{className:`stat-icon`,children:(0,V.jsx)(bs,{size:22})}),(0,V.jsxs)(`div`,{className:`stat-info`,children:[(0,V.jsx)(`span`,{className:`stat-number`,children:(0,V.jsx)(Hs,{target:50,suffix:`K+`})}),(0,V.jsx)(`span`,{className:`stat-label`,children:`Happy Customers`})]})]}),(0,V.jsxs)(`div`,{className:`stat-item`,children:[(0,V.jsx)(`div`,{className:`stat-icon`,children:(0,V.jsx)(Yo,{size:22})}),(0,V.jsxs)(`div`,{className:`stat-info`,children:[(0,V.jsx)(`span`,{className:`stat-number`,children:(0,V.jsx)(Hs,{target:25,suffix:`+`})}),(0,V.jsx)(`span`,{className:`stat-label`,children:`Cities Covered`})]})]}),(0,V.jsxs)(`div`,{className:`stat-item`,children:[(0,V.jsx)(`div`,{className:`stat-icon`,children:(0,V.jsx)(No,{size:22})}),(0,V.jsxs)(`div`,{className:`stat-info`,children:[(0,V.jsx)(`span`,{className:`stat-number`,children:(0,V.jsx)(Hs,{target:28,suffix:` min`})}),(0,V.jsx)(`span`,{className:`stat-label`,children:`Avg. Delivery Time`})]})]})]})}),(0,V.jsxs)(`div`,{className:`control-bar page-enter`,children:[(0,V.jsxs)(`div`,{className:`search-container`,children:[(0,V.jsxs)(`div`,{className:`search-box`,children:[(0,V.jsx)(is,{size:18,color:`var(--text-secondary)`}),(0,V.jsx)(`input`,{type:`text`,placeholder:`Search for restaurants or cuisines...`,"aria-label":`Search restaurants or cuisines`,value:o,onChange:e=>s(e.target.value)})]}),g&&(0,V.jsxs)(`div`,{className:`suggestion-box`,children:[`Did you mean:`,` `,(0,V.jsx)(`button`,{type:`button`,className:`suggestion-btn`,onClick:()=>s(g),children:g})]})]}),(0,V.jsxs)(`div`,{className:`sort-box`,children:[(0,V.jsx)(`label`,{children:`Sort By:`}),(0,V.jsxs)(`select`,{value:f,onChange:e=>p(e.target.value),children:[(0,V.jsx)(`option`,{value:`default`,children:`Relevance`}),(0,V.jsx)(`option`,{value:`rating`,children:`Rating: High to Low`}),(0,V.jsx)(`option`,{value:`time`,children:`Delivery Time: Fastest`})]})]})]}),(0,V.jsx)(`div`,{className:`cuisine-filters page-enter`,style:{animationDelay:`0.1s`},children:[`All`,`Biryani`,`Burger`,`Pizza`,`Chinese`,`Indian`,`Desserts`].map((e,t)=>(0,V.jsx)(`button`,{className:`cuisine-chip ${u===e?`active`:``}`,onClick:()=>d(e),style:{animation:`premiumFadeIn 0.4s var(--ease-premium) ${t*.06}s both`},children:e},e))}),(0,V.jsxs)(`div`,{id:`restaurants`,className:`section-title-row page-enter`,style:{animationDelay:`0.15s`},children:[(0,V.jsx)(`h2`,{children:x&&c.trim()?`Search Results for "${c}"`:`Restaurants near you`}),!n&&!i&&(0,V.jsxs)(`span`,{className:`section-count`,children:[re.length,` `,re.length===1?`restaurant`:`restaurants`]})]}),(0,V.jsx)(`section`,{className:`restaurant-grid`,children:n?Array.from({length:6}).map((e,t)=>(0,V.jsx)(`div`,{style:{height:`300px`,borderRadius:`var(--radius-lg)`},className:`skeleton-premium`},t)):i?(0,V.jsxs)(`div`,{className:`home-status-card`,children:[(0,V.jsx)(`strong`,{children:`Restaurants are taking a little longer to load.`}),(0,V.jsx)(`span`,{children:i}),(0,V.jsx)(`br`,{}),(0,V.jsx)(`button`,{type:`button`,className:`retry-btn`,onClick:ne,children:`Retry`})]}):re.length>0?ie.map((e,t)=>(0,V.jsx)(Gs,{restaurant:e,index:t},e.restaurantId)):(0,V.jsxs)(`div`,{className:`home-status-card`,children:[(0,V.jsx)(`strong`,{children:`No restaurants found`}),(0,V.jsx)(`span`,{children:`Try a different search term, cuisine, or sort option.`})]})}),ae&&(0,V.jsx)(`div`,{className:`load-more-wrap`,children:(0,V.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>h(e=>e+Ls),children:[`Load more restaurants (`,A,` left) `,(0,V.jsx)(vo,{className:`load-more-icon`,size:16})]})}),(0,V.jsx)(Ns,{children:(0,V.jsxs)(`section`,{style:{maxWidth:`1400px`,width:`92%`,margin:`0 auto 60px`,padding:`48px 0`,borderTop:`1px solid var(--border-light)`,textAlign:`center`},children:[(0,V.jsx)(`span`,{style:{fontSize:`0.8rem`,fontWeight:800,color:`var(--brand-red)`,textTransform:`uppercase`,letterSpacing:`1px`},children:`Why ZingBite`}),(0,V.jsxs)(`h3`,{style:{fontFamily:`'Outfit', sans-serif`,fontSize:`clamp(1.5rem, 3vw, 2.2rem)`,fontWeight:800,margin:`8px 0 36px`,color:`var(--text-primary)`},children:[`We `,(0,V.jsx)(Vo,{size:20,fill:`var(--brand-red)`,color:`var(--brand-red)`,style:{display:`inline`}}),` good food`]}),(0,V.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(260px, 1fr))`,gap:`24px`},children:[{icon:(0,V.jsx)(zo,{size:24}),title:`Handpicked Restaurants`,desc:`Every restaurant is vetted for quality, hygiene, and taste.`},{icon:(0,V.jsx)(vs,{size:24}),title:`Lightning Fast Delivery`,desc:`Our route optimization gets your food to you in record time.`},{icon:(0,V.jsx)(os,{size:24}),title:`Secure & Easy Payments`,desc:`Multiple payment options with bank-grade encryption.`}].map((e,t)=>(0,V.jsxs)(`div`,{className:`promise-card`,style:{background:`rgba(255,255,255,0.96)`,border:`1px solid var(--border-light)`,borderRadius:`20px`,padding:`32px 24px`,transition:`all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,opacity:0,transform:`translateY(20px) perspective(800px)`,animation:`premiumSlideUp 0.5s var(--ease-premium) ${.15+t*.1}s both`,transformStyle:`preserve-3d`},children:[(0,V.jsx)(`div`,{style:{width:`56px`,height:`56px`,borderRadius:`16px`,background:`rgba(247,55,79,0.08)`,color:`var(--brand-red)`,display:`flex`,alignItems:`center`,justifyContent:`center`,margin:`0 auto 20px`,transformStyle:`preserve-3d`,animation:`iconFloat3d 4s ease-in-out ${t*.4}s infinite`},children:e.icon}),(0,V.jsx)(`h4`,{style:{fontFamily:`'Outfit', sans-serif`,fontSize:`1.15rem`,fontWeight:700,margin:`0 0 10px`,transform:`translateZ(5px)`},children:e.title}),(0,V.jsx)(`p`,{style:{fontSize:`0.88rem`,color:`var(--text-secondary)`,lineHeight:1.6,margin:0,transform:`translateZ(3px)`},children:e.desc})]},t))})]})})]})]})};function Gs({restaurant:e,index:t}){let n=(0,v.useRef)(null),[r,i]=(0,v.useState)(!1),[a,o]=(0,v.useState)({x:0,y:0}),[s,c]=(0,v.useState)(!1);return(0,v.useEffect)(()=>{let e=n.current;if(!e)return;let r=new IntersectionObserver(([n])=>{n.isIntersecting&&(setTimeout(()=>i(!0),t*60),r.unobserve(e))},{threshold:.1});return r.observe(e),()=>r.disconnect()},[t]),(0,V.jsx)(F,{ref:n,to:`/menu?restaurantId=${e.restaurantId}&restaurantName=${encodeURIComponent(e.restaurantName)}`,className:`rest-card ${r?`visible`:``}`,style:{transitionDelay:r?`${t*.05}s`:`0s`,"--rx":`${a.x}deg`,"--ry":`${a.y}deg`,transition:s?`all 0.12s ease-out`:`all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`},onMouseMove:e=>{let t=n.current;if(!t)return;let r=t.getBoundingClientRect(),i=(e.clientX-r.left)/r.width-.5;o({x:-((e.clientY-r.top)/r.height-.5)*14,y:i*14}),c(!0)},onMouseLeave:()=>{o({x:0,y:0}),c(!1)},children:(0,V.jsxs)(`div`,{className:`rest-card-inner`,children:[(0,V.jsxs)(`div`,{className:`rest-card-img-wrap`,children:[(0,V.jsx)(`img`,{src:e.imagePath||Is,alt:`${e.restaurantName||`Restaurant`} dishes`,className:`rest-card-img`,loading:`lazy`,onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=Is}}),(0,V.jsx)(`div`,{className:`rest-card-img-overlay`}),(0,V.jsx)(`div`,{className:`rest-card-offer`,children:`Free Delivery`}),(0,V.jsxs)(`div`,{className:`rest-card-rating`,children:[(0,V.jsx)(`span`,{className:`star`,children:(0,V.jsx)(fs,{size:14,fill:`#FFB800`,color:`#FFB800`})}),(0,V.jsx)(`span`,{className:`star-rating-3d`,children:Bs(e.rating)})]})]}),(0,V.jsxs)(`div`,{className:`rest-card-details`,children:[(0,V.jsx)(`h3`,{className:`rest-card-name`,children:e.restaurantName}),(0,V.jsxs)(`div`,{className:`rest-card-meta`,children:[(0,V.jsx)(`span`,{children:e.cusineType}),(0,V.jsx)(`span`,{className:`dot`}),(0,V.jsx)(`span`,{children:zs(e.deliveryTime)})]})]})]})})}var Ks=`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`,qs=`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,Js=8,Ys=4,Xs=()=>{let e=P(),[t]=zn(),n=t.get(`restaurantId`),r=t.get(`restaurantName`)||`Restaurant Menu`,[i,a]=(0,v.useState)([]),[o,s]=(0,v.useState)(!0),[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(`All`),[f,p]=(0,v.useState)(`Default`),[m,h]=(0,v.useState)(0),[g,_]=(0,v.useState)([]),[b,x]=(0,v.useState)(!0),[S,C]=(0,v.useState)(Js),[w,T]=(0,v.useState)(Ys),{user:ee}=(0,v.useContext)(ro),{cart:E,addToCart:D,updateQuantity:O,conflictPopup:te,clearAndAdd:k,setConflictPopup:ne,cartError:re,setCartError:ie}=lo();(0,v.useEffect)(()=>{let e=async(e=!1)=>{try{a((await B.get(`/api/menu?restaurantId=${n}&restaurantName=${encodeURIComponent(r)}`)).data.menuList||[])}catch(e){console.error(e)}finally{e||s(!1)}};if(!n)return;e(!1);let t=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=menu&restaurantId=${n}`:`/api/stream?topic=menu&restaurantId=${n}`,i=new EventSource(t);return i.onmessage=()=>{try{console.log(`[ZingBite SSE] Real-time menu update`),e(!0)}catch(e){console.error(e)}},i.onerror=e=>console.error(`[ZingBite SSE] EventSource error:`,e),()=>i.close()},[n,r]);let ae=(0,v.useMemo)(()=>!E||!E.items?``:(Array.isArray(E.items)?E.items:Object.values(E.items)).map(e=>e.itemId).join(`,`),[E]);(0,v.useEffect)(()=>{(async()=>{if(n)try{x(!0),_((await B.get(`/api/recommendations?restaurantId=${n}&cartItems=${ae}`)).data.recommendations||[])}catch(e){console.error(`[ZingBite] Error fetching recommendations:`,e)}finally{x(!1)}})()},[n,ae]);let A=e=>{if(!E||!E.items)return 0;let t=(Array.isArray(E.items)?E.items:Object.values(E.items)).find(t=>t.itemId===e);return t?t.quantity:0},j=async t=>{if(!ee){e(`/login?redirect=/menu?restaurantId=${n}&restaurantName=${encodeURIComponent(r)}`);return}ie(null),await D(t,1)},oe=e=>{let t=[`chicken`,`mutton`,`egg`,`fish`,`pork`,`beef`,`shrimp`,`prawn`,`meat`,`kebab`,`tikka`,`biryani`],n=(e.menuName||``).toLowerCase(),r=(e.description||``).toLowerCase();return!t.some(e=>n.includes(e)||r.includes(e))},se=(0,v.useCallback)(e=>{let t=e.currentTarget,n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top,a=n.width/2,o=n.height/2,s=(i-o)/o*-8,c=(r-a)/a*8;t.style.setProperty(`--tiltX`,`${c}deg`),t.style.setProperty(`--tiltY`,`${s}deg`),t.style.setProperty(`--glareX`,`${r/n.width*100}%`),t.style.setProperty(`--glareY`,`${i/n.height*100}%`),t.classList.add(`card-tilt-active`)},[]),ce=(0,v.useCallback)(e=>{let t=e.currentTarget;t.classList.remove(`card-tilt-active`),t.style.setProperty(`--tiltX`,`0deg`),t.style.setProperty(`--tiltY`,`0deg`)},[]),le=i.length>0&&i[0].restaurant?i[0].restaurant:null,M=le?le.restaurantName:r,N=le&&(le.cusineType||le.cuisineType)||`Cuisine details`,ue=le&&le.address||`Address details`,de=le&&le.deliveryTime||`30 mins`,fe=le?.imagePath||Ks,pe=(0,v.useMemo)(()=>[fe,`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,`https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop`,`https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2035&auto=format&fit=crop`],[fe]);(0,v.useEffect)(()=>{if(pe.length===0)return;let e=setInterval(()=>h(e=>(e+1)%pe.length),5e3);return()=>clearInterval(e)},[pe.length]),(0,v.useEffect)(()=>{C(Js)},[n,c,u,f]),(0,v.useEffect)(()=>{T(Ys)},[n,ae]),(0,v.useEffect)(()=>{let e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`card-3d-revealed`),e.unobserve(t.target))})},{threshold:.08,rootMargin:`0px 0px -30px 0px`});return document.querySelectorAll(`.menu-dish-card, .promise-card`).forEach(t=>e.observe(t)),()=>e.disconnect()},[_e,ve]);let me=n?i:[],he=!!n&&o,ge=[...me.filter(e=>(e.menuName||``).toLowerCase().includes(c.toLowerCase())||(e.description||``).toLowerCase().includes(c.toLowerCase())?u===`Veg`?oe(e):u===`NonVeg`?!oe(e):!0:!1)].sort((e,t)=>f===`PriceLowHigh`?e.price-t.price:f===`PriceHighLow`?t.price-e.price:0),_e=ge.slice(0,S),ve=g.slice(0,w),ye=S<ge.length,be=w<g.length;return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        :root {
          --3d-ease: cubic-bezier(0.23, 1, 0.32, 1);
          --glide-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .menu-page-container { max-width: 1400px; width: 92%; margin: 0 auto 64px; padding: 0; perspective: 1200px; }
        .restaurant-hero { position: relative; height: 340px; border-radius: 24px; overflow: hidden; margin-top: 24px; margin-bottom: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); transform: translateZ(0); }
        .slideshow-container { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; }
        .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease-in-out, transform 1.2s var(--3d-ease); z-index: 1; transform: translateZ(-20px) scale(1.02); }
        .hero-slide.active { opacity: 1; z-index: 2; transform: translateZ(0) scale(1); }
        .hero-slide.active:nth-child(1) { transform: translateZ(10px) scale(1); }
        .hero-bg { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.35) 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 32px; color: white; z-index: 3; text-align: center; transform: translateZ(30px); }
        .hero-overlay::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.12) 0%, transparent 60%); }
        .hero-glass-card { position: relative; max-width: 720px; width: 100%; transform: perspective(800px) rotateX(1.5deg) translateZ(20px); animation: heroFloat 6s var(--glide-ease) infinite; }
        @keyframes heroFloat {
          0%, 100% { transform: perspective(800px) rotateX(1.5deg) translateZ(20px) translateY(0); }
          50% { transform: perspective(800px) rotateX(1.5deg) translateZ(30px) translateY(-6px); }
        }
        .hero-glass-card h1 { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 8px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.5); letter-spacing: -0.5px; }
        .hero-info-row { display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 0.9rem; color: rgba(255,255,255,0.95); flex-wrap: wrap; margin-bottom: 12px; }
        .hero-info-item { display: flex; align-items: center; gap: 5px; }
        .hero-separator { color: rgba(255,255,255,0.45); }
        .cuisine-tag { font-size: 0.88rem; color: rgba(255,255,255,0.7); margin-bottom: 14px; }
        .promo-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(247,55,79,0.2); border: 1px solid rgba(247,55,79,0.35); padding: 6px 18px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; color: #ffcbd1; backdrop-filter: blur(4px); animation: promoFloat3d 3s var(--glide-ease) infinite; transform: translateZ(10px); }
        @keyframes promoFloat3d {
          0%, 100% { transform: translateZ(10px) translateY(0); box-shadow: 0 0 20px rgba(247,55,79,0.1); }
          50% { transform: translateZ(20px) translateY(-3px); box-shadow: 0 8px 30px rgba(247,55,79,0.2); }
        }
        .slideshow-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%) translateZ(15px); display: flex; gap: 8px; z-index: 10; }
        .slideshow-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: all 0.3s ease; }
        .slideshow-dot.active { background: #fff; transform: scale(1.3); box-shadow: 0 0 8px rgba(255,255,255,0.5); }
        .menu-controls-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; transform: translateZ(5px); }
        .search-menu-wrapper { position: relative; flex: 1; min-width: 280px; perspective: 600px; }
        .search-menu-wrapper input { width: 100%; padding: 14px 16px 14px 46px; border: 1.5px solid var(--border-medium); border-radius: 14px; font-size: 0.95rem; outline: none; box-shadow: 0 2px 12px rgba(0,0,0,0.03); transition: all 0.25s var(--ease-premium); transform: translateZ(0); }
        .search-menu-wrapper input:focus { border-color: var(--brand-red); box-shadow: 0 0 0 4px rgba(247,55,79,0.08), 0 4px 20px rgba(247,55,79,0.06); transform: translateZ(4px); }
        .search-icon-pos { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
        .filter-sort-wrapper { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .filter-pills { display: flex; background: var(--bg-surface); border-radius: 30px; padding: 4px; border: 1px solid var(--border-light); perspective: 500px; }
        .filter-pill { background: transparent; border: none; padding: 7px 16px; font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; border-radius: 26px; transition: all 0.25s var(--ease-premium); display: flex; align-items: center; gap: 4px; transform: translateZ(0); }
        .filter-pill:hover { transform: translateZ(6px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .filter-pill.active { background: #fff; color: var(--brand-red); box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(247,55,79,0.08); transform: translateZ(2px); }
        .sort-select { padding: 10px 36px 10px 14px; border-radius: 12px; border: 1.5px solid var(--border-medium); font-size: 0.85rem; font-weight: 600; color: var(--text-primary); outline: none; cursor: pointer; background: #fff; transition: all 0.25s var(--ease-premium); appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 14px; transform: translateZ(0); }
        .sort-select:hover { border-color: var(--brand-red); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); transform: translateZ(4px); box-shadow: 0 4px 16px rgba(247,55,79,0.06); }
        .sort-select:focus { border-color: var(--brand-red); box-shadow: 0 0 0 3px rgba(247,55,79,0.1), 0 4px 20px rgba(247,55,79,0.06); }
        .menu-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap: 24px; }
        .menu-dish-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; gap: 20px; box-shadow: 0 2px 16px rgba(0,0,0,0.02); transition: box-shadow 0.4s var(--3d-ease), border-color 0.4s var(--3d-ease); opacity: 0; transform: translateY(20px); position: relative; overflow: visible; transform-style: preserve-3d; will-change: transform; }
        .menu-dish-card::after { content: ''; position: absolute; inset: 0; border-radius: 20px; background: radial-gradient(circle at var(--glareX, 50%) var(--glareY, 50%), rgba(255,255,255,0.12) 0%, transparent 60%); pointer-events: none; opacity: 0; transition: opacity 0.3s ease; z-index: 1; }
        .menu-dish-card.card-tilt-active::after { opacity: 1; }
        .menu-dish-card.card-tilt-active { box-shadow: 0 20px 60px rgba(247,55,79,0.08), 0 8px 24px rgba(0,0,0,0.04); border-color: rgba(247,55,79,0.08); transition: box-shadow 0.1s ease, border-color 0.1s ease; transform: perspective(1000px) rotateX(var(--tiltY, 0deg)) rotateY(var(--tiltX, 0deg)) translateZ(15px); }
        .menu-dish-card.card-3d-revealed { animation: cardDepthIn 0.7s var(--3d-ease) both; }
        @keyframes cardDepthIn {
          0% { opacity: 0; transform: perspective(1000px) rotateX(8deg) rotateY(-5deg) translateZ(-30px) translateY(30px); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) translateY(0); }
        }
        .dish-card-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; transform: translateZ(8px); }
        .dish-card-header-tags { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .dish-type-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
        .dish-type-badge.veg { background: rgba(96,178,70,0.08); color: var(--success); border: 1px solid rgba(96,178,70,0.15); }
        .dish-type-badge.veg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
        .dish-type-badge.nonveg { background: rgba(226,55,68,0.08); color: var(--danger); border: 1px solid rgba(226,55,68,0.15); }
        .dish-type-badge.nonveg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--danger); }
        .dish-featured-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 700; color: #ff9f40; background: rgba(255,159,64,0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,159,64,0.15); text-transform: uppercase; }
        .dish-card-title { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px; line-height: 1.3; }
        .dish-card-price-row { display: flex; align-items: baseline; gap: 2px; margin-bottom: 10px; color: var(--brand-red); font-weight: 800; }
        .dish-card-price-row .price-symbol { font-size: 1rem; }
        .dish-card-price-row .price-value { font-size: 1.3rem; font-family: 'Outfit', sans-serif; }
        .dish-card-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .dish-card-media { position: relative; width: 130px; height: 130px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; transform: translateZ(10px); }
        .dish-card-img-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.04); border: 1px solid var(--border-light); background: var(--bg-surface); transform: translateZ(0); transition: transform 0.5s var(--3d-ease), box-shadow 0.5s var(--3d-ease); }
        .menu-dish-card.card-tilt-active .dish-card-img-container { transform: translateZ(20px) scale(1.03); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .dish-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--3d-ease); }
        .menu-dish-card:hover .dish-card-img, .menu-dish-card.card-tilt-active .dish-card-img { transform: scale(1.12); }
        .dish-card-action { position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%) translateZ(15px); z-index: 10; }
        .add-btn { background: #fff; color: var(--success); border: 1.5px solid var(--success); font-weight: 800; font-size: 0.85rem; padding: 6px 20px; border-radius: 12px; cursor: pointer; transition: all 0.3s var(--3d-ease); box-shadow: 0 4px 12px rgba(96,178,70,0.12); white-space: nowrap; transform: translateZ(0); position: relative; overflow: hidden; }
        .add-btn::before { content: ''; position: absolute; inset: 0; border-radius: 12px; background: linear-gradient(135deg, var(--success), #4a9a32); opacity: 0; transition: opacity 0.3s ease; }
        .add-btn:hover:not(:disabled) { color: #fff; box-shadow: 0 8px 24px rgba(96,178,70,0.3); transform: translateZ(8px) scale(1.05); }
        .add-btn:hover:not(:disabled)::before { opacity: 1; }
        .add-btn:active:not(:disabled) { transform: translateZ(2px) scale(0.97); }
        .add-btn:disabled { background: var(--bg-surface); border-color: var(--border-medium); color: var(--text-muted); box-shadow: none; cursor: not-allowed; }
        .add-btn .btn-text { position: relative; z-index: 1; }
        .qty-stepper { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1.5px solid var(--success); border-radius: 12px; width: 90px; height: 32px; box-shadow: 0 4px 12px rgba(96,178,70,0.1), inset 0 1px 0 rgba(255,255,255,0.8); overflow: hidden; transform: translateZ(4px); transition: transform 0.3s var(--3d-ease), box-shadow 0.3s var(--3d-ease); }
        .qty-stepper:hover { transform: translateZ(8px); box-shadow: 0 8px 24px rgba(96,178,70,0.15), inset 0 1px 0 rgba(255,255,255,0.8); }
        .step-btn { width: 28px; height: 100%; background: transparent; border: none; color: var(--success); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, transform 0.15s; }
        .step-btn:hover { background: rgba(96,178,70,0.08); }
        .step-btn:active { transform: scale(0.85); }
        .step-val { font-weight: 800; font-size: 0.9rem; color: var(--text-primary); }
        .cart-bar-popup { position: fixed; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, var(--success), #4a9a32); color: #fff; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; box-shadow: 0 -4px 24px rgba(0,0,0,0.12); transform-origin: bottom center; animation: cartBarSlideUp3d 0.5s var(--3d-ease) both; }
        @keyframes cartBarSlideUp3d {
          0% { transform: perspective(800px) rotateX(8deg) translateZ(-20px) translateY(100%); opacity: 0; }
          100% { transform: perspective(800px) rotateX(0) translateZ(0) translateY(0); opacity: 1; }
        }
        .cart-bar-link { color: #fff; font-weight: 700; display: flex; align-items: center; gap: 6px; text-decoration: none; transition: transform 0.2s ease; }
        .cart-bar-link:hover { transform: translateX(4px); }
        .no-data-dish { grid-column: 1 / -1; text-align: center; padding: 64px 24px; color: var(--text-secondary); border: 1.5px dashed var(--border-medium); border-radius: 20px; background: #fff; }
        .zingbite-promise-section { margin-top: 64px; border-top: 1px solid var(--border-light); padding-top: 48px; perspective: 1000px; }
        .promise-header { text-align: center; margin-bottom: 36px; }
        .promise-subtitle { font-size: 0.8rem; font-weight: 800; color: var(--brand-red); text-transform: uppercase; letter-spacing: 1px; }
        .promise-title { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 0; letter-spacing: -0.5px; }
        .promise-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 20px; }
        .promise-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 32px 24px; text-align: center; transition: all 0.4s var(--3d-ease); box-shadow: 0 2px 16px rgba(0,0,0,0.02); transform-style: preserve-3d; will-change: transform; }
        .promise-card.card-3d-revealed { animation: cardDepthIn 0.7s var(--3d-ease) both; }
        .promise-card:hover { transform: translateY(-6px) translateZ(10px) rotateX(1deg); box-shadow: 0 20px 60px rgba(247,55,79,0.06); border-color: rgba(247,55,79,0.12); }
        .promise-icon-wrapper { width: 56px; height: 56px; border-radius: 16px; background: rgba(247,55,79,0.08); color: var(--brand-red); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: transform 0.4s var(--3d-ease); transform: translateZ(6px); }
        .promise-card:hover .promise-icon-wrapper { transform: scale(1.12) rotate(-6deg) translateZ(12px); }
        .promise-card h3 { font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0 0 10px; }
        .promise-card p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
        @keyframes cardFadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-card { animation: cardFadeInUp 0.55s var(--ease-premium) both; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.25s ease-out both; perspective: 800px; }
        .modal-content { background: #fff; padding: 36px; border-radius: 24px; max-width: 420px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.2); text-align: center; animation: modalEnter3d 0.4s var(--3d-ease) both; transform-origin: center bottom; }
        @keyframes modalEnter3d {
          0% { opacity: 0; transform: perspective(800px) rotateX(12deg) translateZ(-40px) translateY(20px) scale(0.92); }
          100% { opacity: 1; transform: perspective(800px) rotateX(0) translateZ(0) translateY(0) scale(1); }
        }
        .modal-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(247,55,79,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .modal-title { font-size: 1.3rem; font-family: 'Outfit', sans-serif; font-weight: 700; margin: 0 0 10px; color: var(--text-primary); }
        .modal-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
        .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
        .modal-btn-outline { flex: 1; padding: 13px; background: transparent; border: 2px solid var(--border-medium); color: var(--text-primary); font-weight: 600; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; transition: all 0.25s var(--ease-premium); transform: translateZ(0); }
        .modal-btn-outline:hover { border-color: var(--brand-red); color: var(--brand-red); transform: translateZ(4px); }
        .modal-btn-primary { flex: 2; padding: 13px; background: linear-gradient(135deg, var(--brand-red), #d42d42); color: #fff; border: none; font-weight: 700; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 14px rgba(247,55,79,0.25); transition: all 0.25s var(--ease-premium); transform: translateZ(0); }
        .modal-btn-primary:hover { transform: translateY(-1px) translateZ(6px); box-shadow: 0 8px 28px rgba(247,55,79,0.35); }
        .modal-btn-primary:active { transform: translateZ(0) scale(0.98); }
        @keyframes shimmer3d {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-3d { background: linear-gradient(90deg, var(--bg-surface) 25%, rgba(247,55,79,0.04) 50%, var(--bg-surface) 75%); background-size: 200% 100%; animation: shimmer3d 1.8s ease-in-out infinite; border-radius: 20px; transform: translateZ(0); }
        @media (max-width: 992px) { .menu-items-grid { grid-template-columns: 1fr; gap: 20px; } }
        @media (max-width: 768px) {
          .restaurant-hero { height: auto; min-height: 280px; }
          .hero-glass-card h1 { font-size: 1.8rem; }
          .menu-controls-bar { flex-direction: column; align-items: stretch; }
          .search-menu-wrapper { width: 100%; }
          .filter-sort-wrapper { justify-content: space-between; width: 100%; }
          .filter-pills { flex: 1; justify-content: center; }
          .filter-pill { flex: 1; justify-content: center; padding: 6px 10px; font-size: 0.8rem; }
        }
        @media (max-width: 576px) {
          .menu-dish-card { padding: 16px; gap: 16px; border-radius: 16px; }
          .dish-card-media { width: 105px; height: 105px; }
          .dish-card-title { font-size: 1.1rem; }
          .hero-glass-card h1 { font-size: 1.5rem; }
          :root { --3d-ease: cubic-bezier(0.23, 1, 0.32, 1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .menu-dish-card { animation: none !important; opacity: 1 !important; transform: none !important; }
          .hero-glass-card { animation: none !important; transform: none !important; }
          .promo-tag { animation: none !important; }
          .cart-bar-popup { animation: none !important; }
          .modal-content { animation: none !important; }
          .menu-dish-card.card-tilt-active { transform: none !important; }
          .promise-card.card-3d-revealed { animation: none !important; }
          .menu-dish-card.card-3d-revealed { animation: none !important; }
        }
      `}),(0,V.jsxs)(`div`,{className:`menu-page-container page-enter`,children:[(0,V.jsxs)(`div`,{className:`restaurant-hero`,children:[(0,V.jsx)(`div`,{className:`slideshow-container`,children:pe.map((e,t)=>(0,V.jsx)(`div`,{className:`hero-slide ${t===m?`active`:``}`,children:(0,V.jsx)(`img`,{src:e,alt:M,className:`hero-bg`})},t))}),(0,V.jsx)(`div`,{className:`hero-overlay`,children:(0,V.jsxs)(`div`,{className:`hero-glass-card`,children:[(0,V.jsx)(`h1`,{children:M}),(0,V.jsxs)(`div`,{className:`hero-info-row`,children:[(0,V.jsxs)(`span`,{className:`hero-info-item`,children:[(0,V.jsx)(fs,{size:14,fill:`#ffb703`,color:`#ffb703`}),` `,(0,V.jsx)(`strong`,{children:`4.2`}),` (100+)`]}),(0,V.jsx)(`span`,{className:`hero-separator`,children:`|`}),(0,V.jsxs)(`span`,{className:`hero-info-item`,children:[(0,V.jsx)(No,{size:14}),` `,de]}),(0,V.jsx)(`span`,{className:`hero-separator`,children:`|`}),(0,V.jsxs)(`span`,{className:`hero-info-item`,children:[(0,V.jsx)(Yo,{size:14}),` `,ue]})]}),(0,V.jsxs)(`p`,{className:`cuisine-tag`,children:[`Cuisines: `,(0,V.jsx)(`strong`,{children:N})]}),(0,V.jsxs)(`div`,{className:`promo-tag`,children:[(0,V.jsx)(zo,{size:14}),` ZINGBITE50: 50% OFF up to ₹100`]})]})}),(0,V.jsx)(`div`,{className:`slideshow-dots`,children:pe.map((e,t)=>(0,V.jsx)(`button`,{className:`slideshow-dot ${t===m?`active`:``}`,onClick:()=>h(t)},t))})]}),(0,V.jsxs)(`div`,{className:`menu-controls-bar`,children:[(0,V.jsxs)(`div`,{className:`search-menu-wrapper`,children:[(0,V.jsx)(is,{size:18,className:`search-icon-pos`}),(0,V.jsx)(`input`,{type:`text`,placeholder:`Search dishes...`,value:c,onChange:e=>l(e.target.value)})]}),(0,V.jsxs)(`div`,{className:`filter-sort-wrapper`,children:[(0,V.jsxs)(`div`,{className:`filter-pills`,children:[(0,V.jsx)(`button`,{className:`filter-pill ${u===`All`?`active`:``}`,onClick:()=>d(`All`),children:`All`}),(0,V.jsx)(`button`,{className:`filter-pill ${u===`Veg`?`active`:``}`,onClick:()=>d(`Veg`),children:`Veg`}),(0,V.jsx)(`button`,{className:`filter-pill ${u===`NonVeg`?`active`:``}`,onClick:()=>d(`NonVeg`),children:`Non-Veg`})]}),(0,V.jsxs)(`select`,{className:`sort-select`,value:f,onChange:e=>p(e.target.value),children:[(0,V.jsx)(`option`,{value:`Default`,children:`Sort: Default`}),(0,V.jsx)(`option`,{value:`PriceLowHigh`,children:`Price: Low to High`}),(0,V.jsx)(`option`,{value:`PriceHighLow`,children:`Price: High to Low`})]})]})]}),(0,V.jsx)(`div`,{className:`menu-items-grid`,children:he?Array.from({length:6}).map((e,t)=>(0,V.jsx)(`div`,{style:{height:`360px`,borderRadius:`20px`},className:`skeleton-3d animate-card`},t)):ge.length>0?_e.map((e,t)=>{let n=A(e.menuId),r=oe(e);return(0,V.jsxs)(`div`,{className:`menu-dish-card animate-card`,style:{animationDelay:`${t*.05}s`},onMouseMove:se,onMouseLeave:ce,children:[(0,V.jsx)(`div`,{className:`dish-card-info`,children:(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`div`,{className:`dish-card-header-tags`,children:[(0,V.jsxs)(`div`,{className:r?`dish-type-badge veg`:`dish-type-badge nonveg`,children:[(0,V.jsx)(`span`,{className:`dot`}),(0,V.jsx)(`span`,{children:r?`VEG`:`NON-VEG`})]}),t%3==0&&(0,V.jsxs)(`span`,{className:`dish-featured-tag`,children:[(0,V.jsx)(fs,{size:12,fill:`#ff9f40`,color:`#ff9f40`}),` Bestseller`]})]}),(0,V.jsx)(`h3`,{className:`dish-card-title`,children:e.menuName}),(0,V.jsxs)(`div`,{className:`dish-card-price-row`,children:[(0,V.jsx)(`span`,{className:`price-symbol`,children:`₹`}),(0,V.jsx)(`span`,{className:`price-value`,children:e.price})]}),(0,V.jsx)(`p`,{className:`dish-card-desc`,children:e.description})]})}),(0,V.jsxs)(`div`,{className:`dish-card-media`,children:[(0,V.jsx)(`div`,{className:`dish-card-img-container`,children:(0,V.jsx)(`img`,{src:e.imagePath||qs,alt:e.menuName,className:`dish-card-img`,loading:`lazy`,onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=qs}})}),(0,V.jsx)(`div`,{className:`dish-card-action`,children:n===0?(0,V.jsx)(`button`,{className:`add-btn`,disabled:!e.isAvailable,onClick:()=>j(e.menuId),children:(0,V.jsx)(`span`,{className:`btn-text`,children:e.isAvailable?`ADD`:`SOLD OUT`})}):(0,V.jsxs)(`div`,{className:`qty-stepper`,children:[(0,V.jsx)(`button`,{className:`step-btn`,onClick:()=>O(e.menuId,n-1),children:(0,V.jsx)(Zo,{size:12})}),(0,V.jsx)(`span`,{className:`step-val`,children:n}),(0,V.jsx)(`button`,{className:`step-btn`,onClick:()=>O(e.menuId,n+1),children:(0,V.jsx)(ns,{size:12})})]})})]})]},e.menuId)}):(0,V.jsxs)(`div`,{className:`no-data-dish`,children:[(0,V.jsx)(`p`,{style:{margin:0,fontSize:`1rem`,fontWeight:600},children:`No dishes found`}),(0,V.jsx)(`p`,{style:{margin:`8px 0 0`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:`Try adjusting your search or filter.`})]})}),ye&&(0,V.jsx)(`div`,{className:`load-more-wrap`,style:{display:`flex`,justifyContent:`center`,marginTop:`20px`},children:(0,V.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>C(e=>e+Js),style:{display:`inline-flex`,alignItems:`center`,gap:`8px`,padding:`10px 24px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,fontWeight:600,fontSize:`0.9rem`,color:`var(--text-secondary)`,cursor:`pointer`,transition:`all 0.25s var(--ease-premium)`},onMouseEnter:e=>{e.target.style.borderColor=`var(--brand-red)`,e.target.style.color=`var(--brand-red)`,e.target.style.background=`rgba(247,55,79,0.03)`},onMouseLeave:e=>{e.target.style.borderColor=``,e.target.style.color=``,e.target.style.background=``},children:[`Load more dishes (`,ge.length-S,` left) `,(0,V.jsx)(vo,{size:14})]})}),!b&&g.length>0&&(0,V.jsxs)(`div`,{className:`animate-card`,style:{marginTop:`56px`},children:[(0,V.jsxs)(`div`,{style:{marginBottom:`24px`},children:[(0,V.jsx)(`span`,{className:`promise-subtitle`,children:`PAIRED PERFECTION`}),(0,V.jsx)(`h2`,{className:`promise-title`,style:{fontSize:`1.8rem`,marginTop:`4px`},children:`Frequently Ordered Together`})]}),(0,V.jsxs)(`div`,{className:`menu-items-grid`,children:[ve.map((e,t)=>{let n=A(e.menuId),r=oe(e);return(0,V.jsxs)(`div`,{className:`menu-dish-card`,style:{animationDelay:`${t*.05}s`,borderLeft:`4px solid var(--brand-red)`},onMouseMove:se,onMouseLeave:ce,children:[(0,V.jsx)(`div`,{className:`dish-card-info`,children:(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`div`,{className:`dish-card-header-tags`,children:[(0,V.jsxs)(`div`,{className:r?`dish-type-badge veg`:`dish-type-badge nonveg`,children:[(0,V.jsx)(`span`,{className:`dot`}),(0,V.jsx)(`span`,{children:r?`VEG`:`NON-VEG`})]}),(0,V.jsxs)(`span`,{className:`dish-featured-tag`,style:{color:`var(--brand-red)`,background:`rgba(247,55,79,0.05)`,borderColor:`rgba(247,55,79,0.1)`},children:[(0,V.jsx)(cs,{size:12}),` Recommended`]})]}),(0,V.jsx)(`h3`,{className:`dish-card-title`,children:e.menuName}),(0,V.jsxs)(`div`,{className:`dish-card-price-row`,children:[(0,V.jsx)(`span`,{className:`price-symbol`,children:`₹`}),(0,V.jsx)(`span`,{className:`price-value`,children:e.price})]}),(0,V.jsx)(`p`,{className:`dish-card-desc`,children:e.description})]})}),(0,V.jsxs)(`div`,{className:`dish-card-media`,children:[(0,V.jsx)(`div`,{className:`dish-card-img-container`,children:(0,V.jsx)(`img`,{src:e.imagePath||qs,alt:e.menuName,className:`dish-card-img`,loading:`lazy`,onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=qs}})}),(0,V.jsx)(`div`,{className:`dish-card-action`,children:n===0?(0,V.jsx)(`button`,{className:`add-btn`,disabled:!e.isAvailable,onClick:()=>j(e.menuId),children:(0,V.jsx)(`span`,{className:`btn-text`,children:e.isAvailable?`ADD`:`SOLD OUT`})}):(0,V.jsxs)(`div`,{className:`qty-stepper`,children:[(0,V.jsx)(`button`,{className:`step-btn`,onClick:()=>O(e.menuId,n-1),children:(0,V.jsx)(Zo,{size:12})}),(0,V.jsx)(`span`,{className:`step-val`,children:n}),(0,V.jsx)(`button`,{className:`step-btn`,onClick:()=>O(e.menuId,n+1),children:(0,V.jsx)(ns,{size:12})})]})})]})]},`rec-${e.menuId}`)}),be&&(0,V.jsx)(`div`,{className:`load-more-wrap`,style:{gridColumn:`1 / -1`,margin:`4px auto 0`},children:(0,V.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>T(e=>e+Ys),style:{display:`inline-flex`,alignItems:`center`,gap:`8px`,padding:`10px 24px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`12px`,fontWeight:600,fontSize:`0.9rem`,color:`var(--text-secondary)`,cursor:`pointer`,transition:`all 0.25s var(--ease-premium)`},onMouseEnter:e=>{e.target.style.borderColor=`var(--brand-red)`,e.target.style.color=`var(--brand-red)`,e.target.style.background=`rgba(247,55,79,0.03)`},onMouseLeave:e=>{e.target.style.borderColor=``,e.target.style.color=``,e.target.style.background=``},children:[`More recommendations (`,g.length-w,` left) `,(0,V.jsx)(vo,{size:14})]})})]})]}),(0,V.jsxs)(`div`,{className:`zingbite-promise-section`,children:[(0,V.jsxs)(`div`,{className:`promise-header`,children:[(0,V.jsx)(`span`,{className:`promise-subtitle`,children:`WHY ORDER FROM US?`}),(0,V.jsx)(`h2`,{className:`promise-title`,children:`The ZingBite Promise`})]}),(0,V.jsxs)(`div`,{className:`promise-grid`,children:[(0,V.jsxs)(`div`,{className:`promise-card`,children:[(0,V.jsx)(`div`,{className:`promise-icon-wrapper`,children:(0,V.jsx)(zo,{size:24})}),(0,V.jsx)(`h3`,{children:`Gourmet Selection`}),(0,V.jsx)(`p`,{children:`We partner only with top-rated local kitchens to bring you handpicked culinary creations.`})]}),(0,V.jsxs)(`div`,{className:`promise-card`,children:[(0,V.jsx)(`div`,{className:`promise-icon-wrapper`,children:(0,V.jsx)(No,{size:24})}),(0,V.jsx)(`h3`,{children:`Superfast Delivery`}),(0,V.jsx)(`p`,{children:`Smart route optimization and live telemetry tracking ensure your food arrives hot and fresh.`})]}),(0,V.jsxs)(`div`,{className:`promise-card`,children:[(0,V.jsx)(`div`,{className:`promise-icon-wrapper`,children:(0,V.jsx)(Yo,{size:24})}),(0,V.jsx)(`h3`,{children:`Live Telemetry Tracking`}),(0,V.jsx)(`p`,{children:`Follow your rider live on an interactive map from our kitchen to your doorstep.`})]})]})]})]}),re&&y.createPortal((0,V.jsxs)(`div`,{style:{position:`fixed`,top:`80px`,right:`24px`,zIndex:3e3,background:`#fff`,border:`1.5px solid var(--danger)`,borderRadius:`12px`,padding:`14px 20px`,boxShadow:`0 8px 32px rgba(0,0,0,0.12)`,display:`flex`,alignItems:`center`,gap:`10px`,animation:`slideIn 0.3s ease-out`,maxWidth:`380px`},children:[(0,V.jsx)(_s,{size:18,color:`var(--danger)`}),(0,V.jsx)(`span`,{style:{fontSize:`0.9rem`,fontWeight:600,color:`var(--text-primary)`},children:re}),(0,V.jsx)(`button`,{onClick:()=>ie(null),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-muted)`,marginLeft:`4px`,padding:`2px`},children:`✕`})]}),document.body),E&&E.itemCount>0&&y.createPortal((0,V.jsxs)(`div`,{className:`cart-bar-popup`,children:[(0,V.jsxs)(`span`,{style:{fontWeight:700,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,V.jsx)(cs,{size:18}),` `,E.itemCount,` item`,E.itemCount>1?`s`:``,` in cart`]}),(0,V.jsxs)(F,{to:`/cart`,className:`cart-bar-link`,children:[`VIEW CART `,(0,V.jsx)(vo,{size:18})]})]}),document.body),te&&y.createPortal((0,V.jsx)(`div`,{className:`modal-overlay`,onClick:()=>ne(null),children:(0,V.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,V.jsx)(`div`,{className:`modal-icon`,children:(0,V.jsx)(Oo,{size:32,color:`var(--brand-red)`})}),(0,V.jsx)(`h3`,{className:`modal-title`,children:`Items from another restaurant`}),(0,V.jsx)(`p`,{className:`modal-desc`,children:`Your cart contains items from a different restaurant. Start fresh to add items from this one?`}),(0,V.jsxs)(`div`,{className:`modal-actions`,children:[(0,V.jsx)(`button`,{className:`modal-btn-outline`,onClick:()=>ne(null),children:`Cancel`}),(0,V.jsx)(`button`,{className:`modal-btn-primary`,onClick:()=>k(te.itemId,te.quantity),children:`Start Fresh`})]})]})}),document.body)]})},Zs=()=>{let{cart:e,updateQuantity:t,removeFromCart:n,clearCart:r,coupon:i,applyCoupon:a,removeCoupon:o}=lo(),{user:s}=v.useContext(ro),c=P(),[l,u]=(0,v.useState)(``),[d,f]=(0,v.useState)(``),p=()=>{if(f(``),!l)return;let e=a(l);e.success?u(``):f(e.message)},m=e=>{f(``),a(e)},h=(0,v.useCallback)(e=>{let t=e.currentTarget,n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top,a=n.width/2,o=n.height/2,s=(i-o)/o*-6,c=(r-a)/a*6;t.style.setProperty(`--tiltX`,`${c}deg`),t.style.setProperty(`--tiltY`,`${s}deg`),t.classList.add(`cart-item-3d-active`)},[]),g=(0,v.useCallback)(e=>{e.currentTarget.classList.remove(`cart-item-3d-active`)},[]),_=e?.items?Array.isArray(e.items)?e.items:Object.values(e.items):[];return!e||_.length===0?(0,V.jsxs)(`div`,{className:`page-enter`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`100px 20px`,textAlign:`center`},children:[(0,V.jsx)(`div`,{style:{width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(247,55,79,0.06)`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginBottom:`24px`,animation:`emptyCartFloat 3s ease-in-out infinite`},children:(0,V.jsx)(ls,{size:44,color:`var(--text-muted)`,strokeWidth:1.2,style:{animation:`emptyCartSwing 3s ease-in-out infinite`}})}),(0,V.jsx)(`h3`,{style:{fontSize:`1.6rem`,fontWeight:800,marginBottom:`8px`},children:`Your cart is empty`}),(0,V.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`28px`,fontSize:`0.95rem`,maxWidth:`400px`},children:`Looks like you haven't added anything yet. Explore restaurants near you and find something delicious!`}),(0,V.jsxs)(F,{to:`/`,style:{padding:`14px 36px`,background:`linear-gradient(135deg, var(--brand-red), #d42d42)`,color:`#fff`,borderRadius:`12px`,fontWeight:700,textDecoration:`none`,boxShadow:`0 8px 24px rgba(247,55,79,0.25)`,transition:`transform 0.2s, box-shadow 0.2s`,display:`inline-flex`,alignItems:`center`,gap:`8px`},onMouseEnter:e=>{e.target.style.transform=`perspective(400px) translateZ(12px) translateY(-2px)`,e.target.style.boxShadow=`0 12px 32px rgba(247,55,79,0.35)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 8px 24px rgba(247,55,79,0.25)`},children:[(0,V.jsx)(cs,{size:16}),` BROWSE RESTAURANTS`]})]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        :root {
          --cart-3d-ease: cubic-bezier(0.23, 1, 0.32, 1);
        }
        .cart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
          perspective: 1200px;
        }
        .cart-items-box {
          padding: 28px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
          transform: translateZ(0);
          animation: cartBoxEntrance 0.6s var(--cart-3d-ease) both;
        }
        @keyframes cartBoxEntrance {
          0% { opacity: 0; transform: perspective(800px) rotateX(4deg) translateZ(-20px) translateY(20px); }
          100% { opacity: 1; transform: perspective(800px) rotateX(0) translateZ(0) translateY(0); }
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1.5px solid var(--border-light);
        }
        .cart-header h2 {
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .item-count-badge {
          font-size: 0.8rem;
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(247,55,79,0.12);
          font-weight: 700;
        }
        .clear-cart-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1.5px solid rgba(226,55,68,0.2);
          color: var(--danger);
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          display: flex;
          align-items: center;
          gap: 6px;
          transform: translateZ(0);
        }
        .clear-cart-btn:hover {
          background: rgba(226,55,68,0.04);
          border-color: var(--danger);
          transform: translateZ(4px);
          box-shadow: 0 4px 12px rgba(226,55,68,0.08);
        }
        .clear-cart-btn:active { transform: translateZ(0) scale(0.96); }
        .cart-items-list {
          display: flex;
          flex-direction: column;
        }
        .cart-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px dashed var(--border-light);
          gap: 16px;
          transform-style: preserve-3d;
          will-change: transform;
          transition: box-shadow 0.3s var(--cart-3d-ease), border-color 0.3s var(--cart-3d-ease);
          position: relative;
          animation: cartItemSlideIn 0.5s var(--cart-3d-ease) both;
        }
        .cart-item-row:last-child { border-bottom: none; }
        .cart-item-row.cart-item-3d-active {
          transform: perspective(800px) rotateX(var(--tiltY, 0deg)) rotateY(var(--tiltX, 0deg)) translateZ(12px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.03);
          border-color: rgba(247,55,79,0.06);
        }
        @keyframes cartItemSlideIn {
          0% { opacity: 0; transform: perspective(600px) rotateX(6deg) translateZ(-10px) translateX(-12px); }
          100% { opacity: 1; transform: perspective(600px) rotateX(0) translateZ(0) translateX(0); }
        }
        .cart-item-row:nth-child(1) { animation-delay: 0.05s; }
        .cart-item-row:nth-child(2) { animation-delay: 0.1s; }
        .cart-item-row:nth-child(3) { animation-delay: 0.15s; }
        .cart-item-row:nth-child(4) { animation-delay: 0.2s; }
        .cart-item-row:nth-child(5) { animation-delay: 0.25s; }
        .cart-item-row:nth-child(6) { animation-delay: 0.3s; }
        .cart-item-row:nth-child(7) { animation-delay: 0.35s; }
        .cart-item-row:nth-child(8) { animation-delay: 0.4s; }
        .item-details { flex: 1; min-width: 0; }
        .item-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .item-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--brand-red);
          margin: 0 0 10px;
        }
        .qty-control-box {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(96,178,70,0.25);
          border-radius: 10px;
          height: 34px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(96,178,70,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
          transform: translateZ(2px);
          transition: transform 0.3s var(--cart-3d-ease), box-shadow 0.3s var(--cart-3d-ease);
        }
        .qty-control-box:hover {
          transform: translateZ(6px);
          box-shadow: 0 6px 20px rgba(96,178,70,0.1), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .qty-adjust-btn {
          width: 34px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.15s;
        }
        .qty-adjust-btn:hover { background: rgba(96,178,70,0.06); }
        .qty-adjust-btn:active { transform: scale(0.82); }
        .qty-val-display {
          padding: 0 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 700;
          min-width: 20px;
          text-align: center;
        }
        .item-image-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
          transform: translateZ(6px);
        }
        .item-thumb {
          width: 80px;
          height: 80px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transition: transform 0.4s var(--cart-3d-ease), box-shadow 0.4s var(--cart-3d-ease);
          transform: translateZ(0);
        }
        .cart-item-3d-active .item-thumb {
          transform: translateZ(16px) scale(1.04);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .item-remove-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s var(--cart-3d-ease);
          transform: translateZ(0);
        }
        .item-remove-btn:hover {
          color: var(--danger);
          transform: translateZ(6px) scale(1.05);
          text-shadow: 0 2px 8px rgba(226,55,68,0.1);
        }
        .item-remove-btn:active { transform: translateZ(0) scale(0.95); }
        .summary-card {
          position: sticky;
          top: 96px;
          padding: 24px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
          transform: translateZ(0);
          animation: summaryCardEntrance 0.7s var(--cart-3d-ease) both;
          animation-delay: 0.15s;
        }
        @keyframes summaryCardEntrance {
          0% { opacity: 0; transform: perspective(800px) rotateX(6deg) rotateY(-3deg) translateZ(-30px) translateX(20px); }
          100% { opacity: 1; transform: perspective(800px) rotateX(0) rotateY(0) translateZ(0) translateX(0); }
        }
        .summary-card::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 20px;
          right: 20px;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        .coupon-box {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
          position: relative;
        }
        .coupon-box::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
          opacity: 0.3;
          animation: couponBorderGlow 3s ease-in-out infinite;
        }
        @keyframes couponBorderGlow {
          0%, 100% { opacity: 0.15; transform: scaleX(0.8); }
          50% { opacity: 0.4; transform: scaleX(1); }
        }
        .coupon-title {
          font-size: 0.9rem;
          margin: 0 0 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coupon-title svg { color: var(--brand-red); }
        .coupon-input-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .coupon-field {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-size: 0.85rem;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: border-color 0.25s var(--ease-premium), transform 0.25s, box-shadow 0.25s;
          transform: translateZ(0);
        }
        .coupon-field:focus {
          border-color: var(--brand-red);
          transform: translateZ(4px);
          box-shadow: 0 4px 16px rgba(247,55,79,0.06);
        }
        .coupon-apply-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.25s var(--ease-premium);
          transform: translateZ(0);
        }
        .coupon-apply-btn:hover {
          transform: translateY(-1px) translateZ(6px);
          box-shadow: 0 4px 14px rgba(247,55,79,0.3);
        }
        .coupon-apply-btn:active { transform: translateZ(0) scale(0.97); }
        .applied-coupon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(96,178,70,0.06);
          border: 1.5px dashed var(--success);
          border-radius: 10px;
          margin-top: 6px;
          animation: appliedCouponPop 0.4s var(--cart-3d-ease) both;
        }
        @keyframes appliedCouponPop {
          0% { opacity: 0; transform: perspective(400px) rotateX(8deg) translateZ(-10px) scale(0.95); }
          100% { opacity: 1; transform: perspective(400px) rotateX(0) translateZ(0) scale(1); }
        }
        .quick-codes-section { margin-top: 12px; }
        .chips-container {
          display: flex;
          gap: 6px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .coupon-chip-btn {
          padding: 5px 12px;
          background: rgba(247,55,79,0.04);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          font-weight: 600;
          transform: translateZ(0);
        }
        .coupon-chip-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
          transform: translateZ(4px);
          box-shadow: 0 4px 12px rgba(247,55,79,0.06);
        }
        .bill-label { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: transform 0.3s var(--cart-3d-ease);
          transform: translateZ(0);
          animation: billRowSlide 0.5s var(--cart-3d-ease) both;
        }
        .bill-row:nth-child(2) { animation-delay: 0.2s; }
        .bill-row:nth-child(3) { animation-delay: 0.25s; }
        .bill-row:nth-child(4) { animation-delay: 0.3s; }
        .bill-row:nth-child(5) { animation-delay: 0.35s; }
        .bill-row:nth-child(6) { animation-delay: 0.4s; }
        @keyframes billRowSlide {
          0% { opacity: 0; transform: perspective(600px) rotateX(4deg) translateZ(-8px) translateX(-8px); }
          100% { opacity: 1; transform: perspective(600px) rotateX(0) translateZ(0) translateX(0); }
        }
        .bill-row:hover {
          transform: translateZ(4px);
          color: var(--text-primary);
        }
        .bill-total-row {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          padding-top: 12px;
          padding-bottom: 16px;
          border-top: 1.5px dashed var(--border-light);
          margin-top: 8px;
        }
        .bill-total-row:hover { transform: translateZ(6px); }
        .checkout-action-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--success), #4a9a32, var(--success));
          background-size: 200% 200%;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s var(--cart-3d-ease);
          box-shadow: 0 4px 16px rgba(96, 178, 70, 0.25);
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
          animation: checkoutGradient 4s ease-in-out infinite;
        }
        @keyframes checkoutGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .checkout-action-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .checkout-action-btn:hover {
          transform: translateY(-2px) translateZ(10px);
          box-shadow: 0 12px 36px rgba(96, 178, 70, 0.35);
        }
        .checkout-action-btn:hover::before { opacity: 1; }
        .checkout-action-btn:active {
          transform: translateZ(2px) scale(0.98);
          box-shadow: 0 4px 12px rgba(96, 178, 70, 0.2);
        }
        @keyframes emptyCartFloat {
          0%, 100% { transform: translateY(0); box-shadow: 0 0 0 rgba(247,55,79,0.06); }
          50% { transform: translateY(-12px); box-shadow: 0 20px 40px rgba(247,55,79,0.08); }
        }
        @keyframes emptyCartSwing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
          .summary-card { position: static; }
        }
        @media (max-width: 480px) {
          .cart-item-row {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 12px;
          }
          .item-image-col {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .cart-items-box { padding: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cart-items-box { animation: none !important; }
          .cart-item-row { animation: none !important; }
          .cart-item-row.cart-item-3d-active { transform: none !important; }
          .summary-card { animation: none !important; }
          .applied-coupon-row { animation: none !important; }
          .bill-row { animation: none !important; }
          .checkout-action-btn { animation: none !important; }
          .coupon-box::after { animation: none !important; opacity: 0.2; }
        }
      `}),(0,V.jsxs)(`div`,{className:`cart-layout page-enter`,children:[(0,V.jsxs)(`div`,{className:`cart-items-box`,children:[(0,V.jsxs)(`div`,{className:`cart-header`,children:[(0,V.jsxs)(`h2`,{children:[(0,V.jsx)(cs,{size:20,color:`var(--brand-red)`}),`Your Cart`,(0,V.jsxs)(`span`,{className:`item-count-badge`,children:[e.itemCount,` ITEM`,e.itemCount>1?`S`:``]})]}),(0,V.jsxs)(`button`,{onClick:r,className:`clear-cart-btn`,children:[(0,V.jsx)(gs,{size:14}),` Clear`]})]}),(0,V.jsx)(`div`,{className:`cart-items-list`,children:_.map(e=>(0,V.jsxs)(`div`,{className:`cart-item-row`,onMouseMove:h,onMouseLeave:g,children:[(0,V.jsxs)(`div`,{className:`item-details`,children:[(0,V.jsx)(`h3`,{className:`item-title`,children:e.itemName}),(0,V.jsxs)(`p`,{className:`item-price`,children:[`₹`,(e.price*e.quantity).toFixed(2)]}),(0,V.jsxs)(`div`,{className:`qty-control-box`,children:[(0,V.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>t(e.itemId,e.quantity-1),children:(0,V.jsx)(Zo,{size:14})}),(0,V.jsx)(`span`,{className:`qty-val-display`,children:e.quantity}),(0,V.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>t(e.itemId,e.quantity+1),children:(0,V.jsx)(ns,{size:14})})]})]}),(0,V.jsxs)(`div`,{className:`item-image-col`,children:[(0,V.jsx)(`div`,{className:`item-thumb`,children:(0,V.jsx)(`img`,{src:`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,alt:e.itemName,loading:`lazy`,style:{width:`100%`,height:`100%`,objectFit:`cover`}})}),(0,V.jsxs)(`button`,{onClick:()=>n(e.itemId),className:`item-remove-btn`,children:[(0,V.jsx)(gs,{size:12}),` Remove`]})]})]},e.itemId))})]}),(0,V.jsxs)(`div`,{className:`summary-card`,children:[(0,V.jsxs)(`div`,{className:`coupon-box`,children:[(0,V.jsxs)(`h3`,{className:`coupon-title`,children:[(0,V.jsx)(hs,{size:15}),` Apply Promo Code`]}),i?(0,V.jsxs)(`div`,{className:`applied-coupon-row`,children:[(0,V.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700,color:`var(--success)`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,V.jsx)(es,{size:13}),` `,i.code,` (`,i.description,`)`]}),(0,V.jsx)(`button`,{onClick:o,className:`item-remove-btn`,style:{fontSize:`0.75rem`},children:`Remove`})]}):(0,V.jsxs)(`div`,{className:`coupon-input-group`,children:[(0,V.jsx)(`input`,{type:`text`,placeholder:`e.g. ZING50`,value:l,onChange:e=>u(e.target.value),className:`coupon-field`}),(0,V.jsx)(`button`,{onClick:p,className:`coupon-apply-btn`,children:`Apply`})]}),d&&(0,V.jsx)(`p`,{style:{color:`var(--danger)`,fontSize:`0.78rem`,margin:`6px 0 0`,fontWeight:600},children:d}),!i&&(0,V.jsxs)(`div`,{className:`quick-codes-section`,children:[(0,V.jsx)(`span`,{style:{fontSize:`0.72rem`,color:`var(--text-muted)`,fontWeight:700},children:`Quick Codes:`}),(0,V.jsxs)(`div`,{className:`chips-container`,children:[(0,V.jsx)(`button`,{onClick:()=>m(`ZING50`),className:`coupon-chip-btn`,children:`ZING50 (50% Off)`}),(0,V.jsx)(`button`,{onClick:()=>m(`FREEDEL`),className:`coupon-chip-btn`,children:`FREEDEL (Free Delivery)`})]})]})]}),(0,V.jsx)(`div`,{className:`bill-label`,children:`Bill Details`}),(0,V.jsxs)(`div`,{className:`bill-row`,children:[(0,V.jsx)(`span`,{children:`Item Total`}),(0,V.jsxs)(`span`,{children:[`₹`,e.subtotal.toFixed(2)]})]}),(0,V.jsxs)(`div`,{className:`bill-row`,children:[(0,V.jsxs)(`span`,{children:[(0,V.jsx)(vs,{size:12,style:{marginRight:`4px`,verticalAlign:`middle`}}),` Delivery Fee`]}),(0,V.jsxs)(`span`,{children:[`₹`,e.shipping.toFixed(2)]})]}),(0,V.jsxs)(`div`,{className:`bill-row`,children:[(0,V.jsx)(`span`,{children:`Taxes and Charges`}),(0,V.jsxs)(`span`,{children:[`₹`,e.tax.toFixed(2)]})]}),e.discount>0&&(0,V.jsxs)(`div`,{className:`bill-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,V.jsxs)(`span`,{children:[(0,V.jsx)(es,{size:12,style:{marginRight:`2px`,verticalAlign:`middle`}}),` Promo Discount`]}),(0,V.jsxs)(`span`,{children:[`-₹`,e.discount.toFixed(2)]})]}),(0,V.jsxs)(`div`,{className:`bill-row bill-total-row`,children:[(0,V.jsx)(`span`,{children:`TO PAY`}),(0,V.jsxs)(`span`,{children:[`₹`,e.total.toFixed(2)]})]}),(0,V.jsx)(`button`,{onClick:()=>c(s?`/checkout`:`/login?redirect=/checkout`),className:`checkout-action-btn`,children:s?`PROCEED TO PAY (\u20B9${e.total.toFixed(2)})`:`LOGIN TO PROCEED`})]})]})]})},Qs=()=>{let{cart:e,clearCart:t}=lo(),{user:n,updateUser:r}=v.useContext(ro),i=P(),{showAlert:a}=Es(),[o,s]=(0,v.useState)(`profile`),[c,l]=(0,v.useState)(``),[u,d]=(0,v.useState)(!1),[f,p]=(0,v.useState)(null),[m,h]=(0,v.useState)(null),[g,_]=(0,v.useState)(``),[y,b]=(0,v.useState)(!1),[x,S]=(0,v.useState)(typeof window<`u`&&!!window.L),C=(0,v.useRef)(null),w=(0,v.useRef)(null),T=(0,v.useRef)(null),[ee,E]=(0,v.useState)(!1);(0,v.useEffect)(()=>{if(window.L){S(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(S(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let D=async(e,t)=>{E(!0);try{let n=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();n&&n.display_name?(l(n.display_name),p(e),h(t),_(n?.address?.city||n?.address?.town||n?.address?.village||n?.address?.suburb||``)):(l(`Latitude: ${e.toFixed(5)}, Longitude: ${t.toFixed(5)}`),p(e),h(t),_(``))}catch(n){console.error(`Reverse geocoding error:`,n),l(`Latitude: ${e.toFixed(5)}, Longitude: ${t.toFixed(5)}`)}finally{E(!1)}};(0,v.useEffect)(()=>{if(!x||!C.current||o!==`manual`){w.current&&(w.current.remove(),w.current=null,T.current=null);return}if(w.current)return;let e=window.L;if(!e)return;let t=12.9716,n=77.5946,r=e.map(C.current).setView([t,n],14);w.current=r,e.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(r);let i=e.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-checkout-marker`,iconSize:[24,24],iconAnchor:[12,12]}),a=e.marker([t,n],{icon:i,draggable:!0}).addTo(r);return T.current=a,a.on(`dragend`,()=>{let e=a.getLatLng();D(e.lat,e.lng)}),r.on(`click`,e=>{a.setLatLng(e.latlng),D(e.latlng.lat,e.latlng.lng)}),D(t,n),()=>{w.current&&(w.current.remove(),w.current=null,T.current=null)}},[x,o]);let O=()=>{if(!navigator.geolocation){a(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(e=>{let{latitude:t,longitude:n}=e.coords;w.current&&(w.current.setView([t,n],16),T.current&&T.current.setLatLng([t,n])),D(t,n)},e=>{a(`Error retrieving location: `+e.message,`error`)})};if(!e||e.itemCount===0)return i(`/cart`),null;let te=async()=>new Promise(e=>{if(window.Razorpay){e(!0);return}let t=document.createElement(`script`);t.src=`https://checkout.razorpay.com/v1/checkout.js`,t.onload=()=>e(!0),t.onerror=()=>e(!1),document.body.appendChild(t)});return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
          perspective: 1200px;
        }
        .chk-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          animation: chkCardEnter 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
          position: relative;
          overflow: hidden;
        }
        .chk-card:nth-child(1) { animation-delay: 0.1s; }
        .chk-card:nth-child(2) { animation-delay: 0.25s; }
        .chk-card:hover {
          transform: translateZ(8px) rotateX(1deg);
          box-shadow: 0 12px 48px rgba(0,0,0,0.08);
        }
        .chk-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 20%, rgba(247,55,79,0.03) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        @keyframes chkCardEnter {
          0% { opacity: 0; transform: translateZ(-80px) rotateX(4deg) scale(0.95); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0) scale(1); }
        }
        .chk-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 20px;
          padding-bottom: 14px;
          border-bottom: 1.5px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .chk-title svg { color: var(--brand-red); }
        .option-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; perspective: 800px; }
        .option-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s var(--ease-premium);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
        }
        .option-label:hover {
          border-color: var(--brand-red);
          background: rgba(247,55,79,0.02);
          transform: translateZ(6px) rotateX(-1deg) rotateY(1deg);
          box-shadow: 0 8px 28px rgba(247,55,79,0.08);
        }
        .option-label input[type="radio"] { accent-color: var(--brand-red); width: 16px; height: 16px; }
        .address-field {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s var(--ease-premium), transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .address-field:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247,55,79,0.06);
          transform: translateZ(4px);
        }
        .address-field:disabled { background: var(--bg-surface); color: var(--text-muted); cursor: not-allowed; }
        .locate-btn {
          align-self: flex-start;
          padding: 9px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          background: var(--brand-red);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 2px 8px rgba(247,55,79,0.2);
          transform-style: preserve-3d;
          position: relative;
        }
        .locate-btn:hover {
          transform: translateY(-2px) translateZ(6px);
          box-shadow: 0 6px 20px rgba(247,55,79,0.3);
        }
        .locate-btn:active {
          transform: translateY(0) translateZ(2px);
        }
        .chk-summary {
          background: var(--bg-surface);
          padding: 20px;
          border-radius: 14px;
          margin-bottom: 20px;
          border: 1px solid var(--border-light);
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .chk-summary:hover {
          transform: translateZ(6px) rotateX(-0.5deg);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
        }
        .chk-summary::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b8b, transparent);
          opacity: 0.6;
          border-radius: 14px 14px 0 0;
        }
        .chk-row { display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem; }
        .chk-divider { border: none; border-top: 1.5px dashed var(--border-light); margin: 12px 0; }
        .chk-total { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); }
        .pay-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--success), #4a9a32);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 4px 16px rgba(96,178,70,0.25);
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }
        .pay-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.6s ease;
        }
        .pay-btn:hover:not(:disabled)::before {
          left: 100%;
        }
        .pay-btn:hover:not(:disabled) {
          transform: translateY(-3px) translateZ(10px) rotateX(-1deg);
          box-shadow: 0 12px 36px rgba(96,178,70,0.4);
        }
        .pay-btn:active:not(:disabled) {
          transform: translateY(0) translateZ(4px);
          box-shadow: 0 4px 12px rgba(96,178,70,0.25);
        }
        .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        @media (max-width: 850px) {
          .checkout-layout { grid-template-columns: 1fr; margin: 16px auto 32px; gap: 20px; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .option-label {
          animation: optionFadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .option-label:nth-child(1) { animation-delay: 0.2s; }
        .option-label:nth-child(2) { animation-delay: 0.3s; }
        @keyframes optionFadeIn {
          0% { opacity: 0; transform: translateZ(-20px) rotateX(2deg); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0); }
        }
        .chk-card:first-child .option-group + div > div[ref] {
          animation: mapFloat 4s ease-in-out infinite;
        }
        @keyframes mapFloat {
          0%, 100% { transform: translateZ(0) translateY(0); }
          50% { transform: translateZ(12px) translateY(-4px); }
        }
        .chk-title {
          animation: titleSlideIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
          animation-delay: 0.15s;
        }
        @keyframes titleSlideIn {
          0% { opacity: 0; transform: translateZ(-20px) translateY(-8px); }
          100% { opacity: 1; transform: translateZ(0) translateY(0); }
        }
        .address-field {
          animation: fieldGlow 2s ease-in-out infinite;
        }
        @keyframes fieldGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(247,55,79,0); }
          50% { box-shadow: 0 0 0 3px rgba(247,55,79,0.04); }
        }
        .pay-btn {
          animation: btnPulse 3s ease-in-out infinite;
        }
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(96,178,70,0.25); }
          50% { box-shadow: 0 8px 32px rgba(96,178,70,0.4); }
        }
        .chk-card {
          position: relative;
        }
        .chk-card::after {
          content: '';
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(247,55,79,0.03);
          top: -20px;
          right: -20px;
          pointer-events: none;
          animation: bgFloat 8s ease-in-out infinite;
        }
        @keyframes bgFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-10px, 10px) scale(1.1); }
          66% { transform: translate(10px, -5px) scale(0.9); }
        }
        .chk-card:nth-child(2)::after {
          width: 120px;
          height: 120px;
          background: rgba(96, 178, 70, 0.03);
          top: auto;
          bottom: -30px;
          right: auto;
          left: -30px;
          animation-duration: 10s;
        }
      `}),(0,V.jsxs)(`div`,{className:`checkout-layout page-enter`,children:[(0,V.jsxs)(`div`,{className:`chk-card`,children:[(0,V.jsxs)(`h2`,{className:`chk-title`,children:[(0,V.jsx)(Yo,{size:20}),` Delivery Address`]}),(0,V.jsxs)(`div`,{className:`option-group`,children:[(0,V.jsxs)(`label`,{className:`option-label`,children:[(0,V.jsx)(`input`,{type:`radio`,checked:o===`profile`,onChange:()=>s(`profile`)}),` Use saved address`]}),(0,V.jsxs)(`label`,{className:`option-label`,children:[(0,V.jsx)(`input`,{type:`radio`,checked:o===`manual`,onChange:()=>s(`manual`)}),` Enter new address`]})]}),(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,V.jsx)(`input`,{type:`text`,className:`address-field`,placeholder:`Enter your delivery address`,value:o===`profile`?n?n.address:``:c,onChange:e=>{o===`manual`&&l(e.target.value)},disabled:o===`profile`}),o===`manual`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`button`,{type:`button`,onClick:O,className:`locate-btn`,children:[(0,V.jsx)(Yo,{size:13}),` `,ee?`Detecting...`:`Auto-Detect Location`]}),(0,V.jsx)(`div`,{ref:C,style:{height:`220px`,borderRadius:`12px`,border:`1px solid var(--border-medium)`,zIndex:1}}),(0,V.jsx)(`p`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,margin:0},children:`Drag the marker or click on the map to set your delivery location.`})]})]})]}),(0,V.jsxs)(`div`,{className:`chk-card`,children:[(0,V.jsxs)(`h2`,{className:`chk-title`,children:[(0,V.jsx)(Io,{size:20}),` Payment`]}),(0,V.jsxs)(`div`,{className:`option-group`,children:[(0,V.jsxs)(`label`,{className:`option-label`,children:[(0,V.jsx)(`input`,{type:`radio`,name:`pay`,defaultChecked:!0}),` `,(0,V.jsx)(Io,{size:16}),` Credit / Debit Card`]}),(0,V.jsxs)(`label`,{className:`option-label`,children:[(0,V.jsx)(`input`,{type:`radio`,name:`pay`}),` `,(0,V.jsx)(us,{size:16}),` UPI`]}),(0,V.jsxs)(`label`,{className:`option-label`,children:[(0,V.jsx)(`input`,{type:`radio`,name:`pay`}),` `,(0,V.jsx)(bo,{size:16}),` Cash on Delivery`]})]}),(0,V.jsxs)(`div`,{className:`chk-summary`,children:[(0,V.jsxs)(`div`,{className:`chk-row`,children:[(0,V.jsx)(`span`,{children:`Item Total`}),(0,V.jsxs)(`span`,{children:[`₹`,e.subtotal.toFixed(2)]})]}),(0,V.jsxs)(`div`,{className:`chk-row`,children:[(0,V.jsxs)(`span`,{children:[(0,V.jsx)(vs,{size:12,style:{marginRight:4,verticalAlign:`middle`}}),` Delivery Fee`]}),(0,V.jsxs)(`span`,{children:[`₹`,e.shipping.toFixed(2)]})]}),(0,V.jsxs)(`div`,{className:`chk-row`,children:[(0,V.jsx)(`span`,{children:`Taxes`}),(0,V.jsxs)(`span`,{children:[`₹`,e.tax.toFixed(2)]})]}),e.discount>0&&(0,V.jsxs)(`div`,{className:`chk-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,V.jsxs)(`span`,{children:[(0,V.jsx)(es,{size:12,style:{marginRight:2,verticalAlign:`middle`}}),` Discount`]}),(0,V.jsxs)(`span`,{children:[`-₹`,e.discount.toFixed(2)]})]}),(0,V.jsx)(`hr`,{className:`chk-divider`}),(0,V.jsxs)(`div`,{className:`chk-row chk-total`,children:[(0,V.jsx)(`strong`,{children:`TO PAY`}),(0,V.jsxs)(`strong`,{children:[`₹`,e.total.toFixed(2)]})]})]}),(0,V.jsx)(`button`,{onClick:async()=>{if(!(y||u)){if(!await te()){a(`Failed to load Razorpay payment gateway.`,`error`);return}b(!0);try{let s=(e.items?Array.isArray(e.items)?e.items:Object.values(e.items):[]).map(e=>({id:e.itemId,qty:e.quantity,price:e.price})),l=o===`profile`?n?.address||``:c;if(o===`manual`&&l){let e=await B.post(`/api/profile`,{action:`update`,username:n.userName||n.username||`User`,mobile:String(n.phoneNumber||n.mobile||``),address:l,latitude:l===c?f:null,longitude:l===c?m:null,city:l===c?g:``});e.data.success&&typeof r==`function`&&r(e.data.user)}let u=await B.post(`/api/profile`,{action:`createOrder`,total:e.total,paymentMethod:`Razorpay`,items:s});if(!u.data.success){a(u.data.error||`Failed to reserve order.`,`error`),b(!1);return}let p=u.data.orderId,h={key:`rzp_test_RU5HIdwTwlQNOw`,amount:Math.round(e.total*100),currency:`INR`,name:`ZingBite`,description:`Order Payment`,handler:async function(n){d(!0);try{let r=await B.post(`/api/payment/verify`,{orderId:p,transactionId:n.razorpay_payment_id,paymentMethod:`Razorpay`});r.data.success?(ao(`ORDER_PLACED`,{orderId:p,amount:e.total}),t(),i(`/track-order?orderId=${p}`)):a(r.data.error||`Payment verification failed.`,`error`)}catch(n){console.error(`Payment verification timeout/drop:`,n),ao(`ORDER_PLACED`,{orderId:p,amount:e.total}),t(),i(`/track-order?orderId=${p}`)}finally{d(!1)}},modal:{ondismiss:async function(){console.log(`Payment gateway dismissed. Cancelling reserved order.`);try{await B.post(`/api/payment/verify`,{orderId:p,transactionId:`pay_abandoned_`+p,paymentMethod:`Razorpay`})}catch(e){console.error(`Failed to notify server of cancellation:`,e)}}},theme:{color:`#F7374F`}};new window.Razorpay(h).open()}catch(e){console.error(`Failed to initialize checkout transaction:`,e),a(`An error occurred during checkout setup. Please try again.`,`error`)}finally{b(!1)}}},className:`pay-btn`,disabled:y||u,children:y?`Redirecting to Payment...`:`SECURE PAY (\u20B9${e.total.toFixed(2)})`}),(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`,marginTop:`12px`,fontSize:`0.75rem`,color:`var(--text-muted)`},children:[(0,V.jsx)(Ko,{size:12}),` Secured by Razorpay`]})]})]}),u&&(0,V.jsx)(`div`,{style:{position:`fixed`,inset:0,background:`rgba(10, 10, 15, 0.85)`,backdropFilter:`blur(8px)`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,zIndex:9999,color:`#fff`},children:(0,V.jsxs)(`div`,{style:{background:`rgba(20, 20, 30, 0.95)`,border:`1px solid rgba(255, 255, 255, 0.08)`,padding:`40px 30px`,borderRadius:`20px`,textAlign:`center`,maxWidth:`400px`,width:`100%`,boxShadow:`0 8px 32px rgba(0,0,0,0.37)`},children:[(0,V.jsx)(`div`,{className:`spin`,style:{width:`48px`,height:`48px`,border:`4px solid rgba(247, 55, 79, 0.1)`,borderTopColor:`#f7374f`,borderRadius:`50%`,margin:`0 auto 24px`}}),(0,V.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`12px`,fontFamily:`Outfit, sans-serif`},children:`Securing Your Payment`}),(0,V.jsxs)(`p`,{style:{color:`#94a3b8`,fontSize:`0.9rem`,lineHeight:`1.6`,margin:0,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`6px`},children:[(0,V.jsx)(ss,{size:16}),` Verifying transaction with payment gateway…`]})]})})]})},$s=()=>{let[e,t]=(0,v.useState)(``),[n,r]=(0,v.useState)(``),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(!1),[c,l]=(0,v.useState)(null),{login:u}=(0,v.useContext)(ro),d=P(),[f]=zn(),p=f.get(`redirect`)||`/`;return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        .login-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .login-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
          perspective: 1200px;
        }
        @media (min-width: 900px) {
          .login-hero { display: block; }
        }
        .login-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateZ(-15px) scale(1.12);
          animation: heroParallax 14s ease-in-out infinite alternate;
        }
        @keyframes heroParallax {
          0% { transform: translateZ(-15px) scale(1.08) translateX(0); }
          100% { transform: translateZ(-25px) scale(1.18) translateX(-8px); }
        }
        .login-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.35) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
          transform-style: preserve-3d;
        }
        .login-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.15) 0%, transparent 60%);
        }
        .login-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.1;
          position: relative;
          transform: translateZ(20px);
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .login-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
          position: relative;
          transform: translateZ(10px);
        }
        .hero-flame {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          padding: 8px 20px;
          border-radius: 30px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
        }
        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
          position: relative;
          overflow: hidden;
        }
        .login-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
        }
        .login-form-section::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(2px 2px at 10% 20%, rgba(247,55,79,0.35), transparent),
            radial-gradient(2px 2px at 30% 65%, rgba(247,55,79,0.25), transparent),
            radial-gradient(3px 3px at 55% 15%, rgba(247,55,79,0.2), transparent),
            radial-gradient(2px 2px at 70% 80%, rgba(255,107,129,0.3), transparent),
            radial-gradient(2px 2px at 85% 35%, rgba(247,55,79,0.2), transparent),
            radial-gradient(3px 3px at 40% 90%, rgba(255,107,129,0.25), transparent),
            radial-gradient(2px 2px at 15% 50%, rgba(247,55,79,0.15), transparent),
            radial-gradient(2px 2px at 90% 55%, rgba(247,55,79,0.3), transparent),
            radial-gradient(3px 3px at 60% 40%, rgba(255,107,129,0.2), transparent),
            radial-gradient(2px 2px at 25% 85%, rgba(247,55,79,0.25), transparent),
            radial-gradient(3px 3px at 45% 45%, rgba(255,107,129,0.15), transparent),
            radial-gradient(2px 2px at 80% 70%, rgba(247,55,79,0.2), transparent);
          animation: particleFloat 10s ease-in-out infinite;
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          33% { transform: translateY(-15px) scale(1.05); opacity: 0.8; }
          66% { transform: translateY(-8px) scale(0.95); opacity: 0.6; }
        }
        @keyframes pageEnter3d {
          from { opacity: 0; transform: perspective(1000px) rotateX(5deg) translateY(30px) scale(0.96); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); }
        }
        .page-enter {
          animation: pageEnter3d 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .login-form-container {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.96);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          backdrop-filter: blur(12px);
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          z-index: 1;
        }
        .login-form-container:hover {
          transform: rotateX(1.5deg) rotateY(-1.5deg);
          box-shadow: 0 25px 60px rgba(28,28,28,0.12);
        }
        .login-form-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(60deg, var(--brand-red), #ff6b81, #ffd700, #ff6b81, var(--brand-red));
          background-size: 300% 300%;
          animation: borderGradient 4s ease-in-out infinite;
          z-index: -1;
        }
        .login-form-container::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: rgba(255,255,255,0.96);
          z-index: -1;
        }
        @keyframes borderGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (max-width: 768px) {
          .login-form-section { padding: 24px 16px; }
          .login-page { min-height: auto; flex-direction: column; }
        }
        .brand-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          transform-style: preserve-3d;
        }
        .brand-icon .flame-icon {
          color: var(--brand-red);
          animation: iconFloat3d 3s ease-in-out infinite;
        }
        @keyframes iconFloat3d {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-6px) rotateY(15deg); }
        }
        .login-form-container h2 {
          font-size: 1.8rem;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .login-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
        }
        .login-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-form-container .subtitle a:hover {
          color: var(--brand-red-hover);
        }
        .form-field {
          position: relative;
          margin-bottom: 20px;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .form-field label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.95rem;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          left: 16px;
          font-size: 0.75rem;
          color: var(--brand-red);
          font-weight: 600;
          transform: translateY(0) translateZ(4px);
        }
        .form-field .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          transition: color 0.25s var(--ease-premium), transform 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }
        .form-field.focused .field-icon {
          color: var(--brand-red);
          transform: translateY(-50%) translateZ(2px);
        }
        .form-field input {
          width: 100%;
          padding: 16px 16px 16px 44px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          background: #fff;
        }
        .form-field.focused input {
          border-color: var(--brand-red);
          box-shadow: 0 4px 24px rgba(247,55,79,0.1), 0 0 0 4px rgba(247,55,79,0.08);
          transform: translateZ(3px);
        }
        .login-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          perspective: 500px;
          animation: shake3d 0.5s ease-in-out;
        }
        @keyframes shake3d {
          0%, 100% { transform: translateX(0) rotateX(0deg); }
          15% { transform: translateX(-8px) rotateX(3deg); }
          30% { transform: translateX(8px) rotateX(-3deg); }
          45% { transform: translateX(-6px) rotateX(2deg); }
          60% { transform: translateX(6px) rotateX(-2deg); }
          75% { transform: translateX(-3px) rotateX(1deg); }
          90% { transform: translateX(3px) rotateX(-1deg); }
        }
        .login-submit {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          background-size: 150% 150%;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 500px;
          animation: btnGradientShift 3s ease-in-out infinite;
        }
        @keyframes btnGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .login-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(247,55,79,0.4);
        }
        .login-submit:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(247,55,79,0.2);
        }
        .login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .login-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 16px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .login-divider::before,
        .login-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-light);
        }
        .social-login-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          perspective: 600px;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
        .social-btn:nth-child(1) {
          animation: socialEnter 0.5s 0.15s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .social-btn:nth-child(2) {
          animation: socialEnter 0.5s 0.25s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes socialEnter {
          from { opacity: 0; transform: translateY(10px) translateZ(-10px); }
          to { opacity: 1; transform: translateY(0) translateZ(0); }
        }
        .social-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.03);
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.07);
        }
      `}),(0,V.jsxs)(`div`,{className:`login-page page-enter`,children:[(0,V.jsxs)(`div`,{className:`login-hero`,children:[(0,V.jsx)(`img`,{src:`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,alt:`Food`,loading:`lazy`}),(0,V.jsxs)(`div`,{className:`login-hero-overlay`,children:[(0,V.jsxs)(`h2`,{children:[`Welcome`,(0,V.jsx)(`br`,{}),`Back!`]}),(0,V.jsx)(`p`,{children:`Order your favorite food from the best restaurants in town`}),(0,V.jsxs)(`div`,{className:`hero-flame`,children:[(0,V.jsx)(zo,{size:16,color:`#F7374F`}),` 50% OFF your first order`]})]})]}),(0,V.jsx)(`div`,{className:`login-form-section`,children:(0,V.jsxs)(`div`,{className:`login-form-container`,children:[(0,V.jsxs)(`div`,{className:`brand-icon`,children:[(0,V.jsx)(zo,{size:22,className:`flame-icon`,fill:`#F7374F`}),(0,V.jsx)(`span`,{style:{fontWeight:800,fontSize:`1.1rem`,color:`var(--text-primary)`},children:`ZingBite`})]}),(0,V.jsx)(`h2`,{children:`Login`}),(0,V.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,V.jsx)(F,{to:`/register`,children:`create an account`})]}),i&&(0,V.jsxs)(`div`,{className:`login-error`,children:[(0,V.jsx)(_s,{size:16}),` `,i]}),(0,V.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),a(``),s(!0);let r=await u(e,n);if(s(!1),r.success){let e=r.user,t;t=e.role===`delivery_partner`?`/delivery`:e.role===`restaurant_admin`?`/restaurant-admin`:e.role===`super_admin`?`/admin`:p,d(t)}else a(r.error||`Login failed`)},children:[(0,V.jsxs)(`div`,{className:`form-field ${c===`email`?`focused`:``} ${e?`filled`:``}`,children:[(0,V.jsx)(Jo,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Email address`}),(0,V.jsx)(`input`,{type:`email`,value:e,onChange:e=>t(e.target.value),onFocus:()=>l(`email`),onBlur:()=>l(null),required:!0})]}),(0,V.jsxs)(`div`,{className:`form-field ${c===`password`?`focused`:``} ${n?`filled`:``}`,children:[(0,V.jsx)(Ko,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Password`}),(0,V.jsx)(`input`,{type:`password`,value:n,onChange:e=>r(e.target.value),onFocus:()=>l(`password`),onBlur:()=>l(null),required:!0})]}),(0,V.jsx)(`button`,{type:`submit`,className:`login-submit`,disabled:o,children:o?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:16,className:`spin-icon`}),` Logging in...`]}):`LOGIN`})]}),(0,V.jsx)(`div`,{className:`login-divider`,children:`or continue with`}),(0,V.jsxs)(`div`,{className:`social-login-grid`,children:[(0,V.jsxs)(`button`,{className:`social-btn`,children:[(0,V.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,children:[(0,V.jsx)(`path`,{fill:`#4285F4`,d:`M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z`}),(0,V.jsx)(`path`,{fill:`#34A853`,d:`M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`}),(0,V.jsx)(`path`,{fill:`#FBBC05`,d:`M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`}),(0,V.jsx)(`path`,{fill:`#EA4335`,d:`M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`})]}),`Google`]}),(0,V.jsxs)(`button`,{className:`social-btn`,children:[(0,V.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,children:(0,V.jsx)(`path`,{fill:`#333`,d:`M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.24-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z`})}),`GitHub`]})]})]})})]})]})},ec=()=>{let[e,t]=(0,v.useState)({username:``,email:``,mobile:``,password:``,confirmPassword:``,address:``,role:`customer`,latitude:null,longitude:null,city:``}),[n,r]=(0,v.useState)(`91`),[i,a]=(0,v.useState)(``),[o,s]=(0,v.useState)(!1),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)(typeof window<`u`&&!!window.L),f=(0,v.useRef)(null),p=(0,v.useRef)(null),m=(0,v.useRef)(null),[h,g]=(0,v.useState)(null),[_,y]=(0,v.useState)(!1),b=P(),x=()=>{if(!navigator.geolocation){a(`Geolocation is not supported by your browser or is blocked in insecure contexts.`);return}l(!0),a(``),navigator.geolocation.getCurrentPosition(async e=>{let{latitude:n,longitude:r}=e.coords;try{let e=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${n}&lon=${r}&zoom=18`)).json();if(e){let i=e.display_name||``,a=e.address?.city||e.address?.town||e.address?.village||e.address?.suburb||``;t(e=>({...e,address:i,latitude:n,longitude:r,city:a}))}}catch(e){console.error(`Reverse geocoding error:`,e),a(`Failed to geocode address from coordinates.`)}finally{l(!1)}},e=>{a(`Error retrieving location: `+e.message),l(!1)})};(0,v.useEffect)(()=>{if(window.L){d(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(d(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let S={91:{label:`+91 (IN)`,length:10},1:{label:`+1 (US)`,length:10},44:{label:`+44 (UK)`,length:10},971:{label:`+971 (UAE)`,length:9}},C=n=>t({...e,[n.target.name]:n.target.value});return(0,v.useEffect)(()=>{if(!u||!f.current||!e.latitude)return;let n=window.L;if(!n||p.current)return;let r=e.latitude||12.9716,i=e.longitude||77.5946,a=n.map(f.current).setView([r,i],14);p.current=a,n.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(a);let o=n.divIcon({html:`<div style="font-size:24px;text-align:center;line-height:24px;">📍</div>`,className:`custom-register-marker`,iconSize:[24,24],iconAnchor:[12,12]}),s=n.marker([r,i],{icon:o,draggable:!0}).addTo(a);m.current=s;let c=async(e,n)=>{try{let r=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${n}&zoom=18`)).json();if(r){let i=r.display_name||``,a=r.address?.city||r.address?.town||r.address?.village||r.address?.suburb||``;t(t=>({...t,address:i,latitude:e,longitude:n,city:a}))}}catch(e){console.error(`Reverse geocode error:`,e)}};return s.on(`dragend`,()=>{let e=s.getLatLng();c(e.lat,e.lng)}),a.on(`click`,e=>{s.setLatLng(e.latlng),c(e.latlng.lat,e.latlng.lng)}),()=>{p.current&&(p.current.remove(),p.current=null,m.current=null)}},[u]),(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        .register-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .register-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
          perspective: 1200px;
        }
        @media (min-width: 900px) {
          .register-hero { display: block; }
        }
        .register-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateZ(-15px) scale(1.12);
          animation: heroParallax 14s ease-in-out infinite alternate;
        }
        @keyframes heroParallax {
          0% { transform: translateZ(-15px) scale(1.08) translateX(0); }
          100% { transform: translateZ(-25px) scale(1.18) translateX(-8px); }
        }
        .register-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.35) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
          transform-style: preserve-3d;
        }
        .register-hero-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.15) 0%, transparent 60%);
        }
        .register-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          line-height: 1.1;
          position: relative;
          transform: translateZ(20px);
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .register-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
          position: relative;
          transform: translateZ(10px);
        }
        .hero-flame {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          padding: 8px 20px;
          border-radius: 30px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          position: relative;
        }
        .register-form-section {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 32px 20px;
          background: linear-gradient(180deg, rgba(247,55,79,0.035) 0%, #fff 42%);
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .register-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--brand-red), transparent);
        }
        .register-form-section::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(2px 2px at 12% 25%, rgba(247,55,79,0.3), transparent),
            radial-gradient(2px 2px at 28% 60%, rgba(247,55,79,0.2), transparent),
            radial-gradient(3px 3px at 50% 10%, rgba(247,55,79,0.25), transparent),
            radial-gradient(2px 2px at 75% 75%, rgba(255,107,129,0.25), transparent),
            radial-gradient(2px 2px at 82% 30%, rgba(247,55,79,0.2), transparent),
            radial-gradient(3px 3px at 45% 85%, rgba(255,107,129,0.2), transparent),
            radial-gradient(2px 2px at 18% 45%, rgba(247,55,79,0.15), transparent),
            radial-gradient(2px 2px at 88% 50%, rgba(247,55,79,0.25), transparent),
            radial-gradient(3px 3px at 65% 35%, rgba(255,107,129,0.2), transparent),
            radial-gradient(2px 2px at 55% 70%, rgba(247,55,79,0.2), transparent),
            radial-gradient(3px 3px at 35% 40%, rgba(255,107,129,0.15), transparent),
            radial-gradient(2px 2px at 70% 15%, rgba(247,55,79,0.2), transparent);
          animation: particleFloat 10s ease-in-out infinite;
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          33% { transform: translateY(-12px) scale(1.05); opacity: 0.8; }
          66% { transform: translateY(-6px) scale(0.95); opacity: 0.6; }
        }
        @keyframes pageEnter3d {
          from { opacity: 0; transform: perspective(1000px) rotateX(5deg) translateY(30px) scale(0.96); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); }
        }
        .page-enter {
          animation: pageEnter3d 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .register-form-container {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.96);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          backdrop-filter: blur(12px);
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease;
          box-shadow: 0 18px 50px rgba(28,28,28,0.08);
          z-index: 1;
        }
        .register-form-container:hover {
          transform: rotateX(1.5deg) rotateY(-1.5deg);
          box-shadow: 0 25px 60px rgba(28,28,28,0.12);
        }
        .register-form-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(60deg, var(--brand-red), #ff6b81, #ffd700, #ff6b81, var(--brand-red));
          background-size: 300% 300%;
          animation: borderGradient 4s ease-in-out infinite;
          z-index: -1;
        }
        .register-form-container::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: rgba(255,255,255,0.96);
          z-index: -1;
        }
        @keyframes borderGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fieldEnter {
          from { opacity: 0; transform: translateY(12px) translateZ(-8px); }
          to { opacity: 1; transform: translateY(0) translateZ(0); }
        }
        .register-form-container form > * {
          animation: fieldEnter 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .register-form-container form > *:nth-child(1) { animation-delay: 0.03s; }
        .register-form-container form > *:nth-child(2) { animation-delay: 0.06s; }
        .register-form-container form > *:nth-child(3) { animation-delay: 0.09s; }
        .register-form-container form > *:nth-child(4) { animation-delay: 0.12s; }
        .register-form-container form > *:nth-child(5) { animation-delay: 0.15s; }
        .register-form-container form > *:nth-child(6) { animation-delay: 0.18s; }
        .register-form-container form > *:nth-child(7) { animation-delay: 0.21s; }
        .register-form-container form > *:nth-child(8) { animation-delay: 0.24s; }
        .register-form-container form > *:nth-child(9) { animation-delay: 0.27s; }
        .register-form-container form > *:nth-child(10) { animation-delay: 0.3s; }
        @media (max-width: 768px) {
          .register-form-section { padding: 24px 16px; }
          .register-page { min-height: auto; flex-direction: column; }
        }
        .brand-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          transform-style: preserve-3d;
        }
        .brand-icon svg {
          animation: iconFloat3d 3s ease-in-out infinite;
        }
        @keyframes iconFloat3d {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-6px) rotateY(15deg); }
        }
        .register-form-container h2 {
          font-size: 1.8rem;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .register-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 0.95rem;
        }
        .register-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
        }
        .form-field {
          position: relative;
          margin-bottom: 16px;
          transform-style: preserve-3d;
          perspective: 800px;
        }
        .form-field label {
          position: absolute;
          left: 44px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.95rem;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          left: 16px;
          font-size: 0.72rem;
          color: var(--brand-red);
          font-weight: 600;
          transform: translateY(0) translateZ(4px);
        }
        .form-field .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          transition: color 0.25s var(--ease-premium), transform 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }
        .form-field.focused .field-icon {
          color: var(--brand-red);
          transform: translateY(-50%) translateZ(2px);
        }
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          background: #fff;
          resize: vertical;
        }
        .form-field.focused input,
        .form-field.focused textarea {
          border-color: var(--brand-red);
          box-shadow: 0 4px 24px rgba(247,55,79,0.1), 0 0 0 4px rgba(247,55,79,0.08);
          transform: translateZ(3px);
        }
        .form-field textarea {
          min-height: 70px;
        }
        .form-field.textarea-field label {
          top: 14px;
          transform: none;
          left: 44px;
        }
        .form-field.textarea-field.focused label,
        .form-field.textarea-field.filled label {
          top: -8px;
          left: 16px;
        }
        .form-field.textarea-field .field-icon {
          top: 14px;
          transform: none;
        }
        .phone-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          perspective: 600px;
          transform-style: preserve-3d;
        }
        .phone-prefix-select-wrapper {
          position: relative;
          width: 110px;
          flex-shrink: 0;
          transform-style: preserve-3d;
        }
        .phone-prefix-select {
          width: 100%;
          height: 100%;
          padding: 14px 28px 14px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          appearance: none;
          font-weight: 500;
        }
        .phone-prefix-select:hover {
          border-color: var(--brand-red);
          transform: translateZ(2px);
          box-shadow: 0 4px 16px rgba(247,55,79,0.08);
        }
        .phone-input-group.focused .phone-prefix-select {
          border-color: var(--brand-red);
          box-shadow: 0 4px 20px rgba(247,55,79,0.1), 0 0 0 4px rgba(247,55,79,0.08);
          transform: translateZ(3px);
        }
        .select-chevron {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .phone-input-group.focused .select-chevron {
          color: var(--brand-red);
        }
        .register-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          perspective: 500px;
          animation: shake3d 0.5s ease-in-out;
        }
        @keyframes shake3d {
          0%, 100% { transform: translateX(0) rotateX(0deg); }
          15% { transform: translateX(-8px) rotateX(3deg); }
          30% { transform: translateX(8px) rotateX(-3deg); }
          45% { transform: translateX(-6px) rotateX(2deg); }
          60% { transform: translateX(6px) rotateX(-2deg); }
          75% { transform: translateX(-3px) rotateX(1deg); }
          90% { transform: translateX(3px) rotateX(-1deg); }
        }
        .register-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          background-size: 150% 150%;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 500px;
          animation: btnGradientShift 3s ease-in-out infinite;
        }
        @keyframes btnGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .register-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(247,55,79,0.4);
        }
        .register-submit:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(247,55,79,0.2);
        }
        .register-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .register-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
        }
        .register-submit:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
        .locate-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(247,55,79,0.04);
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
          margin-top: -6px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .locate-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(247,55,79,0.15);
        }
        .locate-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: rgba(247,55,79,0.08);
          transform: scale(0);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease;
        }
        .locate-btn:hover::before {
          transform: scale(1);
          opacity: 1;
        }
        .locate-btn:not(:disabled):active {
          transform: translateY(1px);
        }
        .terms-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          margin-top: 8px;
          user-select: none;
          perspective: 400px;
          transform-style: preserve-3d;
        }
        .terms-checkbox-field:hover {
          transform: translateZ(2px);
        }
        .terms-checkbox-field input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: var(--brand-red);
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .terms-checkbox-field input[type="checkbox"]:hover {
          transform: translateZ(3px) scale(1.1);
        }
        .terms-checkbox-field input[type="checkbox"]:checked {
          transform: translateZ(4px) scale(1.05);
        }
        .terms-checkbox-field label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 1.4;
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .terms-checkbox-field:hover label {
          transform: translateX(2px);
        }
        .terms-checkbox-field label a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: underline;
        }
        .terms-checkbox-field label a:hover {
          color: var(--brand-red-hover);
        }
        .map-container-3d {
          height: 180px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          z-index: 1;
          margin-top: 8px;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
          overflow: hidden;
        }
        .map-container-3d:hover {
          transform: translateZ(5px) rotateX(1deg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
      `}),(0,V.jsxs)(`div`,{className:`register-page page-enter`,children:[(0,V.jsxs)(`div`,{className:`register-hero`,children:[(0,V.jsx)(`img`,{src:`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop`,alt:`Food`,loading:`lazy`}),(0,V.jsxs)(`div`,{className:`register-hero-overlay`,children:[(0,V.jsxs)(`h2`,{children:[`Join`,(0,V.jsx)(`br`,{}),`ZingBite!`]}),(0,V.jsx)(`p`,{children:`Create an account and start ordering from hundreds of restaurants`}),(0,V.jsxs)(`div`,{className:`hero-flame`,children:[(0,V.jsx)(zo,{size:16,color:`#F7374F`}),` Free delivery on your first 5 orders`]})]})]}),(0,V.jsx)(`div`,{className:`register-form-section`,children:(0,V.jsxs)(`div`,{className:`register-form-container`,children:[(0,V.jsxs)(`div`,{className:`brand-icon`,children:[(0,V.jsx)(zo,{size:22,color:`#F7374F`,fill:`#F7374F`}),(0,V.jsx)(`span`,{style:{fontWeight:800,fontSize:`1.1rem`,color:`var(--text-primary)`},children:`ZingBite`})]}),(0,V.jsx)(`h2`,{children:`Sign Up`}),(0,V.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,V.jsx)(F,{to:`/login`,children:`login to your account`})]}),i&&(0,V.jsxs)(`div`,{className:`register-error`,children:[(0,V.jsx)(_s,{size:16}),` `,i]}),(0,V.jsxs)(`form`,{onSubmit:async t=>{if(t.preventDefault(),a(``),e.password!==e.confirmPassword){a(`Passwords do not match`);return}if(!_){a(`You must agree to the Terms & Conditions`);return}let r=S[n].length,i=e.mobile.replace(/\D/g,``);if(i.length!==r){a(`Mobile number for this country must be exactly ${r} digits`);return}s(!0);try{let t={...e,mobile:`${n}${i}`};(await B.post(`/api/register`,t)).data.success&&b(`/login`)}catch(e){a(e.response?.data?.error||`Registration failed`)}finally{s(!1)}},children:[(0,V.jsxs)(`div`,{className:`form-field ${h===`username`?`focused`:``} ${e.username?`filled`:``}`,children:[(0,V.jsx)(ys,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Full Name`}),(0,V.jsx)(`input`,{type:`text`,name:`username`,value:e.username,onChange:C,onFocus:()=>g(`username`),onBlur:()=>g(null),required:!0})]}),(0,V.jsxs)(`div`,{className:`form-field ${h===`email`?`focused`:``} ${e.email?`filled`:``}`,children:[(0,V.jsx)(Jo,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Email address`}),(0,V.jsx)(`input`,{type:`email`,name:`email`,value:e.email,onChange:C,onFocus:()=>g(`email`),onBlur:()=>g(null),required:!0})]}),(0,V.jsxs)(`div`,{className:`phone-input-group ${h===`mobile`?`focused`:``}`,children:[(0,V.jsxs)(`div`,{className:`phone-prefix-select-wrapper`,children:[(0,V.jsxs)(`select`,{value:n,onChange:e=>r(e.target.value),onFocus:()=>g(`mobile`),onBlur:()=>g(null),className:`phone-prefix-select`,children:[(0,V.jsx)(`option`,{value:`91`,children:`+91 (IN)`}),(0,V.jsx)(`option`,{value:`1`,children:`+1 (US)`}),(0,V.jsx)(`option`,{value:`44`,children:`+44 (UK)`}),(0,V.jsx)(`option`,{value:`971`,children:`+971 (UAE)`})]}),(0,V.jsx)(Do,{size:14,className:`select-chevron`})]}),(0,V.jsxs)(`div`,{className:`form-field ${h===`mobile`?`focused`:``} ${e.mobile?`filled`:``}`,style:{flex:1,marginBottom:0},children:[(0,V.jsx)(ts,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Mobile Number`}),(0,V.jsx)(`input`,{type:`tel`,name:`mobile`,value:e.mobile,onChange:C,onFocus:()=>g(`mobile`),onBlur:()=>g(null),required:!0})]})]}),(0,V.jsxs)(`div`,{className:`form-field ${h===`password`?`focused`:``} ${e.password?`filled`:``}`,children:[(0,V.jsx)(Ko,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Password`}),(0,V.jsx)(`input`,{type:`password`,name:`password`,value:e.password,onChange:C,onFocus:()=>g(`password`),onBlur:()=>g(null),required:!0})]}),(0,V.jsxs)(`div`,{className:`form-field ${h===`confirmPassword`?`focused`:``} ${e.confirmPassword?`filled`:``}`,children:[(0,V.jsx)(Ko,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Confirm Password`}),(0,V.jsx)(`input`,{type:`password`,name:`confirmPassword`,value:e.confirmPassword,onChange:C,onFocus:()=>g(`confirmPassword`),onBlur:()=>g(null),required:!0})]}),(0,V.jsxs)(`div`,{className:`form-field textarea-field ${h===`address`?`focused`:``} ${e.address?`filled`:``}`,children:[(0,V.jsx)(Yo,{size:16,className:`field-icon`}),(0,V.jsx)(`label`,{children:`Delivery Address`}),(0,V.jsx)(`textarea`,{name:`address`,value:e.address,onChange:C,onFocus:()=>g(`address`),onBlur:()=>g(null),required:!0})]}),(0,V.jsxs)(`button`,{type:`button`,onClick:x,disabled:c,className:`locate-btn`,children:[(0,V.jsx)(Yo,{size:12,style:{color:`var(--brand-red)`}}),c?`Detecting Location...`:`Auto-Detect Address`]}),u&&(0,V.jsx)(`div`,{ref:f,className:`map-container-3d`}),(0,V.jsxs)(`div`,{className:`terms-checkbox-field`,children:[(0,V.jsx)(`input`,{type:`checkbox`,id:`terms-checkbox`,checked:_,onChange:e=>y(e.target.checked),required:!0}),(0,V.jsxs)(`label`,{htmlFor:`terms-checkbox`,children:[`I agree to the `,(0,V.jsx)(F,{to:`/info/terms`,target:`_blank`,rel:`noopener noreferrer`,children:`Terms & Conditions`})]})]}),(0,V.jsx)(`button`,{type:`submit`,className:`register-submit`,disabled:o,children:o?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Creating...`]}):`CREATE ACCOUNT`})]})]})})]})]})},tc=()=>{let{sectionId:e}=ft(),t=P(),{showAlert:n}=Es(),r=e||`about-us`,{user:i,updateUser:a}=(0,v.useContext)(ro),[o,s]=(0,v.useState)(!1),[c,l]=(0,v.useState)(!1),[u,d]=(0,v.useState)({name:``,email:``,subject:``,message:``}),[f,p]=(0,v.useState)(!1),[m,h]=(0,v.useState)({restName:``,owner:``,email:``,phone:``,city:``,cuisine:``,address:``,licenseNo:``,aadhaarNo:``,gstNo:``}),[g,_]=(0,v.useState)(!1),[y,b]=(0,v.useState)({name:``,city:``,vehicle:`bike`,phone:``}),[x,S]=(0,v.useState)(!1);(0,v.useEffect)(()=>{i&&(h(e=>({...e,email:i.email||``,phone:i.phoneNumber?String(i.phoneNumber):``})),b(e=>({...e,name:i.userName||``,phone:i.phoneNumber?String(i.phoneNumber):``})))},[i]);let[C,w]=(0,v.useState)(typeof window<`u`&&!!window.L),T=(0,v.useRef)(null),ee=(0,v.useRef)(null),E=(0,v.useRef)(null),[D,O]=(0,v.useState)(!1);(0,v.useEffect)(()=>{if(window.L){w(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(w(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let te=async(e,t)=>{O(!0);try{let n=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();if(n){let e=n.display_name||``,t=n.address?.city||n.address?.town||n.address?.village||n.address?.suburb||``;r===`partner-with-us`?h(n=>({...n,address:e,city:t})):r===`ride-with-us`&&b(n=>({...n,city:t||e}))}}catch(e){console.error(`Reverse geocoding error:`,e)}finally{O(!1)}},k=()=>{if(!navigator.geolocation){n(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(e=>{let{latitude:t,longitude:n}=e.coords;ee.current&&(ee.current.setView([t,n],16),E.current&&E.current.setLatLng([t,n])),te(t,n)},e=>{n(`Error retrieving location: `+e.message,`error`)})},ne=(0,v.useCallback)(()=>{if(ee.current){try{ee.current.remove()}catch{}ee.current=null,E.current=null}},[]);(0,v.useEffect)(()=>{let e=r===`partner-with-us`||r===`ride-with-us`;if(!C||!T.current||!e||!i||ee.current)return;let t=window.L;if(!t)return;let n=12.9716,a=77.5946,o=t.map(T.current).setView([n,a],14);ee.current=o,t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(o);let s=t.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-info-marker`,iconSize:[24,24],iconAnchor:[12,12]}),c=t.marker([n,a],{icon:s,draggable:!0}).addTo(o);return E.current=c,c.on(`dragend`,()=>{let e=c.getLatLng();te(e.lat,e.lng)}),o.on(`click`,e=>{c.setLatLng(e.latlng),te(e.latlng.lat,e.latlng.lng)}),!m.address&&!y.city&&te(n,a),ne},[C,r,i,ne]);let[re,ie]=(0,v.useState)(null),[ae,A]=(0,v.useState)(!1),[j,oe]=(0,v.useState)(null);(0,v.useEffect)(()=>{window.scrollTo(0,0)},[r]);let se=[{id:`about-us`,name:`About Us`,icon:Wo,group:`Company`},{id:`careers`,name:`Careers`,icon:Co,group:`Company`},{id:`team`,name:`Team`,icon:bs,group:`Company`},{id:`blog`,name:`Blog`,icon:So,group:`Company`},{id:`help-faq`,name:`Help & FAQ`,icon:jo,group:`Support`},{id:`contact-us`,name:`Contact Us`,icon:Jo,group:`Support`},{id:`partner-with-us`,name:`Partner With Us`,icon:wo,group:`Support`},{id:`ride-with-us`,name:`Ride With Us`,icon:xo,group:`Support`},{id:`terms`,name:`Terms & Conditions`,icon:Ro,group:`Legal`},{id:`privacy`,name:`Privacy Policy`,icon:ss,group:`Legal`},{id:`cookies`,name:`Cookie Policy`,icon:Fo,group:`Legal`},{id:`refunds`,name:`Refund Policy`,icon:rs,group:`Legal`}],ce=async e=>{e.preventDefault();try{await B.post(`/api/contact`,{name:u.name,email:u.email,subject:u.subject,message:u.message}),p(!0),setTimeout(()=>{d({name:``,email:``,subject:``,message:``}),p(!1)},4e3)}catch(e){n(e.response?.data?.error||`Failed to send message.`,`error`)}},le=async e=>{if(e.preventDefault(),!i){n(`You must be logged in to apply as a partner`,`error`);return}if(!m.address||!m.licenseNo||!m.aadhaarNo||!m.gstNo){n(`Please fill out all required onboarding fields, including map location coordinates.`,`warning`);return}s(!0);try{(await B.post(`/api/restaurant-admin`,{action:`submitRestaurantRequest`,name:m.restName,cuisine:m.cuisine||`Multi-Cuisine`,address:m.address,deliveryTime:`30 mins`,imagePath:`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`,licenseNo:m.licenseNo,aadhaarNo:m.aadhaarNo,gstNo:m.gstNo})).data.success&&(_(!0),n(`Partner onboarding application submitted successfully! Pending administrator verification and role elevation.`,`success`))}catch(e){n(e.response?.data?.error||`Failed to submit partner application.`,`error`)}finally{s(!1)}},M=async e=>{if(e.preventDefault(),!i){n(`You must be logged in to apply as a rider`,`error`);return}l(!0);try{let e=(await B.get(`/api/careers?action=jobs`)).data||[],t=e.find(e=>e.title&&e.title.toLowerCase().includes(`rider`));if(!t&&e.length>0&&(t=e[0]),!t)throw Error(`Delivery Rider position not found in careers listing.`);(await B.post(`/api/careers`,{jobId:t.id,name:y.name,email:i.email,phone:y.phone,resumeUrl:`https://zingbite.com/resumes/rider_application.pdf`,city:y.city,vehicle:y.vehicle})).data.success&&(S(!0),n(`Rider job application submitted! Pending admin review.`,`success`))}catch(e){n(e.message||e.response?.data?.error||`Failed to submit rider application.`,`error`)}finally{l(!1)}},N=e=>{oe(j===e?null:e)};return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`style`,{children:`
        /* ===== 3D PREMIUM ANIMATIONS FOR INFOPAGE ===== */

        .info-page-layout {
          display: flex;
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          gap: 32px;
          align-items: start;
        }

        /* ---- 3D Sidebar with Perspective ---- */
        .info-sidebar {
          width: 260px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          padding: 16px;
          position: sticky;
          top: 90px;
          box-shadow: 0 12px 34px rgba(28,28,28,0.06);
          perspective: 800px;
          transform-style: preserve-3d;
        }

        .info-group-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin: 16px 0 8px 8px;
          font-weight: 700;
        }
        .info-group-title:first-child {
          margin-top: 0;
        }

        .info-sidebar-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: relative;
        }
        .info-sidebar-btn:hover {
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
          transform: translateZ(6px) rotateY(-3deg);
          box-shadow: -4px 4px 12px rgba(247,55,79,0.08);
        }
        .info-sidebar-btn.active {
          color: #fff;
          background: var(--brand-red);
          font-weight: 600;
          transform: translateZ(8px) scale(1.02);
          box-shadow: 0 8px 24px rgba(247,55,79,0.3);
        }
        .info-sidebar-btn.active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          pointer-events: none;
        }
        
        /* Mobile Dropdown */
        .info-mobile-selector {
          display: none;
          width: 100%;
          margin-bottom: 16px;
        }
        .info-mobile-select {
          width: 100%;
          padding: 14px 40px 14px 16px;
          font-family: inherit;
          font-size: 1rem;
          border: 1.5px solid rgba(247,55,79,0.12);
          border-radius: var(--radius-sm);
          background: #fff;
          color: var(--text-primary);
          outline: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
        }
        .info-mobile-select:hover {
          border-color: var(--brand-red);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }
        .info-mobile-select:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        }

        /* ---- 3D Main Content with Depth ---- */
        .info-main-content {
          flex: 1;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: 0 12px 34px rgba(28,28,28,0.06);
          min-height: 500px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .info-content-pane {
          animation: contentReveal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }

        @keyframes contentReveal {
          0% { opacity: 0; transform: rotateX(5deg) translateY(16px) translateZ(-12px); }
          100% { opacity: 1; transform: rotateX(0) translateY(0) translateZ(0); }
        }

        .info-content-pane h2 {
          font-size: 2rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .section-desc {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        
        /* ---- Section Hero with 3D badge ---- */
        .section-hero {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          border: 1px solid rgba(247,55,79,0.1);
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(247,55,79,0.03), rgba(247,55,79,0.08));
          transform-style: preserve-3d;
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.75rem;
          background: var(--brand-red);
          color: #fff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 12px;
          transform: translateZ(4px);
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
          animation: badgeFloat 3s ease-in-out infinite;
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateZ(4px) translateY(0); }
          50% { transform: translateZ(8px) translateY(-3px); }
        }
        .section-hero h2 {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }
        
        /* ---- Grid Cards with 3D Depth ---- */
        .content-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }
        .grid-card {
          border: 1px solid rgba(247,55,79,0.1);
          padding: 20px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.9);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .grid-card:hover {
          transform: translateZ(16px) rotateX(-2deg) scale(1.02);
          box-shadow: 0 24px 48px rgba(28,28,28,0.12);
          border-color: rgba(247,55,79,0.2);
        }
        .grid-card h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: var(--brand-red);
        }
        .grid-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        /* ---- Stats Row with 3D Floating ---- */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          background: rgba(247,55,79,0.04);
          padding: 16px;
          text-align: center;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(247,55,79,0.08);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          animation: statFloat 4s ease-in-out infinite;
        }
        .stat-box:nth-child(2) { animation-delay: 0.5s; }
        .stat-box:nth-child(3) { animation-delay: 1s; }
        .stat-box:nth-child(4) { animation-delay: 1.5s; }
        @keyframes statFloat {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-6px) translateZ(8px); }
        }
        .stat-box:hover {
          transform: translateZ(12px) scale(1.05);
          box-shadow: 0 16px 32px rgba(247,55,79,0.12);
        }
        .stat-box h4 {
          font-size: 1.8rem;
          color: var(--brand-red);
          margin-bottom: 4px;
        }
        .stat-box p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* ---- Careers List with 3D Job Cards ---- */
        .jobs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
        .job-card:hover {
          border-color: var(--brand-red);
          transform: translateZ(12px) translateY(-2px);
          box-shadow: 0 16px 32px rgba(28,28,28,0.08);
        }
        .job-main h4 {
          font-size: 1.15rem;
          margin-bottom: 6px;
        }
        .job-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .job-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
        }
        .job-apply-btn {
          padding: 10px 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .job-apply-btn:hover {
          background: var(--brand-red-hover);
          transform: translateZ(8px) scale(1.04);
          box-shadow: 0 8px 20px rgba(247,55,79,0.3);
        }

        /* ---- Team Cards with 3D Tilt ---- */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .team-card {
          text-align: center;
          padding: 24px 16px;
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.94);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          perspective: 600px;
          cursor: default;
        }
        .team-card:hover {
          transform: rotateX(-4deg) rotateY(4deg) translateZ(16px) scale(1.03);
          box-shadow: 0 24px 48px rgba(28,28,28,0.12);
          border-color: rgba(247,55,79,0.25);
        }
        .team-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          font-weight: 700;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }
        .team-card:hover .team-avatar {
          transform: translateZ(20px) scale(1.1);
        }
        .team-card h4 {
          font-size: 1.1rem;
          margin-bottom: 2px;
        }
        .team-role {
          font-size: 0.85rem;
          color: var(--brand-red);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }
        .team-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* ---- Blog Cards with 3D Lift ---- */
        .blog-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .blog-card {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          padding: 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 0;
        }
        .blog-card:hover {
          transform: translateZ(16px) translateY(-4px);
          box-shadow: 0 16px 32px rgba(28,28,28,0.08);
          border-color: transparent;
          background: rgba(255,255,255,0.8);
          border-bottom-color: transparent;
        }
        .blog-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .blog-card h4 {
          font-size: 1.3rem;
          margin: 6px 0 8px;
        }
        .blog-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .blog-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }
        .blog-link:hover {
          transform: translateX(4px);
        }

        /* ---- FAQ Accordion with 3D Rotate Chevron ---- */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          border: 1px solid rgba(247,55,79,0.1);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: rgba(255,255,255,0.94);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
        .faq-item:hover {
          border-color: rgba(247,55,79,0.2);
          box-shadow: 0 8px 24px rgba(28,28,28,0.06);
          transform: translateZ(4px);
        }
        .faq-question {
          width: 100%;
          padding: 18px 20px;
          text-align: left;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s;
        }
        .faq-question:hover {
          background: rgba(247,55,79,0.04);
        }
        .faq-chevron {
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          color: var(--text-muted);
          transform-style: preserve-3d;
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg) translateZ(4px);
          color: var(--brand-red);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          background: rgba(247,55,79,0.035);
        }
        .faq-item.open .faq-answer {
          max-height: 200px;
          border-top: 1px solid var(--border-light);
        }
        .faq-answer p {
          padding: 16px 20px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ---- Contact & Partner Form with 3D Depth ---- */
        .contact-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
        }
        .contact-info h3 {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          align-items: flex-start;
        }
        .contact-row p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-top: 2px;
          line-height: 1.5;
        }
        .benefits-list {
          list-style: none;
        }
        .benefits-list li {
          margin-bottom: 16px;
          padding-left: 24px;
          position: relative;
          line-height: 1.6;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .benefits-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--brand-red);
          font-weight: bold;
        }
        .info-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .form-group input:focus, 
        .form-group textarea:focus {
          border-color: var(--brand-red);
          transform: translateZ(8px) scale(1.01);
          box-shadow: 0 8px 24px rgba(247,55,79,0.12), 0 0 0 3px rgba(247,55,79,0.06);
        }
        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          background: linear-gradient(135deg, var(--brand-red), #ff6b8b, var(--brand-red));
          background-size: 200% 100%;
        }
        .form-submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.05));
          pointer-events: none;
        }
        .form-submit-btn:hover {
          transform: translateZ(12px) translateY(-2px);
          box-shadow: 0 12px 32px rgba(247,55,79,0.35);
          background-position: 100% 0;
        }
        .form-submit-btn:active {
          transform: translateZ(0) translateY(0);
        }
        .form-success {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(96, 178, 70, 0.18);
          border-radius: var(--radius-md);
          background: rgba(96, 178, 70, 0.03);
        }
        .form-success h3 {
          font-size: 1.3rem;
          color: var(--success);
        }
        .form-success p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* ---- Legal Policy with 3D Reveal ---- */
        .legal-text {
          perspective: 800px;
        }
        .legal-text h3 {
          font-size: 1.25rem;
          margin: 24px 0 10px;
          color: var(--text-primary);
          transform-style: preserve-3d;
          animation: legalReveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        .legal-text h3:nth-child(2) { animation-delay: 0.05s; }
        .legal-text h3:nth-child(3) { animation-delay: 0.1s; }
        .legal-text h3:nth-child(4) { animation-delay: 0.15s; }
        .legal-text h3:nth-child(5) { animation-delay: 0.2s; }
        @keyframes legalReveal {
          0% { opacity: 0; transform: translateZ(-12px) rotateX(3deg); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0); }
        }
        .legal-text p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }
        .last-updated {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-style: italic;
        }
        
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1a1a1a;
          color: #fff;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          z-index: 1000;
          animation: slideUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }

        /* ---- Map Container with 3D Floating Border ---- */
        div[ref] > div.leaflet-container {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
        div[ref] > div.leaflet-container:hover {
          transform: translateZ(8px);
          box-shadow: 0 12px 32px rgba(28,28,28,0.15);
        }
        div[ref] {
          border-radius: var(--radius-sm) !important;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        div[ref]:hover {
          border-color: var(--brand-red) !important;
          box-shadow: 0 0 0 2px rgba(247,55,79,0.15), 0 12px 32px rgba(28,28,28,0.1);
        }

        /* ---- Animated Gradient Border on active section ---- */
        .info-content-pane::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b8b, #ff9a9e, var(--brand-red));
          background-size: 300% 100%;
          animation: gradientBorder 4s ease infinite;
          opacity: 0.6;
          z-index: 1;
        }
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ---- Pulsing Chat Trigger ---- */
        .chat-trigger-3d {
          animation: chatPulse 2s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(247,55,79,0.4); transform: scale(1); }
          50% { box-shadow: 0 0 0 12px rgba(247,55,79,0); transform: scale(1.05); }
        }

        /* ---- Premium utilities ---- */
        .premium-btn-shimmer {
          background: linear-gradient(135deg, var(--brand-red), #ff6b8b, var(--brand-red));
          background-size: 200% 100%;
          animation: shimmerSweep 2s ease-in-out infinite;
        }
        @keyframes shimmerSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .info-page-layout {
            flex-direction: column;
            gap: 20px;
          }
          .info-sidebar {
            display: none;
          }
          .info-mobile-selector {
            display: block;
          }
          .info-main-content {
            padding: 24px;
          }
        }
        @media (max-width: 768px) {
          .contact-split {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .stats-row {
            grid-template-columns: 1fr 1fr;
          }
          .content-grid-2 {
            grid-template-columns: 1fr;
          }
          .info-content-pane h2 {
            font-size: 1.6rem;
          }
          .job-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .job-apply-btn {
            width: 100%;
          }
        }

        /* spin animation for loader */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}),(0,V.jsxs)(`div`,{className:`info-page-layout fade-in page-enter`,children:[(0,V.jsx)(`aside`,{className:`info-sidebar`,children:[`Company`,`Support`,`Legal`].map(e=>(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h3`,{className:`info-group-title`,children:e}),se.filter(t=>t.group===e).map(e=>{let n=e.icon;return(0,V.jsxs)(`button`,{className:`info-sidebar-btn ${r===e.id?`active`:``}`,onClick:()=>t(`/info/${e.id}`),children:[(0,V.jsx)(n,{size:16}),e.name]},e.id)})]},e))}),(0,V.jsx)(`div`,{className:`info-mobile-selector`,children:(0,V.jsxs)(`select`,{className:`info-mobile-select`,value:r,onChange:e=>t(`/info/${e.target.value}`),children:[(0,V.jsx)(`optgroup`,{label:`Company`,children:se.filter(e=>e.group===`Company`).map(e=>(0,V.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,V.jsx)(`optgroup`,{label:`Support`,children:se.filter(e=>e.group===`Support`).map(e=>(0,V.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,V.jsx)(`optgroup`,{label:`Legal`,children:se.filter(e=>e.group===`Legal`).map(e=>(0,V.jsx)(`option`,{value:e.id,children:e.name},e.id))})]})}),(0,V.jsx)(`main`,{className:`info-main-content`,children:(()=>{switch(r){case`about-us`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsxs)(`div`,{className:`section-hero`,style:{background:`linear-gradient(135deg, rgba(247,55,79,0.08) 0%, rgba(255,255,255,1) 100%)`},children:[(0,V.jsx)(`span`,{className:`hero-badge`,children:`OUR STORY`}),(0,V.jsx)(`h2`,{children:`Delivering Happiness, One Bite at a Time`}),(0,V.jsx)(`p`,{children:`Founded in 2026, ZingBite is local community-centric food delivery reimagined. We bridge the gap between hungry food lovers and local culinary spots with speed, quality, and care.`})]}),(0,V.jsxs)(`div`,{className:`content-grid-2`,children:[(0,V.jsxs)(`div`,{className:`grid-card`,children:[(0,V.jsx)(`h3`,{children:`Our Mission`}),(0,V.jsx)(`p`,{children:`To empower local restaurants to reach more food lovers while providing a seamless, reliable, and premium food delivery experience for our users.`})]}),(0,V.jsxs)(`div`,{className:`grid-card`,children:[(0,V.jsx)(`h3`,{children:`Our Vision`}),(0,V.jsx)(`p`,{children:`To become the most loved and respected food technology network, recognized for our commitment to quality, community values, and technological innovation.`})]})]}),(0,V.jsxs)(`div`,{className:`stats-row`,children:[(0,V.jsxs)(`div`,{className:`stat-box`,children:[(0,V.jsx)(`h4`,{children:`500+`}),(0,V.jsx)(`p`,{children:`Partner Restaurants`})]}),(0,V.jsxs)(`div`,{className:`stat-box`,children:[(0,V.jsx)(`h4`,{children:`150K+`}),(0,V.jsx)(`p`,{children:`Completed Deliveries`})]}),(0,V.jsxs)(`div`,{className:`stat-box`,children:[(0,V.jsx)(`h4`,{children:`25 Mins`}),(0,V.jsx)(`p`,{children:`Average Delivery Time`})]}),(0,V.jsxs)(`div`,{className:`stat-box`,children:[(0,V.jsx)(`h4`,{children:`4.8 ★`}),(0,V.jsx)(`p`,{children:`App Rating`})]})]})]});case`careers`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Careers at ZingBite`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`We are always looking for passionate, driven, and creative individuals to join our team and build the future of food tech.`}),(0,V.jsx)(`div`,{className:`jobs-list`,children:[{id:1,title:`Senior Frontend Engineer (React)`,dept:`Engineering`,loc:`Remote / Bangalore`,salary:`₹18L - ₹24L`},{id:2,title:`Product Designer (UX/UI)`,dept:`Design`,loc:`Hybrid (Delhi/NCR)`,salary:`₹12L - ₹16L`},{id:3,title:`Logistics Operations Lead`,dept:`Operations`,loc:`On-site (Mumbai)`,salary:`₹8L - ₹11L`},{id:4,title:`Customer Support Executive`,dept:`Customer Care`,loc:`Remote`,salary:`₹4L - ₹6L`}].map(e=>(0,V.jsxs)(`div`,{className:`job-card`,children:[(0,V.jsxs)(`div`,{className:`job-main`,children:[(0,V.jsx)(`h4`,{children:e.title}),(0,V.jsxs)(`div`,{className:`job-meta`,children:[(0,V.jsx)(`span`,{children:e.dept}),(0,V.jsx)(`span`,{className:`dot`}),(0,V.jsx)(`span`,{children:e.loc}),(0,V.jsx)(`span`,{className:`dot`}),(0,V.jsx)(`span`,{children:e.salary})]})]}),(0,V.jsx)(`button`,{onClick:()=>{ie(e.title),n(`Please visit our Career Portal to apply for this position.`,`info`),setTimeout(()=>ie(null),3e3)},className:`job-apply-btn`,children:re===e.title?`Visit Career Portal`:`Apply Now`})]},e.id))}),re&&(0,V.jsxs)(`div`,{className:`toast-notification`,children:[(0,V.jsx)(ko,{size:16}),` Applied for `,(0,V.jsx)(`strong`,{children:re}),` position!`]})]});case`team`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Meet Our Leadership`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`The dedicated dreamers and makers steering ZingBite towards new culinary heights.`}),(0,V.jsx)(`div`,{className:`team-grid`,children:[{name:`Sreenivas Dasari`,role:`Co-Founder & CEO`,desc:`Tech visionary and food enthusiast with 10+ years of tech-firm scaling experience.`},{name:`Priya Sharma`,role:`Chief Technology Officer`,desc:`Former staff engineer at major delivery platforms, leading our high-performance React-Java stack.`},{name:`Vikram Malhotra`,role:`Head of Culinary Partnerships`,desc:`Culinary arts graduate dedicated to bringing the best local gems onto the ZingBite grid.`},{name:`Amit Patel`,role:`VP of Logistics & Operations`,desc:`Operations mastermind ensuring our delivery fleet is optimized, secure, and fast.`}].map((e,t)=>(0,V.jsxs)(`div`,{className:`team-card`,"data-tilt":`true`,children:[(0,V.jsx)(`div`,{className:`team-avatar`,children:e.name.split(` `).map(e=>e[0]).join(``)}),(0,V.jsx)(`h4`,{children:e.name}),(0,V.jsx)(`span`,{className:`team-role`,children:e.role}),(0,V.jsx)(`p`,{children:e.desc})]},t))})]});case`blog`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`ZingBite Blog`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`Stories, recipes, product insights, and news from our food ecosystem.`}),(0,V.jsx)(`div`,{className:`blog-grid`,children:[{title:`Top 10 Food Trends Redefining Delivery in 2026`,read:`5 min read`,date:`June 01, 2026`,desc:`Explore the culinary landscape of 2026, from eco-packaging to regional gourmet selections.`},{title:`Behind the Technology: Scaling Real-time API Tracking`,read:`8 min read`,date:`May 28, 2026`,desc:`An engineering deep-dive on how we handle sub-second rider location updates using WebSocket connections.`},{title:`Savoring Sustainability: Reducing Single-Use Plastic`,read:`4 min read`,date:`May 15, 2026`,desc:`How ZingBite partnered with 100+ vendors to pioneer compostable packaging options in local regions.`}].map((e,t)=>(0,V.jsxs)(`article`,{className:`blog-card`,children:[(0,V.jsxs)(`span`,{className:`blog-meta`,children:[e.date,` • `,e.read]}),(0,V.jsx)(`h4`,{children:e.title}),(0,V.jsx)(`p`,{children:e.desc}),(0,V.jsxs)(`a`,{href:`#read`,onClick:e=>{e.preventDefault(),n(`Blog reading functionality coming soon!`,`info`)},className:`blog-link`,children:[`Read Article `,(0,V.jsx)(Lo,{size:14})]})]},t))})]});case`help-faq`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Help & Support`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`Frequently Asked Questions. If you can't find your answer here, please contact customer support.`}),(0,V.jsx)(`div`,{className:`faq-list`,children:[{q:`How do I place an order on ZingBite?`,a:`To order, search for a restaurant on the Home page, browse their menu, select your food, add them to your cart, click Proceed to Pay, enter your address, and complete payment using your credit/debit card, UPI, or cash.`},{q:`What payment methods do you support?`,a:`We support major Credit and Debit cards (Visa/Mastercard/RuPay), UPI (GPay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD) for selected restaurants.`},{q:`How can I track my delivery in real-time?`,a:`Once your order is confirmed, you will receive real-time status updates on the dashboard from 'Order Accepted' to 'Out for Delivery' with rider tracking.`},{q:`What is your cancellation policy?`,a:`You can cancel your order within 60 seconds of placing it. After the restaurant accepts your order, cancellations are subject to a fee to compensate for prepared food and rider resources.`},{q:`How do I update my profile details?`,a:`Log into your account, click on your profile/user icon in the Header, and update your delivery address or contact number.`}].map((e,t)=>(0,V.jsxs)(`div`,{className:`faq-item ${j===t?`open`:``}`,children:[(0,V.jsxs)(`button`,{onClick:()=>N(t),className:`faq-question`,children:[(0,V.jsx)(`span`,{children:e.q}),(0,V.jsx)(Do,{size:18,className:`faq-chevron`})]}),(0,V.jsx)(`div`,{className:`faq-answer`,children:(0,V.jsx)(`p`,{children:e.a})})]},t))})]});case`contact-us`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Contact Us`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`Have a question, feedback, or need help? Reach out to us, and we will get back to you as soon as possible.`}),(0,V.jsxs)(`div`,{className:`contact-split`,children:[(0,V.jsxs)(`div`,{className:`contact-info`,children:[(0,V.jsx)(`h3`,{children:`Contact Information`}),(0,V.jsxs)(`div`,{className:`contact-row`,children:[(0,V.jsx)(Yo,{size:18,color:`var(--brand-red)`}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:`Headquarters`}),(0,V.jsx)(`p`,{children:`12th Floor, Tech Park Towers, Indiranagar, Bangalore, Karnataka - 560038`})]})]}),(0,V.jsxs)(`div`,{className:`contact-row`,children:[(0,V.jsx)(Jo,{size:18,color:`var(--brand-red)`}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:`Support Email`}),(0,V.jsx)(`p`,{children:`support@zingbite.com`})]})]}),(0,V.jsxs)(`div`,{className:`contact-row`,children:[(0,V.jsx)(ts,{size:18,color:`var(--brand-red)`}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:`Helpline`}),(0,V.jsx)(`p`,{children:`+91 80 4455 6677 (9 AM - 11 PM)`})]})]})]}),(0,V.jsx)(`div`,{className:`contact-form-container`,children:f?(0,V.jsxs)(`div`,{className:`form-success`,children:[(0,V.jsx)(ko,{size:32,color:`var(--success)`}),(0,V.jsx)(`h3`,{children:`Message Sent!`}),(0,V.jsx)(`p`,{children:`Thank you for reaching out. A support agent will contact you shortly.`})]}):(0,V.jsxs)(`form`,{onSubmit:ce,className:`info-form`,children:[(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Your Name`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:u.name,onChange:e=>d({...u,name:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Email Address`}),(0,V.jsx)(`input`,{type:`email`,required:!0,value:u.email,onChange:e=>d({...u,email:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Subject`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:u.subject,onChange:e=>d({...u,subject:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Message`}),(0,V.jsx)(`textarea`,{rows:4,required:!0,value:u.message,onChange:e=>d({...u,message:e.target.value})})]}),(0,V.jsxs)(`button`,{type:`submit`,className:`form-submit-btn`,children:[(0,V.jsx)(as,{size:16}),` SEND MESSAGE`]})]})})]})]});case`partner-with-us`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Partner With Us`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`Join ZingBite as a restaurant partner to reach thousands of local customers, streamline operations, and scale your brand.`}),(0,V.jsxs)(`div`,{className:`contact-split`,children:[(0,V.jsxs)(`div`,{className:`contact-info`,children:[(0,V.jsx)(`h3`,{children:`Why Partner with Us?`}),(0,V.jsxs)(`ul`,{className:`benefits-list`,children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Increase Sales:`}),` Tap into our wide network of active diners looking for delicious meals.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Dedicated Logistics:`}),` Focus on preparing culinary delicacies while we handle the delivery.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Growth Insights:`}),` Gain access to custom dashboards to analyze sales, metrics, and trends.`]})]})]}),(0,V.jsx)(`div`,{className:`contact-form-container`,children:i?g?(0,V.jsxs)(`div`,{className:`form-success`,style:{textAlign:`center`,padding:`32px 20px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-md)`},children:[(0,V.jsx)(ko,{size:48,style:{color:`var(--success)`,margin:`0 auto 16px`}}),(0,V.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Application Submitted!`}),(0,V.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,lineHeight:1.5},children:`Our merchant team will review your application and reach out within 2 business days.`}),(0,V.jsx)(F,{to:`/restaurant-admin`,className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`12px 28px`,fontWeight:700},children:`Go to Onboarding Dashboard`})]}):(0,V.jsxs)(`form`,{onSubmit:le,className:`info-form`,children:[(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Restaurant Name`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:m.restName,onChange:e=>h({...m,restName:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Owner Name`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:m.owner,onChange:e=>h({...m,owner:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Cuisine Type`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g., Chinese, Italian, Indian`,value:m.cuisine,onChange:e=>h({...m,cuisine:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Email Address`}),(0,V.jsx)(`input`,{type:`email`,required:!0,value:m.email,onChange:e=>h({...m,email:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Mobile Number`}),(0,V.jsx)(`input`,{type:`tel`,required:!0,value:m.phone,onChange:e=>h({...m,phone:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-row-3`,style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`10px`},children:[(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`License No`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`FSSAI License`,value:m.licenseNo,onChange:e=>h({...m,licenseNo:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Aadhaar No`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`Owner Aadhaar`,value:m.aadhaarNo,onChange:e=>h({...m,aadhaarNo:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`GST Number`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`GSTIN`,value:m.gstNo,onChange:e=>h({...m,gstNo:e.target.value})})]})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Restaurant Address`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`Select location or enter manually`,value:m.address,onChange:e=>h({...m,address:e.target.value})})]}),(0,V.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`16px`},children:[(0,V.jsxs)(`button`,{type:`button`,onClick:k,style:{alignSelf:`flex-start`,padding:`8px 14px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,V.jsx)(Yo,{size:12}),` `,D?`Detecting Location...`:`Auto-Detect Restaurant Location`]}),(0,V.jsx)(`div`,{ref:T,style:{height:`180px`,borderRadius:`var(--radius-sm)`,border:`1px solid var(--border-medium)`,zIndex:1}})]}),(0,V.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:o,children:o?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Registering...`]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(wo,{size:16}),` REGISTER RESTAURANT`]})})]}):(0,V.jsxs)(`div`,{className:`login-prompt-card`,style:{padding:`32px 20px`,border:`2px dashed var(--border-medium)`,borderRadius:`var(--radius-md)`,textAlign:`center`,background:`var(--bg-surface)`},children:[(0,V.jsx)(Oo,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,V.jsx)(`h4`,{style:{fontSize:`1.15rem`,fontWeight:700,marginBottom:`8px`,color:`var(--text-primary)`},children:`Login Required`}),(0,V.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`20px`,lineHeight:`1.5`},children:`Please log in with your ZingBite account to register a restaurant.`}),(0,V.jsx)(F,{to:`/login?redirect=/info/partner-with-us`,className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`10px 24px`,fontWeight:600},children:`Log In to Apply`})]})})]})]});case`ride-with-us`:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Ride With Us`}),(0,V.jsx)(`p`,{className:`section-desc`,children:`Join our fleet as a delivery partner. Get flexible work hours, attractive weekly payouts, and insurance coverage.`}),(0,V.jsxs)(`div`,{className:`contact-split`,children:[(0,V.jsxs)(`div`,{className:`contact-info`,children:[(0,V.jsx)(`h3`,{children:`Delivery Partner Perks`}),(0,V.jsxs)(`ul`,{className:`benefits-list`,children:[(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Weekly Earnings:`}),` Direct deposit of your delivery earnings plus tips into your bank account.`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Flexible Schedule:`}),` Choose your own shifts (Part-time, Full-time, Weekends only).`]}),(0,V.jsxs)(`li`,{children:[(0,V.jsx)(`strong`,{children:`Insurance Cover:`}),` Group medical and accident cover for active delivery partners.`]})]})]}),(0,V.jsx)(`div`,{className:`contact-form-container`,children:i?x?(0,V.jsxs)(`div`,{className:`form-success`,style:{textAlign:`center`,padding:`32px 20px`,background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-md)`},children:[(0,V.jsx)(ko,{size:48,style:{color:`var(--success)`,margin:`0 auto 16px`}}),(0,V.jsx)(`h3`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Rider Registration Initiated!`}),(0,V.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,lineHeight:1.5},children:`We've sent onboarding details to your phone number. You can track your application status in the Career Portal.`}),(0,V.jsx)(F,{to:`/careers`,className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`12px 28px`,fontWeight:700},children:`View Application Status`})]}):(0,V.jsxs)(`form`,{onSubmit:M,className:`info-form`,children:[(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Full Name`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:y.name,onChange:e=>b({...y,name:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Mobile Number`}),(0,V.jsx)(`input`,{type:`tel`,required:!0,value:y.phone,onChange:e=>b({...y,phone:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`City / Hub Area`}),(0,V.jsx)(`input`,{type:`text`,required:!0,placeholder:`Select location or enter manually`,value:y.city,onChange:e=>b({...y,city:e.target.value})})]}),(0,V.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`8px`,marginBottom:`16px`},children:[(0,V.jsxs)(`button`,{type:`button`,onClick:k,style:{alignSelf:`flex-start`,padding:`8px 14px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,V.jsx)(Yo,{size:12}),` `,D?`Detecting Location...`:`Auto-Detect City Area`]}),(0,V.jsx)(`div`,{ref:T,style:{height:`150px`,borderRadius:`var(--radius-sm)`,border:`1px solid var(--border-medium)`,zIndex:1}})]}),(0,V.jsxs)(`div`,{className:`form-group`,children:[(0,V.jsx)(`label`,{children:`Vehicle Type`}),(0,V.jsxs)(`select`,{value:y.vehicle,onChange:e=>b({...y,vehicle:e.target.value}),className:`premium-select`,style:{width:`100%`},children:[(0,V.jsx)(`option`,{value:`bike`,children:`Bicycle / Electric Cycle`}),(0,V.jsx)(`option`,{value:`motorcycle`,children:`Motorcycle / Scooter`}),(0,V.jsx)(`option`,{value:`walk`,children:`On Foot (Selected zones)`})]})]}),(0,V.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:c,children:c?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Applying...`]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(xo,{size:16}),` APPLY AS RIDER`]})})]}):(0,V.jsxs)(`div`,{className:`login-prompt-card`,style:{padding:`32px 20px`,border:`2px dashed var(--border-medium)`,borderRadius:`var(--radius-md)`,textAlign:`center`,background:`var(--bg-surface)`},children:[(0,V.jsx)(Oo,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,V.jsx)(`h4`,{style:{fontSize:`1.15rem`,fontWeight:700,marginBottom:`8px`,color:`var(--text-primary)`},children:`Login Required`}),(0,V.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`20px`,lineHeight:`1.5`},children:`Please log in with your ZingBite account to register as a delivery rider.`}),(0,V.jsx)(F,{to:`/login?redirect=/info/ride-with-us`,className:`form-submit-btn`,style:{display:`inline-block`,textDecoration:`none`,textAlign:`center`,width:`auto`,padding:`10px 24px`,fontWeight:600},children:`Log In to Apply`})]})})]})]});case`terms`:return(0,V.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,V.jsx)(`h2`,{children:`Terms & Conditions`}),(0,V.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,V.jsx)(`h3`,{children:`1. Introduction`}),(0,V.jsx)(`p`,{children:`Welcome to ZingBite. These Terms and Conditions govern your use of our website, mobile application, and food delivery services. By accessing or using our services, you agree to comply with and be bound by these terms.`}),(0,V.jsx)(`h3`,{children:`2. User Accounts`}),(0,V.jsx)(`p`,{children:`To place an order, you must register and create a secure user account. You are solely responsible for maintaining the confidentiality of your credentials and password. Any actions performed under your account remain your responsibility.`}),(0,V.jsx)(`h3`,{children:`3. Placing Orders & Contract`}),(0,V.jsx)(`p`,{children:`All food orders placed through our platform are subject to availability and acceptance by the respective restaurant. The contract for the supply of food is formed directly between you and the restaurant when your order is accepted.`}),(0,V.jsx)(`h3`,{children:`4. Pricing & Payments`}),(0,V.jsx)(`p`,{children:`All prices displayed include menu costs set by restaurants. Delivery fees, taxes, and service charges are calculated at checkout. Payments are processed through secure gateways like Razorpay.`}),(0,V.jsx)(`h3`,{children:`5. Limitation of Liability`}),(0,V.jsx)(`p`,{children:`ZingBite acts as a delivery facilitator and is not responsible for the quality, safety, portion size, or ingredients of food prepared by partner restaurants.`})]});case`privacy`:return(0,V.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,V.jsx)(`h2`,{children:`Privacy Policy`}),(0,V.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,V.jsx)(`h3`,{children:`1. Information We Collect`}),(0,V.jsx)(`p`,{children:`We collect personal information that you provide directly, including name, email address, phone number, and delivery address. We also collect automated usage data and GPS location coordinates when the app is active to facilitate real-time tracking.`}),(0,V.jsx)(`h3`,{children:`2. How We Use Your Data`}),(0,V.jsx)(`p`,{children:`Your details are used to process orders, communicate status, route delivery partners, and improve customer support experiences. We do not sell or trade your data to third-party marketing companies.`}),(0,V.jsx)(`h3`,{children:`3. Sharing of Information`}),(0,V.jsx)(`p`,{children:`We share necessary information (name, address, telephone) with partner restaurants and delivery riders to fulfill your orders. We may disclose data when legally required by public authorities.`}),(0,V.jsx)(`h3`,{children:`4. Data Security`}),(0,V.jsx)(`p`,{children:`We use standard encryption techniques (SSL/TLS) and secure databases to protect your personal details from unauthorized access, modification, or leakage.`})]});case`cookies`:return(0,V.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,V.jsx)(`h2`,{children:`Cookie Policy`}),(0,V.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,V.jsx)(`h3`,{children:`1. What Are Cookies?`}),(0,V.jsx)(`p`,{children:`Cookies are small text files stored on your browser when you visit our website. They help us remember login states, keep track of items in your shopping cart, and monitor anonymous site analytics.`}),(0,V.jsx)(`h3`,{children:`2. Types of Cookies We Use`}),(0,V.jsx)(`div`,{style:{overflowX:`auto`,margin:`20px 0`},children:(0,V.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.9rem`},children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{style:{background:`var(--bg-surface)`,borderBottom:`2px solid var(--border-medium)`},children:[(0,V.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Category`}),(0,V.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Purpose`})]})}),(0,V.jsxs)(`tbody`,{children:[(0,V.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,V.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Essential`}),(0,V.jsx)(`td`,{style:{padding:`12px`},children:`Maintaining your logged-in session, authentication, and cart selections.`})]}),(0,V.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,V.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Analytics`}),(0,V.jsx)(`td`,{style:{padding:`12px`},children:`Tracking page views, click behaviors, and application speed metrics.`})]}),(0,V.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,V.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Marketing`}),(0,V.jsx)(`td`,{style:{padding:`12px`},children:`Remembering preferences to display tailored restaurant suggestions.`})]})]})]})}),(0,V.jsx)(`h3`,{children:`3. Managing Cookies`}),(0,V.jsx)(`p`,{children:`You can adjust your browser settings to refuse or delete cookies. However, please note that disabling essential cookies will prevent the cart and account checkout system from working correctly.`})]});case`refunds`:return(0,V.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,V.jsx)(`h2`,{children:`Refund & Cancellation Policy`}),(0,V.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,V.jsx)(`h3`,{children:`1. Order Cancellations`}),(0,V.jsx)(`p`,{children:`Users can cancel their order free of charge within 60 seconds of submitting it. Once the restaurant begins cooking (Order Accepted status), cancellation requests are not eligible for a refund.`}),(0,V.jsx)(`h3`,{children:`2. Refund Eligibility`}),(0,V.jsx)(`p`,{children:`Refunds are initiated in full under the following circumstances:`}),(0,V.jsxs)(`ul`,{style:{margin:`12px 20px`,lineHeight:`1.7`},children:[(0,V.jsx)(`li`,{children:`The ordered restaurant item is out of stock (not available).`}),(0,V.jsx)(`li`,{children:`The restaurant cancels the order due to operational issues.`}),(0,V.jsx)(`li`,{children:`Delivery is delayed by more than 60 minutes beyond estimated delivery due to fleet error.`})]}),(0,V.jsx)(`h3`,{children:`3. Refund Timelines`}),(0,V.jsx)(`p`,{children:`Approved refunds are processed back to the original source of payment (Razorpay card/UPI) within 5 to 7 business days, depending on bank processing policies.`})]});default:return(0,V.jsxs)(`div`,{className:`info-content-pane`,children:[(0,V.jsx)(`h2`,{children:`Section Not Found`}),(0,V.jsx)(`p`,{children:`The section you are looking for does not exist. Please use the sidebar to choose a valid section.`})]})}})()})]})]})},nc=5,rc=()=>{let{user:e,logout:t,updateUser:n,loading:r}=(0,v.useContext)(ro),{addToCart:i}=lo(),a=P(),{showAlert:o}=Es(),{darkMode:s,toggleTheme:c}=ks(),[l,u]=(0,v.useState)(`orders`),[d,f]=(0,v.useState)(!1),[p,m]=(0,v.useState)(!1),[h,g]=(0,v.useState)(!1),[_,y]=(0,v.useState)({username:e?.userName||e?.username||`Guest User`,email:e?.email||`guest@zingbite.com`,mobile:String(e?.phoneNumber||e?.mobile||``),address:e?.address||`123 Main Street`,latitude:null,longitude:null,city:``}),[b,x]=(0,v.useState)(()=>{let t=localStorage.getItem(`addresses_${e?.email}`);return t?JSON.parse(t):[{id:1,type:`Home`,address:e?.address||`123 Main Street, Indiranagar, Bangalore`},{id:2,type:`Work`,address:`456 Tech Park, Whitefield, Bangalore`}]}),[S,C]=(0,v.useState)(`Other`),[w,T]=(0,v.useState)(``),[ee,E]=(0,v.useState)(null),[D,O]=(0,v.useState)(null),[te,k]=(0,v.useState)(``),[ne,re]=(0,v.useState)(!1),[ie,ae]=(0,v.useState)(!1),[A,j]=(0,v.useState)({action:``,loading:!1}),[oe,se]=(0,v.useState)([]),[ce,le]=(0,v.useState)(!0),[M,N]=(0,v.useState)(nc),ue=(0,v.useRef)(null),[de,fe]=(0,v.useState)(typeof window<`u`&&!!window.L),pe=(0,v.useRef)(null),me=(0,v.useRef)(null),he=(0,v.useRef)(null),[ge,_e]=(0,v.useState)(!1);(0,v.useEffect)(()=>{if(window.L){fe(!0);return}let e=document.querySelector(`link[href*="leaflet.css"]`);e||(e=document.createElement(`link`),e.rel=`stylesheet`,e.href=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`,document.head.appendChild(e));let t=document.querySelector(`script[src*="leaflet.js"]`);t||(t=document.createElement(`script`),t.src=`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`,t.async=!0,t.onload=()=>{let e=setInterval(()=>{window.L&&(fe(!0),clearInterval(e))},50)},document.body.appendChild(t))},[]);let ve=async(e,t,n)=>{_e(!0);try{let r=await(await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=18`)).json();if(r&&r.display_name){let i=r.address?.city||r.address?.town||r.address?.village||r.address?.county||``;n===`profile`?y(n=>({...n,address:r.display_name,latitude:e,longitude:t,city:i})):(T(r.display_name),E(e),O(t),k(i))}}catch(e){console.error(`Reverse geocoding error:`,e)}finally{_e(!1)}},ye=e=>{if(!navigator.geolocation){o(`Geolocation is not supported by your browser.`,`error`);return}navigator.geolocation.getCurrentPosition(t=>{let{latitude:n,longitude:r}=t.coords;me.current&&(me.current.setView([n,r],16),he.current&&he.current.setLatLng([n,r])),ve(n,r,e)},e=>{o(`Error retrieving location: `+e.message,`error`)})};(0,v.useEffect)(()=>{let e=l===`details`&&d||l===`addresses`&&ne;if(!de||!pe.current||!e){me.current&&(me.current.remove(),me.current=null,he.current=null);return}if(me.current)return;let t=window.L;if(!t)return;let n=_.latitude??12.9716,r=_.longitude??77.5946,i=t.map(pe.current).setView([n,r],14);me.current=i,t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap contributors`}).addTo(i);let a=t.divIcon({html:`<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,className:`custom-profile-marker`,iconSize:[24,24],iconAnchor:[12,12]}),o=t.marker([n,r],{icon:a,draggable:!0}).addTo(i);he.current=o;let s=l===`details`?`profile`:`newAddress`;return o.on(`dragend`,()=>{let e=o.getLatLng();ve(e.lat,e.lng,s)}),i.on(`click`,e=>{o.setLatLng(e.latlng),ve(e.latlng.lat,e.latlng.lng,s)}),ve(defaultLat,defaultLng,s),()=>{me.current&&(me.current.remove(),me.current=null,he.current=null)}},[de,l,d,ne]),(0,v.useEffect)(()=>{e&&y({username:e.userName||e.username||`Guest User`,email:e.email||`guest@zingbite.com`,mobile:String(e.phoneNumber||e.mobile||``),address:e.address||`123 Main Street`})},[e]),(0,v.useEffect)(()=>{e?.email&&localStorage.setItem(`addresses_${e.email}`,JSON.stringify(b))},[b,e?.email]),(0,v.useEffect)(()=>{let t=async(e=!1)=>{try{se((await B.get(`/api/profile?action=orders`)).data)}catch(e){console.error(`Error fetching past orders:`,e)}finally{e||le(!1)}};if(e){t(!1);let e=window.location.pathname.startsWith(`/zingbite`)?`/zingbite/api/stream?topic=user_orders`:`/api/stream?topic=user_orders`,n=new EventSource(e);return n.onmessage=e=>{try{console.log(`[ZingBite SSE] Received real-time user profile orders update`),t(!0)}catch(e){console.error(`[ZingBite SSE] Error on message:`,e)}},n.onerror=e=>{console.error(`[ZingBite SSE] EventSource connection error:`,e)},()=>{n.close()}}},[e]);let be=e=>{e!==l&&(g(!0),setTimeout(()=>{u(e),setTimeout(()=>g(!1),50)},200))},xe=async e=>{e.preventDefault(),m(!0);try{let e=await B.post(`/api/profile`,{action:`update`,username:_.username,mobile:_.mobile,address:_.address,..._.latitude!=null&&{latitude:_.latitude},..._.longitude!=null&&{longitude:_.longitude},..._.city&&{city:_.city}});e.data.success&&(n(e.data.user),f(!1))}catch(e){o(e.response?.data?.error||`Failed to update profile`,`error`)}finally{m(!1)}},Se=e=>{e.preventDefault(),w&&(x([...b,{id:Date.now(),type:S,address:w,latitude:ee,longitude:D,city:te}]),T(``),E(null),O(null),k(``),re(!1))},Ce=e=>{x(b.filter(t=>t.id!==e))},we=async e=>{ae(!0);try{for(let t of e)await i(t.id,t.qty);a(`/cart`)}catch(e){console.error(e),o(`Error during reordering. Please try again.`,`error`)}finally{ae(!1)}},Te=oe.slice(0,M),Ee=M<oe.length;oe.filter(e=>(e.status||``).toLowerCase()===`delivered`).length;let De=async e=>{j({action:e,loading:!0});try{if(e===`restaurant_admin`){a(`/info/partner-with-us`);return}else if(e===`delivery_partner`){a(`/info/ride-with-us`);return}(await B.post(`/api/profile`,{action:`upgradeRole`,role:e})).data.success&&o(`Role upgrade request submitted for admin review.`,`success`)}catch(e){o(e.response?.data?.error||`Failed to submit upgrade request.`,`error`)}finally{j({action:``,loading:!1})}};return r?(0,V.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,flex:1,minHeight:`400px`},children:(0,V.jsx)(Go,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):e?(0,V.jsxs)(`div`,{className:`page-enter`,children:[(0,V.jsx)(`style`,{children:`
        .profile-wrap {
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
          perspective: 1200px;
        }

        .profile-cover {
          background: linear-gradient(135deg, var(--brand-red) 0%, #d42d42 100%);
          border-radius: 0 0 28px 28px;
          padding: 32px 32px 24px;
          margin: 0 -20px;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          animation: cover3DEnter 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes cover3DEnter {
          0% { opacity: 0; transform: translateZ(-80px) rotateX(3deg) scale(0.95); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0) scale(1); }
        }
        .profile-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .profile-cover::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          animation: coverGlow 6s ease-in-out infinite;
        }
        @keyframes coverGlow {
          0%, 100% { transform: translateZ(0) scale(1); opacity: 0.5; }
          50% { transform: translateZ(20px) scale(1.15); opacity: 0.8; }
        }
        .profile-cover-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          color: #fff;
          transform-style: preserve-3d;
        }
        .cover-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 3px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
          transform-style: preserve-3d;
          animation: avatar3DFloat 5s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cover-avatar:hover {
          transform: translateZ(12px) scale(1.05);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }
        @keyframes avatar3DFloat {
          0%, 100% { transform: translateZ(0) translateY(0); box-shadow: 0 0 0 rgba(255,255,255,0); }
          50% { transform: translateZ(8px) translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.1); }
        }
        .cover-info h1 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 4px;
          animation: slideIn3D 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
        }
        .cover-info p {
          opacity: 0.85;
          font-size: 0.9rem;
          margin: 0;
          animation: slideIn3D 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.3s both;
        }
        .cover-info .cover-email {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          opacity: 0.75;
          margin-top: 4px;
          animation: slideIn3D 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s both;
        }
        @keyframes slideIn3D {
          0% { opacity: 0; transform: translateZ(-20px) translateX(-10px); }
          100% { opacity: 1; transform: translateZ(0) translateX(0); }
        }

        .profile-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 28px;
          margin-top: -16px;
          position: relative;
          z-index: 2;
          align-items: start;
        }

        .profile-nav {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          overflow: hidden;
          padding: 8px;
          transform-style: preserve-3d;
          animation: nav3DEnter 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.1s both;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        @keyframes nav3DEnter {
          0% { opacity: 0; transform: translateZ(-40px) rotateY(3deg); }
          100% { opacity: 1; transform: translateZ(0) rotateY(0); }
        }
        .profile-nav:hover {
          transform: translateZ(4px) rotateY(-1deg);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .profile-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 14px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.25s var(--ease-premium);
          text-align: left;
          position: relative;
          transform-style: preserve-3d;
        }
        .profile-nav-item svg {
          flex-shrink: 0;
          transition: transform 0.25s var(--ease-premium);
        }
        .profile-nav-item:hover {
          background: rgba(247,55,79,0.05);
          color: var(--brand-red);
          transform: translateZ(4px);
        }
        .profile-nav-item:hover svg {
          transform: scale(1.1);
        }
        .profile-nav-item.active {
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
          transform: translateZ(2px);
        }
        .profile-nav-divider {
          height: 1px;
          background: var(--border-light);
          margin: 8px 0;
        }
        .profile-nav-item.logout-item {
          border-radius: 0;
          color: var(--danger);
        }
        .theme-toggle-switch {
          width: 40px;
          height: 22px;
          background: var(--border-medium);
          border-radius: 11px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s ease;
          flex-shrink: 0;
          transform-style: preserve-3d;
        }
        .theme-toggle-switch.on {
          background: var(--brand-red);
        }
        .theme-toggle-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.3s var(--ease-premium);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .theme-toggle-switch.on .theme-toggle-knob {
          transform: translateX(18px);
        }
        .theme-toggle-switch {
          perspective: 200px;
        }
        .theme-toggle-switch.on .theme-toggle-knob {
          transform: translateX(18px) translateZ(2px);
        }
        .theme-toggle-switch .theme-toggle-knob {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .profile-nav-item.logout-item:hover {
          background: rgba(226,55,68,0.06);
        }
        .profile-nav-item.logout-item.active {
          background: var(--danger);
          color: #fff;
          border-radius: 10px;
        }

        .profile-panel {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          padding: 28px;
          min-height: 400px;
          transition: opacity 0.3s var(--ease-premium), transform 0.3s var(--ease-premium);
          transform-style: preserve-3d;
          animation: panel3DEnter 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.15s both;
          position: relative;
          overflow: hidden;
        }
        @keyframes panel3DEnter {
          0% { opacity: 0; transform: translateZ(-50px) rotateX(2deg) scale(0.97); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0) scale(1); }
        }
        .profile-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b8b, transparent);
          opacity: 0.4;
          z-index: 1;
        }
        .profile-panel.switching {
          opacity: 0;
          transform: translateY(12px) translateZ(-20px) scale(0.98);
        }
        .profile-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 24px;
          animation: headerSlide3D 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
        }
        @keyframes headerSlide3D {
          0% { opacity: 0; transform: translateZ(-15px) translateY(-8px); }
          100% { opacity: 1; transform: translateZ(0) translateY(0); }
        }
        .profile-panel-header h2 {
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .profile-panel-header h2 svg {
          color: var(--brand-red);
        }

        .premium-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .premium-field:focus-within {
          transform: translateZ(4px);
        }
        .premium-field label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          transition: transform 0.3s ease, color 0.3s ease;
          transform-style: preserve-3d;
        }
        .premium-field:focus-within label {
          color: var(--brand-red);
          transform: translateZ(2px) translateY(-1px);
        }
        .premium-field input,
        .premium-field textarea {
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          background: #fafafa;
          transition: all 0.25s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .premium-field input:focus,
        .premium-field textarea:focus {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08);
          transform: translateZ(4px);
        }
        .premium-field input:disabled,
        .premium-field textarea:disabled {
          background: var(--bg-surface);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.7;
        }
        .premium-field input:focus + label,
        .premium-field textarea:focus + label {
          transform: translateZ(4px);
        }

        .profile-info-display {
          display: grid;
          gap: 20px;
          animation: infoDisplay3D 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.25s both;
        }
        @keyframes infoDisplay3D {
          0% { opacity: 0; transform: translateZ(-20px); }
          100% { opacity: 1; transform: translateZ(0); }
        }
        .profile-info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-item {
          padding: 16px 18px;
          background: var(--bg-surface);
          border-radius: 12px;
          border: 1px solid var(--border-light);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .info-item:hover {
          transform: translateZ(6px) rotateX(-0.5deg);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        .info-item .info-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .info-item .info-label svg {
          color: var(--brand-red);
        }
        .info-item .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .btn-edit:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
          transform: translateZ(4px);
          box-shadow: 0 4px 16px rgba(247,55,79,0.08);
        }
        .btn-save {
          padding: 12px 28px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(247,55,79,0.25);
          align-self: flex-start;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
        }
        .btn-save::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.6s ease;
        }
        .btn-save:hover::before {
          left: 100%;
        }
        .btn-save:hover {
          transform: translateY(-2px) translateZ(6px);
          box-shadow: 0 8px 28px rgba(247,55,79,0.4);
        }
        .btn-save:active {
          transform: translateY(0) translateZ(2px);
        }

        .address-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          perspective: 800px;
        }
        .addr-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
          position: relative;
          transform-style: preserve-3d;
          animation: addrCard3D 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .addr-card:nth-child(1) { animation-delay: 0.25s; }
        .addr-card:nth-child(2) { animation-delay: 0.3s; }
        .addr-card:nth-child(3) { animation-delay: 0.35s; }
        .addr-card:nth-child(4) { animation-delay: 0.4s; }
        @keyframes addrCard3D {
          0% { opacity: 0; transform: translateZ(-30px) rotateX(2deg) scale(0.96); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0) scale(1); }
        }
        .addr-card:hover {
          border-color: rgba(247,55,79,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transform: translateY(-2px) translateZ(8px) rotateX(-0.5deg);
        }
        .addr-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
          transition: transform 0.3s ease;
        }
        .addr-card:hover .addr-card-badge {
          transform: translateZ(4px);
        }
        .addr-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
        }
        .addr-card-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }
        .addr-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          transform-style: preserve-3d;
        }
        .addr-delete-btn:hover {
          color: var(--danger);
          background: rgba(226,55,68,0.06);
          transform: translateZ(2px);
        }
        .addr-add-card {
          border: 1.5px dashed var(--border-medium);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.25s var(--ease-premium);
          min-height: 140px;
          background: transparent;
          transform-style: preserve-3d;
          animation: addrAdd3D 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.35s both;
        }
        @keyframes addrAdd3D {
          0% { opacity: 0; transform: translateZ(-20px) scale(0.95); }
          100% { opacity: 1; transform: translateZ(0) scale(1); }
        }
        .addr-add-card:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.02);
          transform: translateY(-2px) translateZ(6px);
        }
        .addr-add-card:hover svg {
          transform: scale(1.15) rotate(90deg);
        }
        .addr-add-card svg {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .addr-form-card {
          background: var(--bg-surface);
          border: 1.5px solid var(--brand-red);
          border-radius: 14px;
          padding: 20px;
          transform-style: preserve-3d;
          animation: formCard3D 0.4s ease both;
        }
        @keyframes formCard3D {
          0% { opacity: 0; transform: translateZ(-20px) scale(0.97); }
          100% { opacity: 1; transform: translateZ(0) scale(1); }
        }

        .order-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          perspective: 800px;
        }
        .order-card-item {
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
          transform-style: preserve-3d;
          animation: orderCardItem3D 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .order-card-item:nth-child(1) { animation-delay: 0.2s; }
        .order-card-item:nth-child(2) { animation-delay: 0.25s; }
        .order-card-item:nth-child(3) { animation-delay: 0.3s; }
        .order-card-item:nth-child(4) { animation-delay: 0.35s; }
        .order-card-item:nth-child(5) { animation-delay: 0.4s; }
        @keyframes orderCardItem3D {
          0% { opacity: 0; transform: translateZ(-30px) rotateX(2deg); }
          100% { opacity: 1; transform: translateZ(0) rotateX(0); }
        }
        .order-card-item:hover {
          border-color: rgba(247,55,79,0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          transform: translateZ(6px) rotateX(-0.5deg);
        }
        .order-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 12px;
        }
        .order-card-shop h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .order-card-shop span {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .order-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        .order-status-pill:hover {
          transform: translateZ(4px);
          box-shadow: 0 4px 12px rgba(96,178,70,0.15);
        }
        .order-status-pill.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .order-status-pill.preparing {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .order-items {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .order-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order-total {
          font-weight: 700;
          font-size: 1rem;
        }

        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          transform-style: preserve-3d;
        }
        .load-more-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.03);
          transform: translateZ(4px);
          box-shadow: 0 4px 16px rgba(247,55,79,0.06);
        }

        @media (max-width: 900px) {
          .profile-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .profile-nav {
            display: flex;
            overflow-x: auto;
            padding: 6px;
            gap: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .profile-nav-item {
            white-space: nowrap;
            flex-shrink: 0;
            padding: 10px 14px;
            font-size: 0.85rem;
          }
          .profile-nav-item.logout-item {
            margin-top: 0;
            border-top: none;
            padding-top: 10px;
          }
          .profile-cover {
            padding: 24px 20px;
          }
          .cover-info h1 { font-size: 1.3rem; }
        }

        @media (max-width: 768px) {
          .address-grid {
            grid-template-columns: 1fr;
          }
          .profile-info-row {
            grid-template-columns: 1fr;
          }
          .profile-panel {
            padding: 20px;
          }
        }
      `}),(0,V.jsxs)(`div`,{className:`profile-wrap`,children:[(0,V.jsx)(`div`,{className:`profile-cover`,children:(0,V.jsxs)(`div`,{className:`profile-cover-inner`,children:[(0,V.jsx)(`div`,{className:`cover-avatar`,children:_.username.split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}),(0,V.jsxs)(`div`,{className:`cover-info`,children:[(0,V.jsx)(`h1`,{children:_.username}),(0,V.jsxs)(`p`,{children:[`Welcome back, `,_.username.split(` `)[0],`!`]}),(0,V.jsxs)(`div`,{className:`cover-email`,children:[(0,V.jsx)(Jo,{size:13}),` `,_.email]})]})]})}),(0,V.jsxs)(`div`,{className:`profile-body`,children:[(0,V.jsxs)(`nav`,{className:`profile-nav`,children:[(0,V.jsxs)(`button`,{className:`profile-nav-item ${l===`orders`?`active`:``}`,onClick:()=>be(`orders`),children:[(0,V.jsx)(Mo,{size:16}),` Orders`]}),(0,V.jsxs)(`button`,{className:`profile-nav-item ${l===`addresses`?`active`:``}`,onClick:()=>be(`addresses`),children:[(0,V.jsx)(Yo,{size:16}),` Addresses`]}),(0,V.jsxs)(`button`,{className:`profile-nav-item ${l===`details`?`active`:``}`,onClick:()=>be(`details`),children:[(0,V.jsx)(ys,{size:16}),` Account`]}),(0,V.jsx)(`div`,{className:`profile-nav-divider`}),(0,V.jsxs)(`button`,{onClick:c,className:`profile-nav-item`,style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:`10px`},children:[(0,V.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[s?(0,V.jsx)(Qo,{size:16}):(0,V.jsx)(ms,{size:16}),s?`Dark Mode`:`Light Mode`]}),(0,V.jsx)(`span`,{className:`theme-toggle-switch ${s?`on`:``}`,children:(0,V.jsx)(`span`,{className:`theme-toggle-knob`})})]}),(0,V.jsxs)(`button`,{onClick:t,className:`profile-nav-item logout-item`,children:[(0,V.jsx)(qo,{size:16}),` Sign Out`]})]}),(0,V.jsxs)(`main`,{ref:ue,className:`profile-panel ${h?`switching`:``}`,children:[l===`details`&&(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`div`,{className:`profile-panel-header`,children:[(0,V.jsxs)(`h2`,{children:[(0,V.jsx)(ys,{size:20}),` Account Information`]}),!d&&(0,V.jsxs)(`button`,{onClick:()=>f(!0),className:`btn-edit`,children:[(0,V.jsx)(ds,{size:14}),` Edit Profile`]})]}),d?(0,V.jsxs)(`form`,{onSubmit:xe,className:`profile-form`,style:{display:`flex`,flexDirection:`column`,gap:`18px`,maxWidth:`540px`},children:[(0,V.jsxs)(`div`,{className:`profile-info-row`,children:[(0,V.jsxs)(`div`,{className:`premium-field`,children:[(0,V.jsx)(`label`,{children:`Full Name`}),(0,V.jsx)(`input`,{type:`text`,required:!0,value:_.username,onChange:e=>y({..._,username:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`premium-field`,children:[(0,V.jsx)(`label`,{children:`Email Address`}),(0,V.jsx)(`input`,{type:`email`,disabled:!0,value:_.email})]})]}),(0,V.jsxs)(`div`,{className:`premium-field`,children:[(0,V.jsx)(`label`,{children:`Mobile Number`}),(0,V.jsx)(`input`,{type:`tel`,required:!0,value:_.mobile,onChange:e=>y({..._,mobile:e.target.value})})]}),(0,V.jsxs)(`div`,{className:`premium-field`,children:[(0,V.jsx)(`label`,{children:`Default Address`}),(0,V.jsx)(`textarea`,{rows:3,required:!0,value:_.address,onChange:e=>y({..._,address:e.target.value})}),(0,V.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,V.jsxs)(`button`,{type:`button`,onClick:()=>ye(`profile`),style:{alignSelf:`flex-start`,padding:`9px 16px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`8px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`6px`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px) translateZ(4px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:[(0,V.jsx)(Yo,{size:13}),` `,ge?`Detecting...`:`Auto-Detect Location`]}),(0,V.jsx)(`div`,{ref:pe,style:{height:`180px`,borderRadius:`10px`,border:`1px solid var(--border-medium)`,zIndex:1}})]})]}),(0,V.jsx)(`button`,{type:`submit`,className:`btn-save`,disabled:p,children:p?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:16,style:{animation:`spin 1s linear infinite`,marginRight:4}}),` Saving...`]}):`Save Changes`})]}):(0,V.jsxs)(`div`,{className:`profile-info-display`,children:[(0,V.jsxs)(`div`,{className:`profile-info-row`,children:[(0,V.jsxs)(`div`,{className:`info-item`,children:[(0,V.jsxs)(`div`,{className:`info-label`,children:[(0,V.jsx)(ys,{size:13}),` Full Name`]}),(0,V.jsx)(`div`,{className:`info-value`,children:_.username})]}),(0,V.jsxs)(`div`,{className:`info-item`,children:[(0,V.jsxs)(`div`,{className:`info-label`,children:[(0,V.jsx)(Jo,{size:13}),` Email`]}),(0,V.jsx)(`div`,{className:`info-value`,children:_.email})]})]}),(0,V.jsxs)(`div`,{className:`profile-info-row`,children:[(0,V.jsxs)(`div`,{className:`info-item`,children:[(0,V.jsxs)(`div`,{className:`info-label`,children:[(0,V.jsx)(ts,{size:13}),` Mobile`]}),(0,V.jsx)(`div`,{className:`info-value`,children:_.mobile||`Not provided`})]}),(0,V.jsxs)(`div`,{className:`info-item`,children:[(0,V.jsxs)(`div`,{className:`info-label`,children:[(0,V.jsx)(No,{size:13}),` Member Since`]}),(0,V.jsx)(`div`,{className:`info-value`,children:`2025`})]})]}),(0,V.jsxs)(`div`,{className:`info-item`,style:{gridColumn:`1 / -1`},children:[(0,V.jsxs)(`div`,{className:`info-label`,children:[(0,V.jsx)(Yo,{size:13}),` Default Address`]}),(0,V.jsx)(`div`,{className:`info-value`,style:{fontWeight:500,fontSize:`0.95rem`},children:_.address})]})]}),(0,V.jsxs)(`div`,{style:{marginTop:`32px`,borderTop:`1px solid var(--border-light)`,paddingTop:`24px`},children:[(0,V.jsxs)(`h3`,{style:{fontSize:`1.1rem`,fontWeight:800,marginBottom:`12px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,V.jsx)(ss,{size:18,color:`var(--brand-red)`}),` Role & Access`]}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[e?.role!==`restaurant_admin`&&(0,V.jsxs)(`button`,{onClick:()=>De(`restaurant_admin`),disabled:A.loading,style:{display:`flex`,alignItems:`center`,gap:`8px`,padding:`10px 18px`,border:`1px solid var(--brand-red)`,borderRadius:`10px`,background:`transparent`,color:`var(--brand-red)`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s, transform 0.3s`,transformStyle:`preserve-3d`},onMouseEnter:e=>{e.target.style.transform=`translateZ(4px) translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.12)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=``},children:[(0,V.jsx)(wo,{size:16}),` Partner With Us`]}),e?.role!==`delivery_partner`&&(0,V.jsxs)(`button`,{onClick:()=>De(`delivery_partner`),disabled:A.loading,style:{display:`flex`,alignItems:`center`,gap:`8px`,padding:`10px 18px`,border:`1px solid #4bc0c0`,borderRadius:`10px`,background:`transparent`,color:`#4bc0c0`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s, transform 0.3s`,transformStyle:`preserve-3d`},onMouseEnter:e=>{e.target.style.transform=`translateZ(4px) translateY(-1px)`,e.target.style.boxShadow=`0 4px 16px rgba(75,192,192,0.12)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=``},children:[(0,V.jsx)(xo,{size:16}),` Ride With Us`]})]})]})]}),l===`addresses`&&(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`div`,{className:`profile-panel-header`,children:(0,V.jsxs)(`h2`,{children:[(0,V.jsx)(Yo,{size:20}),` Saved Addresses`]})}),(0,V.jsxs)(`div`,{className:`address-grid`,children:[b.map(e=>(0,V.jsxs)(`div`,{className:`addr-card`,children:[(0,V.jsxs)(`div`,{className:`addr-card-badge`,children:[(0,V.jsx)(Yo,{size:11}),` `,e.type]}),(0,V.jsx)(`p`,{children:e.address}),(0,V.jsx)(`div`,{className:`addr-card-actions`,children:(0,V.jsxs)(`button`,{onClick:()=>Ce(e.id),className:`addr-delete-btn`,children:[(0,V.jsx)(gs,{size:13}),` Remove`]})})]},e.id)),ne?(0,V.jsxs)(`form`,{onSubmit:Se,className:`addr-form-card`,children:[(0,V.jsxs)(`div`,{style:{marginBottom:`14px`},children:[(0,V.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`var(--text-muted)`,textTransform:`uppercase`,letterSpacing:`0.5px`,display:`block`,marginBottom:`6px`},children:`Address Label`}),(0,V.jsxs)(`select`,{value:S,onChange:e=>C(e.target.value),className:`premium-select`,style:{width:`100%`},children:[(0,V.jsx)(`option`,{value:`Home`,children:`Home`}),(0,V.jsx)(`option`,{value:`Work`,children:`Work`}),(0,V.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,V.jsxs)(`div`,{style:{marginBottom:`14px`},children:[(0,V.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:700,color:`var(--text-muted)`,textTransform:`uppercase`,letterSpacing:`0.5px`,display:`block`,marginBottom:`6px`},children:`Full Address`}),(0,V.jsx)(`textarea`,{rows:2,required:!0,value:w,onChange:e=>T(e.target.value),placeholder:`House No, Building Name, Street, Landmark`,style:{width:`100%`,padding:`10px 12px`,border:`1.5px solid var(--border-medium)`,borderRadius:`10px`,fontFamily:`inherit`,fontSize:`0.95rem`,outline:`none`,transition:`border-color 0.25s var(--ease-premium), transform 0.3s ease`,background:`#fff`},onFocus:e=>{e.target.style.borderColor=`var(--brand-red)`,e.target.style.transform=`translateZ(2px)`},onBlur:e=>{e.target.style.borderColor=`var(--border-medium)`,e.target.style.transform=``}}),(0,V.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,flexDirection:`column`,gap:`10px`},children:[(0,V.jsxs)(`button`,{type:`button`,onClick:()=>ye(`newAddress`),style:{alignSelf:`flex-start`,padding:`9px 16px`,fontSize:`0.8rem`,fontWeight:700,background:`var(--brand-red)`,color:`white`,border:`none`,borderRadius:`8px`,cursor:`pointer`,display:`flex`,alignItems:`center`,gap:`6px`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px) translateZ(4px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:[(0,V.jsx)(Yo,{size:13}),` `,ge?`Detecting...`:`Auto-Detect Location`]}),(0,V.jsx)(`div`,{ref:pe,style:{height:`160px`,borderRadius:`10px`,border:`1px solid var(--border-medium)`,zIndex:1}})]})]}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,justifyContent:`flex-end`},children:[(0,V.jsx)(`button`,{type:`button`,onClick:()=>re(!1),style:{padding:`9px 16px`,border:`1.5px solid var(--border-medium)`,background:`transparent`,borderRadius:`10px`,cursor:`pointer`,fontWeight:600,fontSize:`0.85rem`,color:`var(--text-secondary)`,transition:`all 0.2s, transform 0.3s`,transformStyle:`preserve-3d`},onMouseEnter:e=>{e.target.style.borderColor=`var(--brand-red)`,e.target.style.color=`var(--brand-red)`,e.target.style.transform=`translateZ(2px)`},onMouseLeave:e=>{e.target.style.borderColor=``,e.target.style.color=``,e.target.style.transform=``},children:`Cancel`}),(0,V.jsx)(`button`,{type:`submit`,style:{padding:`9px 20px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,cursor:`pointer`,fontSize:`0.85rem`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`,transformStyle:`preserve-3d`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px) translateZ(4px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.3)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:`Save Address`})]})]}):(0,V.jsxs)(`button`,{onClick:()=>re(!0),className:`addr-add-card`,children:[(0,V.jsx)(ns,{size:28,style:{marginBottom:`10px`,strokeWidth:2}}),(0,V.jsx)(`span`,{style:{fontWeight:600},children:`Add New Address`})]})]})]}),l===`orders`&&(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`div`,{className:`profile-panel-header`,children:(0,V.jsxs)(`h2`,{children:[(0,V.jsx)($o,{size:20}),` Past Orders`]})}),(0,V.jsx)(`div`,{className:`order-timeline`,children:ce?(0,V.jsxs)(`div`,{style:{textAlign:`center`,padding:`60px 0`,color:`var(--text-muted)`},children:[(0,V.jsx)(Go,{size:28,style:{animation:`spin 1s linear infinite`,margin:`0 auto 16px`}}),(0,V.jsx)(`p`,{style:{fontWeight:600},children:`Loading your order history...`})]}):oe.length===0?(0,V.jsxs)(`div`,{style:{textAlign:`center`,padding:`60px 0`},children:[(0,V.jsx)(`div`,{style:{width:`72px`,height:`72px`,borderRadius:`50%`,background:`var(--bg-surface)`,display:`flex`,alignItems:`center`,justifyContent:`center`,margin:`0 auto 16px`},children:(0,V.jsx)(cs,{size:32,style:{strokeWidth:1.5,color:`var(--text-muted)`}})}),(0,V.jsx)(`p`,{style:{fontWeight:700,fontSize:`1.15rem`,color:`var(--text-primary)`,marginBottom:`4px`},children:`No Orders Yet`}),(0,V.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-muted)`,marginBottom:`20px`},children:`Hungry? Your orders will appear here.`}),(0,V.jsx)(`button`,{onClick:()=>a(`/`),style:{padding:`10px 24px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,cursor:`pointer`},children:`Browse Restaurants`})]}):(0,V.jsxs)(V.Fragment,{children:[Te.map(e=>{let t=(e.status||``).toLowerCase()===`delivered`?``:(e.status||``).toLowerCase()===`pending`?`pending`:(e.status||``).toLowerCase()===`preparing`?`preparing`:``;return(0,V.jsxs)(`div`,{className:`order-card-item`,children:[(0,V.jsxs)(`div`,{className:`order-card-top`,children:[(0,V.jsxs)(`div`,{className:`order-card-shop`,children:[(0,V.jsx)(`h4`,{children:e.restaurantName}),(0,V.jsxs)(`span`,{children:[(0,V.jsx)(To,{size:12}),` `,e.date||`Recent`,` • ID: `,e.id]})]}),(0,V.jsxs)(`div`,{className:`order-status-pill ${t}`,children:[(0,V.jsx)(ko,{size:11}),` `,e.status||`Delivered`]})]}),(0,V.jsx)(`div`,{className:`order-items`,children:e.items.map((t,n)=>(0,V.jsxs)(`span`,{children:[t.name,` × `,t.qty,n<e.items.length-1?`, `:``]},n))}),(0,V.jsxs)(`div`,{className:`order-card-bottom`,children:[(0,V.jsxs)(`span`,{className:`order-total`,children:[`₹`,(e.total||0).toFixed(2)]}),e.status&&e.status.toLowerCase()!==`delivered`?(0,V.jsxs)(`button`,{onClick:()=>a(`/track-order?orderId=${e.id}`),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`8px 18px`,background:`var(--success)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,fontSize:`0.85rem`,cursor:`pointer`,transition:`all 0.2s, transform 0.3s`,boxShadow:`0 2px 8px rgba(96, 178, 70, 0.2)`,transformStyle:`preserve-3d`},onMouseEnter:e=>{e.target.style.transform=`translateY(-1px) translateZ(4px)`,e.target.style.boxShadow=`0 4px 16px rgba(96, 178, 70, 0.35)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(96, 178, 70, 0.2)`},children:[(0,V.jsx)(Yo,{size:13}),` Track Live`]}):(0,V.jsx)(`button`,{disabled:ie,onClick:()=>we(e.items),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`8px 18px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`10px`,fontWeight:700,fontSize:`0.85rem`,cursor:ie?`not-allowed`:`pointer`,opacity:ie?.7:1,transition:`all 0.2s, transform 0.3s`,boxShadow:`0 2px 8px rgba(247,55,79,0.2)`,transformStyle:`preserve-3d`},onMouseEnter:e=>{ie||(e.target.style.transform=`translateY(-1px) translateZ(4px)`,e.target.style.boxShadow=`0 4px 16px rgba(247,55,79,0.35)`)},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 2px 8px rgba(247,55,79,0.2)`},children:ie?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(Go,{size:13,style:{animation:`spin 1s linear infinite`}}),` Adding...`]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(cs,{size:13}),` Reorder`]})})]})]},e.id)}),Ee&&(0,V.jsx)(`div`,{className:`load-more-wrap`,children:(0,V.jsxs)(`button`,{type:`button`,className:`load-more-btn`,onClick:()=>N(e=>e+nc),children:[`Show more orders (`,oe.length-M,` remaining) `,(0,V.jsx)(vo,{size:14})]})})]})})]})]})]})]})]}):(0,V.jsxs)(`div`,{className:`page-enter`,style:{maxWidth:`500px`,margin:`80px auto`,textAlign:`center`,display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,V.jsx)(`div`,{style:{width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(247,55,79,0.08)`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginBottom:`24px`,border:`2px solid rgba(247,55,79,0.12)`},children:(0,V.jsx)(ys,{size:48,color:`var(--brand-red)`})}),(0,V.jsx)(`h2`,{style:{fontSize:`1.8rem`,marginBottom:`8px`},children:`Please Log In`}),(0,V.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`},children:`Log in to view your profile dashboard, saved addresses, and past orders.`}),(0,V.jsx)(`button`,{onClick:()=>a(`/login?redirect=/profile`),style:{padding:`14px 36px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`12px`,fontWeight:700,fontSize:`1rem`,cursor:`pointer`,transition:`transform 0.2s, box-shadow 0.2s`,boxShadow:`0 8px 24px rgba(247,55,79,0.25)`},children:`LOG IN NOW`})]})},ic=v.memo(({children:e,allowedRoles:t=[],redirectTo:n=`/login`})=>{let{user:r,loading:i}=(0,v.useContext)(ro),a=ct();return i?(0,V.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,flex:1},children:(0,V.jsx)(Go,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):r?t.length>0&&!t.includes(r.role)?(0,V.jsx)(It,{to:`/login`,state:{from:a,error:`unauthorized_role`},replace:!0}):e:(0,V.jsx)(It,{to:n,state:{from:a},replace:!0})}),ac=class extends v.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t),this.setState({errorInfo:t})}render(){return this.state.hasError?(0,V.jsxs)(`div`,{style:{padding:`40px`,maxWidth:`800px`,margin:`60px auto`,background:`#fff`,border:`2px solid var(--danger)`,borderRadius:`12px`,boxShadow:`0 10px 25px rgba(0,0,0,0.1)`,fontFamily:`system-ui, -apple-system, sans-serif`},children:[(0,V.jsx)(`h2`,{style:{color:`var(--danger)`,margin:`0 0 16px 0`,fontSize:`1.6rem`,fontWeight:800},children:`Application Render Crash`}),(0,V.jsxs)(`p`,{style:{fontWeight:`bold`,color:`var(--text-primary)`,fontSize:`1.05rem`},children:[`Error Details: `,(0,V.jsx)(`code`,{style:{color:`var(--danger)`,background:`rgba(226, 55, 68, 0.05)`,padding:`2px 6px`,borderRadius:`4px`,fontFamily:`monospace`},children:this.state.error&&this.state.error.toString()})]}),(0,V.jsx)(`pre`,{style:{background:`var(--bg-surface)`,border:`1px solid var(--border-medium)`,padding:`16px`,borderRadius:`8px`,overflowX:`auto`,fontSize:`0.82rem`,color:`var(--text-secondary)`,lineHeight:`1.5`,maxHeight:`300px`},children:this.state.errorInfo&&this.state.errorInfo.componentStack}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginTop:`24px`},children:[(0,V.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`10px 20px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`6px`,cursor:`pointer`,fontWeight:`700`,fontSize:`0.9rem`},children:`Reload Page`}),(0,V.jsx)(`button`,{onClick:()=>window.location.href=`/zingbite`,style:{padding:`10px 20px`,background:`none`,border:`1px solid var(--border-medium)`,color:`var(--text-secondary)`,borderRadius:`6px`,cursor:`pointer`,fontWeight:`700`,fontSize:`0.9rem`},children:`Go to Home`})]})]}):this.props.children}},oc=v.lazy(()=>w(()=>import(`./OrderTracking-Bys--VcG.js`),__vite__mapDeps([0,1,2]))),sc=v.lazy(()=>w(()=>import(`./DeliveryDashboard-C3IZR2lF.js`),__vite__mapDeps([3,1,4,2]))),cc=v.lazy(()=>w(()=>import(`./RestaurantDashboard-BF9FC2FJ.js`),__vite__mapDeps([5,1,4]))),lc=v.lazy(()=>w(()=>import(`./CareerPortal-CeEVhM2O.js`),__vite__mapDeps([6,1,2]))),uc=v.lazy(()=>w(()=>import(`./SuperAdminDashboard-BD7ms4wp.js`),__vite__mapDeps([7,1,4,2]))),dc=v.lazy(()=>w(()=>import(`./VRPDashboard-fv29JPz8.js`),__vite__mapDeps([8,1])));function fc(){let{pathname:e}=ct();return(0,v.useEffect)(()=>{window.scrollTo({top:0,behavior:`smooth`})},[e]),null}function pc(){let e=ct();return(0,v.useEffect)(()=>{oo(e.pathname)},[e.pathname]),null}function mc(){return(0,V.jsxs)(`div`,{className:`premium-ambient-scene`,"aria-hidden":`true`,children:[(0,V.jsx)(`span`,{className:`ambient-slab slab-one`}),(0,V.jsx)(`span`,{className:`ambient-slab slab-two`}),(0,V.jsx)(`span`,{className:`ambient-slab slab-three`}),(0,V.jsx)(`span`,{className:`ambient-ribbon ribbon-one`}),(0,V.jsx)(`span`,{className:`ambient-ribbon ribbon-two`})]})}function hc(){return(0,v.useEffect)(()=>{let e=[`a[href]`,`button`,`[role="button"]`,`input:not([type="hidden"])`,`select`,`textarea`,`label`,`summary`,`[tabindex]:not([tabindex="-1"])`].join(`,`),t=t=>{if(!(t.target instanceof Element))return;let n=t.target.closest(e);if(!(!n||n.closest(`.leaflet-container`))&&!(n.disabled||n.getAttribute(`aria-disabled`)===`true`)){if(n.classList.remove(`interaction-pressed`),n.offsetWidth,n.classList.add(`interaction-pressed`),![`INPUT`,`SELECT`,`TEXTAREA`,`OPTION`].includes(n.tagName)){let e=n.getBoundingClientRect();if(e.width>0&&e.height>0){let r=document.createElement(`span`),i=Math.max(e.width,e.height)*1.15;r.className=`interaction-ripple`,r.style.width=`${i}px`,r.style.height=`${i}px`,r.style.left=`${t.clientX-e.left}px`,r.style.top=`${t.clientY-e.top}px`,n.classList.add(`has-interaction-ripple`),n.appendChild(r),window.setTimeout(()=>r.remove(),680)}}window.setTimeout(()=>n.classList.remove(`interaction-pressed`),260)}};return document.addEventListener(`pointerdown`,t,!0),()=>document.removeEventListener(`pointerdown`,t,!0)},[]),null}function gc({children:e}){let t=ct();return(0,V.jsx)(`div`,{className:`route-motion-frame`,children:e},`${t.pathname}${t.search}`)}function _c(){return(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`,minHeight:`300px`,flex:1,gap:`16px`},children:[(0,V.jsx)(`style`,{children:`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .premium-loader-ring {
          position: relative;
          width: 48px;
          height: 48px;
        }
        .premium-loader-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid rgba(247, 55, 79, 0.1);
          border-top-color: var(--brand-red);
          animation: spin 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .premium-loader-ring::after {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-bottom-color: var(--brand-red);
          animation: spin 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite reverse;
        }
      `}),(0,V.jsx)(`div`,{className:`premium-loader-ring`}),(0,V.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`,fontFamily:`'Outfit', sans-serif`,fontWeight:700,fontSize:`0.95rem`,color:`var(--text-secondary)`},children:[(0,V.jsx)(zo,{size:16,color:`var(--brand-red)`,style:{animation:`loaderFloat 1.5s ease-in-out infinite`}}),`Loading...`]})]})}function vc(){return(0,V.jsx)(Os,{children:(0,V.jsx)(Ts,{children:(0,V.jsx)(io,{children:(0,V.jsx)(co,{children:(0,V.jsxs)(kn,{basename:`/zingbite`,children:[(0,V.jsx)(fc,{}),(0,V.jsx)(pc,{}),(0,V.jsx)(hc,{}),(0,V.jsxs)(`div`,{className:`app-shell`,children:[(0,V.jsx)(mc,{}),(0,V.jsx)(js,{}),(0,V.jsx)(`main`,{className:`app-main`,children:(0,V.jsx)(ac,{children:(0,V.jsx)(v.Suspense,{fallback:(0,V.jsx)(_c,{}),children:(0,V.jsx)(gc,{children:(0,V.jsxs)(zt,{children:[(0,V.jsx)(Lt,{path:`/`,element:(0,V.jsx)(Ws,{})}),(0,V.jsx)(Lt,{path:`/home`,element:(0,V.jsx)(Ws,{})}),(0,V.jsx)(Lt,{path:`/menu`,element:(0,V.jsx)(Xs,{})}),(0,V.jsx)(Lt,{path:`/cart`,element:(0,V.jsx)(Zs,{})}),(0,V.jsx)(Lt,{path:`/checkout`,element:(0,V.jsx)(Qs,{})}),(0,V.jsx)(Lt,{path:`/login`,element:(0,V.jsx)($s,{})}),(0,V.jsx)(Lt,{path:`/register`,element:(0,V.jsx)(ec,{})}),(0,V.jsx)(Lt,{path:`/info/:sectionId`,element:(0,V.jsx)(tc,{})}),(0,V.jsx)(Lt,{path:`/profile`,element:(0,V.jsx)(rc,{})}),(0,V.jsx)(Lt,{path:`/track-order`,element:(0,V.jsx)(oc,{})}),(0,V.jsx)(Lt,{path:`/delivery`,element:(0,V.jsx)(ic,{allowedRoles:[`delivery_partner`],children:(0,V.jsx)(sc,{})})}),(0,V.jsx)(Lt,{path:`/restaurant-admin`,element:(0,V.jsx)(ic,{allowedRoles:[`restaurant_admin`],children:(0,V.jsx)(cc,{})})}),(0,V.jsx)(Lt,{path:`/careers`,element:(0,V.jsx)(lc,{})}),(0,V.jsx)(Lt,{path:`/admin`,element:(0,V.jsx)(ic,{allowedRoles:[`super_admin`],children:(0,V.jsx)(uc,{})})}),(0,V.jsx)(Lt,{path:`/vrp`,element:(0,V.jsx)(dc,{})})]})})})})}),(0,V.jsx)(Ms,{})]})]})})})})})}b.createRoot(document.getElementById(`root`)).render((0,V.jsx)(v.StrictMode,{children:(0,V.jsx)(vc,{})}));export{B as A,Oo as C,W as D,xo as E,zn as M,d as N,ro as O,l as P,Ao as S,Co as T,Uo as _,ms as a,No as b,ss as c,ns as d,ts as f,Go as g,Ko as h,_s as i,P as j,eo as k,as as l,qo as m,Ss as n,ps as o,Yo as p,bs as r,cs as s,Es as t,is as u,Ro as v,To as w,Mo as x,Po as y};