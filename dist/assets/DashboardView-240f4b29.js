import{_ as w,F as f,u as v,G as B,t as i,o as u,c as y,a as m,e as s,i as e,H as b,g as l,I,h as S,f as A,J as x,p as C,m as k,b as V,v as N,x as h,T as P,y as D,z as E,A as H,D as T,E as $}from"./index-4a912800.js";const M=a=>(C("data-v-77e24045"),a=a(),k(),a),O={class:"element"},R={class:"form"},z={class:"auth-container"},F=M(()=>m("h3",null,"Account Profile",-1)),G={__name:"ProfileHandler",emits:["auth-window","banner"],setup(a,{emit:d}){const n=f(),o=v();B();const _=i(()=>n.getAccount().nickname),c=i(()=>n.getAccount().email),p=window.location.origin+"/images/avatars/eole.png",r=i(()=>n.getAccount().login);async function g(){try{const t=await x();t.error&&t.error!==""?d("banner",{message:t.error,type:"error",animate:!0}):(window.sessionStorage.setItem("loggedOut","true"),o.push({name:"account"}).then(()=>o.go()))}catch(t){console.error("An app error occurred:",t)}}return(t,W)=>(u(),y("div",O,[m("div",R,[m("div",z,[F,s(b,{primary:e(_),secondary:e(c),picture:p,status:e(r)},null,8,["primary","secondary","status"]),s(A,{id:"logout",color:"red",button:"",onClick:S(g,["prevent"])},{button:l(()=>[I("logout")]),_:1},8,["onClick"])])])]))}},J=w(G,[["__scopeId","data-v-77e24045"]]);const L={class:"view-wrapper"},U={__name:"DashboardView",setup(a){const d=f(),n=i(()=>d.getAccount().email),{bannerOptions:o,displayBanner:_,closeBanner:c}=E();function p(r){r==="login"&&(authWindowSwap(r),c())}return V(()=>{window.sessionStorage.getItem("loggedIn")&&(_({message:`You are now successfully logged in as <strong>${n.value}</strong>`,type:"success",animate:!0}),window.sessionStorage.removeItem("loggedIn"))}),(r,g)=>(u(),y("div",L,[s(N,{full:"",grow:""},{container:l(()=>[s(H,null,{card:l(()=>[s(J)]),_:1})]),_:1}),(u(),h(D,{to:"body"},[s(P,{name:"banner",mode:"out-in"},{default:l(()=>[e(o).visibility?(u(),h(T,{key:0,onBannerClose:e(c),onBannerAction:p,message:e(o).message,action:e(o).action,animate:e(o).animate,type:e(o).type},null,8,["onBannerClose","message","action","animate","type"])):$("",!0)]),_:1})]))]))}},j=w(U,[["__scopeId","data-v-4531c159"]]);export{j as default};