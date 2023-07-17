import{g as V,r as X,w as F,o as J,c as L,a as K,b as P,B as I,d as j,e as C,u as A,f as x,h as N,i as Q,j as Y}from"./index-90cf095c.js";var M={},q={},H={};Object.defineProperty(H,"__esModule",{value:!0});var Z=function(){function d(r,f){var _=[],b=!0,u=!1,p=void 0;try{for(var v=r[Symbol.iterator](),m;!(b=(m=v.next()).done)&&(_.push(m.value),!(f&&_.length===f));b=!0);}catch(O){u=!0,p=O}finally{try{!b&&v.return&&v.return()}finally{if(u)throw p}}return _}return function(r,f){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return d(r,f);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();H.getPagination=ee;function ee(d){var r=d.headers.get("Link"),f={};if(r==null)return null;r=r.split(",");for(var _=d.headers.get("X-Total-Count"),b=0,u=r.length;b<u;b++){var p=r[b].replace(/(^\s*|\s*$)/,""),v=p.split(";"),m=Z(v,2),O=m[0],S=m[1],U=O.match(/page=(\d+)/),l=U&&parseInt(U[1],10);S.match(/last/)?f.last=l:S.match(/next/)?f.next=l:S.match(/prev/)?f.prev=l:S.match(/first/)&&(f.first=l)}return f.last=Math.max(f.last||0,f.prev&&f.prev+1||0),f.current=f.next?f.next-1:f.last||1,f.total=_?parseInt(_,10):null,f}(function(d){Object.defineProperty(d,"__esModule",{value:!0}),d.JSONHTTPError=d.TextHTTPError=d.HTTPError=d.getPagination=void 0;var r=Object.assign||function(l){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(l[t]=n[t])}return l},f=function(){function l(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,n,t){return n&&l(e.prototype,n),t&&l(e,t),e}}(),_=H;Object.defineProperty(d,"getPagination",{enumerable:!0,get:function(){return _.getPagination}});function b(l,e){if(!(l instanceof e))throw new TypeError("Cannot call a class as a function")}function u(l,e){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:l}function p(l,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);l.prototype=Object.create(e&&e.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(l,e):l.__proto__=e)}function v(l){function e(){var n=Reflect.construct(l,Array.from(arguments));return Object.setPrototypeOf(n,Object.getPrototypeOf(this)),n}return e.prototype=Object.create(l.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),Object.setPrototypeOf?Object.setPrototypeOf(e,l):e.__proto__=l,e}var m=d.HTTPError=function(l){p(e,l);function e(n){b(this,e);var t=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n.statusText));return t.name=t.constructor.name,typeof Error.captureStackTrace=="function"?Error.captureStackTrace(t,t.constructor):t.stack=new Error(n.statusText).stack,t.status=n.status,t}return e}(v(Error)),O=d.TextHTTPError=function(l){p(e,l);function e(n,t){b(this,e);var a=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n));return a.data=t,a}return e}(m),S=d.JSONHTTPError=function(l){p(e,l);function e(n,t){b(this,e);var a=u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n));return a.json=t,a}return e}(m),U=function(){function l(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",n=arguments[1];b(this,l),this.apiURL=e,this.apiURL.match(/\/[^\/]?/)&&(this._sameOrigin=!0),this.defaultHeaders=n&&n.defaultHeaders||{}}return f(l,[{key:"headers",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return r({},this.defaultHeaders,{"Content-Type":"application/json"},n)}},{key:"parseJsonResponse",value:function(n){return n.json().then(function(t){if(!n.ok)return Promise.reject(new S(n,t));var a=(0,_.getPagination)(n);return a?{pagination:a,items:t}:t})}},{key:"request",value:function(n){var t=this,a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},y=this.headers(a.headers||{});return this._sameOrigin&&(a.credentials=a.credentials||"same-origin"),fetch(this.apiURL+n,r({},a,{headers:y})).then(function(h){var w=h.headers.get("Content-Type");return w&&w.match(/json/)?t.parseJsonResponse(h):h.ok?h.text().then(function(E){}):h.text().then(function(E){return Promise.reject(new O(h,E))})})}}]),l}();d.default=U})(q);var B={},W={};(function(d){Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;function r(u,p){if(!(u instanceof p))throw new TypeError("Cannot call a class as a function")}function f(u,p){for(var v=0;v<p.length;v++){var m=p[v];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(u,m.key,m)}}function _(u,p,v){return p&&f(u.prototype,p),v&&f(u,v),u}var b=function(){function u(p){r(this,u),this.user=p}return _(u,[{key:"listUsers",value:function(v){return this.user._request("/admin/users",{method:"GET",audience:v})}},{key:"getUser",value:function(v){return this.user._request("/admin/users/".concat(v.id))}},{key:"updateUser",value:function(v){var m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return this.user._request("/admin/users/".concat(v.id),{method:"PUT",body:JSON.stringify(m)})}},{key:"createUser",value:function(v,m){var O=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return O.email=v,O.password=m,this.user._request("/admin/users",{method:"POST",body:JSON.stringify(O)})}},{key:"deleteUser",value:function(v){return this.user._request("/admin/users/".concat(v.id),{method:"DELETE"})}}]),u}();d.default=b})(W);(function(d){function r(s){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?r=function(i){return typeof i}:r=function(i){return i&&typeof Symbol=="function"&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":typeof i},r(s)}Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var f=p(q),_=b(W);function b(s){return s&&s.__esModule?s:{default:s}}function u(){if(typeof WeakMap!="function")return null;var s=new WeakMap;return u=function(){return s},s}function p(s){if(s&&s.__esModule)return s;if(s===null||r(s)!=="object"&&typeof s!="function")return{default:s};var o=u();if(o&&o.has(s))return o.get(s);var i={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in s)if(Object.prototype.hasOwnProperty.call(s,g)){var k=c?Object.getOwnPropertyDescriptor(s,g):null;k&&(k.get||k.set)?Object.defineProperty(i,g,k):i[g]=s[g]}return i.default=s,o&&o.set(s,i),i}function v(s,o){var i=Object.keys(s);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(s);o&&(c=c.filter(function(g){return Object.getOwnPropertyDescriptor(s,g).enumerable})),i.push.apply(i,c)}return i}function m(s){for(var o=1;o<arguments.length;o++){var i=arguments[o]!=null?arguments[o]:{};o%2?v(Object(i),!0).forEach(function(c){O(s,c,i[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(i)):v(Object(i)).forEach(function(c){Object.defineProperty(s,c,Object.getOwnPropertyDescriptor(i,c))})}return s}function O(s,o,i){return o in s?Object.defineProperty(s,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):s[o]=i,s}function S(s,o){if(!(s instanceof o))throw new TypeError("Cannot call a class as a function")}function U(s,o){for(var i=0;i<o.length;i++){var c=o[i];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(s,c.key,c)}}function l(s,o,i){return o&&U(s.prototype,o),i&&U(s,i),s}var e=60*1e3,n="gotrue.user",t={},a=null,y={api:1,token:1,audience:1,url:1},h={api:1},w=function(){return typeof window<"u"},E=function(){function s(o,i,c){S(this,s),this.api=o,this.url=o.apiURL,this.audience=c,this._processTokenResponse(i),a=this}return l(s,[{key:"update",value:function(i){var c=this;return this._request("/user",{method:"PUT",body:JSON.stringify(i)}).then(function(g){return c._saveUserData(g)._refreshSavedSession()})}},{key:"jwt",value:function(i){var c=this.tokenDetails();if(c==null)return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"));var g=c.expires_at,k=c.refresh_token,R=c.access_token;return i||g-e<Date.now()?this._refreshToken(k):Promise.resolve(R)}},{key:"logout",value:function(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_refreshToken",value:function(i){var c=this;return t[i]?t[i]:t[i]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token=".concat(i)}).then(function(g){return delete t[i],c._processTokenResponse(g),c._refreshSavedSession(),c.token.access_token}).catch(function(g){return delete t[i],c.clearSession(),Promise.reject(g)})}},{key:"_request",value:function(i){var c=this,g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};g.headers=g.headers||{};var k=g.audience||this.audience;return k&&(g.headers["X-JWT-AUD"]=k),this.jwt().then(function(R){return c.api.request(i,m({headers:Object.assign(g.headers,{Authorization:"Bearer ".concat(R)})},g)).catch(function(T){return T instanceof f.JSONHTTPError&&T.json&&(T.json.msg?T.message=T.json.msg:T.json.error&&(T.message="".concat(T.json.error,": ").concat(T.json.error_description))),Promise.reject(T)})})}},{key:"getUserData",value:function(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function(i,c){for(var g in i)g in s.prototype||g in y||(this[g]=i[g]);return c&&(this._fromStorage=!0),this}},{key:"_processTokenResponse",value:function(i){this.token=i;try{var c=JSON.parse(G(i.access_token.split(".")[1]));this.token.expires_at=c.exp*1e3}catch(g){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(g)))}}},{key:"_refreshSavedSession",value:function(){return w()&&localStorage.getItem(n)&&this._saveSession(),this}},{key:"_saveSession",value:function(){return w()&&localStorage.setItem(n,JSON.stringify(this._details)),this}},{key:"tokenDetails",value:function(){return this.token}},{key:"clearSession",value:function(){s.removeSavedSession(),this.token=null,a=null}},{key:"admin",get:function(){return new _.default(this)}},{key:"_details",get:function(){var i={};for(var c in this)c in s.prototype||c in h||(i[c]=this[c]);return i}}],[{key:"removeSavedSession",value:function(){w()&&localStorage.removeItem(n)}},{key:"recoverSession",value:function(i){if(a)return a;var c=w()&&localStorage.getItem(n);if(c)try{var g=JSON.parse(c),k=g.url,R=g.token,T=g.audience;if(!k||!R)return null;var $=i||new f.default(k,{});return new s($,R,T)._saveUserData(g,!0)}catch(z){return console.error(new Error("Gotrue-js: Error recovering session: ".concat(z))),null}return null}}]),s}();d.default=E;function G(s){var o=s.replace(/-/g,"+").replace(/_/g,"/");switch(o.length%4){case 0:break;case 2:o+="==";break;case 3:o+="=";break;default:throw"Illegal base64url string!"}var i=window.atob(o);try{return decodeURIComponent(escape(i))}catch{return i}}})(B);(function(d){function r(e){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?r=function(t){return typeof t}:r=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}Object.defineProperty(d,"__esModule",{value:!0}),d.default=void 0;var f=p(q),_=b(B);function b(e){return e&&e.__esModule?e:{default:e}}function u(){if(typeof WeakMap!="function")return null;var e=new WeakMap;return u=function(){return e},e}function p(e){if(e&&e.__esModule)return e;if(e===null||r(e)!=="object"&&typeof e!="function")return{default:e};var n=u();if(n&&n.has(e))return n.get(e);var t={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var y in e)if(Object.prototype.hasOwnProperty.call(e,y)){var h=a?Object.getOwnPropertyDescriptor(e,y):null;h&&(h.get||h.set)?Object.defineProperty(t,y,h):t[y]=e[y]}return t.default=e,n&&n.set(e,t),t}function v(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function m(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function O(e,n,t){return n&&m(e.prototype,n),t&&m(e,t),e}var S=/^http:\/\//,U="/.netlify/identity",l=function(){function e(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=n.APIUrl,a=t===void 0?U:t,y=n.audience,h=y===void 0?"":y,w=n.setCookie,E=w===void 0?!1:w;v(this,e),a.match(S)&&console.warn(`Warning:

DO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!
GoTrue REQUIRES HTTPS to work securely.`),h&&(this.audience=h),this.setCookie=E,this.api=new f.default(a)}return O(e,[{key:"_request",value:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};a.headers=a.headers||{};var y=a.audience||this.audience;return y&&(a.headers["X-JWT-AUD"]=y),this.api.request(t,a).catch(function(h){return h instanceof f.JSONHTTPError&&h.json&&(h.json.msg?h.message=h.json.msg:h.json.error&&(h.message="".concat(h.json.error,": ").concat(h.json.error_description))),Promise.reject(h)})}},{key:"settings",value:function(){return this._request("/settings")}},{key:"signup",value:function(t,a,y){return this._request("/signup",{method:"POST",body:JSON.stringify({email:t,password:a,data:y})})}},{key:"login",value:function(t,a,y){var h=this;return this._setRememberHeaders(y),this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=".concat(encodeURIComponent(t),"&password=").concat(encodeURIComponent(a))}).then(function(w){return _.default.removeSavedSession(),h.createUser(w,y)})}},{key:"loginExternalUrl",value:function(t){return"".concat(this.api.apiURL,"/authorize?provider=").concat(t)}},{key:"confirm",value:function(t,a){return this._setRememberHeaders(a),this.verify("signup",t,a)}},{key:"requestPasswordRecovery",value:function(t){return this._request("/recover",{method:"POST",body:JSON.stringify({email:t})})}},{key:"recover",value:function(t,a){return this._setRememberHeaders(a),this.verify("recovery",t,a)}},{key:"acceptInvite",value:function(t,a,y){var h=this;return this._setRememberHeaders(y),this._request("/verify",{method:"POST",body:JSON.stringify({token:t,password:a,type:"signup"})}).then(function(w){return h.createUser(w,y)})}},{key:"acceptInviteExternalUrl",value:function(t,a){return"".concat(this.api.apiURL,"/authorize?provider=").concat(t,"&invite_token=").concat(a)}},{key:"createUser",value:function(t){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;this._setRememberHeaders(a);var y=new _.default(this.api,t,this.audience);return y.getUserData().then(function(h){return a&&h._saveSession(),h})}},{key:"currentUser",value:function(){var t=_.default.recoverSession(this.api);return t&&this._setRememberHeaders(t._fromStorage),t}},{key:"verify",value:function(t,a,y){var h=this;return this._setRememberHeaders(y),this._request("/verify",{method:"POST",body:JSON.stringify({token:a,type:t})}).then(function(w){return h.createUser(w,y)})}},{key:"_setRememberHeaders",value:function(t){this.setCookie&&(this.api.defaultHeaders=this.api.defaultHeaders||{},this.api.defaultHeaders["X-Use-Cookie"]=t?"1":"session")}}]),e}();d.default=l,typeof window<"u"&&(window.GoTrue=l)})(M);const te=V(M),D=new te({APIUrl:"https://crisp-sandbox.netlify.app/.netlify/identity",setCookie:!0});function re(d,r){return D.login(d,r).then(f=>(console.log("Logged in successfully",f),{success:"Logged in successfully",error:""})).catch(f=>(console.log("It's an error",f),{success:"",error:f.message}))}function ne(d,r,f){return D.signup(d,r,{nickname:f}).then(_=>(console.log("Signed up successfully",_),{success:"Signed up successfully",error:""})).catch(_=>(console.log("It's an error",_),{success:"",error:_.message}))}function ae(){const d=D.currentUser();d&&d.logout().then(r=>console.log("User logged out",r)).catch(r=>console.log("Logout error",r))}function ie(){window.location.href="https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=google"}function se(){window.location.href="https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=github"}const oe={class:"element"},ue=["onSubmit"],ce={__name:"AccountHandler",setup(d){const r=X({email:{value:"",error:"",success:""},password:{value:"",error:"",success:""},nickname:{value:"",error:"",success:""}});F(()=>r.value,u=>{r.error&&u!==""&&(r.error="")});async function f(){r.success="",r.error="";try{const u=await re(r.email.value,r.password.value);u.error&&u.error!==""&&(r.error=u.error),u.success&&u.success!==""&&(r.successTimeoutId&&clearTimeout(r.successTimeoutId.value),r.success=u.success,r.successTimeoutId=x(setTimeout(()=>{r.success=""},1e3)))}catch(u){console.error("An app error occurred:",u),r.error="App error: Signup"}}async function _(){r.success="",r.error="";try{const u=await ne(r.email.value,r.password.value,r.nickname.value);u.error&&u.error!==""&&(r.error=u.error),u.success&&u.success!==""&&(r.successTimeoutId&&clearTimeout(r.successTimeoutId.value),r.success=u.success,r.successTimeoutId=x(setTimeout(()=>{r.success=""},1e3)))}catch(u){console.error("An app error occurred:",u),r.error="App error: Login"}}function b(){try{ae(),r.email.value="",r.password.value="",r.success="Logged out successfully",r.error=""}catch(u){console.error("An app error occurred:",u),r.error="App error: Logout"}}return(u,p)=>(J(),L("div",oe,[K("form",{onSubmit:C(f,["prevent"])},[P(I,{id:"user-nickname",label:"Nickname",error:r.nickname.error,success:r.nickname.success,icon:"people",value:r.nickname.value,"onUpdate:value":p[0]||(p[0]=v=>r.nickname.value=v),copy:!1},null,8,["error","success","value"]),P(I,{id:"user-email",label:"Email address",error:r.email.error,success:r.email.success,icon:"email",value:r.email.value,"onUpdate:value":p[1]||(p[1]=v=>r.email.value=v),copy:!1},null,8,["error","success","value"]),P(I,{id:"user-password",label:"Password",error:r.password.error,success:r.password.success,icon:"lock",value:r.password.value,"onUpdate:value":p[2]||(p[2]=v=>r.password.value=v),copy:!1},null,8,["error","success","value"]),P(j,{id:"login-submit",color:"default",value:"login"}),P(j,{id:"signup-submit",color:"blue",value:"Sign up",button:"",onClick:C(_,["prevent"])},null,8,["onClick"]),P(j,{id:"logout-submit",color:"orange",value:"Logout",button:"",onClick:C(b,["prevent"])},null,8,["onClick"]),P(j,{id:"login-google",color:"default",value:"Google Login",button:"",onClick:C(A(ie),["prevent"])},null,8,["onClick"]),P(j,{id:"login-github",color:"default",value:"Github Login",button:"",onClick:C(A(se),["prevent"])},null,8,["onClick"])],40,ue)]))}},le={class:"view-wrapper"},de={__name:"AccountView",setup(d){return(r,f)=>(J(),L("div",le,[P(Q,{grow:"",full:""},{container:N(()=>[P(Y,null,{card:N(()=>[P(ce)]),_:1})]),_:1})]))}};export{de as default};
