import{h as u,o as e,c as n,a as o,u as i,t as d,b as _}from"./index-06f081dc.js";const g={class:"view-wrapper"},h=o("h2",null,"User Profile",-1),p={key:0},b={__name:"AccountView",setup(k){const{loginWithRedirect:c,user:s,isAuthenticated:l,getAccessTokenSilently:m,logout:r}=u(),t=()=>{c({returnTo:window.location.origin})},a=()=>{r({returnTo:window.location.origin})};return(w,f)=>(e(),n("div",g,[o("div",null,[o("button",{onClick:t},"Log in")]),o("div",null,[o("button",{onClick:a},"Log out")]),o("div",null,[h,o("button",{onClick:t},"Log in"),i(l)?(e(),n("pre",p,[o("code",null,d(i(s)),1)])):_("",!0)])]))}};export{b as default};
