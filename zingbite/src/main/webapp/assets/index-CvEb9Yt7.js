var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function O(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function re(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+O(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+O(a,u),c+=ie(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+O(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(re(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function oe(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var k=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},A={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=A,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:oe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,k)}catch(e){k(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.7`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&O(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&O(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=E,D=function(){ne.postMessage(null)}}else D=function(){_(E,0)};function O(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,O(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}var m=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),O=Symbol.iterator;function re(e){return typeof e!=`object`||!e?null:(e=O&&e[O]||e[`@@iterator`],typeof e==`function`?e:null)}var ie=Symbol.for(`react.client.reference`);function ae(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ie?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?ae(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return ae(e(t))}catch{}}return null}var oe=Array.isArray,k=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},ce=[],le=-1;function ue(e){return{current:e}}function de(e){0>le||(e.current=ce[le],ce[le]=null,le--)}function j(e,t){le++,ce[le]=e.current,e.current=t}var fe=ue(null),pe=ue(null),me=ue(null),he=ue(null);function ge(e,t){switch(j(me,t),j(pe,e),j(fe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}de(fe),j(fe,e)}function _e(){de(fe),de(pe),de(me)}function ve(e){e.memoizedState!==null&&j(he,e);var t=fe.current,n=Hd(t,e.type);t!==n&&(j(pe,e),j(fe,n))}function ye(e){pe.current===e&&(de(fe),de(pe)),he.current===e&&(de(he),Qf._currentValue=se)}var be,xe;function Se(e){if(be===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);be=t&&t[1]||``,xe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+be+e+xe}var Ce=!1;function we(e,t){if(!e||Ce)return``;Ce=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ce=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Se(n):``}function Te(e,t){switch(e.tag){case 26:case 27:case 5:return Se(e.type);case 16:return Se(`Lazy`);case 13:return e.child!==t&&t!==null?Se(`Suspense Fallback`):Se(`Suspense`);case 19:return Se(`SuspenseList`);case 0:case 15:return we(e.type,!1);case 11:return we(e.type.render,!1);case 1:return we(e.type,!0);case 31:return Se(`Activity`);default:return``}}function Ee(e){try{var t=``,n=null;do t+=Te(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var De=Object.prototype.hasOwnProperty,Oe=t.unstable_scheduleCallback,ke=t.unstable_cancelCallback,Ae=t.unstable_shouldYield,je=t.unstable_requestPaint,Me=t.unstable_now,Ne=t.unstable_getCurrentPriorityLevel,Pe=t.unstable_ImmediatePriority,Fe=t.unstable_UserBlockingPriority,Ie=t.unstable_NormalPriority,Le=t.unstable_LowPriority,Re=t.unstable_IdlePriority,ze=t.log,Be=t.unstable_setDisableYieldValue,Ve=null,He=null;function Ue(e){if(typeof ze==`function`&&Be(e),He&&typeof He.setStrictMode==`function`)try{He.setStrictMode(Ve,e)}catch{}}var We=Math.clz32?Math.clz32:qe,Ge=Math.log,Ke=Math.LN2;function qe(e){return e>>>=0,e===0?32:31-(Ge(e)/Ke|0)|0}var Je=256,Ye=262144,Xe=4194304;function Ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ze(n))):i=Ze(o):i=Ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ze(n))):i=Ze(o)):i=Ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function $e(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function et(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tt(){var e=Xe;return Xe<<=1,!(Xe&62914560)&&(Xe=4194304),e}function nt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function it(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-We(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&at(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function at(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-We(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ot(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-We(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function st(e,t){var n=t&-t;return n=n&42?1:ct(n),(n&(e.suspendedLanes|t))===0?n:0}function ct(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function lt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ut(){var e=A.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function dt(e,t){var n=A.p;try{return A.p=e,t()}finally{A.p=n}}var ft=Math.random().toString(36).slice(2),pt=`__reactFiber$`+ft,mt=`__reactProps$`+ft,ht=`__reactContainer$`+ft,gt=`__reactEvents$`+ft,_t=`__reactListeners$`+ft,vt=`__reactHandles$`+ft,yt=`__reactResources$`+ft,bt=`__reactMarker$`+ft;function xt(e){delete e[pt],delete e[mt],delete e[gt],delete e[_t],delete e[vt]}function St(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[pt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[pt]||e[ht]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[yt];return t||=e[yt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[bt]=!0}var Dt=new Set,Ot={};function kt(e,t){At(e,t),At(e+`Capture`,t)}function At(e,t){for(Ot[e]=t,e=0;e<t.length;e++)Dt.add(t[e])}var jt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Mt={},Nt={};function Pt(e){return De.call(Nt,e)?!0:De.call(Mt,e)?!1:jt.test(e)?Nt[e]=!0:(Mt[e]=!0,!1)}function Ft(e,t,n){if(Pt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function It(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function M(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Lt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Rt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function zt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Bt(e){if(!e._valueTracker){var t=Rt(e)?`checked`:`value`;e._valueTracker=zt(e,t,``+e[t])}}function Vt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Rt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ht(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ut=/[\n"\\]/g;function Wt(e){return e.replace(Ut,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Gt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Lt(t)):e.value!==``+Lt(t)&&(e.value=``+Lt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):qt(e,o,Lt(n)):qt(e,o,Lt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Lt(s):e.removeAttribute(`name`)}function Kt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Bt(e);return}n=n==null?``:``+Lt(n),t=t==null?n:``+Lt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Bt(e)}function qt(e,t,n){t===`number`&&Ht(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Jt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Lt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Yt(e,t,n){if(t!=null&&(t=``+Lt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Lt(n)}function Xt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(oe(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Lt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Bt(e)}function Zt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function $t(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Qt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function en(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&$t(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&$t(e,o,t[o])}function tn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var nn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),rn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function an(e){return rn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function on(){}var sn=null;function cn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ln=null,un=null;function dn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[mt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Gt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Wt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[mt]||null;if(!a)throw Error(i(90));Gt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Vt(r)}break a;case`textarea`:Yt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Jt(e,!!n.multiple,t,!1)}}}var fn=!1;function pn(e,t,n){if(fn)return e(t,n);fn=!0;try{return e(t)}finally{if(fn=!1,(ln!==null||un!==null)&&(bu(),ln&&(t=ln,e=un,un=ln=null,dn(t),e)))for(t=0;t<e.length;t++)dn(e[t])}}function mn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[mt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var hn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),gn=!1;if(hn)try{var _n={};Object.defineProperty(_n,"passive",{get:function(){gn=!0}}),window.addEventListener(`test`,_n,_n),window.removeEventListener(`test`,_n,_n)}catch{gn=!1}var vn=null,yn=null,bn=null;function xn(){if(bn)return bn;var e,t=yn,n=t.length,r,i=`value`in vn?vn.value:vn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return bn=i.slice(e,1<r?1-r:void 0)}function Sn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Cn(){return!0}function wn(){return!1}function Tn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Cn:wn,this.isPropagationStopped=wn,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Cn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Cn)},persist:function(){},isPersistent:Cn}),t}var En={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Dn=Tn(En),On=m({},En,{view:0,detail:0}),kn=Tn(On),An,N,jn,Mn=m({},On,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Un,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==jn&&(jn&&e.type===`mousemove`?(An=e.screenX-jn.screenX,N=e.screenY-jn.screenY):N=An=0,jn=e),An)},movementY:function(e){return`movementY`in e?e.movementY:N}}),Nn=Tn(Mn),Pn=Tn(m({},Mn,{dataTransfer:0})),Fn=Tn(m({},On,{relatedTarget:0})),In=Tn(m({},En,{animationName:0,elapsedTime:0,pseudoElement:0})),Ln=Tn(m({},En,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Rn=Tn(m({},En,{data:0})),zn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Bn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Vn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Hn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vn[e])?!!t[e]:!1}function Un(){return Hn}var Wn=Tn(m({},On,{key:function(e){if(e.key){var t=zn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Sn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Bn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Un,charCode:function(e){return e.type===`keypress`?Sn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Sn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Gn=Tn(m({},Mn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Kn=Tn(m({},On,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Un})),qn=Tn(m({},En,{propertyName:0,elapsedTime:0,pseudoElement:0})),Jn=Tn(m({},Mn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Yn=Tn(m({},En,{newState:0,oldState:0})),Xn=[9,13,27,32],Zn=hn&&`CompositionEvent`in window,Qn=null;hn&&`documentMode`in document&&(Qn=document.documentMode);var $n=hn&&`TextEvent`in window&&!Qn,er=hn&&(!Zn||Qn&&8<Qn&&11>=Qn),tr=` `,nr=!1;function rr(e,t){switch(e){case`keyup`:return Xn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function ir(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ar=!1;function or(e,t){switch(e){case`compositionend`:return ir(t);case`keypress`:return t.which===32?(nr=!0,tr):null;case`textInput`:return e=t.data,e===tr&&nr?null:e;default:return null}}function sr(e,t){if(ar)return e===`compositionend`||!Zn&&rr(e,t)?(e=xn(),bn=yn=vn=null,ar=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return er&&t.locale!==`ko`?null:t.data;default:return null}}var cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!cr[e.type]:t===`textarea`}function ur(e,t,n,r){ln?un?un.push(r):un=[r]:ln=r,t=Ed(t,`onChange`),0<t.length&&(n=new Dn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var dr=null,fr=null;function pr(e){yd(e,0)}function mr(e){if(Vt(wt(e)))return e}function hr(e,t){if(e===`change`)return t}var gr=!1;if(hn){var _r;if(hn){var vr=`oninput`in document;if(!vr){var yr=document.createElement(`div`);yr.setAttribute(`oninput`,`return;`),vr=typeof yr.oninput==`function`}_r=vr}else _r=!1;gr=_r&&(!document.documentMode||9<document.documentMode)}function br(){dr&&(dr.detachEvent(`onpropertychange`,xr),fr=dr=null)}function xr(e){if(e.propertyName===`value`&&mr(fr)){var t=[];ur(t,fr,e,cn(e)),pn(pr,t)}}function Sr(e,t,n){e===`focusin`?(br(),dr=t,fr=n,dr.attachEvent(`onpropertychange`,xr)):e===`focusout`&&br()}function Cr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return mr(fr)}function wr(e,t){if(e===`click`)return mr(t)}function Tr(e,t){if(e===`input`||e===`change`)return mr(t)}function Er(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Dr=typeof Object.is==`function`?Object.is:Er;function Or(e,t){if(Dr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!De.call(t,i)||!Dr(e[i],t[i]))return!1}return!0}function kr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ar(e,t){var n=kr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=kr(n)}}function jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?jr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ht(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ht(e.document)}return t}function Nr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Pr=hn&&`documentMode`in document&&11>=document.documentMode,Fr=null,Ir=null,Lr=null,Rr=!1;function zr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rr||Fr==null||Fr!==Ht(r)||(r=Fr,`selectionStart`in r&&Nr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Or(Lr,r)||(Lr=r,r=Ed(Ir,`onSelect`),0<r.length&&(t=new Dn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Fr)))}function Br(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Vr={animationend:Br(`Animation`,`AnimationEnd`),animationiteration:Br(`Animation`,`AnimationIteration`),animationstart:Br(`Animation`,`AnimationStart`),transitionrun:Br(`Transition`,`TransitionRun`),transitionstart:Br(`Transition`,`TransitionStart`),transitioncancel:Br(`Transition`,`TransitionCancel`),transitionend:Br(`Transition`,`TransitionEnd`)},Hr={},Ur={};hn&&(Ur=document.createElement(`div`).style,`AnimationEvent`in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),`TransitionEvent`in window||delete Vr.transitionend.transition);function Wr(e){if(Hr[e])return Hr[e];if(!Vr[e])return e;var t=Vr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ur)return Hr[e]=t[n];return e}var Gr=Wr(`animationend`),Kr=Wr(`animationiteration`),qr=Wr(`animationstart`),Jr=Wr(`transitionrun`),Yr=Wr(`transitionstart`),Xr=Wr(`transitioncancel`),Zr=Wr(`transitionend`),Qr=new Map,$r=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);$r.push(`scrollEnd`);function ei(e,t){Qr.set(e,t),kt(t,[e])}var ti=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ni=[],ri=0,ii=0;function ai(){for(var e=ri,t=ii=ri=0;t<e;){var n=ni[t];ni[t++]=null;var r=ni[t];ni[t++]=null;var i=ni[t];ni[t++]=null;var a=ni[t];if(ni[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ci(n,i,a)}}function P(e,t,n,r){ni[ri++]=e,ni[ri++]=t,ni[ri++]=n,ni[ri++]=r,ii|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function oi(e,t,n,r){return P(e,t,n,r),li(e)}function si(e,t){return P(e,null,null,t),li(e)}function ci(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-We(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function li(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ui={};function di(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function fi(e,t,n,r){return new di(e,t,n,r)}function pi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function mi(e,t){var n=e.alternate;return n===null?(n=fi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function hi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function gi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)pi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,fe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=fi(31,n,t,a),e.elementType=te,e.lanes=o,e;case y:return _i(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=fi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=fi(13,n,t,a),e.elementType=ee,e.lanes=o,e;case T:return e=fi(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=fi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function _i(e,t,n,r){return e=fi(7,e,r,t),e.lanes=n,e}function vi(e,t,n){return e=fi(6,e,null,t),e.lanes=n,e}function yi(e){var t=fi(18,null,null,0);return t.stateNode=e,t}function bi(e,t,n){return t=fi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xi=new WeakMap;function Si(e,t){if(typeof e==`object`&&e){var n=xi.get(e);return n===void 0?(t={value:e,source:t,stack:Ee(t)},xi.set(e,t),t):n}return{value:e,source:t,stack:Ee(t)}}var Ci=[],wi=0,Ti=null,Ei=0,F=[],Di=0,Oi=null,ki=1,Ai=``;function ji(e,t){Ci[wi++]=Ei,Ci[wi++]=Ti,Ti=e,Ei=t}function Mi(e,t,n){F[Di++]=ki,F[Di++]=Ai,F[Di++]=Oi,Oi=e;var r=ki;e=Ai;var i=32-We(r)-1;r&=~(1<<i),n+=1;var a=32-We(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ki=1<<32-We(t)+i|n<<i|r,Ai=a+e}else ki=1<<a|n<<i|r,Ai=e}function Ni(e){e.return!==null&&(ji(e,1),Mi(e,1,0))}function Pi(e){for(;e===Ti;)Ti=Ci[--wi],Ci[wi]=null,Ei=Ci[--wi],Ci[wi]=null;for(;e===Oi;)Oi=F[--Di],F[Di]=null,Ai=F[--Di],F[Di]=null,ki=F[--Di],F[Di]=null}function Fi(e,t){F[Di++]=ki,F[Di++]=Ai,F[Di++]=Oi,ki=t.id,Ai=t.overflow,Oi=e}var Ii=null,I=null,L=!1,Li=null,Ri=!1,zi=Error(i(519));function Bi(e){throw Ki(Si(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),zi}function Vi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[pt]=e,t[mt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Kt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Xt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=on),t=!0):t=!1,t||Bi(e,!0)}function Hi(e){for(Ii=e.return;Ii;)switch(Ii.tag){case 5:case 31:case 13:Ri=!1;return;case 27:case 3:Ri=!0;return;default:Ii=Ii.return}}function Ui(e){if(e!==Ii)return!1;if(!L)return Hi(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&I&&Bi(e),Hi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else t===27?(t=I,Zd(e.type)?(e=lf,lf=null,I=e):I=t):I=Ii?cf(e.stateNode.nextSibling):null;return!0}function Wi(){I=Ii=null,L=!1}function Gi(){var e=Li;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Li=null),e}function Ki(e){Li===null?Li=[e]:Li.push(e)}var qi=ue(null),Ji=null,Yi=null;function Xi(e,t,n){j(qi,t._currentValue),t._currentValue=n}function Zi(e){e._currentValue=qi.current,de(qi)}function Qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function $i(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Qi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Qi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ea(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Dr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===he.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&$i(t,e,n,r),t.flags|=262144}function ta(e){for(e=e.firstContext;e!==null;){if(!Dr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function na(e){Ji=e,Yi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ra(e){return aa(Ji,e)}function ia(e,t){return Ji===null&&na(e),aa(e,t)}function aa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Yi===null){if(e===null)throw Error(i(308));Yi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Yi=Yi.next=t;return n}var oa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},sa=t.unstable_scheduleCallback,ca=t.unstable_NormalPriority,la={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ua(){return{controller:new oa,data:new Map,refCount:0}}function da(e){e.refCount--,e.refCount===0&&sa(ca,function(){e.controller.abort()})}var fa=null,pa=0,ma=0,ha=null;function ga(e,t){if(fa===null){var n=fa=[];pa=0,ma=dd(),ha={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return pa++,t.then(_a,_a),t}function _a(){if(--pa===0&&fa!==null){ha!==null&&(ha.status=`fulfilled`);var e=fa;fa=null,ma=0,ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function va(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ya=k.S;k.S=function(e,t){eu=Me(),typeof t==`object`&&t&&typeof t.then==`function`&&ga(e,t),ya!==null&&ya(e,t)};var ba=ue(null);function xa(){var e=ba.current;return e===null?q.pooledCache:e}function Sa(e,t){t===null?j(ba,ba.current):j(ba,t.pool)}function Ca(){var e=xa();return e===null?null:{parent:la._currentValue,pool:e}}var wa=Error(i(460)),Ta=Error(i(474)),Ea=Error(i(542)),Da={then:function(){}};function Oa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ka(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(on,on),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Na(e),e;default:if(typeof t.status==`string`)t.then(on,on);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Na(e),e}throw ja=t,wa}}function Aa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ja=e,wa):e}}var ja=null;function Ma(){if(ja===null)throw Error(i(459));var e=ja;return ja=null,e}function Na(e){if(e===wa||e===Ea)throw Error(i(483))}var Pa=null,Fa=0;function Ia(e){var t=Fa;return Fa+=1,Pa===null&&(Pa=[]),ka(Pa,e,t)}function La(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ra(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function za(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=vi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&Aa(i)===t.type)?(t=a(t,n.props),La(t,n),t.return=e,t):(t=gi(n.type,n.key,n.props,null,e.mode,r),La(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=bi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=_i(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=vi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=gi(t.type,t.key,t.props,null,e.mode,n),La(n,t),n.return=e,n;case v:return t=bi(t,e.mode,n),t.return=e,t;case D:return t=Aa(t),f(e,t,n)}if(oe(t)||re(t))return t=_i(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ia(t),n);if(t.$$typeof===C)return f(e,ia(e,t),n);Ra(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=Aa(n),p(e,t,n,r)}if(oe(n)||re(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ia(n),r);if(n.$$typeof===C)return p(e,t,ia(e,n),r);Ra(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=Aa(r),m(e,t,n,r,i)}if(oe(r)||re(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ia(r),i);if(r.$$typeof===C)return m(e,t,n,ia(t,r),i);Ra(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&ji(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return L&&ji(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&ji(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),L&&ji(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return L&&ji(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),L&&ji(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&Aa(l)===r.type){n(e,r.sibling),c=a(r,o.props),La(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=_i(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=gi(o.type,o.key,o.props,null,e.mode,c),La(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=bi(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=Aa(o),b(e,r,o,c)}if(oe(o))return h(e,r,o,c);if(re(o)){if(l=re(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ia(o),c);if(o.$$typeof===C)return b(e,r,ia(e,o),c);Ra(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=vi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Fa=0;var i=b(e,t,n,r);return Pa=null,i}catch(t){if(t===wa||t===Ea)throw t;var a=fi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ba=za(!0),Va=za(!1),Ha=!1;function Ua(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ga(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ka(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=li(e),ci(e,null,n),t}return P(e,r,t,n),li(e)}function qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}function Ja(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ya=!1;function Xa(){if(Ya){var e=ha;if(e!==null)throw e}}function Za(e,t,n,r){Ya=!1;var i=e.updateQueue;Ha=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===ma&&(Ya=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=m({},d,f);break a;case 2:Ha=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function R(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)R(n[e],t)}var $a=ue(null),eo=ue(0);function z(e,t){e=Ul,j(eo,e),j($a,t),Ul=e|t.baseLanes}function to(){j(eo,Ul),j($a,$a.current)}function no(){Ul=eo.current,de($a),de(eo)}var ro=ue(null),io=null;function ao(e){var t=e.alternate;j(B,B.current&1),j(ro,e),io===null&&(t===null||$a.current!==null||t.memoizedState!==null)&&(io=e)}function oo(e){j(B,B.current),j(ro,e),io===null&&(io=e)}function so(e){e.tag===22?(j(B,B.current),j(ro,e),io===null&&(io=e)):co(e)}function co(){j(B,B.current),j(ro,ro.current)}function lo(e){de(ro),io===e&&(io=null),de(B)}var B=ue(0);function uo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var fo=0,V=null,H=null,U=null,po=!1,mo=!1,ho=!1,go=0,_o=0,vo=null,yo=0;function bo(){throw Error(i(321))}function xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Dr(e[n],t[n]))return!1;return!0}function So(e,t,n,r,i,a){return fo=a,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,k.H=e===null||e.memoizedState===null?Rs:zs,ho=!1,a=n(r,i),ho=!1,mo&&(a=wo(t,n,r,i)),Co(e),a}function Co(e){k.H=Ls;var t=H!==null&&H.next!==null;if(fo=0,U=H=V=null,po=!1,_o=0,vo=null,t)throw Error(i(300));e===null||nc||(e=e.dependencies,e!==null&&ta(e)&&(nc=!0))}function wo(e,t,n,r){V=e;var a=0;do{if(mo&&(vo=null),_o=0,mo=!1,25<=a)throw Error(i(301));if(a+=1,U=H=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}k.H=Bs,o=t(n,r)}while(mo);return o}function To(){var e=k.H,t=e.useState()[0];return t=typeof t.then==`function`?Mo(t):t,e=e.useState()[0],(H===null?null:H.memoizedState)!==e&&(V.flags|=1024),t}function Eo(){var e=go!==0;return go=0,e}function Do(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Oo(e){if(po){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}po=!1}fo=0,U=H=V=null,mo=!1,_o=go=0,vo=null}function ko(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return U===null?V.memoizedState=U=e:U=U.next=e,U}function Ao(){if(H===null){var e=V.alternate;e=e===null?null:e.memoizedState}else e=H.next;var t=U===null?V.memoizedState:U.next;if(t!==null)U=t,H=e;else{if(e===null)throw V.alternate===null?Error(i(467)):Error(i(310));H=e,e={memoizedState:H.memoizedState,baseState:H.baseState,baseQueue:H.baseQueue,queue:H.queue,next:null},U===null?V.memoizedState=U=e:U=U.next=e}return U}function jo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mo(e){var t=_o;return _o+=1,vo===null&&(vo=[]),e=ka(vo,e,t),t=V,(U===null?t.memoizedState:U.next)===null&&(t=t.alternate,k.H=t===null||t.memoizedState===null?Rs:zs),e}function No(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Mo(e);if(e.$$typeof===C)return ra(e)}throw Error(i(438,String(e)))}function Po(e){var t=null,n=V.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=V.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=jo(),V.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Fo(e,t){return typeof t==`function`?t(e):t}function Io(e){return Lo(Ao(),H,e)}function Lo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(fo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ma&&(d=!0);else if((fo&p)===p){u=u.next,p===ma&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,V.lanes|=p,Gl|=p;f=u.action,ho&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,V.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Dr(o,e.memoizedState)&&(nc=!0,d&&(n=ha,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ro(e){var t=Ao(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Dr(o,t.memoizedState)||(nc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function zo(e,t,n){var r=V,a=Ao(),o=L;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Dr((H||a).memoizedState,n);if(s&&(a.memoizedState=n,nc=!0),a=a.queue,ls(Ho.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||U!==null&&U.memoizedState.tag&1){if(r.flags|=2048,is(9,{destroy:void 0},Vo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||fo&127||Bo(r,t,n)}return n}function Bo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t=jo(),V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vo(e,t,n,r){t.value=n,t.getSnapshot=r,Uo(t)&&Wo(e)}function Ho(e,t,n){return n(function(){Uo(t)&&Wo(e)})}function Uo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Dr(e,n)}catch{return!0}}function Wo(e){var t=si(e,2);t!==null&&hu(t,e,2)}function W(e){var t=ko();if(typeof e==`function`){var n=e;if(e=n(),ho){Ue(!0);try{n()}finally{Ue(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:e},t}function Go(e,t,n,r){return e.baseState=n,Lo(e,H,typeof r==`function`?r:Fo)}function Ko(e,t,n,r,a){if(Ps(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};k.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=k.T,o={};k.T=o;try{var s=n(i,r),c=k.S;c!==null&&c(o,s),Jo(e,t,s)}catch(n){Xo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),k.T=a}}else try{a=n(i,r),Jo(e,t,a)}catch(n){Xo(e,t,n)}}function Jo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Yo(e,t,n)},function(n){return Xo(e,t,n)}):Yo(e,t,n)}function Yo(e,t,n){t.status=`fulfilled`,t.value=n,Zo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,qo(e,n)))}function Xo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Zo(t),t=t.next;while(t!==r)}e.action=null}function Zo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Qo(e,t){return t}function $o(e,t){if(L){var n=q.formState;if(n!==null){a:{var r=V;if(L){if(I){b:{for(var i=I,a=Ri;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){I=cf(i.nextSibling),r=i.data===`F!`;break a}}Bi(r)}r=!1}r&&(t=n[0])}}return n=ko(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qo,lastRenderedState:t},n.queue=r,n=js.bind(null,V,r),r.dispatch=n,r=W(!1),a=Ns.bind(null,V,!1,r.queue),r=ko(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ko.bind(null,V,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function es(e){return ts(Ao(),H,e)}function ts(e,t,n){if(t=Lo(e,t,Qo)[0],e=Io(Fo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Mo(t)}catch(e){throw e===wa?Ea:e}else r=t;t=Ao();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(V.flags|=2048,is(9,{destroy:void 0},ns.bind(null,i,n),null)),[r,a,e]}function ns(e,t){e.action=t}function rs(e){var t=Ao(),n=H;if(n!==null)return ts(t,n,e);Ao(),t=t.memoizedState,n=Ao();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function is(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=V.updateQueue,t===null&&(t=jo(),V.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function as(){return Ao().memoizedState}function os(e,t,n,r){var i=ko();V.flags|=e,i.memoizedState=is(1|t,{destroy:void 0},n,r===void 0?null:r)}function ss(e,t,n,r){var i=Ao();r=r===void 0?null:r;var a=i.memoizedState.inst;H!==null&&r!==null&&xo(r,H.memoizedState.deps)?i.memoizedState=is(t,a,n,r):(V.flags|=e,i.memoizedState=is(1|t,a,n,r))}function cs(e,t){os(8390656,8,e,t)}function ls(e,t){ss(2048,8,e,t)}function us(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=jo(),V.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ds(e){var t=Ao().memoizedState;return us({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function fs(e,t){return ss(4,2,e,t)}function ps(e,t){return ss(4,4,e,t)}function ms(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function hs(e,t,n){n=n==null?null:n.concat([e]),ss(4,4,ms.bind(null,t,e),n)}function gs(){}function _s(e,t){var n=Ao();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function vs(e,t){var n=Ao();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&xo(t,r[1]))return r[0];if(r=e(),ho){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r}function ys(e,t,n){return n===void 0||fo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),V.lanes|=e,Gl|=e,n)}function bs(e,t,n,r){return Dr(n,t)?n:$a.current===null?!(fo&42)||fo&1073741824&&!(Y&261930)?(nc=!0,e.memoizedState=n):(e=mu(),V.lanes|=e,Gl|=e,t):(e=ys(e,n,r),Dr(e,t)||(nc=!0),e)}function xs(e,t,n,r,i){var a=A.p;A.p=a!==0&&8>a?a:8;var o=k.T,s={};k.T=s,Ns(e,!1,t,n);try{var c=i(),l=k.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ms(e,t,va(c,r),pu(e)):Ms(e,t,r,pu(e))}catch(n){Ms(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{A.p=a,o!==null&&s.types!==null&&(o.types=s.types),k.T=o}}function Ss(){}function Cs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ws(e).queue;xs(e,a,t,se,n===null?Ss:function(){return Ts(e),n(r)})}function ws(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:se},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ts(e){var t=ws(e);t.next===null&&(t=e.alternate.memoizedState),Ms(e,t.next.queue,{},pu())}function Es(){return ra(Qf)}function Ds(){return Ao().memoizedState}function Os(){return Ao().memoizedState}function ks(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ga(n);var r=Ka(t,e,n);r!==null&&(hu(r,t,n),qa(r,t,n)),t={cache:ua()},e.payload=t;return}t=t.return}}function As(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ps(e)?Fs(t,n):(n=oi(e,t,n,r),n!==null&&(hu(n,e,r),Is(n,t,r)))}function js(e,t,n){Ms(e,t,n,pu())}function Ms(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ps(e))Fs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Dr(s,o))return P(e,t,i,0),q===null&&ai(),!1}catch{}if(n=oi(e,t,i,r),n!==null)return hu(n,e,r),Is(n,t,r),!0}return!1}function Ns(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ps(e)){if(t)throw Error(i(479))}else t=oi(e,n,r,2),t!==null&&hu(t,e,2)}function Ps(e){var t=e.alternate;return e===V||t!==null&&t===V}function Fs(e,t){mo=po=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Is(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ot(e,n)}}var Ls={readContext:ra,use:No,useCallback:bo,useContext:bo,useEffect:bo,useImperativeHandle:bo,useLayoutEffect:bo,useInsertionEffect:bo,useMemo:bo,useReducer:bo,useRef:bo,useState:bo,useDebugValue:bo,useDeferredValue:bo,useTransition:bo,useSyncExternalStore:bo,useId:bo,useHostTransitionStatus:bo,useFormState:bo,useActionState:bo,useOptimistic:bo,useMemoCache:bo,useCacheRefresh:bo};Ls.useEffectEvent=bo;var Rs={readContext:ra,use:No,useCallback:function(e,t){return ko().memoizedState=[e,t===void 0?null:t],e},useContext:ra,useEffect:cs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),os(4194308,4,ms.bind(null,t,e),n)},useLayoutEffect:function(e,t){return os(4194308,4,e,t)},useInsertionEffect:function(e,t){os(4,2,e,t)},useMemo:function(e,t){var n=ko();t=t===void 0?null:t;var r=e();if(ho){Ue(!0);try{e()}finally{Ue(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ko();if(n!==void 0){var i=n(t);if(ho){Ue(!0);try{n(t)}finally{Ue(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=As.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=ko();return e={current:e},t.memoizedState=e},useState:function(e){e=W(e);var t=e.queue,n=js.bind(null,V,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:gs,useDeferredValue:function(e,t){return ys(ko(),e,t)},useTransition:function(){var e=W(!1);return e=xs.bind(null,V,e.queue,!0,!1),ko().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=V,a=ko();if(L){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||Bo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,cs(Ho.bind(null,r,o,e),[e]),r.flags|=2048,is(9,{destroy:void 0},Vo.bind(null,r,o,n,t),null),n},useId:function(){var e=ko(),t=q.identifierPrefix;if(L){var n=Ai,r=ki;n=(r&~(1<<32-We(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=yo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Es,useFormState:$o,useActionState:$o,useOptimistic:function(e){var t=ko();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ns.bind(null,V,!0,n),n.dispatch=t,[e,t]},useMemoCache:Po,useCacheRefresh:function(){return ko().memoizedState=ks.bind(null,V)},useEffectEvent:function(e){var t=ko(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},zs={readContext:ra,use:No,useCallback:_s,useContext:ra,useEffect:ls,useImperativeHandle:hs,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:vs,useReducer:Io,useRef:as,useState:function(){return Io(Fo)},useDebugValue:gs,useDeferredValue:function(e,t){return bs(Ao(),H.memoizedState,e,t)},useTransition:function(){var e=Io(Fo)[0],t=Ao().memoizedState;return[typeof e==`boolean`?e:Mo(e),t]},useSyncExternalStore:zo,useId:Ds,useHostTransitionStatus:Es,useFormState:es,useActionState:es,useOptimistic:function(e,t){return Go(Ao(),H,e,t)},useMemoCache:Po,useCacheRefresh:Os};zs.useEffectEvent=ds;var Bs={readContext:ra,use:No,useCallback:_s,useContext:ra,useEffect:ls,useImperativeHandle:hs,useInsertionEffect:fs,useLayoutEffect:ps,useMemo:vs,useReducer:Ro,useRef:as,useState:function(){return Ro(Fo)},useDebugValue:gs,useDeferredValue:function(e,t){var n=Ao();return H===null?ys(n,e,t):bs(n,H.memoizedState,e,t)},useTransition:function(){var e=Ro(Fo)[0],t=Ao().memoizedState;return[typeof e==`boolean`?e:Mo(e),t]},useSyncExternalStore:zo,useId:Ds,useHostTransitionStatus:Es,useFormState:rs,useActionState:rs,useOptimistic:function(e,t){var n=Ao();return H===null?(n.baseState=e,[e,n.queue.dispatch]):Go(n,H,e,t)},useMemoCache:Po,useCacheRefresh:Os};Bs.useEffectEvent=ds;function Vs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:m({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Hs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ga(r);i.payload=t,n!=null&&(i.callback=n),t=Ka(e,i,r),t!==null&&(hu(t,e,r),qa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ga(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ka(e,i,r),t!==null&&(hu(t,e,r),qa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ga(n);r.tag=2,t!=null&&(r.callback=t),t=Ka(e,r,n),t!==null&&(hu(t,e,n),qa(t,e,n))}};function Us(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Or(n,r)||!Or(i,a):!0}function Ws(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Hs.enqueueReplaceState(t,t.state,null)}function Gs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=m({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ks(e){ti(e)}function qs(e){console.error(e)}function Js(e){ti(e)}function Ys(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Zs(e,t,n){return n=Ga(n),n.tag=3,n.payload={element:null},n.callback=function(){Ys(e,t)},n}function Qs(e){return e=Ga(e),e.tag=3,e}function $s(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Xs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Xs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ec(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ea(t,n,a,!0),n=ro.current,n!==null){switch(n.tag){case 31:case 13:return io===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Da?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Da?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(L)return t=ro.current,t===null?(r!==zi&&(t=Error(i(423),{cause:r}),Ki(Si(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Si(r,n),a=Zs(e.stateNode,r,a),Ja(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==zi&&(e=Error(i(422),{cause:r}),Ki(Si(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Si(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=Si(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Zs(n.stateNode,r,e),Ja(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Qs(a),$s(a,e,n,r),Ja(n,a),!1}n=n.return}while(n!==null);return!1}var tc=Error(i(461)),nc=!1;function rc(e,t,n,r){t.child=e===null?Va(t,null,n,r):Ba(t,e.child,n,r)}function ic(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return na(t),r=So(e,t,n,o,a,i),s=Eo(),e!==null&&!nc?(Do(e,t,i),Oc(e,t,i)):(L&&s&&Ni(t),t.flags|=1,rc(e,t,r,i),t.child)}function ac(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!pi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,oc(e,t,a,r,i)):(e=gi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!kc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Or:n,n(o,r)&&e.ref===t.ref)return Oc(e,t,i)}return t.flags|=1,e=mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function oc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Or(a,r)&&e.ref===t.ref)if(nc=!1,t.pendingProps=r=a,kc(e,i))e.flags&131072&&(nc=!0);else return t.lanes=e.lanes,Oc(e,t,i)}return mc(e,t,n,r,i)}function sc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return lc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Sa(t,a===null?null:a.cachePool),a===null?to():z(t,a),so(t);else return r=t.lanes=536870912,lc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Sa(t,null),to(),co(t)):(Sa(t,a.cachePool),z(t,a),co(t),t.memoizedState=null);return rc(e,t,i,n),t.child}function cc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function lc(e,t,n,r,i){var a=xa();return a=a===null?null:{parent:la._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Sa(t,null),to(),so(t),e!==null&&ea(e,t,r,!0),t.childLanes=i,null}function uc(e,t){return t=Cc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function dc(e,t,n){return Ba(t,e.child,null,n),e=uc(t,t.pendingProps),e.flags|=2,lo(t),t.memoizedState=null,e}function fc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(L){if(r.mode===`hidden`)return e=uc(t,r),t.lanes=536870912,cc(null,e);if(oo(t),(e=I)?(e=rf(e,Ri),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Oi===null?null:{id:ki,overflow:Ai},retryLane:536870912,hydrationErrors:null},n=yi(e),n.return=t,t.child=n,Ii=t,I=null)):e=null,e===null)throw Bi(t);return t.lanes=536870912,null}return uc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(oo(t),a)if(t.flags&256)t.flags&=-257,t=dc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(nc||ea(e,t,n,!1),a=(n&e.childLanes)!==0,nc||a){if(r=q,r!==null&&(s=st(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,si(e,s),hu(r,e,s),tc;Du(),t=dc(e,t,n)}else e=o.treeContext,I=cf(s.nextSibling),Ii=t,L=!0,Li=null,Ri=!1,e!==null&&Fi(t,e),t=uc(t,r),t.flags|=4096;return t}return e=mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function pc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function mc(e,t,n,r,i){return na(t),n=So(e,t,n,r,void 0,i),r=Eo(),e!==null&&!nc?(Do(e,t,i),Oc(e,t,i)):(L&&r&&Ni(t),t.flags|=1,rc(e,t,n,i),t.child)}function hc(e,t,n,r,i,a){return na(t),t.updateQueue=null,n=wo(t,r,n,i),Co(e),r=Eo(),e!==null&&!nc?(Do(e,t,a),Oc(e,t,a)):(L&&r&&Ni(t),t.flags|=1,rc(e,t,n,a),t.child)}function gc(e,t,n,r,i){if(na(t),t.stateNode===null){var a=ui,o=n.contextType;typeof o==`object`&&o&&(a=ra(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Hs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ua(t),o=n.contextType,a.context=typeof o==`object`&&o?ra(o):ui,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Vs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Hs.enqueueReplaceState(a,a.state,null),Za(t,r,a,i),Xa(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Gs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ui,typeof u==`object`&&u&&(o=ra(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ws(t,a,r,o),Ha=!1;var f=t.memoizedState;a.state=f,Za(t,r,a,i),Xa(),l=t.memoizedState,s||f!==l||Ha?(typeof d==`function`&&(Vs(t,n,d,r),l=t.memoizedState),(c=Ha||Us(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Wa(e,t),o=t.memoizedProps,u=Gs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ui,typeof l==`object`&&l&&(c=ra(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ws(t,a,r,c),Ha=!1,f=t.memoizedState,a.state=f,Za(t,r,a,i),Xa();var p=t.memoizedState;o!==d||f!==p||Ha||e!==null&&e.dependencies!==null&&ta(e.dependencies)?(typeof s==`function`&&(Vs(t,n,s,r),p=t.memoizedState),(u=Ha||Us(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ta(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,pc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ba(t,e.child,null,i),t.child=Ba(t,null,n,i)):rc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Oc(e,t,i),e}function _c(e,t,n,r){return Wi(),t.flags|=256,rc(e,t,n,r),t.child}var vc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function yc(e){return{baseLanes:e,cachePool:Ca()}}function bc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function xc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(B.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(L){if(a?ao(t):co(t),(e=I)?(e=rf(e,Ri),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Oi===null?null:{id:ki,overflow:Ai},retryLane:536870912,hydrationErrors:null},n=yi(e),n.return=t,t.child=n,Ii=t,I=null)):e=null,e===null)throw Bi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(co(t),a=t.mode,c=Cc({mode:`hidden`,children:c},a),r=_i(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=yc(n),r.childLanes=bc(e,s,n),t.memoizedState=vc,cc(null,r)):(ao(t),Sc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(ao(t),t.flags&=-257,t=wc(e,t,n)):t.memoizedState===null?(co(t),c=r.fallback,a=t.mode,r=Cc({mode:`visible`,children:r.children},a),c=_i(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ba(t,e.child,null,n),r=t.child,r.memoizedState=yc(n),r.childLanes=bc(e,s,n),t.memoizedState=vc,t=cc(null,r)):(co(t),t.child=e.child,t.flags|=128,t=null);else if(ao(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ki({value:r,source:null,stack:null}),t=wc(e,t,n)}else if(nc||ea(e,t,n,!1),s=(n&e.childLanes)!==0,nc||s){if(s=q,s!==null&&(r=st(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,si(e,r),hu(s,e,r),tc;af(c)||Du(),t=wc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,I=cf(c.nextSibling),Ii=t,L=!0,Li=null,Ri=!1,e!==null&&Fi(t,e),t=Sc(t,r.children),t.flags|=4096);return t}return a?(co(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=mi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=_i(c,a,n,null),c.flags|=2):c=mi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,cc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=yc(n):(a=c.cachePool,a===null?a=Ca():(l=la._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=bc(e,s,n),t.memoizedState=vc,cc(e.child,r)):(ao(t),n=e.child,e=n.sibling,n=mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Sc(e,t){return t=Cc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Cc(e,t){return e=fi(22,e,null,t),e.lanes=0,e}function wc(e,t,n){return Ba(t,e.child,null,n),e=Sc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Tc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qi(e.return,t,n)}function Ec(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Dc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=B.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,j(B,o),rc(e,t,r,n),r=L?Ei:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Tc(e,n,t);else if(e.tag===19)Tc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&uo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ec(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&uo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ec(t,!0,n,null,a,r);break;case`together`:Ec(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Oc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(ea(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function kc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ta(e))):!0}function Ac(e,t,n){switch(t.tag){case 3:ge(t,t.stateNode.containerInfo),Xi(t,la,e.memoizedState.cache),Wi();break;case 27:case 5:ve(t);break;case 4:ge(t,t.stateNode.containerInfo);break;case 10:Xi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,oo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(ao(t),e=Oc(e,t,n),e===null?null:e.sibling):xc(e,t,n):(ao(t),t.flags|=128,null);ao(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(ea(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Dc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),j(B,B.current),r)break;return null;case 22:return t.lanes=0,sc(e,t,n,t.pendingProps);case 24:Xi(t,la,e.memoizedState.cache)}return Oc(e,t,n)}function jc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)nc=!0;else{if(!kc(e,n)&&!(t.flags&128))return nc=!1,Ac(e,t,n);nc=!!(e.flags&131072)}else nc=!1,L&&t.flags&1048576&&Mi(t,Ei,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Aa(t.elementType),t.type=e,typeof e==`function`)pi(e)?(r=Gs(e,r),t.tag=1,t=gc(null,t,e,r,n)):(t.tag=0,t=mc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=ic(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=ac(null,t,e,r,n);break a}}throw t=ae(e)||e,Error(i(306,t,``))}}return t;case 0:return mc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Gs(r,t.pendingProps),gc(e,t,r,a,n);case 3:a:{if(ge(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Wa(e,t),Za(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Xi(t,la,r),r!==o.cache&&$i(t,[la],n,!0),Xa(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=_c(e,t,r,n);break a}else if(r!==a){a=Si(Error(i(424)),t),Ki(a),t=_c(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(I=cf(e.firstChild),Ii=t,L=!0,Li=null,Ri=!0,n=Va(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Wi(),r===a){t=Oc(e,t,n);break a}rc(e,t,r,n)}t=t.child}return t;case 26:return pc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(n=t.type,e=t.pendingProps,r=Bd(me.current).createElement(n),r[pt]=t,r[mt]=e,Pd(r,n,e),Et(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ve(t),e===null&&L&&(r=t.stateNode=ff(t.type,t.pendingProps,me.current),Ii=t,Ri=!0,a=I,Zd(t.type)?(lf=a,I=cf(r.firstChild)):I=a),rc(e,t,t.pendingProps.children,n),pc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((a=r=I)&&(r=tf(r,t.type,t.pendingProps,Ri),r===null?a=!1:(t.stateNode=r,Ii=t,I=cf(r.firstChild),Ri=!1,a=!0)),a||Bi(t)),ve(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=So(e,t,To,null,null,n),Qf._currentValue=a),pc(e,t),rc(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=I)&&(n=nf(n,t.pendingProps,Ri),n===null?e=!1:(t.stateNode=n,Ii=t,I=null,e=!0)),e||Bi(t)),null;case 13:return xc(e,t,n);case 4:return ge(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ba(t,null,r,n):rc(e,t,r,n),t.child;case 11:return ic(e,t,t.type,t.pendingProps,n);case 7:return rc(e,t,t.pendingProps,n),t.child;case 8:return rc(e,t,t.pendingProps.children,n),t.child;case 12:return rc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Xi(t,t.type,r.value),rc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,na(t),a=ra(a),r=r(a),t.flags|=1,rc(e,t,r,n),t.child;case 14:return ac(e,t,t.type,t.pendingProps,n);case 15:return oc(e,t,t.type,t.pendingProps,n);case 19:return Dc(e,t,n);case 31:return fc(e,t,n);case 22:return sc(e,t,n,t.pendingProps);case 24:return na(t),r=ra(la),e===null?(a=xa(),a===null&&(a=q,o=ua(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ua(t),Xi(t,la,a)):((e.lanes&n)!==0&&(Wa(e,t),Za(t,null,null,n),Xa()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Xi(t,la,r),r!==a.cache&&$i(t,[la],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Xi(t,la,r))),rc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Mc(e){e.flags|=4}function Nc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw ja=Da,Ta}else e.flags&=-16777217}function Pc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw ja=Da,Ta}function Fc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:tt(),e.lanes|=t,Yl|=t)}function Ic(e,t){if(!L)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function G(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(Pi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return G(t),null;case 1:return G(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Zi(la),_e(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ui(t)?Mc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Gi())),G(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Mc(t),o===null?(G(t),Nc(t,a,null,r,n)):(G(t),Pc(t,o))):o?o===e.memoizedState?(G(t),t.flags&=-16777217):(Mc(t),G(t),Pc(t,o)):(e=e.memoizedProps,e!==r&&Mc(t),G(t),Nc(t,a,e,r,n)),null;case 27:if(ye(t),n=me.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),null}e=fe.current,Ui(t)?Vi(t,e):(e=ff(a,r,n),t.stateNode=e,Mc(t))}return G(t),null;case 5:if(ye(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),null}if(o=fe.current,Ui(t))Vi(t,o);else{var s=Bd(me.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[pt]=t,o[mt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Mc(t)}}return G(t),Nc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Mc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=me.current,Ui(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ii,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[pt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Bi(t,!0)}else e=Bd(e).createTextNode(r),e[pt]=t,t.stateNode=e}return G(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ui(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[pt]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),e=!1}else n=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(lo(t),t):(lo(t),null);if(t.flags&128)throw Error(i(558))}return G(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ui(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[pt]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),a=!1}else a=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(lo(t),t):(lo(t),null)}return lo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Fc(t,t.updateQueue),G(t),null);case 4:return _e(),e===null&&Sd(t.stateNode.containerInfo),G(t),null;case 10:return Zi(t.type),G(t),null;case 19:if(de(B),r=t.memoizedState,r===null)return G(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Ic(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=uo(e),o!==null){for(t.flags|=128,Ic(r,!1),e=o.updateQueue,t.updateQueue=e,Fc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)hi(n,e),n=n.sibling;return j(B,B.current&1|2),L&&ji(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Me()>tu&&(t.flags|=128,a=!0,Ic(r,!1),t.lanes=4194304)}else{if(!a)if(e=uo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Fc(t,e),Ic(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!L)return G(t),null}else 2*Me()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Ic(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(G(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Me(),e.sibling=null,n=B.current,j(B,a?n&1|2:n&1),L&&ji(t,r.treeForkCount),e);case 22:case 23:return lo(t),no(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(G(t),t.subtreeFlags&6&&(t.flags|=8192)):G(t),n=t.updateQueue,n!==null&&Fc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&de(ba),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Zi(la),G(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(Pi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Zi(la),_e(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ye(t),null;case 31:if(t.memoizedState!==null){if(lo(t),t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(lo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return de(B),null;case 4:return _e(),null;case 10:return Zi(t.type),null;case 22:case 23:return lo(t),no(),e!==null&&de(ba),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Zi(la),null;case 25:return null;default:return null}}function zc(e,t){switch(Pi(t),t.tag){case 3:Zi(la),_e();break;case 26:case 27:case 5:ye(t);break;case 4:_e();break;case 31:t.memoizedState!==null&&lo(t);break;case 13:lo(t);break;case 19:de(B);break;case 10:Zi(t.type);break;case 22:case 23:lo(t),no(),e!==null&&de(ba);break;case 24:Zi(la)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qa(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Gs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[mt]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=on));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[pt]=e,t[mt]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=Mr(e),Nr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Gs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Gs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(He&&typeof He.onCommitFiberUnmount==`function`)try{He.onCommitFiberUnmount(Ve,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[bt]||o[pt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[pt]=e,Et(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[pt]=e,Et(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{Zt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Me()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Zt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)R(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&da(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&da(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&da(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:da(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=ra(la),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ra(la).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:k.T===null?ut():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||L){var e=Ye;Ye<<=1,!(Ye&3932160)&&(Ye=262144),Jl=e}else Jl=536870912;return e=ro.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),rt(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||$e(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Me(),10<a)){if(yu(r,t,Jl,!Bl),Qe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:on},jl(t,a,d);var m=(a&62914560)===a?$l-Me():(a&4194048)===a?eu-Me():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Dr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-We(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&at(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Yi=Ji=null,Oo(e),Pa=null,Fa=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=mi(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=$e(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-We(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,ai(),n}function Cu(e,t){V=null,k.H=Ls,t===wa||t===Ea?(t=Ma(),X=3):t===Ta?(t=Ma(),X=4):X=t===tc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Ys(e,Si(t,e.current)))}function wu(){var e=ro.current;return e===null?!0:(Y&4194048)===Y?io===null:(Y&62914560)===Y||Y&536870912?e===io:!1}function Tu(){var e=k.H;return k.H=Ls,e===null?Ls:e}function Eu(){var e=k.A;return k.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&ro.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:ro.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Yi=Ji=null,K=r,k.H=i,k.A=a,J===null&&(q=null,Y=0,ai()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Me()+500,Su(e,t)):Vl=$e(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Oa(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Oa(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Yi=Ji=null,k.H=r,k.A=a,K=n,J===null?(q=null,Y=0,ai(),Wl):0}function ju(){for(;J!==null&&!Ae();)Mu(J)}function Mu(e){var t=jc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=hc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=hc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Oo(t);default:zc(n,t),t=J=hi(t,Ul),t=jc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Yi=Ji=null,Oo(t),Pa=null,Fa=0;var i=t.return;try{if(ec(e,i,t,n,Y)){Wl=1,Ys(e,Si(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Ys(e,Si(n,e.current)),J=null;return}t.flags&32768?(L||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=ro.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ii,it(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ie,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=k.T,k.T=null,a=A.p,A.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,A.p=a,k.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Mr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&jr(s.ownerDocument.documentElement,s)){if(c!==null&&Nr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Ar(s,h),v=Ar(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,A.p=r,k.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,A.p=r,k.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,je();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),lt(n),t=t.stateNode,He&&typeof He.onCommitFiberRoot==`function`)try{He.onCommitFiberRoot(Ve,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=k.T,i=A.p,A.p=2,k.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{k.T=t,A.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,da(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=lt(su),r=k.T,a=A.p;try{A.p=32>n?32:n,k.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),He&&typeof He.onPostCommitFiberRoot==`function`)try{He.onPostCommitFiberRoot(Ve,o)}catch{}return!0}finally{A.p=a,k.T=r,Vu(e,t)}}function Wu(e,t,n){t=Si(n,t),t=Zs(e.stateNode,t,2),e=Ka(e,t,2),e!==null&&(rt(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=Si(n,e),n=Qs(2),r=Ka(t,n,2),r!==null&&($s(n,r,t,e),rt(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Me()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=tt()),e=si(e,t),e!==null&&(rt(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Oe(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-We(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Qe(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||$e(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Me(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-We(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=et(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ke(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||$e(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ke(r),lt(n)){case 2:case 8:n=Fe;break;case 32:n=Ie;break;case 268435456:n=Re;break;default:n=Ie}return r=cd.bind(null,e),n=Oe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ke(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Qe(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Me()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Oe(Pe,ad):od()})}function dd(){if(nd===0){var e=ma;e===0&&(e=Je,Je<<=1,!(Je&261888)&&(Je=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:an(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[mt]||null).action),o=r.submitter;o&&(t=(t=o[mt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Dn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Cs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Cs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<$r.length;hd++){var gd=$r[hd];ei(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ei(Gr,`onAnimationEnd`),ei(Kr,`onAnimationIteration`),ei(qr,`onAnimationStart`),ei(`dblclick`,`onDoubleClick`),ei(`focusin`,`onFocus`),ei(`focusout`,`onBlur`),ei(Jr,`onTransitionRun`),ei(Yr,`onTransitionStart`),ei(Xr,`onTransitionCancel`),ei(Zr,`onTransitionEnd`),At(`onMouseEnter`,[`mouseout`,`mouseover`]),At(`onMouseLeave`,[`mouseout`,`mouseover`]),At(`onPointerEnter`,[`pointerout`,`pointerover`]),At(`onPointerLeave`,[`pointerout`,`pointerover`]),kt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),kt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),kt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),kt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),kt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ti(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[gt];n===void 0&&(n=t[gt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Dt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!gn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}pn(function(){var r=a,i=cn(n),s=[];a:{var c=Qr.get(e);if(c!==void 0){var l=Dn,u=e;switch(e){case`keypress`:if(Sn(n)===0)break a;case`keydown`:case`keyup`:l=Wn;break;case`focusin`:u=`focus`,l=Fn;break;case`focusout`:u=`blur`,l=Fn;break;case`beforeblur`:case`afterblur`:l=Fn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Nn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Pn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Kn;break;case Gr:case Kr:case qr:l=In;break;case Zr:l=qn;break;case`scroll`:case`scrollend`:l=kn;break;case`wheel`:l=Jn;break;case`copy`:case`cut`:case`paste`:l=Ln;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Gn;break;case`toggle`:case`beforetoggle`:l=Yn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=mn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==sn&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[ht]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?St(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Nn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Gn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:wt(l),h=u==null?c:wt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=hr;else if(lr(c))if(gr)v=Tr;else{v=Cr;var y=Sr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&tn(r.elementType)&&(v=hr):v=wr;if(v&&=v(e,r)){ur(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&qt(c,`number`,c.value)}switch(y=r?wt(r):window,e){case`focusin`:(lr(y)||y.contentEditable===`true`)&&(Fr=y,Ir=r,Lr=null);break;case`focusout`:Lr=Ir=Fr=null;break;case`mousedown`:Rr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Rr=!1,zr(s,n,i);break;case`selectionchange`:if(Pr)break;case`keydown`:case`keyup`:zr(s,n,i)}var b;if(Zn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ar?rr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(er&&n.locale!==`ko`&&(ar||x!==`onCompositionStart`?x===`onCompositionEnd`&&ar&&(b=xn()):(vn=i,yn=`value`in vn?vn.value:vn.textContent,ar=!0)),y=Ed(r,x),0<y.length&&(x=new Rn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=ir(n),b!==null&&(x.data=b)))),(b=$n?or(e,n):sr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Rn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=mn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=mn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=mn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=mn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Zt(e,``+r);break;case`className`:It(e,`class`,r);break;case`tabIndex`:It(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:It(e,n,r);break;case`style`:en(e,r,o);break;case`data`:if(t!==`object`){It(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=an(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=on);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=an(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ft(e,`popover`,r);break;case`xlinkActuate`:M(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:M(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:M(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:M(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:M(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:M(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:M(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:M(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:M(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ft(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=nn.get(n)||n,Ft(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:en(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Zt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Zt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=on);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ot.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[mt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ft(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Kt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Jt(e,!!r,n,!0):Jt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Xt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(tn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Gt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Jt(e,!!n,n?[]:``,!1):Jt(e,!!n,t,!0)):Jt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Yt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(tn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[bt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[bt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=A.d;A.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?Ts(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Wt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Wt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Wt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Wt(n.imageSizes)+`"]`)):i+=`[href="`+Wt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=m({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Wt(r)+`"][href="`+Wt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=m({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Tt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=m({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Et(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Tt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Et(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=me.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Tt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Tt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Wt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Et(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Wt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Wt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Et(a),a):(r=n,(a=mf.get(o))&&(r=m({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[bt]||a[pt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nt(0),this.hiddenUpdates=nt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=fi(3,null,null,t),e.current=a,a.stateNode=e,t=ua(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ua(a),e}function tp(e){return e?(e=ui,e):ui}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ga(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ka(e,r,t),n!==null&&(hu(n,e,t),qa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=si(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=ct(t);var n=si(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=2,up(e,t,n,r)}finally{A.p=a,k.T=i}}function lp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=8,up(e,t,n,r)}finally{A.p=a,k.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-We(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Me()+500,id(0,!1))}}break;case 31:case 13:s=si(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=cn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ne()){case Pe:return 2;case Fe:return 8;case Ie:case Le:return 32;case Re:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,dt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);sn=r,n.target.dispatchEvent(r),sn=null}else return t=Ct(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Cs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[mt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[mt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ht]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ut();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));A.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:k,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ve=zp.inject(Rp),He=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ks,s=qs,c=Js;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ht]=t.current,Sd(e),new Fp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=`modulepreload`,y=function(e){return`/zingbite/`+e},b={},x=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=y(t,n),t in b)return;b[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:v,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},S=l(d(),1),C=`popstate`;function w(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ne(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:O(t)}return ie(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function te(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ne(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?re(t):t,state:n,key:t&&t.key||r||D(),mask:i}}function O({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function re(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ie(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u()+1;let d=te(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u();let i=te(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ae(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ae(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),T(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:O(t);return i=i.replace(/ $/,`%20`),!n&&i.startsWith(`//`)&&(i=r+i),new URL(i,r)}function oe(e,t,n=`/`){return k(e,t,n,!1)}function k(e,t,n,r,i){let a=Ce((typeof t==`string`?re(t):t).pathname||`/`,n);if(a==null)return null;let o=i??se(e),s=null,c=Se(a);for(let e=0;s==null&&e<o.length;++e)s=ye(o[e],c,r);return s}function A(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function se(e){let t=ce(e);return ue(t),t}function ce(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Me([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ce(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:_e(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of le(e.path))a(e,t,!0,n)}),t}function le(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=le(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ue(e){e.sort((e,t)=>e.score===t.score?ve(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var de=/^:[\w-]+$/,j=3,fe=2,pe=1,me=10,he=-2,ge=e=>e===`*`;function _e(e,t){let n=e.split(`/`),r=n.length;return n.some(ge)&&(r+=he),t&&(r+=fe),n.filter(e=>!ge(e)).reduce((e,t)=>e+(de.test(t)?j:t===``?pe:me),r)}function ve(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ye(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Me([a,u.pathname]),pathnameBase:Pe(Me([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Me([a,u.pathnameBase]))}return o}function be(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xe(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function xe(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Se(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ce(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var we=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Te(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?re(e):e,a;return n?(n=je(n),a=n.startsWith(`/`)?Ee(n.substring(1),`/`):Ee(n,t)):a=t,{pathname:a,search:Fe(r),hash:Ie(i)}}function Ee(e,t){let n=Ne(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function De(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Oe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ke(e){let t=Oe(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ae(e,t,n,r=!1){let i;typeof e==`string`?i=re(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),De(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),De(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),De(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Te(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var je=e=>e.replace(/\/\/+/g,`/`),Me=e=>je(e.join(`/`)),Ne=e=>e.replace(/\/+$/,``),Pe=e=>Ne(e).replace(/^\/*/,`/`),Fe=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ie=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Le=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Re(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function ze(e){return Me(e.map(e=>e.route.path).filter(Boolean))||`/`}var Be=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ve(e,t){let n=e;if(typeof n!=`string`||!we.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Be)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=Ce(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var He=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(He);var Ue=[`GET`,...He];new Set(Ue);var We=S.createContext(null);We.displayName=`DataRouter`;var Ge=S.createContext(null);Ge.displayName=`DataRouterState`;var Ke=S.createContext(!1);function qe(){return S.useContext(Ke)}var Je=S.createContext({isTransitioning:!1});Je.displayName=`ViewTransition`;var Ye=S.createContext(new Map);Ye.displayName=`Fetchers`;var Xe=S.createContext(null);Xe.displayName=`Await`;var Ze=S.createContext(null);Ze.displayName=`Navigation`;var Qe=S.createContext(null);Qe.displayName=`Location`;var $e=S.createContext({outlet:null,matches:[],isDataRoute:!1});$e.displayName=`Route`;var et=S.createContext(null);et.displayName=`RouteError`;var tt=`REACT_ROUTER_ERROR`,nt=`REDIRECT`,rt=`ROUTE_ERROR_RESPONSE`;function it(e){if(e.startsWith(`${tt}:${nt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function at(e){if(e.startsWith(`${tt}:${rt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Le(t.status,t.statusText,t.data)}catch{}}function ot(e,{relative:t}={}){T(st(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=S.useContext(Ze),{hash:i,pathname:a,search:o}=mt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Me([n,a])),r.createHref({pathname:s,search:o,hash:i})}function st(){return S.useContext(Qe)!=null}function ct(){return T(st(),`useLocation() may be used only in the context of a <Router> component.`),S.useContext(Qe).location}var lt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ut(e){S.useContext(Ze).static||S.useLayoutEffect(e)}function dt(){let{isDataRoute:e}=S.useContext($e);return e?Nt():ft()}function ft(){T(st(),`useNavigate() may be used only in the context of a <Router> component.`);let e=S.useContext(We),{basename:t,navigator:n}=S.useContext(Ze),{matches:r}=S.useContext($e),{pathname:i}=ct(),a=JSON.stringify(ke(r)),o=S.useRef(!1);return ut(()=>{o.current=!0}),S.useCallback((r,s={})=>{if(E(o.current,lt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ae(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Me([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}S.createContext(null);function pt(){let{matches:e}=S.useContext($e);return e[e.length-1]?.params??{}}function mt(e,{relative:t}={}){let{matches:n}=S.useContext($e),{pathname:r}=ct(),i=JSON.stringify(ke(n));return S.useMemo(()=>Ae(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function ht(e,t){return gt(e,t)}function gt(e,t,n){T(st(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=S.useContext(Ze),{matches:i}=S.useContext($e),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Ft(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ct(),d;if(t){let e=typeof t==`string`?re(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):oe(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Ct(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Me([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Me([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?S.createElement(Qe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function _t(){let e=Mt(),t=Re(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=S.createElement(S.Fragment,null,S.createElement(`p`,null,`💿 Hey developer 👋`),S.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,S.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,S.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),S.createElement(S.Fragment,null,S.createElement(`h2`,null,`Unexpected Application Error!`),S.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?S.createElement(`pre`,{style:i},n):null,o)}var vt=S.createElement(_t,null),yt=class extends S.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=at(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:S.createElement($e.Provider,{value:this.props.routeContext},S.createElement(et.Provider,{value:e,children:this.props.component}));return this.context?S.createElement(xt,{error:e},t):t}};yt.contextType=Ke;var bt=new WeakMap;function xt({children:e,error:t}){let{basename:n}=S.useContext(Ze);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=it(t.digest);if(e){let r=bt.get(t);if(r)throw r;let i=Ve(e.location,n);if(Be&&!bt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bt.set(t,n),n}return S.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function St({routeContext:e,match:t,children:n}){let r=S.useContext(We);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),S.createElement($e.Provider,{value:e},n)}function Ct(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:ze(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||vt,o&&(s<0&&c===0?(Ft(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?S.createElement(n.route.Component,null):n.route.element?n.route.element:e,S.createElement(St,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?S.createElement(yt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function wt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tt(e){let t=S.useContext(We);return T(t,wt(e)),t}function Et(e){let t=S.useContext(Ge);return T(t,wt(e)),t}function Dt(e){let t=S.useContext($e);return T(t,wt(e)),t}function Ot(e){let t=Dt(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function kt(){return Ot(`useRouteId`)}function At(){let e=Et(`useNavigation`);return S.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function jt(){let{matches:e,loaderData:t}=Et(`useMatches`);return S.useMemo(()=>e.map(e=>A(e,t)),[e,t])}function Mt(){let e=S.useContext(et),t=Et(`useRouteError`),n=Ot(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Nt(){let{router:e}=Tt(`useNavigate`),t=Ot(`useNavigate`),n=S.useRef(!1);return ut(()=>{n.current=!0}),S.useCallback(async(r,i={})=>{E(n.current,lt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Pt={};function Ft(e,t,n){!t&&!Pt[e]&&(Pt[e]=!0,E(!1,n))}S.memo(It);function It({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return gt(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function M(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Lt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){T(!st(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=S.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=re(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=S.useMemo(()=>{let e=Ce(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:S.createElement(Ze.Provider,{value:c},S.createElement(Qe.Provider,{children:t,value:h}))}function Rt({children:e,location:t}){return ht(zt(e),t)}S.Component;function zt(e,t=[]){let n=[];return S.Children.forEach(e,(e,r)=>{if(!S.isValidElement(e))return;let i=[...t,r];if(e.type===S.Fragment){n.push.apply(n,zt(e.props.children,i));return}T(e.type===M,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=zt(e.props.children,i)),n.push(a)}),n}var Bt=`get`,Vt=`application/x-www-form-urlencoded`;function Ht(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Ut(e){return Ht(e)&&e.tagName.toLowerCase()===`button`}function Wt(e){return Ht(e)&&e.tagName.toLowerCase()===`form`}function Gt(e){return Ht(e)&&e.tagName.toLowerCase()===`input`}function Kt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function qt(e,t){return e.button===0&&(!t||t===`_self`)&&!Kt(e)}function Jt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Yt(e,t){let n=Jt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Xt=null;function Zt(){if(Xt===null)try{new FormData(document.createElement(`form`),0),Xt=!1}catch{Xt=!0}return Xt}var Qt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function $t(e){return e!=null&&!Qt.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Vt}"`),null):e}function en(e,t){let n,r,i,a,o;if(Wt(e)){let o=e.getAttribute(`action`);r=o?Ce(o,t):null,n=e.getAttribute(`method`)||Bt,i=$t(e.getAttribute(`enctype`))||Vt,a=new FormData(e)}else if(Ut(e)||Gt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?Ce(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Bt,i=$t(e.getAttribute(`formenctype`))||$t(o.getAttribute(`enctype`))||Vt,a=new FormData(o,e),!Zt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Ht(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Bt,r=null,i=Vt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var tn={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},nn=/[&><\u2028\u2029]/g;function rn(e){return e.replace(nn,e=>tn[e])}function an(e,t){if(e===!1||e==null)throw Error(t)}function on(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&Ce(i.pathname,t)===`/`?i.pathname=`${Ne(t)}/_root.${r}`:i.pathname=`${Ne(i.pathname)}.${r}`,i}async function sn(e,t){if(e.id in t)return t[e.id];try{let n=await x(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function cn(e){return e!=null&&typeof e.page==`string`}function ln(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function un(e,t,n){return hn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await sn(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(ln).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function dn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function fn(e,t,{includeHydrateFallback:n}={}){return pn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function pn(e){return[...new Set(e)]}function mn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function hn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!cn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(mn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function gn(){let e=S.useContext(We);return an(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function _n(){let e=S.useContext(Ge);return an(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var vn=S.createContext(void 0);vn.displayName=`FrameworkContext`;function yn(){let e=S.useContext(vn);return an(e,`You must render this element inside a <HydratedRouter> element`),e}function bn(e,t){let n=S.useContext(vn),[r,i]=S.useState(!1),[a,o]=S.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=S.useRef(null);S.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),S.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:xn(s,p),onBlur:xn(c,m),onMouseEnter:xn(l,p),onMouseLeave:xn(u,m),onTouchStart:xn(d,p)}]:[a,f,{}]:[!1,f,{}]}function xn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Sn({page:e,...t}){let n=qe(),{router:r}=gn(),i=S.useMemo(()=>oe(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?S.createElement(wn,{page:e,matches:i,...t}):S.createElement(Tn,{page:e,matches:i,...t}):null}function Cn(e){let{manifest:t,routeModules:n}=yn(),[r,i]=S.useState([]);return S.useEffect(()=>{let r=!1;return un(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function wn({page:e,matches:t,...n}){let r=ct(),{future:i}=yn(),{basename:a}=gn(),o=S.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=on(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return S.createElement(S.Fragment,null,o.map(e=>S.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Tn({page:e,matches:t,...n}){let r=ct(),{future:i,manifest:a,routeModules:o}=yn(),{basename:s}=gn(),{loaderData:c,matches:l}=_n(),u=S.useMemo(()=>dn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=S.useMemo(()=>dn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=S.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=on(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=S.useMemo(()=>fn(d,a),[d,a]),m=Cn(d);return S.createElement(S.Fragment,null,f.map(e=>S.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>S.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>S.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function En(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}S.Component;var Dn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Dn&&(window.__reactRouterVersion=`7.16.0`)}catch{}function On({basename:e,children:t,useTransitions:n,window:r}){let i=S.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=S.useState({action:a.action,location:a.location}),c=S.useCallback(e=>{n===!1?s(e):S.startTransition(()=>s(e))},[n]);return S.useLayoutEffect(()=>a.listen(c),[a,c]),S.createElement(Lt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function kn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=S.useState({action:n.action,location:n.location}),o=S.useCallback(e=>{r===!1?a(e):S.startTransition(()=>a(e))},[r]);return S.useLayoutEffect(()=>n.listen(o),[n,o]),S.createElement(Lt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}kn.displayName=`unstable_HistoryRouter`;var An=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,N=S.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=S.useContext(Ze),v=typeof l==`string`&&An.test(l),y=Ve(l,h);l=y.to;let b=ot(l,{relative:r}),x=ct(),C=null;if(o){let e=Ae(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Me([h,e.pathname])),C=g.createHref(e)}let[w,ee,T]=bn(n,p),E=Ln(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let te=!(y.isExternal||i),ne=S.createElement(`a`,{...p,...T,href:(te?C:void 0)||y.absoluteURL||b,onClick:te?D:e,ref:En(m,ee),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return w&&!v?S.createElement(S.Fragment,null,ne,S.createElement(Sn,{page:b})):ne});N.displayName=`Link`;var jn=S.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=mt(a,{relative:c.relative}),d=ct(),f=S.useContext(Ge),{navigator:p,basename:m}=S.useContext(Ze),h=f!=null&&Jn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=Ce(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),C={isActive:b,isPending:x,isTransitioning:h},w=b?e:void 0,ee;ee=typeof n==`function`?n(C):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(C):i;return S.createElement(N,{...c,"aria-current":w,className:ee,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(C):s)});jn.displayName=`NavLink`;var Mn=S.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Bt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=S.useContext(Ze),g=Vn(),_=Hn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&An.test(s);return S.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?S.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Mn.displayName=`Form`;function Nn({getKey:e,storageKey:t,...n}){let r=S.useContext(vn),{basename:i}=S.useContext(Ze),a=ct(),o=jt();Kn({getKey:e,storageKey:t});let s=S.useMemo(()=>{if(!r||!e)return null;let t=Gn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return S.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${rn(JSON.stringify(t||Un))}, ${rn(JSON.stringify(s))})`}})}Nn.displayName=`ScrollRestoration`;function Pn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fn(e){let t=S.useContext(We);return T(t,Pn(e)),t}function In(e){let t=S.useContext(Ge);return T(t,Pn(e)),t}function Ln(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=dt(),d=ct(),f=mt(e,{relative:o});return S.useCallback(p=>{if(qt(p,t)){p.preventDefault();let t=n===void 0?O(d)===O(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?S.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Rn(e){E(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=S.useRef(Jt(e)),n=S.useRef(!1),r=ct(),i=S.useMemo(()=>Yt(r.search,n.current?null:t.current),[r.search]),a=dt();return[i,S.useCallback((e,t)=>{let r=Jt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var zn=0,Bn=()=>`__${String(++zn)}__`;function Vn(){let{router:e}=Fn(`useSubmit`),{basename:t}=S.useContext(Ze),n=kt(),r=e.fetch,i=e.navigate;return S.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=en(e,t);a.navigate===!1?await r(a.fetcherKey||Bn(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Hn(e,{relative:t}={}){let{basename:n}=S.useContext(Ze),r=S.useContext($e);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...mt(e||`.`,{relative:t})},o=ct();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Me([n,a.pathname])),O(a)}var Un=`react-router-scroll-positions`,Wn={};function Gn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:Ce(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Kn({getKey:e,storageKey:t}={}){let{router:n}=Fn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=In(`useScrollRestoration`),{basename:a}=S.useContext(Ze),o=ct(),s=jt(),c=At();S.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),qn(S.useCallback(()=>{if(c.state===`idle`){let t=Gn(o,s,a,e);Wn[t]=window.scrollY}try{sessionStorage.setItem(t||Un,JSON.stringify(Wn))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(S.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Un);e&&(Wn=JSON.parse(e))}catch{}},[t]),S.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Wn,()=>window.scrollY,e?(t,n)=>Gn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),S.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function qn(e,t){let{capture:n}=t||{};S.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Jn(e,{relative:t}={}){let n=S.useContext(Je);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Fn(`useViewTransitionState`),i=mt(e,{relative:t});if(!n.isTransitioning)return!1;let a=Ce(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ce(n.nextLocation.pathname,r)||n.nextLocation.pathname;return be(i.pathname,o)!=null||be(i.pathname,a)!=null}function Yn(e,t){return function(){return e.apply(t,arguments)}}var{toString:Xn}=Object.prototype,{getPrototypeOf:Zn}=Object,{iterator:Qn,toStringTag:$n}=Symbol,er=(e=>t=>{let n=Xn.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),tr=e=>(e=e.toLowerCase(),t=>er(t)===e),nr=e=>t=>typeof t===e,{isArray:rr}=Array,ir=nr(`undefined`);function ar(e){return e!==null&&!ir(e)&&e.constructor!==null&&!ir(e.constructor)&&lr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var or=tr(`ArrayBuffer`);function sr(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&or(e.buffer),t}var cr=nr(`string`),lr=nr(`function`),ur=nr(`number`),dr=e=>typeof e==`object`&&!!e,fr=e=>e===!0||e===!1,pr=e=>{if(er(e)!==`object`)return!1;let t=Zn(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!($n in e)&&!(Qn in e)},mr=e=>{if(!dr(e)||ar(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},hr=tr(`Date`),gr=tr(`File`),_r=e=>!!(e&&e.uri!==void 0),vr=e=>e&&e.getParts!==void 0,yr=tr(`Blob`),br=tr(`FileList`),xr=e=>dr(e)&&lr(e.pipe);function Sr(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var Cr=Sr(),wr=Cr.FormData===void 0?void 0:Cr.FormData,Tr=e=>{if(!e)return!1;if(wr&&e instanceof wr)return!0;let t=Zn(e);if(!t||t===Object.prototype||!lr(e.append))return!1;let n=er(e);return n===`formdata`||n===`object`&&lr(e.toString)&&e.toString()===`[object FormData]`},Er=tr(`URLSearchParams`),[Dr,Or,kr,Ar]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(tr),jr=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function Mr(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),rr(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(ar(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Nr(e,t){if(ar(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}var Pr=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,Fr=e=>!ir(e)&&e!==Pr;function Ir(...e){let{caseless:t,skipUndefined:n}=Fr(this)&&this||{},r={},i=(e,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=t&&Nr(r,i)||i,o=Jr(r,a)?r[a]:void 0;pr(o)&&pr(e)?r[a]=Ir(o,e):pr(e)?r[a]=Ir({},e):rr(e)?r[a]=e.slice():(!n||!ir(e))&&(r[a]=e)};for(let t=0,n=e.length;t<n;t++)e[t]&&Mr(e[t],i);return r}var Lr=(e,t,n,{allOwnKeys:r}={})=>(Mr(t,(t,r)=>{n&&lr(t)?Object.defineProperty(e,r,{__proto__:null,value:Yn(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{__proto__:null,value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),Rr=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),zr=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},Br=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&Zn(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Vr=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Hr=e=>{if(!e)return null;if(rr(e))return e;let t=e.length;if(!ur(t))return null;let n=Array(t);for(;t-- >0;)n[t]=e[t];return n},Ur=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&Zn(Uint8Array)),Wr=(e,t)=>{let n=(e&&e[Qn]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},Gr=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Kr=tr(`HTMLFormElement`),qr=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),Jr=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Yr=tr(`RegExp`),Xr=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};Mr(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},Zr=e=>{Xr(e,(t,n)=>{if(lr(e)&&[`arguments`,`caller`,`callee`].includes(n))return!1;let r=e[n];if(lr(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},Qr=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return rr(e)?r(e):r(String(e).split(t)),n},$r=()=>{},ei=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function ti(e){return!!(e&&lr(e.append)&&e[$n]===`FormData`&&e[Qn])}var ni=e=>{let t=new WeakSet,n=e=>{if(dr(e)){if(t.has(e))return;if(ar(e))return e;if(!(`toJSON`in e)){t.add(e);let r=rr(e)?[]:{};return Mr(e,(e,t)=>{let i=n(e);!ir(i)&&(r[t]=i)}),t.delete(e),r}}return e};return n(e)},ri=tr(`AsyncFunction`),ii=e=>e&&(dr(e)||lr(e))&&lr(e.then)&&lr(e.catch),ai=((e,t)=>e?setImmediate:t?((e,t)=>(Pr.addEventListener(`message`,({source:n,data:r})=>{n===Pr&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),Pr.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,lr(Pr.postMessage)),P={isArray:rr,isArrayBuffer:or,isBuffer:ar,isFormData:Tr,isArrayBufferView:sr,isString:cr,isNumber:ur,isBoolean:fr,isObject:dr,isPlainObject:pr,isEmptyObject:mr,isReadableStream:Dr,isRequest:Or,isResponse:kr,isHeaders:Ar,isUndefined:ir,isDate:hr,isFile:gr,isReactNativeBlob:_r,isReactNative:vr,isBlob:yr,isRegExp:Yr,isFunction:lr,isStream:xr,isURLSearchParams:Er,isTypedArray:Ur,isFileList:br,forEach:Mr,merge:Ir,extend:Lr,trim:jr,stripBOM:Rr,inherits:zr,toFlatObject:Br,kindOf:er,kindOfTest:tr,endsWith:Vr,toArray:Hr,forEachEntry:Wr,matchAll:Gr,isHTMLForm:Kr,hasOwnProperty:Jr,hasOwnProp:Jr,reduceDescriptors:Xr,freezeMethods:Zr,toObjectSet:Qr,toCamelCase:qr,noop:$r,toFiniteNumber:ei,findKey:Nr,global:Pr,isContextDefined:Fr,isSpecCompliantForm:ti,toJSONObject:ni,isAsyncFn:ri,isThenable:ii,setImmediate:ai,asap:typeof queueMicrotask<`u`?queueMicrotask.bind(Pr):typeof process<`u`&&process.nextTick||ai,isIterable:e=>e!=null&&lr(e[Qn])},oi=P.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),si=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&oi[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t};function ci(e){let t=0,n=e.length;for(;t<n;){let n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;n>t;){let t=e.charCodeAt(n-1);if(t!==9&&t!==32)break;--n}return t===0&&n===e.length?e:e.slice(t,n)}var li=RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`,`g`),ui=RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`,`g`);function di(e,t){return P.isArray(e)?e.map(e=>di(e,t)):ci(String(e).replace(t,``))}var fi=e=>di(e,li),pi=e=>di(e,ui);function mi(e){let t=Object.create(null);return P.forEach(e.toJSON(),(e,n)=>{t[n]=pi(e)}),t}var hi=Symbol(`internals`);function gi(e){return e&&String(e).trim().toLowerCase()}function _i(e){return e===!1||e==null?e:P.isArray(e)?e.map(_i):fi(String(e))}function vi(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var yi=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function bi(e,t,n,r,i){if(P.isFunction(r))return r.call(this,t,n);if(i&&(t=n),P.isString(t)){if(P.isString(r))return t.indexOf(r)!==-1;if(P.isRegExp(r))return r.test(t)}}function xi(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Si(e,t){let n=P.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var Ci=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=gi(t);if(!i)throw Error(`header name must be a non-empty string`);let a=P.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=_i(e))}let a=(e,t)=>P.forEach(e,(e,n)=>i(e,n,t));if(P.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(P.isString(e)&&(e=e.trim())&&!yi(e))a(si(e),t);else if(P.isObject(e)&&P.isIterable(e)){let n={},r,i;for(let t of e){if(!P.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);n[i=t[0]]=(r=n[i])?P.isArray(r)?[...r,t[1]]:[r,t[1]]:t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=gi(e),e){let n=P.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return vi(e);if(P.isFunction(t))return t.call(this,e,n);if(P.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=gi(e),e){let n=P.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||bi(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=gi(e),e){let i=P.findKey(n,e);i&&(!t||bi(n,n[i],i,t))&&(delete n[i],r=!0)}}return P.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||bi(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return P.forEach(this,(r,i)=>{let a=P.findKey(n,i);if(a){t[a]=_i(r),delete t[i];return}let o=e?xi(i):String(i).trim();o!==i&&delete t[i],t[o]=_i(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return P.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&P.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[hi]=this[hi]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=gi(e);t[r]||(Si(n,e),t[r]=!0)}return P.isArray(e)?e.forEach(r):r(e),this}};Ci.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),P.reduceDescriptors(Ci.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),P.freezeMethods(Ci);var wi=`[REDACTED ****]`;function Ti(e){if(P.hasOwnProp(e,`toJSON`))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(P.hasOwnProp(t,`toJSON`))return!0;t=Object.getPrototypeOf(t)}return!1}function Ei(e,t){let n=new Set(t.map(e=>String(e).toLowerCase())),r=[],i=e=>{if(typeof e!=`object`||!e||P.isBuffer(e))return e;if(r.indexOf(e)!==-1)return;e instanceof Ci&&(e=e.toJSON()),r.push(e);let t;if(P.isArray(e))t=[],e.forEach((e,n)=>{let r=i(e);P.isUndefined(r)||(t[n]=r)});else{if(!P.isPlainObject(e)&&Ti(e))return r.pop(),e;t=Object.create(null);for(let[r,a]of Object.entries(e)){let e=n.has(r.toLowerCase())?wi:i(a);P.isUndefined(e)||(t[r]=e)}}return r.pop(),t};return i(e)}var F=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return s.cause=t,s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){let e=this.config,t=e&&P.hasOwnProp(e,`redact`)?e.redact:void 0,n=P.isArray(t)&&t.length>0?Ei(e,t):P.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};F.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,F.ERR_BAD_OPTION=`ERR_BAD_OPTION`,F.ECONNABORTED=`ECONNABORTED`,F.ETIMEDOUT=`ETIMEDOUT`,F.ECONNREFUSED=`ECONNREFUSED`,F.ERR_NETWORK=`ERR_NETWORK`,F.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,F.ERR_DEPRECATED=`ERR_DEPRECATED`,F.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,F.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,F.ERR_CANCELED=`ERR_CANCELED`,F.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,F.ERR_INVALID_URL=`ERR_INVALID_URL`,F.ERR_FORM_DATA_DEPTH_EXCEEDED=`ERR_FORM_DATA_DEPTH_EXCEEDED`;function Di(e){return P.isPlainObject(e)||P.isArray(e)}function Oi(e){return P.endsWith(e,`[]`)?e.slice(0,-2):e}function ki(e,t,n){return e?e.concat(t).map(function(e,t){return e=Oi(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function Ai(e){return P.isArray(e)&&!e.some(Di)}var ji=P.toFlatObject(P,{},null,function(e){return/^is[A-Z]/.test(e)});function Mi(e,t,n){if(!P.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=P.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!P.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||d,a=n.dots,o=n.indexes,s=n.Blob||typeof Blob<`u`&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,l=s&&P.isSpecCompliantForm(t);if(!P.isFunction(i))throw TypeError(`visitor must be a function`);function u(e){if(e===null)return``;if(P.isDate(e))return e.toISOString();if(P.isBoolean(e))return e.toString();if(!l&&P.isBlob(e))throw new F(`Blob is not supported. Use a Buffer instead.`);return P.isArrayBuffer(e)||P.isTypedArray(e)?l&&typeof Blob==`function`?new Blob([e]):Buffer.from(e):e}function d(e,n,i){let s=e;if(P.isReactNative(t)&&P.isReactNativeBlob(e))return t.append(ki(i,n,a),u(e)),!1;if(e&&!i&&typeof e==`object`){if(P.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(P.isArray(e)&&Ai(e)||(P.isFileList(e)||P.endsWith(n,`[]`))&&(s=P.toArray(e)))return n=Oi(n),s.forEach(function(e,r){!(P.isUndefined(e)||e===null)&&t.append(o===!0?ki([n],r,a):o===null?n:n+`[]`,u(e))}),!1}return Di(e)?!0:(t.append(ki(i,n,a),u(e)),!1)}let f=[],p=Object.assign(ji,{defaultVisitor:d,convertValue:u,isVisitable:Di});function m(e,n,r=0){if(!P.isUndefined(e)){if(r>c)throw new F(`Object is too deeply nested (`+r+` levels). Max depth: `+c,F.ERR_FORM_DATA_DEPTH_EXCEEDED);if(f.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));f.push(e),P.forEach(e,function(e,a){(!(P.isUndefined(e)||e===null)&&i.call(t,e,P.isString(a)?a.trim():a,n,p))===!0&&m(e,n?n.concat(a):[a],r+1)}),f.pop()}}if(!P.isObject(e))throw TypeError(`data must be an object`);return m(e),t}function Ni(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(e){return t[e]})}function Pi(e,t){this._pairs=[],e&&Mi(e,this,t)}var Fi=Pi.prototype;Fi.append=function(e,t){this._pairs.push([e,t])},Fi.toString=function(e){let t=e?function(t){return e.call(this,t,Ni)}:Ni;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function Ii(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function I(e,t,n){if(!t)return e;let r=n&&n.encode||Ii,i=P.isFunction(n)?{serialize:n}:n,a=i&&i.serialize,o;if(o=a?a(t,i):P.isURLSearchParams(t)?t.toString():new Pi(t,i).toString(r),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var L=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){P.forEach(this.handlers,function(t){t!==null&&e(t)})}},Li={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Ri={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:Pi,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},zi=s({hasBrowserEnv:()=>Bi,hasStandardBrowserEnv:()=>Hi,hasStandardBrowserWebWorkerEnv:()=>Ui,navigator:()=>Vi,origin:()=>Wi}),Bi=typeof window<`u`&&typeof document<`u`,Vi=typeof navigator==`object`&&navigator||void 0,Hi=Bi&&(!Vi||[`ReactNative`,`NativeScript`,`NS`].indexOf(Vi.product)<0),Ui=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,Wi=Bi&&window.location.href||`http://localhost`,Gi={...zi,...Ri};function Ki(e,t){return Mi(e,new Gi.classes.URLSearchParams,{visitor:function(e,t,n,r){return Gi.isNode&&P.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}function qi(e){return P.matchAll(/\w+|\[(\w*)]/g,e).map(e=>e[0]===`[]`?``:e[1]||e[0])}function Ji(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function Yi(e){function t(e,n,r,i){let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&P.isArray(r)?r.length:a,s?(P.hasOwnProp(r,a)?r[a]=P.isArray(r[a])?r[a].concat(n):[r[a],n]:r[a]=n,!o):((!P.hasOwnProp(r,a)||!P.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&P.isArray(r[a])&&(r[a]=Ji(r[a])),!o)}if(P.isFormData(e)&&P.isFunction(e.entries)){let n={};return P.forEachEntry(e,(e,r)=>{t(qi(e),r,n,0)}),n}return null}var Xi=(e,t)=>e!=null&&P.hasOwnProp(e,t)?e[t]:void 0;function Zi(e,t,n){if(P.isString(e))try{return(t||JSON.parse)(e),P.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var Qi={transitional:Li,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=P.isObject(e);if(i&&P.isHTMLForm(e)&&(e=new FormData(e)),P.isFormData(e))return r?JSON.stringify(Yi(e)):e;if(P.isArrayBuffer(e)||P.isBuffer(e)||P.isStream(e)||P.isFile(e)||P.isBlob(e)||P.isReadableStream(e))return e;if(P.isArrayBufferView(e))return e.buffer;if(P.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){let t=Xi(this,`formSerializer`);if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return Ki(e,t).toString();if((a=P.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let n=Xi(this,`env`),r=n&&n.FormData;return Mi(a?{"files[]":e}:e,r&&new r,t)}}return i||r?(t.setContentType(`application/json`,!1),Zi(e)):e}],transformResponse:[function(e){let t=Xi(this,`transitional`)||Qi.transitional,n=t&&t.forcedJSONParsing,r=Xi(this,`responseType`),i=r===`json`;if(P.isResponse(e)||P.isReadableStream(e))return e;if(e&&P.isString(e)&&(n&&!r||i)){let n=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e,Xi(this,`parseReviver`))}catch(e){if(n)throw e.name===`SyntaxError`?F.from(e,F.ERR_BAD_RESPONSE,this,null,Xi(this,`response`)):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:Gi.classes.FormData,Blob:Gi.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};P.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`],e=>{Qi.headers[e]={}});function $i(e,t){let n=this||Qi,r=t||n,i=Ci.from(r.headers),a=r.data;return P.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function ea(e){return!!(e&&e.__CANCEL__)}var ta=class extends F{constructor(e,t,n){super(e??`canceled`,F.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function na(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new F(`Request failed with status code `+n.status,n.status>=400&&n.status<500?F.ERR_BAD_REQUEST:F.ERR_BAD_RESPONSE,n.config,n.request,n))}function ra(e){let t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||``}function ia(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function aa(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var oa=(e,t,n=3)=>{let r=0,i=ia(50,250);return aa(n=>{if(!n||typeof n.loaded!=`number`)return;let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=o==null?a:Math.min(a,o),c=Math.max(0,s-r),l=i(c);r=Math.max(r,s),e({loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:l||void 0,estimated:l&&o?(o-s)/l:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},sa=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},ca=e=>(...t)=>P.asap(()=>e(...t)),la=Gi.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,Gi.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Gi.origin),Gi.navigator&&/(msie|trident)/i.test(Gi.navigator.userAgent)):()=>!0,ua=Gi.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];P.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),P.isString(r)&&s.push(`path=${r}`),P.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),P.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.split(`;`);for(let n=0;n<t.length;n++){let r=t[n].replace(/^\s+/,``),i=r.indexOf(`=`);if(i!==-1&&r.slice(0,i)===e)return decodeURIComponent(r.slice(i+1))}return null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function da(e){return typeof e==`string`?/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e):!1}function fa(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}function pa(e,t,n){let r=!da(t);return e&&(r||n===!1)?fa(e,t):t}var ma=e=>e instanceof Ci?{...e}:e;function ha(e,t){t||={};let n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(e,t,n,r){return P.isPlainObject(e)&&P.isPlainObject(t)?P.merge.call({caseless:r},e,t):P.isPlainObject(t)?P.merge({},t):P.isArray(t)?t.slice():t}function i(e,t,n,i){if(!P.isUndefined(t))return r(e,t,n,i);if(!P.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!P.isUndefined(t))return r(void 0,t)}function o(e,t){if(!P.isUndefined(t))return r(void 0,t);if(!P.isUndefined(e))return r(void 0,e)}function s(n,i,a){if(P.hasOwnProp(t,a))return r(n,i);if(P.hasOwnProp(e,a))return r(void 0,n)}let c={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:s,headers:(e,t,n)=>i(ma(e),ma(t),n,!0)};return P.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=P.hasOwnProp(c,r)?c[r]:i,o=a(P.hasOwnProp(e,r)?e[r]:void 0,P.hasOwnProp(t,r)?t[r]:void 0,r);P.isUndefined(o)&&a!==s||(n[r]=o)}),n}var ga=[`content-type`,`content-length`];function _a(e,t,n){if(n!==`content-only`){e.set(t);return}Object.entries(t).forEach(([t,n])=>{ga.includes(t.toLowerCase())&&e.set(t,n)})}var va=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),ya=e=>{let t=ha({},e),n=e=>P.hasOwnProp(t,e)?t[e]:void 0,r=n(`data`),i=n(`withXSRFToken`),a=n(`xsrfHeaderName`),o=n(`xsrfCookieName`),s=n(`headers`),c=n(`auth`),l=n(`baseURL`),u=n(`allowAbsoluteUrls`),d=n(`url`);if(t.headers=s=Ci.from(s),t.url=I(pa(l,d,u),e.params,e.paramsSerializer),c&&s.set(`Authorization`,`Basic `+btoa((c.username||``)+`:`+(c.password?va(c.password):``))),P.isFormData(r)&&(Gi.hasStandardBrowserEnv||Gi.hasStandardBrowserWebWorkerEnv?s.setContentType(void 0):P.isFunction(r.getHeaders)&&_a(s,r.getHeaders(),n(`formDataHeaderPolicy`))),Gi.hasStandardBrowserEnv&&(P.isFunction(i)&&(i=i(t)),i===!0||i==null&&la(t.url))){let e=a&&o&&ua.read(o);e&&s.set(a,e)}return t},ba=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=ya(e),i=r.data,a=Ci.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=Ci.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());na(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.startsWith(`file:`))||setTimeout(g)},h.onabort=function(){h&&=(n(new F(`Request aborted`,F.ECONNABORTED,e,h)),m(),null)},h.onerror=function(t){let r=new F(t&&t.message?t.message:`Network Error`,F.ERR_NETWORK,e,h);r.event=t||null,n(r),m(),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||Li;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new F(t,i.clarifyTimeoutError?F.ETIMEDOUT:F.ECONNABORTED,e,h)),m(),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&P.forEach(mi(a),function(e,t){h.setRequestHeader(t,e)}),P.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=oa(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=oa(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new ta(null,e,h):t),h.abort(),m(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=ra(r.url);if(_&&!Gi.protocols.includes(_)){n(new F(`Unsupported protocol `+_+`:`,F.ERR_BAD_REQUEST,e));return}h.send(i||null)})},xa=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;let n=new AbortController,r=!1,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof F?t:new ta(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new F(`timeout of ${t}ms exceeded`,F.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i));let{signal:s}=n;return s.unsubscribe=()=>P.asap(o),s},Sa=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},Ca=async function*(e,t){for await(let n of wa(e))yield*Sa(n,t)},wa=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},Ta=(e,t,n,r)=>{let i=Ca(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})};function Ea(e){if(!e||typeof e!=`string`||!e.startsWith(`data:`))return 0;let t=e.indexOf(`,`);if(t<0)return 0;let n=e.slice(5,t),r=e.slice(t+1);if(/;base64/i.test(n)){let e=r.length,t=r.length;for(let n=0;n<t;n++)if(r.charCodeAt(n)===37&&n+2<t){let t=r.charCodeAt(n+1),i=r.charCodeAt(n+2);(t>=48&&t<=57||t>=65&&t<=70||t>=97&&t<=102)&&(i>=48&&i<=57||i>=65&&i<=70||i>=97&&i<=102)&&(e-=2,n+=2)}let n=0,i=t-1,a=e=>e>=2&&r.charCodeAt(e-2)===37&&r.charCodeAt(e-1)===51&&(r.charCodeAt(e)===68||r.charCodeAt(e)===100);i>=0&&(r.charCodeAt(i)===61?(n++,i--):a(i)&&(n++,i-=3)),n===1&&i>=0&&(r.charCodeAt(i)===61||a(i))&&n++;let o=Math.floor(e/4)*3-(n||0);return o>0?o:0}if(typeof Buffer<`u`&&typeof Buffer.byteLength==`function`)return Buffer.byteLength(r,`utf8`);let i=0;for(let e=0,t=r.length;e<t;e++){let n=r.charCodeAt(e);if(n<128)i+=1;else if(n<2048)i+=2;else if(n>=55296&&n<=56319&&e+1<t){let t=r.charCodeAt(e+1);t>=56320&&t<=57343?(i+=4,e++):i+=3}else i+=3}return i}var Da=`1.16.1`,Oa=64*1024,{isFunction:ka}=P,Aa=(e,...t)=>{try{return!!e(...t)}catch{return!1}},ja=e=>{let t=P.global!==void 0&&P.global!==null?P.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=P.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);let{fetch:i,Request:a,Response:o}=e,s=i?ka(i):typeof fetch==`function`,c=ka(a),l=ka(o);if(!s)return!1;let u=s&&ka(n),d=s&&(typeof r==`function`?(e=>t=>e.encode(t))(new r):async e=>new Uint8Array(await new a(e).arrayBuffer())),f=c&&u&&Aa(()=>{let e=!1,t=new a(Gi.origin,{body:new n,method:`POST`,get duplex(){return e=!0,`half`}}),r=t.headers.has(`Content-Type`);return t.body!=null&&t.body.cancel(),e&&!r}),p=l&&u&&Aa(()=>P.isReadableStream(new o(``).body)),m={stream:p&&(e=>e.body)};s&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!m[e]&&(m[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new F(`Response type '${e}' is not supported`,F.ERR_NOT_SUPPORT,n)})});let h=async e=>{if(e==null)return 0;if(P.isBlob(e))return e.size;if(P.isSpecCompliantForm(e))return(await new a(Gi.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(P.isArrayBufferView(e)||P.isArrayBuffer(e))return e.byteLength;if(P.isURLSearchParams(e)&&(e+=``),P.isString(e))return(await d(e)).byteLength},g=async(e,t)=>P.toFiniteNumber(e.getContentLength())??h(t);return async e=>{let{url:t,method:n,data:s,signal:l,cancelToken:u,timeout:d,onDownloadProgress:h,onUploadProgress:_,responseType:v,headers:y,withCredentials:b=`same-origin`,fetchOptions:x,maxContentLength:S,maxBodyLength:C}=ya(e),w=P.isNumber(S)&&S>-1,ee=P.isNumber(C)&&C>-1,T=i||fetch;v=v?(v+``).toLowerCase():`text`;let E=xa([l,u&&u.toAbortSignal()],d),D=null,te=E&&E.unsubscribe&&(()=>{E.unsubscribe()}),ne;try{if(w&&typeof t==`string`&&t.startsWith(`data:`)&&Ea(t)>S)throw new F(`maxContentLength size of `+S+` exceeded`,F.ERR_BAD_RESPONSE,e,D);if(ee&&n!==`get`&&n!==`head`){let t=await g(y,s);if(typeof t==`number`&&isFinite(t)&&t>C)throw new F(`Request body larger than maxBodyLength limit`,F.ERR_BAD_REQUEST,e,D)}if(_&&f&&n!==`get`&&n!==`head`&&(ne=await g(y,s))!==0){let e=new a(t,{method:`POST`,body:s,duplex:`half`}),n;if(P.isFormData(s)&&(n=e.headers.get(`content-type`))&&y.setContentType(n),e.body){let[t,n]=sa(ne,oa(ca(_)));s=Ta(e.body,Oa,t,n)}}P.isString(b)||(b=b?`include`:`omit`);let i=c&&`credentials`in a.prototype;if(P.isFormData(s)){let e=y.getContentType();e&&/^multipart\/form-data/i.test(e)&&!/boundary=/i.test(e)&&y.delete(`content-type`)}y.set(`User-Agent`,`axios/`+Da,!1);let l={...x,signal:E,method:n.toUpperCase(),headers:mi(y.normalize()),body:s,duplex:`half`,credentials:i?b:void 0};D=c&&new a(t,l);let u=await(c?T(D,x):T(t,l));if(w){let t=P.toFiniteNumber(u.headers.get(`content-length`));if(t!=null&&t>S)throw new F(`maxContentLength size of `+S+` exceeded`,F.ERR_BAD_RESPONSE,e,D)}let d=p&&(v===`stream`||v===`response`);if(p&&u.body&&(h||w||d&&te)){let t={};[`status`,`statusText`,`headers`].forEach(e=>{t[e]=u[e]});let n=P.toFiniteNumber(u.headers.get(`content-length`)),[r,i]=h&&sa(n,oa(ca(h),!0))||[],a=0;u=new o(Ta(u.body,Oa,t=>{if(w&&(a=t,a>S))throw new F(`maxContentLength size of `+S+` exceeded`,F.ERR_BAD_RESPONSE,e,D);r&&r(t)},()=>{i&&i(),te&&te()}),t)}v||=`text`;let O=await m[P.findKey(m,v)||`text`](u,e);if(w&&!p&&!d){let t;if(O!=null&&(typeof O.byteLength==`number`?t=O.byteLength:typeof O.size==`number`?t=O.size:typeof O==`string`&&(t=typeof r==`function`?new r().encode(O).byteLength:O.length)),typeof t==`number`&&t>S)throw new F(`maxContentLength size of `+S+` exceeded`,F.ERR_BAD_RESPONSE,e,D)}return!d&&te&&te(),await new Promise((t,n)=>{na(t,n,{data:O,headers:Ci.from(u.headers),status:u.status,statusText:u.statusText,config:e,request:D})})}catch(t){if(te&&te(),E&&E.aborted&&E.reason instanceof F){let n=E.reason;throw n.config=e,D&&(n.request=D),t!==n&&(n.cause=t),n}throw t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)?Object.assign(new F(`Network Error`,F.ERR_NETWORK,e,D,t&&t.response),{cause:t.cause||t}):F.from(t,t&&t.code,e,D,t&&t.response)}}},Ma=new Map,Na=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=Ma;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:ja(t)),l=c;return c};Na();var Pa={http:null,xhr:ba,fetch:{get:Na}};P.forEach(Pa,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});var Fa=e=>`- ${e}`,Ia=e=>P.isFunction(e)||e===null||e===!1;function La(e,t){e=P.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!Ia(r)&&(i=Pa[(n=String(r)).toLowerCase()],i===void 0))throw new F(`Unknown adapter '${n}'`);if(i&&(P.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new F(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(Fa).join(`
`):` `+Fa(e[0]):`as no adapter specified`),`ERR_NOT_SUPPORT`)}return i}var Ra={getAdapter:La,adapters:Pa};function za(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ta(null,e)}function Ba(e){return za(e),e.headers=Ci.from(e.headers),e.data=$i.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),Ra.getAdapter(e.adapter||Qi.adapter,e)(e).then(function(t){za(e),e.response=t;try{t.data=$i.call(e,e.transformResponse,t)}finally{delete e.response}return t.headers=Ci.from(t.headers),t},function(t){if(!ea(t)&&(za(e),t&&t.response)){e.response=t.response;try{t.response.data=$i.call(e,e.transformResponse,t.response)}finally{delete e.response}t.response.headers=Ci.from(t.response.headers)}return Promise.reject(t)})}var Va={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{Va[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var Ha={};Va.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Da+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new F(r(i,` has been removed`+(t?` in `+t:``)),F.ERR_DEPRECATED);return t&&!Ha[i]&&(Ha[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),e?e(n,i,a):!0}},Va.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function Ua(e,t,n){if(typeof e!=`object`)throw new F(`options must be an object`,F.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-- >0;){let a=r[i],o=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new F(`option `+a+` must be `+n,F.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new F(`Unknown option `+a,F.ERR_BAD_OPTION)}}var Wa={assertOptions:Ua,validators:Va},Ga=Wa.validators,Ka=class{constructor(e){this.defaults=e||{},this.interceptors={request:new L,response:new L}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=(()=>{if(!t.stack)return``;let e=t.stack.indexOf(`
`);return e===-1?``:t.stack.slice(e+1)})();try{if(!e.stack)e.stack=n;else if(n){let t=n.indexOf(`
`),r=t===-1?-1:n.indexOf(`
`,t+1),i=r===-1?``:n.slice(r+1);String(e.stack).endsWith(i)||(e.stack+=`
`+n)}}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=ha(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&Wa.assertOptions(n,{silentJSONParsing:Ga.transitional(Ga.boolean),forcedJSONParsing:Ga.transitional(Ga.boolean),clarifyTimeoutError:Ga.transitional(Ga.boolean),legacyInterceptorReqResOrdering:Ga.transitional(Ga.boolean)},!1),r!=null&&(P.isFunction(r)?t.paramsSerializer={serialize:r}:Wa.assertOptions(r,{encode:Ga.function,serialize:Ga.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),Wa.assertOptions(t,{baseUrl:Ga.spelling(`baseURL`),withXsrfToken:Ga.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&P.merge(i.common,i[t.method]);i&&P.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`,`common`],e=>{delete i[e]}),t.headers=Ci.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||Li;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[Ba.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=Ba.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=ha(this.defaults,e),I(pa(e.baseURL,e.url,e.allowAbsoluteUrls),e.params,e.paramsSerializer)}};P.forEach([`delete`,`get`,`head`,`options`],function(e){Ka.prototype[e]=function(t,n){return this.request(ha(n||{},{method:e,url:t,data:(n||{}).data}))}}),P.forEach([`post`,`put`,`patch`,`query`],function(e){function t(t){return function(n,r,i){return this.request(ha(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}Ka.prototype[e]=t(),e!==`query`&&(Ka.prototype[e+`Form`]=t(!0))});var qa=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new ta(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function Ja(e){return function(t){return e.apply(null,t)}}function Ya(e){return P.isObject(e)&&e.isAxiosError===!0}var Xa={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Xa).forEach(([e,t])=>{Xa[t]=e});function Za(e){let t=new Ka(e),n=Yn(Ka.prototype.request,t);return P.extend(n,Ka.prototype,t,{allOwnKeys:!0}),P.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return Za(ha(e,t))},n}var R=Za(Qi);R.Axios=Ka,R.CanceledError=ta,R.CancelToken=qa,R.isCancel=ea,R.VERSION=Da,R.toFormData=Mi,R.AxiosError=F,R.Cancel=R.CanceledError,R.all=function(e){return Promise.all(e)},R.spread=Ja,R.isAxiosError=Ya,R.mergeConfig=ha,R.AxiosHeaders=Ci,R.formToJSON=e=>Yi(P.isHTMLForm(e)?new FormData(e):e),R.getAdapter=Ra.getAdapter,R.HttpStatusCode=Xa,R.default=R;var Qa=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),$a=o(((e,t)=>{t.exports=Qa()})),eo=l(_(),1),z=$a(),to=(0,S.createContext)(),no=({children:e})=>{let[t,n]=(0,S.useState)(null),[r,i]=(0,S.useState)(!0);return R.defaults.withCredentials=!0,R.defaults.baseURL=window.location.origin+`/zingbite`,(0,S.useEffect)(()=>{(async()=>{try{let e=await R.get(`/api/login`);e.data.loggedIn&&n(e.data.user)}catch(e){console.error(`Auth check failed`,e)}finally{i(!1)}})()},[]),(0,z.jsx)(to.Provider,{value:{user:t,loading:r,login:async(e,t)=>{try{let r=await R.post(`/api/login`,{email:e,password:t});return r.data.success?(n(r.data.user),{success:!0,user:r.data.user}):{success:!1,error:r.data.error}}catch(e){return e.response&&e.response.data?{success:!1,error:e.response.data.error||`Login failed`}:{success:!1,error:`Network error or server down`}}},logout:async()=>{n(null)},updateUser:e=>{n(e)}},children:e})},ro=(0,S.createContext)(),io=({children:e})=>{let[t,n]=(0,S.useState)({items:[],total:0,subtotal:0,itemCount:0,shipping:0,tax:0}),[r,i]=(0,S.useState)(!0),[a,o]=(0,S.useState)(null),[s,c]=(0,S.useState)(null),l=async()=>{try{let e=await R.get(`/api/cart`);e.data&&n(e.data)}catch(e){console.error(e)}finally{i(!1)}};(0,S.useEffect)(()=>{l()},[]),(0,S.useEffect)(()=>{(t?.items?Array.isArray(t.items)?t.items:Object.values(t.items):[]).length===0&&c(null)},[t]);let u=e=>{let n=e.toUpperCase().trim();return n===`ZING50`?(c({code:`ZING50`,type:`percent`,value:50,cap:150,description:`50% OFF up to ₹150`}),{success:!0,message:`Coupon ZING50 applied!`}):n===`FREEDEL`?(c({code:`FREEDEL`,type:`free_delivery`,value:t.shipping,description:`Free Delivery Applied`}),{success:!0,message:`Free Delivery coupon applied!`}):n===`WELCOME20`?(c({code:`WELCOME20`,type:`flat`,value:20,description:`Flat ₹20 OFF`}),{success:!0,message:`Flat ₹20 discount applied!`}):{success:!1,message:`Invalid Coupon Code`}},d=()=>{c(null)},f=()=>{if(!t)return{items:[],subtotal:0,shipping:0,tax:0,total:0,itemCount:0,discount:0};let e=t.subtotal||0,n=t.shipping||0,r=t.tax||0,i=0;s&&(s.type===`percent`?(i=e*s.value/100,s.cap&&(i=Math.min(i,s.cap))):s.type===`flat`?i=Math.min(s.value,e):s.type===`free_delivery`&&(i=n,n=0));let a=Math.max(0,e+n+r-i);return{...t,subtotal:e,shipping:n,tax:r,discount:i,total:a}},p=async(e,t)=>{try{let r=await R.post(`/api/cart`,{action:`add`,itemId:e,quantity:t});return r.data.restaurantConflict?(o({itemId:e,quantity:t}),!1):(n(r.data),!0)}catch(e){return console.error(e),!1}},m=async(e,t)=>{if(t<=0)return h(e);try{n((await R.post(`/api/cart`,{action:`updateQuantity`,itemId:e,quantity:t})).data)}catch(e){console.error(e)}},h=async e=>{try{n((await R.post(`/api/cart`,{action:`remove`,itemId:e})).data)}catch(e){console.error(e)}};return(0,z.jsx)(ro.Provider,{value:{cart:f(),loading:r,addToCart:p,updateQuantity:m,removeFromCart:h,conflictPopup:a,setConflictPopup:o,clearAndAdd:async(e,t)=>{try{n((await R.post(`/api/cart`,{action:`clearAndAdd`,itemId:e,quantity:t})).data),o(null)}catch(e){console.error(e)}},clearCart:async()=>{try{n((await R.post(`/api/cart`,{action:`clear`})).data)}catch(e){console.error(e)}},coupon:s,applyCoupon:u,removeCoupon:d},children:e})},ao=()=>(0,S.useContext)(ro),oo=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),so=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),co=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),lo=e=>{let t=co(e);return t.charAt(0).toUpperCase()+t.slice(1)},B={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},uo=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},fo=(0,S.createContext)({}),V=()=>(0,S.useContext)(fo),H=(0,S.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=V()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,S.createElement)(`svg`,{ref:c,...B,width:t??l??B.width,height:t??l??B.height,stroke:e??f,strokeWidth:m,className:oo(`lucide`,p,i),...!a&&!uo(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,S.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),U=(e,t)=>{let n=(0,S.forwardRef)(({className:n,...r},i)=>(0,S.createElement)(H,{ref:i,iconNode:t,className:oo(`lucide-${so(lo(e))}`,`lucide-${e}`,n),...r}));return n.displayName=lo(e),n},po=U(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),mo=U(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),ho=U(`badge-dollar-sign`,[[`path`,{d:`M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z`,key:`3c2336`}],[`path`,{d:`M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8`,key:`1h4pet`}],[`path`,{d:`M12 18V6`,key:`zqpxq5`}]]),go=U(`banknote`,[[`rect`,{width:`20`,height:`12`,x:`2`,y:`6`,rx:`2`,key:`9lu3g6`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}],[`path`,{d:`M6 12h.01M18 12h.01`,key:`113zkx`}]]),_o=U(`bike`,[[`circle`,{cx:`18.5`,cy:`17.5`,r:`3.5`,key:`15x4ox`}],[`circle`,{cx:`5.5`,cy:`17.5`,r:`3.5`,key:`1noe27`}],[`circle`,{cx:`15`,cy:`5`,r:`1`,key:`19l28e`}],[`path`,{d:`M12 17.5V14l-3-3 4-3 2 3h2`,key:`1npguv`}]]),vo=U(`book-open`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z`,key:`ruj8y`}]]),yo=U(`briefcase`,[[`path`,{d:`M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16`,key:`jecpp`}],[`rect`,{width:`20`,height:`14`,x:`2`,y:`6`,rx:`2`,key:`i6l2r4`}]]),bo=U(`building-2`,[[`path`,{d:`M10 12h4`,key:`a56b0p`}],[`path`,{d:`M10 8h4`,key:`1sr2af`}],[`path`,{d:`M14 21v-3a2 2 0 0 0-4 0v3`,key:`1rgiei`}],[`path`,{d:`M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2`,key:`secmi2`}],[`path`,{d:`M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16`,key:`16ra0t`}]]),xo=U(`calendar`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}]]),So=U(`camera`,[[`path`,{d:`M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z`,key:`18u6gg`}],[`circle`,{cx:`12`,cy:`13`,r:`3`,key:`1vg3eu`}]]),Co=U(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),wo=U(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),To=U(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),Eo=U(`circle-alert`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]]),Do=U(`circle-check-big`,[[`path`,{d:`M21.801 10A10 10 0 1 1 17 3.335`,key:`yps3ct`}],[`path`,{d:`m9 11 3 3L22 4`,key:`1pflzl`}]]),Oo=U(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),ko=U(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),Ao=U(`clipboard-check`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`m9 14 2 2 4-4`,key:`df797q`}]]),jo=U(`clipboard-list`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`M12 11h4`,key:`1jrz19`}],[`path`,{d:`M12 16h4`,key:`n85exb`}],[`path`,{d:`M8 11h.01`,key:`1dfujw`}],[`path`,{d:`M8 16h.01`,key:`18s6g9`}]]),Mo=U(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),No=U(`cookie`,[[`path`,{d:`M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5`,key:`laymnq`}],[`path`,{d:`M8.5 8.5v.01`,key:`ue8clq`}],[`path`,{d:`M16 15.5v.01`,key:`14dtrp`}],[`path`,{d:`M12 12v.01`,key:`u5ubse`}],[`path`,{d:`M11 17v.01`,key:`1hyl5a`}],[`path`,{d:`M7 14v.01`,key:`uct60s`}]]),Po=U(`credit-card`,[[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`2`,key:`ynyp8z`}],[`line`,{x1:`2`,x2:`22`,y1:`10`,y2:`10`,key:`1b3vmo`}]]),Fo=U(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),Io=U(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),Lo=U(`flame`,[[`path`,{d:`M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4`,key:`1slcih`}]]),Ro=U(`globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),zo=U(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),Bo=U(`house`,[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]]),Vo=U(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),Ho=U(`indian-rupee`,[[`path`,{d:`M6 3h12`,key:`ggurg9`}],[`path`,{d:`M6 8h12`,key:`6g4wlu`}],[`path`,{d:`m6 13 8.5 8`,key:`u1kupk`}],[`path`,{d:`M6 13h3`,key:`wdp6ag`}],[`path`,{d:`M9 13c6.667 0 6.667-10 0-10`,key:`1nkvk2`}]]),Uo=U(`info`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 16v-4`,key:`1dtifu`}],[`path`,{d:`M12 8h.01`,key:`e9boi3`}]]),Wo=U(`key-round`,[[`path`,{d:`M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z`,key:`1s6t7t`}],[`circle`,{cx:`16.5`,cy:`7.5`,r:`.5`,fill:`currentColor`,key:`w0ekpg`}]]),W=U(`loader`,[[`path`,{d:`M12 2v4`,key:`3427ic`}],[`path`,{d:`m16.2 7.8 2.9-2.9`,key:`r700ao`}],[`path`,{d:`M18 12h4`,key:`wj9ykh`}],[`path`,{d:`m16.2 16.2 2.9 2.9`,key:`1bxg5t`}],[`path`,{d:`M12 18v4`,key:`jadmvz`}],[`path`,{d:`m4.9 19.1 2.9-2.9`,key:`bwix9q`}],[`path`,{d:`M2 12h4`,key:`j09sii`}],[`path`,{d:`m4.9 4.9 2.9 2.9`,key:`giyufr`}]]),Go=U(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),Ko=U(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),qo=U(`mail`,[[`path`,{d:`m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`,key:`132q7q`}],[`rect`,{x:`2`,y:`4`,width:`20`,height:`16`,rx:`2`,key:`izxlao`}]]),Jo=U(`map-pin`,[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]),Yo=U(`message-circle`,[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,key:`1sd12s`}]]),Xo=U(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),Zo=U(`minus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]),Qo=U(`navigation`,[[`polygon`,{points:`3 11 22 2 13 21 11 13 3 11`,key:`1ltx0t`}]]),$o=U(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),es=U(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),ts=U(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),ns=U(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),rs=U(`send`,[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]),is=U(`shield`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]),as=U(`shopping-bag`,[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]),os=U(`shopping-cart`,[[`circle`,{cx:`8`,cy:`21`,r:`1`,key:`jimo8o`}],[`circle`,{cx:`19`,cy:`21`,r:`1`,key:`13723u`}],[`path`,{d:`M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`,key:`9zh506`}]]),ss=U(`smartphone`,[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,ry:`2`,key:`1yt0o3`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}]]),cs=U(`square-pen`,[[`path`,{d:`M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7`,key:`1m0v6g`}],[`path`,{d:`M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z`,key:`ohrbg2`}]]),ls=U(`star`,[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]),us=U(`store`,[[`path`,{d:`M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5`,key:`slp6dd`}],[`path`,{d:`M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244`,key:`o0xfot`}],[`path`,{d:`M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05`,key:`wn3emo`}]]),ds=U(`toggle-left`,[[`circle`,{cx:`9`,cy:`12`,r:`3`,key:`u3jwor`}],[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`7`,key:`g7kal2`}]]),fs=U(`toggle-right`,[[`circle`,{cx:`15`,cy:`12`,r:`3`,key:`1afu0r`}],[`rect`,{width:`20`,height:`14`,x:`2`,y:`5`,rx:`7`,key:`g7kal2`}]]),ps=U(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),ms=U(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),hs=U(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),gs=U(`users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`,key:`16gr8j`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),_s=U(`utensils-crossed`,[[`path`,{d:`m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8`,key:`n7qcjb`}],[`path`,{d:`M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7`,key:`d0u48b`}],[`path`,{d:`m2.1 21.8 6.4-6.3`,key:`yn04lh`}],[`path`,{d:`m19 5-7 7`,key:`194lzd`}]]),vs=U(`utensils`,[[`path`,{d:`M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2`,key:`cjf0a3`}],[`path`,{d:`M7 2v20`,key:`1473qp`}],[`path`,{d:`M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7`,key:`j28e5`}]]),ys=U(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),bs=U(`zap`,[[`path`,{d:`M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z`,key:`1xq2db`}]]),xs=()=>{let{user:e,logout:t}=(0,S.useContext)(to),{cart:n}=ao(),r=dt(),i=ct(),[a,o]=(0,S.useState)(!1),[s,c]=(0,S.useState)(!1);(0,S.useEffect)(()=>{let e=()=>o(window.scrollY>10);return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]),(0,S.useEffect)(()=>{c(!1)},[i]),(0,S.useEffect)(()=>{if(e&&e.role&&e.role!==`customer`){let t=i.pathname;([`/`,`/home`,`/menu`,`/cart`,`/checkout`,`/profile`,`/track-order`].includes(t)||t.startsWith(`/info/`))&&(e.role===`delivery_partner`?r(`/delivery`):e.role===`restaurant_admin`?r(`/restaurant-admin`):e.role===`super_admin`&&r(`/admin`))}},[e,i.pathname,r]);let l=()=>{t(),r(`/`)},u=()=>e?e.role===`delivery_partner`?`/delivery`:e.role===`restaurant_admin`?`/restaurant-admin`:e.role===`super_admin`?`/admin`:`/`:`/`,d=e=>i.pathname===e;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          padding: 0 20px;
        }
        .header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          height: 72px;
          transition: height 0.3s ease;
        }
        .header.scrolled .header-inner {
          height: 64px;
        }
        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .logo-link:hover {
          transform: scale(1.03);
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--brand-red);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 2px 10px rgba(247, 55, 79, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .logo-link:hover .logo-icon {
          box-shadow: 0 4px 16px rgba(247, 55, 79, 0.4);
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
        }
        .logo-text span {
          color: var(--brand-red);
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          position: relative;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }
        .nav-link.active {
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.06);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--brand-red);
          border-radius: 2px;
        }
        .nav-welcome {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 12px;
          background: var(--bg-surface);
          border-radius: 20px;
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
          transition: all 0.25s ease;
        }
        .nav-btn-logout:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
        }
        .nav-btn-signup {
          background: var(--brand-red);
          color: #fff;
          padding: 9px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.25);
        }
        .nav-btn-signup:hover {
          background: var(--brand-red-hover);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(247, 55, 79, 0.35);
        }
        .cart-badge {
          background: var(--brand-red);
          color: #fff;
          border-radius: 10px;
          padding: 1px 7px;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 18px;
          text-align: center;
          animation: bounceIn 0.4s ease-out;
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
        }
        .hamburger:hover {
          background: var(--bg-surface);
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          margin: 5px 0;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 285px;
          max-width: 85%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 24px 20px;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 1px solid var(--border-light);
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu .nav-link {
          padding: 14px 16px;
          font-size: 1rem;
        }
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 999;
          animation: fadeIn 0.35s ease-out;
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
          transition: background 0.2s;
        }
        .close-btn-hover:hover {
          background: var(--bg-surface);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: block; }
        }
      `}),(0,z.jsx)(`header`,{className:`header ${a?`scrolled`:``}`,children:(0,z.jsxs)(`div`,{className:`header-inner`,children:[(0,z.jsxs)(N,{to:u(),className:`logo-link`,children:[(0,z.jsx)(`div`,{className:`logo-icon`,children:(0,z.jsx)(Lo,{size:18,color:`#fff`})}),(0,z.jsxs)(`h1`,{className:`logo-text`,children:[`Zing`,(0,z.jsx)(`span`,{children:`Bite`})]})]}),(0,z.jsxs)(`nav`,{className:`nav-desktop`,children:[(!e||e.role===`customer`)&&(0,z.jsxs)(N,{to:`/`,className:`nav-link ${d(`/`)||d(`/home`)?`active`:``}`,children:[(0,z.jsx)(Bo,{size:16}),` Home`]}),(0,z.jsxs)(N,{to:`/careers`,className:`nav-link ${d(`/careers`)?`active`:``}`,children:[(0,z.jsx)(yo,{size:16}),` Careers`]}),e&&e.role===`delivery_partner`&&(0,z.jsxs)(N,{to:`/delivery`,className:`nav-link ${d(`/delivery`)?`active`:``}`,children:[(0,z.jsx)(_o,{size:16}),` Delivery Portal`]}),e&&e.role===`restaurant_admin`&&(0,z.jsxs)(N,{to:`/restaurant-admin`,className:`nav-link ${d(`/restaurant-admin`)?`active`:``}`,children:[(0,z.jsx)(us,{size:16}),` Restaurant Portal`]}),e&&e.role===`super_admin`&&(0,z.jsxs)(N,{to:`/admin`,className:`nav-link ${d(`/admin`)?`active`:``}`,children:[(0,z.jsx)(is,{size:16}),` Admin Panel`]}),e?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(N,{to:`/profile`,className:`nav-link ${d(`/profile`)?`active`:``}`,children:[(0,z.jsx)(hs,{size:16}),` Profile`]}),(!e||e.role===`customer`)&&(0,z.jsxs)(N,{to:`/cart`,className:`nav-link ${d(`/cart`)?`active`:``}`,children:[(0,z.jsx)(os,{size:16}),` Cart`,n?.itemCount>0&&(0,z.jsx)(`span`,{className:`cart-badge`,children:n.itemCount})]}),(0,z.jsx)(`button`,{onClick:l,className:`nav-btn-logout`,children:`Logout`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(N,{to:`/login`,className:`nav-link ${d(`/login`)?`active`:``}`,children:`Login`}),(0,z.jsx)(N,{to:`/register`,className:`nav-btn-signup`,children:`Sign Up`})]})]}),(0,z.jsxs)(`button`,{className:`hamburger ${s?`open`:``}`,onClick:()=>c(!s),children:[(0,z.jsx)(`span`,{}),(0,z.jsx)(`span`,{}),(0,z.jsx)(`span`,{})]})]})}),s&&(0,z.jsx)(`div`,{className:`sidebar-backdrop`,onClick:()=>c(!1)}),(0,z.jsxs)(`div`,{className:`mobile-menu ${s?`open`:``}`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`20px`,paddingBottom:`12px`,borderBottom:`1px solid var(--border-light)`},children:[(0,z.jsxs)(`div`,{className:`logo-link`,style:{pointerEvents:`none`},children:[(0,z.jsx)(`div`,{className:`logo-icon`,children:(0,z.jsx)(Lo,{size:18,color:`#fff`})}),(0,z.jsxs)(`h1`,{className:`logo-text`,style:{fontSize:`1.3rem`},children:[`Zing`,(0,z.jsx)(`span`,{children:`Bite`})]})]}),(0,z.jsx)(`button`,{onClick:()=>c(!1),className:`close-btn-hover`,children:(0,z.jsx)(ys,{size:22,color:`var(--text-primary)`})})]}),(!e||e.role===`customer`)&&(0,z.jsxs)(N,{to:`/`,className:`nav-link ${d(`/`)?`active`:``}`,children:[(0,z.jsx)(Bo,{size:16}),` Home`]}),(0,z.jsxs)(N,{to:`/careers`,className:`nav-link ${d(`/careers`)?`active`:``}`,children:[(0,z.jsx)(yo,{size:16}),` Careers`]}),e&&(e.role===`delivery_partner`||e.role===`restaurant_admin`||e.role===`super_admin`)&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{style:{padding:`8px 16px`,fontWeight:700,color:`var(--brand-red)`,fontSize:`0.85rem`,textTransform:`uppercase`,letterSpacing:`0.5px`},children:`My Portal`}),e.role===`delivery_partner`&&(0,z.jsxs)(N,{to:`/delivery`,className:`nav-link`,style:{paddingLeft:`24px`},children:[(0,z.jsx)(_o,{size:16}),` Delivery Portal`]}),e.role===`restaurant_admin`&&(0,z.jsxs)(N,{to:`/restaurant-admin`,className:`nav-link`,style:{paddingLeft:`24px`},children:[(0,z.jsx)(us,{size:16}),` Restaurant Portal`]}),e.role===`super_admin`&&(0,z.jsxs)(N,{to:`/admin`,className:`nav-link`,style:{paddingLeft:`24px`},children:[(0,z.jsx)(is,{size:16}),` Admin Panel`]}),(0,z.jsx)(`div`,{style:{height:`1px`,background:`var(--border-light)`,margin:`8px 0`}})]}),e?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(N,{to:`/profile`,className:`nav-link ${d(`/profile`)?`active`:``}`,children:[(0,z.jsx)(hs,{size:16}),` Profile`]}),(!e||e.role===`customer`)&&(0,z.jsxs)(N,{to:`/cart`,className:`nav-link ${d(`/cart`)?`active`:``}`,children:[(0,z.jsx)(os,{size:16}),` Cart `,n?.itemCount>0&&(0,z.jsx)(`span`,{className:`cart-badge`,children:n.itemCount})]}),(0,z.jsx)(`div`,{style:{marginTop:`auto`,paddingTop:`20px`},children:(0,z.jsx)(`button`,{onClick:l,className:`nav-btn-logout`,style:{width:`100%`},children:`Logout`})})]}):(0,z.jsxs)(`div`,{style:{marginTop:`auto`,display:`flex`,flexDirection:`column`,gap:`10px`,paddingTop:`20px`},children:[(0,z.jsx)(N,{to:`/login`,className:`nav-link`,style:{justifyContent:`center`,border:`1px solid var(--border-medium)`},children:`Login`}),(0,z.jsx)(N,{to:`/register`,className:`nav-btn-signup`,style:{textAlign:`center`},children:`Sign Up`})]})]})]})},Ss=()=>(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .site-footer {
          background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
          color: #fff;
          padding: 60px 20px 30px;
          margin-top: auto;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .footer-brand-section h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .footer-brand-section h2 span {
          color: var(--brand-red);
        }
        .footer-brand-section p {
          color: #888;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 300px;
        }
        .footer-col h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .footer-col a {
          display: block;
          color: #ccc;
          text-decoration: none;
          padding: 6px 0;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }
        .footer-col a:hover {
          color: #fff;
          padding-left: 4px;
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom p {
          color: #666;
          font-size: 0.85rem;
        }
        .footer-bottom p span {
          color: var(--brand-red);
        }
        .footer-socials {
          display: flex;
          gap: 12px;
        }
        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          color: #ccc;
        }
        .footer-social-btn:hover {
          background: var(--brand-red);
          color: #fff;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand-section p {
            max-width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-socials {
            justify-content: center;
          }
        }
      `}),(0,z.jsxs)(`footer`,{className:`site-footer`,children:[(0,z.jsxs)(`div`,{className:`footer-inner`,children:[(0,z.jsxs)(`div`,{className:`footer-brand-section`,children:[(0,z.jsxs)(`h2`,{children:[`Zing`,(0,z.jsx)(`span`,{children:`Bite`})]}),(0,z.jsx)(`p`,{children:`Delivering happiness and delicious food to your door. Fresh, fast, and always satisfying.`})]}),(0,z.jsxs)(`div`,{className:`footer-col`,children:[(0,z.jsx)(`h3`,{children:`Company`}),(0,z.jsx)(N,{to:`/info/about-us`,children:`About Us`}),(0,z.jsx)(N,{to:`/info/careers`,children:`Careers`}),(0,z.jsx)(N,{to:`/info/team`,children:`Team`}),(0,z.jsx)(N,{to:`/info/blog`,children:`Blog`})]}),(0,z.jsxs)(`div`,{className:`footer-col`,children:[(0,z.jsx)(`h3`,{children:`Support`}),(0,z.jsx)(N,{to:`/info/help-faq`,children:`Help & FAQ`}),(0,z.jsx)(N,{to:`/info/contact-us`,children:`Contact Us`}),(0,z.jsx)(N,{to:`/info/partner-with-us`,children:`Partner With Us`}),(0,z.jsx)(N,{to:`/info/ride-with-us`,children:`Ride With Us`})]}),(0,z.jsxs)(`div`,{className:`footer-col`,children:[(0,z.jsx)(`h3`,{children:`Legal`}),(0,z.jsx)(N,{to:`/info/terms`,children:`Terms & Conditions`}),(0,z.jsx)(N,{to:`/info/privacy`,children:`Privacy Policy`}),(0,z.jsx)(N,{to:`/info/cookies`,children:`Cookie Policy`}),(0,z.jsx)(N,{to:`/info/refunds`,children:`Refund Policy`})]})]}),(0,z.jsxs)(`div`,{className:`footer-bottom`,children:[(0,z.jsxs)(`p`,{children:[`© 2026 ZingBite. Made with `,(0,z.jsx)(zo,{size:14,fill:`var(--brand-red)`,color:`var(--brand-red)`,style:{display:`inline`,verticalAlign:`middle`,margin:`0 4px`}}),` for food lovers`]}),(0,z.jsxs)(`div`,{className:`footer-socials`,children:[(0,z.jsx)(`button`,{className:`footer-social-btn`,children:(0,z.jsx)(Ro,{size:16})}),(0,z.jsx)(`button`,{className:`footer-social-btn`,children:(0,z.jsx)(Yo,{size:16})}),(0,z.jsx)(`button`,{className:`footer-social-btn`,children:(0,z.jsx)(So,{size:16})}),(0,z.jsx)(`button`,{className:`footer-social-btn`,children:(0,z.jsx)(yo,{size:16})})]})]})]})]}),Cs=()=>{let[e,t]=(0,S.useState)([]),[n,r]=(0,S.useState)(!0),[i,a]=(0,S.useState)(null),[o,s]=(0,S.useState)(``),[c,l]=(0,S.useState)(`All`),[u,d]=(0,S.useState)(`default`),f=(0,S.useRef)(null);(0,S.useEffect)(()=>{(async()=>{try{t((await R.get(`/api/home`)).data)}catch(e){console.error(e)}finally{r(!1)}})()},[]);let p=e.filter(e=>{let t=e.restaurantName?e.restaurantName.toLowerCase():``,n=e.cusineType?e.cusineType.toLowerCase():``,r=t.includes(o.toLowerCase())||n.includes(o.toLowerCase()),i=c===`All`||n.includes(c.toLowerCase());return r&&i}).sort((e,t)=>u===`rating`?t.rating-e.rating:u===`time`?e.deliveryTime-t.deliveryTime:0);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .home-hero {
          position: relative;
          padding: 48px 20px 36px;
          text-align: center;
          overflow: hidden;
          background: linear-gradient(135deg, #fff5f5 0%, #fff 30%, #f0fdf4 60%, #fff 100%);
        }
        .home-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(247, 55, 79, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .home-hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(96, 178, 70, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(247, 55, 79, 0.08);
          color: var(--brand-red);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          animation: fadeIn 0.6s ease-out both;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.1;
          margin-bottom: 16px;
          color: var(--text-primary);
          animation: fadeIn 0.6s ease-out 0.1s both;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto;
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        .hero-chips {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 24px;
          animation: fadeIn 0.6s ease-out 0.3s both;
        }
        .hero-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid var(--border-light);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          cursor: default;
        }
        .hero-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          width: calc(100% - 40px);
          margin: 0 auto 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          animation: fadeIn 0.5s ease-out both;
        }
        .section-title-row h2 {
          font-size: 1.45rem;
          color: var(--text-primary);
        }
        .section-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          width: calc(100% - 40px);
          margin: 0 auto 48px;
        }
        .rest-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #fff;
          text-decoration: none;
          color: inherit;
          transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .rest-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(28, 28, 28, 0.12);
        }
        .rest-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 60%;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .rest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.06);
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
        }
        .rest-card-rating .star {
          color: #FFB800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
        }
        .rest-card-details {
          padding: 12px 4px 8px;
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
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          width: calc(100% - 40px);
          margin: 24px auto 12px;
          gap: 16px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 16px;
          border-radius: 30px;
          width: 100%;
          max-width: 400px;
          transition: all 0.3s;
        }
        .search-box:focus-within {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
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
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid var(--border-medium);
          background: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
        }
        .cuisine-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 1200px;
          width: calc(100% - 40px);
          margin: 0 auto 20px;
          overflow-x: auto;
          padding: 4px 0;
        }
        .cuisine-chip {
          padding: 8px 18px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cuisine-chip:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }
        .cuisine-chip.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: #fff;
        }
        @media (max-width: 768px) {
          .home-hero { padding: 32px 16px 24px; }
          .hero-title { font-size: 2rem; }
          .restaurant-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .control-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-box {
            max-width: 100%;
          }
          .sort-box {
            justify-content: space-between;
          }
          .sort-box select {
            flex: 1;
            max-width: 200px;
          }
          .cuisine-filters {
            justify-content: flex-start;
            padding-bottom: 8px;
          }
        }
      `}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`section`,{className:`home-hero`,ref:f,children:(0,z.jsxs)(`div`,{className:`hero-content`,children:[(0,z.jsxs)(`div`,{className:`hero-tag`,children:[(0,z.jsx)(Lo,{size:16}),` #1 Food Delivery App`]}),(0,z.jsxs)(`h2`,{className:`hero-title`,children:[`Hungry? You're in`,(0,z.jsx)(`br`,{}),`the right place.`]}),(0,z.jsx)(`p`,{className:`hero-subtitle`,children:`Order from the best restaurants near you. Delicious food, delivered fast to your doorstep.`}),(0,z.jsxs)(`div`,{className:`hero-chips`,children:[(0,z.jsxs)(`div`,{className:`hero-chip`,children:[(0,z.jsx)(bs,{size:16}),` Fast Delivery`]}),(0,z.jsxs)(`div`,{className:`hero-chip`,children:[(0,z.jsx)(_s,{size:16}),` 500+ Restaurants`]}),(0,z.jsxs)(`div`,{className:`hero-chip`,children:[(0,z.jsx)(ho,{size:16}),` Best Prices`]}),(0,z.jsxs)(`div`,{className:`hero-chip`,children:[(0,z.jsx)(ls,{size:16}),` Top Rated`]})]})]})}),(0,z.jsxs)(`div`,{className:`control-bar`,children:[(0,z.jsxs)(`div`,{className:`search-box`,children:[(0,z.jsx)(ns,{size:18,color:`var(--text-secondary)`}),(0,z.jsx)(`input`,{type:`text`,placeholder:`Search for restaurants or cuisines...`,value:o,onChange:e=>s(e.target.value)})]}),(0,z.jsxs)(`div`,{className:`sort-box`,children:[(0,z.jsx)(`label`,{children:`Sort By:`}),(0,z.jsxs)(`select`,{value:u,onChange:e=>d(e.target.value),children:[(0,z.jsx)(`option`,{value:`default`,children:`Relevance`}),(0,z.jsx)(`option`,{value:`rating`,children:`Rating: High to Low`}),(0,z.jsx)(`option`,{value:`time`,children:`Delivery Time: Fastest`})]})]})]}),(0,z.jsx)(`div`,{className:`cuisine-filters`,children:[`All`,`Biryani`,`Burger`,`Pizza`,`Chinese`,`Indian`,`Desserts`].map(e=>(0,z.jsx)(`button`,{className:`cuisine-chip ${c===e?`active`:``}`,onClick:()=>l(e),children:e},e))}),(0,z.jsxs)(`div`,{className:`section-title-row`,children:[(0,z.jsx)(`h2`,{children:`Restaurants near you`}),!n&&(0,z.jsxs)(`span`,{className:`section-count`,children:[p.length,` restaurants`]})]}),(0,z.jsx)(`section`,{className:`restaurant-grid stagger-children`,children:n?Array.from({length:6}).map((e,t)=>(0,z.jsx)(`div`,{style:{height:`300px`,borderRadius:`var(--radius-lg)`},className:`skeleton`},t)):p.length>0?p.map(e=>(0,z.jsxs)(N,{to:`/menu?restaurantId=${e.restaurantId}&restaurantName=${encodeURIComponent(e.restaurantName)}`,className:`rest-card`,onMouseEnter:()=>a(e.restaurantId),onMouseLeave:()=>a(null),children:[(0,z.jsxs)(`div`,{className:`rest-card-img-wrap`,children:[(0,z.jsx)(`img`,{src:`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,alt:e.restaurantName,className:`rest-card-img`}),(0,z.jsx)(`div`,{className:`rest-card-img-overlay`}),(0,z.jsx)(`div`,{className:`rest-card-offer`,children:`Free Delivery`}),(0,z.jsxs)(`div`,{className:`rest-card-rating`,children:[(0,z.jsx)(`span`,{className:`star`,children:(0,z.jsx)(ls,{size:14,fill:`#FFB800`,color:`#FFB800`})}),` `,e.rating.toFixed(1)]})]}),(0,z.jsxs)(`div`,{className:`rest-card-details`,children:[(0,z.jsx)(`h3`,{className:`rest-card-name`,children:e.restaurantName}),(0,z.jsxs)(`div`,{className:`rest-card-meta`,children:[(0,z.jsx)(`span`,{children:e.cusineType}),(0,z.jsx)(`span`,{className:`dot`}),(0,z.jsxs)(`span`,{children:[e.deliveryTime,` min`]})]})]})]},e.restaurantId)):(0,z.jsx)(`p`,{style:{gridColumn:`1/-1`,textAlign:`center`,padding:`60px`,color:`var(--text-secondary)`},children:`No restaurants found matching your criteria`})})]})]})},ws=l(h(),1),Ts=()=>{let e=dt(),[t]=Rn(),n=t.get(`restaurantId`),r=t.get(`restaurantName`)||`Restaurant Menu`,[i,a]=(0,S.useState)([]),[o,s]=(0,S.useState)(!0),[c,l]=(0,S.useState)(``),{user:u}=S.useContext(to),{cart:d,addToCart:f,updateQuantity:p,conflictPopup:m,clearAndAdd:h,setConflictPopup:g}=ao();(0,S.useEffect)(()=>{n&&(async()=>{try{a((await R.get(`/api/menu?restaurantId=${n}&restaurantName=${encodeURIComponent(r)}`)).data.menuList||[])}catch(e){console.error(e)}finally{s(!1)}})()},[n,r]);let _=e=>{if(!d||!d.items)return 0;let t=(Array.isArray(d.items)?d.items:Object.values(d.items)).find(t=>t.itemId===e);return t?t.quantity:0},v=t=>{if(!u){e(`/login?redirect=/menu?restaurantId=${n}&restaurantName=${encodeURIComponent(r)}`);return}f(t,1)},y=e=>{let t=[`chicken`,`mutton`,`egg`,`fish`,`pork`,`beef`,`shrimp`,`prawn`,`meat`,`kebab`,`tikka`,`biryani`],n=(e.menuName||``).toLowerCase(),r=(e.description||``).toLowerCase();return!t.some(e=>n.includes(e)||r.includes(e))},b=i.filter(e=>(e.menuName||``).toLowerCase().includes(c.toLowerCase())||(e.description||``).toLowerCase().includes(c.toLowerCase())),x=i.length>0&&i[0].restaurant?i[0].restaurant:null,C=x?x.restaurantName:r,w=x?x.cuisineType:`Cuisine details`,ee=x?x.address:`Address details`,T=x?x.deliveryTime:`30 mins`,E=x?.imagePath||`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .menu-page-container {
          max-width: 900px;
          margin: 0 auto 64px;
          padding: 0 20px;
        }

        .restaurant-hero {
          position: relative;
          height: 240px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-md);
        }

        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.3) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 32px;
          color: white;
        }

        .hero-overlay h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0 0 6px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .hero-info-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.85);
          flex-wrap: wrap;
        }

        .hero-info-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .search-menu-bar {
          position: relative;
          margin-bottom: 32px;
        }

        .search-menu-bar input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 1rem;
          outline: none;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }

        .search-menu-bar input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.15);
        }

        .search-icon-pos {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .menu-items-section {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 24px 32px;
          box-shadow: var(--shadow-sm);
        }

        .menu-dish-row {
          display: flex;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-light);
          gap: 24px;
          align-items: center;
        }

        .menu-dish-row:last-child {
          border-bottom: none;
        }

        .dish-details {
          flex: 1;
        }

        .veg-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--success);
          border-radius: 3px;
          padding: 2px;
          margin-bottom: 8px;
        }

        .nonveg-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--danger);
          border-radius: 3px;
          padding: 2px;
          margin-bottom: 8px;
        }

        .veg-dot {
          width: 7px;
          height: 7px;
          background: var(--success);
          border-radius: 50%;
        }

        .nonveg-dot {
          width: 7px;
          height: 7px;
          background: var(--danger);
          border-radius: 50%;
        }

        .dish-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--text-primary);
        }

        .dish-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-primary);
          margin: 0 0 10px;
        }

        .dish-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .dish-img-panel {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dish-img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
        }

        .dish-action-container {
          position: absolute;
          bottom: -10px;
          width: 90px;
          height: 34px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dish-add-btn {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dish-add-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .dish-qty-panel {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dish-qty-btn {
          width: 30px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dish-qty-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .dish-qty-val {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .cart-bar-popup {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--success);
          color: #fff;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        }

        .cart-bar-link {
          color: #fff;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .no-data-dish {
          text-align: center;
          padding: 48px;
          color: var(--text-secondary);
        }

        @media (max-width: 600px) {
          .menu-dish-row {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 16px;
            padding: 16px 0;
          }
          .dish-img-panel {
            width: 100%;
            height: auto;
            align-self: center;
            margin-bottom: 8px;
          }
          .dish-img {
            width: 120px;
            height: 120px;
          }
          .dish-action-container {
            bottom: -10px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`menu-page-container fade-in`,children:[(0,z.jsxs)(`div`,{className:`restaurant-hero`,children:[(0,z.jsx)(`img`,{src:E,alt:C,className:`hero-bg`}),(0,z.jsxs)(`div`,{className:`hero-overlay`,children:[(0,z.jsx)(`h1`,{children:C}),(0,z.jsxs)(`div`,{className:`hero-info-row`,children:[(0,z.jsxs)(`span`,{className:`hero-info-item`,children:[(0,z.jsx)(ls,{size:14,fill:`#ffb703`,color:`#ffb703`}),` 4.2 (100+ ratings)`]}),(0,z.jsx)(`span`,{children:`•`}),(0,z.jsxs)(`span`,{className:`hero-info-item`,children:[(0,z.jsx)(Mo,{size:14}),` `,T]}),(0,z.jsx)(`span`,{children:`•`}),(0,z.jsxs)(`span`,{className:`hero-info-item`,children:[(0,z.jsx)(Jo,{size:14}),` `,ee]})]}),(0,z.jsxs)(`p`,{style:{margin:`6px 0 0`,fontSize:`0.85rem`,color:`rgba(255,255,255,0.7)`},children:[`Cuisine: `,w]})]})]}),(0,z.jsxs)(`div`,{className:`search-menu-bar`,children:[(0,z.jsx)(ns,{size:18,className:`search-icon-pos`}),(0,z.jsx)(`input`,{type:`text`,placeholder:`Search for delicious dishes in the menu...`,value:c,onChange:e=>l(e.target.value)})]}),(0,z.jsx)(`div`,{className:`menu-items-section`,children:o?Array.from({length:4}).map((e,t)=>(0,z.jsx)(`div`,{style:{height:`120px`,borderBottom:`1px solid var(--border-light)`,display:`flex`,alignItems:`center`},className:`skeleton`},t)):b.length>0?b.map(e=>{let t=_(e.menuId),n=y(e);return(0,z.jsxs)(`div`,{className:`menu-dish-row`,children:[(0,z.jsxs)(`div`,{className:`dish-details`,children:[(0,z.jsx)(`div`,{className:n?`veg-indicator`:`nonveg-indicator`,children:(0,z.jsx)(`div`,{className:n?`veg-dot`:`nonveg-dot`})}),(0,z.jsx)(`h3`,{className:`dish-title`,children:e.menuName}),(0,z.jsxs)(`p`,{className:`dish-price`,children:[`₹`,e.price]}),(0,z.jsx)(`p`,{className:`dish-desc`,children:e.description})]}),(0,z.jsxs)(`div`,{className:`dish-img-panel`,children:[(0,z.jsx)(`img`,{src:e.imagePath||`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,alt:e.menuName,className:`dish-img`,onError:e=>{e.target.onerror=null,e.target.src=`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`}}),(0,z.jsx)(`div`,{className:`dish-action-container`,children:t===0?(0,z.jsx)(`button`,{className:`dish-add-btn`,disabled:!e.isAvailable,onClick:()=>v(e.menuId),style:{color:e.isAvailable?`var(--success)`:`var(--text-muted)`},children:e.isAvailable?`ADD`:`OUT`}):(0,z.jsxs)(`div`,{className:`dish-qty-panel`,children:[(0,z.jsx)(`button`,{className:`dish-qty-btn`,onClick:()=>p(e.menuId,t-1),children:(0,z.jsx)(Zo,{size:13})}),(0,z.jsx)(`span`,{className:`dish-qty-val`,children:t}),(0,z.jsx)(`button`,{className:`dish-qty-btn`,onClick:()=>p(e.menuId,t+1),children:(0,z.jsx)(es,{size:13})})]})})]})]},e.menuId)}):(0,z.jsx)(`p`,{className:`no-data-dish`,children:`No dishes found matching your search.`})})]}),d&&d.itemCount>0&&ws.createPortal((0,z.jsxs)(`div`,{className:`cart-bar-popup slide-up`,children:[(0,z.jsxs)(`span`,{style:{fontWeight:700,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsx)(as,{size:18}),` `,d.itemCount,` item`,d.itemCount>1?`s`:``,` added`]}),(0,z.jsxs)(N,{to:`/cart`,className:`cart-bar-link`,children:[`VIEW CART `,(0,z.jsx)(mo,{size:18})]})]}),document.body),m&&ws.createPortal((0,z.jsx)(`div`,{style:Es.modalOverlay,onClick:()=>g(null),children:(0,z.jsxs)(`div`,{style:Es.modalContent,onClick:e=>e.stopPropagation(),children:[(0,z.jsx)(`div`,{style:Es.modalIcon,children:(0,z.jsx)(Eo,{size:32,color:`var(--brand-red)`})}),(0,z.jsx)(`h3`,{style:Es.modalTitle,children:`Items already in cart`}),(0,z.jsx)(`p`,{style:Es.modalDesc,children:`Your cart contains items from another restaurant. Would you like to reset your cart for adding items from this restaurant?`}),(0,z.jsxs)(`div`,{style:Es.modalActions,children:[(0,z.jsx)(`button`,{style:Es.modalBtnOutline,onClick:()=>g(null),children:`NO`}),(0,z.jsx)(`button`,{style:Es.modalBtnPrimary,onClick:()=>h(m.itemId,m.quantity),children:`YES, START AFRESH`})]})]})}),document.body)]})},Es={modalOverlay:{position:`fixed`,inset:0,backgroundColor:`rgba(0,0,0,0.45)`,backdropFilter:`blur(6px)`,WebkitBackdropFilter:`blur(6px)`,display:`flex`,alignItems:`center`,justifyContent:`center`,zIndex:2e3,animation:`fadeIn 0.25s ease-out both`},modalContent:{backgroundColor:`#fff`,padding:`36px`,borderRadius:`24px`,maxWidth:`420px`,width:`90%`,boxShadow:`0 25px 60px rgba(0,0,0,0.2)`,textAlign:`center`},modalIcon:{width:`64px`,height:`64px`,borderRadius:`50%`,background:`rgba(247, 55, 79, 0.08)`,display:`flex`,alignItems:`center`,justifyContent:`center`,margin:`0 auto 20px`},modalTitle:{fontSize:`1.3rem`,fontFamily:`'Outfit', sans-serif`,fontWeight:700,margin:`0 0 10px`,color:`var(--text-primary)`},modalDesc:{color:`var(--text-secondary)`,fontSize:`0.95rem`,lineHeight:1.6,margin:`0 0 4px`},modalActions:{display:`flex`,gap:`12px`,marginTop:`24px`},modalBtnOutline:{flex:1,padding:`13px 16px`,background:`transparent`,border:`2px solid var(--border-medium)`,color:`var(--text-primary)`,fontWeight:600,fontFamily:`inherit`,fontSize:`0.9rem`,borderRadius:`8px`,cursor:`pointer`,transition:`all 0.25s ease`},modalBtnPrimary:{flex:2,padding:`13px 16px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,fontWeight:700,fontFamily:`inherit`,fontSize:`0.9rem`,borderRadius:`8px`,cursor:`pointer`,boxShadow:`0 4px 14px rgba(247, 55, 79, 0.25)`,transition:`all 0.25s ease`}},Ds=()=>{let{cart:e,updateQuantity:t,removeFromCart:n,clearCart:r,coupon:i,applyCoupon:a,removeCoupon:o}=ao(),{user:s}=S.useContext(to),c=dt(),[l,u]=(0,S.useState)(``),[d,f]=(0,S.useState)(``),p=()=>{if(f(``),!l)return;let e=a(l);e.success?u(``):f(e.message)},m=e=>{f(``),a(e)},h=e?.items?Array.isArray(e.items)?e.items:Object.values(e.items):[];return!e||h.length===0?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
          .empty-cart {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            text-align: center;
          }
          .btn-primary {
            background-color: var(--brand-red);
            color: #fff;
            padding: 12px 24px;
            border-radius: var(--radius-sm);
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background-color: var(--brand-red-hover);
          }
        `}),(0,z.jsxs)(`div`,{className:`empty-cart fade-in`,children:[(0,z.jsx)(os,{size:80,color:`var(--text-muted)`,strokeWidth:1,style:{marginBottom:`24px`}}),(0,z.jsx)(`h3`,{style:{fontSize:`1.5rem`,fontWeight:800},children:`Your cart is empty`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,fontSize:`0.95rem`},children:`Add items from restaurants nearby to start your checkout.`}),(0,z.jsx)(N,{to:`/`,className:`btn-primary`,children:`SEE RESTAURANTS NEAR YOU`})]})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .cart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 400px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 24px;
          align-items: start;
        }

        .cart-items-box {
          padding: 24px;
          border: 1px solid var(--border-medium);
          background-color: #fff;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-medium);
        }

        .cart-header h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-count-badge {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: var(--bg-surface);
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid var(--border-medium);
          font-weight: 600;
        }

        .clear-cart-btn {
          padding: 6px 14px;
          background: transparent;
          border: 1px solid var(--danger);
          color: var(--danger);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-cart-btn:hover {
          background: rgba(226, 55, 68, 0.05);
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px dashed var(--border-medium);
          gap: 20px;
        }

        .cart-item-row:last-child {
          border-bottom: none;
        }

        .item-details {
          flex: 1;
        }

        .item-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 6px;
          color: var(--text-primary);
        }

        .item-subtotal {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--brand-red);
          margin: 0 0 12px;
        }

        .qty-control-box {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          height: 32px;
          overflow: hidden;
          background: #fff;
        }

        .qty-adjust-btn {
          width: 32px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .qty-adjust-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .qty-val-display {
          padding: 0 8px;
          color: var(--success);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .item-image-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .item-thumb {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-medium);
        }

        .item-remove-btn {
          color: var(--danger);
          font-size: 0.75rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }

        .item-remove-btn:hover {
          opacity: 0.8;
        }

        .summary-card {
          position: sticky;
          top: 96px;
          padding: 24px;
          border: 1px solid var(--border-medium);
          background-color: #fff;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .coupon-box {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .coupon-title {
          font-size: 0.95rem;
          margin: 0 0 10px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .coupon-input-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .coupon-field {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          outline: none;
          text-transform: uppercase;
        }

        .coupon-field:focus {
          border-color: var(--brand-red);
        }

        .coupon-apply-btn {
          padding: 8px 14px;
          background-color: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }

        .coupon-apply-btn:hover {
          background-color: var(--brand-red-hover);
        }

        .applied-coupon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: rgba(96, 178, 70, 0.06);
          border: 1px dashed var(--success);
          border-radius: var(--radius-sm);
          margin-top: 6px;
        }

        .quick-codes-section {
          margin-top: 12px;
        }

        .chips-container {
          display: flex;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .coupon-chip-btn {
          padding: 4px 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 30px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }

        .coupon-chip-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bill-total-row {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          padding-top: 12px;
          padding-bottom: 20px;
          border-top: 1px dashed var(--border-medium);
          margin-top: 12px;
        }

        .checkout-action-btn {
          width: 100%;
          padding: 16px;
          background-color: var(--success);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 12px rgba(96, 178, 70, 0.2);
        }

        .checkout-action-btn:hover {
          background-color: #50a037;
        }

        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
          .summary-card {
            position: static;
          }
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
        }
      `}),(0,z.jsxs)(`div`,{className:`cart-layout fade-in`,children:[(0,z.jsxs)(`div`,{className:`cart-items-box`,children:[(0,z.jsxs)(`div`,{className:`cart-header`,children:[(0,z.jsxs)(`h2`,{children:[`Secure Checkout`,(0,z.jsxs)(`span`,{className:`item-count-badge`,children:[e.itemCount,` ITEMS`]})]}),(0,z.jsx)(`button`,{onClick:r,className:`clear-cart-btn`,children:`CLEAR CART`})]}),(0,z.jsx)(`div`,{className:`cart-items-list`,children:h.map(e=>(0,z.jsxs)(`div`,{className:`cart-item-row`,children:[(0,z.jsxs)(`div`,{className:`item-details`,children:[(0,z.jsx)(`h3`,{className:`item-title`,children:e.itemName}),(0,z.jsxs)(`p`,{className:`item-subtotal`,children:[`₹`,(e.price*e.quantity).toFixed(2)]}),(0,z.jsxs)(`div`,{className:`qty-control-box`,children:[(0,z.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>t(e.itemId,e.quantity-1),children:(0,z.jsx)(Zo,{size:14})}),(0,z.jsx)(`span`,{className:`qty-val-display`,children:e.quantity}),(0,z.jsx)(`button`,{className:`qty-adjust-btn`,onClick:()=>t(e.itemId,e.quantity+1),children:(0,z.jsx)(es,{size:14})})]})]}),(0,z.jsxs)(`div`,{className:`item-image-col`,children:[(0,z.jsx)(`div`,{className:`item-thumb`,children:(0,z.jsx)(`img`,{src:`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,alt:e.itemName,style:{width:`100%`,height:`100%`,objectFit:`cover`}})}),(0,z.jsx)(`button`,{onClick:()=>n(e.itemId),className:`item-remove-btn`,children:`Remove`})]})]},e.itemId))})]}),(0,z.jsxs)(`div`,{className:`summary-card`,children:[(0,z.jsxs)(`div`,{className:`coupon-box`,children:[(0,z.jsx)(`h3`,{className:`coupon-title`,children:`Apply Promo Code`}),i?(0,z.jsxs)(`div`,{className:`applied-coupon-row`,children:[(0,z.jsxs)(`span`,{style:{fontSize:`0.85rem`,fontWeight:700,color:`var(--success)`},children:[i.code,` (`,i.description,`)`]}),(0,z.jsx)(`button`,{onClick:o,className:`item-remove-btn`,style:{fontSize:`0.75rem`},children:`Remove`})]}):(0,z.jsxs)(`div`,{className:`coupon-input-group`,children:[(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. ZING50`,value:l,onChange:e=>u(e.target.value),className:`coupon-field`}),(0,z.jsx)(`button`,{onClick:p,className:`coupon-apply-btn`,children:`APPLY`})]}),d&&(0,z.jsx)(`p`,{style:{color:`var(--danger)`,fontSize:`0.78rem`,margin:`6px 0 0`,fontWeight:600},children:d}),!i&&(0,z.jsxs)(`div`,{className:`quick-codes-section`,children:[(0,z.jsx)(`span`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,fontWeight:700},children:`Quick Codes:`}),(0,z.jsxs)(`div`,{className:`chips-container`,children:[(0,z.jsx)(`button`,{onClick:()=>m(`ZING50`),className:`coupon-chip-btn`,children:`ZING50 (50% Off)`}),(0,z.jsx)(`button`,{onClick:()=>m(`FREEDEL`),className:`coupon-chip-btn`,children:`FREEDEL (Free Delivery)`})]})]})]}),(0,z.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontFamily:`'Outfit', sans-serif`,fontWeight:800,margin:`0 0 16px`},children:`Bill Details`}),(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Item Total`}),(0,z.jsxs)(`span`,{children:[`₹`,e.subtotal.toFixed(2)]})]}),(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Delivery Fee`}),(0,z.jsxs)(`span`,{children:[`₹`,e.shipping.toFixed(2)]})]}),(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Taxes and Charges`}),(0,z.jsxs)(`span`,{children:[`₹`,e.tax.toFixed(2)]})]}),e.discount>0&&(0,z.jsxs)(`div`,{className:`bill-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,z.jsx)(`span`,{children:`Promo Discount`}),(0,z.jsxs)(`span`,{children:[`-₹`,e.discount.toFixed(2)]})]}),(0,z.jsxs)(`div`,{className:`bill-row bill-total-row`,children:[(0,z.jsx)(`span`,{children:`TO PAY`}),(0,z.jsxs)(`span`,{children:[`₹`,e.total.toFixed(2)]})]}),(0,z.jsx)(`button`,{onClick:()=>c(s?`/checkout`:`/login?redirect=/checkout`),className:`checkout-action-btn`,children:s?`PROCEED TO PAY`:`LOGIN TO PROCEED`})]})]})]})},Os=()=>{let{cart:e,clearCart:t}=ao(),{user:n}=S.useContext(to),r=dt(),[i,a]=(0,S.useState)(`profile`);if(!e||e.itemCount===0)return r(`/cart`),null;let o=async()=>new Promise(e=>{if(window.Razorpay){e(!0);return}let t=document.createElement(`script`);t.src=`https://checkout.razorpay.com/v1/checkout.js`,t.onload=()=>e(!0),t.onerror=()=>e(!1),document.body.appendChild(t)});return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 400px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 24px;
          align-items: start;
        }

        .checkout-address-card {
          background-color: #fff;
          border: 1px solid var(--border-medium);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .checkout-payment-card {
          background-color: #fff;
          border: 1px solid var(--border-medium);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .checkout-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s;
        }

        .option-label:hover {
          background: var(--bg-surface);
        }

        .address-field {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }

        .address-field:focus {
          border-color: var(--brand-red);
        }

        .bill-summary-box {
          background-color: var(--bg-surface);
          padding: 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          border: 1px solid var(--border-light);
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bill-row:last-child {
          margin-bottom: 0;
        }

        .bill-divider {
          border: none;
          border-top: 1px dashed var(--text-muted);
          margin: 12px 0;
        }

        .bill-total-row {
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 800;
        }

        .pay-action-btn {
          width: 100%;
          padding: 16px;
          background-color: var(--success);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 12px rgba(96, 178, 70, 0.2);
        }

        .pay-action-btn:hover {
          background-color: #50a037;
        }

        @media (max-width: 850px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`checkout-layout fade-in`,children:[(0,z.jsxs)(`div`,{className:`checkout-address-card`,children:[(0,z.jsxs)(`h2`,{className:`checkout-title`,children:[(0,z.jsx)(Jo,{size:20,style:{display:`inline`,verticalAlign:`middle`,marginRight:`8px`,color:`var(--brand-red)`}}),`Delivery Address`]}),(0,z.jsxs)(`div`,{className:`option-group`,children:[(0,z.jsxs)(`label`,{className:`option-label`,children:[(0,z.jsx)(`input`,{type:`radio`,checked:i===`profile`,onChange:()=>a(`profile`)}),` Use profile address`]}),(0,z.jsxs)(`label`,{className:`option-label`,children:[(0,z.jsx)(`input`,{type:`radio`,checked:i===`manual`,onChange:()=>a(`manual`)}),` Enter manually`]})]}),(0,z.jsx)(`input`,{type:`text`,className:`address-field`,placeholder:`Enter your delivery address`,defaultValue:i===`profile`&&n?n.address:``})]}),(0,z.jsxs)(`div`,{className:`checkout-payment-card`,children:[(0,z.jsxs)(`h2`,{className:`checkout-title`,children:[(0,z.jsx)(Po,{size:20,style:{display:`inline`,verticalAlign:`middle`,marginRight:`8px`,color:`var(--brand-red)`}}),`Payment`]}),(0,z.jsxs)(`div`,{className:`option-group`,children:[(0,z.jsxs)(`label`,{className:`option-label`,children:[(0,z.jsx)(`input`,{type:`radio`,name:`pay`,defaultChecked:!0}),` `,(0,z.jsx)(Po,{size:16,style:{marginRight:`6px`}}),` Credit / Debit Card`]}),(0,z.jsxs)(`label`,{className:`option-label`,children:[(0,z.jsx)(`input`,{type:`radio`,name:`pay`}),` `,(0,z.jsx)(ss,{size:16,style:{marginRight:`6px`}}),` UPI`]}),(0,z.jsxs)(`label`,{className:`option-label`,children:[(0,z.jsx)(`input`,{type:`radio`,name:`pay`}),` `,(0,z.jsx)(go,{size:16,style:{marginRight:`6px`}}),` Cash on Delivery`]})]}),(0,z.jsxs)(`div`,{className:`bill-summary-box`,children:[(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Item Total`}),(0,z.jsxs)(`span`,{children:[`₹`,e.subtotal.toFixed(2)]})]}),(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Delivery Fee`}),(0,z.jsxs)(`span`,{children:[`₹`,e.shipping.toFixed(2)]})]}),(0,z.jsxs)(`div`,{className:`bill-row`,children:[(0,z.jsx)(`span`,{children:`Taxes`}),(0,z.jsxs)(`span`,{children:[`₹`,e.tax.toFixed(2)]})]}),e.discount>0&&(0,z.jsxs)(`div`,{className:`bill-row`,style:{color:`var(--success)`,fontWeight:700},children:[(0,z.jsx)(`span`,{children:`Promo Discount`}),(0,z.jsxs)(`span`,{children:[`-₹`,e.discount.toFixed(2)]})]}),(0,z.jsx)(`hr`,{className:`bill-divider`}),(0,z.jsxs)(`div`,{className:`bill-row bill-total-row`,children:[(0,z.jsx)(`strong`,{children:`TO PAY`}),(0,z.jsxs)(`strong`,{children:[`₹`,e.total.toFixed(2)]})]})]}),(0,z.jsxs)(`button`,{onClick:async()=>{if(!await o()){alert(`Failed to load Razorpay payment gateway.`);return}let n={key:`rzp_test_RU5HIdwTwlQNOw`,amount:Math.round(e.total*100),currency:`INR`,name:`ZingBite`,description:`Order Payment`,handler:async function(n){try{let n=(e.items?Array.isArray(e.items)?e.items:Object.values(e.items):[]).map(e=>({id:e.itemId,qty:e.quantity,price:e.price})),i=(await R.post(`/api/profile`,{action:`createOrder`,total:e.total,paymentMethod:`Razorpay`,items:n})).data.orderId||`ZB-latest`;t(),r(`/track-order?orderId=${i}`)}catch(e){console.error(`Failed to save order to database:`,e),t(),r(`/track-order`)}},theme:{color:`#F7374F`}};new window.Razorpay(n).open()},className:`pay-action-btn`,children:[`PROCEED TO PAY (₹`,e.total.toFixed(2),`)`]})]})]})]})},ks=()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(``),[i,a]=(0,S.useState)(``),[o,s]=(0,S.useState)(!1),[c,l]=(0,S.useState)(null),{login:u}=(0,S.useContext)(to),d=dt(),[f]=Rn(),p=f.get(`redirect`)||`/`;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .login-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .login-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .login-hero { display: block; }
        }
        .login-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .login-hero:hover img {
          transform: scale(1.05);
        }
        .login-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.7) 0%, rgba(0,0,0,0.5) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .login-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .login-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
        }
        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #fff;
        }
        .login-form-container {
          width: 100%;
          max-width: 400px;
          animation: fadeInScale 0.5s ease-out both;
        }
        @media (max-width: 768px) {
          .login-form-section {
            padding: 24px 16px;
          }
          .login-page {
            min-height: auto;
            flex-direction: column;
          }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .login-form-container h2 {
          font-size: 2rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .login-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 36px;
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
        }
        .form-field label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1rem;
          pointer-events: none;
          transition: all 0.25s ease;
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          font-size: 0.78rem;
          color: var(--brand-red);
          font-weight: 500;
        }
        .form-field input {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          background: #fff;
        }
        .form-field.focused input {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .login-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 20px;
          font-size: 0.9rem;
          animation: shake 0.4s ease-in-out;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .login-submit {
          width: 100%;
          padding: 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .login-submit:hover:not(:disabled) {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.3);
        }
        .login-submit:active {
          transform: translateY(0);
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
      `}),(0,z.jsxs)(`div`,{className:`login-page`,children:[(0,z.jsxs)(`div`,{className:`login-hero`,children:[(0,z.jsx)(`img`,{src:`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`,alt:`Food`}),(0,z.jsxs)(`div`,{className:`login-hero-overlay`,children:[(0,z.jsxs)(`h2`,{children:[`Welcome`,(0,z.jsx)(`br`,{}),`Back!`]}),(0,z.jsx)(`p`,{children:`Order your favorite food from the best restaurants in town`})]})]}),(0,z.jsx)(`div`,{className:`login-form-section`,children:(0,z.jsxs)(`div`,{className:`login-form-container`,children:[(0,z.jsx)(`h2`,{children:`Login`}),(0,z.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,z.jsx)(N,{to:`/register`,children:`create an account`})]}),i&&(0,z.jsxs)(`div`,{className:`login-error`,children:[(0,z.jsx)(ms,{size:16}),` `,i]}),(0,z.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),a(``),s(!0);let r=await u(e,n);if(s(!1),r.success){let e=r.user,t=p;t===`/`&&(e.role===`delivery_partner`?t=`/delivery`:e.role===`restaurant_admin`?t=`/restaurant-admin`:e.role===`super_admin`&&(t=`/admin`)),d(t)}else a(r.error||`Login failed`)},children:[(0,z.jsxs)(`div`,{className:`form-field ${c===`email`?`focused`:``} ${e?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Email address`}),(0,z.jsx)(`input`,{type:`email`,value:e,onChange:e=>t(e.target.value),onFocus:()=>l(`email`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`password`?`focused`:``} ${n?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Password`}),(0,z.jsx)(`input`,{type:`password`,value:n,onChange:e=>r(e.target.value),onFocus:()=>l(`password`),onBlur:()=>l(null),required:!0})]}),(0,z.jsx)(`button`,{type:`submit`,className:`login-submit`,disabled:o,children:o?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(W,{size:16,className:`spin-icon`}),` Logging in...`]}):`LOGIN`})]})]})})]})]})},As=()=>{let[e,t]=(0,S.useState)({username:``,email:``,mobile:``,password:``,confirmPassword:``,address:``,role:`customer`}),[n,r]=(0,S.useState)(`91`),[i,a]=(0,S.useState)(``),[o,s]=(0,S.useState)(!1),[c,l]=(0,S.useState)(null),[u,d]=(0,S.useState)(!1),f=dt(),p={91:{label:`+91 (IN)`,length:10},1:{label:`+1 (US)`,length:10},44:{label:`+44 (UK)`,length:10},971:{label:`+971 (UAE)`,length:9}},m=n=>t({...e,[n.target.name]:n.target.value});return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .register-page {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .register-hero {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) {
          .register-hero { display: block; }
        }
        .register-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }
        .register-hero:hover img {
          transform: scale(1.05);
        }
        .register-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(247,55,79,0.7) 0%, rgba(0,0,0,0.5) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px;
        }
        .register-hero-overlay h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .register-hero-overlay p {
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
          max-width: 400px;
        }
        .register-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: #fff;
        }
        .register-form-container {
          width: 100%;
          max-width: 400px;
          padding-right: 8px;
          animation: fadeInScale 0.5s ease-out both;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .register-form-container h2 {
          font-size: 2rem;
          margin-bottom: 6px;
          color: var(--text-primary);
        }
        .register-form-container .subtitle {
          color: var(--text-secondary);
          margin-bottom: 32px;
          font-size: 0.95rem;
        }
        .register-form-container .subtitle a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: none;
        }
        .form-field {
          position: relative;
          margin-bottom: 18px;
        }
        .form-field label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1rem;
          pointer-events: none;
          transition: all 0.25s ease;
          background: #fff;
          padding: 0 4px;
        }
        .form-field.focused label,
        .form-field.filled label {
          top: 0;
          font-size: 0.78rem;
          color: var(--brand-red);
          font-weight: 500;
        }
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          background: #fff;
          resize: vertical;
        }
        .form-field.focused input,
        .form-field.focused textarea {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .form-field textarea {
          min-height: 80px;
        }
        .form-field.textarea-field label {
          top: 16px;
          transform: none;
        }
        .form-field.textarea-field.focused label,
        .form-field.textarea-field.filled label {
          top: -8px;
          transform: none;
        }
        .phone-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 18px;
        }
        .phone-prefix-select-wrapper {
          position: relative;
          width: 110px;
          flex-shrink: 0;
        }
        .phone-prefix-select {
          width: 100%;
          height: 100%;
          padding: 16px 28px 16px 16px;
          border: 2px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          appearance: none;
          font-weight: 500;
        }
        .phone-input-group.focused .phone-prefix-select {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
        }
        .select-chevron {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }
        .phone-input-group.focused .select-chevron {
          color: var(--brand-red);
        }
        .terms-checkbox-field {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          margin-top: 12px;
          user-select: none;
        }
        .terms-checkbox-field input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--brand-red);
          cursor: pointer;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .terms-checkbox-field label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 1.4;
        }
        .terms-checkbox-field label a {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: underline;
        }
        .terms-checkbox-field label a:hover {
          color: var(--brand-red-hover);
        }
        .register-error {
          background: rgba(226, 55, 68, 0.06);
          border: 1px solid rgba(226, 55, 68, 0.2);
          color: var(--danger);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 18px;
          font-size: 0.9rem;
          animation: shake 0.4s ease-in-out;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .register-submit {
          width: 100%;
          padding: 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .register-submit:hover:not(:disabled) {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.3);
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
        @media (max-width: 768px) {
          .register-form-section {
            padding: 24px 16px;
          }
          .register-page {
            min-height: auto;
            flex-direction: column;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`register-page`,children:[(0,z.jsxs)(`div`,{className:`register-hero`,children:[(0,z.jsx)(`img`,{src:`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop`,alt:`Food`}),(0,z.jsxs)(`div`,{className:`register-hero-overlay`,children:[(0,z.jsxs)(`h2`,{children:[`Join`,(0,z.jsx)(`br`,{}),`ZingBite!`]}),(0,z.jsx)(`p`,{children:`Create an account and start ordering from hundreds of restaurants`})]})]}),(0,z.jsx)(`div`,{className:`register-form-section`,children:(0,z.jsxs)(`div`,{className:`register-form-container`,children:[(0,z.jsx)(`h2`,{children:`Sign Up`}),(0,z.jsxs)(`p`,{className:`subtitle`,children:[`or `,(0,z.jsx)(N,{to:`/login`,children:`login to your account`})]}),i&&(0,z.jsxs)(`div`,{className:`register-error`,children:[(0,z.jsx)(ms,{size:16}),` `,i]}),(0,z.jsxs)(`form`,{onSubmit:async t=>{if(t.preventDefault(),a(``),e.password!==e.confirmPassword){a(`Passwords do not match`);return}if(!u){a(`You must agree to the Terms & Conditions`);return}let r=p[n].length,i=e.mobile.replace(/\D/g,``);if(i.length!==r){a(`Mobile number for this country must be exactly ${r} digits`);return}s(!0);try{let t={...e,mobile:`${n}${i}`};(await R.post(`/api/register`,t)).data.success&&f(`/login`)}catch(e){a(e.response?.data?.error||`Registration failed`)}finally{s(!1)}},children:[(0,z.jsxs)(`div`,{className:`form-field ${c===`username`?`focused`:``} ${e.username?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Full Name`}),(0,z.jsx)(`input`,{type:`text`,name:`username`,value:e.username,onChange:m,onFocus:()=>l(`username`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`email`?`focused`:``} ${e.email?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Email address`}),(0,z.jsx)(`input`,{type:`email`,name:`email`,value:e.email,onChange:m,onFocus:()=>l(`email`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`phone-input-group ${c===`mobile`?`focused`:``}`,children:[(0,z.jsxs)(`div`,{className:`phone-prefix-select-wrapper`,children:[(0,z.jsxs)(`select`,{value:n,onChange:e=>r(e.target.value),onFocus:()=>l(`mobile`),onBlur:()=>l(null),className:`phone-prefix-select`,children:[(0,z.jsx)(`option`,{value:`91`,children:`+91 (IN)`}),(0,z.jsx)(`option`,{value:`1`,children:`+1 (US)`}),(0,z.jsx)(`option`,{value:`44`,children:`+44 (UK)`}),(0,z.jsx)(`option`,{value:`971`,children:`+971 (UAE)`})]}),(0,z.jsx)(wo,{size:14,className:`select-chevron`})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`mobile`?`focused`:``} ${e.mobile?`filled`:``}`,style:{flex:1,marginBottom:0},children:[(0,z.jsxs)(`label`,{children:[`Mobile Number (`,p[n].length,` digits)`]}),(0,z.jsx)(`input`,{type:`tel`,name:`mobile`,value:e.mobile,onChange:m,onFocus:()=>l(`mobile`),onBlur:()=>l(null),required:!0})]})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`password`?`focused`:``} ${e.password?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Password`}),(0,z.jsx)(`input`,{type:`password`,name:`password`,value:e.password,onChange:m,onFocus:()=>l(`password`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`confirmPassword`?`focused`:``} ${e.confirmPassword?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Confirm Password`}),(0,z.jsx)(`input`,{type:`password`,name:`confirmPassword`,value:e.confirmPassword,onChange:m,onFocus:()=>l(`confirmPassword`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-field ${c===`role`?`focused`:``} ${e.role?`filled`:``}`,children:[(0,z.jsx)(`label`,{style:{top:0,fontSize:`0.78rem`,color:c===`role`?`var(--brand-red)`:`var(--text-muted)`,fontWeight:500},children:`Account Role`}),(0,z.jsxs)(`select`,{name:`role`,value:e.role,onChange:m,onFocus:()=>l(`role`),onBlur:()=>l(null),style:{width:`100%`,padding:`16px`,border:`2px solid var(--border-medium)`,borderRadius:`var(--radius-sm)`,fontSize:`1rem`,fontFamily:`inherit`,outline:`none`,background:`#fff`,appearance:`none`,cursor:`pointer`},children:[(0,z.jsx)(`option`,{value:`customer`,children:`Customer (Order Food)`}),(0,z.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner (Deliver Food)`}),(0,z.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin (Manage Menu)`}),(0,z.jsx)(`option`,{value:`super_admin`,children:`Super Admin (Platform Manager)`})]}),(0,z.jsx)(wo,{size:14,className:`select-chevron`,style:{position:`absolute`,right:`16px`,top:`50%`,transform:`translateY(-50%)`,pointerEvents:`none`,color:c===`role`?`var(--brand-red)`:`var(--text-muted)`}})]}),(0,z.jsxs)(`div`,{className:`form-field textarea-field ${c===`address`?`focused`:``} ${e.address?`filled`:``}`,children:[(0,z.jsx)(`label`,{children:`Delivery Address`}),(0,z.jsx)(`textarea`,{name:`address`,value:e.address,onChange:m,onFocus:()=>l(`address`),onBlur:()=>l(null),required:!0})]}),(0,z.jsxs)(`div`,{className:`terms-checkbox-field`,children:[(0,z.jsx)(`input`,{type:`checkbox`,id:`terms-checkbox`,checked:u,onChange:e=>d(e.target.checked),required:!0}),(0,z.jsxs)(`label`,{htmlFor:`terms-checkbox`,children:[`I agree to the `,(0,z.jsx)(N,{to:`/info/terms`,target:`_blank`,rel:`noopener noreferrer`,children:`Terms & Conditions`})]})]}),(0,z.jsx)(`button`,{type:`submit`,className:`register-submit`,disabled:o,children:o?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`,display:`inline-block`,verticalAlign:`middle`,marginRight:`6px`}}),` Creating...`]}):`CREATE ACCOUNT`})]})]})})]})]})},js=()=>{let{sectionId:e}=pt(),t=dt(),n=e||`about-us`,[r,i]=(0,S.useState)({name:``,email:``,subject:``,message:``}),[a,o]=(0,S.useState)(!1),[s,c]=(0,S.useState)({restName:``,owner:``,email:``,phone:``,city:``}),[l,u]=(0,S.useState)(!1),[d,f]=(0,S.useState)({name:``,city:``,vehicle:`bike`,phone:``}),[p,m]=(0,S.useState)(!1),[h,g]=(0,S.useState)(null),[_,v]=(0,S.useState)(null);(0,S.useEffect)(()=>{window.scrollTo(0,0)},[n]);let y=[{id:`about-us`,name:`About Us`,icon:Uo,group:`Company`},{id:`careers`,name:`Careers`,icon:yo,group:`Company`},{id:`team`,name:`Team`,icon:gs,group:`Company`},{id:`blog`,name:`Blog`,icon:vo,group:`Company`},{id:`help-faq`,name:`Help & FAQ`,icon:ko,group:`Support`},{id:`contact-us`,name:`Contact Us`,icon:qo,group:`Support`},{id:`partner-with-us`,name:`Partner With Us`,icon:bo,group:`Support`},{id:`ride-with-us`,name:`Ride With Us`,icon:_o,group:`Support`},{id:`terms`,name:`Terms & Conditions`,icon:Io,group:`Legal`},{id:`privacy`,name:`Privacy Policy`,icon:is,group:`Legal`},{id:`cookies`,name:`Cookie Policy`,icon:No,group:`Legal`},{id:`refunds`,name:`Refund Policy`,icon:ts,group:`Legal`}],b=e=>{e.preventDefault(),o(!0),setTimeout(()=>{i({name:``,email:``,subject:``,message:``}),o(!1)},4e3)},x=e=>{e.preventDefault(),u(!0),setTimeout(()=>{c({restName:``,owner:``,email:``,phone:``,city:``}),u(!1)},4e3)},C=e=>{e.preventDefault(),m(!0),setTimeout(()=>{f({name:``,city:``,vehicle:`bike`,phone:``}),m(!1)},4e3)},w=e=>{v(_===e?null:e)};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .info-page-layout {
          display: flex;
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          gap: 32px;
          align-items: start;
        }
        .info-sidebar {
          width: 260px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 16px;
          position: sticky;
          top: 90px;
          box-shadow: var(--shadow-sm);
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
          transition: all 0.2s ease;
        }
        .info-sidebar-btn:hover {
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        .info-sidebar-btn.active {
          color: #fff;
          background: var(--brand-red);
          font-weight: 600;
        }
        
        /* Mobile Dropdown */
        .info-mobile-selector {
          display: none;
          width: 100%;
          margin-bottom: 16px;
        }
        .info-mobile-select {
          width: 100%;
          padding: 14px;
          font-family: inherit;
          font-size: 1rem;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          background: #fff;
          color: var(--text-primary);
          outline: none;
          font-weight: 600;
        }

        .info-main-content {
          flex: 1;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: var(--shadow-sm);
          min-height: 500px;
        }

        /* Styles for inner content elements */
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
        
        /* Hero inside sections */
        .section-hero {
          padding: 24px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
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
        }
        .section-hero h2 {
          font-size: 1.6rem;
          margin-bottom: 8px;
        }
        
        .content-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }
        .grid-card {
          border: 1px solid var(--border-medium);
          padding: 20px;
          border-radius: var(--radius-md);
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
        
        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-box {
          background: var(--bg-surface);
          padding: 16px;
          text-align: center;
          border-radius: var(--radius-sm);
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

        /* Careers list */
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
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          background: #fff;
          transition: border-color 0.2s;
        }
        .job-card:hover {
          border-color: var(--brand-red);
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
          transition: background 0.2s;
        }
        .job-apply-btn:hover {
          background: var(--brand-red-hover);
        }

        /* Team styles */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .team-card {
          text-align: center;
          padding: 24px 16px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
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

        /* Blog styles */
        .blog-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .blog-card {
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
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
        }

        /* FAQ Accordion */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .faq-item {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #fff;
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
          background: var(--bg-surface);
        }
        .faq-chevron {
          transition: transform 0.25s ease;
          color: var(--text-muted);
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: var(--brand-red);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
          background: var(--bg-surface);
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

        /* Contact & Partner Form */
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
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus, 
        .form-group textarea:focus {
          border-color: var(--brand-red);
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
          transition: background 0.2s;
        }
        .form-submit-btn:hover {
          background: var(--brand-red-hover);
        }
        .form-success {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-medium);
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

        /* Legal Policy Styling */
        .legal-text h3 {
          font-size: 1.25rem;
          margin: 24px 0 10px;
          color: var(--text-primary);
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
      `}),(0,z.jsxs)(`div`,{className:`info-page-layout fade-in`,children:[(0,z.jsx)(`aside`,{className:`info-sidebar`,children:[`Company`,`Support`,`Legal`].map(e=>(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h3`,{className:`info-group-title`,children:e}),y.filter(t=>t.group===e).map(e=>{let r=e.icon;return(0,z.jsxs)(`button`,{className:`info-sidebar-btn ${n===e.id?`active`:``}`,onClick:()=>t(`/info/${e.id}`),children:[(0,z.jsx)(r,{size:16}),e.name]},e.id)})]},e))}),(0,z.jsx)(`div`,{className:`info-mobile-selector`,children:(0,z.jsxs)(`select`,{className:`info-mobile-select`,value:n,onChange:e=>t(`/info/${e.target.value}`),children:[(0,z.jsx)(`optgroup`,{label:`Company`,children:y.filter(e=>e.group===`Company`).map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,z.jsx)(`optgroup`,{label:`Support`,children:y.filter(e=>e.group===`Support`).map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,z.jsx)(`optgroup`,{label:`Legal`,children:y.filter(e=>e.group===`Legal`).map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))})]})}),(0,z.jsx)(`main`,{className:`info-main-content`,children:(()=>{switch(n){case`about-us`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsxs)(`div`,{className:`section-hero`,style:{background:`linear-gradient(135deg, rgba(247,55,79,0.08) 0%, rgba(255,255,255,1) 100%)`},children:[(0,z.jsx)(`span`,{className:`hero-badge`,children:`OUR STORY`}),(0,z.jsx)(`h2`,{children:`Delivering Happiness, One Bite at a Time`}),(0,z.jsx)(`p`,{children:`Founded in 2026, ZingBite is local community-centric food delivery reimagined. We bridge the gap between hungry food lovers and local culinary spots with speed, quality, and care.`})]}),(0,z.jsxs)(`div`,{className:`content-grid-2`,children:[(0,z.jsxs)(`div`,{className:`grid-card`,children:[(0,z.jsx)(`h3`,{children:`Our Mission`}),(0,z.jsx)(`p`,{children:`To empower local restaurants to reach more food lovers while providing a seamless, reliable, and premium food delivery experience for our users.`})]}),(0,z.jsxs)(`div`,{className:`grid-card`,children:[(0,z.jsx)(`h3`,{children:`Our Vision`}),(0,z.jsx)(`p`,{children:`To become the most loved and respected food technology network, recognized for our commitment to quality, community values, and technological innovation.`})]})]}),(0,z.jsxs)(`div`,{className:`stats-row`,children:[(0,z.jsxs)(`div`,{className:`stat-box`,children:[(0,z.jsx)(`h4`,{children:`500+`}),(0,z.jsx)(`p`,{children:`Partner Restaurants`})]}),(0,z.jsxs)(`div`,{className:`stat-box`,children:[(0,z.jsx)(`h4`,{children:`150K+`}),(0,z.jsx)(`p`,{children:`Completed Deliveries`})]}),(0,z.jsxs)(`div`,{className:`stat-box`,children:[(0,z.jsx)(`h4`,{children:`25 Mins`}),(0,z.jsx)(`p`,{children:`Average Delivery Time`})]}),(0,z.jsxs)(`div`,{className:`stat-box`,children:[(0,z.jsx)(`h4`,{children:`4.8 ★`}),(0,z.jsx)(`p`,{children:`App Rating`})]})]})]});case`careers`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Careers at ZingBite`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`We are always looking for passionate, driven, and creative individuals to join our team and build the future of food tech.`}),(0,z.jsx)(`div`,{className:`jobs-list`,children:[{id:1,title:`Senior Frontend Engineer (React)`,dept:`Engineering`,loc:`Remote / Bangalore`,salary:`₹18L - ₹24L`},{id:2,title:`Product Designer (UX/UI)`,dept:`Design`,loc:`Hybrid (Delhi/NCR)`,salary:`₹12L - ₹16L`},{id:3,title:`Logistics Operations Lead`,dept:`Operations`,loc:`On-site (Mumbai)`,salary:`₹8L - ₹11L`},{id:4,title:`Customer Support Executive`,dept:`Customer Care`,loc:`Remote`,salary:`₹4L - ₹6L`}].map(e=>(0,z.jsxs)(`div`,{className:`job-card`,children:[(0,z.jsxs)(`div`,{className:`job-main`,children:[(0,z.jsx)(`h4`,{children:e.title}),(0,z.jsxs)(`div`,{className:`job-meta`,children:[(0,z.jsx)(`span`,{children:e.dept}),(0,z.jsx)(`span`,{className:`dot`}),(0,z.jsx)(`span`,{children:e.loc}),(0,z.jsx)(`span`,{className:`dot`}),(0,z.jsx)(`span`,{children:e.salary})]})]}),(0,z.jsx)(`button`,{onClick:()=>{g(e.title),setTimeout(()=>g(null),3e3)},className:`job-apply-btn`,children:h===e.title?`Applied Successfully!`:`Apply Now`})]},e.id))}),h&&(0,z.jsxs)(`div`,{className:`toast-notification`,children:[(0,z.jsx)(Do,{size:16}),` Applied for `,(0,z.jsx)(`strong`,{children:h}),` position!`]})]});case`team`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Meet Our Leadership`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`The dedicated dreamers and makers steering ZingBite towards new culinary heights.`}),(0,z.jsx)(`div`,{className:`team-grid`,children:[{name:`Sreenivas Dasari`,role:`Co-Founder & CEO`,desc:`Tech visionary and food enthusiast with 10+ years of tech-firm scaling experience.`},{name:`Priya Sharma`,role:`Chief Technology Officer`,desc:`Former staff engineer at major delivery platforms, leading our high-performance React-Java stack.`},{name:`Vikram Malhotra`,role:`Head of Culinary Partnerships`,desc:`Culinary arts graduate dedicated to bringing the best local gems onto the ZingBite grid.`},{name:`Amit Patel`,role:`VP of Logistics & Operations`,desc:`Operations mastermind ensuring our delivery fleet is optimized, secure, and fast.`}].map((e,t)=>(0,z.jsxs)(`div`,{className:`team-card`,children:[(0,z.jsx)(`div`,{className:`team-avatar`,children:e.name.split(` `).map(e=>e[0]).join(``)}),(0,z.jsx)(`h4`,{children:e.name}),(0,z.jsx)(`span`,{className:`team-role`,children:e.role}),(0,z.jsx)(`p`,{children:e.desc})]},t))})]});case`blog`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`ZingBite Blog`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`Stories, recipes, product insights, and news from our food ecosystem.`}),(0,z.jsx)(`div`,{className:`blog-grid`,children:[{title:`Top 10 Food Trends Redefining Delivery in 2026`,read:`5 min read`,date:`June 01, 2026`,desc:`Explore the culinary landscape of 2026, from eco-packaging to regional gourmet selections.`},{title:`Behind the Technology: Scaling Real-time API Tracking`,read:`8 min read`,date:`May 28, 2026`,desc:`An engineering deep-dive on how we handle sub-second rider location updates using WebSocket connections.`},{title:`Savoring Sustainability: Reducing Single-Use Plastic`,read:`4 min read`,date:`May 15, 2026`,desc:`How ZingBite partnered with 100+ vendors to pioneer compostable packaging options in local regions.`}].map((e,t)=>(0,z.jsxs)(`article`,{className:`blog-card`,children:[(0,z.jsxs)(`span`,{className:`blog-meta`,children:[e.date,` • `,e.read]}),(0,z.jsx)(`h4`,{children:e.title}),(0,z.jsx)(`p`,{children:e.desc}),(0,z.jsxs)(`a`,{href:`#read`,onClick:e=>{e.preventDefault(),alert(`Blog reading functionality coming soon!`)},className:`blog-link`,children:[`Read Article `,(0,z.jsx)(Fo,{size:14})]})]},t))})]});case`help-faq`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Help & Support`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`Frequently Asked Questions. If you can't find your answer here, please contact customer support.`}),(0,z.jsx)(`div`,{className:`faq-list`,children:[{q:`How do I place an order on ZingBite?`,a:`To order, search for a restaurant on the Home page, browse their menu, select your food, add them to your cart, click Proceed to Pay, enter your address, and complete payment using your credit/debit card, UPI, or cash.`},{q:`What payment methods do you support?`,a:`We support major Credit and Debit cards (Visa/Mastercard/RuPay), UPI (GPay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD) for selected restaurants.`},{q:`How can I track my delivery in real-time?`,a:`Once your order is confirmed, you will receive real-time status updates on the dashboard from 'Order Accepted' to 'Out for Delivery' with rider tracking.`},{q:`What is your cancellation policy?`,a:`You can cancel your order within 60 seconds of placing it. After the restaurant accepts your order, cancellations are subject to a fee to compensate for prepared food and rider resources.`},{q:`How do I update my profile details?`,a:`Log into your account, click on your profile/user icon in the Header, and update your delivery address or contact number.`}].map((e,t)=>(0,z.jsxs)(`div`,{className:`faq-item ${_===t?`open`:``}`,children:[(0,z.jsxs)(`button`,{onClick:()=>w(t),className:`faq-question`,children:[(0,z.jsx)(`span`,{children:e.q}),(0,z.jsx)(wo,{size:18,className:`faq-chevron`})]}),(0,z.jsx)(`div`,{className:`faq-answer`,children:(0,z.jsx)(`p`,{children:e.a})})]},t))})]});case`contact-us`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Contact Us`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`Have a question, feedback, or need help? Reach out to us, and we will get back to you as soon as possible.`}),(0,z.jsxs)(`div`,{className:`contact-split`,children:[(0,z.jsxs)(`div`,{className:`contact-info`,children:[(0,z.jsx)(`h3`,{children:`Contact Information`}),(0,z.jsxs)(`div`,{className:`contact-row`,children:[(0,z.jsx)(Jo,{size:18,color:`var(--brand-red)`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Headquarters`}),(0,z.jsx)(`p`,{children:`12th Floor, Tech Park Towers, Indiranagar, Bangalore, Karnataka - 560038`})]})]}),(0,z.jsxs)(`div`,{className:`contact-row`,children:[(0,z.jsx)(qo,{size:18,color:`var(--brand-red)`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Support Email`}),(0,z.jsx)(`p`,{children:`support@zingbite.com`})]})]}),(0,z.jsxs)(`div`,{className:`contact-row`,children:[(0,z.jsx)($o,{size:18,color:`var(--brand-red)`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Helpline`}),(0,z.jsx)(`p`,{children:`+91 80 4455 6677 (9 AM - 11 PM)`})]})]})]}),(0,z.jsx)(`div`,{className:`contact-form-container`,children:a?(0,z.jsxs)(`div`,{className:`form-success`,children:[(0,z.jsx)(Do,{size:32,color:`var(--success)`}),(0,z.jsx)(`h3`,{children:`Message Sent!`}),(0,z.jsx)(`p`,{children:`Thank you for reaching out. A support agent will contact you shortly.`})]}):(0,z.jsxs)(`form`,{onSubmit:b,className:`info-form`,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Your Name`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:r.name,onChange:e=>i({...r,name:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Email Address`}),(0,z.jsx)(`input`,{type:`email`,required:!0,value:r.email,onChange:e=>i({...r,email:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Subject`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:r.subject,onChange:e=>i({...r,subject:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Message`}),(0,z.jsx)(`textarea`,{rows:4,required:!0,value:r.message,onChange:e=>i({...r,message:e.target.value})})]}),(0,z.jsxs)(`button`,{type:`submit`,className:`form-submit-btn`,children:[(0,z.jsx)(rs,{size:16}),` SEND MESSAGE`]})]})})]})]});case`partner-with-us`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Partner With Us`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`Join ZingBite as a restaurant partner to reach thousands of local customers, streamline operations, and scale your brand.`}),(0,z.jsxs)(`div`,{className:`contact-split`,children:[(0,z.jsxs)(`div`,{className:`contact-info`,children:[(0,z.jsx)(`h3`,{children:`Why Partner with Us?`}),(0,z.jsxs)(`ul`,{className:`benefits-list`,children:[(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Increase Sales:`}),` Tap into our wide network of active diners looking for delicious meals.`]}),(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Dedicated Logistics:`}),` Focus on preparing culinary delicacies while we handle the delivery.`]}),(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Growth Insights:`}),` Gain access to custom dashboards to analyze sales, metrics, and trends.`]})]})]}),(0,z.jsx)(`div`,{className:`contact-form-container`,children:l?(0,z.jsxs)(`div`,{className:`form-success`,children:[(0,z.jsx)(Do,{size:32,color:`var(--success)`}),(0,z.jsx)(`h3`,{children:`Application Submitted!`}),(0,z.jsx)(`p`,{children:`Our merchant team will review your application and reach out within 2 business days.`})]}):(0,z.jsxs)(`form`,{onSubmit:x,className:`info-form`,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Restaurant Name`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:s.restName,onChange:e=>c({...s,restName:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Owner Name`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:s.owner,onChange:e=>c({...s,owner:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Email Address`}),(0,z.jsx)(`input`,{type:`email`,required:!0,value:s.email,onChange:e=>c({...s,email:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Mobile Number`}),(0,z.jsx)(`input`,{type:`tel`,required:!0,value:s.phone,onChange:e=>c({...s,phone:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`City`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:s.city,onChange:e=>c({...s,city:e.target.value})})]}),(0,z.jsxs)(`button`,{type:`submit`,className:`form-submit-btn`,children:[(0,z.jsx)(bo,{size:16}),` REGISTER RESTAURANT`]})]})})]})]});case`ride-with-us`:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Ride With Us`}),(0,z.jsx)(`p`,{className:`section-desc`,children:`Join our fleet as a delivery partner. Get flexible work hours, attractive weekly payouts, and insurance coverage.`}),(0,z.jsxs)(`div`,{className:`contact-split`,children:[(0,z.jsxs)(`div`,{className:`contact-info`,children:[(0,z.jsx)(`h3`,{children:`Delivery Partner Perks`}),(0,z.jsxs)(`ul`,{className:`benefits-list`,children:[(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Weekly Earnings:`}),` Direct deposit of your delivery earnings plus tips into your bank account.`]}),(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Flexible Schedule:`}),` Choose your own shifts (Part-time, Full-time, Weekends only).`]}),(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`strong`,{children:`Insurance Cover:`}),` Group medical and accident cover for active delivery partners.`]})]})]}),(0,z.jsx)(`div`,{className:`contact-form-container`,children:p?(0,z.jsxs)(`div`,{className:`form-success`,children:[(0,z.jsx)(Do,{size:32,color:`var(--success)`}),(0,z.jsx)(`h3`,{children:`Rider Registration Initiated!`}),(0,z.jsx)(`p`,{children:`We've sent onboarding details to your phone number. Visit our local office to collect your kit!`})]}):(0,z.jsxs)(`form`,{onSubmit:C,className:`info-form`,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Full Name`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:d.name,onChange:e=>f({...d,name:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Mobile Number`}),(0,z.jsx)(`input`,{type:`tel`,required:!0,value:d.phone,onChange:e=>f({...d,phone:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`City`}),(0,z.jsx)(`input`,{type:`text`,required:!0,value:d.city,onChange:e=>f({...d,city:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Vehicle Type`}),(0,z.jsxs)(`select`,{value:d.vehicle,onChange:e=>f({...d,vehicle:e.target.value}),style:{width:`100%`,padding:`12px`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-sm)`},children:[(0,z.jsx)(`option`,{value:`bike`,children:`Bicycle / Electric Cycle`}),(0,z.jsx)(`option`,{value:`motorcycle`,children:`Motorcycle / Scooter`}),(0,z.jsx)(`option`,{value:`walk`,children:`On Foot (Selected zones)`})]})]}),(0,z.jsxs)(`button`,{type:`submit`,className:`form-submit-btn`,children:[(0,z.jsx)(_o,{size:16}),` APPLY AS RIDER`]})]})})]})]});case`terms`:return(0,z.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,z.jsx)(`h2`,{children:`Terms & Conditions`}),(0,z.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,z.jsx)(`h3`,{children:`1. Introduction`}),(0,z.jsx)(`p`,{children:`Welcome to ZingBite. These Terms and Conditions govern your use of our website, mobile application, and food delivery services. By accessing or using our services, you agree to comply with and be bound by these terms.`}),(0,z.jsx)(`h3`,{children:`2. User Accounts`}),(0,z.jsx)(`p`,{children:`To place an order, you must register and create a secure user account. You are solely responsible for maintaining the confidentiality of your credentials and password. Any actions performed under your account remain your responsibility.`}),(0,z.jsx)(`h3`,{children:`3. Placing Orders & Contract`}),(0,z.jsx)(`p`,{children:`All food orders placed through our platform are subject to availability and acceptance by the respective restaurant. The contract for the supply of food is formed directly between you and the restaurant when your order is accepted.`}),(0,z.jsx)(`h3`,{children:`4. Pricing & Payments`}),(0,z.jsx)(`p`,{children:`All prices displayed include menu costs set by restaurants. Delivery fees, taxes, and service charges are calculated at checkout. Payments are processed through secure gateways like Razorpay.`}),(0,z.jsx)(`h3`,{children:`5. Limitation of Liability`}),(0,z.jsx)(`p`,{children:`ZingBite acts as a delivery facilitator and is not responsible for the quality, safety, portion size, or ingredients of food prepared by partner restaurants.`})]});case`privacy`:return(0,z.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,z.jsx)(`h2`,{children:`Privacy Policy`}),(0,z.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,z.jsx)(`h3`,{children:`1. Information We Collect`}),(0,z.jsx)(`p`,{children:`We collect personal information that you provide directly, including name, email address, phone number, and delivery address. We also collect automated usage data and GPS location coordinates when the app is active to facilitate real-time tracking.`}),(0,z.jsx)(`h3`,{children:`2. How We Use Your Data`}),(0,z.jsx)(`p`,{children:`Your details are used to process orders, communicate status, route delivery partners, and improve customer support experiences. We do not sell or trade your data to third-party marketing companies.`}),(0,z.jsx)(`h3`,{children:`3. Sharing of Information`}),(0,z.jsx)(`p`,{children:`We share necessary information (name, address, telephone) with partner restaurants and delivery riders to fulfill your orders. We may disclose data when legally required by public authorities.`}),(0,z.jsx)(`h3`,{children:`4. Data Security`}),(0,z.jsx)(`p`,{children:`We use standard encryption techniques (SSL/TLS) and secure databases to protect your personal details from unauthorized access, modification, or leakage.`})]});case`cookies`:return(0,z.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,z.jsx)(`h2`,{children:`Cookie Policy`}),(0,z.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,z.jsx)(`h3`,{children:`1. What Are Cookies?`}),(0,z.jsx)(`p`,{children:`Cookies are small text files stored on your browser when you visit our website. They help us remember login states, keep track of items in your shopping cart, and monitor anonymous site analytics.`}),(0,z.jsx)(`h3`,{children:`2. Types of Cookies We Use`}),(0,z.jsx)(`div`,{style:{overflowX:`auto`,margin:`20px 0`},children:(0,z.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,fontSize:`0.9rem`},children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{style:{background:`var(--bg-surface)`,borderBottom:`2px solid var(--border-medium)`},children:[(0,z.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Category`}),(0,z.jsx)(`th`,{style:{padding:`12px`,textAlign:`left`},children:`Purpose`})]})}),(0,z.jsxs)(`tbody`,{children:[(0,z.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,z.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Essential`}),(0,z.jsx)(`td`,{style:{padding:`12px`},children:`Maintaining your logged-in session, authentication, and cart selections.`})]}),(0,z.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,z.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Analytics`}),(0,z.jsx)(`td`,{style:{padding:`12px`},children:`Tracking page views, click behaviors, and application speed metrics.`})]}),(0,z.jsxs)(`tr`,{style:{borderBottom:`1px solid var(--border-light)`},children:[(0,z.jsx)(`td`,{style:{padding:`12px`,fontWeight:600},children:`Marketing`}),(0,z.jsx)(`td`,{style:{padding:`12px`},children:`Remembering preferences to display tailored restaurant suggestions.`})]})]})]})}),(0,z.jsx)(`h3`,{children:`3. Managing Cookies`}),(0,z.jsx)(`p`,{children:`You can adjust your browser settings to refuse or delete cookies. However, please note that disabling essential cookies will prevent the cart and account checkout system from working correctly.`})]});case`refunds`:return(0,z.jsxs)(`div`,{className:`info-content-pane legal-text`,children:[(0,z.jsx)(`h2`,{children:`Refund & Cancellation Policy`}),(0,z.jsx)(`span`,{className:`last-updated`,children:`Last Updated: June 02, 2026`}),(0,z.jsx)(`h3`,{children:`1. Order Cancellations`}),(0,z.jsx)(`p`,{children:`Users can cancel their order free of charge within 60 seconds of submitting it. Once the restaurant begins cooking (Order Accepted status), cancellation requests are not eligible for a refund.`}),(0,z.jsx)(`h3`,{children:`2. Refund Eligibility`}),(0,z.jsx)(`p`,{children:`Refunds are initiated in full under the following circumstances:`}),(0,z.jsxs)(`ul`,{style:{margin:`12px 20px`,lineHeight:`1.7`},children:[(0,z.jsx)(`li`,{children:`The ordered restaurant item is out of stock (not available).`}),(0,z.jsx)(`li`,{children:`The restaurant cancels the order due to operational issues.`}),(0,z.jsx)(`li`,{children:`Delivery is delayed by more than 60 minutes beyond estimated delivery due to fleet error.`})]}),(0,z.jsx)(`h3`,{children:`3. Refund Timelines`}),(0,z.jsx)(`p`,{children:`Approved refunds are processed back to the original source of payment (Razorpay card/UPI) within 5 to 7 business days, depending on bank processing policies.`})]});default:return(0,z.jsxs)(`div`,{className:`info-content-pane`,children:[(0,z.jsx)(`h2`,{children:`Section Not Found`}),(0,z.jsx)(`p`,{children:`The section you are looking for does not exist. Please use the sidebar to choose a valid section.`})]})}})()})]})]})},Ms=()=>{let{user:e,logout:t,updateUser:n,loading:r}=(0,S.useContext)(to),{addToCart:i}=ao(),a=dt(),[o,s]=(0,S.useState)(`orders`),[c,l]=(0,S.useState)(!1),[u,d]=(0,S.useState)(!1),[f,p]=(0,S.useState)({username:e?.userName||e?.username||`Guest User`,email:e?.email||`guest@zingbite.com`,mobile:String(e?.phoneNumber||e?.mobile||``),address:e?.address||`123 Main Street`});(0,S.useEffect)(()=>{e&&p({username:e.userName||e.username||`Guest User`,email:e.email||`guest@zingbite.com`,mobile:String(e.phoneNumber||e.mobile||``),address:e.address||`123 Main Street`})},[e]);let[m,h]=(0,S.useState)(()=>{let t=localStorage.getItem(`addresses_${e?.email}`);return t?JSON.parse(t):[{id:1,type:`Home`,address:e?.address||`123 Main Street, Indiranagar, Bangalore`},{id:2,type:`Work`,address:`456 Tech Park, Whitefield, Bangalore`}]});(0,S.useEffect)(()=>{e?.email&&localStorage.setItem(`addresses_${e.email}`,JSON.stringify(m))},[m,e?.email]);let[g,_]=(0,S.useState)(`Other`),[v,y]=(0,S.useState)(``),[b,x]=(0,S.useState)(!1),[C,w]=(0,S.useState)(!1),[ee,T]=(0,S.useState)([]),[E,D]=(0,S.useState)(!0);(0,S.useEffect)(()=>{e&&(async()=>{try{T((await R.get(`/api/profile?action=orders`)).data)}catch(e){console.error(`Error fetching past orders:`,e)}finally{D(!1)}})()},[e]);let te=async e=>{e.preventDefault(),d(!0);try{let e=await R.post(`/api/profile`,{action:`update`,username:f.username,mobile:f.mobile,address:f.address});e.data.success&&(n(e.data.user),l(!1))}catch(e){alert(e.response?.data?.error||`Failed to update profile`)}finally{d(!1)}},ne=e=>{e.preventDefault(),v&&(h([...m,{id:Date.now(),type:g,address:v}]),y(``),x(!1))},O=e=>{h(m.filter(t=>t.id!==e))},re=async e=>{w(!0);try{for(let t of e)await i(t.id,t.qty);a(`/cart`)}catch(e){console.error(e),alert(`Error during reordering. Please try again.`)}finally{w(!1)}};return r?(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,z.jsx)(W,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):e?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .profile-layout {
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
        }
        
        .profile-sidebar {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px 16px;
          box-shadow: var(--shadow-sm);
          text-align: center;
        }
        
        .profile-avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          font-size: 2.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 2px solid rgba(247,55,79,0.15);
        }
        
        .profile-sidebar-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        
        .profile-sidebar-email {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 24px;
          word-break: break-all;
        }
        
        .profile-menu-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border-light);
          padding-top: 20px;
        }
        
        .profile-menu-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-align: left;
        }
        
        .profile-menu-btn:hover {
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        
        .profile-menu-btn.active {
          color: #fff;
          background: var(--brand-red);
        }
        
        .profile-menu-btn.logout-btn {
          color: var(--danger);
          margin-top: 16px;
          border: 1px solid rgba(226, 55, 68, 0.15);
        }
        
        .profile-menu-btn.logout-btn:hover {
          background: rgba(226, 55, 68, 0.05);
        }
        
        .profile-content-area {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: var(--shadow-sm);
          min-height: 480px;
        }
        
        .profile-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        
        .profile-content-header h2 {
          font-size: 1.6rem;
          margin: 0;
        }
        
        /* Edit profile form */
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 500px;
        }
        
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .profile-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .profile-field label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .profile-field input, 
        .profile-field textarea {
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          background: #fdfdfd;
        }
        
        .profile-field input:focus, 
        .profile-field textarea:focus {
          border-color: var(--brand-red);
          background: #fff;
        }
        
        .profile-field.disabled-field input {
          background: var(--bg-surface);
          color: var(--text-muted);
          cursor: not-allowed;
        }
        
        .profile-edit-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.85rem;
        }
        
        .profile-edit-trigger:hover {
          color: var(--brand-red);
          border-color: var(--brand-red);
        }
        
        .profile-save-btn {
          padding: 12px 24px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.95rem;
          align-self: flex-start;
        }
        
        .profile-save-btn:hover {
          background: var(--brand-red-hover);
        }
        
        /* Addresses style */
        .addresses-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .address-card {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .address-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .address-badge {
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .address-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        
        .delete-address-btn {
          align-self: flex-end;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .delete-address-btn:hover {
          color: var(--danger);
        }
        
        .add-address-card {
          border: 1px dashed var(--border-medium);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.2s;
          min-height: 160px;
        }
        
        .add-address-card:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.01);
        }
        
        /* Past Orders */
        .orders-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .order-card {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        
        .order-header-info {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 12px;
          margin-bottom: 12px;
        }
        
        .order-shop h4 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        
        .order-shop span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .order-amount-status {
          text-align: right;
        }
        
        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          background: rgba(96, 178, 70, 0.08);
          color: var(--success);
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        
        .order-items-list {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        
        .order-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .order-total-lbl {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .reorder-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .reorder-btn:hover:not(:disabled) {
          background: var(--brand-red-hover);
        }
        
        .reorder-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .empty-profile {
          max-width: 500px;
          margin: 80px auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .empty-profile h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }
        
        .empty-profile p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        
        .login-btn {
          padding: 12px 32px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
        }
        
        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .profile-content-area {
            padding: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .addresses-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`profile-layout fade-in`,children:[(0,z.jsxs)(`aside`,{className:`profile-sidebar`,children:[(0,z.jsx)(`div`,{className:`profile-avatar-circle`,children:f.username.split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}),(0,z.jsx)(`h3`,{className:`profile-sidebar-name`,children:f.username}),(0,z.jsx)(`p`,{className:`profile-sidebar-email`,children:f.email}),(0,z.jsxs)(`nav`,{className:`profile-menu-list`,children:[(0,z.jsxs)(`button`,{className:`profile-menu-btn ${o===`orders`?`active`:``}`,onClick:()=>s(`orders`),children:[(0,z.jsx)(jo,{size:16}),` Past Orders`]}),(0,z.jsxs)(`button`,{className:`profile-menu-btn ${o===`addresses`?`active`:``}`,onClick:()=>s(`addresses`),children:[(0,z.jsx)(Jo,{size:16}),` Saved Addresses`]}),(0,z.jsxs)(`button`,{className:`profile-menu-btn ${o===`details`?`active`:``}`,onClick:()=>s(`details`),children:[(0,z.jsx)(hs,{size:16}),` My Account`]}),(0,z.jsxs)(`button`,{onClick:t,className:`profile-menu-btn logout-btn`,children:[(0,z.jsx)(Ko,{size:16}),` Log Out`]})]})]}),(0,z.jsxs)(`main`,{className:`profile-content-area`,children:[o===`details`&&(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`profile-content-header`,children:[(0,z.jsx)(`h2`,{children:`Account Information`}),!c&&(0,z.jsxs)(`button`,{onClick:()=>l(!0),className:`profile-edit-trigger`,children:[(0,z.jsx)(cs,{size:14}),` Edit Profile`]})]}),(0,z.jsxs)(`form`,{onSubmit:te,className:`profile-form`,children:[(0,z.jsxs)(`div`,{className:`form-row-2`,children:[(0,z.jsxs)(`div`,{className:`profile-field`,children:[(0,z.jsx)(`label`,{children:`Full Name`}),(0,z.jsx)(`input`,{type:`text`,required:!0,disabled:!c,value:f.username,onChange:e=>p({...f,username:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`profile-field disabled-field`,children:[(0,z.jsx)(`label`,{children:`Email Address`}),(0,z.jsx)(`input`,{type:`email`,disabled:!0,value:f.email})]})]}),(0,z.jsxs)(`div`,{className:`profile-field`,children:[(0,z.jsx)(`label`,{children:`Mobile Number`}),(0,z.jsx)(`input`,{type:`tel`,required:!0,disabled:!c,value:f.mobile,onChange:e=>p({...f,mobile:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`profile-field`,children:[(0,z.jsx)(`label`,{children:`Default Address`}),(0,z.jsx)(`textarea`,{rows:3,required:!0,disabled:!c,value:f.address,onChange:e=>p({...f,address:e.target.value})})]}),c&&(0,z.jsx)(`button`,{type:`submit`,className:`profile-save-btn`,children:`SAVE CHANGES`})]})]}),o===`addresses`&&(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`profile-content-header`,children:(0,z.jsx)(`h2`,{children:`Manage Addresses`})}),(0,z.jsxs)(`div`,{className:`addresses-grid`,children:[m.map(e=>(0,z.jsxs)(`div`,{className:`address-card`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`address-card-header`,children:[(0,z.jsx)(Jo,{size:16,color:`var(--brand-red)`}),(0,z.jsx)(`span`,{className:`address-badge`,children:e.type})]}),(0,z.jsx)(`p`,{children:e.address})]}),(0,z.jsxs)(`button`,{onClick:()=>O(e.id),className:`delete-address-btn`,children:[(0,z.jsx)(ps,{size:16}),` Delete Address`]})]},e.id)),b?(0,z.jsxs)(`form`,{onSubmit:ne,className:`address-card`,style:{borderStyle:`solid`},children:[(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`12px`},children:[(0,z.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Address Label`}),(0,z.jsxs)(`select`,{value:g,onChange:e=>_(e.target.value),style:{width:`100%`,padding:`10px`,marginTop:`4px`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-sm)`},children:[(0,z.jsx)(`option`,{value:`Home`,children:`Home`}),(0,z.jsx)(`option`,{value:`Work`,children:`Work`}),(0,z.jsx)(`option`,{value:`Other`,children:`Other`})]})]}),(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:`12px`},children:[(0,z.jsx)(`label`,{style:{fontSize:`0.8rem`,fontWeight:600,color:`var(--text-secondary)`},children:`Full Address`}),(0,z.jsx)(`textarea`,{rows:2,required:!0,value:v,onChange:e=>y(e.target.value),placeholder:`House No, Building Name, Street, Landmark`,style:{width:`100%`,padding:`10px`,marginTop:`4px`,border:`1px solid var(--border-medium)`,borderRadius:`var(--radius-sm)`,fontFamily:`inherit`}})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,justifyContent:`flex-end`},children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>x(!1),style:{padding:`8px 12px`,border:`1px solid var(--border-medium)`,background:`transparent`,borderRadius:`var(--radius-sm)`,cursor:`pointer`},children:`Cancel`}),(0,z.jsx)(`button`,{type:`submit`,style:{padding:`8px 16px`,background:`var(--brand-red)`,color:`#fff`,border:`none`,borderRadius:`var(--radius-sm)`,fontWeight:700,cursor:`pointer`},children:`Save`})]})]}):(0,z.jsxs)(`div`,{onClick:()=>x(!0),className:`add-address-card`,children:[(0,z.jsx)(es,{size:24,style:{marginBottom:`8px`}}),(0,z.jsx)(`span`,{style:{fontWeight:600},children:`Add New Address`})]})]})]}),o===`orders`&&(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{className:`profile-content-header`,children:(0,z.jsx)(`h2`,{children:`Past Orders`})}),(0,z.jsx)(`div`,{className:`orders-timeline`,children:E?(0,z.jsxs)(`div`,{style:{textAlign:`center`,padding:`40px 0`,color:`var(--text-muted)`},children:[(0,z.jsx)(W,{size:24,style:{animation:`spin 1s linear infinite`,margin:`0 auto 12px`}}),(0,z.jsx)(`p`,{children:`Loading your order history...`})]}):ee.length===0?(0,z.jsxs)(`div`,{style:{textAlign:`center`,padding:`40px 0`,color:`var(--text-muted)`},children:[(0,z.jsx)(as,{size:48,style:{margin:`0 auto 12px`,strokeWidth:1.5,color:`var(--text-muted)`}}),(0,z.jsx)(`p`,{style:{fontWeight:600,fontSize:`1.1rem`,color:`var(--text-primary)`},children:`No Orders Placed Yet`}),(0,z.jsx)(`p`,{style:{fontSize:`0.9rem`,marginTop:`4px`},children:`Hungry? Place an order to see it here!`})]}):ee.map(e=>(0,z.jsxs)(`div`,{className:`order-card`,children:[(0,z.jsxs)(`div`,{className:`order-header-info`,children:[(0,z.jsxs)(`div`,{className:`order-shop`,children:[(0,z.jsx)(`h4`,{children:e.restaurantName}),(0,z.jsxs)(`span`,{children:[(0,z.jsx)(xo,{size:12}),` `,e.date,` • ID: `,e.id]})]}),(0,z.jsx)(`div`,{className:`order-amount-status`,children:(0,z.jsxs)(`div`,{className:`order-status-badge`,children:[(0,z.jsx)(Do,{size:12}),` `,e.status]})})]}),(0,z.jsx)(`div`,{className:`order-items-list`,children:e.items.map((e,t)=>(0,z.jsxs)(`div`,{children:[e.name,` × `,e.qty]},t))}),(0,z.jsxs)(`div`,{className:`order-actions`,children:[(0,z.jsxs)(`span`,{className:`order-total-lbl`,children:[`Total Paid: ₹`,e.total.toFixed(2)]}),(0,z.jsx)(`button`,{disabled:C,onClick:()=>re(e.items),className:`reorder-btn`,children:C?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(W,{size:14,style:{animation:`spin 1s linear infinite`}}),` Adding...`]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(as,{size:14}),` Reorder Items`]})})]})]},e.id))})]})]})]})]}):(0,z.jsxs)(`div`,{className:`profile-container empty-profile fade-in`,children:[(0,z.jsx)(hs,{size:80,color:`var(--text-muted)`,style:{marginBottom:`20px`}}),(0,z.jsx)(`h2`,{children:`Please Log In`}),(0,z.jsx)(`p`,{children:`Log in to view your profile dashboard, saved addresses, and past orders.`}),(0,z.jsx)(`button`,{onClick:()=>a(`/login?redirect=/profile`),className:`login-btn`,children:`LOG IN NOW`})]})},Ns=()=>{let e=dt(),[t]=Rn(),n=t.get(`orderId`)||`ZB-latest`,[r,i]=(0,S.useState)(null),[a,o]=(0,S.useState)(0);(0,S.useEffect)(()=>{let e=async()=>{try{let e=(await R.get(`/api/profile?action=orders`)).data,t=null;t=n===`ZB-latest`||!n?e[0]:e.find(e=>e.id===n||e.id===`ZB-${n}`),t&&i(t)}catch(e){console.error(`Failed to load order details for tracking:`,e)}};e();let t=setInterval(e,3e3);return()=>clearInterval(t)},[n]),(0,S.useEffect)(()=>{if(r)if(r.status===`Out for Delivery`){let e=25e3,t=Date.now(),n=()=>{let r=Date.now()-t;o(Math.min(99.5,r/e*100)),r<e&&requestAnimationFrame(n)},r=requestAnimationFrame(n);return()=>cancelAnimationFrame(r)}else r.status===`Delivered`?o(100):o(0)},[r?.status]);let s=(e=>{if(e<=0)return{x:80,y:140};if(e>=100)return{x:300,y:110};let t=e/100*350;return t<=80?{x:80+t,y:140}:t<=160?{x:160,y:140-(t-80)}:t<=300?{x:160+(t-160),y:60}:{x:300,y:60+(t-300)}})(a),c=350-a/100*350,l=25,u=`3.5 km`,d=`Order Placed`,f=`Your food is being processed.`;if(r){let e=r.status;if(e===`Placed`)l=25,u=`3.5 km`,d=`Order Placed`,f=`The restaurant is reviewing your order.`;else if(e===`Accepted`)l=22,u=`3.5 km`,d=`Order Confirmed`,f=`A rider has accepted and is proceeding to restaurant.`;else if(e===`Preparing`)l=18,u=`3.5 km`,d=`Preparing Food`,f=`Our kitchen partners are cooking your hot fresh meal.`;else if(e===`Out for Delivery`){let e=1-a/100;l=Math.max(1,Math.round(10*e)),u=(3.2*e).toFixed(1)+` km`,d=`Arriving in ${l} mins`,f=`Rider is on the way! Distance left: ${u}`}else e===`Delivered`&&(l=0,u=`0 km`,d=`Order Delivered!`,f=`Enjoy your delicious hot meal!`)}let p=e=>{if(!r)return`pending`;let t=r.status||`Placed`,n=[`Placed`,`Accepted`,`Preparing`,`Out for Delivery`,`Delivered`],i=n.indexOf(t),a=n.indexOf(e);return i>a?`completed`:i===a?`active`:`pending`};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .tracking-layout {
          max-width: 1000px;
          margin: 24px auto 48px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          align-items: start;
        }
        
        .tracking-main-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        
        .eta-display h3 {
          font-size: 1.8rem;
          color: var(--brand-red);
          margin-bottom: 4px;
        }
        
        .eta-display p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .order-info-pill {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        /* Map Simulator */
        .map-wrapper {
          background: #f4f6f8;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
          height: 240px;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .map-overlay-text {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.9);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
          z-index: 10;
        }
        
        .tracking-map-svg {
          width: 100%;
          height: 100%;
        }
        
        .map-point {
          transition: all 0.3s;
        }
        
        .map-rider-marker {
          transition: all 0.1s linear;
        }
        
        .map-label {
          font-size: 8px;
          font-weight: bold;
          font-family: sans-serif;
          fill: var(--text-secondary);
        }
        
        /* Timeline Spacing */
        .status-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 8px;
        }
        
        .status-timeline::before {
          content: '';
          position: absolute;
          left: 17px;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: var(--border-medium);
          z-index: 1;
        }
        
        .timeline-step {
          display: flex;
          gap: 16px;
          position: relative;
          z-index: 2;
        }
        
        .step-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        
        .timeline-step.completed .step-icon-circle {
          background: var(--success);
          border-color: var(--success);
        }
        
        .timeline-step.active .step-icon-circle {
          background: #fff;
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.2);
        }
        
        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-medium);
        }
        
        .timeline-step.completed .step-dot {
          background: #fff;
          width: 8px;
          height: 8px;
        }
        
        .timeline-step.active .step-dot {
          background: var(--brand-red);
          animation: pulse 1.2s infinite;
        }
        
        .step-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
          color: var(--text-muted);
        }
        
        .timeline-step.active .step-details h4,
        .timeline-step.completed .step-details h4 {
          color: var(--text-primary);
          font-weight: 700;
        }
        
        .step-details p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        
        /* Rider Panel */
        .rider-panel-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .rider-card-header {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .rider-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 20px;
        }
        
        .rider-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          border: 1px solid var(--border-medium);
        }
        
        .rider-info h4 {
          font-size: 1rem;
          margin-bottom: 2px;
        }
        
        .rider-info p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .rider-contact-row {
          display: flex;
          gap: 10px;
        }
        
        .rider-contact-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .rider-contact-btn.call {
          background: var(--success);
          color: #fff;
          border: none;
        }
        
        .rider-contact-btn.call:hover {
          background: #50a037;
        }
        
        .rider-contact-btn.chat {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }
        
        .rider-contact-btn.chat:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        .rider-waiting-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          text-align: center;
          background: var(--bg-surface);
          border-radius: var(--radius-sm);
          border: 1px dashed var(--border-medium);
        }
        
        .rider-waiting-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-medium);
          border-top-color: var(--brand-red);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .receipt-summary {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-light);
        }
        
        .receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        
        .receipt-total {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px dashed var(--border-medium);
        }
        
        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--brand-red);
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }
        
        .back-home-btn:hover {
          color: var(--brand-red-hover);
        }
 
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
 
        @media (max-width: 900px) {
          .tracking-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`tracking-layout fade-in`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`button`,{onClick:()=>e(`/`),className:`back-home-btn`,children:[(0,z.jsx)(po,{size:16}),` Back to Home`]}),(0,z.jsxs)(`main`,{className:`tracking-main-box`,children:[(0,z.jsxs)(`div`,{className:`tracking-header`,children:[(0,z.jsxs)(`div`,{className:`eta-display`,children:[(0,z.jsx)(`h3`,{children:d}),(0,z.jsx)(`p`,{children:f})]}),(0,z.jsxs)(`div`,{className:`order-info-pill`,children:[`ID: `,r?r.id:n]})]}),(0,z.jsxs)(`div`,{className:`map-wrapper`,children:[(0,z.jsx)(`div`,{className:`map-overlay-text`,children:`Live GPS Simulator`}),(0,z.jsxs)(`svg`,{className:`tracking-map-svg`,viewBox:`0 0 380 180`,children:[(0,z.jsx)(`rect`,{x:`20`,y:`20`,width:`100`,height:`30`,fill:`#eef1f4`,rx:`4`}),(0,z.jsx)(`rect`,{x:`20`,y:`70`,width:`100`,height:`50`,fill:`#eef1f4`,rx:`4`}),(0,z.jsx)(`rect`,{x:`180`,y:`20`,width:`80`,height:`110`,fill:`#eef1f4`,rx:`4`}),(0,z.jsx)(`rect`,{x:`280`,y:`20`,width:`80`,height:`25`,fill:`#eef1f4`,rx:`4`}),(0,z.jsx)(`path`,{d:`M 80 140 L 160 140 L 160 60 L 300 60 L 300 110`,fill:`none`,stroke:`#e0e0e0`,strokeWidth:`10`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,z.jsx)(`path`,{d:`M 80 140 L 160 140 L 160 60 L 300 60 L 300 110`,fill:`none`,stroke:`var(--brand-red)`,strokeWidth:`4`,strokeLinecap:`round`,strokeLinejoin:`round`,strokeDasharray:350,strokeDashoffset:c}),(0,z.jsxs)(`g`,{className:`map-point`,transform:`translate(80, 140)`,children:[(0,z.jsx)(`circle`,{r:`12`,fill:`#60b246`}),(0,z.jsx)(`circle`,{r:`6`,fill:`#fff`}),(0,z.jsx)(`text`,{x:`-25`,y:`24`,className:`map-label`,children:`RESTAURANT`})]}),(0,z.jsxs)(`g`,{className:`map-point`,transform:`translate(300, 110)`,children:[(0,z.jsx)(`circle`,{r:`12`,fill:`var(--brand-red)`}),(0,z.jsx)(`circle`,{r:`6`,fill:`#fff`}),(0,z.jsx)(`text`,{x:`-12`,y:`24`,className:`map-label`,children:`HOME`})]}),(0,z.jsxs)(`g`,{className:`map-rider-marker`,transform:`translate(${s.x}, ${s.y})`,children:[(0,z.jsx)(`circle`,{r:`10`,fill:`#171a29`,stroke:`#fff`,strokeWidth:`2`}),(0,z.jsx)(`foreignObject`,{x:`-6`,y:`-6`,width:`12`,height:`12`,children:(0,z.jsx)(`div`,{style:{color:`#fff`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,z.jsx)(_o,{size:10})})})]})]})]}),(0,z.jsxs)(`div`,{className:`status-timeline`,children:[(0,z.jsxs)(`div`,{className:`timeline-step ${p(`Placed`)}`,children:[(0,z.jsx)(`div`,{className:`step-icon-circle`,children:(0,z.jsx)(`div`,{className:`step-dot`})}),(0,z.jsxs)(`div`,{className:`step-details`,children:[(0,z.jsx)(`h4`,{children:`Order Placed`}),(0,z.jsx)(`p`,{children:`Your order has been received and sent to the restaurant.`})]})]}),(0,z.jsxs)(`div`,{className:`timeline-step ${p(`Accepted`)}`,children:[(0,z.jsx)(`div`,{className:`step-icon-circle`,children:(0,z.jsx)(`div`,{className:`step-dot`})}),(0,z.jsxs)(`div`,{className:`step-details`,children:[(0,z.jsx)(`h4`,{children:`Rider Accepted`}),(0,z.jsx)(`p`,{children:`A delivery partner has accepted your delivery request.`})]})]}),(0,z.jsxs)(`div`,{className:`timeline-step ${p(`Preparing`)}`,children:[(0,z.jsx)(`div`,{className:`step-icon-circle`,children:(0,z.jsx)(`div`,{className:`step-dot`})}),(0,z.jsxs)(`div`,{className:`step-details`,children:[(0,z.jsx)(`h4`,{children:`Preparing Food`}),(0,z.jsx)(`p`,{children:`Our kitchen partners are preparing your meal using fresh ingredients.`})]})]}),(0,z.jsxs)(`div`,{className:`timeline-step ${p(`Out for Delivery`)}`,children:[(0,z.jsx)(`div`,{className:`step-icon-circle`,children:(0,z.jsx)(`div`,{className:`step-dot`})}),(0,z.jsxs)(`div`,{className:`step-details`,children:[(0,z.jsx)(`h4`,{children:`Out for Delivery`}),(0,z.jsx)(`p`,{children:`Our delivery partner is riding swiftly on the route to your home.`})]})]}),(0,z.jsxs)(`div`,{className:`timeline-step ${p(`Delivered`)}`,children:[(0,z.jsx)(`div`,{className:`step-icon-circle`,children:(0,z.jsx)(`div`,{className:`step-dot`})}),(0,z.jsxs)(`div`,{className:`step-details`,children:[(0,z.jsx)(`h4`,{children:`Order Arrived`}),(0,z.jsx)(`p`,{children:`Rider has arrived at your address. Grab your meal and enjoy!`})]})]})]})]})]}),(0,z.jsx)(`aside`,{children:(0,z.jsxs)(`div`,{className:`rider-panel-box`,children:[(0,z.jsxs)(`h3`,{className:`rider-card-header`,children:[(0,z.jsx)(_o,{size:18,color:`var(--brand-red)`}),` Delivery Partner`]}),r&&r.riderName?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{className:`rider-profile`,children:[(0,z.jsx)(`div`,{className:`rider-avatar`,children:r.riderName.split(` `).map(e=>e[0]).join(``).toUpperCase()}),(0,z.jsxs)(`div`,{className:`rider-info`,children:[(0,z.jsx)(`h4`,{children:r.riderName}),(0,z.jsx)(`p`,{children:`Splendor (KA-03-EX-9921)`})]})]}),(0,z.jsxs)(`div`,{className:`rider-contact-row`,children:[(0,z.jsxs)(`button`,{onClick:()=>alert(`Calling rider ${r.riderName} at ${r.riderPhone}...`),className:`rider-contact-btn call`,children:[(0,z.jsx)($o,{size:14}),` Call Rider`]}),(0,z.jsxs)(`button`,{onClick:()=>alert(`Opening instant chat overlay...`),className:`rider-contact-btn chat`,children:[(0,z.jsx)(Xo,{size:14}),` Chat`]})]})]}):(0,z.jsxs)(`div`,{className:`rider-waiting-box`,children:[(0,z.jsx)(`div`,{className:`rider-waiting-spinner`}),(0,z.jsx)(`h4`,{children:`Assigning Rider...`}),(0,z.jsx)(`p`,{children:`We are matching your order with a nearby delivery partner.`})]}),(0,z.jsxs)(`div`,{className:`receipt-summary`,children:[(0,z.jsx)(`h4`,{style:{fontSize:`0.9rem`,marginBottom:`12px`},children:`Order Receipt`}),(0,z.jsxs)(`div`,{className:`receipt-row`,children:[(0,z.jsx)(`span`,{children:`Payment Mode`}),(0,z.jsx)(`span`,{children:`Razorpay (Online)`})]}),(0,z.jsxs)(`div`,{className:`receipt-row`,children:[(0,z.jsx)(`span`,{children:`Restaurant Name`}),(0,z.jsx)(`span`,{children:r?r.restaurantName:`ZingBite Hotspot`})]}),r&&r.items&&(0,z.jsxs)(`div`,{style:{marginTop:`12px`,borderTop:`1px dashed var(--border-medium)`,paddingTop:`12px`,marginBottom:`12px`},children:[(0,z.jsx)(`h5`,{style:{fontSize:`0.8rem`,marginBottom:`8px`,color:`var(--text-secondary)`},children:`Items:`}),r.items.map((e,t)=>(0,z.jsxs)(`div`,{className:`receipt-row`,style:{fontSize:`0.8rem`,marginBottom:`4px`},children:[(0,z.jsxs)(`span`,{children:[e.name,` × `,e.qty]}),(0,z.jsxs)(`span`,{children:[`₹`,(e.price*e.qty).toFixed(2)]})]},t))]}),(0,z.jsxs)(`div`,{className:`receipt-total receipt-row`,style:{borderTop:r?`none`:`1px dashed var(--border-medium)`,marginTop:r?0:`12px`},children:[(0,z.jsx)(`strong`,{children:`Amount Paid`}),(0,z.jsxs)(`strong`,{children:[`₹`,r?r.total.toFixed(2):`0.00`]})]})]})]})})]})]})},Ps=()=>{let{user:e,loading:t}=(0,S.useContext)(to),n=dt(),[r,i]=(0,S.useState)({available:[],active:[],completed:[],totalEarnings:0,completedCount:0}),[a,o]=(0,S.useState)(!0),[s,c]=(0,S.useState)(null),l=async()=>{try{i((await R.get(`/api/delivery`)).data)}catch(e){console.error(e)}finally{o(!1)}};(0,S.useEffect)(()=>{if(!t){if(!e){n(`/login?redirect=/delivery`);return}l()}},[e,t]);let u=async e=>{c(e);try{await R.post(`/api/delivery`,{action:`acceptOrder`,orderId:e}),alert(`Delivery run claimed successfully! It is now in your active runs feed.`),await l()}catch(e){alert(e.response?.data?.error||`Failed to claim delivery run. Please try again.`)}finally{c(null)}},d=async(e,t)=>{let n=`Preparing`;t===`Accepted`?n=`Preparing`:t===`Preparing`?n=`Out for Delivery`:t===`Out for Delivery`&&(n=`Delivered`),c(e);try{await R.post(`/api/delivery`,{orderId:e,status:n}),await l()}catch{alert(`Failed to update status. Please try again.`)}finally{c(null)}};return t||a?(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,z.jsx)(W,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .delivery-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        .section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 16px; margin-top: 32px; }
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .delivery-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .delivery-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.out { background: rgba(153,102,255,0.08); color: #9966ff; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .action-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .action-btn.claim { background: var(--brand-red); color: #fff; }
        .action-btn.claim:hover { background: var(--brand-red-hover); }
        .action-btn.start { background: #ff9f40; color: #fff; }
        .action-btn.start:hover { background: #e08b30; }
        .action-btn.out { background: #9966ff; color: #fff; }
        .action-btn.out:hover { background: #804ce6; }
        .action-btn.deliver { background: #4bc0c0; color: #fff; }
        .action-btn.deliver:hover { background: #38b0b0; }
        .empty-state {
          text-align: center;
          padding: 40px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          background: #fff;
        }
        .loc-box {
          background: var(--bg-surface);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          margin-top: 12px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        @media (max-width: 600px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .dashboard-header span {
            align-self: flex-start;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`delivery-container fade-in`,children:[(0,z.jsxs)(`div`,{className:`dashboard-header`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Delivery Partner Portal`}),(0,z.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`4px`},children:[`Welcome back, `,e?.userName||`Delivery Rider`,`!`]})]}),(0,z.jsx)(`span`,{className:`badge out`,style:{padding:`8px 16px`,borderRadius:`20px`,fontWeight:700},children:`ACTIVE RIDER`})]}),(0,z.jsxs)(`div`,{className:`stats-grid`,children:[(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon green`,children:(0,z.jsx)(Ho,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Rider Earnings`}),(0,z.jsxs)(`div`,{className:`stat-number`,children:[`₹`,r.totalEarnings.toFixed(2)]})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon blue`,children:(0,z.jsx)(Oo,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Completed Trips`}),(0,z.jsx)(`div`,{className:`stat-number`,children:r.completedCount})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon red`,children:(0,z.jsx)(_o,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Runs`}),(0,z.jsx)(`div`,{className:`stat-number`,children:r.active.length})]})]})]}),(0,z.jsxs)(`h2`,{className:`section-title`,children:[`Available Delivery Runs (`,r.available.length,`)`]}),r.available.length===0?(0,z.jsxs)(`div`,{className:`empty-state`,children:[(0,z.jsx)(ms,{size:32,style:{margin:`0 auto 12px`,color:`var(--text-muted)`}}),(0,z.jsx)(`p`,{children:`No available delivery runs at the moment. Waiting for new customer orders...`})]}):(0,z.jsx)(`div`,{className:`orders-grid`,children:r.available.map(e=>(0,z.jsxs)(`div`,{className:`delivery-card`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,z.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,z.jsx)(`span`,{className:`badge placed`,children:`UNCLAIMED`})]}),(0,z.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,z.jsx)(`div`,{className:`loc-box`,children:(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,z.jsx)(Jo,{size:12,style:{flexShrink:0}}),` Delivery to: `,(0,z.jsx)(`strong`,{children:e.customerAddress})]})}),(0,z.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Payout Incentives: `,(0,z.jsx)(`strong`,{style:{color:`var(--success)`},children:`₹45.00`})]})]}),(0,z.jsx)(`button`,{disabled:s===e.orderId,onClick:()=>u(e.orderId),className:`action-btn claim`,children:s===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Ao,{size:16}),` ACCEPT RUN`]})})]},e.orderId))}),(0,z.jsxs)(`h2`,{className:`section-title`,children:[`My Active Tasks (`,r.active.length,`)`]}),r.active.length===0?(0,z.jsx)(`div`,{className:`empty-state`,style:{marginBottom:`32px`},children:(0,z.jsx)(`p`,{children:`No active delivery runs claimed. Accept a run from the feed above!`})}):(0,z.jsx)(`div`,{className:`orders-grid`,children:r.active.map(e=>(0,z.jsxs)(`div`,{className:`delivery-card`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,z.jsxs)(`span`,{style:{fontWeight:800},children:[`ID: `,e.formattedId]}),(0,z.jsx)(`span`,{className:`badge out`,style:{background:`rgba(153,102,255,0.08)`,color:`#9966ff`},children:e.status})]}),(0,z.jsx)(`h4`,{style:{fontSize:`1.05rem`,fontWeight:700},children:e.restaurantName}),(0,z.jsxs)(`div`,{className:`loc-box`,style:{background:`#f5f0ff`},children:[(0,z.jsxs)(`p`,{style:{fontWeight:700,marginBottom:`4px`},children:[`Customer: `,e.customerName]}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,z.jsx)(Jo,{size:12,style:{flexShrink:0}}),` Address: `,e.customerAddress]})]}),(0,z.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`12px`},children:[`Collect Amount: `,(0,z.jsxs)(`strong`,{children:[`₹`,e.total.toFixed(2)]}),` (`,e.payment,`)`]})]}),e.status===`Accepted`&&(0,z.jsx)(`button`,{disabled:s===e.orderId,onClick:()=>d(e.orderId,e.status),className:`action-btn start`,children:s===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsx)(z.Fragment,{children:`WAIT FOR RESTAURANT COOKING`})}),e.status===`Preparing`&&(0,z.jsx)(`button`,{disabled:s===e.orderId,onClick:()=>d(e.orderId,e.status),className:`action-btn out`,children:s===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Qo,{size:16}),` START DISPATCH RUN`]})}),e.status===`Out for Delivery`&&(0,z.jsx)(`button`,{disabled:s===e.orderId,onClick:()=>d(e.orderId,e.status),className:`action-btn deliver`,children:s===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Oo,{size:16}),` MARK AS DELIVERED`]})})]},e.orderId))}),(0,z.jsx)(`h2`,{className:`section-title`,children:`Trip Log (Completed)`}),r.completed.length===0?(0,z.jsx)(`div`,{className:`empty-state`,children:(0,z.jsx)(`p`,{children:`Your completed delivery logs will show up here.`})}):(0,z.jsx)(`div`,{className:`orders-grid`,children:r.completed.map(e=>(0,z.jsxs)(`div`,{className:`delivery-card`,style:{opacity:.8},children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`delivery-card-header`,children:[(0,z.jsxs)(`span`,{style:{fontWeight:700,color:`var(--text-muted)`},children:[`ID: `,e.formattedId]}),(0,z.jsx)(`span`,{className:`badge delivered`,children:e.status})]}),(0,z.jsx)(`h4`,{style:{fontSize:`1rem`,color:`var(--text-muted)`,fontWeight:700},children:e.restaurantName}),(0,z.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginTop:`4px`},children:[`Total Amount: ₹`,e.total.toFixed(2)]})]}),(0,z.jsxs)(`div`,{style:{marginTop:`16px`,fontSize:`0.78rem`,color:`#4bc0c0`,fontWeight:700,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,z.jsx)(Oo,{size:12}),` EARNINGS CREDITED (+₹45.00)`]})]},e.orderId))})]})]})},Fs=()=>{let{user:e,loading:t}=(0,S.useContext)(to),n=dt(),[r,i]=(0,S.useState)(`orders`),[a,o]=(0,S.useState)({restaurant:null,menu:[],orders:[],request:null}),[s,c]=(0,S.useState)(!0),[l,u]=(0,S.useState)(null),[d,f]=(0,S.useState)({name:``,cuisine:``,address:``,deliveryTime:`30 mins`,imagePath:``,licenseNo:``,aadhaarNo:``,gstNo:``}),[p,m]=(0,S.useState)(!1),[h,g]=(0,S.useState)(!1),[_,v]=(0,S.useState)({name:``,price:``,description:``,imagePath:``}),[y,b]=(0,S.useState)(!1),[x,C]=(0,S.useState)(null),[w,ee]=(0,S.useState)(``),[T,E]=(0,S.useState)(`All`),D=async()=>{try{o((await R.get(`/api/restaurant-admin`)).data),u(null)}catch(e){console.error(e),u(e.response?.data?.error||`Failed to load restaurant data.`)}finally{c(!1)}};(0,S.useEffect)(()=>{if(!t){if(!e){n(`/login?redirect=/restaurant-admin`);return}D()}},[e,t]);let te=async e=>{if(e.preventDefault(),!d.name||!d.cuisine||!d.address||!d.licenseNo||!d.aadhaarNo||!d.gstNo){alert(`Please fill out all required fields.`);return}m(!0);try{await R.post(`/api/restaurant-admin`,{action:`submitRestaurantRequest`,name:d.name,cuisine:d.cuisine,address:d.address,deliveryTime:d.deliveryTime,imagePath:d.imagePath||void 0,licenseNo:d.licenseNo,aadhaarNo:d.aadhaarNo,gstNo:d.gstNo}),alert(`Onboarding request submitted successfully! Super admin will verify your documents.`),await D()}catch{alert(`Failed to submit onboarding request.`)}finally{m(!1)}},ne=async(e,t)=>{try{await R.post(`/api/restaurant-admin`,{action:`toggleAvailability`,menuId:e,isAvailable:!t}),o(n=>({...n,menu:(n.menu||[]).map(n=>n.menuId===e?{...n,isAvailable:!t}:n)}))}catch{alert(`Failed to update availability.`)}},O=async e=>{if(e.preventDefault(),!_.name||!_.price||!_.description){alert(`Please fill out all required fields.`);return}b(!0);try{await R.post(`/api/restaurant-admin`,{action:`addMenuItem`,name:_.name,price:parseFloat(_.price),description:_.description,imagePath:_.imagePath||void 0,restaurantId:a.restaurant.restaurantId}),g(!1),v({name:``,price:``,description:``,imagePath:``}),await D()}catch{alert(`Failed to add menu item.`)}finally{b(!1)}},re=async(e,t)=>{C(e);try{await R.post(`/api/restaurant-admin`,{action:`updateOrderStatus`,orderId:e,status:t}),await D()}catch{alert(`Failed to update order status.`)}finally{C(null)}};if(t||s)return(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,z.jsx)(W,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(l)return(0,z.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`48px auto`,textAlign:`center`,padding:`24px`},children:[(0,z.jsx)(Eo,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`}}),(0,z.jsx)(`h3`,{children:`Access Restricted`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:l})]});let{restaurant:ie,menu:ae=[],orders:oe=[],request:k}=a||{};if(!ie){let e=k&&k.status===`Pending`,t=k&&k.status===`Rejected`;return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
          .onboard-container {
            max-width: 650px;
            margin: 48px auto;
            padding: 32px;
            background: #fff;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
          }
          .form-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          @media (max-width: 600px) {
            .onboard-container {
              padding: 20px 16px;
              margin: 24px 12px;
            }
            .form-row-2 {
              grid-template-columns: 1fr;
              gap: 12px;
            }
          }
          .form-title {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .form-group {
            margin-bottom: 16px;
          }
          .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            font-size: 0.9rem;
          }
          .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-sm);
            font-size: 0.95rem;
            outline: none;
          }
          .form-group input:focus, .form-group textarea:focus {
            border-color: var(--brand-red);
          }
          .btn-primary {
            background: var(--brand-red);
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: var(--radius-sm);
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background: var(--brand-red-hover);
          }
          .status-panel {
            text-align: center;
            padding: 40px 24px;
          }
        `}),(0,z.jsx)(`div`,{className:`onboard-container fade-in`,children:e?(0,z.jsxs)(`div`,{className:`status-panel`,children:[(0,z.jsx)(W,{size:48,style:{animation:`spin 2s linear infinite`,color:`#ff9f40`,margin:`0 auto 16px`}}),(0,z.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800},children:`Onboarding Application Submitted`}),(0,z.jsxs)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,fontSize:`0.95rem`,lineHeight:`1.6`},children:[`Your application for `,(0,z.jsx)(`strong`,{children:k.restaurantName}),` is currently pending. The Super Admin is reviewing your License (`,(0,z.jsx)(`strong`,{children:k.licenseNo}),`), Aadhaar, and GST details.`]}),(0,z.jsx)(`div`,{style:{background:`rgba(255,159,64,0.06)`,border:`1px solid rgba(255,159,64,0.2)`,padding:`12px`,borderRadius:`8px`,marginTop:`20px`,fontSize:`0.82rem`,color:`#ff9f40`,fontWeight:700},children:`STATUS: PENDING SUPER ADMIN VERIFICATION`})]}):(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`form-title`,children:[(0,z.jsx)(us,{size:26,style:{color:`var(--brand-red)`}}),` Partner Onboarding Application`]}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`24px`,fontSize:`0.9rem`},children:`Register your kitchen on ZingBite. Provide business identification documents for verification to unlock your merchant portal.`}),t&&(0,z.jsxs)(`div`,{style:{background:`rgba(226,55,68,0.06)`,border:`1px solid rgba(226,55,68,0.2)`,padding:`14px`,borderRadius:`8px`,color:`var(--danger)`,fontSize:`0.88rem`,fontWeight:600,marginBottom:`20px`},children:[(0,z.jsx)(Eo,{size:16,style:{display:`inline`,verticalAlign:`middle`,marginRight:`6px`}}),`Your previous request was rejected. Please check your document identifiers and re-submit details.`]}),(0,z.jsxs)(`form`,{onSubmit:te,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Restaurant Name *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Punjabi Tadka Kitchen`,value:d.name,onChange:e=>f({...d,name:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-row-2`,children:[(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,z.jsx)(`label`,{children:`Cuisine Type *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian`,value:d.cuisine,onChange:e=>f({...d,cuisine:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,z.jsx)(`label`,{children:`Avg Delivery Time *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. 35 mins`,value:d.deliveryTime,onChange:e=>f({...d,deliveryTime:e.target.value})})]})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Full Address *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:d.address,onChange:e=>f({...d,address:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Image URL (Cover Banner)`}),(0,z.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:d.imagePath,onChange:e=>f({...d,imagePath:e.target.value})})]}),(0,z.jsx)(`div`,{style:{height:`1px`,background:`var(--border-medium)`,margin:`20px 0`}}),(0,z.jsxs)(`h3`,{style:{fontSize:`1rem`,fontWeight:700,marginBottom:`12px`,display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,z.jsx)(Io,{size:16}),` Licensing & Identification Verification`]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`FSSAI Food License Number *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`14-digit FSSAI Number`,value:d.licenseNo,onChange:e=>f({...d,licenseNo:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-row-2`,children:[(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,z.jsx)(`label`,{children:`Owner Aadhaar Number *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`12-digit Aadhaar`,value:d.aadhaarNo,onChange:e=>f({...d,aadhaarNo:e.target.value})})]}),(0,z.jsxs)(`div`,{className:`form-group`,style:{marginBottom:0},children:[(0,z.jsx)(`label`,{children:`GSTIN Registration Number *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`15-digit GSTIN`,value:d.gstNo,onChange:e=>f({...d,gstNo:e.target.value})})]})]}),(0,z.jsx)(`button`,{type:`submit`,disabled:p,className:`btn-primary`,children:p?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):`Submit Onboarding Request`})]})]})})]})}let A=(ae||[]).filter(e=>(e.menuName||``).toLowerCase().includes(w.toLowerCase())||(e.description||``).toLowerCase().includes(w.toLowerCase())),se=(oe||[]).filter(e=>T===`All`?!0:(e.status||``).toLowerCase()===T.toLowerCase());return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .admin-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .restaurant-header-banner {
          background: linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .restaurant-img {
          width: 96px;
          height: 96px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 3px solid rgba(255,255,255,0.2);
        }
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .search-bar-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          align-items: center;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .search-input-wrapper input:focus {
          border-color: var(--brand-red);
        }
        .search-icon-inside {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .menu-item-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .menu-item-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .menu-item-img {
          height: 160px;
          width: 100%;
          object-fit: cover;
        }
        .menu-item-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
        }
        .order-info-section {
          flex: 2;
          min-width: 280px;
        }
        .order-actions-section {
          flex: 1;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 12px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--brand-red);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.out { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .pill-filter {
          padding: 8px 16px;
          border: 1px solid var(--border-medium);
          border-radius: 20px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .pill-filter.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .restaurant-header-banner {
            flex-direction: column;
            padding: 24px 16px;
            text-align: center;
            gap: 16px;
          }
          .restaurant-header-banner div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .order-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .order-info-section {
            min-width: 100%;
          }
          .order-actions-section {
            align-items: flex-start;
            min-width: 100%;
            text-align: left;
            margin-top: 8px;
          }
          .order-actions-section div {
            text-align: left !important;
          }
          .order-actions-section button {
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`admin-container fade-in`,children:[ie&&(0,z.jsxs)(`div`,{className:`restaurant-header-banner`,children:[(0,z.jsx)(`img`,{src:ie.imagePath||`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop`,alt:ie.restaurantName,className:`restaurant-img`}),(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsx)(`h1`,{style:{fontSize:`2rem`,fontWeight:800},children:ie.restaurantName}),(0,z.jsx)(`span`,{className:`badge out`,style:{background:`rgba(255,255,255,0.2)`,color:`#fff`},children:`Portal Admin`})]}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`rgba(255,255,255,0.8)`,marginTop:`6px`},children:[(0,z.jsx)(Jo,{size:14}),` `,ie.address,` | Cuisine: `,ie.cuisineType]})]})]}),(0,z.jsxs)(`div`,{className:`tab-bar`,children:[(0,z.jsx)(`button`,{className:`tab-btn ${r===`orders`?`active`:``}`,onClick:()=>i(`orders`),children:`Orders Manager`}),(0,z.jsx)(`button`,{className:`tab-btn ${r===`menu`?`active`:``}`,onClick:()=>i(`menu`),children:`Menu Manager`})]}),r===`menu`&&(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`search-bar-container`,children:[(0,z.jsxs)(`div`,{className:`search-input-wrapper`,children:[(0,z.jsx)(ns,{size:18,className:`search-icon-inside`}),(0,z.jsx)(`input`,{type:`text`,placeholder:`Search dishes by name or description...`,value:w,onChange:e=>ee(e.target.value)})]}),(0,z.jsxs)(`button`,{className:`btn-primary`,onClick:()=>g(!0),children:[(0,z.jsx)(es,{size:18}),` Add Menu Item`]})]}),A.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No menu items found. Add some delicious dishes to get started!`})}):(0,z.jsx)(`div`,{className:`menu-grid`,children:A.map(e=>(0,z.jsxs)(`div`,{className:`menu-item-card`,children:[(0,z.jsx)(`img`,{src:e.imagePath||`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop`,alt:e.menuName,className:`menu-item-img`}),(0,z.jsxs)(`div`,{className:`menu-item-body`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,marginBottom:`8px`},children:[(0,z.jsx)(`h4`,{style:{fontSize:`1.1rem`,fontWeight:700},children:e.menuName}),(0,z.jsxs)(`span`,{style:{fontWeight:800,color:`var(--brand-red)`,display:`flex`,alignItems:`center`},children:[(0,z.jsx)(Ho,{size:14}),e.price]})]}),(0,z.jsx)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginBottom:`16px`,lineHeight:`1.4`},children:e.description})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,borderTop:`1px solid var(--border-light)`,paddingTop:`12px`},children:[(0,z.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:`Status:`}),(0,z.jsx)(`button`,{className:`toggle-btn`,onClick:()=>ne(e.menuId,e.isAvailable),children:e.isAvailable?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(fs,{size:28,style:{color:`var(--success)`}}),(0,z.jsx)(`span`,{style:{color:`var(--success)`},children:`Available`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(ds,{size:28,style:{color:`var(--text-muted)`}}),(0,z.jsx)(`span`,{style:{color:`var(--text-muted)`},children:`Unavailable`})]})})]})]})]},e.menuId))})]}),r===`orders`&&(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`24px`,overflowX:`auto`,paddingBottom:`8px`,scrollbarWidth:`none`,msOverflowStyle:`none`},className:`hide-scrollbar`,children:[`All`,`Placed`,`Accepted`,`Preparing`,`Out for Delivery`,`Delivered`].map(e=>(0,z.jsx)(`button`,{className:`pill-filter ${T===e?`active`:``}`,onClick:()=>E(e),children:e},e))}),se.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No orders in this category.`})}):(0,z.jsx)(`div`,{className:`order-list`,children:se.map(e=>(0,z.jsxs)(`div`,{className:`order-card`,children:[(0,z.jsxs)(`div`,{className:`order-info-section`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,marginBottom:`12px`},children:[(0,z.jsxs)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:[`ID: `,e.formattedId]}),(0,z.jsx)(`span`,{className:`badge ${(e.status||``).toLowerCase()}`,children:e.status}),(0,z.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Ordered `,e.time]})]}),(0,z.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`12px 16px`,borderRadius:`var(--radius-sm)`,marginBottom:`12px`},children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`,fontWeight:700,fontSize:`0.9rem`,marginBottom:`4px`},children:[`Customer: `,e.userName]}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,z.jsx)($o,{size:12}),` `,e.userPhone]}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[(0,z.jsx)(Jo,{size:12,style:{flexShrink:0}}),` Address: `,e.userAddress]})]})]}),(0,z.jsxs)(`div`,{className:`order-actions-section`,children:[(0,z.jsxs)(`div`,{style:{textAlign:`right`},children:[(0,z.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:`Amount Earned`}),(0,z.jsxs)(`div`,{style:{fontSize:`1.4rem`,fontWeight:800,color:`var(--text-primary)`},children:[`₹`,(e.total||0).toFixed(2)]})]}),e.status===`Accepted`&&(0,z.jsx)(`button`,{disabled:x===e.orderId,onClick:()=>re(e.orderId,`Preparing`),className:`btn-primary`,style:{width:`100%`,fontSize:`0.85rem`,padding:`10px 14px`},children:x===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[`Start Cooking `,(0,z.jsx)(vs,{size:14})]})}),e.status===`Preparing`&&(0,z.jsx)(`button`,{disabled:x===e.orderId,onClick:()=>re(e.orderId,`Out for Delivery`),className:`btn-primary`,style:{width:`100%`,fontSize:`0.85rem`,padding:`10px 14px`},children:x===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[`Ready & Dispatch `,(0,z.jsx)(To,{size:14})]})}),e.status===`Out for Delivery`&&(0,z.jsx)(`button`,{disabled:x===e.orderId,onClick:()=>re(e.orderId,`Delivered`),className:`btn-primary`,style:{width:`100%`,fontSize:`0.85rem`,padding:`10px 14px`,background:`#4bc0c0`},children:x===e.orderId?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):(0,z.jsxs)(z.Fragment,{children:[`Mark Delivered `,(0,z.jsx)(Oo,{size:14})]})}),e.status===`Placed`&&(0,z.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`#ff9f40`,fontWeight:700},children:`Awaiting Rider Claim...`})]})]},e.orderId))})]})]}),h&&(0,z.jsx)(`div`,{className:`modal-overlay`,onClick:()=>g(!1),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`20px`},children:`Add New Menu Item`}),(0,z.jsxs)(`form`,{onSubmit:O,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Dish Name *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Garlic Butter Naan`,value:_.name,onChange:e=>v(t=>({...t,name:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Price (INR) *`}),(0,z.jsx)(`input`,{type:`number`,required:!0,step:`0.01`,placeholder:`e.g. 120.00`,value:_.price,onChange:e=>v(t=>({...t,price:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Description *`}),(0,z.jsx)(`textarea`,{required:!0,rows:`3`,placeholder:`Describe the dish ingredients, taste, portion...`,value:_.description,onChange:e=>v(t=>({...t,description:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Image URL (Optional)`}),(0,z.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:_.imagePath,onChange:e=>v(t=>({...t,imagePath:e.target.value}))})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,z.jsx)(`button`,{type:`button`,className:`pill-filter`,onClick:()=>g(!1),style:{borderRadius:`var(--radius-sm)`},children:`Cancel`}),(0,z.jsx)(`button`,{type:`submit`,disabled:y,className:`btn-primary`,style:{width:`auto`},children:y?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Item`})]})]})]})})]})},Is=()=>{let{user:e}=(0,S.useContext)(to),t=dt(),[n,r]=(0,S.useState)(`jobs`),[i,a]=(0,S.useState)([]),[o,s]=(0,S.useState)([]),[c,l]=(0,S.useState)([]),[u,d]=(0,S.useState)(!0),[f,p]=(0,S.useState)(!1),[m,h]=(0,S.useState)(!1),[g,_]=(0,S.useState)(null),[v,y]=(0,S.useState)({name:``,email:``,phone:``,resumeUrl:``}),[b,x]=(0,S.useState)(!1),[C,w]=(0,S.useState)(!1),[ee,T]=(0,S.useState)(``),[E,D]=(0,S.useState)(`1234`),[te,ne]=(0,S.useState)(``),O=async()=>{try{a((await R.get(`/api/careers?action=jobs`)).data)}catch(e){console.error(`Failed to load jobs:`,e)}finally{d(!1)}},re=async()=>{if(e){p(!0);try{s((await R.get(`/api/careers?action=applications`)).data)}catch(e){console.error(`Failed to load applications:`,e)}finally{p(!1)}}},ie=async()=>{if(e){h(!0);try{l((await R.get(`/api/careers?action=notifications`)).data)}catch(e){console.error(`Failed to load notifications:`,e)}finally{h(!1)}}};return(0,S.useEffect)(()=>{O(),e&&(re(),ie())},[e]),(0,S.useEffect)(()=>{e&&y({name:e.userName||e.username||``,email:e.email||``,phone:String(e.phoneNumber||e.mobile||``),resumeUrl:``})},[e]),u?(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,z.jsx)(W,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .careers-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .hero-banner {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff6b7d 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 48px 32px;
          text-align: center;
          margin-bottom: 32px;
          box-shadow: var(--shadow-md);
        }
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .job-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .job-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .job-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .job-info {
          flex: 2;
          min-width: 280px;
        }
        .job-actions {
          flex: 1;
          min-width: 150px;
          display: flex;
          justify-content: flex-end;
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.dept { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus {
          border-color: var(--brand-red);
        }
        .inbox-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .email-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        @media (max-width: 600px) {
          .hero-banner {
            padding: 32px 16px;
          }
          .hero-banner h1 {
            font-size: 1.8rem !important;
          }
          .hero-banner p {
            font-size: 0.95rem !important;
          }
          .job-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .job-actions {
            justify-content: stretch;
            min-width: 100%;
          }
          .job-actions button {
            width: 100%;
            justify-content: center;
          }
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`careers-container fade-in`,children:[(0,z.jsxs)(`div`,{className:`hero-banner`,children:[(0,z.jsx)(`h1`,{style:{fontSize:`2.4rem`,fontWeight:800},children:`Grow Your Career with ZingBite`}),(0,z.jsx)(`p`,{style:{fontSize:`1.1rem`,marginTop:`8px`,opacity:.9},children:`Join our mission to deliver delight. Explore dynamic roles in technology, operations, and culinary arts.`})]}),(0,z.jsxs)(`div`,{className:`tab-bar`,children:[(0,z.jsxs)(`button`,{className:`tab-btn ${n===`jobs`?`active`:``}`,onClick:()=>r(`jobs`),children:[`Open Positions (`,i.length,`)`]}),(0,z.jsxs)(`button`,{className:`tab-btn ${n===`applications`?`active`:``}`,onClick:()=>{r(`applications`),re()},children:[`My Applications `,e&&o.length>0&&`(${o.length})`]}),(0,z.jsxs)(`button`,{className:`tab-btn ${n===`inbox`?`active`:``}`,onClick:()=>{r(`inbox`),ie()},children:[`Inbox Notifications `,e&&c.length>0&&`(${c.length})`]})]}),n===`jobs`&&(0,z.jsx)(`div`,{className:`job-grid stagger-children`,children:i.map(n=>(0,z.jsxs)(`div`,{className:`job-card`,children:[(0,z.jsxs)(`div`,{className:`job-info`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,z.jsx)(`span`,{className:`badge dept`,children:n.department}),(0,z.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,z.jsx)(xo,{size:12}),` Posted `,n.posted_date]})]}),(0,z.jsx)(`h3`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`8px`},children:n.title}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.9rem`,color:`var(--text-secondary)`,marginBottom:`12px`},children:[(0,z.jsx)(Jo,{size:14}),` `,n.location]}),(0,z.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,lineHeight:`1.5`},children:n.description})]}),(0,z.jsx)(`div`,{className:`job-actions`,children:(0,z.jsxs)(`button`,{className:`btn-primary`,onClick:()=>{e?_(n):t(`/login?redirect=/careers`)},children:[`Apply Now `,(0,z.jsx)(rs,{size:14})]})})]},n.id))}),n===`applications`&&(0,z.jsx)(`div`,{children:e?f?(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,z.jsx)(W,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):o.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`You haven't applied to any roles yet. View open positions to apply!`})}):(0,z.jsx)(`div`,{className:`job-grid`,children:o.map(e=>(0,z.jsxs)(`div`,{className:`job-card`,children:[(0,z.jsxs)(`div`,{className:`job-info`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`,marginBottom:`8px`},children:[(0,z.jsx)(`span`,{className:`badge dept`,children:e.department}),(0,z.jsxs)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:[`Applied on `,e.appliedDate]})]}),(0,z.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800,marginBottom:`6px`},children:e.jobTitle}),(0,z.jsxs)(`p`,{style:{display:`flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`,color:`var(--text-secondary)`},children:[(0,z.jsx)(Jo,{size:12}),` `,e.location||`HQ`]}),(0,z.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.8rem`,marginTop:`12px`,fontWeight:600},children:[(0,z.jsx)(Io,{size:12}),` View Submitted Resume`]})]}),(0,z.jsx)(`div`,{children:(0,z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`6px`},children:[(0,z.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,fontWeight:600},children:`Application Status`}),(0,z.jsx)(`span`,{className:`badge ${e.status.toLowerCase().includes(`applied`)?`applied`:e.status.toLowerCase().includes(`interview`)?`interview`:e.status.toLowerCase().includes(`offer`)?`offered`:`rejected`}`,style:{padding:`6px 12px`,fontSize:`0.8rem`},children:e.status})]})})]},e.id))}):(0,z.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,z.jsx)(Eo,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,z.jsx)(`h3`,{children:`Sign in to track your applications`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`,marginBottom:`16px`},children:`Log in with your ZingBite account to view and check statuses.`}),(0,z.jsx)(`button`,{className:`btn-primary`,style:{margin:`0 auto`},onClick:()=>t(`/login?redirect=/careers`),children:`Login to Account`})]})}),n===`inbox`&&(0,z.jsx)(`div`,{children:e?m?(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,padding:`48px`},children:(0,z.jsx)(W,{size:24,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})}):c.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Your inbox is empty. We will email you here when your application status changes!`})}):(0,z.jsx)(`div`,{className:`inbox-list`,children:c.map(e=>(0,z.jsxs)(`div`,{className:`email-card`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,borderBottom:`1px solid var(--border-light)`,paddingBottom:`12px`,marginBottom:`12px`},children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`,fontWeight:600},children:`FROM: ZingBite Operations <careers@zingbite.com>`}),(0,z.jsx)(`h4`,{style:{fontSize:`1rem`,fontWeight:800,marginTop:`4px`,color:`var(--text-primary)`},children:e.subject})]}),(0,z.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:e.sentDate})]}),(0,z.jsx)(`p`,{style:{fontSize:`0.9rem`,color:`var(--text-secondary)`,whiteSpace:`pre-line`,lineHeight:`1.6`},children:e.body})]},e.id))}):(0,z.jsxs)(`div`,{style:{textAlign:`center`,padding:`48px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`},children:[(0,z.jsx)(Vo,{size:36,style:{color:`var(--text-secondary)`,margin:`0 auto 12px`}}),(0,z.jsx)(`h3`,{children:`Sign in to view your inbox`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:`Log in to view email notifications generated for your account.`})]})})]}),g&&!C&&(0,z.jsx)(`div`,{className:`modal-overlay`,onClick:()=>_(null),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsx)(`h2`,{style:{fontSize:`1.4rem`,fontWeight:800,marginBottom:`8px`},children:`Apply for Position`}),(0,z.jsxs)(`p`,{style:{color:`var(--brand-red)`,fontWeight:700,fontSize:`0.95rem`,marginBottom:`20px`},children:[g.title,` — `,g.department]}),(0,z.jsxs)(`form`,{onSubmit:n=>{if(n.preventDefault(),!e){t(`/login?redirect=/careers`);return}if(!v.name||!v.email||!v.phone){alert(`Please fill out all required fields.`);return}D(String(Math.floor(1e3+Math.random()*9e3))),T(``),ne(``),w(!0)},children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Full Name *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`Enter full name`,value:v.name,onChange:e=>y(t=>({...t,name:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Email Address *`}),(0,z.jsx)(`input`,{type:`email`,required:!0,placeholder:`name@domain.com`,value:v.email,onChange:e=>y(t=>({...t,email:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Phone Number *`}),(0,z.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:v.phone,onChange:e=>y(t=>({...t,phone:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Resume PDF Link (Optional)`}),(0,z.jsx)(`input`,{type:`url`,placeholder:`https://example.com/my-resume.pdf`,value:v.resumeUrl,onChange:e=>y(t=>({...t,resumeUrl:e.target.value}))})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`flex-end`,gap:`12px`,marginTop:`24px`},children:[(0,z.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>_(null),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`},children:`Cancel`}),(0,z.jsxs)(`button`,{type:`submit`,className:`btn-primary`,children:[`Verify Credentials `,(0,z.jsx)(Wo,{size:14})]})]})]})]})}),C&&(0,z.jsx)(`div`,{className:`modal-overlay`,children:(0,z.jsxs)(`div`,{className:`modal-content`,style:{maxWidth:`400px`,textAlign:`center`,padding:`32px`},children:[(0,z.jsx)(Go,{size:36,style:{color:`var(--brand-red)`,margin:`0 auto 12px`}}),(0,z.jsx)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800},children:`Verify Email & Mobile`}),(0,z.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`8px`,lineHeight:`1.5`},children:[`We have simulated sending a verification OTP to `,(0,z.jsx)(`strong`,{children:v.email}),` and `,(0,z.jsx)(`strong`,{children:v.phone}),`.`]}),(0,z.jsxs)(`form`,{onSubmit:async e=>{if(e.preventDefault(),ne(``),ee!==E){ne(`Invalid OTP code. Please enter the correct code shown below.`);return}x(!0);try{await R.post(`/api/careers`,{jobId:g.id,name:v.name,email:v.email,phone:v.phone,resumeUrl:v.resumeUrl||`https://zingbite.com/resumes/demo.pdf`}),alert(`Verification successful! Application submitted successfully.`),w(!1),_(null),y(e=>({...e,resumeUrl:``})),await re(),await ie()}catch{alert(`Failed to submit application. Please try again.`)}finally{x(!1)}},style:{marginTop:`20px`},children:[(0,z.jsx)(`div`,{className:`form-group`,style:{marginWidth:`100px`,display:`inline-block`},children:(0,z.jsx)(`input`,{type:`text`,required:!0,maxLength:`4`,placeholder:`Enter 4-digit code`,value:ee,onChange:e=>T(e.target.value),style:{textAlign:`center`,fontSize:`1.4rem`,letterSpacing:`8px`,fontWeight:800,width:`180px`,padding:`8px`}})}),te&&(0,z.jsx)(`div`,{style:{color:`var(--danger)`,fontSize:`0.8rem`,marginTop:`4px`,fontWeight:600},children:te}),(0,z.jsxs)(`div`,{style:{background:`var(--bg-surface)`,padding:`8px`,borderRadius:`4px`,fontSize:`0.8rem`,color:`var(--text-muted)`,marginTop:`12px`},children:[`DEMO SIMULATOR OTP CODE: `,(0,z.jsx)(`strong`,{children:E})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`12px`,marginTop:`24px`},children:[(0,z.jsx)(`button`,{type:`button`,className:`btn-primary`,onClick:()=>w(!1),style:{background:`#f0f0f0`,color:`var(--text-primary)`,border:`1px solid var(--border-medium)`,padding:`10px 18px`},children:`Back`}),(0,z.jsx)(`button`,{type:`submit`,disabled:b,className:`btn-primary`,style:{padding:`10px 18px`},children:b?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):`Verify & Submit`})]})]})]})})]})},Ls=()=>{let{user:e,loading:t}=(0,S.useContext)(to),n=dt(),[r,i]=(0,S.useState)(`metrics`),[a,o]=(0,S.useState)({userCount:0,restaurantCount:0,orderCount:0,totalRevenue:0,users:[],applications:[],restaurantRequests:[]}),[s,c]=(0,S.useState)(!0),[l,u]=(0,S.useState)(null),[d,f]=(0,S.useState)(null),[p,m]=(0,S.useState)({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),[h,g]=(0,S.useState)({title:``,department:``,location:``,description:``}),[_,v]=(0,S.useState)(!1),[y,b]=(0,S.useState)(!1),x=async()=>{try{o((await R.get(`/api/super-admin`)).data),u(null)}catch(e){console.error(e),u(e.response?.data?.error||`Access denied or failed to load super admin stats.`)}finally{c(!1)}};(0,S.useEffect)(()=>{if(!t){if(!e){n(`/login?redirect=/admin`);return}x()}},[e,t]);let C=async(e,t)=>{f(`role-${e}`);try{await R.post(`/api/super-admin`,{action:`changeUserRole`,userId:e,role:t}),await x()}catch{alert(`Failed to update user role.`)}finally{f(null)}},w=async(e,t)=>{f(`app-${e}`);try{await R.post(`/api/super-admin`,{action:`updateApplicationStatus`,appId:e,status:t}),await x()}catch{alert(`Failed to update application status.`)}finally{f(null)}},ee=async(e,t)=>{f(`req-${e}`);try{await R.post(`/api/super-admin`,{action:`reviewRestaurant`,requestId:e,status:t}),alert(`Restaurant Request successfully ${t}!`),await x()}catch{alert(`Failed to review restaurant request.`)}finally{f(null)}},T=async e=>{if(e.preventDefault(),!p.name||!p.cuisine||!p.address){alert(`Please fill out all required fields.`);return}v(!0);try{await R.post(`/api/super-admin`,{action:`addRestaurant`,name:p.name,cuisine:p.cuisine,address:p.address,deliveryTime:p.deliveryTime||void 0,imagePath:p.imagePath||void 0}),alert(`Restaurant added successfully!`),m({name:``,cuisine:``,address:``,deliveryTime:``,imagePath:``}),await x()}catch{alert(`Failed to create restaurant.`)}finally{v(!1)}},E=async e=>{if(e.preventDefault(),!h.title||!h.department||!h.location||!h.description){alert(`Please fill out all required fields.`);return}b(!0);try{await R.post(`/api/super-admin`,{action:`addJob`,title:h.title,department:h.department,location:h.location,description:h.description}),alert(`Job listing published successfully!`),g({title:``,department:``,location:``,description:``}),await x()}catch{alert(`Failed to create job posting.`)}finally{b(!1)}};if(t||s)return(0,z.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,height:`400px`},children:(0,z.jsx)(W,{size:36,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})});if(l)return(0,z.jsxs)(`div`,{style:{maxWidth:`600px`,margin:`48px auto`,textAlign:`center`,padding:`24px`},children:[(0,z.jsx)(ms,{size:48,style:{color:`var(--brand-red)`,marginBottom:`16px`}}),(0,z.jsx)(`h3`,{children:`Access Restricted`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginTop:`8px`},children:l})]});let D=(a.restaurantRequests||[]).filter(e=>e.status===`Pending`),te=(a.restaurantRequests||[]).filter(e=>e.status!==`Pending`);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`style`,{children:`
        .admin-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.purple { background: rgba(153,102,255,0.08); color: #9966ff; }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .admin-table-wrapper {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
          margin-bottom: 32px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          background: var(--bg-surface);
          padding: 16px;
          font-weight: 700;
          border-bottom: 1px solid var(--border-medium);
          font-size: 0.9rem;
        }
        .admin-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.9rem;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .role-selector {
          padding: 6px 10px;
          border: 1px solid var(--border-medium);
          border-radius: 4px;
          font-size: 0.85rem;
          background: white;
          outline: none;
          font-weight: 600;
        }
        .role-selector:focus {
          border-color: var(--brand-red);
        }
        .management-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        .form-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 28px;
          box-shadow: var(--shadow-sm);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          border-color: var(--brand-red);
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        .badge.pending { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.approved { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        
        .request-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
        }
        .doc-verify-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: var(--bg-surface);
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-top: 14px;
        }
        .doc-item {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .doc-item strong {
          color: var(--text-primary);
          display: block;
          margin-top: 2px;
          font-family: monospace;
        }
        @media (max-width: 600px) {
          .doc-verify-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .form-card {
            padding: 16px;
          }
        }
      `}),(0,z.jsxs)(`div`,{className:`admin-container fade-in`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`,marginBottom:`24px`},children:[(0,z.jsx)(is,{size:32,style:{color:`var(--brand-red)`}}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h1`,{style:{fontSize:`1.8rem`,fontWeight:800},children:`Super Admin Command Center`}),(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`,fontSize:`0.9rem`,marginTop:`2px`},children:`Site statistics, role allocation, and listings management.`})]})]}),(0,z.jsxs)(`div`,{className:`stats-grid`,children:[(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon red`,children:(0,z.jsx)(gs,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Active Users`}),(0,z.jsx)(`div`,{className:`stat-number`,children:a.userCount})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon blue`,children:(0,z.jsx)(us,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Restaurants`}),(0,z.jsx)(`div`,{className:`stat-number`,children:a.restaurantCount})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon green`,children:(0,z.jsx)(as,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Orders Placed`}),(0,z.jsx)(`div`,{className:`stat-number`,children:a.orderCount})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon purple`,children:(0,z.jsx)(Ho,{size:24})}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,fontWeight:600},children:`Gross Revenue`}),(0,z.jsxs)(`div`,{className:`stat-number`,children:[`₹`,a.totalRevenue.toFixed(2)]})]})]})]}),(0,z.jsxs)(`div`,{className:`tab-bar`,children:[(0,z.jsx)(`button`,{className:`tab-btn ${r===`metrics`?`active`:``}`,onClick:()=>i(`metrics`),children:`Overview & Creators`}),(0,z.jsxs)(`button`,{className:`tab-btn ${r===`requests`?`active`:``}`,onClick:()=>i(`requests`),children:[`Restaurant Requests `,D.length>0&&`(${D.length})`]}),(0,z.jsxs)(`button`,{className:`tab-btn ${r===`users`?`active`:``}`,onClick:()=>i(`users`),children:[`Users Control (`,a.users.length,`)`]}),(0,z.jsxs)(`button`,{className:`tab-btn ${r===`applications`?`active`:``}`,onClick:()=>i(`applications`),children:[`Applications Review (`,a.applications.length,`)`]})]}),r===`metrics`&&(0,z.jsxs)(`div`,{className:`management-grid`,children:[(0,z.jsxs)(`div`,{className:`form-card`,children:[(0,z.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsx)(us,{size:20,style:{color:`var(--brand-red)`}}),` Register New Restaurant (Direct)`]}),(0,z.jsxs)(`form`,{onSubmit:T,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Restaurant Name *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Royal Biryani House`,value:p.name,onChange:e=>m(t=>({...t,name:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Cuisine Type *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. North Indian, Mughlai`,value:p.cuisine,onChange:e=>m(t=>({...t,cuisine:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Full Address *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`Street, City, State`,value:p.address,onChange:e=>m(t=>({...t,address:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Delivery Time (e.g., "35 mins")`}),(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. 30 mins`,value:p.deliveryTime,onChange:e=>m(t=>({...t,deliveryTime:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Cover Image URL`}),(0,z.jsx)(`input`,{type:`url`,placeholder:`https://images.unsplash.com/...`,value:p.imagePath,onChange:e=>m(t=>({...t,imagePath:e.target.value}))})]}),(0,z.jsx)(`button`,{type:`submit`,disabled:_,className:`btn-primary`,style:{width:`100%`},children:_?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):`Add Restaurant`})]})]}),(0,z.jsxs)(`div`,{className:`form-card`,children:[(0,z.jsxs)(`h2`,{style:{fontSize:`1.25rem`,fontWeight:800,marginBottom:`20px`,display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsx)(yo,{size:20,style:{color:`var(--brand-red)`}}),` Publish New Job Opening`]}),(0,z.jsxs)(`form`,{onSubmit:E,children:[(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Job Title *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Operations Manager`,value:h.title,onChange:e=>g(t=>({...t,title:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Department *`}),(0,z.jsxs)(`select`,{required:!0,value:h.department,onChange:e=>g(t=>({...t,department:e.target.value})),children:[(0,z.jsx)(`option`,{value:``,children:`Select Department`}),(0,z.jsx)(`option`,{value:`Engineering`,children:`Engineering`}),(0,z.jsx)(`option`,{value:`Operations`,children:`Operations`}),(0,z.jsx)(`option`,{value:`Culinary`,children:`Culinary`}),(0,z.jsx)(`option`,{value:`Marketing`,children:`Marketing`})]})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Location *`}),(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Bangalore, KA (or Remote)`,value:h.location,onChange:e=>g(t=>({...t,location:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-group`,children:[(0,z.jsx)(`label`,{children:`Job Description *`}),(0,z.jsx)(`textarea`,{required:!0,rows:`4`,placeholder:`Outline job responsibilities, skills needed, compensation details...`,value:h.description,onChange:e=>g(t=>({...t,description:e.target.value}))})]}),(0,z.jsx)(`button`,{type:`submit`,disabled:y,className:`btn-primary`,style:{width:`100%`},children:y?(0,z.jsx)(W,{size:16,style:{animation:`spin 1s linear infinite`}}):`Publish Job Listing`})]})]})]}),r===`requests`&&(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:[`Pending Approvals (`,D.length,`)`]}),D.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`40px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`,marginBottom:`32px`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No pending restaurant onboarding requests found.`})}):(0,z.jsx)(`div`,{style:{marginBottom:`32px`},children:D.map(e=>(0,z.jsxs)(`div`,{className:`request-card`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,flexWrap:`wrap`,gap:`16px`},children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,z.jsx)(`h3`,{style:{fontSize:`1.2rem`,fontWeight:800},children:e.restaurantName}),(0,z.jsx)(`span`,{className:`badge pending`,children:`Pending verification`})]}),(0,z.jsxs)(`p`,{style:{fontSize:`0.85rem`,color:`var(--text-secondary)`,marginTop:`4px`},children:[`Cuisine: `,e.cuisineType,` | Address: `,e.address]}),(0,z.jsxs)(`p`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:[`Submitted by Partner ID: #`,e.adminId,` on `,e.submittedDate]})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:`10px`},children:[(0,z.jsxs)(`button`,{disabled:d===`req-${e.id}`,onClick:()=>ee(e.id,`Approved`),className:`btn-primary`,style:{background:`var(--success)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,z.jsx)(Co,{size:16}),` Approve`]}),(0,z.jsxs)(`button`,{disabled:d===`req-${e.id}`,onClick:()=>ee(e.id,`Rejected`),className:`btn-primary`,style:{background:`var(--danger)`,padding:`8px 16px`,fontSize:`0.85rem`},children:[(0,z.jsx)(ys,{size:16}),` Reject`]})]})]}),(0,z.jsxs)(`div`,{className:`doc-verify-row`,children:[(0,z.jsxs)(`div`,{className:`doc-item`,children:[`License Certificate`,(0,z.jsx)(`strong`,{children:e.licenseNo})]}),(0,z.jsxs)(`div`,{className:`doc-item`,children:[`GST Registration`,(0,z.jsx)(`strong`,{children:e.gstNo})]}),(0,z.jsxs)(`div`,{className:`doc-item`,children:[`Aadhaar Number`,(0,z.jsx)(`strong`,{children:e.aadhaarNo})]})]})]},e.id))}),(0,z.jsx)(`h2`,{style:{fontSize:`1.3rem`,fontWeight:800,marginBottom:`18px`},children:`Log Registry (Reviewed)`}),te.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`32px`,border:`1px dashed var(--border-medium)`,borderRadius:`12px`,background:`#fff`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`Reviewed onboarding requests log will appear here.`})}):(0,z.jsx)(`div`,{children:te.map(e=>(0,z.jsx)(`div`,{className:`request-card`,style:{opacity:.8},children:(0,z.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h4`,{style:{fontWeight:800},children:e.restaurantName}),(0,z.jsxs)(`p`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`,marginTop:`2px`},children:[`Address: `,e.address]})]}),(0,z.jsx)(`span`,{className:`badge ${e.status===`Approved`?`approved`:`rejected`}`,children:e.status})]})},e.id))})]}),r===`users`&&(0,z.jsx)(`div`,{className:`admin-table-wrapper`,children:(0,z.jsxs)(`table`,{className:`admin-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`User ID`}),(0,z.jsx)(`th`,{children:`Username`}),(0,z.jsx)(`th`,{children:`Email`}),(0,z.jsx)(`th`,{children:`Phone Number`}),(0,z.jsx)(`th`,{children:`Role Control`})]})}),(0,z.jsx)(`tbody`,{children:a.users.map(e=>(0,z.jsxs)(`tr`,{children:[(0,z.jsxs)(`td`,{style:{fontWeight:700},children:[`#`,e.userID]}),(0,z.jsx)(`td`,{children:e.userName}),(0,z.jsx)(`td`,{children:e.email}),(0,z.jsx)(`td`,{children:e.phoneNumber||`N/A`}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsxs)(`select`,{className:`role-selector`,value:e.role||`customer`,disabled:d===`role-${e.userID}`,onChange:t=>C(e.userID,t.target.value),children:[(0,z.jsx)(`option`,{value:`customer`,children:`Customer`}),(0,z.jsx)(`option`,{value:`delivery_partner`,children:`Delivery Partner`}),(0,z.jsx)(`option`,{value:`restaurant_admin`,children:`Restaurant Admin`}),(0,z.jsx)(`option`,{value:`super_admin`,children:`Super Admin`})]}),d===`role-${e.userID}`&&(0,z.jsx)(W,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.userID))})]})}),r===`applications`&&(0,z.jsx)(`div`,{className:`admin-table-wrapper`,children:a.applications.length===0?(0,z.jsx)(`div`,{style:{textAlign:`center`,padding:`48px`},children:(0,z.jsx)(`p`,{style:{color:`var(--text-secondary)`},children:`No applications received yet.`})}):(0,z.jsxs)(`table`,{className:`admin-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Candidate Name`}),(0,z.jsx)(`th`,{children:`Target Role`}),(0,z.jsx)(`th`,{children:`Email / Phone`}),(0,z.jsx)(`th`,{children:`Applied Date`}),(0,z.jsx)(`th`,{children:`Resume`}),(0,z.jsx)(`th`,{children:`Status Action`})]})}),(0,z.jsx)(`tbody`,{children:a.applications.map(e=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{style:{fontWeight:700},children:e.candidateName}),(0,z.jsx)(`td`,{children:e.jobTitle}),(0,z.jsxs)(`td`,{children:[(0,z.jsx)(`div`,{style:{fontSize:`0.85rem`},children:e.email}),(0,z.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-secondary)`},children:e.phone})]}),(0,z.jsx)(`td`,{children:e.appliedDate}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`a`,{href:e.resumeUrl,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`0.85rem`},children:[(0,z.jsx)(Io,{size:14}),` Resume`]})}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`8px`},children:[(0,z.jsxs)(`select`,{className:`role-selector`,value:e.status||`Applied`,disabled:d===`app-${e.id}`,onChange:t=>w(e.id,t.target.value),children:[(0,z.jsx)(`option`,{value:`Applied`,children:`Applied`}),(0,z.jsx)(`option`,{value:`Interview Scheduled`,children:`Interview`}),(0,z.jsx)(`option`,{value:`Offer Extended`,children:`Offer`}),(0,z.jsx)(`option`,{value:`Rejected`,children:`Rejected`})]}),d===`app-${e.id}`&&(0,z.jsx)(W,{size:14,style:{animation:`spin 1s linear infinite`,color:`var(--brand-red)`}})]})})]},e.id))})]})})]})]})};function Rs(){return(0,z.jsx)(no,{children:(0,z.jsx)(io,{children:(0,z.jsx)(On,{basename:`/zingbite`,children:(0,z.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,minHeight:`100vh`},children:[(0,z.jsx)(xs,{}),(0,z.jsx)(`main`,{style:{flex:1},children:(0,z.jsxs)(Rt,{children:[(0,z.jsx)(M,{path:`/`,element:(0,z.jsx)(Cs,{})}),(0,z.jsx)(M,{path:`/home`,element:(0,z.jsx)(Cs,{})}),(0,z.jsx)(M,{path:`/menu`,element:(0,z.jsx)(Ts,{})}),(0,z.jsx)(M,{path:`/cart`,element:(0,z.jsx)(Ds,{})}),(0,z.jsx)(M,{path:`/checkout`,element:(0,z.jsx)(Os,{})}),(0,z.jsx)(M,{path:`/login`,element:(0,z.jsx)(ks,{})}),(0,z.jsx)(M,{path:`/register`,element:(0,z.jsx)(As,{})}),(0,z.jsx)(M,{path:`/info/:sectionId`,element:(0,z.jsx)(js,{})}),(0,z.jsx)(M,{path:`/profile`,element:(0,z.jsx)(Ms,{})}),(0,z.jsx)(M,{path:`/track-order`,element:(0,z.jsx)(Ns,{})}),(0,z.jsx)(M,{path:`/delivery`,element:(0,z.jsx)(Ps,{})}),(0,z.jsx)(M,{path:`/restaurant-admin`,element:(0,z.jsx)(Fs,{})}),(0,z.jsx)(M,{path:`/careers`,element:(0,z.jsx)(Is,{})}),(0,z.jsx)(M,{path:`/admin`,element:(0,z.jsx)(Ls,{})})]})}),(0,z.jsx)(Ss,{})]})})})})}eo.createRoot(document.getElementById(`root`)).render((0,z.jsx)(S.StrictMode,{children:(0,z.jsx)(Rs,{})}));