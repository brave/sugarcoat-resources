{const a={};(e=>{"use strict";let t=!1;class n{constructor(){if(t)throw new TypeError("Illegal constructor")}get length(){return Object.keys(this).length}key(e){var t=Object.keys(this);return e<0||e>=t.length?null:t[e]}getItem(e){return Object.prototype.hasOwnProperty.call(this,e)?this[e]:null}setItem(e,t){this[e]=String(t)}removeItem(e){delete this[e]}clear(){for(const e of Object.keys(this))delete this[e]}}e.Storage={configurable:!0,enumerable:!0,value:n,writable:!0};const i=new n;e.localStorage={configurable:!0,enumerable:!0,get(){return i}};const r=new n;e.sessionStorage={configurable:!0,enumerable:!0,get(){return r}},t=!0})(a),Marketing.bindDependencyDOMParsed(function(){var e;window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId);var i=Marketing.UDO,t=!0,r="https://www.facebook.com/tr?id=641890776746393",n=function(e,t,n){e=r+"&ev="+e+"&cd[value]="+i.revenue+"&cd[currency]=USD&cd[content_ids]="+i.ordercode+"&cd[seg]="+i.segment+"&cd[family]="+i.family+"&cd[content_type]=product";1==t?n?Marketing.imageRequest(r+"&ev=PageView&dl=www.dell.com&noscript=1"):Marketing.imageRequest(e+"&dl=www.dell.com&noscript=1"):n?Marketing.imageRequest(r+"&ev=PageView&noscript=1"):Marketing.imageRequest(e+"&noscript=1")};window.location.href.includes("dell.com")&&(t=!0),window.location.href.includes("alienwarearena.com")&&(t=!1),/delltech|dellemc/i.test(Marketing.scDataObj.cms)||(n("PageView",e=t,!0),Marketing.scDataObj.module.includes("serviceselection")?n("Customize",e,!1):"7"===i.promoid&&n("ViewContent",e,!1),"8"===i.promoid&&n("Accessories",e,!1),"9"===i.promoid&&n("AddToCart",e,!1),"4"===i.promoid&&n("Deals",e,!1)),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}},3609568,[3606329],670670,[610323]),Marketing.bindDependencyDOMParsed(function(){var e={}.constructor.getOwnPropertyDescriptor(window,"sessionStorage");try{return e&&{}.constructor.defineProperty(window,"sessionStorage",a.sessionStorage),function(){window.Marketing,Marketing.ensightenOptions;try{Marketing.UDO.perfTimingStart("ruleId-"+this.id+"-deploymentId-"+this.deploymentId);var e="https://www.facebook.com/tr?id=641890776746393&ev=",t="&dl=www.delltechnologies.com&noscript=1";Marketing.imageRequest(e+"PageView"+t),Marketing.UDO.hve_mpv(e+"TotalHVEs"+t),Marketing.UDO.hve_mpv(e+"HVEMultiPageView"+t),Marketing.UDO.hve_download(e+"TotalHVEs"+t),Marketing.UDO.hve_download(e+"HVEAssetDownloads"+t),Marketing.UDO.hve_bcove(e+"TotalHVEs"+t),Marketing.UDO.hve_bcove(e+"VideoStart"+t),Marketing.UDO.hve_rfq_submit(e+"TotalHVEs"+t),Marketing.UDO.hve_chat(e+"TotalHVEs"+t),Marketing.UDO.hve_contactUs(e+"TotalHVEs"+t),Marketing.UDO.hve_social(e+"TotalHVEs"+t),Marketing.UDO.perfTimingEnd("ruleId-"+this.id+"-deploymentId-"+this.deploymentId)}catch(e){dell_marketing_util.debug(e)}}.apply(this,arguments)}finally{e&&{}.constructor.defineProperty(window,"sessionStorage",e)}},3609567,[3606329],681492,[610323])}