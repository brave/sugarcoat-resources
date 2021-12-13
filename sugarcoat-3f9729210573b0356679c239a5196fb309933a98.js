{const a={};(e=>{"use strict";const t=Symbol("deferredHandle"),n=Symbol("onloadstart"),i=Symbol("onprogress"),r=Symbol("onabort"),a=Symbol("onerror"),o=Symbol("onload"),s=Symbol("ontimeout"),g=Symbol("onloadend"),l=Symbol("onreadystatechange"),d=Symbol("readyState"),u=Symbol("timeout"),c=Symbol("withCredentials"),p=Symbol("upload"),h=Symbol("responseType"),v=(e,n)=>{var t=n.description.substring(2);Object.defineProperty(e,n,{configurable:!1,enumerable:!1,value:null,writable:!0}),e.addEventListener(t,function(e){const t=this[n];t&&t.call(this,e)})},k=(e,t)=>{e[d]=t,e.dispatchEvent(new Event("readystatechange"))};let M=!0;class m extends EventTarget{constructor(){if(super(),!(this instanceof f||this instanceof y))throw new TypeError("Illegal constructor");v(this,n),v(this,i),v(this,r),v(this,a),v(this,o),v(this,s),v(this,g)}get onloadstart(){return this[n]}set onloadstart(e){this[n]=e}get onprogress(){return this[i]}set onprogress(e){this[i]=e}get onabort(){return this[r]}set onabort(e){this[r]=e}get onerror(){return this[a]}set onerror(e){this[a]=e}get ontimeout(){return this[s]}set ontimeout(e){this[s]=e}get onloadend(){return this[g]}set onloadend(e){this[g]=e}}e.XMLHttpRequestEventTarget={configurable:!0,enumerable:!0,value:m,writable:!0};class y extends m{constructor(){if(M)throw new TypeError("Illegal constructor");super()}}e.XMLHttpRequestUpload={configurable:!0,enumerable:!0,value:y,writable:!0};class f extends m{constructor(){super(),M=!1;var e=new y;M=!0,Object.defineProperty(this,t,{configurable:!1,enumerable:!1,value:null,writable:!0}),v(this,l),Object.defineProperty(this,d,{configurable:!1,enumerable:!1,value:0,writable:!0}),Object.defineProperty(this,u,{configurable:!1,enumerable:!1,value:0,writable:!0}),Object.defineProperty(this,c,{configurable:!1,enumerable:!1,value:!1,writable:!0}),Object.defineProperty(this,p,{configurable:!1,enumerable:!1,value:e,writable:!1}),Object.defineProperty(this,h,{configurable:!1,enumerable:!1,value:"",writable:!0})}get onreadystatechange(){return this[l]}set onreadystatechange(e){this[l]=e}get readyState(){return this[d]}open(e,t){switch(this[d]){case 0:case 4:k(this,1)}}setRequestHeader(e,t){}setTrustToken(e){}get timeout(){return this[u]}set timeout(e){this[u]=e}get withCredentials(){return this[c]}set withCredentials(e){switch(this[d]){case 0:case 1:break;default:throw new DOMException("Failed to set the 'withCredentials' property on 'XMLHttpRequest': The value may only be set if the object's state is UNSENT or OPENED.")}this[c]=!!e}get upload(){return this[p]}send(){if(1!==this[d]||null!==this[t])throw new DOMException("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");this[t]=setTimeout(()=>{this[t]=null,k(this,4),this.dispatchEvent(new ProgressEvent("error")),this.dispatchEvent(new ProgressEvent("loadend"))},0)}abort(){1===this[d]&&null!==this[t]&&(clearTimeout(this[t]),this[t]=null,k(this,0),this.dispatchEvent(new ProgressEvent("abort")),this.dispatchEvent(new ProgressEvent("loadend")))}get responseURL(){return""}get status(){return 0}get statusText(){return""}getResponseHeader(e){return null}overrideMimeType(e){}get responseType(){return this[h]}set responseType(e){if(4===this[d])throw new DOMException("Failed to set the 'responseType' property on 'XMLHttpRequest': The response type cannot be set if the object's state is LOADING or DONE.");switch(e){case"":case"arraybuffer":case"blob":case"document":case"json":case"text":this[h]=e}}get response(){var e=this[h];return""===e||"text"===e?"":null}get responseText(){var e=this[h];if(""===e||"text"===e)return"";throw new DOMException("Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text' (was 'arraybuffer').")}get responseXML(){return null}}Object.defineProperty(f,"UNSENT",{configurable:!1,enumerable:!0,value:0}),Object.defineProperty(f,"OPENED",{configurable:!1,enumerable:!0,value:1}),Object.defineProperty(f,"HEADERS_RECEIVED",{configurable:!1,enumerable:!0,value:2}),Object.defineProperty(f,"LOADING",{configurable:!1,enumerable:!0,value:3}),Object.defineProperty(f,"DONE",{configurable:!1,enumerable:!0,value:4}),e.XMLHttpRequest={configurable:!0,enumerable:!0,value:f,writable:!0}})(a);const b={};(e=>{"use strict";let t=!1;class n{constructor(){if(t)throw new TypeError("Illegal constructor")}get length(){return Object.keys(this).length}key(e){var t=Object.keys(this);return e<0||e>=t.length?null:t[e]}getItem(e){return Object.prototype.hasOwnProperty.call(this,e)?this[e]:null}setItem(e,t){this[e]=String(t)}removeItem(e){delete this[e]}clear(){for(const e of Object.keys(this))delete this[e]}}e.Storage={configurable:!0,enumerable:!0,value:n,writable:!0};const i=new n;e.localStorage={configurable:!0,enumerable:!0,get(){return i}};const r=new n;e.sessionStorage={configurable:!0,enumerable:!0,get(){return r}},t=!0})(b),Marketing.bindDependencyImmediate(function(){window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId),"true"==dell_marketing_util.getParameterByName("mdebug",location.search)&&(dell_marketing_util.getDpid=function(){return(new Date).getTime()},Marketing.gEvent("DC-9632645/sales0/csb_test+transactions","purchase"),document.querySelectorAll("iframe").forEach(function(e){e.src.includes("type=sales")&&e.contentWindow.postMessage(JSON.stringify(Marketing),"*")})),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}},3600311,[3617682],636142,[619404]),Marketing.bindDependencyDOMParsed(function(){var n,e,i,t,r;window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId),n=window,e=document,n[i="uetq"]=n[i]||[],t=function(){var e={}.constructor.getOwnPropertyDescriptor(window,"XMLHttpRequest"),t={}.constructor.getOwnPropertyDescriptor(window,"localStorage");try{return e&&{}.constructor.defineProperty(window,"XMLHttpRequest",a.XMLHttpRequest),t&&{}.constructor.defineProperty(window,"localStorage",b.localStorage),function(){var e={ti:"5102261"};e.q=n[i],n[i]=new UET(e),n[i].push("pageLoad")}.apply(this,arguments)}finally{e&&{}.constructor.defineProperty(window,"XMLHttpRequest",e),t&&{}.constructor.defineProperty(window,"localStorage",t)}},(r=e.createElement("script")).src="//bat.bing.com/bat.js",r.async=1,r.onload=r.onreadystatechange=function(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(t(),r.onload=r.onreadystatechange=null)},(e=e.getElementsByTagName("script")[0]).parentNode.insertBefore(r,e),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}},3605242,[3606329],695874,[610323]),Marketing.bindDependencyDOMParsed(function(){var e;window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId),Marketing.UDO.priorconsent&&("us"===(e=Marketing.scDataObj.country)&&Marketing.insertScript("//vt.myvisualiq.net/2/TxUQNHSKvGWIiMj1Oh3tfw%3D%3D/vt-288.js"),"ca"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/TxUQNHSKvGWIiMj1Oh3tfw%3D%3D/vt-289.js"),"br"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/wQQtTiizl4SixrhITyTqbg%3D%3D/vt-286.js"),"uk"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/ami7eWD7Ma9qku9HDG232w%3D%3D/vt-213.js"),"jp"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/6%2BxT%2BO3z1zh14yulJBDN6g%3D%3D/vt-287.js"),"au"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/ipeeyHht4npQEiziCWaYzw%3D%3D/vt-299.js"),"nz"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/ipeeyHht4npQEiziCWaYzw%3D%3D/vt-301.js"),"in"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/uBF%2BndJT7n0r9WysNI1Vww%3D%3D/vt-298.js"),"fr"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/GXOdN%2BWugY3N3n4a5LAkNQ%3D%3D/vt-300.js"),"de"===e&&Marketing.insertScript("//vt.myvisualiq.net/2/v9BJOGcgl4wfjn7pXBhunA%3D%3D/vt-302.js")),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}},3593365,[3506924,3606329],621919,[610310,610323]),Marketing.bindDOMParsed(function(){window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId),Marketing.UDO.priorconsent&&Marketing.imageRequest("https://px.ads.linkedin.com/collect/?pid=7513&fmt=gif"),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}},3593287,619089),Marketing.bindDependencyImmediate(function(){var i,r,e;window.Marketing,Marketing.ensightenOptions;Marketing.UDO.fl_loaded=!1,Marketing.UDO.priorconsent&&(Marketing.loadScriptCallback("https://www.googletagmanager.com/gtag/js?id=DC-9632645",function(){dell_marketing_util.custom_marketing_event("fl_loaded"),Marketing.UDO.fl_loaded=!0}),window.dataLayer=window.dataLayer||[],window.gtag=function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config","DC-9632645"),gtag("config","DC-9632921"),gtag("config","DC-9632648"),i=function(){return{allow_custom_scripts:!0,u1:Marketing.UDO.language,u10:Marketing.UDO.cseg,u11:Marketing.UDO.deals,u12:Marketing.UDO.device,u13:Marketing.UDO.discount,u14:Marketing.UDO.family,u15:Marketing.UDO.ogid,u16:Marketing.UDO.ordercode,u17:Marketing.UDO.platform,u18:Marketing.UDO.prodcat,u19:Marketing.UDO.product,u2:Marketing.UDO.segment,u20:Marketing.UDO.promoid,u21:Marketing.UDO.type,u22:dell_marketing_util.getParameterByName("dgc",location.toString().toLowerCase()),u23:Marketing.UDO.gacd,u24:dell_marketing_util.getParameterByName("lid",location.toString().toLowerCase()),u25:Marketing.UDO.ven1,u26:Marketing.UDO.ven2,u28:dell_marketing_util.getParameterByName("tfcid",location.toString().toLowerCase()),u29:Marketing.UDO.revenue,u3:Marketing.UDO.currency,u30:Marketing.UDO.usdrev,u35:Marketing.UDO.dpid,u36:Marketing.UDO.land,u37:Marketing.UDO.serialprodlist,u38:Marketing.UDO.cjevent,u4:Marketing.UDO.country,u5:Marketing.UDO.accountid,u6:Marketing.UDO.category,u7:Marketing.UDO.categorypath,u8:Marketing.UDO.cid,u9:Marketing.UDO.coupon}},Marketing.UDO.readData(),(r=i()).u31="",(e=dell_marketing_util.getCookie("AMCV_4DD80861515CAB990A490D45%40AdobeOrg"))&&(r.u31=e.split("MCMID|")[1].split("|")[0]),Marketing.gEvent=Marketing.gEvent||function(t,n){var e;window.addEventListener("fl_loaded",function(){var e=r;"purchase"===n&&(e.value=Marketing.UDO.usdrev||Marketing.UDO.revenue,e.transaction_id=dell_marketing_util.getDpid()),e.send_to=t,gtag("event",n,e)}),Marketing.UDO.fl_loaded&&(e=r=i(),"purchase"===n&&(e.value=Marketing.UDO.usdrev||Marketing.UDO.revenue,e.transaction_id=dell_marketing_util.getDpid()),e.send_to=t,gtag("event",n,e))})},3617682,[3606329],619404,[610323]),Marketing.bindDependencyImmediate(function(){window.Marketing,Marketing.ensightenOptions;Marketing.UDO.g_download=function(t,n){window.addEventListener("hve",function(e){Marketing.UDO.hveoverlay=!1,"download"===e.detail.type&&Marketing.gEvent(t,n)}),Marketing.UDO.hveoverlay&&Marketing.gEvent(t,n)},Marketing.UDO.g_share=function(t,n){window.addEventListener("hve",function(e){"share"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_mpv=function(e,t){3==sessionStorage.enspagecountFLT&&Marketing.gEvent(e,t)},Marketing.UDO.g_bc_start=function(n,i){if("undefined"!=typeof videojs&&videojs.players)for(var e in videojs.players)videojs.players[e].ready(function(){var e=this;e.el_.hasAttribute("muted")||e.on("start",function(){e.video_start||(e.video_50_percent=!1,e.video_80_percent=!1,Marketing.gEvent(n,i))})});else window.addEventListener("hve",function e(t){"brightcove"===t.detail.type&&(Marketing.UDO.g_bc_start(n,i),window.removeEventListener("hve",e))})},Marketing.UDO.g_bc_50=function(t,n){window.addEventListener("brightcove50",function(e){Marketing.gEvent(t,n)})},Marketing.UDO.g_bc_80=function(t,n){window.addEventListener("brightcove80",function(e){Marketing.gEvent(t,n)})},Marketing.UDO.g_bc_end=function(n,i){if("undefined"!=typeof videojs&&videojs.players)for(var e in videojs.players)videojs.players[e].ready(function(){var e=this;e.el_.hasAttribute("muted")||e.on("ended",function(){Marketing.gEvent(n,i),e.video_start=!1})});else window.addEventListener("hve",function e(t){"brightcove"===t.detail.type&&(Marketing.UDO.g_bc_end(n,i),window.removeEventListener("hve",e))})},Marketing.UDO.g_contactus=function(t,n){window.addEventListener("hve",function(e){"contactus"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_chat=function(t,n){window.addEventListener("hve",function(e){"chat"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_addtocart=function(e,t){"contents"!==dell_marketing_util.getscMap("wacontroller")&&"cart"!==dell_marketing_util.getscMap("workflowstep")||Marketing.gEvent(e,t)},Marketing.UDO.g_checkout=function(e,t){"confirmation"===dell_marketing_util.getscMap("wacontroller")&&Marketing.gEvent(e,t)},Marketing.UDO.g_podcast_listen=function(t,n){window.addEventListener("hve",function(e){"podcast_listen"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_podcast_subscribe=function(t,n){window.addEventListener("hve",function(e){"podcast_subscribe"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_rfq_submit=function(t,n){window.addEventListener("hve",function(e){"rfq_submit"===e.detail.type&&Marketing.gEvent(t,n)})},Marketing.UDO.g_ion_submit=function(e,t){/liveball.*completed/gi.test(dell_marketing_util.getscMap("pagename"))&&Marketing.gEvent(e,t)},Marketing.UDO.g_gated_submit=function(t,n){window.addEventListener("hve",function(e){"gated_submit"===e.detail.type&&Marketing.gEvent(t,n)})}},3475193,[3617682],620818,[619404])}