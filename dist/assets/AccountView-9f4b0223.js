import{g as V,r as X,w as F,o as L,c as N,a as K,b as k,B as D,d as j,e as C,u as A,f as x,h as J,i as Q,j as Y}from"./index-ab52fc6c.js";var M={},I={},q={};Object.defineProperty(q,"__esModule",{value:!0});var Z=function(){function d(r,l){var b=[],_=!0,u=!1,g=void 0;try{for(var p=r[Symbol.iterator](),m;!(_=(m=p.next()).done)&&(b.push(m.value),!(l&&b.length===l));_=!0);}catch(O){u=!0,g=O}finally{try{!_&&p.return&&p.return()}finally{if(u)throw g}}return b}return function(r,l){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return d(r,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();q.getPagination=ee;function ee(d){var r=d.headers.get("Link"),l={};if(r==null)return null;r=r.split(",");for(var b=d.headers.get("X-Total-Count"),_=0,u=r.length;_<u;_++){var g=r[_].replace(/(^\s*|\s*$)/,""),p=g.split(";"),m=Z(p,2),O=m[0],S=m[1],U=O.match(/page=(\d+)/),f=U&&parseInt(U[1],10);S.match(/last/)?l.last=f:S.match(/next/)?l.next=f:S.match(/prev/)?l.prev=f:S.match(/first/)&&(l.first=f)}return l.last=Math.max(l.last||0,l.prev&&l.prev+1||0),l.current=l.next?l.next-1:l.last||1,l.total=b?parseInt(b,10):null,l}(function(d){Object.defineProperty(d,"__esModule",{value:!0}),d.JSONHTTPError=d.TextHTTPError=d.HTTPError=d.getPagination=void 0;var r=Object.assign||function(f){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(f[t]=n[t])}return f},l=function(){function f(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,n,t){return n&&f(e.prototype,n),t&&f(e,t),e}}(),b=q;Object.defineProperty(d,"getPagination",{enumerable:!0,get:function(){return b.getPagination}});function _(f,e){if(!(f instanceof e))throw new TypeError("Cannot call a class as a function")}function u(f,e){if(!f)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:f}function g(f,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);f.prototype=Object.create(e&&e.prototype,{constructor:{value:f,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(f,e):f.__proto__=e)}function p(f){function e(){var n=Reflect.construct(f,Array.from(arguments));return Object.setPrototypeOf(n,Object.getPrototypeOf(this)),n}return e.prototype=Object.create(f.prototype,{constructor:{value:f,enumerable:!1,writable:!0,configurable:!0}}),Object.setPrototypeOf?Object.setPrototypeOf(e,f):e.__proto__=f,e}var m=d.HTTPError=function(f){g(e,f);function e(n){_(this,e);var t=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.statusText));return t.name=t.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(t,t.constructor):t.stack=new Error(n.statusText).stack,t.status=n.status,t}return e}(p(Error)),O=d.TextHTTPError=function(f){g(e,f);function e(n,t){_(this,e);var i=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n));return i.data=t,i}return e}(m),S=d.JSONHTTPError=function(f){g(e,f);function e(n,t){_(this,e);var i=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n));return i.json=t,i}return e}(m),U=function(){function f(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments[1];_(this,f),this.apiURL=e,this.apiURL.match(/\/[^\/]?/)&&(this._sameOrigin=!0),this.defaultHeaders=n&&n.defaultHeaders||{}}return l(f,[{key:"headers",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return r({},this.defaultHeaders,{"Content-Type":"application/json"},n)}},{key:"parseJsonResponse",value:function(n){return n.json().then(function(t){if(!n.ok)return Promise.reject(new S(n,t));var i=(0,b.getPagination)(n);return i?{pagination:i,items:t}:t})}},{key:"request",value:function(n){var t=this,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},y=this.headers(i.headers||{});return this._sameOrigin&&(i.credentials=i.credentials||"same-origin"),fetch(this.apiURL+n,r({},i,{headers:y})).then(function(h){var w=h.headers.get("Content-Type");return w&&w.match(/json/)?t.parseJsonResponse(h):h.ok?h.text().then(function(E){}):h.text().then(function(E){return Promise.reject(new O(h,E))})})}}]),f}();d.default=U})(I);var B={},W={};(function(d){Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;function r(u,g){if(!(u instanceof g))throw new TypeError("Cannot call a class as a function")}function l(u,g){for(var p=0;p<g.length;p++){var m=g[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(u,m.key,m)}}function b(u,g,p){return g&&l(u.prototype,g),p&&l(u,p),u}var _=function(){function u(g){r(this,u),this.user=g}return b(u,[{key:"listUsers",value:function(p){return this.user._request("/admin/users",{method:"GET",audience:p})}},{key:"getUser",value:function(p){return this.user._request("/admin/users/".concat(p.id))}},{key:"updateUser",value:function(p){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.user._request("/admin/users/".concat(p.id),{method:"PUT",body:JSON.stringify(m)})}},{key:"createUser",value:function(p,m){var O=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return O.email=p,O.password=m,this.user._request("/admin/users",{method:"POST",body:JSON.stringify(O)})}},{key:"deleteUser",value:function(p){return this.user._request("/admin/users/".concat(p.id),{method:"DELETE"})}}]),u}();d.default=_})(W);(function(d){function r(o){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?r=function(a){return typeof a}:r=function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},r(o)}Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var l=g(I),b=_(W);function _(o){return o&&o.__esModule?o:{default:o}}function u(){if(typeof WeakMap!="function")return null;var o=new WeakMap;return u=function(){return o},o}function g(o){if(o&&o.__esModule)return o;if(o===null||r(o)!=="object"&&typeof o!="function")return{default:o};var s=u();if(s&&s.has(o))return s.get(o);var a={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var v in o)if(Object.prototype.hasOwnProperty.call(o,v)){var T=c?Object.getOwnPropertyDescriptor(o,v):null;T&&(T.get||T.set)?Object.defineProperty(a,v,T):a[v]=o[v]}return a.default=o,s&&s.set(o,a),a}function p(o,s){var a=Object.keys(o);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(o);s&&(c=c.filter(function(v){return Object.getOwnPropertyDescriptor(o,v).enumerable})),a.push.apply(a,c)}return a}function m(o){for(var s=1;s<arguments.length;s++){var a=arguments[s]!=null?arguments[s]:{};s%2?p(Object(a),!0).forEach(function(c){O(o,c,a[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach(function(c){Object.defineProperty(o,c,Object.getOwnPropertyDescriptor(a,c))})}return o}function O(o,s,a){return s in o?Object.defineProperty(o,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[s]=a,o}function S(o,s){if(!(o instanceof s))throw new TypeError("Cannot call a class as a function")}function U(o,s){for(var a=0;a<s.length;a++){var c=s[a];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(o,c.key,c)}}function f(o,s,a){return s&&U(o.prototype,s),a&&U(o,a),o}var e=60*1e3,n="gotrue.user",t={},i=null,y={api:1,token:1,audience:1,url:1},h={api:1},w=function(){return typeof window<"u"},E=function(){function o(s,a,c){S(this,o),this.api=s,this.url=s.apiURL,this.audience=c,this._processTokenResponse(a),i=this}return f(o,[{key:"update",value:function(a){var c=this;return this._request("/user",{method:"PUT",body:JSON.stringify(a)}).then(function(v){return c._saveUserData(v)._refreshSavedSession()})}},{key:"jwt",value:function(a){var c=this.tokenDetails();if(c==null)return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"));var v=c.expires_at,T=c.refresh_token,R=c.access_token;return a||v-e<Date.now()?this._refreshToken(T):Promise.resolve(R)}},{key:"logout",value:function(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_refreshToken",value:function(a){var c=this;return t[a]?t[a]:t[a]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token=".concat(a)}).then(function(v){return delete t[a],c._processTokenResponse(v),c._refreshSavedSession(),c.token.access_token}).catch(function(v){return delete t[a],c.clearSession(),Promise.reject(v)})}},{key:"_request",value:function(a){var c=this,v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};v.headers=v.headers||{};var T=v.audience||this.audience;return T&&(v.headers["X-JWT-AUD"]=T),this.jwt().then(function(R){return c.api.request(a,m({headers:Object.assign(v.headers,{Authorization:"Bearer ".concat(R)})},v)).catch(function(P){return P instanceof l.JSONHTTPError&&P.json&&(P.json.msg?P.message=P.json.msg:P.json.error&&(P.message="".concat(P.json.error,": ").concat(P.json.error_description))),Promise.reject(P)})})}},{key:"getUserData",value:function(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function(a,c){for(var v in a)v in o.prototype||v in y||(this[v]=a[v]);return c&&(this._fromStorage=!0),this}},{key:"_processTokenResponse",value:function(a){this.token=a;try{var c=JSON.parse(G(a.access_token.split(".")[1]));this.token.expires_at=c.exp*1e3}catch(v){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(v)))}}},{key:"_refreshSavedSession",value:function(){return w()&&localStorage.getItem(n)&&this._saveSession(),this}},{key:"_saveSession",value:function(){return w()&&localStorage.setItem(n,JSON.stringify(this._details)),this}},{key:"tokenDetails",value:function(){return this.token}},{key:"clearSession",value:function(){o.removeSavedSession(),this.token=null,i=null}},{key:"admin",get:function(){return new b.default(this)}},{key:"_details",get:function(){var a={};for(var c in this)c in o.prototype||c in h||(a[c]=this[c]);return a}}],[{key:"removeSavedSession",value:function(){w()&&localStorage.removeItem(n)}},{key:"recoverSession",value:function(a){if(i)return i;var c=w()&&localStorage.getItem(n);if(c)try{var v=JSON.parse(c),T=v.url,R=v.token,P=v.audience;if(!T||!R)return null;var $=a||new l.default(T,{});return new o($,R,P)._saveUserData(v,!0)}catch(z){return console.error(new Error("Gotrue-js: Error recovering session: ".concat(z))),null}return null}}]),o}();d.default=E;function G(o){var s=o.replace(/-/g,"+").replace(/_/g,"/");switch(s.length%4){case 0:break;case 2:s+="==";break;case 3:s+="=";break;default:throw"Illegal base64url string!"}var a=window.atob(s);try{return decodeURIComponent(escape(a))}catch{return a}}})(B);(function(d){function r(e){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?r=function(t){return typeof t}:r=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var l=g(I),b=_(B);function _(e){return e&&e.__esModule?e:{default:e}}function u(){if(typeof WeakMap!="function")return null;var e=new WeakMap;return u=function(){return e},e}function g(e){if(e&&e.__esModule)return e;if(e===null||r(e)!=="object"&&typeof e!="function")return{default:e};var n=u();if(n&&n.has(e))return n.get(e);var t={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var y in e)if(Object.prototype.hasOwnProperty.call(e,y)){var h=i?Object.getOwnPropertyDescriptor(e,y):null;h&&(h.get||h.set)?Object.defineProperty(t,y,h):t[y]=e[y]}return t.default=e,n&&n.set(e,t),t}function p(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function m(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function O(e,n,t){return n&&m(e.prototype,n),t&&m(e,t),e}var S=/^http:\/\//,U="/.netlify/identity",f=function(){function e(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.APIUrl,i=t===void 0?U:t,y=n.audience,h=y===void 0?"":y,w=n.setCookie,E=w===void 0?!1:w;p(this,e),i.match(S)&&console.warn(`Warning:

DO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!
GoTrue REQUIRES HTTPS to work securely.`),h&&(this.audience=h),this.setCookie=E,this.api=new l.default(i)}return O(e,[{key:"_request",value:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};i.headers=i.headers||{};var y=i.audience||this.audience;return y&&(i.headers["X-JWT-AUD"]=y),this.api.request(t,i).catch(function(h){return h instanceof l.JSONHTTPError&&h.json&&(h.json.msg?h.message=h.json.msg:h.json.error&&(h.message="".concat(h.json.error,": ").concat(h.json.error_description))),Promise.reject(h)})}},{key:"settings",value:function(){return this._request("/settings")}},{key:"signup",value:function(t,i,y){return this._request("/signup",{method:"POST",body:JSON.stringify({email:t,password:i,data:y})})}},{key:"login",value:function(t,i,y){var h=this;return this._setRememberHeaders(y),this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=".concat(encodeURIComponent(t),"&password=").concat(encodeURIComponent(i))}).then(function(w){return b.default.removeSavedSession(),h.createUser(w,y)})}},{key:"loginExternalUrl",value:function(t){return"".concat(this.api.apiURL,"/authorize?provider=").concat(t)}},{key:"confirm",value:function(t,i){return this._setRememberHeaders(i),this.verify("signup",t,i)}},{key:"requestPasswordRecovery",value:function(t){return this._request("/recover",{method:"POST",body:JSON.stringify({email:t})})}},{key:"recover",value:function(t,i){return this._setRememberHeaders(i),this.verify("recovery",t,i)}},{key:"acceptInvite",value:function(t,i,y){var h=this;return this._setRememberHeaders(y),this._request("/verify",{method:"POST",body:JSON.stringify({token:t,password:i,type:"signup"})}).then(function(w){return h.createUser(w,y)})}},{key:"acceptInviteExternalUrl",value:function(t,i){return"".concat(this.api.apiURL,"/authorize?provider=").concat(t,"&invite_token=").concat(i)}},{key:"createUser",value:function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;this._setRememberHeaders(i);var y=new b.default(this.api,t,this.audience);return y.getUserData().then(function(h){return i&&h._saveSession(),h})}},{key:"currentUser",value:function(){var t=b.default.recoverSession(this.api);return t&&this._setRememberHeaders(t._fromStorage),t}},{key:"verify",value:function(t,i,y){var h=this;return this._setRememberHeaders(y),this._request("/verify",{method:"POST",body:JSON.stringify({token:i,type:t})}).then(function(w){return h.createUser(w,y)})}},{key:"_setRememberHeaders",value:function(t){this.setCookie&&(this.api.defaultHeaders=this.api.defaultHeaders||{},this.api.defaultHeaders["X-Use-Cookie"]=t?"1":"session")}}]),e}();d.default=f,typeof window<"u"&&(window.GoTrue=f)})(M);const te=V(M),H=new te({APIUrl:"https://crisp-sandbox.netlify.app/.netlify/identity",setCookie:!0});function re(d,r){return H.login(d,r).then(l=>(console.log("Logged in successfully",l),{success:"Logged in successfully",error:""})).catch(l=>(console.log("It's an error",l),{success:"",error:l.message}))}function ne(d,r){return H.signup(d,r).then(l=>(console.log("Signed up successfully",l),{success:"Signed up successfully",error:""})).catch(l=>(console.log("It's an error",l),{success:"",error:l.message}))}function ie(){const d=H.currentUser();d&&d.logout().then(r=>console.log("User logged out",r)).catch(r=>console.log("Logout error",r))}function ae(){window.location.href="https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=google"}function oe(){window.location.href="https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=github"}const se={class:"element"},ue=["onSubmit"],ce={__name:"AccountHandler",setup(d){const r=X({email:{value:"",error:"",success:""},password:{value:"",error:"",success:""}});F(()=>r.value,u=>{r.error&&u!==""&&(r.error="")});async function l(){r.success="",r.error="";try{const u=await re(r.email.value,r.password.value);u.error&&u.error!==""&&(r.error=u.error),u.success&&u.success!==""&&(r.successTimeoutId&&clearTimeout(r.successTimeoutId.value),r.success=u.success,r.successTimeoutId=x(setTimeout(()=>{r.success=""},1e3)))}catch(u){console.error("An app error occurred:",u),r.error="App error: Signup"}}async function b(){r.success="",r.error="";try{const u=await ne(r.email.value,r.password.value);u.error&&u.error!==""&&(r.error=u.error),u.success&&u.success!==""&&(r.successTimeoutId&&clearTimeout(r.successTimeoutId.value),r.success=u.success,r.successTimeoutId=x(setTimeout(()=>{r.success=""},1e3)))}catch(u){console.error("An app error occurred:",u),r.error="App error: Login"}}function _(){try{ie(),r.email.value="",r.password.value="",r.success="Logged out successfully",r.error=""}catch(u){console.error("An app error occurred:",u),r.error="App error: Logout"}}return(u,g)=>(L(),N("div",se,[K("form",{onSubmit:C(l,["prevent"])},[k(D,{id:"user-email",label:"Email adress",error:r.email.error,success:r.email.success,icon:"email",value:r.email.value,"onUpdate:value":g[0]||(g[0]=p=>r.email.value=p),copy:!1},null,8,["error","success","value"]),k(D,{id:"user-password",label:"Password",error:r.password.error,success:r.password.success,icon:"lock",value:r.password.value,"onUpdate:value":g[1]||(g[1]=p=>r.password.value=p),copy:!1},null,8,["error","success","value"]),k(j,{id:"login-submit",color:"default",value:"login"}),k(j,{id:"signup-submit",color:"blue",value:"Sign up",button:"",onClick:C(b,["prevent"])},null,8,["onClick"]),k(j,{id:"logout-submit",color:"orange",value:"Logout",button:"",onClick:C(_,["prevent"])},null,8,["onClick"]),k(j,{id:"login-google",color:"default",value:"Google Login",button:"",onClick:C(A(ae),["prevent"])},null,8,["onClick"]),k(j,{id:"login-github",color:"default",value:"Github Login",button:"",onClick:C(A(oe),["prevent"])},null,8,["onClick"])],40,ue)]))}},le={class:"view-wrapper"},de={__name:"AccountView",setup(d){return(r,l)=>(L(),N("div",le,[k(Q,{grow:"",full:""},{container:J(()=>[k(Y,null,{card:J(()=>[k(ce)]),_:1})]),_:1})]))}};export{de as default};
