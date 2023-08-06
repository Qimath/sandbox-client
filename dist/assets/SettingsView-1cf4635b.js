import{E as K,_ as $,q as x,k as C,o as c,b,d as f,p as O,j as W,F as J,G as Q,H as Y,I as X,J as w,u as Z,L as ee,r as B,c as k,s as F,M as te,e as a,w as h,g as T,i as H,D as A,f as v,v as _,m as N,N as se,t as P,T as ae,x as ne,y as le,z as I,C as oe,O as ie}from"./index-cc0d342f.js";const re=K({id:"settings",state:()=>({preferences:{themeDetect:{id:"preference-theme_detect",label:"Auto-detect theme preference",default:!0},themeSelected:{id:"prererence-theme_selected",label:"Theme currently active",default:"light"},localStorageClear:{id:"preference-storage",label:"Clear localStorage on session reset",default:!0},gtmEnable:{id:"preference-gtm_enable",label:"Enable Google Tag Manager",default:!1},gtmId:{id:"preference-gtm_id",label:"Set the GTM Container ID",desc:"GTM Container ID",default:""},mainWebsite:{id:"preference-main_website",label:"Current main website: ",default:{id:"e93e073a-1f69-4cbc-8934-f9e1611e65bb",name:"Staging"}}},options:{sessionMerge:{id:"setting-merge",label:"Merge token ID session when logging in",default:!0},lockMaximized:{id:"setting-maximized",label:"Prevent chatbox from being closed",default:!1},lockFullview:{id:"setting-fullview",label:"Enforce chatbox fullscreen mode",default:!1},safeMode:{id:"setting-safemode",label:"Activate the safeMode (no errors returned)",default:!1},cookieExpire:{id:"setting-cookie",desc:"Cookie expiration timer",label:"Set Cookie expiration date (default is 6 months)",default:null},locale:{id:"setting-locale",desc:"Chatbox locale",label:"Set chatbox language",default:null,languages:{"Auto-detect":null,Afrikaans:"af",Arabic:"ar","Arabic (United Arab Emirates)":"ar-AE","Arabic (Saudi Arabia)":"ar-SA","Arabic (Yemen)":"ar-YE",Armenian:"hy",Azerbaijani:"az",Basque:"eu",Bengali:"bn",Bulgarian:"bg",Catalan:"ca","Chinese (Simplified)":"zh-CN","Chinese (Traditional)":"zh-TW","Chinese (Hong-Kong)":"zh-HK",Croatian:"hr",Czech:"cs",Danish:"da",Dutch:"nl","Dutch (Belgium)":"nl-BE",English:"en",Esperanto:"eo",Estonian:"et",Faroese:"fo",Finnish:"fi",French:"fr",Georgian:"ka",German:"de",Greek:"el",Gujarati:"gu",Hebrew:"he",Hindi:"hi",Hungarian:"hu",Icelandic:"is",Indonesian:"id",Italian:"it",Japanese:"ja",Korean:"ko",Latvian:"lv",Lithuanian:"lt",Malay:"ms",Malayalam:"ml",Mongolian:"mn",Nepali:"ne",Norwegian:"no",Pashto:"ps",Persian:"fa",Polish:"pl",Portuguese:"pt","Portuguese (Brazil)":"pt-BR",Romanian:"ro",Russian:"ru",Serbian:"sr","Serbian (Cyrilic)":"sr-Cyrl",Slovak:"sk",Slovenian:"sl",Spanish:"es",Swedish:"sv",Thai:"th",Tamil:"ta",Turkish:"tr",Ukrainian:"uk",Vietnamese:"vi"}}},callbacks:{onSessionLoaded:{id:"callback-session-loaded",label:"Console callback on session loaded",default:!1},onChatInitiated:{id:"callback-chat-initiated",label:"Console callback on chat initiated",default:!1},onChatOpened:{id:"callback-chat-opened",label:"Console callback on chat opened",default:!1},onChatClosed:{id:"callback-chat-closed",label:"Console callback on chat closed",default:!1},onMessageSent:{id:"callback-message-sent",label:"Console callback on message sent",default:!1},onMessageReceived:{id:"callback-message-received",label:"Console callback on message received",default:!1},onNicknameChanged:{id:"callback-nickname-changed",label:"Console callback on nickname changed",default:!1},onEmailChanged:{id:"callback-email-changed",label:"Console callback on email changed",default:!1},onPhoneChanged:{id:"callback-phone-changed",label:"Console callback on phone changed",default:!1},onAvatarChanged:{id:"callback-avatar-changed",label:"Console callback on avatar changed",default:!1},onMessageComposeSent:{id:"callback-compose-sent",label:"Console callback on message compose sent",default:!1},onMessageComposeReceived:{id:"callback-compose-received",label:"Console callback on message compose received",default:!1},onWebsiteAvailabilityChanged:{id:"callback-availability-changed",label:"Console callback on website availability changed",default:!1},onHelpdeskQueried:{id:"callback-helpdesk-queried",label:"Console callback on helpdesk search queried",default:!1}}}),getters:{getSetting:s=>r=>{if(s.options.hasOwnProperty(r))return s.options[r];if(s.preferences.hasOwnProperty(r))return s.preferences[r];if(s.callbacks.hasOwnProperty(r))return s.callbacks[r];console.error(`App error [useSettingsStore]: Setting ${r} does not exist.`)},getPreferences:s=>()=>s.preferences,getOptions:s=>()=>s.options,getCallbacks:s=>()=>s.callbacks}});const ce=s=>(O("data-v-d68794fd"),s=s(),W(),s),de=["for"],ue=["id","checked"],ge=ce(()=>f("div",{class:"slider"},null,-1)),pe={__name:"BaseCheck",props:{value:{type:Boolean,default:!1},id:{type:String,default:""},label:{type:String,default:""}},emits:["update:value"],setup(s,{emit:r}){const o=s,u=x(o.value);return C(()=>o.value,t=>{u.value=t}),C(u,t=>{r("update:value",t)}),(t,m)=>(c(),b("label",{class:"switch",for:s.id},[f("input",{id:s.id,type:"checkbox",checked:u.value,onInput:m[0]||(m[0]=e=>u.value=!u.value)},null,40,ue),ge],8,de))}},fe=$(pe,[["__scopeId","data-v-d68794fd"]]);const be=["id"],me=["value"],ve=["for"],he={__name:"BaseSelect",props:{options:{type:Object,default:()=>{}},id:{type:String,default:""},value:{type:String,default:""},label:{type:String,default:""}},emits:["update:value"],setup(s,{emit:r}){const o=s,u=x(o.value);return C(u,t=>{r("update:value",t)}),C(()=>o.value,t=>{u.value=t},{immediate:!0}),(t,m)=>(c(),b("div",null,[J(f("select",{id:s.id,"onUpdate:modelValue":m[0]||(m[0]=e=>u.value=e)},[(c(!0),b(Y,null,X(s.options,(e,d)=>(c(),b("option",{value:e,key:e},w(d),9,me))),128))],8,be),[[Q,u.value]]),f("label",{for:s.id},w(s.label),9,ve)]))}},Se=$(he,[["__scopeId","data-v-f8650bf1"]]);const ye=s=>(O("data-v-199545f0"),s=s(),W(),s),ke={class:"element"},_e={class:"form"},Ce={key:0,class:"setting-container"},we=ye(()=>f("div",{class:"label"},[f("label",{for:"reset-settings"},"Restore default settings")],-1)),Re={class:"setting-item"},Be={key:1,class:"setting-container"},Ie={key:0,class:"copy-method"},xe={key:0,class:"copy-type"},Me={class:"label"},Te=["for"],Ae=["for"],$e={class:"setting-item"},Ee={__name:"SettingsHandler",props:{setting:{type:String,default:""},reset:{type:Boolean,default:!1},copy:{type:Boolean,default:!1}},emits:["settings-result","reset-settings"],setup(s,{emit:r}){const o=s,u=re(),t=Z(),m=ee(),e=B({value:"",error:"",success:""}),d=k(()=>m.getWebsiteId),g=k(()=>m.getConfig.website),V=k(()=>m.getWebsiteValidity),G=k(()=>o.setting==="cookieExpire"),U=k(()=>o.setting==="locale"),j=k(()=>o.setting==="gtmId"),E=k(()=>o.setting==="mainWebsite"),z=x(!1),S=B({}),M=B({});F(async()=>{if(!o.reset){const i=t.getSetting(o.setting),n=o.setting;Object.assign(e,{value:i,name:n},u.getSetting(o.setting))}await te(),z.value=!0});function L(){V.value?(e.value={id:d,name:g},y(e.name,e.value)):(e.error=`Website ID <strong>${d.value}</strong> is not valid. Cannot be set as main website.`,r("settings-result",e))}async function y(i,n){if(z.value){e.success="",e.error="",i==="cookieExpire"&&(n=Number(n));try{await t.setSetting(i,n),e.success=`Setting ${i} updated successfully!`}catch(R){e.error=R.message}finally{r("settings-result",e)}}}async function q(i){S[i]||(S[i]=B({copyType:""}));try{const n=await se(i);n&&(setTimeout(()=>{Object.assign(S[i],n),navigator.clipboard.writeText(S[i].copyValue)},1),M[i]&&clearTimeout(M[i]),M[i]=x(setTimeout(()=>{S[i].copyType=""},1e3)))}catch(n){console.error("An app error occurred:",n)}}return C(()=>{if(o.setting)return t.getSetting(o.setting)},i=>{i!==void 0&&(e.value=i)}),C(()=>t.options.lockMaximized,i=>{i&&y("lockFullview",!1)}),C(()=>t.options.lockFullview,i=>{i&&y("lockMaximized",!1)}),(i,n)=>{var R,D;return c(),b("div",ke,[f("div",_e,[s.reset?(c(),b("div",Ce,[we,f("div",Re,[a(H,{id:"reset-settings",color:"red",onClick:n[0]||(n[0]=p=>i.$emit("reset-settings")),button:""},{button:h(()=>[T("reset settings")]),_:1})])])):(c(),b("div",Be,[f("div",null,[s.copy?(c(),b("div",Ie,[f("span",{onClick:n[1]||(n[1]=p=>q(o.setting)),class:"material-symbols-outlined"},"content_copy"),s.copy&&((R=S[o.setting])!=null&&R.copyType)?(c(),b("span",xe,w((D=S[o.setting])==null?void 0:D.copyType),1)):A("",!0)])):A("",!0),f("div",Me,[v(E)?(c(),b("label",{key:0,for:e.id},[T(w(e.label)+" ",1),f("strong",null,w(e.value.name),1)],8,Te)):(c(),b("label",{key:1,for:e.id},w(e.label),9,Ae))])]),f("div",$e,[v(U)?(c(),_(Se,{key:0,id:e.id,value:e.value,"onUpdate:value":[n[2]||(n[2]=p=>e.value=p),n[3]||(n[3]=p=>y(e.name,e.value))],options:e.languages,label:e.desc},null,8,["id","value","options","label"])):v(G)?(c(),_(N,{key:1,id:e.id,label:e.desc,value:e.value,"onUpdate:value":[n[4]||(n[4]=p=>e.value=p),n[5]||(n[5]=p=>y(e.name,e.value))],type:"number"},null,8,["id","label","value"])):v(j)?(c(),_(N,{key:2,id:e.id,label:e.desc,value:e.value,"onUpdate:value":[n[6]||(n[6]=p=>e.value=p),n[7]||(n[7]=p=>y(e.name,e.value))]},null,8,["id","label","value"])):v(E)?(c(),_(H,{key:3,id:e.id,color:"blue",onClick:L,button:""},{button:h(()=>[T("set main website")]),_:1},8,["id"])):(c(),_(fe,{key:4,id:e.id,label:e.label,value:e.value,"onUpdate:value":[n[8]||(n[8]=p=>e.value=p),n[9]||(n[9]=p=>y(e.name,e.value))]},null,8,["id","label","value"]))])]))])])}}},l=$(Ee,[["__scopeId","data-v-199545f0"]]),ze={class:"view-wrapper"},He={__name:"SettingsView",setup(s){const{bannerOptions:r,displayBanner:o,closeBanner:u}=le();function t(d){let g="";d.error&&d.error!==""?g="error":d.error===""&&d.success&&d.success!==""&&(g="success"),g==="error"?o({message:"There was an error saving these settings: "+d.error,type:"error",animate:!0}):g==="success"&&o({message:"Settings saved successfully! Some changes require the app to be restarted.",type:"info",action:"reload",animate:!1})}function m(d){d==="reload"&&(window.sessionStorage.setItem("settingsSaved","true"),window.location.reload())}async function e(){const d={preferences:null,options:null,callbacks:null};try{const g=await ie(d);g.error&&g.error!==""?o({message:g.error,type:"error",animate:!0}):(window.sessionStorage.removeItem("settingsSaved"),window.sessionStorage.setItem("settingsReset","true"),window.location.reload())}catch(g){console.error("App error => Reset: ",g)}}return F(()=>{window.sessionStorage.getItem("settingsSaved")&&(o({message:"Settings have been applied and loaded successfully!",type:"success",animate:!0}),window.sessionStorage.removeItem("settingsSaved")),window.sessionStorage.getItem("settingsReset")&&(o({message:"Default settings have been restored.",type:"warning",animate:!0}),window.sessionStorage.removeItem("settingsReset"))}),(d,g)=>(c(),b("div",ze,[a(P,{grow:""},{container:h(()=>[a(I,null,{card:h(()=>[a(l,{setting:"themeDetect",onSettingsResult:t}),a(l,{setting:"localStorageClear",onSettingsResult:t}),a(l,{setting:"gtmEnable",onSettingsResult:t}),a(l,{setting:"gtmId",onSettingsResult:t}),a(l,{setting:"mainWebsite",onSettingsResult:t})]),_:1}),a(I,null,{card:h(()=>[a(l,{setting:"sessionMerge",onSettingsResult:t}),a(l,{setting:"lockMaximized",onSettingsResult:t}),a(l,{setting:"lockFullview",onSettingsResult:t}),a(l,{setting:"safeMode",onSettingsResult:t}),a(l,{setting:"cookieExpire",onSettingsResult:t}),a(l,{setting:"locale",onSettingsResult:t})]),_:1}),a(I,null,{card:h(()=>[a(l,{reset:"",onResetSettings:e})]),_:1})]),_:1}),a(P,{grow:""},{container:h(()=>[a(I,null,{card:h(()=>[a(l,{setting:"onSessionLoaded",onSettingsResult:t,copy:""}),a(l,{setting:"onChatInitiated",onSettingsResult:t,copy:""}),a(l,{setting:"onChatOpened",onSettingsResult:t,copy:""}),a(l,{setting:"onChatClosed",onSettingsResult:t,copy:""}),a(l,{setting:"onMessageSent",onSettingsResult:t,copy:""}),a(l,{setting:"onMessageReceived",onSettingsResult:t,copy:""}),a(l,{setting:"onNicknameChanged",onSettingsResult:t,copy:""}),a(l,{setting:"onEmailChanged",onSettingsResult:t,copy:""}),a(l,{setting:"onPhoneChanged",onSettingsResult:t,copy:""}),a(l,{setting:"onAvatarChanged",onSettingsResult:t,copy:""}),a(l,{setting:"onMessageComposeSent",onSettingsResult:t,copy:""}),a(l,{setting:"onMessageComposeReceived",onSettingsResult:t,copy:""}),a(l,{setting:"onWebsiteAvailabilityChanged",onSettingsResult:t,copy:""}),a(l,{setting:"onHelpdeskQueried",onSettingsResult:t,copy:""})]),_:1})]),_:1}),(c(),_(ne,{to:"body"},[a(ae,{name:"banner",mode:"out-in"},{default:h(()=>[v(r).visibility?(c(),_(oe,{key:0,onBannerClose:v(u),onBannerAction:m,message:v(r).message,action:v(r).action,animate:v(r).animate,type:v(r).type},null,8,["onBannerClose","message","action","animate","type"])):A("",!0)]),_:1})]))]))}};export{He as default};