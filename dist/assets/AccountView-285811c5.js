import{g as oe,_ as J,o as H,c as D,a as P,u as ae,r as M,w as ie,b as ue,d as F,e as w,f as A,h as I,B as x,i as j,j as B,k as R,l as Z,T as X,m as K,n as ce,p as le,F as fe,q as de,s as ve,t as he,v as pe,x as me}from"./index-b0fc0ffc.js";var Y={},G={},V={};Object.defineProperty(V,"__esModule",{value:!0});var ge=function(){function u(f,m){var b=[],k=!0,s=!1,a=void 0;try{for(var p=f[Symbol.iterator](),_;!(k=(_=p.next()).done)&&(b.push(_.value),!(m&&b.length===m));k=!0);}catch(O){s=!0,a=O}finally{try{!k&&p.return&&p.return()}finally{if(s)throw a}}return b}return function(f,m){if(Array.isArray(f))return f;if(Symbol.iterator in Object(f))return u(f,m);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();V.getPagination=_e;function _e(u){var f=u.headers.get("Link"),m={};if(f==null)return null;f=f.split(",");for(var b=u.headers.get("X-Total-Count"),k=0,s=f.length;k<s;k++){var a=f[k].replace(/(^\s*|\s*$)/,""),p=a.split(";"),_=ge(p,2),O=_[0],T=_[1],C=O.match(/page=(\d+)/),d=C&&parseInt(C[1],10);T.match(/last/)?m.last=d:T.match(/next/)?m.next=d:T.match(/prev/)?m.prev=d:T.match(/first/)&&(m.first=d)}return m.last=Math.max(m.last||0,m.prev&&m.prev+1||0),m.current=m.next?m.next-1:m.last||1,m.total=b?parseInt(b,10):null,m}(function(u){Object.defineProperty(u,"__esModule",{value:!0}),u.JSONHTTPError=u.TextHTTPError=u.HTTPError=u.getPagination=void 0;var f=Object.assign||function(d){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(d[e]=n[e])}return d},m=function(){function d(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,n,e){return n&&d(t.prototype,n),e&&d(t,e),t}}(),b=V;Object.defineProperty(u,"getPagination",{enumerable:!0,get:function(){return b.getPagination}});function k(d,t){if(!(d instanceof t))throw new TypeError("Cannot call a class as a function")}function s(d,t){if(!d)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&(typeof t=="object"||typeof t=="function")?t:d}function a(d,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof t);d.prototype=Object.create(t&&t.prototype,{constructor:{value:d,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(d,t):d.__proto__=t)}function p(d){function t(){var n=Reflect.construct(d,Array.from(arguments));return Object.setPrototypeOf(n,Object.getPrototypeOf(this)),n}return t.prototype=Object.create(d.prototype,{constructor:{value:d,enumerable:!1,writable:!0,configurable:!0}}),Object.setPrototypeOf?Object.setPrototypeOf(t,d):t.__proto__=d,t}var _=u.HTTPError=function(d){a(t,d);function t(n){k(this,t);var e=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n.statusText));return e.name=e.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(e,e.constructor):e.stack=new Error(n.statusText).stack,e.status=n.status,e}return t}(p(Error)),O=u.TextHTTPError=function(d){a(t,d);function t(n,e){k(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n));return r.data=e,r}return t}(_),T=u.JSONHTTPError=function(d){a(t,d);function t(n,e){k(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,n));return r.json=e,r}return t}(_),C=function(){function d(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments[1];k(this,d),this.apiURL=t,this.apiURL.match(/\/[^\/]?/)&&(this._sameOrigin=!0),this.defaultHeaders=n&&n.defaultHeaders||{}}return m(d,[{key:"headers",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return f({},this.defaultHeaders,{"Content-Type":"application/json"},n)}},{key:"parseJsonResponse",value:function(n){return n.json().then(function(e){if(!n.ok)return Promise.reject(new T(n,e));var r=(0,b.getPagination)(n);return r?{pagination:r,items:e}:e})}},{key:"request",value:function(n){var e=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},c=this.headers(r.headers||{});return this._sameOrigin&&(r.credentials=r.credentials||"same-origin"),fetch(this.apiURL+n,f({},r,{headers:c})).then(function(h){var y=h.headers.get("Content-Type");return y&&y.match(/json/)?e.parseJsonResponse(h):h.ok?h.text().then(function(S){}):h.text().then(function(S){return Promise.reject(new O(h,S))})})}}]),d}();u.default=C})(G);var Q={},ee={};(function(u){Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;function f(s,a){if(!(s instanceof a))throw new TypeError("Cannot call a class as a function")}function m(s,a){for(var p=0;p<a.length;p++){var _=a[p];_.enumerable=_.enumerable||!1,_.configurable=!0,"value"in _&&(_.writable=!0),Object.defineProperty(s,_.key,_)}}function b(s,a,p){return a&&m(s.prototype,a),p&&m(s,p),s}var k=function(){function s(a){f(this,s),this.user=a}return b(s,[{key:"listUsers",value:function(p){return this.user._request("/admin/users",{method:"GET",audience:p})}},{key:"getUser",value:function(p){return this.user._request("/admin/users/".concat(p.id))}},{key:"updateUser",value:function(p){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.user._request("/admin/users/".concat(p.id),{method:"PUT",body:JSON.stringify(_)})}},{key:"createUser",value:function(p,_){var O=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return O.email=p,O.password=_,this.user._request("/admin/users",{method:"POST",body:JSON.stringify(O)})}},{key:"deleteUser",value:function(p){return this.user._request("/admin/users/".concat(p.id),{method:"DELETE"})}}]),s}();u.default=k})(ee);(function(u){function f(i){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?f=function(o){return typeof o}:f=function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},f(i)}Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var m=a(G),b=k(ee);function k(i){return i&&i.__esModule?i:{default:i}}function s(){if(typeof WeakMap!="function")return null;var i=new WeakMap;return s=function(){return i},i}function a(i){if(i&&i.__esModule)return i;if(i===null||f(i)!=="object"&&typeof i!="function")return{default:i};var l=s();if(l&&l.has(i))return l.get(i);var o={},v=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in i)if(Object.prototype.hasOwnProperty.call(i,g)){var U=v?Object.getOwnPropertyDescriptor(i,g):null;U&&(U.get||U.set)?Object.defineProperty(o,g,U):o[g]=i[g]}return o.default=i,l&&l.set(i,o),o}function p(i,l){var o=Object.keys(i);if(Object.getOwnPropertySymbols){var v=Object.getOwnPropertySymbols(i);l&&(v=v.filter(function(g){return Object.getOwnPropertyDescriptor(i,g).enumerable})),o.push.apply(o,v)}return o}function _(i){for(var l=1;l<arguments.length;l++){var o=arguments[l]!=null?arguments[l]:{};l%2?p(Object(o),!0).forEach(function(v){O(i,v,o[v])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(o)):p(Object(o)).forEach(function(v){Object.defineProperty(i,v,Object.getOwnPropertyDescriptor(o,v))})}return i}function O(i,l,o){return l in i?Object.defineProperty(i,l,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[l]=o,i}function T(i,l){if(!(i instanceof l))throw new TypeError("Cannot call a class as a function")}function C(i,l){for(var o=0;o<l.length;o++){var v=l[o];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(i,v.key,v)}}function d(i,l,o){return l&&C(i.prototype,l),o&&C(i,o),i}var t=60*1e3,n="gotrue.user",e={},r=null,c={api:1,token:1,audience:1,url:1},h={api:1},y=function(){return typeof window<"u"},S=function(){function i(l,o,v){T(this,i),this.api=l,this.url=l.apiURL,this.audience=v,this._processTokenResponse(o),r=this}return d(i,[{key:"update",value:function(o){var v=this;return this._request("/user",{method:"PUT",body:JSON.stringify(o)}).then(function(g){return v._saveUserData(g)._refreshSavedSession()})}},{key:"jwt",value:function(o){var v=this.tokenDetails();if(v==null)return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"));var g=v.expires_at,U=v.refresh_token,N=v.access_token;return o||g-t<Date.now()?this._refreshToken(U):Promise.resolve(N)}},{key:"logout",value:function(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_refreshToken",value:function(o){var v=this;return e[o]?e[o]:e[o]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token=".concat(o)}).then(function(g){return delete e[o],v._processTokenResponse(g),v._refreshSavedSession(),v.token.access_token}).catch(function(g){return delete e[o],v.clearSession(),Promise.reject(g)})}},{key:"_request",value:function(o){var v=this,g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};g.headers=g.headers||{};var U=g.audience||this.audience;return U&&(g.headers["X-JWT-AUD"]=U),this.jwt().then(function(N){return v.api.request(o,_({headers:Object.assign(g.headers,{Authorization:"Bearer ".concat(N)})},g)).catch(function(E){return E instanceof m.JSONHTTPError&&E.json&&(E.json.msg?E.message=E.json.msg:E.json.error&&(E.message="".concat(E.json.error,": ").concat(E.json.error_description))),Promise.reject(E)})})}},{key:"getUserData",value:function(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function(o,v){for(var g in o)g in i.prototype||g in c||(this[g]=o[g]);return v&&(this._fromStorage=!0),this}},{key:"_processTokenResponse",value:function(o){this.token=o;try{var v=JSON.parse(te(o.access_token.split(".")[1]));this.token.expires_at=v.exp*1e3}catch(g){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(g)))}}},{key:"_refreshSavedSession",value:function(){return y()&&localStorage.getItem(n)&&this._saveSession(),this}},{key:"_saveSession",value:function(){return y()&&localStorage.setItem(n,JSON.stringify(this._details)),this}},{key:"tokenDetails",value:function(){return this.token}},{key:"clearSession",value:function(){i.removeSavedSession(),this.token=null,r=null}},{key:"admin",get:function(){return new b.default(this)}},{key:"_details",get:function(){var o={};for(var v in this)v in i.prototype||v in h||(o[v]=this[v]);return o}}],[{key:"removeSavedSession",value:function(){y()&&localStorage.removeItem(n)}},{key:"recoverSession",value:function(o){if(r)return r;var v=y()&&localStorage.getItem(n);if(v)try{var g=JSON.parse(v),U=g.url,N=g.token,E=g.audience;if(!U||!N)return null;var ne=o||new m.default(U,{});return new i(ne,N,E)._saveUserData(g,!0)}catch(se){return console.error(new Error("Gotrue-js: Error recovering session: ".concat(se))),null}return null}}]),i}();u.default=S;function te(i){var l=i.replace(/-/g,"+").replace(/_/g,"/");switch(l.length%4){case 0:break;case 2:l+="==";break;case 3:l+="=";break;default:throw"Illegal base64url string!"}var o=window.atob(l);try{return decodeURIComponent(escape(o))}catch{return o}}})(Q);(function(u){function f(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?f=function(e){return typeof e}:f=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(t)}Object.defineProperty(u,"__esModule",{value:!0}),u.default=void 0;var m=a(G),b=k(Q);function k(t){return t&&t.__esModule?t:{default:t}}function s(){if(typeof WeakMap!="function")return null;var t=new WeakMap;return s=function(){return t},t}function a(t){if(t&&t.__esModule)return t;if(t===null||f(t)!=="object"&&typeof t!="function")return{default:t};var n=s();if(n&&n.has(t))return n.get(t);var e={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)){var h=r?Object.getOwnPropertyDescriptor(t,c):null;h&&(h.get||h.set)?Object.defineProperty(e,c,h):e[c]=t[c]}return e.default=t,n&&n.set(t,e),e}function p(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,n,e){return n&&_(t.prototype,n),e&&_(t,e),t}var T=/^http:\/\//,C="/.netlify/identity",d=function(){function t(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.APIUrl,r=e===void 0?C:e,c=n.audience,h=c===void 0?"":c,y=n.setCookie,S=y===void 0?!1:y;p(this,t),r.match(T)&&console.warn(`Warning:

DO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!
GoTrue REQUIRES HTTPS to work securely.`),h&&(this.audience=h),this.setCookie=S,this.api=new m.default(r)}return O(t,[{key:"_request",value:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};r.headers=r.headers||{};var c=r.audience||this.audience;return c&&(r.headers["X-JWT-AUD"]=c),this.api.request(e,r).catch(function(h){return h instanceof m.JSONHTTPError&&h.json&&(h.json.msg?h.message=h.json.msg:h.json.error&&(h.message="".concat(h.json.error,": ").concat(h.json.error_description))),Promise.reject(h)})}},{key:"settings",value:function(){return this._request("/settings")}},{key:"signup",value:function(e,r,c){return this._request("/signup",{method:"POST",body:JSON.stringify({email:e,password:r,data:c})})}},{key:"login",value:function(e,r,c){var h=this;return this._setRememberHeaders(c),this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=".concat(encodeURIComponent(e),"&password=").concat(encodeURIComponent(r))}).then(function(y){return b.default.removeSavedSession(),h.createUser(y,c)})}},{key:"loginExternalUrl",value:function(e){return"".concat(this.api.apiURL,"/authorize?provider=").concat(e)}},{key:"confirm",value:function(e,r){return this._setRememberHeaders(r),this.verify("signup",e,r)}},{key:"requestPasswordRecovery",value:function(e){return this._request("/recover",{method:"POST",body:JSON.stringify({email:e})})}},{key:"recover",value:function(e,r){return this._setRememberHeaders(r),this.verify("recovery",e,r)}},{key:"acceptInvite",value:function(e,r,c){var h=this;return this._setRememberHeaders(c),this._request("/verify",{method:"POST",body:JSON.stringify({token:e,password:r,type:"signup"})}).then(function(y){return h.createUser(y,c)})}},{key:"acceptInviteExternalUrl",value:function(e,r){return"".concat(this.api.apiURL,"/authorize?provider=").concat(e,"&invite_token=").concat(r)}},{key:"createUser",value:function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;this._setRememberHeaders(r);var c=new b.default(this.api,e,this.audience);return c.getUserData().then(function(h){return r&&h._saveSession(),h})}},{key:"currentUser",value:function(){var e=b.default.recoverSession(this.api);return e&&this._setRememberHeaders(e._fromStorage),e}},{key:"verify",value:function(e,r,c){var h=this;return this._setRememberHeaders(c),this._request("/verify",{method:"POST",body:JSON.stringify({token:r,type:e})}).then(function(y){return h.createUser(y,c)})}},{key:"_setRememberHeaders",value:function(e){this.setCookie&&(this.api.defaultHeaders=this.api.defaultHeaders||{},this.api.defaultHeaders["X-Use-Cookie"]=e?"1":"session")}}]),t}();u.default=d,typeof window<"u"&&(window.GoTrue=d)})(Y);const ye=oe(Y),$=new ye({APIUrl:"https://crisp-sandbox.netlify.app/.netlify/identity",setCookie:!0}),re="https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=";function we(u){if(u.message){if(u.message.includes("invalid_grant: No user found with that email, or password invalid."))return"Email address or password incorrect";if(u.message.includes("User not found"))return"No account matching this email address was found"}return u.message.includes("A user with this email address has already been registered")?"An account with this email address already exists":"Unknown error"}function z(u){return u.then(f=>(console.log("Success",f),{success:f,error:""})).catch(f=>(console.error("Error",f),{success:"",error:we(f)}))}function be(u,f,m){return z($.signup(u,f,{nickname:m})).then(b=>b.success?{success:b.success.user,error:""}:b)}function ke(u,f){return z($.login(u,f)).then(m=>m.success?{success:m.success.user,error:""}:m)}function Pe(){var u;(u=$.currentUser())==null||u.logout().then(f=>console.log("User logged out",f)).catch(f=>console.log("Logout error",f))}function L(){window.location.href=`${re}google`}function W(){window.location.href=`${re}github`}function Oe(u){return z($.requestPasswordRecovery(u))}function Te(){const u=$.currentUser();return u?{success:u,error:""}:{success:"",error:"Not logged in"}}const Se={},Ue={id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 488 496"},Ee=P("path",{d:"M488,253.8c0,141.5-96.9,242.2-240,242.2S0,385.2,0,248,110.8,0,248,0c66.8,0,123,24.5,166.3,64.9l-67.5,64.9c-88.3-85.2-252.5-21.2-252.5,118.2,0,86.5,69.1,156.6,153.7,156.6,98.2,0,135-70.4,140.8-106.9H248v-85.3h236.1c2.3,12.7,3.9,24.9,3.9,41.4h0Z"},null,-1),Re=[Ee];function Ce(u,f){return H(),D("svg",Ue,Re)}const Ae=J(Se,[["render",Ce]]),Ie={},je={id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 229.6 223.66"},He=P("path",{d:"M91.8,1.76C61.3,8.56,36.3,25.46,19.1,51.06c-30.1,45.1-24.1,105.6,14.3,144.2,11.5,11.6,29,22.8,42.2,27.1,4.9,1.6,5.5,1.6,7.7,.1,2.4-1.6,2.5-2,2.5-13.5v-11.8l-8.8,.5c-10.3,.5-18.3-1.3-23.1-5.4-1.7-1.4-5-6.2-7.3-10.6-3.8-7.4-6.6-10.8-14.4-17.7-2.6-2.3-2.7-2.4-.9-3.7,4.3-3.2,13-.1,18.5,6.5,9.6,11.7,13.3,14.8,18.8,16,4.9,1,9.4,.6,16.2-1.4,.9-.3,2.1-2.4,2.7-4.8,.6-2.3,2.2-5.8,3.5-7.7l2.4-3.5-8.1-1.6c-17-3.5-27.5-9.6-34.4-20-6.4-9.6-8.5-17.9-8.6-33.4,0-14.6,1.6-20.6,7.9-28.8,2.8-3.6,3.1-4.7,2.3-6.8-1.5-3.6-1.1-18.8,.5-23.4,1.3-3.4,2-4,4.7-4.3,4.5-.5,12.9,2.4,21.4,7.2l7.3,4.2,6.4-1.5c9.1-2.1,36.4-2,44.6,0l6.2,1.6,5.8-3.5c7.7-4.6,17.5-8.2,22.4-8.2,3.9,0,3.9,.1,5.5,5.2,1.7,5.9,2,16.6,.5,21.7-.8,3-.6,3.9,1.6,6.8,10.9,14.4,12.1,38.3,2.9,57.9-6.2,12.9-19.3,21.9-36.9,25.2l-8.4,1.6,3.1,5.5,3.2,5.6,.3,22.3,.4,22.3,2.5,1.6c2.3,1.5,2.8,1.5,7.6-.2,8-2.7,21.7-10.1,29.2-15.8,44.6-33.4,59-93.3,34.3-143.1-14.5-29.3-41.9-51.8-73.3-60.2-13.7-3.6-39.5-4.4-52.5-1.5Z"},null,-1),qe=[He];function xe(u,f){return H(),D("svg",je,qe)}const De=J(Ie,[["render",xe]]);const q=u=>(ve("data-v-8c085520"),u=u(),he(),u),Ne={class:"element"},Be={class:"form"},$e={key:0,class:"auth-container"},Je=["onSubmit"],Me=q(()=>P("h3",null,"Account Login",-1)),Le=q(()=>P("div",{class:"or-separator"},[P("span",null,"or")],-1)),We=q(()=>P("span",null,"login with google",-1)),Ge=q(()=>P("span",null,"login with github",-1)),Ve={key:1,class:"auth-container"},ze=["onSubmit"],Fe=q(()=>P("h3",null,"Account Registration",-1)),Ze=q(()=>P("div",{class:"or-separator"},[P("span",null,"or")],-1)),Xe={key:2,class:"auth-container"},Ke=["onSubmit"],Ye=q(()=>P("h3",null,"Password Recovery",-1)),Qe=q(()=>P("div",{class:"or-separator"},[P("span",null,"or")],-1)),er={__name:"AccountHandler",setup(u){const{bannerOptions:f,displayBanner:m,closeBanner:b}=de(),k=ae(),s=M({email:{value:"",error:"",success:""},password:{value:"",error:"",success:""},confirmPassword:{value:"",error:"",success:""},nickname:{value:"",error:"",success:""},successTimeoutId:null,result:null}),a=M({email:{value:"",error:"",success:""},password:{value:"",error:"",success:""},successTimeoutId:null,result:null}),p=M({email:{value:"",error:"",success:""},successTimeoutId:null,result:null});ie(()=>[a.email.value,a.password.value,s.email.value,s.password.value,p.email.value],()=>{a.email.error&&a.email.value!==""&&(a.email.error=""),a.password.error&&a.password.value!==""&&(a.password.error=""),s.email.error&&s.email.value!==""&&(s.email.error=""),s.password.error&&s.password.value!==""&&(s.password.error=""),p.email.error&&p.email.value!==""&&(p.email.error="")}),ue(async()=>{const e=await Te();e&&e.success!==""&&(k.setUserAccount(e.success),console.log("socially logged in"))});async function _(){a.result=null,a.email.error="",a.password.error="",a.email.success="",a.password.success="";const e=a.password.value,r=a.email.value;let c=!1;if((e.length<8||e.length>64)&&(setTimeout(()=>{a.password.error="Password invalid"},1),c=!0),(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(r)||r.length>64)&&(setTimeout(()=>{a.email.error="Email address invalid"},1),c=!0),!c)try{const h=await ke(a.email.value,a.password.value);if(h.error&&h.error!=="")m({message:h.error,type:"error",animate:!0});else{k.setUserAccount(h.success);const y=h.success.user_metadata.full_name||h.success.user_metadata.nickname;m({message:"You are now logged in as"+y,type:"success",animate:!0})}console.log("login: ",a.result)}catch{console.error("App error: Login")}}async function O(){s.result=null,s.nickname.error="",s.email.error="",s.password.error="",s.confirmPassword.error="",s.nickname.success="",s.email.success="",s.password.success="",s.confirmPassword.success="";const e=s.nickname.value,r=s.password.value,c=s.confirmPassword.value,h=s.email.value;let y=!1;if((e.length<2||e.length>24||!/^[\w\s]+$/.test(e))&&(setTimeout(()=>{s.nickname.error="Nickname invalid"},1),y=!0),(r.length<8||r.length>64)&&(setTimeout(()=>{s.password.error="Invalid password length"},1),y=!0),(c!==r||c==="")&&(setTimeout(()=>{s.confirmPassword.error="Passwords do not match"},1),y=!0),(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(h)||h.length>64)&&(setTimeout(()=>{s.email.error="Email address invalid"},1),y=!0),!y)try{const S=await be(h,r,e);S.error&&S.error!==""?m({message:S.error,type:"error",animate:!0}):(d=F("login"),a.email.value=s.email.value,a.password.value=s.password.value,m({message:"Your account was successfully created!",type:"info",action:"login",animate:!0})),console.log("signup: ",s.result)}catch(S){console.error("An app error occurred:",S)}}async function T(){p.result=null,p.email.error="",p.email.success="";const e=p.email.value;if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)||e.length>64){p.email.error="Email address invalid";return}try{const r=await Oe(e);r.error&&r.error!==""?m({message:r.error,type:"error",animate:!0}):m({message:"A recovery link was sent to your email address",type:"info",action:"login",animate:!0}),console.log("recovery: ",p.result)}catch(r){console.error("An app error occurred:",r)}}function C(){try{Pe();for(const e of[a,s,p])for(const r of Object.keys(e))r!=="successTimeoutId"&&(e[r].value="",e[r].error="",e[r].success="")}catch(e){console.error("An app error occurred:",e)}}const d=F("login");function t(e){d.value=e}function n(e){e==="login"&&(d.value="login")}return(e,r)=>(H(),D(fe,null,[P("div",Ne,[P("div",Be,[w(X,{name:"slide-fade",mode:"out-in"},{default:A(()=>[d.value==="login"?(H(),D("div",$e,[P("form",{onSubmit:I(_,["prevent"])},[Me,w(x,{id:"user-email",label:"Email address",error:a.email.error,success:a.email.success,icon:"email",value:a.email.value,"onUpdate:value":r[0]||(r[0]=c=>a.email.value=c)},null,8,["error","success","value"]),w(x,{id:"user-password",label:"Password",error:a.password.error,success:a.password.success,icon:"lock",value:a.password.value,"onUpdate:value":r[1]||(r[1]=c=>a.password.value=c),action:"",onAction:r[2]||(r[2]=c=>t("recovery")),"action-type":"large","action-label":"help"},null,8,["error","success","value"]),w(j,{id:"login-submit",color:"default",value:"login"}),w(j,{id:"logout-submit",color:"orange",button:"",onClick:I(C,["prevent"])},{button:A(()=>[B("logout")]),_:1},8,["onClick"]),Le,w(j,{id:"login-google",color:"blue",button:"",onClick:I(R(L),["prevent"])},{button:A(()=>[w(Ae),We]),_:1},8,["onClick"]),w(j,{id:"login-github",color:"blue",button:"",onClick:I(R(W),["prevent"])},{button:A(()=>[w(De),Ge]),_:1},8,["onClick"]),P("span",{class:"auth-option go-signup",onClick:r[3]||(r[3]=c=>t("signup"))},"I'm a pleb and I don't have an account yet")],40,Je)])):d.value==="signup"?(H(),D("div",Ve,[P("form",{onSubmit:I(O,["prevent"])},[Fe,w(x,{id:"user-nickname",label:"Nickname",error:s.nickname.error,success:s.nickname.success,icon:"people",value:s.nickname.value,"onUpdate:value":r[4]||(r[4]=c=>s.nickname.value=c)},null,8,["error","success","value"]),w(x,{id:"user-email",label:"Email address",error:s.email.error,success:s.email.success,icon:"email",value:s.email.value,"onUpdate:value":r[5]||(r[5]=c=>s.email.value=c)},null,8,["error","success","value"]),w(x,{id:"user-password",label:"Password",error:s.password.error,success:s.password.success,icon:"lock",value:s.password.value,"onUpdate:value":r[6]||(r[6]=c=>s.password.value=c)},null,8,["error","success","value"]),w(x,{id:"user-password-confirm",label:"Confirm password",error:s.confirmPassword.error,success:s.confirmPassword.success,icon:"lock",value:s.confirmPassword.value,"onUpdate:value":r[7]||(r[7]=c=>s.confirmPassword.value=c)},null,8,["error","success","value"]),w(j,{id:"signup-submit",color:"orange",value:"sign up"}),Ze,w(j,{id:"signup-google",color:"blue",button:"",onClick:I(R(L),["prevent"])},{button:A(()=>[B("signup with google")]),_:1},8,["onClick"]),w(j,{id:"signup-github",color:"blue",button:"",onClick:I(R(W),["prevent"])},{button:A(()=>[B("signup with github")]),_:1},8,["onClick"]),P("span",{class:"auth-option go-login",onClick:r[8]||(r[8]=c=>t("login"))},"I'm not a pleb and I already have an account")],40,ze)])):d.value==="recovery"?(H(),D("div",Xe,[P("form",{onSubmit:I(T,["prevent"])},[Ye,w(x,{id:"user-email-recovery",label:"Email address",error:p.email.error,success:p.email.success,icon:"email",value:p.email.value,"onUpdate:value":r[9]||(r[9]=c=>p.email.value=c)},null,8,["error","success","value"]),w(j,{id:"recovery-submit",color:"orange",value:"recover password"}),Qe,w(j,{id:"recovery-google",color:"blue",button:"",onClick:I(R(L),["prevent"])},{button:A(()=>[B("recover with google")]),_:1},8,["onClick"]),w(j,{id:"recovery-github",color:"blue",button:"",onClick:I(R(W),["prevent"])},{button:A(()=>[B("recover with github")]),_:1},8,["onClick"]),P("span",{class:"auth-option go-login",onClick:r[10]||(r[10]=c=>t("login"))},"I'm no longer a pleb and I'm ready to login")],40,Ke)])):Z("",!0)]),_:1})])]),(H(),K(le,{to:"#app"},[w(X,{name:"banner",mode:"out-in"},{default:A(()=>[R(f).visibility?(H(),K(ce,{key:0,onBannerClose:R(b),onBannerAction:n,message:R(f).message,action:R(f).action,animate:R(f).animate,type:R(f).type},null,8,["onBannerClose","message","action","animate","type"])):Z("",!0)]),_:1})]))],64))}},rr=J(er,[["__scopeId","data-v-8c085520"]]);const tr={class:"view-wrapper"},nr={__name:"AccountView",setup(u){return(f,m)=>(H(),D("div",tr,[w(pe,{full:"",grow:""},{container:A(()=>[w(me,null,{card:A(()=>[w(rr)]),_:1})]),_:1})]))}},or=J(nr,[["__scopeId","data-v-1ac4d140"]]);export{or as default};
