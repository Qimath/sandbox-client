import{_ as h,o as p,c as f,a as n,u as T,r as k,w as C,b as x,d as R,e as a,B as _,f as w,g as v,h as g,i as m,j as H,k as Z,l as U,p as A,m as S,s as V,n as N,q as G,t as M,v as W,x as $,T as B,y as O,z as Y,A as D,C as j,D as q,E as F}from"./index-0b9ea08d.js";const J={},K={id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 488 496"},Q=n("path",{d:"M488,253.8c0,141.5-96.9,242.2-240,242.2S0,385.2,0,248,110.8,0,248,0c66.8,0,123,24.5,166.3,64.9l-67.5,64.9c-88.3-85.2-252.5-21.2-252.5,118.2,0,86.5,69.1,156.6,153.7,156.6,98.2,0,135-70.4,140.8-106.9H248v-85.3h236.1c2.3,12.7,3.9,24.9,3.9,41.4h0Z"},null,-1),X=[Q];function ee(l,u){return p(),f("svg",K,X)}const z=h(J,[["render",ee]]),re={},oe={id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 229.6 223.66"},se=n("path",{d:"M91.8,1.76C61.3,8.56,36.3,25.46,19.1,51.06c-30.1,45.1-24.1,105.6,14.3,144.2,11.5,11.6,29,22.8,42.2,27.1,4.9,1.6,5.5,1.6,7.7,.1,2.4-1.6,2.5-2,2.5-13.5v-11.8l-8.8,.5c-10.3,.5-18.3-1.3-23.1-5.4-1.7-1.4-5-6.2-7.3-10.6-3.8-7.4-6.6-10.8-14.4-17.7-2.6-2.3-2.7-2.4-.9-3.7,4.3-3.2,13-.1,18.5,6.5,9.6,11.7,13.3,14.8,18.8,16,4.9,1,9.4,.6,16.2-1.4,.9-.3,2.1-2.4,2.7-4.8,.6-2.3,2.2-5.8,3.5-7.7l2.4-3.5-8.1-1.6c-17-3.5-27.5-9.6-34.4-20-6.4-9.6-8.5-17.9-8.6-33.4,0-14.6,1.6-20.6,7.9-28.8,2.8-3.6,3.1-4.7,2.3-6.8-1.5-3.6-1.1-18.8,.5-23.4,1.3-3.4,2-4,4.7-4.3,4.5-.5,12.9,2.4,21.4,7.2l7.3,4.2,6.4-1.5c9.1-2.1,36.4-2,44.6,0l6.2,1.6,5.8-3.5c7.7-4.6,17.5-8.2,22.4-8.2,3.9,0,3.9,.1,5.5,5.2,1.7,5.9,2,16.6,.5,21.7-.8,3-.6,3.9,1.6,6.8,10.9,14.4,12.1,38.3,2.9,57.9-6.2,12.9-19.3,21.9-36.9,25.2l-8.4,1.6,3.1,5.5,3.2,5.6,.3,22.3,.4,22.3,2.5,1.6c2.3,1.5,2.8,1.5,7.6-.2,8-2.7,21.7-10.1,29.2-15.8,44.6-33.4,59-93.3,34.3-143.1-14.5-29.3-41.9-51.8-73.3-60.2-13.7-3.6-39.5-4.4-52.5-1.5Z"},null,-1),ae=[se];function ne(l,u){return p(),f("svg",oe,ae)}const E=h(re,[["render",ne]]);const b=l=>(A("data-v-b8c7eeb3"),l=l(),S(),l),te={class:"element"},ie=["onSubmit"],le={class:"auth-container"},ce=b(()=>n("h3",null,"Account Login",-1)),ue=b(()=>n("div",{class:"or-separator"},[n("span",null,"or")],-1)),de=b(()=>n("span",null,"login with google",-1)),me=b(()=>n("span",null,"login with github",-1)),pe={__name:"LoginHandler",emits:["auth-window","banner"],setup(l,{emit:u}){const e=T(),s=k({email:{value:"",error:""},password:{value:"",error:""}});C(()=>[s.email.value,s.password.value],([r,o],[i,c])=>{r!==i&&s.email.error&&(s.email.error=""),o!==c&&s.password.error&&(s.password.error="")});async function t(){s.email.error="",s.password.error="";const r=s.email.value,o=s.password.value;let i=!1;if((o.length<8||o.length>64)&&(setTimeout(()=>{s.password.error="Password invalid"},1),i=!0),(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(r)||r.length>64)&&(setTimeout(()=>{s.email.error="Email address invalid"},1),i=!0),!i)try{const c=await U(s.email.value,s.password.value);c.error&&c.error!==""?u("banner",{message:c.error,type:"error",animate:!0}):(window.sessionStorage.setItem("loggedIn","true"),e.push({name:"dashboard"}).then(()=>e.go()))}catch(c){console.error("App error => Login: ",c)}}return x(()=>{const r=window.location.hash.substring(1),o=new URLSearchParams(r);if(o.has("access_token")){const i=o.get("access_token");R(i)}}),(r,o)=>(p(),f("div",te,[n("form",{onSubmit:g(t,["prevent"])},[n("div",le,[ce,a(_,{id:"user-email",label:"Email address",error:s.email.error,success:s.email.success,icon:"email",value:s.email.value,"onUpdate:value":o[0]||(o[0]=i=>s.email.value=i)},null,8,["error","success","value"]),a(_,{id:"user-password",label:"Password",error:s.password.error,success:s.password.success,icon:"lock",value:s.password.value,"onUpdate:value":o[1]||(o[1]=i=>s.password.value=i),action:"",onAction:o[2]||(o[2]=i=>r.$emit("auth-window","recovery")),"action-type":"large","action-label":"help",type:"password"},null,8,["error","success","value"]),a(w,{id:"login-submit",color:"orange",value:"login"}),ue,a(w,{id:"login-google",color:"blue",button:"",onClick:g(m(H),["prevent"])},{button:v(()=>[a(z),de]),_:1},8,["onClick"]),a(w,{id:"login-github",color:"blue",button:"",onClick:g(m(Z),["prevent"])},{button:v(()=>[a(E),me]),_:1},8,["onClick"]),n("span",{class:"auth-option go-signup",onClick:o[3]||(o[3]=i=>r.$emit("auth-window","signup"))},"I'm a pleb and I don't have an account yet")])],40,ie)]))}},P=h(pe,[["__scopeId","data-v-b8c7eeb3"]]);const y=l=>(A("data-v-993cb259"),l=l(),S(),l),ve={class:"element"},_e=["onSubmit"],we={class:"auth-container"},ge=y(()=>n("h3",null,"Account Registration",-1)),he=y(()=>n("div",{class:"or-separator"},[n("span",null,"or")],-1)),fe=y(()=>n("span",null,"Signup with google",-1)),be=y(()=>n("span",null,"Signup with github",-1)),ye={__name:"SignupHandler",emits:["auth-window","banner"],setup(l,{emit:u}){const e=k({email:{value:"",error:""},password:{value:"",error:""},confirmPassword:{value:"",error:""},nickname:{value:"",error:""}});C(()=>[e.email.value,e.nickname.value,e.password.value,e.confirmPassword.value],([t,r,o,i],[c,d,I,L])=>{t!==c&&e.email.error&&(e.email.error=""),r!==d&&e.nickname.error&&(e.nickname.error=""),o!==I&&e.password.error&&(e.password.error=""),i!==L&&e.confirmPassword.error&&(e.confirmPassword.error="")});async function s(){e.result=null,e.nickname.error="",e.email.error="",e.password.error="",e.confirmPassword.error="";const t=e.nickname.value,r=e.password.value,o=e.confirmPassword.value,i=e.email.value;let c=!1;if((t.length<2||t.length>24||!/^[\w\s]+$/.test(t))&&(setTimeout(()=>{e.nickname.error="Nickname invalid"},1),c=!0),(r.length<8||r.length>64)&&(setTimeout(()=>{e.password.error="Invalid password length"},1),c=!0),(o!==r||o==="")&&(setTimeout(()=>{e.confirmPassword.error="Passwords do not match"},1),c=!0),(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(i)||i.length>64)&&(setTimeout(()=>{e.email.error="Email address invalid"},1),c=!0),!c)try{const d=await V(i,r,t);d.error&&d.error!==""?u("banner",{message:d.error,type:"error",animate:!0}):(u("auth-window","login"),u("banner",{message:"Your account was successfully created! You can now login",type:"success",animate:!0}))}catch(d){console.error("An app error occurred:",d)}}return(t,r)=>(p(),f("div",ve,[n("form",{onSubmit:g(s,["prevent"])},[n("div",we,[ge,a(_,{id:"user-nickname",label:"Nickname",error:e.nickname.error,success:e.nickname.success,icon:"people",value:e.nickname.value,"onUpdate:value":r[0]||(r[0]=o=>e.nickname.value=o)},null,8,["error","success","value"]),a(_,{id:"user-email",label:"Email address",error:e.email.error,success:e.email.success,icon:"email",value:e.email.value,"onUpdate:value":r[1]||(r[1]=o=>e.email.value=o)},null,8,["error","success","value"]),a(_,{id:"user-password",label:"Password",error:e.password.error,success:e.password.success,icon:"lock",value:e.password.value,"onUpdate:value":r[2]||(r[2]=o=>e.password.value=o),type:"password"},null,8,["error","success","value"]),a(_,{id:"user-password-confirm",label:"Confirm password",error:e.confirmPassword.error,success:e.confirmPassword.success,icon:"lock",value:e.confirmPassword.value,"onUpdate:value":r[3]||(r[3]=o=>e.confirmPassword.value=o),type:"password"},null,8,["error","success","value"]),a(w,{id:"signup-submit",color:"orange",value:"sign up"}),he,a(w,{id:"login-google",color:"blue",button:"",onClick:g(m(H),["prevent"])},{button:v(()=>[a(z),fe]),_:1},8,["onClick"]),a(w,{id:"login-github",color:"blue",button:"",onClick:g(m(Z),["prevent"])},{button:v(()=>[a(E),be]),_:1},8,["onClick"]),n("span",{class:"auth-option go-login",onClick:r[4]||(r[4]=o=>t.$emit("auth-window","login"))},"I'm not a pleb and I already have an account")])],40,_e)]))}},$e=h(ye,[["__scopeId","data-v-993cb259"]]);const ke=l=>(A("data-v-0b3548ee"),l=l(),S(),l),Ce={class:"element"},Ae=["onSubmit"],Se={class:"auth-container"},Ie=ke(()=>n("h3",null,"Password Recovery",-1)),Be={__name:"RecoveryHandler",emits:["auth-window","banner"],setup(l,{emit:u}){const e=k({email:{value:"",error:""}});C(()=>[e.email.value],([t],[r])=>{t!==r&&e.email.error&&(e.email.error="")});async function s(){e.email.error="";const t=e.email.value;if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(t)||t.length>64){e.email.error="Email address invalid";return}try{const r=await N(t);r.error&&r.error!==""?u("banner",{message:r.error,type:"error",animate:!0}):u("banner",{message:"A recovery link was sent to your email address",type:"info",action:"login",animate:!0})}catch(r){console.error("An app error occurred:",r)}}return(t,r)=>(p(),f("div",Ce,[n("form",{onSubmit:g(s,["prevent"])},[n("div",Se,[Ie,a(_,{id:"user-email-recovery",label:"Email address",error:e.email.error,success:e.email.success,icon:"email",value:e.email.value,"onUpdate:value":r[0]||(r[0]=o=>e.email.value=o)},null,8,["error","success","value"]),a(w,{id:"recovery-submit",color:"orange",value:"recover password"}),n("span",{class:"auth-option go-login",onClick:r[1]||(r[1]=o=>t.$emit("auth-window","login"))},"I'm no longer a pleb and I'm ready to login")])],40,Ae)]))}},Pe=h(Be,[["__scopeId","data-v-0b3548ee"]]);const xe={class:"view-wrapper"},He={__name:"AccountView",setup(l){const{bannerOptions:u,displayBanner:e,closeBanner:s}=Y(),t=G("login");function r(d){t.value=d}const o=M(()=>{switch(t.value){case"login":return P;case"signup":return $e;case"recovery":return Pe;default:return P}});function i(d){e(d)}function c(d){d==="login"&&(r(d),s())}return x(()=>{window.sessionStorage.getItem("loggedOut")&&(e({message:"You are now logged out. Authenticate again to access the dashboard",type:"warning",animate:!0}),window.sessionStorage.removeItem("loggedOut"))}),(d,I)=>(p(),f("div",xe,[a(W,{full:"",grow:""},{container:v(()=>[a(D,null,{card:v(()=>[a(B,{name:"slide-fade",mode:"out-in"},{default:v(()=>[(p(),$(j(m(o)),{key:m(o),onAuthWindow:r,onBanner:i},null,32))]),_:1})]),_:1})]),_:1}),(p(),$(O,{to:"body"},[a(B,{name:"banner",mode:"out-in"},{default:v(()=>[m(u).visibility?(p(),$(q,{key:0,onBannerClose:m(s),onBannerAction:c,message:m(u).message,action:m(u).action,animate:m(u).animate,type:m(u).type},null,8,["onBannerClose","message","action","animate","type"])):F("",!0)]),_:1})]))]))}},ze=h(He,[["__scopeId","data-v-d36f03e8"]]);export{ze as default};
