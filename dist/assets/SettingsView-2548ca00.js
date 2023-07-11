import{u as C,r as x,_ as I,a as $,w as k,o as g,c as h,b as S,p as z,d as M,e as U,v as V,F as j,f as F,t as B,g as O,h as w,i as _,B as A,j as D,k as T,l as n,m as v,n as R,T as H,q as N,s as L,x as y,y as b,z as q}from"./index-839c82e3.js";const E=C();function c(t,s,o){const a=x({});try{E.updateSettingValue(t,s),a.value=s,a.success=o}catch(e){console.error(e),a.error=e.message}return a}function G(t,s){const o={"preference-theme":()=>c(t,s,"Theme preferences updated"),"preference-storage":()=>c(t,s,"LocalStorage preferences updated"),"preference-gtm":()=>c(t,s,"Google Tag Manager preferences updated"),"setting-locale":()=>c(t,s,"Chatbox language settings updated"),"setting-merge":()=>c(t,s,"Session merge settings updated"),"setting-maximized":()=>c(t,s,"Maximized settings updated"),"setting-fullview":()=>c(t,s,"Fullview settings updated"),"setting-safemode":()=>c(t,s,"Safe mode settings updated"),"setting-cookie":()=>c(t,s===""?null:Number(s),"Cookies expiration date updated"),"callback-session-loaded":()=>c(t,s,"Callback settings on session loaded updated"),"callback-chat-initiated":()=>c(t,s,"Callback settings on chat initiated updated"),"callback-chat-opened":()=>c(t,s,"Callback settings on session chat opened updated"),"callback-chat-closed":()=>c(t,s,"Callback settings on session chat closed updated"),"callback-message-received":()=>c(t,s,"Callback settings on session chat opened updated"),"callback-message-sent":()=>c(t,s,"Callback settings on session chat closed updated"),"callback-nickname-changed":()=>c(t,s,"Callback settings on nickname changed updated"),"callback-email-changed":()=>c(t,s,"Callback settings on email changed updated"),"callback-phone-changed":()=>c(t,s,"Callback settings on phone changed updated"),"callback-avatar-changed":()=>c(t,s,"Callback settings on avatar changed updated")};return o[t]?o[t]():null}const J=t=>(z("data-v-ad8a75e9"),t=t(),M(),t),K=["for"],P=["id","checked"],Q=J(()=>S("div",{class:"slider"},null,-1)),W={__name:"BaseCheck",props:{value:{type:Boolean,default:!1},id:{type:String,default:""},label:{type:String,default:""}},emits:["update:value"],setup(t,{emit:s}){const o=t,a=$(o.value);return k(()=>o.value,e=>{a.value=e}),k(a,e=>{s("update:value",e)}),(e,p)=>(g(),h("label",{class:"switch",for:t.id},[S("input",{id:t.id,type:"checkbox",checked:a.value,onInput:p[0]||(p[0]=m=>a.value=!a.value)},null,40,P),Q],8,K))}},X=I(W,[["__scopeId","data-v-ad8a75e9"]]);const Y=["id"],Z=["value"],ee=["for"],te={__name:"BaseSelect",props:{options:{type:Object,default:()=>{}},id:{type:String,default:""},value:{type:String,default:""},name:{type:String,default:""}},emits:["update:value"],setup(t,{emit:s}){const a=$(t.value);return k(a,e=>{s("update:value",e)}),(e,p)=>(g(),h("div",null,[U(S("select",{id:t.id,"onUpdate:modelValue":p[0]||(p[0]=m=>a.value=m)},[(g(!0),h(j,null,F(t.options,(m,d)=>(g(),h("option",{value:m,key:m},B(d),9,Z))),128))],8,Y),[[V,a.value]]),S("label",{for:t.id},B(t.name),9,ee)]))}},se=I(te,[["__scopeId","data-v-c0c65f4e"]]);const ne={key:0,class:"element"},ae={class:"form"},ie={class:"setting-container"},oe={class:"label"},le=["for"],ce={class:"setting-item"},re={__name:"SettingsHandler",props:{settingId:{type:String,default:""}},emits:["settings-result","reset-settings"],setup(t,{emit:s}){const o=t,a=C(),e=x({value:"",error:"",success:""});O(()=>{o.settingId==="reset-settings"?Object.assign(e,{id:"reset-settings",color:"red",value:"reset settings",label:"Restore default settings"}):Object.assign(e,a.getSettingById(o.settingId))});const p=w(()=>e.id==="setting-cookie"),m=w(()=>e.id==="setting-locale"),d=w(()=>e.id==="reset-settings");async function u(f,r){e.success="",e.error="";try{const l=await G(f,r);l&&(l.error&&l.error!==""&&setTimeout(()=>{e.error=l.error,s("settings-result",e)},1),l.success&&l.success!==""&&(e.success=l.success,s("settings-result",e)))}catch(l){console.error("An app error occurred:",l),e.error="App error: Settings",s("settings-result",e)}}return k(()=>a.settings.lockMaximized.value,f=>{f&&u(a.settings.lockFullview.id,!1),Object.assign(e,a.getSettingById(o.settingId))}),k(()=>a.settings.lockFullview.value,f=>{f&&u(a.settings.lockMaximized.id,!1),Object.assign(e,a.getSettingById(o.settingId))}),k(()=>a.preferences.themeDetect.value,()=>{Object.assign(e,a.getSettingById(o.settingId))}),(f,r)=>e.id?(g(),h("div",ne,[S("div",ae,[S("div",ie,[S("div",oe,[S("label",{for:e.id},B(e.label),9,le)]),S("div",ce,[m.value?(g(),_(se,{key:0,id:e.id,value:e.value,"onUpdate:value":[r[0]||(r[0]=l=>e.value=l),r[1]||(r[1]=l=>u(e.id,e.value))],options:e.options,name:e.name},null,8,["id","value","options","name"])):p.value?(g(),_(A,{key:1,id:e.id,label:e.name,value:e.value,"onUpdate:value":[r[2]||(r[2]=l=>e.value=l),r[3]||(r[3]=l=>u(e.id,e.value))],number:"",copy:!1},null,8,["id","label","value"])):d.value?(g(),_(D,{key:2,id:e.id,color:e.color,value:e.value,onClick:r[4]||(r[4]=l=>f.$emit("reset-settings")),button:""},null,8,["id","color","value"])):(g(),_(X,{key:3,id:e.id,label:e.label,value:e.value,"onUpdate:value":[r[5]||(r[5]=l=>e.value=l),r[6]||(r[6]=l=>u(e.id,e.value))]},null,8,["id","label","value"]))])])])])):T("",!0)}},i=I(re,[["__scopeId","data-v-ba252c3b"]]),ge={__name:"SettingsView",setup(t){const{bannerOptions:s,displayBanner:o,closeBanner:a}=L();function e(d){let u="";d.error&&d.error!==""?u="error":d.error===""&&d.success&&d.success!==""&&(u="success"),u==="error"?o({message:"There was an error saving these settings: "+d.error,type:"error",animate:!0}):u==="success"&&o({message:"Settings saved successfully! Some changes require the app to be restarted.",type:"info",action:"reload",animate:!1})}function p(d){d==="reload"&&(window.sessionStorage.setItem("settingsSaved","true"),window.location.reload())}function m(){localStorage.removeItem("user"),window.sessionStorage.removeItem("settingsSaved"),window.sessionStorage.setItem("settingsReset","true"),window.location.reload()}return O(()=>{window.sessionStorage.getItem("settingsSaved")&&(o({message:"Settings have been applied and loaded successfully!",type:"success",animate:!0}),window.sessionStorage.removeItem("settingsSaved")),window.sessionStorage.getItem("settingsReset")&&(o({message:"Default settings have been restored.",type:"warning",animate:!0}),window.sessionStorage.removeItem("settingsReset"))}),(d,u)=>(g(),h(j,null,[n(R,{grow:""},{container:v(()=>[n(y,null,{card:v(()=>[n(i,{"setting-id":"preference-theme",onSettingsResult:e}),n(i,{"setting-id":"preference-storage",onSettingsResult:e}),n(i,{"setting-id":"preference-gtm",onSettingsResult:e})]),_:1}),n(y,null,{card:v(()=>[n(i,{"setting-id":"setting-merge",onSettingsResult:e}),n(i,{"setting-id":"setting-maximized",onSettingsResult:e}),n(i,{"setting-id":"setting-fullview",onSettingsResult:e}),n(i,{"setting-id":"setting-safemode",onSettingsResult:e}),n(i,{"setting-id":"setting-cookie",onSettingsResult:e}),n(i,{"setting-id":"setting-locale",onSettingsResult:e})]),_:1}),n(y,null,{card:v(()=>[n(i,{"setting-id":"reset-settings",onResetSettings:m})]),_:1})]),_:1}),n(R,{grow:""},{container:v(()=>[n(y,null,{card:v(()=>[n(i,{"setting-id":"callback-session-loaded",onSettingsResult:e}),n(i,{"setting-id":"callback-chat-initiated",onSettingsResult:e}),n(i,{"setting-id":"callback-chat-opened",onSettingsResult:e}),n(i,{"setting-id":"callback-chat-closed",onSettingsResult:e}),n(i,{"setting-id":"callback-message-sent",onSettingsResult:e}),n(i,{"setting-id":"callback-message-received",onSettingsResult:e}),n(i,{"setting-id":"callback-nickname-changed",onSettingsResult:e}),n(i,{"setting-id":"callback-email-changed",onSettingsResult:e}),n(i,{"setting-id":"callback-phone-changed",onSettingsResult:e}),n(i,{"setting-id":"callback-avatar-changed",onSettingsResult:e})]),_:1})]),_:1}),(g(),_(N,{to:"#app"},[n(H,{name:"banner",mode:"out-in"},{default:v(()=>[b(s).visibility?(g(),_(q,{key:0,onBannerClose:b(a),onBannerAction:p,message:b(s).message,action:b(s).action,animate:b(s).animate,type:b(s).type},null,8,["onBannerClose","message","action","animate","type"])):T("",!0)]),_:1})]))],64))}};export{ge as default};
