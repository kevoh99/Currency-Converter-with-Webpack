(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),a=r(26),o=r(372),i=r(327),s=r(97),u=r(109),c=r(985),l=r(61);e.exports=function(e){return new Promise((function(t,r){var f=e.data,p=e.headers,d=e.responseType;n.isFormData(f)&&delete p["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",g=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";p.Authorization="Basic "+btoa(m+":"+g)}var v=s(e.baseURL,e.url);function y(){if(h){var n="getAllResponseHeaders"in h?u(h.getAllResponseHeaders()):null,o={data:d&&"text"!==d&&"json"!==d?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:n,config:e,request:h};a(t,r,o),h=null}}if(h.open(e.method.toUpperCase(),i(v,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,"onloadend"in h?h.onloadend=y:h.onreadystatechange=function(){h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))&&setTimeout(y)},h.onabort=function(){h&&(r(l("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){r(l("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var b=(e.withCredentials||c(v))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;b&&(p[e.xsrfHeaderName]=b)}"setRequestHeader"in h&&n.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),d&&"json"!==d&&(h.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),r(e),h=null)})),f||(f=null),h.send(f)}))}},609:(e,t,r)=>{"use strict";var n=r(867),a=r(849),o=r(321),i=r(185);function s(e){var t=new o(e),r=a(o.prototype.request,t);return n.extend(r,o.prototype,t),n.extend(r,t),r}var u=s(r(655));u.Axios=o,u.create=function(e){return s(i(u.defaults,e))},u.Cancel=r(263),u.CancelToken=r(972),u.isCancel=r(502),u.all=function(e){return Promise.all(e)},u.spread=r(713),u.isAxiosError=r(268),e.exports=u,e.exports.default=u},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function a(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var e;return{token:new a((function(t){e=t})),cancel:e}},e.exports=a},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),a=r(327),o=r(782),i=r(572),s=r(185),u=r(875),c=u.validators;function l(e){this.defaults=e,this.interceptors={request:new o,response:new o}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&u.assertOptions(t,{silentJSONParsing:c.transitional(c.boolean,"1.0.0"),forcedJSONParsing:c.transitional(c.boolean,"1.0.0"),clarifyTimeoutError:c.transitional(c.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var a,o=[];if(this.interceptors.response.forEach((function(e){o.push(e.fulfilled,e.rejected)})),!n){var l=[i,void 0];for(Array.prototype.unshift.apply(l,r),l=l.concat(o),a=Promise.resolve(e);l.length;)a=a.then(l.shift(),l.shift());return a}for(var f=e;r.length;){var p=r.shift(),d=r.shift();try{f=p(f)}catch(e){d(e);break}}try{a=i(f)}catch(e){return Promise.reject(e)}for(;o.length;)a=a.then(o.shift(),o.shift());return a},l.prototype.getUri=function(e){return e=s(this.defaults,e),a(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=l},782:(e,t,r)=>{"use strict";var n=r(867);function a(){this.handlers=[]}a.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},a.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},a.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=a},97:(e,t,r)=>{"use strict";var n=r(793),a=r(303);e.exports=function(e,t){return e&&!n(t)?a(e,t):t}},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,a,o){var i=new Error(e);return n(i,t,r,a,o)}},572:(e,t,r)=>{"use strict";var n=r(867),a=r(527),o=r(502),i=r(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=a.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return s(e),t.data=a.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(s(e),t&&t.response&&(t.response.data=a.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,a){return e.config=t,r&&(e.code=r),e.request=n,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={},a=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function u(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function c(a){n.isUndefined(t[a])?n.isUndefined(e[a])||(r[a]=u(void 0,e[a])):r[a]=u(e[a],t[a])}n.forEach(a,(function(e){n.isUndefined(t[e])||(r[e]=u(void 0,t[e]))})),n.forEach(o,c),n.forEach(i,(function(a){n.isUndefined(t[a])?n.isUndefined(e[a])||(r[a]=u(void 0,e[a])):r[a]=u(void 0,t[a])})),n.forEach(s,(function(n){n in t?r[n]=u(e[n],t[n]):n in e&&(r[n]=u(void 0,e[n]))}));var l=a.concat(o).concat(i).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(f,c),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var a=r.config.validateStatus;r.status&&a&&!a(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var n=r(867),a=r(655);e.exports=function(e,t,r){var o=this||a;return n.forEach(r,(function(r){e=r.call(o,e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),a=r(16),o=r(481),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,c={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(u=r(448)),u),transformRequest:[function(e,t){return a(t,"Accept"),a(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(s(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(0,JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,a=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||a&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw o(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function a(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(n.isURLSearchParams(t))o=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(a(t)+"="+a(e))})))})),o=i.join("&")}if(o){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,a,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(a)&&s.push("path="+a),n.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function a(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=a(window.location.href),function(t){var r=n.isString(t)?a(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,i={};return e?(n.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t){if(i[t]&&a.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,r)=>{"use strict";var n=r(593),a={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){a[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var o={},i=n.version.split(".");function s(e,t){for(var r=t?t.split("."):i,n=e.split("."),a=0;a<3;a++){if(r[a]>n[a])return!0;if(r[a]<n[a])return!1}return!1}a.transitional=function(e,t,r){var a=t&&s(t);function i(e,t){return"[Axios v"+n.version+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,s){if(!1===e)throw new Error(i(n," has been removed in "+t));return a&&!o[n]&&(o[n]=!0,console.warn(i(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,s)}},e.exports={isOlderVersion:s,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),a=n.length;a-- >0;){var o=n[a],i=t[o];if(i){var s=e[o],u=void 0===s||i(s,o,e);if(!0!==u)throw new TypeError("option "+o+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+o)}},validators:a}},867:(e,t,r)=>{"use strict";var n=r(849),a=Object.prototype.toString;function o(e){return"[object Array]"===a.call(e)}function i(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function u(e){if("[object Object]"!==a.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function c(e){return"[object Function]"===a.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===a.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:u,isUndefined:i,isDate:function(e){return"[object Date]"===a.call(e)},isFile:function(e){return"[object File]"===a.call(e)},isBlob:function(e){return"[object Blob]"===a.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):o(r)?t[n]=r.slice():t[n]=r}for(var n=0,a=arguments.length;n<a;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,a){e[a]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},969:(e,t,r)=>{"use strict";function n(e,t,r,n,a,o,i){try{var s=e[o](i),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,u,"next",e)}function u(e){n(i,a,o,s,u,"throw",e)}s(void 0)}))}}r(666);var o=r(669),i=document.getElementById("cash_count"),s=document.getElementById("currency_at_hand"),u=document.getElementById("currency_desired"),c=document.getElementById("currency-input"),l=document.getElementById("results-in");c.addEventListener("click",(function(e){e.preventDefault(),l.style.backgroundColor="var(--main-bg-color)",l.style.color="var(--primary-color)",l.style.fontSize="1.2rem",l.style.padding="20px",l.innerText="Waiting...",f()}));var f=function(){var e=a(regeneratorRuntime.mark((function e(){var t,r,n,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l.style.marginTop="150px",document.getElementById("main").style.minHeight="60vh",e.prev=2,t=i.value,r=s.value,n=u.value,e.next=8,m(r,n,t);case 8:a=e.sent,console.log("Return value: "+a),l.innerText=a,e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),console.log("Results ni wewe!!!"),l.innerText=e.t0.message;case 17:p();case 18:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=document.createElement("div"),t=document.createElement("button");t.classList.add("convert-again-btn"),t.innerHTML='<a href="index.html">Convert Again</a>',e.appendChild(t),l.appendChild(e)},d=function(){var e=a(regeneratorRuntime.mark((function e(t,r){var n,a,i,s,u,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="USD".concat(t),a="USD".concat(r),e.next=5,o.get("http://api.currencylayer.com/live?access_key=af908b96fc9d56f13d11929909a54b1c");case 5:return i=e.sent,console.log(i),s=i.data.quotes[n],u=1/s,c=i.data.quotes[a],e.abrupt("return",u*c);case 13:throw e.prev=13,e.t0=e.catch(0),new Error("Unable to get currency data using ".concat(t," and ").concat(r,". Please try again.\n If the problem persists, please contact us"));case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,r){return e.apply(this,arguments)}}(),h=function(){var e=a(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.get("http://api.countrylayer.com/v2/currency/".concat(t,"?access_key=e2babe7843010bd817bf049122dcefa4"));case 3:return r=e.sent,n=r.data.map((function(e){return e.name})),e.abrupt("return",n);case 8:throw e.prev=8,e.t0=e.catch(0),new Error("Sorry. Our system was unable to find countries that use ".concat(t,"."));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=a(regeneratorRuntime.mark((function e(t,r,n){var a,o,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(t,r);case 2:return a=e.sent,e.next=5,h(r);case 5:return o=e.sent,i=(n*a).toFixed(2),e.abrupt("return","".concat(n," ").concat(g[t]," equals ").concat(i," ").concat(g[r],". You can use ").concat(g[r]," in: ").concat(o));case 8:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),g={AFN:"Afghan afghani",ALL:"Albanian lek",DZD:"Algerian dinar",AOA:"Angolan Kwanza",ARS:"Argentine Peso",AMD:"Armenian Dram",AWG:"Aruban Florin",AUD:"Australian Dollar",AZN:"Azerbaijanian Manat",BSD:"Bahamian Dollar",BHD:"Bahraini Dinar",BDT:"Bangladeshi taka",BBD:"Barbadian dollar",BYN:"Belarusian ruble",BZD:"Belize Dollar",BMD:"Bermudian Dollar",BTN:"Bhutanese ngultrum",BOB:"Bolivian boliviano",BAM:"Bosnia and Herzegovina convertible mark",BWP:"Botswana pula",BRL:"Brazilian Real",BND:"Brunei Dollar",BGN:"Bulgarian Lev",BIF:"Burundi Franc",CVE:"Cabo Verde Escudo",KHR:"Cambodian riel",CAD:"Canadian Dollar",KYD:"Cayman Islands Dollar",XAF:"Central African CFA franc",XPF:"CFP Franc",CLP:"Chilean Peso",CNY:"Chinese Yuan Renminbi",COP:"Colombian Peso",KMF:"Comorian Franc",CDF:"Congolese Franc",CRC:"Costa Rican Colon",HRK:"Croatian Kuna",CUP:"Cuban Peso",CZK:"Czech Koruna",DKK:"Danish Krone",DJF:"Djibouti Franc",DOP:"Dominican Peso",XCD:"East Caribbean Dollar",EGP:"Egyptian Pound",SVC:"El Salvador Colon",ERN:"Eritrean nakfa",ETB:"Ethiopian Birr",EUR:"European euro",FKP:"Falkland Islands Pound",FJD:"Fijian Dollar",GMD:"Gambian dalasi",GEL:"Georgian lari",GHS:"Ghanaian Cedi",GIP:"Gibraltar Pound",GTQ:"Guatemalan quetzal",GGP:"Guernsey Pound",GNF:"Guinean Franc",GYD:"Guyanese Dollar",HTG:"Haitian gourde",HNL:"Honduran lempira",HKD:"Hong Kong Dollar",HUF:"Hungarian forint",ISK:"Icelandic Krona",INR:"Indian Rupee",IDR:"Indonesian rupiah",IRR:"Iranian Rial",IQD:"Iraqi Dinar",ILS:"Israeli new shekel",JMD:"Jamaican Dollar",JPY:"Japanese yen",JEP:"Jersey pound",JOD:"Jordanian Dinar",KZT:"Kazakhstani tenge",KES:"Kenyan Shilling",KWD:"Kuwaiti Dinar",KGS:"Kyrgyzstani som",LAK:"Lao kip","Lebanese Pound":"Lebanese Pound",LSL:"Lesotho loti",LRD:"Liberian Dollar",LYD:"Libyan Dinar",LTL:"Lithuanian Litas",MOP:"Macanese pataca",MKD:"Macedonian denar",MGA:"Malagasy ariary",MWK:"Malawian kwacha",MYR:"Malaysian Ringgit",MVR:"Maldivian rufiyaa",MRO:"Mauritanian ouguiya",MUR:"Mauritian Rupee",MXN:"Mexican Peso",MDL:"Moldovan Leu",MNT:"Mongolian tugrik",MAD:"Moroccan Dirham",MZN:"Mozambican metical",MMK:"Myanmar kyat",NAD:"Namibian Dollar",NPR:"Nepalese Rupee",ANG:"Netherlands Antillean guilder",NZD:"New Zealand Dollar",NIO:"Nicaraguan cordoba",NGN:"Nigerian naira",KPW:"North Korean Won",NOK:"Norwegian Krone",OMR:"Omani rial",PKR:"Pakistan Rupee",PGK:"Papua New Guinean kina",PYG:"Paraguayan guarani",PEN:"Peruvian sol",PHP:"Philippine peso",PLN:"Polish zloty",GBP:"Pound sterling (GBP)",QAR:"Qatari Rial",RON:"Romanian Leu",RUB:"Russian ruble",RWF:"Rwandan franc",SHP:"Saint Helena Pound",WST:"Samoan tala",STD:"Sao Tome and Principe dobra",SAR:"Saudi Arabian riyal",RSD:"Serbian dinar",SCR:"Seychellois rupee",SLL:"Sierra Leonean leone",SGD:"Singapore Dollar",SBD:"Solomon Islands dollar",SOS:"Somali shilling",ZAR:"South African rand",KRW:"South Korean won",SSP:"South Sudanese pound",LKR:"Sri Lanka Rupee",SDG:"Sudanese pound",SRD:"Surinamese dollar",SZL:"Swazi lilangeni",SEK:"Swedish Krona",CHF:"Swiss Franc",SYP:"Syrian Pound",TWD:"New Taiwan dollar",TJS:"Tajikistani somoni",TZS:"Tanzanian Shilling",THB:"Thai baht",TOP:"Tongan pa’anga",TTD:"Trinidad and Tobago dollar",TND:"Tunisian Dinar",TRY:"Turkish lira",TMT:"Turkmen manat",AED:"UAE dirham",UGX:"Ugandan shilling",UAH:"Ukrainian hryvnia",USD:"United States dollar",UYU:"Uruguayan peso",UZS:"Uzbekistani som",VUV:"Vanuatu vatu",VEF:"Venezuelan bolivar",VND:"Vietnamese dong",XOF:"West African CFA franc",YER:"Yemeni rial",ZMW:"Zambian kwacha"}},666:e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,r){return e[t]=r}}function c(e,t,r,n){var a=t&&t.prototype instanceof g?t:g,o=Object.create(a.prototype),i=new N(n||[]);return o._invoke=function(e,t,r){var n=f;return function(a,o){if(n===d)throw new Error("Generator is already running");if(n===h){if("throw"===a)throw o;return A()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var s=D(i,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var u=l(e,t,r);if("normal"===u.type){if(n=r.done?h:p,u.arg===m)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=h,r.method="throw",r.arg=u.arg)}}}(e,r,i),o}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",m={};function g(){}function v(){}function y(){}var b={};u(b,o,(function(){return this}));var w=Object.getPrototypeOf,x=w&&w(w(k([])));x&&x!==r&&n.call(x,o)&&(b=x);var S=y.prototype=g.prototype=Object.create(b);function E(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function R(e,t){function r(a,o,i,s){var u=l(e[a],e,o);if("throw"!==u.type){var c=u.arg,f=c.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,i,s)}),(function(e){r("throw",e,i,s)})):t.resolve(f).then((function(e){c.value=e,i(c)}),(function(e){return r("throw",e,i,s)}))}s(u.arg)}var a;this._invoke=function(e,n){function o(){return new t((function(t,a){r(e,n,t,a)}))}return a=a?a.then(o,o):o()}}function D(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,D(e,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var a=l(n,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,m;var o=a.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function N(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function k(e){if(e){var r=e[o];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function r(){for(;++a<e.length;)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:A}}function A(){return{value:t,done:!0}}return v.prototype=y,u(S,"constructor",y),u(y,"constructor",v),v.displayName=u(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,u(e,s,"GeneratorFunction")),e.prototype=Object.create(S),e},e.awrap=function(e){return{__await:e}},E(R.prototype),u(R.prototype,i,(function(){return this})),e.AsyncIterator=R,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new R(c(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},E(S),u(S,s,"Generator"),u(S,o,(function(){return this})),u(S,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=k,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function a(n,a){return s.type="throw",s.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),L(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;L(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:k(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},593:e=>{"use strict";e.exports=JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(666),r(969)})();