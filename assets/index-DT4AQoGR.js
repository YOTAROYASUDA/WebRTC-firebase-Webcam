(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const ku=()=>{};var jo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Nu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],u=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ya={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,g=o>>2,E=(o&3)<<4|u>>4;let w=(u&15)<<2|f>>6,S=f&63;h||(S=64,a||(w=64)),r.push(e[g],e[E],e[w],e[S])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Xa(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Nu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],u=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const E=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||E==null)throw new xu;const w=o<<2|u>>4;if(r.push(w),f!==64){const S=u<<4&240|f>>2;if(r.push(S),E!==64){const V=f<<6&192|E;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class xu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ou=function(n){const t=Xa(n);return Ya.encodeByteArray(t,!0)},mr=function(n){return Ou(n).replace(/\./g,"")},Mu=function(n){try{return Ya.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=()=>Lu().__FIREBASE_DEFAULTS__,Bu=()=>{if(typeof process>"u"||typeof jo>"u")return;const n=jo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Uu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Mu(n[1]);return t&&JSON.parse(t)},ni=()=>{try{return ku()||Fu()||Bu()||Uu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ju=n=>{var t,e;return(e=(t=ni())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},zu=n=>{const t=ju(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ja=()=>{var n;return(n=ni())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(n){return n.endsWith(".cloudworkstations.dev")}async function qu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[mr(JSON.stringify(e)),mr(JSON.stringify(a)),""].join(".")}const yn={};function Gu(){const n={prod:[],emulator:[]};for(const t of Object.keys(yn))yn[t]?n.emulator.push(t):n.prod.push(t);return n}function Ku(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let zo=!1;function Qu(n,t){if(typeof window>"u"||typeof document>"u"||!ri(window.location.host)||yn[n]===t||yn[n]||zo)return;yn[n]=t;function e(w){return`__firebase__banner__${w}`}const r="__firebase__banner",o=Gu().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function u(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,S){w.setAttribute("width","24"),w.setAttribute("id",S),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function f(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{zo=!0,a()},w}function g(w,S){w.setAttribute("id",S),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function E(){const w=Ku(r),S=e("text"),V=document.getElementById(S)||document.createElement("span"),N=e("learnmore"),D=document.getElementById(N)||document.createElement("a"),H=e("preprendIcon"),U=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const G=w.element;u(G),g(D,N);const rt=f();h(U,H),G.append(U,V,D,rt),document.body.appendChild(G)}o?(V.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,V.innerText="Preview backend running in this workspace."),V.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",E):E()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wu(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xu(){var n;const t=(n=ni())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yu(){return!Xu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ju(){try{return typeof indexedDB=="object"}catch{return!1}}function Zu(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="FirebaseError";class qe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=th,Object.setPrototypeOf(this,qe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Za.prototype.create)}}class Za{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?eh(o,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new qe(s,u,r)}}function eh(n,t){return n.replace(nh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const nh=/\{\$([^}]+)}/g;function pr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if($o(o)&&$o(a)){if(!pr(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function $o(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n){return n&&n._delegate?n._delegate:n}class An{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new $u;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t?.identifier),s=(e=t?.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(ih(t))try{this.getOrInitializeService({instanceIdentifier:me})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=me){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=me){return this.instances.has(t)}getOptions(t=me){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(s)}return s}onInit(t,e){var r;const s=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&t(a,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:sh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=me){return this.component?this.component.multipleInstances?t:me:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sh(n){return n===me?void 0:n}function ih(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new rh(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const ah={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},ch=q.INFO,lh={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},uh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=lh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class tc{constructor(t){this.name=t,this._logLevel=ch,this._logHandler=uh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ah[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...t),this._logHandler(this,q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...t),this._logHandler(this,q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,q.INFO,...t),this._logHandler(this,q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,q.WARN,...t),this._logHandler(this,q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...t),this._logHandler(this,q.ERROR,...t)}}const hh=(n,t)=>t.some(e=>n instanceof e);let qo,Ho;function dh(){return qo||(qo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fh(){return Ho||(Ho=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ec=new WeakMap,xs=new WeakMap,nc=new WeakMap,Rs=new WeakMap,si=new WeakMap;function mh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Zt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ec.set(e,n)}).catch(()=>{}),si.set(t,n),t}function ph(n){if(xs.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});xs.set(n,t)}let Os={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return xs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||nc.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Zt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function gh(n){Os=n(Os)}function _h(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Cs(this),t,...e);return nc.set(r,t.sort?t.sort():[t]),Zt(r)}:fh().includes(n)?function(...t){return n.apply(Cs(this),t),Zt(ec.get(this))}:function(...t){return Zt(n.apply(Cs(this),t))}}function yh(n){return typeof n=="function"?_h(n):(n instanceof IDBTransaction&&ph(n),hh(n,dh())?new Proxy(n,Os):n)}function Zt(n){if(n instanceof IDBRequest)return mh(n);if(Rs.has(n))return Rs.get(n);const t=yh(n);return t!==n&&(Rs.set(n,t),si.set(t,n)),t}const Cs=n=>si.get(n);function Eh(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),u=Zt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Zt(a.result),h.oldVersion,h.newVersion,Zt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const vh=["get","getKey","getAll","getAllKeys","count"],Th=["put","add","delete","clear"],Ss=new Map;function Go(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Ss.get(t))return Ss.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Th.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||vh.includes(e)))return;const o=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[e](...u),s&&h.done]))[0]};return Ss.set(t,o),o}gh(n=>({...n,get:(t,e,r)=>Go(t,e)||n.get(t,e,r),has:(t,e)=>!!Go(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(wh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function wh(n){const t=n.getComponent();return t?.type==="VERSION"}const Ms="@firebase/app",Ko="0.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new tc("@firebase/app"),Ah="@firebase/app-compat",Rh="@firebase/analytics-compat",Ch="@firebase/analytics",Sh="@firebase/app-check-compat",bh="@firebase/app-check",Ph="@firebase/auth",Vh="@firebase/auth-compat",Dh="@firebase/database",kh="@firebase/data-connect",Nh="@firebase/database-compat",xh="@firebase/functions",Oh="@firebase/functions-compat",Mh="@firebase/installations",Lh="@firebase/installations-compat",Fh="@firebase/messaging",Bh="@firebase/messaging-compat",Uh="@firebase/performance",jh="@firebase/performance-compat",zh="@firebase/remote-config",$h="@firebase/remote-config-compat",qh="@firebase/storage",Hh="@firebase/storage-compat",Gh="@firebase/firestore",Kh="@firebase/ai",Qh="@firebase/firestore-compat",Wh="firebase",Xh="11.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="[DEFAULT]",Yh={[Ms]:"fire-core",[Ah]:"fire-core-compat",[Ch]:"fire-analytics",[Rh]:"fire-analytics-compat",[bh]:"fire-app-check",[Sh]:"fire-app-check-compat",[Ph]:"fire-auth",[Vh]:"fire-auth-compat",[Dh]:"fire-rtdb",[kh]:"fire-data-connect",[Nh]:"fire-rtdb-compat",[xh]:"fire-fn",[Oh]:"fire-fn-compat",[Mh]:"fire-iid",[Lh]:"fire-iid-compat",[Fh]:"fire-fcm",[Bh]:"fire-fcm-compat",[Uh]:"fire-perf",[jh]:"fire-perf-compat",[zh]:"fire-rc",[$h]:"fire-rc-compat",[qh]:"fire-gcs",[Hh]:"fire-gcs-compat",[Gh]:"fire-fst",[Qh]:"fire-fst-compat",[Kh]:"fire-vertex","fire-js":"fire-js",[Wh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=new Map,Jh=new Map,Fs=new Map;function Qo(n,t){try{n.container.addComponent(t)}catch(e){qt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function _r(n){const t=n.name;if(Fs.has(t))return qt.debug(`There were multiple attempts to register component ${t}.`),!1;Fs.set(t,n);for(const e of gr.values())Qo(e,n);for(const e of Jh.values())Qo(e,n);return!0}function Zh(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function td(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},te=new Za("app","Firebase",ed);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new An("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw te.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=Xh;function rc(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Ls,automaticDataCollectionEnabled:!0},t),s=r.name;if(typeof s!="string"||!s)throw te.create("bad-app-name",{appName:String(s)});if(e||(e=Ja()),!e)throw te.create("no-options");const o=gr.get(s);if(o){if(pr(e,o.options)&&pr(r,o.config))return o;throw te.create("duplicate-app",{appName:s})}const a=new oh(s);for(const h of Fs.values())a.addComponent(h);const u=new nd(e,r,a);return gr.set(s,u),u}function sd(n=Ls){const t=gr.get(n);if(!t&&n===Ls&&Ja())return rc();if(!t)throw te.create("no-app",{appName:n});return t}function ke(n,t,e){var r;let s=(r=Yh[n])!==null&&r!==void 0?r:n;e&&(s+=`-${e}`);const o=s.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const u=[`Unable to register library "${s}" with version "${t}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),qt.warn(u.join(" "));return}_r(new An(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="firebase-heartbeat-database",od=1,Rn="firebase-heartbeat-store";let bs=null;function sc(){return bs||(bs=Eh(id,od,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Rn)}catch(e){console.warn(e)}}}}).catch(n=>{throw te.create("idb-open",{originalErrorMessage:n.message})})),bs}async function ad(n){try{const e=(await sc()).transaction(Rn),r=await e.objectStore(Rn).get(ic(n));return await e.done,r}catch(t){if(t instanceof qe)qt.warn(t.message);else{const e=te.create("idb-get",{originalErrorMessage:t?.message});qt.warn(e.message)}}}async function Wo(n,t){try{const r=(await sc()).transaction(Rn,"readwrite");await r.objectStore(Rn).put(t,ic(n)),await r.done}catch(e){if(e instanceof qe)qt.warn(e.message);else{const r=te.create("idb-set",{originalErrorMessage:e?.message});qt.warn(r.message)}}}function ic(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd=1024,ld=30;class ud{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new dd(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Xo();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>ld){const a=fd(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){qt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Xo(),{heartbeatsToSend:r,unsentEntries:s}=hd(this._heartbeatsCache.heartbeats),o=mr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return qt.warn(e),""}}}function Xo(){return new Date().toISOString().substring(0,10)}function hd(n,t=cd){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Yo(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Yo(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class dd{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ju()?Zu().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await ad(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wo(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Yo(n){return mr(JSON.stringify({version:2,heartbeats:n})).length}function fd(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(n){_r(new An("platform-logger",t=>new Ih(t),"PRIVATE")),_r(new An("heartbeat",t=>new ud(t),"PRIVATE")),ke(Ms,Ko,n),ke(Ms,Ko,"esm2017"),ke("fire-js","")}md("");var pd="firebase",gd="11.9.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(pd,gd,"app");var Jo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ee,oc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,m){function _(){}_.prototype=m.prototype,T.D=m.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(y,v,A){for(var p=Array(arguments.length-2),Bt=2;Bt<arguments.length;Bt++)p[Bt-2]=arguments[Bt];return m.prototype[v].apply(y,p)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,m,_){_||(_=0);var y=Array(16);if(typeof m=="string")for(var v=0;16>v;++v)y[v]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(v=0;16>v;++v)y[v]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=T.g[0],_=T.g[1],v=T.g[2];var A=T.g[3],p=m+(A^_&(v^A))+y[0]+3614090360&4294967295;m=_+(p<<7&4294967295|p>>>25),p=A+(v^m&(_^v))+y[1]+3905402710&4294967295,A=m+(p<<12&4294967295|p>>>20),p=v+(_^A&(m^_))+y[2]+606105819&4294967295,v=A+(p<<17&4294967295|p>>>15),p=_+(m^v&(A^m))+y[3]+3250441966&4294967295,_=v+(p<<22&4294967295|p>>>10),p=m+(A^_&(v^A))+y[4]+4118548399&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(v^m&(_^v))+y[5]+1200080426&4294967295,A=m+(p<<12&4294967295|p>>>20),p=v+(_^A&(m^_))+y[6]+2821735955&4294967295,v=A+(p<<17&4294967295|p>>>15),p=_+(m^v&(A^m))+y[7]+4249261313&4294967295,_=v+(p<<22&4294967295|p>>>10),p=m+(A^_&(v^A))+y[8]+1770035416&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(v^m&(_^v))+y[9]+2336552879&4294967295,A=m+(p<<12&4294967295|p>>>20),p=v+(_^A&(m^_))+y[10]+4294925233&4294967295,v=A+(p<<17&4294967295|p>>>15),p=_+(m^v&(A^m))+y[11]+2304563134&4294967295,_=v+(p<<22&4294967295|p>>>10),p=m+(A^_&(v^A))+y[12]+1804603682&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(v^m&(_^v))+y[13]+4254626195&4294967295,A=m+(p<<12&4294967295|p>>>20),p=v+(_^A&(m^_))+y[14]+2792965006&4294967295,v=A+(p<<17&4294967295|p>>>15),p=_+(m^v&(A^m))+y[15]+1236535329&4294967295,_=v+(p<<22&4294967295|p>>>10),p=m+(v^A&(_^v))+y[1]+4129170786&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^v&(m^_))+y[6]+3225465664&4294967295,A=m+(p<<9&4294967295|p>>>23),p=v+(m^_&(A^m))+y[11]+643717713&4294967295,v=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(v^A))+y[0]+3921069994&4294967295,_=v+(p<<20&4294967295|p>>>12),p=m+(v^A&(_^v))+y[5]+3593408605&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^v&(m^_))+y[10]+38016083&4294967295,A=m+(p<<9&4294967295|p>>>23),p=v+(m^_&(A^m))+y[15]+3634488961&4294967295,v=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(v^A))+y[4]+3889429448&4294967295,_=v+(p<<20&4294967295|p>>>12),p=m+(v^A&(_^v))+y[9]+568446438&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^v&(m^_))+y[14]+3275163606&4294967295,A=m+(p<<9&4294967295|p>>>23),p=v+(m^_&(A^m))+y[3]+4107603335&4294967295,v=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(v^A))+y[8]+1163531501&4294967295,_=v+(p<<20&4294967295|p>>>12),p=m+(v^A&(_^v))+y[13]+2850285829&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^v&(m^_))+y[2]+4243563512&4294967295,A=m+(p<<9&4294967295|p>>>23),p=v+(m^_&(A^m))+y[7]+1735328473&4294967295,v=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(v^A))+y[12]+2368359562&4294967295,_=v+(p<<20&4294967295|p>>>12),p=m+(_^v^A)+y[5]+4294588738&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^v)+y[8]+2272392833&4294967295,A=m+(p<<11&4294967295|p>>>21),p=v+(A^m^_)+y[11]+1839030562&4294967295,v=A+(p<<16&4294967295|p>>>16),p=_+(v^A^m)+y[14]+4259657740&4294967295,_=v+(p<<23&4294967295|p>>>9),p=m+(_^v^A)+y[1]+2763975236&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^v)+y[4]+1272893353&4294967295,A=m+(p<<11&4294967295|p>>>21),p=v+(A^m^_)+y[7]+4139469664&4294967295,v=A+(p<<16&4294967295|p>>>16),p=_+(v^A^m)+y[10]+3200236656&4294967295,_=v+(p<<23&4294967295|p>>>9),p=m+(_^v^A)+y[13]+681279174&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^v)+y[0]+3936430074&4294967295,A=m+(p<<11&4294967295|p>>>21),p=v+(A^m^_)+y[3]+3572445317&4294967295,v=A+(p<<16&4294967295|p>>>16),p=_+(v^A^m)+y[6]+76029189&4294967295,_=v+(p<<23&4294967295|p>>>9),p=m+(_^v^A)+y[9]+3654602809&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^v)+y[12]+3873151461&4294967295,A=m+(p<<11&4294967295|p>>>21),p=v+(A^m^_)+y[15]+530742520&4294967295,v=A+(p<<16&4294967295|p>>>16),p=_+(v^A^m)+y[2]+3299628645&4294967295,_=v+(p<<23&4294967295|p>>>9),p=m+(v^(_|~A))+y[0]+4096336452&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~v))+y[7]+1126891415&4294967295,A=m+(p<<10&4294967295|p>>>22),p=v+(m^(A|~_))+y[14]+2878612391&4294967295,v=A+(p<<15&4294967295|p>>>17),p=_+(A^(v|~m))+y[5]+4237533241&4294967295,_=v+(p<<21&4294967295|p>>>11),p=m+(v^(_|~A))+y[12]+1700485571&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~v))+y[3]+2399980690&4294967295,A=m+(p<<10&4294967295|p>>>22),p=v+(m^(A|~_))+y[10]+4293915773&4294967295,v=A+(p<<15&4294967295|p>>>17),p=_+(A^(v|~m))+y[1]+2240044497&4294967295,_=v+(p<<21&4294967295|p>>>11),p=m+(v^(_|~A))+y[8]+1873313359&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~v))+y[15]+4264355552&4294967295,A=m+(p<<10&4294967295|p>>>22),p=v+(m^(A|~_))+y[6]+2734768916&4294967295,v=A+(p<<15&4294967295|p>>>17),p=_+(A^(v|~m))+y[13]+1309151649&4294967295,_=v+(p<<21&4294967295|p>>>11),p=m+(v^(_|~A))+y[4]+4149444226&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~v))+y[11]+3174756917&4294967295,A=m+(p<<10&4294967295|p>>>22),p=v+(m^(A|~_))+y[2]+718787259&4294967295,v=A+(p<<15&4294967295|p>>>17),p=_+(A^(v|~m))+y[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,T.g[2]=T.g[2]+v&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.u=function(T,m){m===void 0&&(m=T.length);for(var _=m-this.blockSize,y=this.B,v=this.h,A=0;A<m;){if(v==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(y[v++]=T.charCodeAt(A++),v==this.blockSize){s(this,y),v=0;break}}else for(;A<m;)if(y[v++]=T[A++],v==this.blockSize){s(this,y),v=0;break}}this.h=v,this.o+=m},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;var _=8*this.o;for(m=T.length-8;m<T.length;++m)T[m]=_&255,_/=256;for(this.u(T),T=Array(16),m=_=0;4>m;++m)for(var y=0;32>y;y+=8)T[_++]=this.g[m]>>>y&255;return T};function o(T,m){var _=u;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=m(T)}function a(T,m){this.h=m;for(var _=[],y=!0,v=T.length-1;0<=v;v--){var A=T[v]|0;y&&A==m||(_[v]=A,y=!1)}this.g=_}var u={};function h(T){return-128<=T&&128>T?o(T,function(m){return new a([m|0],0>m?-1:0)}):new a([T|0],0>T?-1:0)}function f(T){if(isNaN(T)||!isFinite(T))return E;if(0>T)return D(f(-T));for(var m=[],_=1,y=0;T>=_;y++)m[y]=T/_|0,_*=4294967296;return new a(m,0)}function g(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return D(g(T.substring(1),m));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(m,8)),y=E,v=0;v<T.length;v+=8){var A=Math.min(8,T.length-v),p=parseInt(T.substring(v,v+A),m);8>A?(A=f(Math.pow(m,A)),y=y.j(A).add(f(p))):(y=y.j(_),y=y.add(f(p)))}return y}var E=h(0),w=h(1),S=h(16777216);n=a.prototype,n.m=function(){if(N(this))return-D(this).m();for(var T=0,m=1,_=0;_<this.g.length;_++){var y=this.i(_);T+=(0<=y?y:4294967296+y)*m,m*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(V(this))return"0";if(N(this))return"-"+D(this).toString(T);for(var m=f(Math.pow(T,6)),_=this,y="";;){var v=rt(_,m).g;_=H(_,v.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=v,V(_))return A+y;for(;6>A.length;)A="0"+A;y=A+y}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function V(T){if(T.h!=0)return!1;for(var m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function N(T){return T.h==-1}n.l=function(T){return T=H(this,T),N(T)?-1:V(T)?0:1};function D(T){for(var m=T.g.length,_=[],y=0;y<m;y++)_[y]=~T.g[y];return new a(_,~T.h).add(w)}n.abs=function(){return N(this)?D(this):this},n.add=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0,v=0;v<=m;v++){var A=y+(this.i(v)&65535)+(T.i(v)&65535),p=(A>>>16)+(this.i(v)>>>16)+(T.i(v)>>>16);y=p>>>16,A&=65535,p&=65535,_[v]=p<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function H(T,m){return T.add(D(m))}n.j=function(T){if(V(this)||V(T))return E;if(N(this))return N(T)?D(this).j(D(T)):D(D(this).j(T));if(N(T))return D(this.j(D(T)));if(0>this.l(S)&&0>T.l(S))return f(this.m()*T.m());for(var m=this.g.length+T.g.length,_=[],y=0;y<2*m;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<T.g.length;v++){var A=this.i(y)>>>16,p=this.i(y)&65535,Bt=T.i(v)>>>16,Xe=T.i(v)&65535;_[2*y+2*v]+=p*Xe,U(_,2*y+2*v),_[2*y+2*v+1]+=A*Xe,U(_,2*y+2*v+1),_[2*y+2*v+1]+=p*Bt,U(_,2*y+2*v+1),_[2*y+2*v+2]+=A*Bt,U(_,2*y+2*v+2)}for(y=0;y<m;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=m;y<2*m;y++)_[y]=0;return new a(_,0)};function U(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function G(T,m){this.g=T,this.h=m}function rt(T,m){if(V(m))throw Error("division by zero");if(V(T))return new G(E,E);if(N(T))return m=rt(D(T),m),new G(D(m.g),D(m.h));if(N(m))return m=rt(T,D(m)),new G(D(m.g),m.h);if(30<T.g.length){if(N(T)||N(m))throw Error("slowDivide_ only works with positive integers.");for(var _=w,y=m;0>=y.l(T);)_=Ft(_),y=Ft(y);var v=lt(_,1),A=lt(y,1);for(y=lt(y,2),_=lt(_,2);!V(y);){var p=A.add(y);0>=p.l(T)&&(v=v.add(_),A=p),y=lt(y,1),_=lt(_,1)}return m=H(T,v.j(m)),new G(v,m)}for(v=E;0<=T.l(m);){for(_=Math.max(1,Math.floor(T.m()/m.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),A=f(_),p=A.j(m);N(p)||0<p.l(T);)_-=y,A=f(_),p=A.j(m);V(A)&&(A=w),v=v.add(A),T=H(T,p)}return new G(v,T)}n.A=function(T){return rt(this,T).h},n.and=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)&T.i(y);return new a(_,this.h&T.h)},n.or=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)|T.i(y);return new a(_,this.h|T.h)},n.xor=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)^T.i(y);return new a(_,this.h^T.h)};function Ft(T){for(var m=T.g.length+1,_=[],y=0;y<m;y++)_[y]=T.i(y)<<1|T.i(y-1)>>>31;return new a(_,T.h)}function lt(T,m){var _=m>>5;m%=32;for(var y=T.g.length-_,v=[],A=0;A<y;A++)v[A]=0<m?T.i(A+_)>>>m|T.i(A+_+1)<<32-m:T.i(A+_);return new a(v,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,oc=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=g,ee=a}).apply(typeof Jo<"u"?Jo:typeof self<"u"?self:typeof window<"u"?window:{});var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ac,mn,cc,ar,Bs,lc,uc,hc;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,c,l){return i==Array.prototype||i==Object.prototype||(i[c]=l.value),i};function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var c=0;c<i.length;++c){var l=i[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=e(this);function s(i,c){if(c)t:{var l=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var I=i[d];if(!(I in l))break t;l=l[I]}i=i[i.length-1],d=l[i],c=c(d),c!=d&&c!=null&&t(l,i,{configurable:!0,writable:!0,value:c})}}function o(i,c){i instanceof String&&(i+="");var l=0,d=!1,I={next:function(){if(!d&&l<i.length){var R=l++;return{value:c(R,i[R]),done:!1}}return d=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(i){return i||function(){return o(this,function(c,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function h(i){var c=typeof i;return c=c!="object"?c:i?Array.isArray(i)?"array":c:"null",c=="array"||c=="object"&&typeof i.length=="number"}function f(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function g(i,c,l){return i.call.apply(i.bind,arguments)}function E(i,c,l){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,d),i.apply(c,I)}}return function(){return i.apply(c,arguments)}}function w(i,c,l){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?g:E,w.apply(null,arguments)}function S(i,c){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function V(i,c){function l(){}l.prototype=c.prototype,i.aa=c.prototype,i.prototype=new l,i.prototype.constructor=i,i.Qb=function(d,I,R){for(var P=Array(arguments.length-2),W=2;W<arguments.length;W++)P[W-2]=arguments[W];return c.prototype[I].apply(d,P)}}function N(i){const c=i.length;if(0<c){const l=Array(c);for(let d=0;d<c;d++)l[d]=i[d];return l}return[]}function D(i,c){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const I=i.length||0,R=d.length||0;i.length=I+R;for(let P=0;P<R;P++)i[I+P]=d[P]}else i.push(d)}}class H{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function U(i){return/^[\s\xa0]*$/.test(i)}function G(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function rt(i){return rt[" "](i),i}rt[" "]=function(){};var Ft=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function lt(i,c,l){for(const d in i)c.call(l,i[d],d,i)}function T(i,c){for(const l in i)c.call(void 0,i[l],l,i)}function m(i){const c={};for(const l in i)c[l]=i[l];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,c){let l,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(l in d)i[l]=d[l];for(let R=0;R<_.length;R++)l=_[R],Object.prototype.hasOwnProperty.call(d,l)&&(i[l]=d[l])}}function v(i){var c=1;i=i.split(":");const l=[];for(;0<c&&i.length;)l.push(i.shift()),c--;return i.length&&l.push(i.join(":")),l}function A(i){u.setTimeout(()=>{throw i},0)}function p(){var i=es;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class Bt{constructor(){this.h=this.g=null}add(c,l){const d=Xe.get();d.set(c,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Xe=new H(()=>new Yl,i=>i.reset());class Yl{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Ye,Je=!1,es=new Bt,Ui=()=>{const i=u.Promise.resolve(void 0);Ye=()=>{i.then(Jl)}};var Jl=()=>{for(var i;i=p();){try{i.h.call(i.g)}catch(l){A(l)}var c=Xe;c.j(i),100>c.h&&(c.h++,i.next=c.g,c.g=i)}Je=!1};function Kt(){this.s=this.s,this.C=this.C}Kt.prototype.s=!1,Kt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Kt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function pt(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}pt.prototype.h=function(){this.defaultPrevented=!0};var Zl=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};u.addEventListener("test",l,c),u.removeEventListener("test",l,c)}catch{}return i}();function Ze(i,c){if(pt.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var l=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget){if(Ft){t:{try{rt(c.nodeName);var I=!0;break t}catch{}I=!1}I||(c=null)}}else l=="mouseover"?c=i.fromElement:l=="mouseout"&&(c=i.toElement);this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:tu[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Ze.aa.h.call(this)}}V(Ze,pt);var tu={2:"touch",3:"pen",4:"mouse"};Ze.prototype.h=function(){Ze.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Ln="closure_listenable_"+(1e6*Math.random()|0),eu=0;function nu(i,c,l,d,I){this.listener=i,this.proxy=null,this.src=c,this.type=l,this.capture=!!d,this.ha=I,this.key=++eu,this.da=this.fa=!1}function Fn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Bn(i){this.src=i,this.g={},this.h=0}Bn.prototype.add=function(i,c,l,d,I){var R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);var P=rs(i,c,d,I);return-1<P?(c=i[P],l||(c.fa=!1)):(c=new nu(c,this.src,R,!!d,I),c.fa=l,i.push(c)),c};function ns(i,c){var l=c.type;if(l in i.g){var d=i.g[l],I=Array.prototype.indexOf.call(d,c,void 0),R;(R=0<=I)&&Array.prototype.splice.call(d,I,1),R&&(Fn(c),i.g[l].length==0&&(delete i.g[l],i.h--))}}function rs(i,c,l,d){for(var I=0;I<i.length;++I){var R=i[I];if(!R.da&&R.listener==c&&R.capture==!!l&&R.ha==d)return I}return-1}var ss="closure_lm_"+(1e6*Math.random()|0),is={};function ji(i,c,l,d,I){if(Array.isArray(c)){for(var R=0;R<c.length;R++)ji(i,c[R],l,d,I);return null}return l=qi(l),i&&i[Ln]?i.K(c,l,f(d)?!!d.capture:!1,I):ru(i,c,l,!1,d,I)}function ru(i,c,l,d,I,R){if(!c)throw Error("Invalid event type");var P=f(I)?!!I.capture:!!I,W=as(i);if(W||(i[ss]=W=new Bn(i)),l=W.add(c,l,d,P,R),l.proxy)return l;if(d=su(),l.proxy=d,d.src=i,d.listener=l,i.addEventListener)Zl||(I=P),I===void 0&&(I=!1),i.addEventListener(c.toString(),d,I);else if(i.attachEvent)i.attachEvent($i(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function su(){function i(l){return c.call(i.src,i.listener,l)}const c=iu;return i}function zi(i,c,l,d,I){if(Array.isArray(c))for(var R=0;R<c.length;R++)zi(i,c[R],l,d,I);else d=f(d)?!!d.capture:!!d,l=qi(l),i&&i[Ln]?(i=i.i,c=String(c).toString(),c in i.g&&(R=i.g[c],l=rs(R,l,d,I),-1<l&&(Fn(R[l]),Array.prototype.splice.call(R,l,1),R.length==0&&(delete i.g[c],i.h--)))):i&&(i=as(i))&&(c=i.g[c.toString()],i=-1,c&&(i=rs(c,l,d,I)),(l=-1<i?c[i]:null)&&os(l))}function os(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[Ln])ns(c.i,i);else{var l=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(l,d,i.capture):c.detachEvent?c.detachEvent($i(l),d):c.addListener&&c.removeListener&&c.removeListener(d),(l=as(c))?(ns(l,i),l.h==0&&(l.src=null,c[ss]=null)):Fn(i)}}}function $i(i){return i in is?is[i]:is[i]="on"+i}function iu(i,c){if(i.da)i=!0;else{c=new Ze(c,this);var l=i.listener,d=i.ha||i.src;i.fa&&os(i),i=l.call(d,c)}return i}function as(i){return i=i[ss],i instanceof Bn?i:null}var cs="__closure_events_fn_"+(1e9*Math.random()>>>0);function qi(i){return typeof i=="function"?i:(i[cs]||(i[cs]=function(c){return i.handleEvent(c)}),i[cs])}function gt(){Kt.call(this),this.i=new Bn(this),this.M=this,this.F=null}V(gt,Kt),gt.prototype[Ln]=!0,gt.prototype.removeEventListener=function(i,c,l,d){zi(this,i,c,l,d)};function It(i,c){var l,d=i.F;if(d)for(l=[];d;d=d.F)l.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new pt(c,i);else if(c instanceof pt)c.target=c.target||i;else{var I=c;c=new pt(d,i),y(c,I)}if(I=!0,l)for(var R=l.length-1;0<=R;R--){var P=c.g=l[R];I=Un(P,d,!0,c)&&I}if(P=c.g=i,I=Un(P,d,!0,c)&&I,I=Un(P,d,!1,c)&&I,l)for(R=0;R<l.length;R++)P=c.g=l[R],I=Un(P,d,!1,c)&&I}gt.prototype.N=function(){if(gt.aa.N.call(this),this.i){var i=this.i,c;for(c in i.g){for(var l=i.g[c],d=0;d<l.length;d++)Fn(l[d]);delete i.g[c],i.h--}}this.F=null},gt.prototype.K=function(i,c,l,d){return this.i.add(String(i),c,!1,l,d)},gt.prototype.L=function(i,c,l,d){return this.i.add(String(i),c,!0,l,d)};function Un(i,c,l,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,R=0;R<c.length;++R){var P=c[R];if(P&&!P.da&&P.capture==l){var W=P.listener,ut=P.ha||P.src;P.fa&&ns(i.i,P),I=W.call(ut,d)!==!1&&I}}return I&&!d.defaultPrevented}function Hi(i,c,l){if(typeof i=="function")l&&(i=w(i,l));else if(i&&typeof i.handleEvent=="function")i=w(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(i,c||0)}function Gi(i){i.g=Hi(()=>{i.g=null,i.i&&(i.i=!1,Gi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class ou extends Kt{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Gi(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function tn(i){Kt.call(this),this.h=i,this.g={}}V(tn,Kt);var Ki=[];function Qi(i){lt(i.g,function(c,l){this.g.hasOwnProperty(l)&&os(c)},i),i.g={}}tn.prototype.N=function(){tn.aa.N.call(this),Qi(this)},tn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ls=u.JSON.stringify,au=u.JSON.parse,cu=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function us(){}us.prototype.h=null;function Wi(i){return i.h||(i.h=i.i())}function Xi(){}var en={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function hs(){pt.call(this,"d")}V(hs,pt);function ds(){pt.call(this,"c")}V(ds,pt);var ue={},Yi=null;function jn(){return Yi=Yi||new gt}ue.La="serverreachability";function Ji(i){pt.call(this,ue.La,i)}V(Ji,pt);function nn(i){const c=jn();It(c,new Ji(c))}ue.STAT_EVENT="statevent";function Zi(i,c){pt.call(this,ue.STAT_EVENT,i),this.stat=c}V(Zi,pt);function wt(i){const c=jn();It(c,new Zi(c,i))}ue.Ma="timingevent";function to(i,c){pt.call(this,ue.Ma,i),this.size=c}V(to,pt);function rn(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},c)}function sn(){this.g=!0}sn.prototype.xa=function(){this.g=!1};function lu(i,c,l,d,I,R){i.info(function(){if(i.g)if(R)for(var P="",W=R.split("&"),ut=0;ut<W.length;ut++){var K=W[ut].split("=");if(1<K.length){var _t=K[0];K=K[1];var yt=_t.split("_");P=2<=yt.length&&yt[1]=="type"?P+(_t+"="+K+"&"):P+(_t+"=redacted&")}}else P=null;else P=R;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+c+`
`+l+`
`+P})}function uu(i,c,l,d,I,R,P){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+c+`
`+l+`
`+R+" "+P})}function we(i,c,l,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+du(i,l)+(d?" "+d:"")})}function hu(i,c){i.info(function(){return"TIMEOUT: "+c})}sn.prototype.info=function(){};function du(i,c){if(!i.g)return c;if(!c)return null;try{var l=JSON.parse(c);if(l){for(i=0;i<l.length;i++)if(Array.isArray(l[i])){var d=l[i];if(!(2>d.length)){var I=d[1];if(Array.isArray(I)&&!(1>I.length)){var R=I[0];if(R!="noop"&&R!="stop"&&R!="close")for(var P=1;P<I.length;P++)I[P]=""}}}}return ls(l)}catch{return c}}var zn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eo={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fs;function $n(){}V($n,us),$n.prototype.g=function(){return new XMLHttpRequest},$n.prototype.i=function(){return{}},fs=new $n;function Qt(i,c,l,d){this.j=i,this.i=c,this.l=l,this.R=d||1,this.U=new tn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new no}function no(){this.i=null,this.g="",this.h=!1}var ro={},ms={};function ps(i,c,l){i.L=1,i.v=Kn(Ut(c)),i.m=l,i.P=!0,so(i,null)}function so(i,c){i.F=Date.now(),qn(i),i.A=Ut(i.v);var l=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),Eo(l.i,"t",d),i.C=0,l=i.j.J,i.h=new no,i.g=Lo(i.j,l?c:null,!i.m),0<i.O&&(i.M=new ou(w(i.Y,i,i.g),i.O)),c=i.U,l=i.g,d=i.ca;var I="readystatechange";Array.isArray(I)||(I&&(Ki[0]=I.toString()),I=Ki);for(var R=0;R<I.length;R++){var P=ji(l,I[R],d||c.handleEvent,!1,c.h||c);if(!P)break;c.g[P.key]=P}c=i.H?m(i.H):{},i.m?(i.u||(i.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,c)):(i.u="GET",i.g.ea(i.A,i.u,null,c)),nn(),lu(i.i,i.u,i.A,i.l,i.R,i.m)}Qt.prototype.ca=function(i){i=i.target;const c=this.M;c&&jt(i)==3?c.j():this.Y(i)},Qt.prototype.Y=function(i){try{if(i==this.g)t:{const yt=jt(this.g);var c=this.g.Ba();const Ce=this.g.Z();if(!(3>yt)&&(yt!=3||this.g&&(this.h.h||this.g.oa()||Co(this.g)))){this.J||yt!=4||c==7||(c==8||0>=Ce?nn(3):nn(2)),gs(this);var l=this.g.Z();this.X=l;e:if(io(this)){var d=Co(this.g);i="";var I=d.length,R=jt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){he(this),on(this);var P="";break e}this.h.i=new u.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,i+=this.h.i.decode(d[c],{stream:!(R&&c==I-1)});d.length=0,this.h.g+=i,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=l==200,uu(this.i,this.u,this.A,this.l,this.R,yt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ut=this.g;if((W=ut.g?ut.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(W)){var K=W;break e}}K=null}if(l=K)we(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,_s(this,l);else{this.o=!1,this.s=3,wt(12),he(this),on(this);break t}}if(this.P){l=!0;let Pt;for(;!this.J&&this.C<P.length;)if(Pt=fu(this,P),Pt==ms){yt==4&&(this.s=4,wt(14),l=!1),we(this.i,this.l,null,"[Incomplete Response]");break}else if(Pt==ro){this.s=4,wt(15),we(this.i,this.l,P,"[Invalid Chunk]"),l=!1;break}else we(this.i,this.l,Pt,null),_s(this,Pt);if(io(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),yt!=4||P.length!=0||this.h.h||(this.s=1,wt(16),l=!1),this.o=this.o&&l,!l)we(this.i,this.l,P,"[Invalid Chunked Response]"),he(this),on(this);else if(0<P.length&&!this.W){this.W=!0;var _t=this.j;_t.g==this&&_t.ba&&!_t.M&&(_t.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),ws(_t),_t.M=!0,wt(11))}}else we(this.i,this.l,P,null),_s(this,P);yt==4&&he(this),this.o&&!this.J&&(yt==4?No(this.j,this):(this.o=!1,qn(this)))}else Vu(this.g),l==400&&0<P.indexOf("Unknown SID")?(this.s=3,wt(12)):(this.s=0,wt(13)),he(this),on(this)}}}catch{}finally{}};function io(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function fu(i,c){var l=i.C,d=c.indexOf(`
`,l);return d==-1?ms:(l=Number(c.substring(l,d)),isNaN(l)?ro:(d+=1,d+l>c.length?ms:(c=c.slice(d,d+l),i.C=d+l,c)))}Qt.prototype.cancel=function(){this.J=!0,he(this)};function qn(i){i.S=Date.now()+i.I,oo(i,i.I)}function oo(i,c){if(i.B!=null)throw Error("WatchDog timer not null");i.B=rn(w(i.ba,i),c)}function gs(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Qt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(hu(this.i,this.A),this.L!=2&&(nn(),wt(17)),he(this),this.s=2,on(this)):oo(this,this.S-i)};function on(i){i.j.G==0||i.J||No(i.j,i)}function he(i){gs(i);var c=i.M;c&&typeof c.ma=="function"&&c.ma(),i.M=null,Qi(i.U),i.g&&(c=i.g,i.g=null,c.abort(),c.ma())}function _s(i,c){try{var l=i.j;if(l.G!=0&&(l.g==i||ys(l.h,i))){if(!i.K&&ys(l.h,i)&&l.G==3){try{var d=l.Da.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<i.F)Zn(l),Yn(l);else break t;Is(l),wt(18)}}else l.za=I[1],0<l.za-l.T&&37500>I[2]&&l.F&&l.v==0&&!l.C&&(l.C=rn(w(l.Za,l),6e3));if(1>=lo(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else fe(l,11)}else if((i.K||l.g==i)&&Zn(l),!U(c))for(I=l.Da.g.parse(c),c=0;c<I.length;c++){let K=I[c];if(l.T=K[0],K=K[1],l.G==2)if(K[0]=="c"){l.K=K[1],l.ia=K[2];const _t=K[3];_t!=null&&(l.la=_t,l.j.info("VER="+l.la));const yt=K[4];yt!=null&&(l.Aa=yt,l.j.info("SVER="+l.Aa));const Ce=K[5];Ce!=null&&typeof Ce=="number"&&0<Ce&&(d=1.5*Ce,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const Pt=i.g;if(Pt){const er=Pt.g?Pt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(er){var R=d.h;R.g||er.indexOf("spdy")==-1&&er.indexOf("quic")==-1&&er.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Es(R,R.h),R.h=null))}if(d.D){const As=Pt.g?Pt.g.getResponseHeader("X-HTTP-Session-Id"):null;As&&(d.ya=As,Y(d.I,d.D,As))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-i.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var P=i;if(d.qa=Mo(d,d.J?d.ia:null,d.W),P.K){uo(d.h,P);var W=P,ut=d.L;ut&&(W.I=ut),W.B&&(gs(W),qn(W)),d.g=P}else Do(d);0<l.i.length&&Jn(l)}else K[0]!="stop"&&K[0]!="close"||fe(l,7);else l.G==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?fe(l,7):Ts(l):K[0]!="noop"&&l.l&&l.l.ta(K),l.v=0)}}nn(4)}catch{}}var mu=class{constructor(i,c){this.g=i,this.map=c}};function ao(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function co(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function lo(i){return i.h?1:i.g?i.g.size:0}function ys(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function Es(i,c){i.g?i.g.add(c):i.h=c}function uo(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}ao.prototype.cancel=function(){if(this.i=ho(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function ho(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const l of i.g.values())c=c.concat(l.D);return c}return N(i.i)}function pu(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var c=[],l=i.length,d=0;d<l;d++)c.push(i[d]);return c}c=[],l=0;for(d in i)c[l++]=i[d];return c}function gu(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var c=[];i=i.length;for(var l=0;l<i;l++)c.push(l);return c}c=[],l=0;for(const d in i)c[l++]=d;return c}}}function fo(i,c){if(i.forEach&&typeof i.forEach=="function")i.forEach(c,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,c,void 0);else for(var l=gu(i),d=pu(i),I=d.length,R=0;R<I;R++)c.call(void 0,d[R],l&&l[R],i)}var mo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function _u(i,c){if(i){i=i.split("&");for(var l=0;l<i.length;l++){var d=i[l].indexOf("="),I=null;if(0<=d){var R=i[l].substring(0,d);I=i[l].substring(d+1)}else R=i[l];c(R,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function de(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof de){this.h=i.h,Hn(this,i.j),this.o=i.o,this.g=i.g,Gn(this,i.s),this.l=i.l;var c=i.i,l=new ln;l.i=c.i,c.g&&(l.g=new Map(c.g),l.h=c.h),po(this,l),this.m=i.m}else i&&(c=String(i).match(mo))?(this.h=!1,Hn(this,c[1]||"",!0),this.o=an(c[2]||""),this.g=an(c[3]||"",!0),Gn(this,c[4]),this.l=an(c[5]||"",!0),po(this,c[6]||"",!0),this.m=an(c[7]||"")):(this.h=!1,this.i=new ln(null,this.h))}de.prototype.toString=function(){var i=[],c=this.j;c&&i.push(cn(c,go,!0),":");var l=this.g;return(l||c=="file")&&(i.push("//"),(c=this.o)&&i.push(cn(c,go,!0),"@"),i.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&i.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(cn(l,l.charAt(0)=="/"?vu:Eu,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",cn(l,Iu)),i.join("")};function Ut(i){return new de(i)}function Hn(i,c,l){i.j=l?an(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function Gn(i,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);i.s=c}else i.s=null}function po(i,c,l){c instanceof ln?(i.i=c,wu(i.i,i.h)):(l||(c=cn(c,Tu)),i.i=new ln(c,i.h))}function Y(i,c,l){i.i.set(c,l)}function Kn(i){return Y(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function an(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function cn(i,c,l){return typeof i=="string"?(i=encodeURI(i).replace(c,yu),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function yu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var go=/[#\/\?@]/g,Eu=/[#\?:]/g,vu=/[#\?]/g,Tu=/[#\?@]/g,Iu=/#/g;function ln(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function Wt(i){i.g||(i.g=new Map,i.h=0,i.i&&_u(i.i,function(c,l){i.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=ln.prototype,n.add=function(i,c){Wt(this),this.i=null,i=Ae(this,i);var l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(c),this.h+=1,this};function _o(i,c){Wt(i),c=Ae(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function yo(i,c){return Wt(i),c=Ae(i,c),i.g.has(c)}n.forEach=function(i,c){Wt(this),this.g.forEach(function(l,d){l.forEach(function(I){i.call(c,I,d,this)},this)},this)},n.na=function(){Wt(this);const i=Array.from(this.g.values()),c=Array.from(this.g.keys()),l=[];for(let d=0;d<c.length;d++){const I=i[d];for(let R=0;R<I.length;R++)l.push(c[d])}return l},n.V=function(i){Wt(this);let c=[];if(typeof i=="string")yo(this,i)&&(c=c.concat(this.g.get(Ae(this,i))));else{i=Array.from(this.g.values());for(let l=0;l<i.length;l++)c=c.concat(i[l])}return c},n.set=function(i,c){return Wt(this),this.i=null,i=Ae(this,i),yo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=this.V(i),0<i.length?String(i[0]):c):c};function Eo(i,c,l){_o(i,c),0<l.length&&(i.i=null,i.g.set(Ae(i,c),N(l)),i.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(var l=0;l<c.length;l++){var d=c[l];const R=encodeURIComponent(String(d)),P=this.V(d);for(d=0;d<P.length;d++){var I=R;P[d]!==""&&(I+="="+encodeURIComponent(String(P[d]))),i.push(I)}}return this.i=i.join("&")};function Ae(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function wu(i,c){c&&!i.j&&(Wt(i),i.i=null,i.g.forEach(function(l,d){var I=d.toLowerCase();d!=I&&(_o(this,d),Eo(this,I,l))},i)),i.j=c}function Au(i,c){const l=new sn;if(u.Image){const d=new Image;d.onload=S(Xt,l,"TestLoadImage: loaded",!0,c,d),d.onerror=S(Xt,l,"TestLoadImage: error",!1,c,d),d.onabort=S(Xt,l,"TestLoadImage: abort",!1,c,d),d.ontimeout=S(Xt,l,"TestLoadImage: timeout",!1,c,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function Ru(i,c){const l=new sn,d=new AbortController,I=setTimeout(()=>{d.abort(),Xt(l,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(I),R.ok?Xt(l,"TestPingServer: ok",!0,c):Xt(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),Xt(l,"TestPingServer: error",!1,c)})}function Xt(i,c,l,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(l)}catch{}}function Cu(){this.g=new cu}function Su(i,c,l){const d=l||"";try{fo(i,function(I,R){let P=I;f(I)&&(P=ls(I)),c.push(d+R+"="+encodeURIComponent(P))})}catch(I){throw c.push(d+"type="+encodeURIComponent("_badmap")),I}}function Qn(i){this.l=i.Ub||null,this.j=i.eb||!1}V(Qn,us),Qn.prototype.g=function(){return new Wn(this.l,this.j)},Qn.prototype.i=function(i){return function(){return i}}({});function Wn(i,c){gt.call(this),this.D=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(Wn,gt),n=Wn.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=c,this.readyState=1,hn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(c.body=i),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,un(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,hn(this)),this.g&&(this.readyState=3,hn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;vo(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function vo(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?un(this):hn(this),this.readyState==3&&vo(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,un(this))},n.Qa=function(i){this.g&&(this.response=i,un(this))},n.ga=function(){this.g&&un(this)};function un(i){i.readyState=4,i.l=null,i.j=null,i.v=null,hn(i)}n.setRequestHeader=function(i,c){this.u.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=c.next();return i.join(`\r
`)};function hn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function To(i){let c="";return lt(i,function(l,d){c+=d,c+=":",c+=l,c+=`\r
`}),c}function vs(i,c,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=To(l),typeof i=="string"?l!=null&&encodeURIComponent(String(l)):Y(i,c,l))}function tt(i){gt.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(tt,gt);var bu=/^https?$/i,Pu=["POST","PUT"];n=tt.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,c,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fs.g(),this.v=this.o?Wi(this.o):Wi(fs),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(R){Io(this,R);return}if(i=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)l.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())l.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),I=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Pu,c,void 0))||d||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,P]of l)this.g.setRequestHeader(R,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ro(this),this.u=!0,this.g.send(i),this.u=!1}catch(R){Io(this,R)}};function Io(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.m=5,wo(i),Xn(i)}function wo(i){i.A||(i.A=!0,It(i,"complete"),It(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,It(this,"complete"),It(this,"abort"),Xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xn(this,!0)),tt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ao(this):this.bb())},n.bb=function(){Ao(this)};function Ao(i){if(i.h&&typeof a<"u"&&(!i.v[1]||jt(i)!=4||i.Z()!=2)){if(i.u&&jt(i)==4)Hi(i.Ea,0,i);else if(It(i,"readystatechange"),jt(i)==4){i.h=!1;try{const P=i.Z();t:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var l;if(!(l=c)){var d;if(d=P===0){var I=String(i.D).match(mo)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),d=!bu.test(I?I.toLowerCase():"")}l=d}if(l)It(i,"complete"),It(i,"success");else{i.m=6;try{var R=2<jt(i)?i.g.statusText:""}catch{R=""}i.l=R+" ["+i.Z()+"]",wo(i)}}finally{Xn(i)}}}}function Xn(i,c){if(i.g){Ro(i);const l=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,c||It(i,"ready");try{l.onreadystatechange=d}catch{}}}function Ro(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function jt(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<jt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),au(c)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Vu(i){const c={};i=(i.g&&2<=jt(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(U(i[d]))continue;var l=v(i[d]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=c[I]||[];c[I]=R,R.push(l)}T(c,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function dn(i,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||c}function So(i){this.Aa=0,this.i=[],this.j=new sn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=dn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=dn("baseRetryDelayMs",5e3,i),this.cb=dn("retryDelaySeedMs",1e4,i),this.Wa=dn("forwardChannelMaxRetries",2,i),this.wa=dn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new ao(i&&i.concurrentRequestLimit),this.Da=new Cu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=So.prototype,n.la=8,n.G=1,n.connect=function(i,c,l,d){wt(0),this.W=i,this.H=c||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=Mo(this,null,this.W),Jn(this)};function Ts(i){if(bo(i),i.G==3){var c=i.U++,l=Ut(i.I);if(Y(l,"SID",i.K),Y(l,"RID",c),Y(l,"TYPE","terminate"),fn(i,l),c=new Qt(i,i.j,c),c.L=2,c.v=Kn(Ut(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=c.v,l=!0),l||(c.g=Lo(c.j,null),c.g.ea(c.v)),c.F=Date.now(),qn(c)}Oo(i)}function Yn(i){i.g&&(ws(i),i.g.cancel(),i.g=null)}function bo(i){Yn(i),i.u&&(u.clearTimeout(i.u),i.u=null),Zn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Jn(i){if(!co(i.h)&&!i.s){i.s=!0;var c=i.Ga;Ye||Ui(),Je||(Ye(),Je=!0),es.add(c,i),i.B=0}}function Du(i,c){return lo(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=c.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=rn(w(i.Ga,i,c),xo(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const I=new Qt(this,this.j,i);let R=this.o;if(this.S&&(R?(R=m(R),y(R,this.S)):R=this.S),this.m!==null||this.O||(I.H=R,R=null),this.P)t:{for(var c=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,4096<c){c=l;break t}if(c===4096||l===this.i.length-1){c=l+1;break t}}c=1e3}else c=1e3;c=Vo(this,I,c),l=Ut(this.I),Y(l,"RID",i),Y(l,"CVER",22),this.D&&Y(l,"X-HTTP-Session-Id",this.D),fn(this,l),R&&(this.O?c="headers="+encodeURIComponent(String(To(R)))+"&"+c:this.m&&vs(l,this.m,R)),Es(this.h,I),this.Ua&&Y(l,"TYPE","init"),this.P?(Y(l,"$req",c),Y(l,"SID","null"),I.T=!0,ps(I,l,null)):ps(I,l,c),this.G=2}}else this.G==3&&(i?Po(this,i):this.i.length==0||co(this.h)||Po(this))};function Po(i,c){var l;c?l=c.l:l=i.U++;const d=Ut(i.I);Y(d,"SID",i.K),Y(d,"RID",l),Y(d,"AID",i.T),fn(i,d),i.m&&i.o&&vs(d,i.m,i.o),l=new Qt(i,i.j,l,i.B+1),i.m===null&&(l.H=i.o),c&&(i.i=c.D.concat(i.i)),c=Vo(i,l,1e3),l.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Es(i.h,l),ps(l,d,c)}function fn(i,c){i.H&&lt(i.H,function(l,d){Y(c,d,l)}),i.l&&fo({},function(l,d){Y(c,d,l)})}function Vo(i,c,l){l=Math.min(i.i.length,l);var d=i.l?w(i.l.Na,i.l,i):null;t:{var I=i.i;let R=-1;for(;;){const P=["count="+l];R==-1?0<l?(R=I[0].g,P.push("ofs="+R)):R=0:P.push("ofs="+R);let W=!0;for(let ut=0;ut<l;ut++){let K=I[ut].g;const _t=I[ut].map;if(K-=R,0>K)R=Math.max(0,I[ut].g-100),W=!1;else try{Su(_t,P,"req"+K+"_")}catch{d&&d(_t)}}if(W){d=P.join("&");break t}}}return i=i.i.splice(0,l),c.D=i,d}function Do(i){if(!i.g&&!i.u){i.Y=1;var c=i.Fa;Ye||Ui(),Je||(Ye(),Je=!0),es.add(c,i),i.v=0}}function Is(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=rn(w(i.Fa,i),xo(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,ko(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=rn(w(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,wt(10),Yn(this),ko(this))};function ws(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function ko(i){i.g=new Qt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var c=Ut(i.qa);Y(c,"RID","rpc"),Y(c,"SID",i.K),Y(c,"AID",i.T),Y(c,"CI",i.F?"0":"1"),!i.F&&i.ja&&Y(c,"TO",i.ja),Y(c,"TYPE","xmlhttp"),fn(i,c),i.m&&i.o&&vs(c,i.m,i.o),i.L&&(i.g.I=i.L);var l=i.g;i=i.ia,l.L=1,l.v=Kn(Ut(c)),l.m=null,l.P=!0,so(l,i)}n.Za=function(){this.C!=null&&(this.C=null,Yn(this),Is(this),wt(19))};function Zn(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function No(i,c){var l=null;if(i.g==c){Zn(i),ws(i),i.g=null;var d=2}else if(ys(i.h,c))l=c.D,uo(i.h,c),d=1;else return;if(i.G!=0){if(c.o)if(d==1){l=c.m?c.m.length:0,c=Date.now()-c.F;var I=i.B;d=jn(),It(d,new to(d,l)),Jn(i)}else Do(i);else if(I=c.s,I==3||I==0&&0<c.X||!(d==1&&Du(i,c)||d==2&&Is(i)))switch(l&&0<l.length&&(c=i.h,c.i=c.i.concat(l)),I){case 1:fe(i,5);break;case 4:fe(i,10);break;case 3:fe(i,6);break;default:fe(i,2)}}}function xo(i,c){let l=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(l*=2),l*c}function fe(i,c){if(i.j.info("Error code "+c),c==2){var l=w(i.fb,i),d=i.Xa;const I=!d;d=new de(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Hn(d,"https"),Kn(d),I?Au(d.toString(),l):Ru(d.toString(),l)}else wt(2);i.G=0,i.l&&i.l.sa(c),Oo(i),bo(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),wt(2)):(this.j.info("Failed to ping google.com"),wt(1))};function Oo(i){if(i.G=0,i.ka=[],i.l){const c=ho(i.h);(c.length!=0||i.i.length!=0)&&(D(i.ka,c),D(i.ka,i.i),i.h.i.length=0,N(i.i),i.i.length=0),i.l.ra()}}function Mo(i,c,l){var d=l instanceof de?Ut(l):new de(l);if(d.g!="")c&&(d.g=c+"."+d.g),Gn(d,d.s);else{var I=u.location;d=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var R=new de(null);d&&Hn(R,d),c&&(R.g=c),I&&Gn(R,I),l&&(R.l=l),d=R}return l=i.D,c=i.ya,l&&c&&Y(d,l,c),Y(d,"VER",i.la),fn(i,d),d}function Lo(i,c,l){if(c&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Ca&&!i.pa?new tt(new Qn({eb:l})):new tt(i.pa),c.Ha(i.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fo(){}n=Fo.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function tr(){}tr.prototype.g=function(i,c){return new St(i,c)};function St(i,c){gt.call(this),this.g=new So(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(i?i["X-WebChannel-Client-Profile"]=c.va:i={"X-WebChannel-Client-Profile":c.va}),this.g.S=i,(i=c&&c.Sb)&&!U(i)&&(this.g.m=i),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!U(c)&&(this.g.D=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new Re(this)}V(St,gt),St.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},St.prototype.close=function(){Ts(this.g)},St.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.u&&(l={},l.__data__=ls(i),i=l);c.i.push(new mu(c.Ya++,i)),c.G==3&&Jn(c)},St.prototype.N=function(){this.g.l=null,delete this.j,Ts(this.g),delete this.g,St.aa.N.call(this)};function Bo(i){hs.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const l in c){i=l;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}V(Bo,hs);function Uo(){ds.call(this),this.status=1}V(Uo,ds);function Re(i){this.g=i}V(Re,Fo),Re.prototype.ua=function(){It(this.g,"a")},Re.prototype.ta=function(i){It(this.g,new Bo(i))},Re.prototype.sa=function(i){It(this.g,new Uo)},Re.prototype.ra=function(){It(this.g,"b")},tr.prototype.createWebChannel=tr.prototype.g,St.prototype.send=St.prototype.o,St.prototype.open=St.prototype.m,St.prototype.close=St.prototype.close,hc=function(){return new tr},uc=function(){return jn()},lc=ue,Bs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},zn.NO_ERROR=0,zn.TIMEOUT=8,zn.HTTP_ERROR=6,ar=zn,eo.COMPLETE="complete",cc=eo,Xi.EventType=en,en.OPEN="a",en.CLOSE="b",en.ERROR="c",en.MESSAGE="d",gt.prototype.listen=gt.prototype.K,mn=Xi,tt.prototype.listenOnce=tt.prototype.L,tt.prototype.getLastError=tt.prototype.Ka,tt.prototype.getLastErrorCode=tt.prototype.Ba,tt.prototype.getStatus=tt.prototype.Z,tt.prototype.getResponseJson=tt.prototype.Oa,tt.prototype.getResponseText=tt.prototype.oa,tt.prototype.send=tt.prototype.ea,tt.prototype.setWithCredentials=tt.prototype.Ha,ac=tt}).apply(typeof nr<"u"?nr:typeof self<"u"?self:typeof window<"u"?window:{});const Zo="@firebase/firestore",ta="4.7.17";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let He="11.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=new tc("@firebase/firestore");function Se(){return _e.logLevel}function k(n,...t){if(_e.logLevel<=q.DEBUG){const e=t.map(ii);_e.debug(`Firestore (${He}): ${n}`,...e)}}function Ht(n,...t){if(_e.logLevel<=q.ERROR){const e=t.map(ii);_e.error(`Firestore (${He}): ${n}`,...e)}}function Oe(n,...t){if(_e.logLevel<=q.WARN){const e=t.map(ii);_e.warn(`Firestore (${He}): ${n}`,...e)}}function ii(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,dc(n,r,e)}function dc(n,t,e){let r=`FIRESTORE (${He}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ht(r),new Error(r)}function Q(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||dc(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends qe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class _d{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(vt.UNAUTHENTICATED))}shutdown(){}}class yd{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ed{constructor(t){this.t=t,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){Q(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new ne;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ne,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},u=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ne)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new fc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return Q(t===null||typeof t=="string",2055,{h:t}),new vt(t)}}class vd{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Td{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new vd(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ea{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Id{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,td(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){Q(this.o===void 0,3512);const r=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ea(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(Q(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new ea(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=wd(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Us(n,t){let e=0;for(;e<n.length&&e<t.length;){const r=n.codePointAt(e),s=t.codePointAt(e);if(r!==s){if(r<128&&s<128)return B(r,s);{const o=mc(),a=Ad(o.encode(na(n,e)),o.encode(na(t,e)));return a!==0?a:B(r,s)}}e+=r>65535?2:1}return B(n.length,t.length)}function na(n,t){return n.codePointAt(t)>65535?n.substring(t,t+2):n.substring(t,t+1)}function Ad(n,t){for(let e=0;e<n.length&&e<t.length;++e)if(n[e]!==t[e])return B(n[e],t[e]);return B(n.length,t.length)}function Me(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra=-62135596800,sa=1e6;class ot{static now(){return ot.fromMillis(Date.now())}static fromDate(t){return ot.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*sa);return new ot(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new x(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new x(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<ra)throw new x(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new x(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sa}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds-ra;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new ot(0,0))}static max(){return new L(new ot(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="__name__";class kt{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&M(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return kt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof kt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=kt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=kt.isNumericId(t),s=kt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?kt.extractNumericId(t).compare(kt.extractNumericId(e)):Us(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return ee.fromString(t.substring(4,t.length-2))}}class J extends kt{construct(t,e,r){return new J(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new x(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new J(e)}static emptyPath(){return new J([])}}const Rd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends kt{construct(t,e,r){return new ft(t,e,r)}static isValidIdentifier(t){return Rd.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ia}static keyField(){return new ft([ia])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new x(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new x(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(o(),s++)}if(o(),a)throw new x(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ft(e)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(J.fromString(t))}static fromName(t){return new O(J.fromString(t).popFirst(5))}static empty(){return new O(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&J.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return J.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new J(t.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=-1;function Cd(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new ot(e+1,0):new ot(e,r));return new se(s,O.empty(),t)}function Sd(n){return new se(n.readTime,n.key,Cn)}class se{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new se(L.min(),O.empty(),Cn)}static max(){return new se(L.max(),O.empty(),Cn)}}function bd(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ge(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Pd)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new C((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof C?e:C.resolve(e)}catch(e){return C.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):C.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):C.reject(e)}static resolve(t){return new C((e,r)=>{e(t)})}static reject(t){return new C((e,r)=>{r(t)})}static waitFor(t){return new C((e,r)=>{let s=0,o=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=C.resolve(!1);for(const r of t)e=e.next(s=>s?C.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new C((r,s)=>{const o=t.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(g=>{a[f]=g,++u,u===o&&r(a)},g=>s(g))}})}static doWhile(t,e){return new C((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Dd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ke(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ue(r),this.ce=r=>e.writeSequenceNumber(r))}ue(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ce&&this.ce(t),t}}Mr.le=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi=-1;function Lr(n){return n==null}function yr(n){return n===0&&1/n==-1/0}function kd(n){return typeof n=="number"&&Number.isInteger(n)&&!yr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc="";function Nd(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=oa(t)),t=xd(n.get(e),t);return oa(t)}function xd(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case gc:e+="";break;default:e+=o}}return e}function oa(n){return n+gc+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Ee(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function _c(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(t,e){this.comparator=t,this.root=e||ht.EMPTY}insert(t,e){return new Z(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ht.BLACK,null,null))}remove(t){return new Z(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ht.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new rr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new rr(this.root,t,this.comparator,!1)}getReverseIterator(){return new rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new rr(this.root,t,this.comparator,!0)}}class rr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ht{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ht.RED,this.left=s??ht.EMPTY,this.right=o??ht.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ht(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ht.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ht.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ht.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ht.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}ht.EMPTY=null,ht.RED=!0,ht.BLACK=!1;ht.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ht(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t){this.comparator=t,this.data=new Z(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ca(this.data.getIterator())}getIteratorFrom(t){return new ca(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof at)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new at(this.comparator);return e.data=t,e}}class ca{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(t){this.fields=t,t.sort(ft.comparator)}static empty(){return new Dt([])}unionWith(t){let e=new at(ft.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Dt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Me(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new yc("Invalid base64 string: "+o):o}}(t);return new mt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new mt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}mt.EMPTY_BYTE_STRING=new mt("");const Od=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ie(n){if(Q(!!n,39018),typeof n=="string"){let t=0;const e=Od.exec(n);if(Q(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:nt(n.seconds),nanos:nt(n.nanos)}}function nt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function oe(n){return typeof n=="string"?mt.fromBase64String(n):mt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec="server_timestamp",vc="__type__",Tc="__previous_value__",Ic="__local_write_time__";function ai(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[vc])===null||e===void 0?void 0:e.stringValue)===Ec}function Fr(n){const t=n.mapValue.fields[Tc];return ai(t)?Fr(t):t}function Sn(n){const t=ie(n.mapValue.fields[Ic].timestampValue);return new ot(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(t,e,r,s,o,a,u,h,f,g){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=g}}const Er="(default)";class bn{constructor(t,e){this.projectId=t,this.database=e||Er}static empty(){return new bn("","")}get isDefaultDatabase(){return this.database===Er}isEqual(t){return t instanceof bn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="__type__",Ld="__max__",sr={mapValue:{}},Ac="__vector__",vr="value";function ae(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ai(n)?4:Bd(n)?9007199254740991:Fd(n)?10:11:M(28295,{value:n})}function Mt(n,t){if(n===t)return!0;const e=ae(n);if(e!==ae(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Sn(n).isEqual(Sn(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=ie(s.timestampValue),u=ie(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return oe(s.bytesValue).isEqual(oe(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return nt(s.geoPointValue.latitude)===nt(o.geoPointValue.latitude)&&nt(s.geoPointValue.longitude)===nt(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return nt(s.integerValue)===nt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=nt(s.doubleValue),u=nt(o.doubleValue);return a===u?yr(a)===yr(u):isNaN(a)&&isNaN(u)}return!1}(n,t);case 9:return Me(n.arrayValue.values||[],t.arrayValue.values||[],Mt);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},u=o.mapValue.fields||{};if(aa(a)!==aa(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Mt(a[h],u[h])))return!1;return!0}(n,t);default:return M(52216,{left:n})}}function Pn(n,t){return(n.values||[]).find(e=>Mt(e,t))!==void 0}function Le(n,t){if(n===t)return 0;const e=ae(n),r=ae(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const u=nt(o.integerValue||o.doubleValue),h=nt(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,t);case 3:return la(n.timestampValue,t.timestampValue);case 4:return la(Sn(n),Sn(t));case 5:return Us(n.stringValue,t.stringValue);case 6:return function(o,a){const u=oe(o),h=oe(a);return u.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const u=o.split("/"),h=a.split("/");for(let f=0;f<u.length&&f<h.length;f++){const g=B(u[f],h[f]);if(g!==0)return g}return B(u.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const u=B(nt(o.latitude),nt(a.latitude));return u!==0?u:B(nt(o.longitude),nt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return ua(n.arrayValue,t.arrayValue);case 10:return function(o,a){var u,h,f,g;const E=o.fields||{},w=a.fields||{},S=(u=E[vr])===null||u===void 0?void 0:u.arrayValue,V=(h=w[vr])===null||h===void 0?void 0:h.arrayValue,N=B(((f=S?.values)===null||f===void 0?void 0:f.length)||0,((g=V?.values)===null||g===void 0?void 0:g.length)||0);return N!==0?N:ua(S,V)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===sr.mapValue&&a===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(a===sr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=a.fields||{},g=Object.keys(f);h.sort(),g.sort();for(let E=0;E<h.length&&E<g.length;++E){const w=Us(h[E],g[E]);if(w!==0)return w;const S=Le(u[h[E]],f[g[E]]);if(S!==0)return S}return B(h.length,g.length)}(n.mapValue,t.mapValue);default:throw M(23264,{Pe:e})}}function la(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=ie(n),r=ie(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function ua(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Le(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function Fe(n){return js(n)}function js(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=ie(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return oe(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return O.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=js(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${js(e.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function cr(n){switch(ae(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Fr(n);return t?16+cr(t):16;case 5:return 2*n.stringValue.length;case 6:return oe(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+cr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Ee(r.fields,(o,a)=>{s+=o.length+cr(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function zs(n){return!!n&&"integerValue"in n}function ci(n){return!!n&&"arrayValue"in n}function ha(n){return!!n&&"nullValue"in n}function da(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function lr(n){return!!n&&"mapValue"in n}function Fd(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{})[wc])===null||e===void 0?void 0:e.stringValue)===Ac}function En(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Ee(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=En(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=En(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Bd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ld}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.value=t}static empty(){return new bt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!lr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=En(e)}setAll(t){let e=ft.emptyPath(),r={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=u.popLast()}a?r[u.lastSegment()]=En(a):s.push(u.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());lr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Mt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];lr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Ee(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new bt(En(this.value))}}function Rc(n){const t=[];return Ee(n.fields,(e,r)=>{const s=new ft([e]);if(lr(r)){const o=Rc(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new Dt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t,e,r,s,o,a,u){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(t){return new Tt(t,0,L.min(),L.min(),L.min(),bt.empty(),0)}static newFoundDocument(t,e,r,s){return new Tt(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new Tt(t,2,e,L.min(),L.min(),bt.empty(),0)}static newUnknownDocument(t,e){return new Tt(t,3,e,L.min(),L.min(),bt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=bt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=bt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Tt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Tt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(t,e){this.position=t,this.inclusive=e}}function fa(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),e.key):r=Le(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function ma(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Mt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ud(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{}class it extends Cc{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new zd(t,e,r):e==="array-contains"?new Hd(t,r):e==="in"?new Gd(t,r):e==="not-in"?new Kd(t,r):e==="array-contains-any"?new Qd(t,r):new it(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new $d(t,r):new qd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Le(e,this.value)):e!==null&&ae(this.value)===ae(e)&&this.matchesComparison(Le(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Lt extends Cc{constructor(t,e){super(),this.filters=t,this.op=e,this.Te=null}static create(t,e){return new Lt(t,e)}matches(t){return Sc(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Te!==null||(this.Te=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Te}getFilters(){return Object.assign([],this.filters)}}function Sc(n){return n.op==="and"}function bc(n){return jd(n)&&Sc(n)}function jd(n){for(const t of n.filters)if(t instanceof Lt)return!1;return!0}function $s(n){if(n instanceof it)return n.field.canonicalString()+n.op.toString()+Fe(n.value);if(bc(n))return n.filters.map(t=>$s(t)).join(",");{const t=n.filters.map(e=>$s(e)).join(",");return`${n.op}(${t})`}}function Pc(n,t){return n instanceof it?function(r,s){return s instanceof it&&r.op===s.op&&r.field.isEqual(s.field)&&Mt(r.value,s.value)}(n,t):n instanceof Lt?function(r,s){return s instanceof Lt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,u)=>o&&Pc(a,s.filters[u]),!0):!1}(n,t):void M(19439)}function Vc(n){return n instanceof it?function(e){return`${e.field.canonicalString()} ${e.op} ${Fe(e.value)}`}(n):n instanceof Lt?function(e){return e.op.toString()+" {"+e.getFilters().map(Vc).join(" ,")+"}"}(n):"Filter"}class zd extends it{constructor(t,e,r){super(t,e,r),this.key=O.fromName(r.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class $d extends it{constructor(t,e){super(t,"in",e),this.keys=Dc("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class qd extends it{constructor(t,e){super(t,"not-in",e),this.keys=Dc("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Dc(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>O.fromName(r.referenceValue))}class Hd extends it{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ci(e)&&Pn(e.arrayValue,this.value)}}class Gd extends it{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Pn(this.value.arrayValue,e)}}class Kd extends it{constructor(t,e){super(t,"not-in",e)}matches(t){if(Pn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Pn(this.value.arrayValue,e)}}class Qd extends it{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ci(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>Pn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(t,e=null,r=[],s=[],o=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=u,this.Ie=null}}function pa(n,t=null,e=[],r=[],s=null,o=null,a=null){return new Wd(n,t,e,r,s,o,a)}function li(n){const t=F(n);if(t.Ie===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>$s(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Lr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Fe(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Fe(r)).join(",")),t.Ie=e}return t.Ie}function ui(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Ud(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Pc(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!ma(n.startAt,t.startAt)&&ma(n.endAt,t.endAt)}function qs(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(t,e=null,r=[],s=[],o=null,a="F",u=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.Ee=null,this.de=null,this.Ae=null,this.startAt,this.endAt}}function Xd(n,t,e,r,s,o,a,u){return new Br(n,t,e,r,s,o,a,u)}function Ur(n){return new Br(n)}function ga(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Yd(n){return n.collectionGroup!==null}function vn(n){const t=F(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new at(ft.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Ir(o,r))}),e.has(ft.keyField().canonicalString())||t.Ee.push(new Ir(ft.keyField(),r))}return t.Ee}function Nt(n){const t=F(n);return t.de||(t.de=Jd(t,vn(n))),t.de}function Jd(n,t){if(n.limitType==="F")return pa(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Ir(s.field,o)});const e=n.endAt?new Tr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Tr(n.startAt.position,n.startAt.inclusive):null;return pa(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Hs(n,t,e){return new Br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function jr(n,t){return ui(Nt(n),Nt(t))&&n.limitType===t.limitType}function kc(n){return`${li(Nt(n))}|lt:${n.limitType}`}function be(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Vc(s)).join(", ")}]`),Lr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>Fe(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>Fe(s)).join(",")),`Target(${r})`}(Nt(n))}; limitType=${n.limitType})`}function zr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):O.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of vn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,u,h){const f=fa(a,u,h);return a.inclusive?f<=0:f<0}(r.startAt,vn(r),s)||r.endAt&&!function(a,u,h){const f=fa(a,u,h);return a.inclusive?f>=0:f>0}(r.endAt,vn(r),s))}(n,t)}function Zd(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Nc(n){return(t,e)=>{let r=!1;for(const s of vn(n)){const o=tf(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function tf(n,t,e){const r=n.field.isKeyField()?O.comparator(t.key,e.key):function(o,a,u){const h=a.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Le(h,f):M(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Ee(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return _c(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=new Z(O.comparator);function Gt(){return ef}const xc=new Z(O.comparator);function pn(...n){let t=xc;for(const e of n)t=t.insert(e.key,e);return t}function Oc(n){let t=xc;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function pe(){return Tn()}function Mc(){return Tn()}function Tn(){return new ve(n=>n.toString(),(n,t)=>n.isEqual(t))}const nf=new Z(O.comparator),rf=new at(O.comparator);function j(...n){let t=rf;for(const e of n)t=t.add(e);return t}const sf=new at(B);function of(){return sf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yr(t)?"-0":t}}function Lc(n){return{integerValue:""+n}}function af(n,t){return kd(t)?Lc(t):hi(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(){this._=void 0}}function cf(n,t,e){return n instanceof wr?function(s,o){const a={fields:{[vc]:{stringValue:Ec},[Ic]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&ai(o)&&(o=Fr(o)),o&&(a.fields[Tc]=o),{mapValue:a}}(e,t):n instanceof Vn?Bc(n,t):n instanceof Dn?Uc(n,t):function(s,o){const a=Fc(s,o),u=_a(a)+_a(s.Re);return zs(a)&&zs(s.Re)?Lc(u):hi(s.serializer,u)}(n,t)}function lf(n,t,e){return n instanceof Vn?Bc(n,t):n instanceof Dn?Uc(n,t):e}function Fc(n,t){return n instanceof Ar?function(r){return zs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class wr extends $r{}class Vn extends $r{constructor(t){super(),this.elements=t}}function Bc(n,t){const e=jc(t);for(const r of n.elements)e.some(s=>Mt(s,r))||e.push(r);return{arrayValue:{values:e}}}class Dn extends $r{constructor(t){super(),this.elements=t}}function Uc(n,t){let e=jc(t);for(const r of n.elements)e=e.filter(s=>!Mt(s,r));return{arrayValue:{values:e}}}class Ar extends $r{constructor(t,e){super(),this.serializer=t,this.Re=e}}function _a(n){return nt(n.integerValue||n.doubleValue)}function jc(n){return ci(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function uf(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Vn&&s instanceof Vn||r instanceof Dn&&s instanceof Dn?Me(r.elements,s.elements,Mt):r instanceof Ar&&s instanceof Ar?Mt(r.Re,s.Re):r instanceof wr&&s instanceof wr}(n.transform,t.transform)}class hf{constructor(t,e){this.version=t,this.transformResults=e}}class xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new xt}static exists(t){return new xt(void 0,t)}static updateTime(t){return new xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ur(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class qr{}function zc(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new di(n.key,xt.none()):new Nn(n.key,n.data,xt.none());{const e=n.data,r=bt.empty();let s=new at(ft.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Te(n.key,r,new Dt(s.toArray()),xt.none())}}function df(n,t,e){n instanceof Nn?function(s,o,a){const u=s.value.clone(),h=Ea(s.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,t,e):n instanceof Te?function(s,o,a){if(!ur(s.precondition,o))return void o.convertToUnknownDocument(a.version);const u=Ea(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll($c(s)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function In(n,t,e,r){return n instanceof Nn?function(o,a,u,h){if(!ur(o.precondition,a))return u;const f=o.value.clone(),g=va(o.fieldTransforms,h,a);return f.setAll(g),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof Te?function(o,a,u,h){if(!ur(o.precondition,a))return u;const f=va(o.fieldTransforms,h,a),g=a.data;return g.setAll($c(o)),g.setAll(f),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(E=>E.field))}(n,t,e,r):function(o,a,u){return ur(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,t,e)}function ff(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=Fc(r.transform,s||null);o!=null&&(e===null&&(e=bt.empty()),e.set(r.field,o))}return e||null}function ya(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Me(r,s,(o,a)=>uf(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Nn extends qr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Te extends qr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function $c(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Ea(n,t,e){const r=new Map;Q(n.length===e.length,32656,{Ve:e.length,me:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,u=t.data.field(o.field);r.set(o.field,lf(a,u,e[s]))}return r}function va(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,cf(o,a,t))}return r}class di extends qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mf extends qr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&df(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=In(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=In(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Mc();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=e.has(s.key)?null:u;const h=zc(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&Me(this.mutations,t.mutations,(e,r)=>ya(e,r))&&Me(this.baseMutations,t.baseMutations,(e,r)=>ya(e,r))}}class fi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){Q(t.mutations.length===r.length,58842,{fe:t.mutations.length,ge:r.length});let s=function(){return nf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new fi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var st,z;function yf(n){switch(n){case b.OK:return M(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function qc(n){if(n===void 0)return Ht("GRPC error has no .code"),b.UNKNOWN;switch(n){case st.OK:return b.OK;case st.CANCELLED:return b.CANCELLED;case st.UNKNOWN:return b.UNKNOWN;case st.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case st.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case st.INTERNAL:return b.INTERNAL;case st.UNAVAILABLE:return b.UNAVAILABLE;case st.UNAUTHENTICATED:return b.UNAUTHENTICATED;case st.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case st.NOT_FOUND:return b.NOT_FOUND;case st.ALREADY_EXISTS:return b.ALREADY_EXISTS;case st.PERMISSION_DENIED:return b.PERMISSION_DENIED;case st.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case st.ABORTED:return b.ABORTED;case st.OUT_OF_RANGE:return b.OUT_OF_RANGE;case st.UNIMPLEMENTED:return b.UNIMPLEMENTED;case st.DATA_LOSS:return b.DATA_LOSS;default:return M(39323,{code:n})}}(z=st||(st={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=new ee([4294967295,4294967295],0);function Ta(n){const t=mc().encode(n),e=new oc;return e.update(t),new Uint8Array(e.digest())}function Ia(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ee([e,r],0),new ee([s,o],0)]}class mi{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new gn(`Invalid padding: ${e}`);if(r<0)throw new gn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new gn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new gn(`Invalid padding when bitmap length is 0: ${e}`);this.pe=8*t.length-e,this.ye=ee.fromNumber(this.pe)}we(t,e,r){let s=t.add(e.multiply(ee.fromNumber(r)));return s.compare(Ef)===1&&(s=new ee([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.pe===0)return!1;const e=Ta(t),[r,s]=Ia(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);if(!this.be(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new mi(o,s,e);return r.forEach(u=>a.insert(u)),a}insert(t){if(this.pe===0)return;const e=Ta(t),[r,s]=Ia(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class gn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,xn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Hr(L.min(),s,new Z(B),Gt(),j())}}class xn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new xn(r,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e,r,s){this.De=t,this.removedTargetIds=e,this.key=r,this.ve=s}}class Hc{constructor(t,e){this.targetId=t,this.Ce=e}}class Gc{constructor(t,e,r=mt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class wa{constructor(){this.Fe=0,this.Me=Aa(),this.xe=mt.EMPTY_BYTE_STRING,this.Oe=!1,this.Ne=!0}get current(){return this.Oe}get resumeToken(){return this.xe}get Be(){return this.Fe!==0}get Le(){return this.Ne}ke(t){t.approximateByteSize()>0&&(this.Ne=!0,this.xe=t)}qe(){let t=j(),e=j(),r=j();return this.Me.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:o})}}),new xn(this.xe,this.Oe,t,e,r)}Qe(){this.Ne=!1,this.Me=Aa()}$e(t,e){this.Ne=!0,this.Me=this.Me.insert(t,e)}Ue(t){this.Ne=!0,this.Me=this.Me.remove(t)}Ke(){this.Fe+=1}We(){this.Fe-=1,Q(this.Fe>=0,3241,{Fe:this.Fe})}Ge(){this.Ne=!0,this.Oe=!0}}class vf{constructor(t){this.ze=t,this.je=new Map,this.He=Gt(),this.Je=ir(),this.Ye=ir(),this.Ze=new Z(B)}Xe(t){for(const e of t.De)t.ve&&t.ve.isFoundDocument()?this.et(e,t.ve):this.tt(e,t.key,t.ve);for(const e of t.removedTargetIds)this.tt(e,t.key,t.ve)}nt(t){this.forEachTarget(t,e=>{const r=this.rt(e);switch(t.state){case 0:this.it(e)&&r.ke(t.resumeToken);break;case 1:r.We(),r.Be||r.Qe(),r.ke(t.resumeToken);break;case 2:r.We(),r.Be||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.ke(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.ke(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach((r,s)=>{this.it(s)&&e(s)})}ot(t){const e=t.targetId,r=t.Ce.count,s=this._t(e);if(s){const o=s.target;if(qs(o))if(r===0){const a=new O(o.path);this.tt(e,a,Tt.newNoDocument(a,L.min()))}else Q(r===1,20013,{expectedCount:r});else{const a=this.ut(e);if(a!==r){const u=this.ct(t),h=u?this.lt(u,t,a):1;if(h!==0){this.st(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}ct(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,u;try{a=oe(r).toUint8Array()}catch(h){if(h instanceof yc)return Oe("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new mi(a,s,o)}catch(h){return Oe(h instanceof gn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.pe===0?null:u}lt(t,e,r){return e.Ce.count===r-this.Tt(t,e.targetId)?0:2}Tt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.ze.Pt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(u)||(this.tt(e,o,null),s++)}),s}It(t){const e=new Map;this.je.forEach((o,a)=>{const u=this._t(a);if(u){if(o.current&&qs(u.target)){const h=new O(u.target.path);this.Et(h).has(a)||this.dt(a,h)||this.tt(a,h,Tt.newNoDocument(h,t))}o.Le&&(e.set(a,o.qe()),o.Qe())}});let r=j();this.Ye.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{const f=this._t(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.He.forEach((o,a)=>a.setReadTime(t));const s=new Hr(t,e,this.Ze,this.He,r);return this.He=Gt(),this.Je=ir(),this.Ye=ir(),this.Ze=new Z(B),s}et(t,e){if(!this.it(t))return;const r=this.dt(t,e.key)?2:0;this.rt(t).$e(e.key,r),this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.Ye=this.Ye.insert(e.key,this.At(e.key).add(t))}tt(t,e,r){if(!this.it(t))return;const s=this.rt(t);this.dt(t,e)?s.$e(e,1):s.Ue(e),this.Ye=this.Ye.insert(e,this.At(e).delete(t)),this.Ye=this.Ye.insert(e,this.At(e).add(t)),r&&(this.He=this.He.insert(e,r))}removeTarget(t){this.je.delete(t)}ut(t){const e=this.rt(t).qe();return this.ze.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ke(t){this.rt(t).Ke()}rt(t){let e=this.je.get(t);return e||(e=new wa,this.je.set(t,e)),e}At(t){let e=this.Ye.get(t);return e||(e=new at(B),this.Ye=this.Ye.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new at(B),this.Je=this.Je.insert(t,e)),e}it(t){const e=this._t(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}_t(t){const e=this.je.get(t);return e&&e.Be?null:this.ze.Rt(t)}st(t){this.je.set(t,new wa),this.ze.getRemoteKeysForTarget(t).forEach(e=>{this.tt(t,e,null)})}dt(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function ir(){return new Z(O.comparator)}function Aa(){return new Z(O.comparator)}const Tf={asc:"ASCENDING",desc:"DESCENDING"},If={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},wf={and:"AND",or:"OR"};class Af{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Gs(n,t){return n.useProto3Json||Lr(t)?t:{value:t}}function Rr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Kc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Rf(n,t){return Rr(n,t.toTimestamp())}function Ot(n){return Q(!!n,49232),L.fromTimestamp(function(e){const r=ie(e);return new ot(r.seconds,r.nanos)}(n))}function pi(n,t){return Ks(n,t).canonicalString()}function Ks(n,t){const e=function(s){return new J(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Qc(n){const t=J.fromString(n);return Q(Zc(t),10190,{key:t.toString()}),t}function Qs(n,t){return pi(n.databaseId,t.path)}function Ps(n,t){const e=Qc(t);if(e.get(1)!==n.databaseId.projectId)throw new x(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new x(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new O(Xc(e))}function Wc(n,t){return pi(n.databaseId,t)}function Cf(n){const t=Qc(n);return t.length===4?J.emptyPath():Xc(t)}function Ws(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Xc(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ra(n,t,e){return{name:Qs(n,t),fields:e.value.mapValue.fields}}function Sf(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M(39313,{state:f})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(f,g){return f.useProto3Json?(Q(g===void 0||typeof g=="string",58123),mt.fromBase64String(g||"")):(Q(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),mt.fromUint8Array(g||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(f){const g=f.code===void 0?b.UNKNOWN:qc(f.code);return new x(g,f.message||"")}(a);e=new Gc(r,s,o,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ps(n,r.document.name),o=Ot(r.document.updateTime),a=r.document.createTime?Ot(r.document.createTime):L.min(),u=new bt({mapValue:{fields:r.document.fields}}),h=Tt.newFoundDocument(s,o,a,u),f=r.targetIds||[],g=r.removedTargetIds||[];e=new hr(f,g,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ps(n,r.document),o=r.readTime?Ot(r.readTime):L.min(),a=Tt.newNoDocument(s,o),u=r.removedTargetIds||[];e=new hr([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ps(n,r.document),o=r.removedTargetIds||[];e=new hr([],o,s,null)}else{if(!("filter"in t))return M(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new _f(s,o),u=r.targetId;e=new Hc(u,a)}}return e}function bf(n,t){let e;if(t instanceof Nn)e={update:Ra(n,t.key,t.value)};else if(t instanceof di)e={delete:Qs(n,t.key)};else if(t instanceof Te)e={update:Ra(n,t.key,t.data),updateMask:Lf(t.fieldMask)};else{if(!(t instanceof mf))return M(16599,{ft:t.type});e={verify:Qs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const u=a.transform;if(u instanceof wr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Vn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Dn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ar)return{fieldPath:a.field.canonicalString(),increment:u.Re};throw M(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Rf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M(27497)}(n,t.precondition)),e}function Pf(n,t){return n&&n.length>0?(Q(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Ot(s.updateTime):Ot(o);return a.isEqual(L.min())&&(a=Ot(o)),new hf(a,s.transformResults||[])}(e,t))):[]}function Vf(n,t){return{documents:[Wc(n,t.path)]}}function Df(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Wc(n,s);const o=function(f){if(f.length!==0)return Jc(Lt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(f){if(f.length!==0)return f.map(g=>function(w){return{field:Pe(w.field),direction:xf(w.dir)}}(g))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Gs(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{gt:e,parent:s}}function kf(n){let t=Cf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){Q(r===1,65062);const g=e.from[0];g.allDescendants?s=g.collectionId:t=t.child(g.collectionId)}let o=[];e.where&&(o=function(E){const w=Yc(E);return w instanceof Lt&&bc(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(E){return E.map(w=>function(V){return new Ir(Ve(V.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(w))}(e.orderBy));let u=null;e.limit&&(u=function(E){let w;return w=typeof E=="object"?E.value:E,Lr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(E){const w=!!E.before,S=E.values||[];return new Tr(S,w)}(e.startAt));let f=null;return e.endAt&&(f=function(E){const w=!E.before,S=E.values||[];return new Tr(S,w)}(e.endAt)),Xd(t,s,a,o,u,"F",h,f)}function Nf(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Yc(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ve(e.unaryFilter.field);return it.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ve(e.unaryFilter.field);return it.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ve(e.unaryFilter.field);return it.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ve(e.unaryFilter.field);return it.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(e){return it.create(Ve(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Lt.create(e.compositeFilter.filters.map(r=>Yc(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(n):M(30097,{filter:n})}function xf(n){return Tf[n]}function Of(n){return If[n]}function Mf(n){return wf[n]}function Pe(n){return{fieldPath:n.canonicalString()}}function Ve(n){return ft.fromServerFormat(n.fieldPath)}function Jc(n){return n instanceof it?function(e){if(e.op==="=="){if(da(e.value))return{unaryFilter:{field:Pe(e.field),op:"IS_NAN"}};if(ha(e.value))return{unaryFilter:{field:Pe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(da(e.value))return{unaryFilter:{field:Pe(e.field),op:"IS_NOT_NAN"}};if(ha(e.value))return{unaryFilter:{field:Pe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Pe(e.field),op:Of(e.op),value:e.value}}}(n):n instanceof Lt?function(e){const r=e.getFilters().map(s=>Jc(s));return r.length===1?r[0]:{compositeFilter:{op:Mf(e.op),filters:r}}}(n):M(54877,{filter:n})}function Lf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Zc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e,r,s,o=L.min(),a=L.min(),u=mt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(t){return new Jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(t){this.wt=t}}function Bf(n){const t=kf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Hs(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(){this.Cn=new jf}addToCollectionParentIndex(t,e){return this.Cn.add(e),C.resolve()}getCollectionParents(t,e){return C.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return C.resolve()}deleteFieldIndex(t,e){return C.resolve()}deleteAllFieldIndexes(t){return C.resolve()}createTargetIndexes(t,e){return C.resolve()}getDocumentsMatchingTarget(t,e){return C.resolve(null)}getIndexType(t,e){return C.resolve(0)}getFieldIndexes(t,e){return C.resolve([])}getNextCollectionGroupToUpdate(t){return C.resolve(null)}getMinOffset(t,e){return C.resolve(se.min())}getMinOffsetFromCollectionGroup(t,e){return C.resolve(se.min())}updateCollectionGroup(t,e,r){return C.resolve()}updateIndexEntries(t,e){return C.resolve()}}class jf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new at(J.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new at(J.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},tl=41943040;class Rt{static withCacheSize(t){return new Rt(t,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rt.DEFAULT_COLLECTION_PERCENTILE=10,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Rt.DEFAULT=new Rt(tl,Rt.DEFAULT_COLLECTION_PERCENTILE,Rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Rt.DISABLED=new Rt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(t){this.ur=t}next(){return this.ur+=2,this.ur}static cr(){return new Be(0)}static lr(){return new Be(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="LruGarbageCollector",zf=1048576;function ba([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class $f{constructor(t){this.Er=t,this.buffer=new at(ba),this.dr=0}Ar(){return++this.dr}Rr(t){const e=[t,this.Ar()];if(this.buffer.size<this.Er)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();ba(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class qf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Vr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.mr(6e4)}stop(){this.Vr&&(this.Vr.cancel(),this.Vr=null)}get started(){return this.Vr!==null}mr(t){k(Sa,`Garbage collection scheduled in ${t}ms`),this.Vr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Vr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ke(e)?k(Sa,"Ignoring IndexedDB error during garbage collection: ",e):await Ge(e)}await this.mr(3e5)})}}class Hf{constructor(t,e){this.gr=t,this.params=e}calculateTargetCount(t,e){return this.gr.pr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return C.resolve(Mr.le);const r=new $f(e);return this.gr.forEachTarget(t,s=>r.Rr(s.sequenceNumber)).next(()=>this.gr.yr(t,s=>r.Rr(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.gr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.gr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Ca)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ca):this.wr(t,e))}getCacheSize(t){return this.gr.getCacheSize(t)}wr(t,e){let r,s,o,a,u,h,f;const g=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(E=>(E>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${E}`),s=this.params.maximumSequenceNumbersToCollect):s=E,a=Date.now(),this.nthSequenceNumber(t,s))).next(E=>(r=E,u=Date.now(),this.removeTargets(t,r,e))).next(E=>(o=E,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(E=>(f=Date.now(),Se()<=q.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-g}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${E} documents in `+(f-h)+`ms
Total Duration: ${f-g}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:E})))}}function Gf(n,t){return new Hf(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(){this.changes=new ve(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Tt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?C.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&In(r.mutation,s,Dt.empty(),ot.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,j()).next(()=>r))}getLocalViewOfDocuments(t,e,r=j()){const s=pe();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=pn();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=pe();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,j()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,r,s){let o=Gt();const a=Tn(),u=function(){return Tn()}();return e.forEach((h,f)=>{const g=r.get(f.key);s.has(f.key)&&(g===void 0||g.mutation instanceof Te)?o=o.insert(f.key,f):g!==void 0?(a.set(f.key,g.mutation.getFieldMask()),In(g.mutation,f,g.mutation.getFieldMask(),ot.now())):a.set(f.key,Dt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,g)=>a.set(f,g)),e.forEach((f,g)=>{var E;return u.set(f,new Qf(g,(E=a.get(f))!==null&&E!==void 0?E:null))}),u))}recalculateAndSaveOverlays(t,e){const r=Tn();let s=new Z((a,u)=>a-u),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let g=r.get(h)||Dt.empty();g=u.applyToLocalView(f,g),r.set(h,g);const E=(s.get(u.batchId)||j()).add(h);s=s.insert(u.batchId,E)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,g=h.value,E=Mc();g.forEach(w=>{if(!o.has(w)){const S=zc(e.get(w),r.get(w));S!==null&&E.set(w,S),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,f,E))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Yd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):C.resolve(pe());let u=Cn,h=o;return a.next(f=>C.forEach(f,(g,E)=>(u<E.largestBatchId&&(u=E.largestBatchId),o.get(g)?C.resolve():this.remoteDocumentCache.getEntry(t,g).next(w=>{h=h.insert(g,w)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,j())).next(g=>({batchId:u,changes:Oc(g)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(r=>{let s=pn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=pn();return this.indexManager.getCollectionParents(t,o).next(u=>C.forEach(u,h=>{const f=function(E,w){return new Br(w,null,E.explicitOrderBy.slice(),E.filters.slice(),E.limit,E.limitType,E.startAt,E.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next(g=>{g.forEach((E,w)=>{a=a.insert(E,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,f)=>{const g=f.getKey();a.get(g)===null&&(a=a.insert(g,Tt.newInvalidDocument(g)))});let u=pn();return a.forEach((h,f)=>{const g=o.get(h);g!==void 0&&In(g.mutation,f,Dt.empty(),ot.now()),zr(e,f)&&(u=u.insert(h,f))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(t){this.serializer=t,this.kr=new Map,this.qr=new Map}getBundleMetadata(t,e){return C.resolve(this.kr.get(e))}saveBundleMetadata(t,e){return this.kr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Ot(s.createTime)}}(e)),C.resolve()}getNamedQuery(t,e){return C.resolve(this.qr.get(e))}saveNamedQuery(t,e){return this.qr.set(e.name,function(s){return{name:s.name,query:Bf(s.bundledQuery),readTime:Ot(s.readTime)}}(e)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(){this.overlays=new Z(O.comparator),this.Qr=new Map}getOverlay(t,e){return C.resolve(this.overlays.get(e))}getOverlays(t,e){const r=pe();return C.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),C.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Qr.delete(r)),C.resolve()}getOverlaysForCollection(t,e,r){const s=pe(),o=e.length+1,a=new O(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return C.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new Z((f,g)=>f-g);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let g=o.get(f.largestBatchId);g===null&&(g=pe(),o=o.insert(f.largestBatchId,g)),g.set(f.getKey(),f)}}const u=pe(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,g)=>u.set(f,g)),!(u.size()>=s)););return C.resolve(u)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Qr.get(s.largestBatchId).delete(r.key);this.Qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new gf(e,r));let o=this.Qr.get(e);o===void 0&&(o=j(),this.Qr.set(e,o)),this.Qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(){this.sessionToken=mt.EMPTY_BYTE_STRING}getSessionToken(t){return C.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(){this.$r=new at(ct.Ur),this.Kr=new at(ct.Wr)}isEmpty(){return this.$r.isEmpty()}addReference(t,e){const r=new ct(t,e);this.$r=this.$r.add(r),this.Kr=this.Kr.add(r)}Gr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.zr(new ct(t,e))}jr(t,e){t.forEach(r=>this.removeReference(r,e))}Hr(t){const e=new O(new J([])),r=new ct(e,t),s=new ct(e,t+1),o=[];return this.Kr.forEachInRange([r,s],a=>{this.zr(a),o.push(a.key)}),o}Jr(){this.$r.forEach(t=>this.zr(t))}zr(t){this.$r=this.$r.delete(t),this.Kr=this.Kr.delete(t)}Yr(t){const e=new O(new J([])),r=new ct(e,t),s=new ct(e,t+1);let o=j();return this.Kr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new ct(t,0),r=this.$r.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ct{constructor(t,e){this.key=t,this.Zr=e}static Ur(t,e){return O.comparator(t.key,e.key)||B(t.Zr,e.Zr)}static Wr(t,e){return B(t.Zr,e.Zr)||O.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.nr=1,this.Xr=new at(ct.Ur)}checkEmpty(t){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.nr;this.nr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new pf(o,e,r,s);this.mutationQueue.push(a);for(const u of s)this.Xr=this.Xr.add(new ct(u.key,o)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return C.resolve(a)}lookupMutationBatch(t,e){return C.resolve(this.ei(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ti(r),o=s<0?0:s;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?oi:this.nr-1)}getAllMutationBatches(t){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ct(e,0),s=new ct(e,Number.POSITIVE_INFINITY),o=[];return this.Xr.forEachInRange([r,s],a=>{const u=this.ei(a.Zr);o.push(u)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new at(B);return e.forEach(s=>{const o=new ct(s,0),a=new ct(s,Number.POSITIVE_INFINITY);this.Xr.forEachInRange([o,a],u=>{r=r.add(u.Zr)})}),C.resolve(this.ni(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;O.isDocumentKey(o)||(o=o.child(""));const a=new ct(new O(o),0);let u=new at(B);return this.Xr.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.Zr)),!0)},a),C.resolve(this.ni(u))}ni(t){const e=[];return t.forEach(r=>{const s=this.ei(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){Q(this.ri(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Xr;return C.forEach(e.mutations,s=>{const o=new ct(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Xr=r})}sr(t){}containsKey(t,e){const r=new ct(e,0),s=this.Xr.firstAfterOrEqual(r);return C.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,C.resolve()}ri(t,e){return this.ti(t)}ti(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}ei(t){const e=this.ti(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(t){this.ii=t,this.docs=function(){return new Z(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ii(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return C.resolve(r?r.document.mutableCopy():Tt.newInvalidDocument(e))}getEntries(t,e){let r=Gt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Tt.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Gt();const a=e.path,u=new O(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:g}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||bd(Sd(g),r)<=0||(s.has(g.key)||zr(e,g))&&(o=o.insert(g.key,g.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(t,e,r,s){M(9500)}si(t,e){return C.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new em(this)}getSize(t){return C.resolve(this.size)}}class em extends Kf{constructor(t){super(),this.Br=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Br.addEntry(t,s)):this.Br.removeEntry(r)}),C.waitFor(e)}getFromCache(t,e){return this.Br.getEntry(t,e)}getAllFromCache(t,e){return this.Br.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(t){this.persistence=t,this.oi=new ve(e=>li(e),ui),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this._i=0,this.ai=new gi,this.targetCount=0,this.ui=Be.cr()}forEachTarget(t,e){return this.oi.forEach((r,s)=>e(s)),C.resolve()}getLastRemoteSnapshotVersion(t){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return C.resolve(this._i)}allocateTargetId(t){return this.highestTargetId=this.ui.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this._i&&(this._i=e),C.resolve()}Tr(t){this.oi.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ui=new Be(e),this.highestTargetId=e),t.sequenceNumber>this._i&&(this._i=t.sequenceNumber)}addTargetData(t,e){return this.Tr(e),this.targetCount+=1,C.resolve()}updateTargetData(t,e){return this.Tr(e),C.resolve()}removeTargetData(t,e){return this.oi.delete(e.target),this.ai.Hr(e.targetId),this.targetCount-=1,C.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.oi.forEach((a,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.oi.delete(a),o.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),C.waitFor(o).next(()=>s)}getTargetCount(t){return C.resolve(this.targetCount)}getTargetData(t,e){const r=this.oi.get(e)||null;return C.resolve(r)}addMatchingKeys(t,e,r){return this.ai.Gr(e,r),C.resolve()}removeMatchingKeys(t,e,r){this.ai.jr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.ai.Hr(e),C.resolve()}getMatchingKeysForTargetId(t,e){const r=this.ai.Yr(e);return C.resolve(r)}containsKey(t,e){return C.resolve(this.ai.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(t,e){this.ci={},this.overlays={},this.li=new Mr(0),this.hi=!1,this.hi=!0,this.Pi=new Jf,this.referenceDelegate=t(this),this.Ti=new nm(this),this.indexManager=new Uf,this.remoteDocumentCache=function(s){return new tm(s)}(r=>this.referenceDelegate.Ii(r)),this.serializer=new Ff(e),this.Ei=new Xf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.hi=!1,Promise.resolve()}get started(){return this.hi}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Yf,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ci[t.toKey()];return r||(r=new Zf(e,this.referenceDelegate),this.ci[t.toKey()]=r),r}getGlobalsCache(){return this.Pi}getTargetCache(){return this.Ti}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ei}runTransaction(t,e,r){k("MemoryPersistence","Starting transaction:",t);const s=new rm(this.li.next());return this.referenceDelegate.di(),r(s).next(o=>this.referenceDelegate.Ai(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ri(t,e){return C.or(Object.values(this.ci).map(r=>()=>r.containsKey(t,e)))}}class rm extends Vd{constructor(t){super(),this.currentSequenceNumber=t}}class _i{constructor(t){this.persistence=t,this.Vi=new gi,this.mi=null}static fi(t){return new _i(t)}get gi(){if(this.mi)return this.mi;throw M(60996)}addReference(t,e,r){return this.Vi.addReference(r,e),this.gi.delete(r.toString()),C.resolve()}removeReference(t,e,r){return this.Vi.removeReference(r,e),this.gi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(t,e){return this.gi.add(e.toString()),C.resolve()}removeTarget(t,e){this.Vi.Hr(e.targetId).forEach(s=>this.gi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.gi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}di(){this.mi=new Set}Ai(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.gi,r=>{const s=O.fromPath(r);return this.pi(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.mi=null,e.apply(t)))}updateLimboDocument(t,e){return this.pi(t,e).next(r=>{r?this.gi.delete(e.toString()):this.gi.add(e.toString())})}Ii(t){return 0}pi(t,e){return C.or([()=>C.resolve(this.Vi.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ri(t,e)])}}class Cr{constructor(t,e){this.persistence=t,this.yi=new ve(r=>Nd(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Gf(this,e)}static fi(t,e){return new Cr(t,e)}di(){}Ai(t){return C.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}pr(t){const e=this.br(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}br(t){let e=0;return this.yr(t,r=>{e++}).next(()=>e)}yr(t,e){return C.forEach(this.yi,(r,s)=>this.Dr(t,r,s).next(o=>o?C.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.si(t,a=>this.Dr(t,a,e).next(u=>{u||(r++,o.removeEntry(a,L.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.yi.set(e,t.currentSequenceNumber),C.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),C.resolve()}removeReference(t,e,r){return this.yi.set(r,t.currentSequenceNumber),C.resolve()}updateLimboDocument(t,e){return this.yi.set(e,t.currentSequenceNumber),C.resolve()}Ii(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=cr(t.data.value)),e}Dr(t,e,r){return C.or([()=>this.persistence.Ri(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.yi.get(e);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.ds=r,this.As=s}static Rs(t,e){let r=j(),s=j();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new yi(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(){this.Vs=!1,this.fs=!1,this.gs=100,this.ps=function(){return Yu()?8:Dd(Wu())>0?6:4}()}initialize(t,e){this.ys=t,this.indexManager=e,this.Vs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ws(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.bs(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new sm;return this.Ss(t,e,a).next(u=>{if(o.result=u,this.fs)return this.Ds(t,e,a,u.size)})}).next(()=>o.result)}Ds(t,e,r,s){return r.documentReadCount<this.gs?(Se()<=q.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",be(e),"since it only creates cache indexes for collection contains","more than or equal to",this.gs,"documents"),C.resolve()):(Se()<=q.DEBUG&&k("QueryEngine","Query:",be(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ps*s?(Se()<=q.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",be(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Nt(e))):C.resolve())}ws(t,e){if(ga(e))return C.resolve(null);let r=Nt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Hs(e,null,"F"),r=Nt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=j(...o);return this.ys.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.vs(e,u);return this.Cs(e,f,a,h.readTime)?this.ws(t,Hs(e,null,"F")):this.Fs(t,f,e,h)}))})))}bs(t,e,r,s){return ga(e)||s.isEqual(L.min())?C.resolve(null):this.ys.getDocuments(t,r).next(o=>{const a=this.vs(e,o);return this.Cs(e,a,r,s)?C.resolve(null):(Se()<=q.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),be(e)),this.Fs(t,a,e,Cd(s,Cn)).next(u=>u))})}vs(t,e){let r=new at(Nc(t));return e.forEach((s,o)=>{zr(t,o)&&(r=r.add(o))}),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(t,e,r){return Se()<=q.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",be(e)),this.ys.getDocumentsMatchingQuery(t,e,se.min(),r)}Fs(t,e,r,s){return this.ys.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei="LocalStore",om=3e8;class am{constructor(t,e,r,s){this.persistence=t,this.Ms=e,this.serializer=s,this.xs=new Z(B),this.Os=new ve(o=>li(o),ui),this.Ns=new Map,this.Bs=t.getRemoteDocumentCache(),this.Ti=t.getTargetCache(),this.Ei=t.getBundleCache(),this.Ls(r)}Ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Wf(this.Bs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Ms.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.xs))}}function cm(n,t,e,r){return new am(n,t,e,r)}async function nl(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],u=[];let h=j();for(const f of s){a.push(f.batchId);for(const g of f.mutations)h=h.add(g.key)}for(const f of o){u.push(f.batchId);for(const g of f.mutations)h=h.add(g.key)}return e.localDocuments.getDocuments(r,h).next(f=>({ks:f,removedBatchIds:a,addedBatchIds:u}))})})}function lm(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Bs.newChangeBuffer({trackRemovals:!0});return function(u,h,f,g){const E=f.batch,w=E.keys();let S=C.resolve();return w.forEach(V=>{S=S.next(()=>g.getEntry(h,V)).next(N=>{const D=f.docVersions.get(V);Q(D!==null,48541),N.version.compareTo(D)<0&&(E.applyToRemoteDocument(N,f),N.isValidDocument()&&(N.setReadTime(f.commitVersion),g.addEntry(N)))})}),S.next(()=>u.mutationQueue.removeMutationBatch(h,E))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=j();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(h=h.add(u.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function rl(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ti.getLastRemoteSnapshotVersion(e))}function um(n,t){const e=F(n),r=t.snapshotVersion;let s=e.xs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Bs.newChangeBuffer({trackRemovals:!0});s=e.xs;const u=[];t.targetChanges.forEach((g,E)=>{const w=s.get(E);if(!w)return;u.push(e.Ti.removeMatchingKeys(o,g.removedDocuments,E).next(()=>e.Ti.addMatchingKeys(o,g.addedDocuments,E)));let S=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(E)!==null?S=S.withResumeToken(mt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):g.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(g.resumeToken,r)),s=s.insert(E,S),function(N,D,H){return N.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=om?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(w,S,g)&&u.push(e.Ti.updateTargetData(o,S))});let h=Gt(),f=j();if(t.documentUpdates.forEach(g=>{t.resolvedLimboDocuments.has(g)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(o,g))}),u.push(hm(o,a,t.documentUpdates).next(g=>{h=g.qs,f=g.Qs})),!r.isEqual(L.min())){const g=e.Ti.getLastRemoteSnapshotVersion(o).next(E=>e.Ti.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(g)}return C.waitFor(u).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.xs=s,o))}function hm(n,t,e){let r=j(),s=j();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Gt();return e.forEach((u,h)=>{const f=o.get(u);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(u,h.readTime),a=a.insert(u,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(u,h)):k(Ei,"Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",h.version)}),{qs:a,Qs:s}})}function dm(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=oi),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function fm(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Ti.getTargetData(r,t).next(o=>o?(s=o,C.resolve(s)):e.Ti.allocateTargetId(r).next(a=>(s=new Jt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Ti.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.xs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.xs=e.xs.insert(r.targetId,r),e.Os.set(t,r.targetId)),r})}async function Xs(n,t,e){const r=F(n),s=r.xs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ke(a))throw a;k(Ei,`Failed to update sequence numbers for target ${t}: ${a}`)}r.xs=r.xs.remove(t),r.Os.delete(s.target)}function Pa(n,t,e){const r=F(n);let s=L.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,f,g){const E=F(h),w=E.Os.get(g);return w!==void 0?C.resolve(E.xs.get(w)):E.Ti.getTargetData(f,g)}(r,a,Nt(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.Ti.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>r.Ms.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:j())).next(u=>(mm(r,Zd(t),u),{documents:u,$s:o})))}function mm(n,t,e){let r=n.Ns.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Ns.set(t,r)}class Va{constructor(){this.activeTargetIds=of()}js(t){this.activeTargetIds=this.activeTargetIds.add(t)}Hs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}zs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class pm{constructor(){this.xo=new Va,this.Oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.xo.js(t),this.Oo[t]||"not-current"}updateQueryState(t,e,r){this.Oo[t]=e}removeLocalQueryTarget(t){this.xo.Hs(t)}isLocalQueryTarget(t){return this.xo.activeTargetIds.has(t)}clearQueryState(t){delete this.Oo[t]}getAllActiveQueryTargets(){return this.xo.activeTargetIds}isActiveQueryTarget(t){return this.xo.activeTargetIds.has(t)}start(){return this.xo=new Va,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{No(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="ConnectivityMonitor";class ka{constructor(){this.Bo=()=>this.Lo(),this.ko=()=>this.qo(),this.Qo=[],this.$o()}No(t){this.Qo.push(t)}shutdown(){window.removeEventListener("online",this.Bo),window.removeEventListener("offline",this.ko)}$o(){window.addEventListener("online",this.Bo),window.addEventListener("offline",this.ko)}Lo(){k(Da,"Network connectivity changed: AVAILABLE");for(const t of this.Qo)t(0)}qo(){k(Da,"Network connectivity changed: UNAVAILABLE");for(const t of this.Qo)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let or=null;function Ys(){return or===null?or=function(){return 268435456+Math.round(2147483648*Math.random())}():or++,"0x"+or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="RestConnection",_m={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class ym{get Uo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Wo=`projects/${r}/databases/${s}`,this.Go=this.databaseId.database===Er?`project_id=${r}`:`project_id=${r}&database_id=${s}`}zo(t,e,r,s,o){const a=Ys(),u=this.jo(t,e.toUriEncodedString());k(Vs,`Sending RPC '${t}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Wo,"x-goog-request-params":this.Go};this.Ho(h,s,o);const{host:f}=new URL(u),g=ri(f);return this.Jo(t,u,h,r,g).then(E=>(k(Vs,`Received RPC '${t}' ${a}: `,E),E),E=>{throw Oe(Vs,`RPC '${t}' ${a} failed with error: `,E,"url: ",u,"request:",r),E})}Yo(t,e,r,s,o,a){return this.zo(t,e,r,s,o)}Ho(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+He}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}jo(t,e){const r=_m[t];return`${this.Ko}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(t){this.Zo=t.Zo,this.Xo=t.Xo}e_(t){this.t_=t}n_(t){this.r_=t}i_(t){this.s_=t}onMessage(t){this.o_=t}close(){this.Xo()}send(t){this.Zo(t)}__(){this.t_()}a_(){this.r_()}u_(t){this.s_(t)}c_(t){this.o_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et="WebChannelConnection";class vm extends ym{constructor(t){super(t),this.l_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ys();return new Promise((u,h)=>{const f=new ac;f.setWithCredentials(!0),f.listenOnce(cc.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case ar.NO_ERROR:const E=f.getResponseJson();k(Et,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(E)),u(E);break;case ar.TIMEOUT:k(Et,`RPC '${t}' ${a} timed out`),h(new x(b.DEADLINE_EXCEEDED,"Request time out"));break;case ar.HTTP_ERROR:const w=f.getStatus();if(k(Et,`RPC '${t}' ${a} failed with status:`,w,"response text:",f.getResponseText()),w>0){let S=f.getResponseJson();Array.isArray(S)&&(S=S[0]);const V=S?.error;if(V&&V.status&&V.message){const N=function(H){const U=H.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(U)>=0?U:b.UNKNOWN}(V.status);h(new x(N,V.message))}else h(new x(b.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new x(b.UNAVAILABLE,"Connection failed."));break;default:M(9055,{h_:t,streamId:a,P_:f.getLastErrorCode(),T_:f.getLastError()})}}finally{k(Et,`RPC '${t}' ${a} completed.`)}});const g=JSON.stringify(s);k(Et,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",g,r,15)})}I_(t,e,r){const s=Ys(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=hc(),u=uc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Ho(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const g=o.join("");k(Et,`Creating RPC '${t}' stream ${s}: ${g}`,h);const E=a.createWebChannel(g,h);this.E_(E);let w=!1,S=!1;const V=new Em({Zo:D=>{S?k(Et,`Not sending because RPC '${t}' stream ${s} is closed:`,D):(w||(k(Et,`Opening RPC '${t}' stream ${s} transport.`),E.open(),w=!0),k(Et,`RPC '${t}' stream ${s} sending:`,D),E.send(D))},Xo:()=>E.close()}),N=(D,H,U)=>{D.listen(H,G=>{try{U(G)}catch(rt){setTimeout(()=>{throw rt},0)}})};return N(E,mn.EventType.OPEN,()=>{S||(k(Et,`RPC '${t}' stream ${s} transport opened.`),V.__())}),N(E,mn.EventType.CLOSE,()=>{S||(S=!0,k(Et,`RPC '${t}' stream ${s} transport closed`),V.u_(),this.d_(E))}),N(E,mn.EventType.ERROR,D=>{S||(S=!0,Oe(Et,`RPC '${t}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),V.u_(new x(b.UNAVAILABLE,"The operation could not be completed")))}),N(E,mn.EventType.MESSAGE,D=>{var H;if(!S){const U=D.data[0];Q(!!U,16349);const G=U,rt=G?.error||((H=G[0])===null||H===void 0?void 0:H.error);if(rt){k(Et,`RPC '${t}' stream ${s} received error:`,rt);const Ft=rt.status;let lt=function(_){const y=st[_];if(y!==void 0)return qc(y)}(Ft),T=rt.message;lt===void 0&&(lt=b.INTERNAL,T="Unknown error status: "+Ft+" with message "+rt.message),S=!0,V.u_(new x(lt,T)),E.close()}else k(Et,`RPC '${t}' stream ${s} received:`,U),V.c_(U)}}),N(u,lc.STAT_EVENT,D=>{D.stat===Bs.PROXY?k(Et,`RPC '${t}' stream ${s} detected buffering proxy`):D.stat===Bs.NOPROXY&&k(Et,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{V.a_()},0),V}terminate(){this.l_.forEach(t=>t.close()),this.l_=[]}E_(t){this.l_.push(t)}d_(t){this.l_=this.l_.filter(e=>e===t)}}function Ds(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(n){return new Af(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(t,e,r=1e3,s=1.5,o=6e4){this.xi=t,this.timerId=e,this.A_=r,this.R_=s,this.V_=o,this.m_=0,this.f_=null,this.g_=Date.now(),this.reset()}reset(){this.m_=0}p_(){this.m_=this.V_}y_(t){this.cancel();const e=Math.floor(this.m_+this.w_()),r=Math.max(0,Date.now()-this.g_),s=Math.max(0,e-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.m_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.f_=this.xi.enqueueAfterDelay(this.timerId,s,()=>(this.g_=Date.now(),t())),this.m_*=this.R_,this.m_<this.A_&&(this.m_=this.A_),this.m_>this.V_&&(this.m_=this.V_)}b_(){this.f_!==null&&(this.f_.skipDelay(),this.f_=null)}cancel(){this.f_!==null&&(this.f_.cancel(),this.f_=null)}w_(){return(Math.random()-.5)*this.m_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na="PersistentStream";class il{constructor(t,e,r,s,o,a,u,h){this.xi=t,this.S_=r,this.D_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.v_=0,this.C_=null,this.F_=null,this.stream=null,this.M_=0,this.x_=new sl(t,e)}O_(){return this.state===1||this.state===5||this.N_()}N_(){return this.state===2||this.state===3}start(){this.M_=0,this.state!==4?this.auth():this.B_()}async stop(){this.O_()&&await this.close(0)}L_(){this.state=0,this.x_.reset()}k_(){this.N_()&&this.C_===null&&(this.C_=this.xi.enqueueAfterDelay(this.S_,6e4,()=>this.q_()))}Q_(t){this.U_(),this.stream.send(t)}async q_(){if(this.N_())return this.close(0)}U_(){this.C_&&(this.C_.cancel(),this.C_=null)}K_(){this.F_&&(this.F_.cancel(),this.F_=null)}async close(t,e){this.U_(),this.K_(),this.x_.cancel(),this.v_++,t!==4?this.x_.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(Ht(e.toString()),Ht("Using maximum backoff delay to prevent overloading the backend."),this.x_.p_()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.i_(e)}W_(){}auth(){this.state=1;const t=this.G_(this.v_),e=this.v_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.v_===e&&this.z_(r,s)},r=>{t(()=>{const s=new x(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.j_(s)})})}z_(t,e){const r=this.G_(this.v_);this.stream=this.H_(t,e),this.stream.e_(()=>{r(()=>this.listener.e_())}),this.stream.n_(()=>{r(()=>(this.state=2,this.F_=this.xi.enqueueAfterDelay(this.D_,1e4,()=>(this.N_()&&(this.state=3),Promise.resolve())),this.listener.n_()))}),this.stream.i_(s=>{r(()=>this.j_(s))}),this.stream.onMessage(s=>{r(()=>++this.M_==1?this.J_(s):this.onNext(s))})}B_(){this.state=5,this.x_.y_(async()=>{this.state=0,this.start()})}j_(t){return k(Na,`close with error: ${t}`),this.stream=null,this.close(4,t)}G_(t){return e=>{this.xi.enqueueAndForget(()=>this.v_===t?e():(k(Na,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Tm extends il{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}H_(t,e){return this.connection.I_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.x_.reset();const e=Sf(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Ot(a.readTime):L.min()}(t);return this.listener.Y_(e,r)}Z_(t){const e={};e.database=Ws(this.serializer),e.addTarget=function(o,a){let u;const h=a.target;if(u=qs(h)?{documents:Vf(o,h)}:{query:Df(o,h).gt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Kc(o,a.resumeToken);const f=Gs(o,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(L.min())>0){u.readTime=Rr(o,a.snapshotVersion.toTimestamp());const f=Gs(o,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,t);const r=Nf(this.serializer,t);r&&(e.labels=r),this.Q_(e)}X_(t){const e={};e.database=Ws(this.serializer),e.removeTarget=t,this.Q_(e)}}class Im extends il{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get ea(){return this.M_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.ea&&this.ta([])}H_(t,e){return this.connection.I_("Write",t,e)}J_(t){return Q(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,Q(!t.writeResults||t.writeResults.length===0,55816),this.listener.na()}onNext(t){Q(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.x_.reset();const e=Pf(t.writeResults,t.commitTime),r=Ot(t.commitTime);return this.listener.ra(r,e)}ia(){const t={};t.database=Ws(this.serializer),this.Q_(t)}ta(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>bf(this.serializer,r))};this.Q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{}class Am extends wm{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.sa=!1}oa(){if(this.sa)throw new x(b.FAILED_PRECONDITION,"The client has already been terminated.")}zo(t,e,r,s){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.zo(t,Ks(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(b.UNKNOWN,o.toString())})}Yo(t,e,r,s,o){return this.oa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Yo(t,Ks(e,r),s,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(b.UNKNOWN,a.toString())})}terminate(){this.sa=!0,this.connection.terminate()}}class Rm{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this._a=0,this.aa=null,this.ua=!0}ca(){this._a===0&&(this.la("Unknown"),this.aa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.aa=null,this.ha("Backend didn't respond within 10 seconds."),this.la("Offline"),Promise.resolve())))}Pa(t){this.state==="Online"?this.la("Unknown"):(this._a++,this._a>=1&&(this.Ta(),this.ha(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.la("Offline")))}set(t){this.Ta(),this._a=0,t==="Online"&&(this.ua=!1),this.la(t)}la(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ha(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ua?(Ht(e),this.ua=!1):k("OnlineStateTracker",e)}Ta(){this.aa!==null&&(this.aa.cancel(),this.aa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="RemoteStore";class Cm{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ia=[],this.Ea=new Map,this.da=new Set,this.Aa=[],this.Ra=o,this.Ra.No(a=>{r.enqueueAndForget(async()=>{Ie(this)&&(k(ye,"Restarting streams for network reachability change."),await async function(h){const f=F(h);f.da.add(4),await On(f),f.Va.set("Unknown"),f.da.delete(4),await Kr(f)}(this))})}),this.Va=new Rm(r,s)}}async function Kr(n){if(Ie(n))for(const t of n.Aa)await t(!0)}async function On(n){for(const t of n.Aa)await t(!1)}function ol(n,t){const e=F(n);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),wi(e)?Ii(e):Qe(e).N_()&&Ti(e,t))}function vi(n,t){const e=F(n),r=Qe(e);e.Ea.delete(t),r.N_()&&al(e,t),e.Ea.size===0&&(r.N_()?r.k_():Ie(e)&&e.Va.set("Unknown"))}function Ti(n,t){if(n.ma.Ke(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Qe(n).Z_(t)}function al(n,t){n.ma.Ke(t),Qe(n).X_(t)}function Ii(n){n.ma=new vf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),Rt:t=>n.Ea.get(t)||null,Pt:()=>n.datastore.serializer.databaseId}),Qe(n).start(),n.Va.ca()}function wi(n){return Ie(n)&&!Qe(n).O_()&&n.Ea.size>0}function Ie(n){return F(n).da.size===0}function cl(n){n.ma=void 0}async function Sm(n){n.Va.set("Online")}async function bm(n){n.Ea.forEach((t,e)=>{Ti(n,t)})}async function Pm(n,t){cl(n),wi(n)?(n.Va.Pa(t),Ii(n)):n.Va.set("Unknown")}async function Vm(n,t,e){if(n.Va.set("Online"),t instanceof Gc&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const u of o.targetIds)s.Ea.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ea.delete(u),s.ma.removeTarget(u))}(n,t)}catch(r){k(ye,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Sr(n,r)}else if(t instanceof hr?n.ma.Xe(t):t instanceof Hc?n.ma.ot(t):n.ma.nt(t),!e.isEqual(L.min()))try{const r=await rl(n.localStore);e.compareTo(r)>=0&&await function(o,a){const u=o.ma.It(a);return u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const g=o.Ea.get(f);g&&o.Ea.set(f,g.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{const g=o.Ea.get(h);if(!g)return;o.Ea.set(h,g.withResumeToken(mt.EMPTY_BYTE_STRING,g.snapshotVersion)),al(o,h);const E=new Jt(g.target,h,f,g.sequenceNumber);Ti(o,E)}),o.remoteSyncer.applyRemoteEvent(u)}(n,e)}catch(r){k(ye,"Failed to raise snapshot:",r),await Sr(n,r)}}async function Sr(n,t,e){if(!Ke(t))throw t;n.da.add(1),await On(n),n.Va.set("Offline"),e||(e=()=>rl(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{k(ye,"Retrying IndexedDB access"),await e(),n.da.delete(1),await Kr(n)})}function ll(n,t){return t().catch(e=>Sr(n,e,t))}async function Qr(n){const t=F(n),e=ce(t);let r=t.Ia.length>0?t.Ia[t.Ia.length-1].batchId:oi;for(;Dm(t);)try{const s=await dm(t.localStore,r);if(s===null){t.Ia.length===0&&e.k_();break}r=s.batchId,km(t,s)}catch(s){await Sr(t,s)}ul(t)&&hl(t)}function Dm(n){return Ie(n)&&n.Ia.length<10}function km(n,t){n.Ia.push(t);const e=ce(n);e.N_()&&e.ea&&e.ta(t.mutations)}function ul(n){return Ie(n)&&!ce(n).O_()&&n.Ia.length>0}function hl(n){ce(n).start()}async function Nm(n){ce(n).ia()}async function xm(n){const t=ce(n);for(const e of n.Ia)t.ta(e.mutations)}async function Om(n,t,e){const r=n.Ia.shift(),s=fi.from(r,t,e);await ll(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Qr(n)}async function Mm(n,t){t&&ce(n).ea&&await async function(r,s){if(function(a){return yf(a)&&a!==b.ABORTED}(s.code)){const o=r.Ia.shift();ce(r).L_(),await ll(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Qr(r)}}(n,t),ul(n)&&hl(n)}async function xa(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),k(ye,"RemoteStore received new credentials");const r=Ie(e);e.da.add(3),await On(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.da.delete(3),await Kr(e)}async function Lm(n,t){const e=F(n);t?(e.da.delete(2),await Kr(e)):t||(e.da.add(2),await On(e),e.Va.set("Unknown"))}function Qe(n){return n.fa||(n.fa=function(e,r,s){const o=F(e);return o.oa(),new Tm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{e_:Sm.bind(null,n),n_:bm.bind(null,n),i_:Pm.bind(null,n),Y_:Vm.bind(null,n)}),n.Aa.push(async t=>{t?(n.fa.L_(),wi(n)?Ii(n):n.Va.set("Unknown")):(await n.fa.stop(),cl(n))})),n.fa}function ce(n){return n.ga||(n.ga=function(e,r,s){const o=F(e);return o.oa(),new Im(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{e_:()=>Promise.resolve(),n_:Nm.bind(null,n),i_:Mm.bind(null,n),na:xm.bind(null,n),ra:Om.bind(null,n)}),n.Aa.push(async t=>{t?(n.ga.L_(),await Qr(n)):(await n.ga.stop(),n.Ia.length>0&&(k(ye,`Stopping write stream with ${n.Ia.length} pending writes`),n.Ia=[]))})),n.ga}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new ne,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,u=new Ai(t,e,a,s,o);return u.start(r),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ri(n,t){if(Ht("AsyncQueue",`${t}: ${n}`),Ke(n))return new x(b.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{static emptySet(t){return new Ne(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||O.comparator(e.key,r.key):(e,r)=>O.comparator(e.key,r.key),this.keyedMap=pn(),this.sortedSet=new Z(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Ne)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Ne;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(){this.pa=new Z(O.comparator)}track(t){const e=t.doc.key,r=this.pa.get(e);r?t.type!==0&&r.type===3?this.pa=this.pa.insert(e,t):t.type===3&&r.type!==1?this.pa=this.pa.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.pa=this.pa.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.pa=this.pa.remove(e):t.type===1&&r.type===2?this.pa=this.pa.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.pa=this.pa.insert(e,{type:2,doc:t.doc}):M(63341,{Vt:t,ya:r}):this.pa=this.pa.insert(e,t)}wa(){const t=[];return this.pa.inorderTraversal((e,r)=>{t.push(r)}),t}}class Ue{constructor(t,e,r,s,o,a,u,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new Ue(t,e,Ne.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&jr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(){this.ba=void 0,this.Sa=[]}Da(){return this.Sa.some(t=>t.va())}}class Bm{constructor(){this.queries=Ma(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Ma(),o.forEach((a,u)=>{for(const h of u.Sa)h.onError(r)})})(this,new x(b.ABORTED,"Firestore shutting down"))}}function Ma(){return new ve(n=>kc(n),jr)}async function dl(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.Da()&&t.va()&&(r=2):(o=new Fm,r=t.va()?0:1);try{switch(r){case 0:o.ba=await e.onListen(s,!0);break;case 1:o.ba=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=Ri(a,`Initialization of query '${be(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,o),o.Sa.push(t),t.Fa(e.onlineState),o.ba&&t.Ma(o.ba)&&Ci(e)}async function fl(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.va()?0:1:!o.Da()&&t.va()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Um(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const u of a.Sa)u.Ma(s)&&(r=!0);a.ba=s}}r&&Ci(e)}function jm(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function Ci(n){n.Ca.forEach(t=>{t.next()})}var Js,La;(La=Js||(Js={})).xa="default",La.Cache="cache";class ml{constructor(t,e,r){this.query=t,this.Oa=e,this.Na=!1,this.Ba=null,this.onlineState="Unknown",this.options=r||{}}Ma(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Ue(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Na?this.La(t)&&(this.Oa.next(t),e=!0):this.ka(t,this.onlineState)&&(this.qa(t),e=!0),this.Ba=t,e}onError(t){this.Oa.error(t)}Fa(t){this.onlineState=t;let e=!1;return this.Ba&&!this.Na&&this.ka(this.Ba,t)&&(this.qa(this.Ba),e=!0),e}ka(t,e){if(!t.fromCache||!this.va())return!0;const r=e!=="Offline";return(!this.options.Qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}La(t){if(t.docChanges.length>0)return!0;const e=this.Ba&&this.Ba.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}qa(t){t=Ue.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Na=!0,this.Oa.next(t)}va(){return this.options.source!==Js.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(t){this.key=t}}class gl{constructor(t){this.key=t}}class zm{constructor(t,e){this.query=t,this.Ha=e,this.Ja=null,this.hasCachedResults=!1,this.current=!1,this.Ya=j(),this.mutatedKeys=j(),this.Za=Nc(t),this.Xa=new Ne(this.Za)}get eu(){return this.Ha}tu(t,e){const r=e?e.nu:new Oa,s=e?e.Xa:this.Xa;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((g,E)=>{const w=s.get(g),S=zr(this.query,E)?E:null,V=!!w&&this.mutatedKeys.has(w.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let D=!1;w&&S?w.data.isEqual(S.data)?V!==N&&(r.track({type:3,doc:S}),D=!0):this.ru(w,S)||(r.track({type:2,doc:S}),D=!0,(h&&this.Za(S,h)>0||f&&this.Za(S,f)<0)&&(u=!0)):!w&&S?(r.track({type:0,doc:S}),D=!0):w&&!S&&(r.track({type:1,doc:w}),D=!0,(h||f)&&(u=!0)),D&&(S?(a=a.add(S),o=N?o.add(g):o.delete(g)):(a=a.delete(g),o=o.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),o=o.delete(g.key),r.track({type:1,doc:g})}return{Xa:a,nu:r,Cs:u,mutatedKeys:o}}ru(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Xa;this.Xa=t.Xa,this.mutatedKeys=t.mutatedKeys;const a=t.nu.wa();a.sort((g,E)=>function(S,V){const N=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:D})}};return N(S)-N(V)}(g.type,E.type)||this.Za(g.doc,E.doc)),this.iu(r),s=s!=null&&s;const u=e&&!s?this.su():[],h=this.Ya.size===0&&this.current&&!s?1:0,f=h!==this.Ja;return this.Ja=h,a.length!==0||f?{snapshot:new Ue(this.query,t.Xa,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),ou:u}:{ou:u}}Fa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Xa:this.Xa,nu:new Oa,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{ou:[]}}_u(t){return!this.Ha.has(t)&&!!this.Xa.has(t)&&!this.Xa.get(t).hasLocalMutations}iu(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}su(){if(!this.current)return[];const t=this.Ya;this.Ya=j(),this.Xa.forEach(r=>{this._u(r.key)&&(this.Ya=this.Ya.add(r.key))});const e=[];return t.forEach(r=>{this.Ya.has(r)||e.push(new gl(r))}),this.Ya.forEach(r=>{t.has(r)||e.push(new pl(r))}),e}au(t){this.Ha=t.$s,this.Ya=j();const e=this.tu(t.documents);return this.applyChanges(e,!0)}uu(){return Ue.fromInitialDocuments(this.query,this.Xa,this.mutatedKeys,this.Ja===0,this.hasCachedResults)}}const Si="SyncEngine";class $m{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class qm{constructor(t){this.key=t,this.cu=!1}}class Hm{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.lu={},this.hu=new ve(u=>kc(u),jr),this.Pu=new Map,this.Tu=new Set,this.Iu=new Z(O.comparator),this.Eu=new Map,this.du=new gi,this.Au={},this.Ru=new Map,this.Vu=Be.lr(),this.onlineState="Unknown",this.mu=void 0}get isPrimaryClient(){return this.mu===!0}}async function Gm(n,t,e=!0){const r=Il(n);let s;const o=r.hu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.uu()):s=await _l(r,t,e,!0),s}async function Km(n,t){const e=Il(n);await _l(e,t,!0,!1)}async function _l(n,t,e,r){const s=await fm(n.localStore,Nt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let u;return r&&(u=await Qm(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&ol(n.remoteStore,s),u}async function Qm(n,t,e,r,s){n.fu=(E,w,S)=>async function(N,D,H,U){let G=D.view.tu(H);G.Cs&&(G=await Pa(N.localStore,D.query,!1).then(({documents:T})=>D.view.tu(T,G)));const rt=U&&U.targetChanges.get(D.targetId),Ft=U&&U.targetMismatches.get(D.targetId)!=null,lt=D.view.applyChanges(G,N.isPrimaryClient,rt,Ft);return Ba(N,D.targetId,lt.ou),lt.snapshot}(n,E,w,S);const o=await Pa(n.localStore,t,!0),a=new zm(t,o.$s),u=a.tu(o.documents),h=xn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(u,n.isPrimaryClient,h);Ba(n,e,f.ou);const g=new $m(t,e,a);return n.hu.set(t,g),n.Pu.has(e)?n.Pu.get(e).push(t):n.Pu.set(e,[t]),f.snapshot}async function Wm(n,t,e){const r=F(n),s=r.hu.get(t),o=r.Pu.get(s.targetId);if(o.length>1)return r.Pu.set(s.targetId,o.filter(a=>!jr(a,t))),void r.hu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Xs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&vi(r.remoteStore,s.targetId),Zs(r,s.targetId)}).catch(Ge)):(Zs(r,s.targetId),await Xs(r.localStore,s.targetId,!0))}async function Xm(n,t){const e=F(n),r=e.hu.get(t),s=e.Pu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),vi(e.remoteStore,r.targetId))}async function Ym(n,t,e){const r=sp(n);try{const s=await function(a,u){const h=F(a),f=ot.now(),g=u.reduce((S,V)=>S.add(V.key),j());let E,w;return h.persistence.runTransaction("Locally write mutations","readwrite",S=>{let V=Gt(),N=j();return h.Bs.getEntries(S,g).next(D=>{V=D,V.forEach((H,U)=>{U.isValidDocument()||(N=N.add(H))})}).next(()=>h.localDocuments.getOverlayedDocuments(S,V)).next(D=>{E=D;const H=[];for(const U of u){const G=ff(U,E.get(U.key).overlayedDocument);G!=null&&H.push(new Te(U.key,G,Rc(G.value.mapValue),xt.exists(!0)))}return h.mutationQueue.addMutationBatch(S,f,H,u)}).next(D=>{w=D;const H=D.applyToLocalDocumentSet(E,N);return h.documentOverlayCache.saveOverlays(S,D.batchId,H)})}).then(()=>({batchId:w.batchId,changes:Oc(E)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,h){let f=a.Au[a.currentUser.toKey()];f||(f=new Z(B)),f=f.insert(u,h),a.Au[a.currentUser.toKey()]=f}(r,s.batchId,e),await Mn(r,s.changes),await Qr(r.remoteStore)}catch(s){const o=Ri(s,"Failed to persist write");e.reject(o)}}async function yl(n,t){const e=F(n);try{const r=await um(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Eu.get(o);a&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.cu=!0:s.modifiedDocuments.size>0?Q(a.cu,14607):s.removedDocuments.size>0&&(Q(a.cu,42227),a.cu=!1))}),await Mn(e,r,t)}catch(r){await Ge(r)}}function Fa(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.hu.forEach((o,a)=>{const u=a.view.Fa(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const h=F(a);h.onlineState=u;let f=!1;h.queries.forEach((g,E)=>{for(const w of E.Sa)w.Fa(u)&&(f=!0)}),f&&Ci(h)}(r.eventManager,t),s.length&&r.lu.Y_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Jm(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Eu.get(t),o=s&&s.key;if(o){let a=new Z(O.comparator);a=a.insert(o,Tt.newNoDocument(o,L.min()));const u=j().add(o),h=new Hr(L.min(),new Map,new Z(B),a,u);await yl(r,h),r.Iu=r.Iu.remove(o),r.Eu.delete(t),bi(r)}else await Xs(r.localStore,t,!1).then(()=>Zs(r,t,e)).catch(Ge)}async function Zm(n,t){const e=F(n),r=t.batch.batchId;try{const s=await lm(e.localStore,t);vl(e,r,null),El(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Mn(e,s)}catch(s){await Ge(s)}}async function tp(n,t,e){const r=F(n);try{const s=await function(a,u){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let g;return h.mutationQueue.lookupMutationBatch(f,u).next(E=>(Q(E!==null,37113),g=E.keys(),h.mutationQueue.removeMutationBatch(f,E))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,g,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,g)).next(()=>h.localDocuments.getDocuments(f,g))})}(r.localStore,t);vl(r,t,e),El(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Mn(r,s)}catch(s){await Ge(s)}}function El(n,t){(n.Ru.get(t)||[]).forEach(e=>{e.resolve()}),n.Ru.delete(t)}function vl(n,t,e){const r=F(n);let s=r.Au[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Au[r.currentUser.toKey()]=s}}function Zs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Pu.get(t))n.hu.delete(r),e&&n.lu.gu(r,e);n.Pu.delete(t),n.isPrimaryClient&&n.du.Hr(t).forEach(r=>{n.du.containsKey(r)||Tl(n,r)})}function Tl(n,t){n.Tu.delete(t.path.canonicalString());const e=n.Iu.get(t);e!==null&&(vi(n.remoteStore,e),n.Iu=n.Iu.remove(t),n.Eu.delete(e),bi(n))}function Ba(n,t,e){for(const r of e)r instanceof pl?(n.du.addReference(r.key,t),ep(n,r)):r instanceof gl?(k(Si,"Document no longer in limbo: "+r.key),n.du.removeReference(r.key,t),n.du.containsKey(r.key)||Tl(n,r.key)):M(19791,{pu:r})}function ep(n,t){const e=t.key,r=e.path.canonicalString();n.Iu.get(e)||n.Tu.has(r)||(k(Si,"New document in limbo: "+e),n.Tu.add(r),bi(n))}function bi(n){for(;n.Tu.size>0&&n.Iu.size<n.maxConcurrentLimboResolutions;){const t=n.Tu.values().next().value;n.Tu.delete(t);const e=new O(J.fromString(t)),r=n.Vu.next();n.Eu.set(r,new qm(e)),n.Iu=n.Iu.insert(e,r),ol(n.remoteStore,new Jt(Nt(Ur(e.path)),r,"TargetPurposeLimboResolution",Mr.le))}}async function Mn(n,t,e){const r=F(n),s=[],o=[],a=[];r.hu.isEmpty()||(r.hu.forEach((u,h)=>{a.push(r.fu(h,t,e).then(f=>{var g;if((f||e)&&r.isPrimaryClient){const E=f?!f.fromCache:(g=e?.targetChanges.get(h.targetId))===null||g===void 0?void 0:g.current;r.sharedClientState.updateQueryState(h.targetId,E?"current":"not-current")}if(f){s.push(f);const E=yi.Rs(h.targetId,f);o.push(E)}}))}),await Promise.all(a),r.lu.Y_(s),await async function(h,f){const g=F(h);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",E=>C.forEach(f,w=>C.forEach(w.ds,S=>g.persistence.referenceDelegate.addReference(E,w.targetId,S)).next(()=>C.forEach(w.As,S=>g.persistence.referenceDelegate.removeReference(E,w.targetId,S)))))}catch(E){if(!Ke(E))throw E;k(Ei,"Failed to update sequence numbers: "+E)}for(const E of f){const w=E.targetId;if(!E.fromCache){const S=g.xs.get(w),V=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(V);g.xs=g.xs.insert(w,N)}}}(r.localStore,o))}async function np(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){k(Si,"User change. New user:",t.toKey());const r=await nl(e.localStore,t);e.currentUser=t,function(o,a){o.Ru.forEach(u=>{u.forEach(h=>{h.reject(new x(b.CANCELLED,a))})}),o.Ru.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Mn(e,r.ks)}}function rp(n,t){const e=F(n),r=e.Eu.get(t);if(r&&r.cu)return j().add(r.key);{let s=j();const o=e.Pu.get(t);if(!o)return s;for(const a of o){const u=e.hu.get(a);s=s.unionWith(u.view.eu)}return s}}function Il(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=yl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=rp.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Jm.bind(null,t),t.lu.Y_=Um.bind(null,t.eventManager),t.lu.gu=jm.bind(null,t.eventManager),t}function sp(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Zm.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=tp.bind(null,t),t}class br{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Gr(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Su(t),await this.persistence.start(),this.localStore=this.Du(t),this.gcScheduler=this.vu(t,this.localStore),this.indexBackfillerScheduler=this.Cu(t,this.localStore)}vu(t,e){return null}Cu(t,e){return null}Du(t){return cm(this.persistence,new im,t.initialUser,this.serializer)}Su(t){return new el(_i.fi,this.serializer)}bu(t){return new pm}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}br.provider={build:()=>new br};class ip extends br{constructor(t){super(),this.cacheSizeBytes=t}vu(t,e){Q(this.persistence.referenceDelegate instanceof Cr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new qf(r,t.asyncQueue,e)}Su(t){const e=this.cacheSizeBytes!==void 0?Rt.withCacheSize(this.cacheSizeBytes):Rt.DEFAULT;return new el(r=>Cr.fi(r,e),this.serializer)}}class ti{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Fa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=np.bind(null,this.syncEngine),await Lm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Bm}()}createDatastore(t){const e=Gr(t.databaseInfo.databaseId),r=function(o){return new vm(o)}(t.databaseInfo);return function(o,a,u,h){return new Am(o,a,u,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,u){return new Cm(r,s,o,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>Fa(this.syncEngine,e,0),function(){return ka.C()?new ka:new gm}())}createSyncEngine(t,e){return function(s,o,a,u,h,f,g){const E=new Hm(s,o,a,u,h,f);return g&&(E.mu=!0),E}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);k(ye,"RemoteStore shutting down."),o.da.add(5),await On(o),o.Ra.shutdown(),o.Va.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}ti.provider={build:()=>new ti};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Mu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Mu(this.observer.error,t):Ht("Uncaught Error in snapshot listener:",t.toString()))}xu(){this.muted=!0}Mu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="FirestoreClient";class op{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=vt.UNAUTHENTICATED,this.clientId=pc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{k(le,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(k(le,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ne;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ri(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function ks(n,t){n.asyncQueue.verifyOperationInProgress(),k(le,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await nl(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Ua(n,t){n.asyncQueue.verifyOperationInProgress();const e=await ap(n);k(le,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>xa(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>xa(t.remoteStore,s)),n._onlineComponents=t}async function ap(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k(le,"Using user provided OfflineComponentProvider");try{await ks(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Oe("Error using user provided cache. Falling back to memory cache: "+e),await ks(n,new br)}}else k(le,"Using default OfflineComponentProvider"),await ks(n,new ip(void 0));return n._offlineComponents}async function Al(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k(le,"Using user provided OnlineComponentProvider"),await Ua(n,n._uninitializedComponentsProvider._online)):(k(le,"Using default OnlineComponentProvider"),await Ua(n,new ti))),n._onlineComponents}function cp(n){return Al(n).then(t=>t.syncEngine)}async function ei(n){const t=await Al(n),e=t.eventManager;return e.onListen=Gm.bind(null,t.syncEngine),e.onUnlisten=Wm.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Km.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=Xm.bind(null,t.syncEngine),e}function lp(n,t,e={}){const r=new ne;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,f){const g=new wl({next:w=>{g.xu(),a.enqueueAndForget(()=>fl(o,E));const S=w.docs.has(u);!S&&w.fromCache?f.reject(new x(b.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&w.fromCache&&h&&h.source==="server"?f.reject(new x(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):f.resolve(w)},error:w=>f.reject(w)}),E=new ml(Ur(u.path),g,{includeMetadataChanges:!0,Qa:!0});return dl(o,E)}(await ei(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n,t,e){if(!e)throw new x(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function up(n,t,e,r){if(t===!0&&r===!0)throw new x(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function za(n){if(!O.isDocumentKey(n))throw new x(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function $a(n){if(O.isDocumentKey(n))throw new x(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Pi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function zt(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new x(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Pi(n);throw new x(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl="firestore.googleapis.com",qa=!0;class Ha{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new x(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Sl,this.ssl=qa}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:qa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=tl;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<zf)throw new x(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}up("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Rl((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Wr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ha({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new x(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ha(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new _d;switch(r.type){case"firstParty":return new Td(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new x(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=ja.get(e);r&&(k("ComponentProvider","Removing Datastore"),ja.delete(e),r.terminate())}(this),Promise.resolve()}}function hp(n,t,e,r={}){var s;n=zt(n,Wr);const o=ri(t),a=n._getSettings(),u=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),h=`${t}:${e}`;o&&(qu(`https://${h}`),Qu("Firestore",!0)),a.host!==Sl&&a.host!==h&&Oe("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const f=Object.assign(Object.assign({},a),{host:h,ssl:o,emulatorOptions:r});if(!pr(f,u)&&(n._setSettings(f),r.mockUserToken)){let g,E;if(typeof r.mockUserToken=="string")g=r.mockUserToken,E=vt.MOCK_USER;else{g=Hu(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new x(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");E=new vt(w)}n._authCredentials=new yd(new fc(g,E))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Xr(this.firestore,t,this._query)}}class Ct{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new re(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Ct(this.firestore,t,this._key)}}class re extends Xr{constructor(t,e,r){super(t,e,Ur(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Ct(this.firestore,null,new O(t))}withConverter(t){return new re(this.firestore,t,this._path)}}function wn(n,t,...e){if(n=xe(n),Cl("collection","path",t),n instanceof Wr){const r=J.fromString(t,...e);return $a(r),new re(n,null,r)}{if(!(n instanceof Ct||n instanceof re))throw new x(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(t,...e));return $a(r),new re(n.firestore,null,r)}}function Vi(n,t,...e){if(n=xe(n),arguments.length===1&&(t=pc.newId()),Cl("doc","path",t),n instanceof Wr){const r=J.fromString(t,...e);return za(r),new Ct(n,null,new O(r))}{if(!(n instanceof Ct||n instanceof re))throw new x(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(t,...e));return za(r),new Ct(n.firestore,n instanceof re?n.converter:null,new O(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="AsyncQueue";class Ka{constructor(t=Promise.resolve()){this.Ju=[],this.Yu=!1,this.Zu=[],this.Xu=null,this.ec=!1,this.tc=!1,this.nc=[],this.x_=new sl(this,"async_queue_retry"),this.rc=()=>{const r=Ds();r&&k(Ga,"Visibility state changed to "+r.visibilityState),this.x_.b_()},this.sc=t;const e=Ds();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.rc)}get isShuttingDown(){return this.Yu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.oc(),this._c(t)}enterRestrictedMode(t){if(!this.Yu){this.Yu=!0,this.tc=t||!1;const e=Ds();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.rc)}}enqueue(t){if(this.oc(),this.Yu)return new Promise(()=>{});const e=new ne;return this._c(()=>this.Yu&&this.tc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Ju.push(t),this.ac()))}async ac(){if(this.Ju.length!==0){try{await this.Ju[0](),this.Ju.shift(),this.x_.reset()}catch(t){if(!Ke(t))throw t;k(Ga,"Operation failed with retryable error: "+t)}this.Ju.length>0&&this.x_.y_(()=>this.ac())}}_c(t){const e=this.sc.then(()=>(this.ec=!0,t().catch(r=>{throw this.Xu=r,this.ec=!1,Ht("INTERNAL UNHANDLED ERROR: ",Qa(r)),r}).then(r=>(this.ec=!1,r))));return this.sc=e,e}enqueueAfterDelay(t,e,r){this.oc(),this.nc.indexOf(t)>-1&&(e=0);const s=Ai.createAndSchedule(this,t,e,r,o=>this.uc(o));return this.Zu.push(s),s}oc(){this.Xu&&M(47125,{cc:Qa(this.Xu)})}verifyOperationInProgress(){}async lc(){let t;do t=this.sc,await t;while(t!==this.sc)}hc(t){for(const e of this.Zu)if(e.timerId===t)return!0;return!1}Pc(t){return this.lc().then(()=>{this.Zu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Zu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.lc()})}Tc(t){this.nc.push(t)}uc(t){const e=this.Zu.indexOf(t);this.Zu.splice(e,1)}}function Qa(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(n){return function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1}(n,["next","error","complete"])}class je extends Wr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new Ka,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Ka(t),this._firestoreClient=void 0,await t}}}function dp(n,t){const e=typeof n=="object"?n:sd(),r=typeof n=="string"?n:Er,s=Zh(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=zu("firestore");o&&hp(s,...o)}return s}function Di(n){if(n._terminated)throw new x(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||fp(n),n._firestoreClient}function fp(n){var t,e,r;const s=n._freezeSettings(),o=function(u,h,f,g){return new Md(u,h,f,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,Rl(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new op(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){const h=u?._online.build();return{_offline:u?._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(t){this._byteString=t}static fromBase64String(t){try{return new ze(mt.fromBase64String(t))}catch(e){throw new x(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new ze(mt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new x(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new x(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new x(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=/^__.*__$/;class pp{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Te(t,this.data,this.fieldMask,e,this.fieldTransforms):new Nn(t,this.data,e,this.fieldTransforms)}}function Pl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ic:n})}}class Oi{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ec(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ic(){return this.settings.Ic}dc(t){return new Oi(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ac(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.dc({path:r,Rc:!1});return s.Vc(t),s}mc(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.dc({path:r,Rc:!1});return s.Ec(),s}fc(t){return this.dc({path:void 0,Rc:!0})}gc(t){return Pr(t,this.settings.methodName,this.settings.yc||!1,this.path,this.settings.wc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ec(){if(this.path)for(let t=0;t<this.path.length;t++)this.Vc(this.path.get(t))}Vc(t){if(t.length===0)throw this.gc("Document fields must not be empty");if(Pl(this.Ic)&&mp.test(t))throw this.gc('Document fields cannot begin and end with "__"')}}class gp{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Gr(t)}bc(t,e,r,s=!1){return new Oi({Ic:t,methodName:e,wc:r,path:ft.emptyPath(),Rc:!1,yc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _p(n){const t=n._freezeSettings(),e=Gr(n._databaseId);return new gp(n._databaseId,!!t.ignoreUndefinedProperties,e)}function yp(n,t,e,r,s,o={}){const a=n.bc(o.merge||o.mergeFields?2:0,t,e,s);Nl("Data must be an object, but it was:",a,r);const u=Dl(r,a);let h,f;if(o.merge)h=new Dt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const g=[];for(const E of o.mergeFields){const w=Ep(t,E,e);if(!a.contains(w))throw new x(b.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Tp(g,w)||g.push(w)}h=new Dt(g),f=a.fieldTransforms.filter(E=>h.covers(E.field))}else h=null,f=a.fieldTransforms;return new pp(new bt(u),h,f)}function Vl(n,t){if(kl(n=xe(n)))return Nl("Unsupported field value:",t,n),Dl(n,t);if(n instanceof bl)return function(r,s){if(!Pl(s.Ic))throw s.gc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.gc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.Rc&&t.Ic!==4)throw t.gc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const u of r){let h=Vl(u,s.fc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=xe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return af(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ot.fromDate(r);return{timestampValue:Rr(s.serializer,o)}}if(r instanceof ot){const o=new ot(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rr(s.serializer,o)}}if(r instanceof Ni)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ze)return{bytesValue:Kc(s.serializer,r._byteString)};if(r instanceof Ct){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.gc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:pi(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof xi)return function(a,u){return{mapValue:{fields:{[wc]:{stringValue:Ac},[vr]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw u.gc("VectorValues must only contain numeric values.");return hi(u.serializer,f)})}}}}}}(r,s);throw s.gc(`Unsupported field value: ${Pi(r)}`)}(n,t)}function Dl(n,t){const e={};return _c(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ee(n,(r,s)=>{const o=Vl(s,t.Ac(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function kl(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ot||n instanceof Ni||n instanceof ze||n instanceof Ct||n instanceof bl||n instanceof xi)}function Nl(n,t,e){if(!kl(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const r=Pi(e);throw r==="an object"?t.gc(n+" a custom object"):t.gc(n+" "+r)}}function Ep(n,t,e){if((t=xe(t))instanceof ki)return t._internalPath;if(typeof t=="string")return xl(n,t);throw Pr("Field path arguments must be of type string or ",n,!1,void 0,e)}const vp=new RegExp("[~\\*/\\[\\]]");function xl(n,t,e){if(t.search(vp)>=0)throw Pr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ki(...t.split("."))._internalPath}catch{throw Pr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Pr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new x(b.INVALID_ARGUMENT,u+n+h)}function Tp(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Ct(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Ip(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Ml("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Ip extends Ol{data(){return super.data()}}function Ml(n,t){return typeof t=="string"?xl(n,t):t instanceof ki?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new x(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ap{convertValue(t,e="none"){switch(ae(t)){case 0:return null;case 1:return t.booleanValue;case 2:return nt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(oe(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Ee(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,s;const o=(s=(r=(e=t.fields)===null||e===void 0?void 0:e[vr].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>nt(a.doubleValue));return new xi(o)}convertGeoPoint(t){return new Ni(nt(t.latitude),nt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Fr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Sn(t));default:return null}}convertTimestamp(t){const e=ie(t);return new ot(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=J.fromString(t);Q(Zc(r),9688,{name:t});const s=new bn(r.get(1),r.get(3)),o=new O(r.popFirst(5));return s.isEqual(e)||Ht(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ll extends Ol{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new dr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Ml("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class dr extends Ll{data(t={}){return super.data(t)}}class Cp{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new _n(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new dr(this._firestore,this._userDataWriter,r.key,r,new _n(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new x(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const h=new dr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new _n(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const h=new dr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new _n(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,g=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),g=a.indexOf(u.doc.key)),{type:Sp(u.type),doc:h,oldIndex:f,newIndex:g}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Sp(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(n){n=zt(n,Ct);const t=zt(n.firestore,je);return lp(Di(t),n._key).then(e=>jl(t,n,e))}class Fl extends Ap{constructor(t){super(),this.firestore=t}convertBytes(t){return new ze(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ct(this.firestore,null,e)}}function Mi(n,t,e){n=zt(n,Ct);const r=zt(n.firestore,je),s=Rp(n.converter,t,e);return Ul(r,[yp(_p(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,xt.none())])}function Pp(n){return Ul(zt(n.firestore,je),[new di(n._key,xt.none())])}function Bl(n,...t){var e,r,s;n=xe(n);let o={includeMetadataChanges:!1,source:"default"},a=0;typeof t[a]!="object"||Wa(t[a])||(o=t[a],a++);const u={includeMetadataChanges:o.includeMetadataChanges,source:o.source};if(Wa(t[a])){const E=t[a];t[a]=(e=E.next)===null||e===void 0?void 0:e.bind(E),t[a+1]=(r=E.error)===null||r===void 0?void 0:r.bind(E),t[a+2]=(s=E.complete)===null||s===void 0?void 0:s.bind(E)}let h,f,g;if(n instanceof Ct)f=zt(n.firestore,je),g=Ur(n._key.path),h={next:E=>{t[a]&&t[a](jl(f,n,E))},error:t[a+1],complete:t[a+2]};else{const E=zt(n,Xr);f=zt(E.firestore,je),g=E._query;const w=new Fl(f);h={next:S=>{t[a]&&t[a](new Cp(f,w,E,S))},error:t[a+1],complete:t[a+2]},wp(n._query)}return function(w,S,V,N){const D=new wl(N),H=new ml(S,D,V);return w.asyncQueue.enqueueAndForget(async()=>dl(await ei(w),H)),()=>{D.xu(),w.asyncQueue.enqueueAndForget(async()=>fl(await ei(w),H))}}(Di(f),g,u,h)}function Ul(n,t){return function(r,s){const o=new ne;return r.asyncQueue.enqueueAndForget(async()=>Ym(await cp(r),s,o)),o.promise}(Di(n),t)}function jl(n,t,e){const r=e.docs.get(t._key),s=new Fl(n);return new Ll(n,s,t._key,r,new _n(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(s){He=s})(rd),_r(new An("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new je(new Ed(r.getProvider("auth-internal")),new Id(a,r.getProvider("app-check-internal")),function(f,g){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new x(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new bn(f.options.projectId,g)}(a,s),a);return o=Object.assign({useFetchStreams:e},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),ke(Zo,ta,t),ke(Zo,ta,"esm2017")})();const Vp={apiKey:"AIzaSyAURA1Os8rPj_ov0ofDs-BCyO3aKhibhtw",authDomain:"webrtc-tutorial-81613.firebaseapp.com",projectId:"webrtc-tutorial-81613",storageBucket:"webrtc-tutorial-81613.firebasestorage.app",messagingSenderId:"911640820129",appId:"1:911640820129:web:b7102245c80e146013b3e0",measurementId:"G-68WFGEKPQB"},Dp=rc(Vp),zl=dp(Dp),kp={hd:{width:1280,height:720},fhd:{width:1920,height:1080},fourK:{width:3840,height:2160}},Np={iceServers:[{urls:"stun:stun.relay.metered.ca:80"},{urls:"turn:a.relay.metered.ca:80",username:"3c2899b6892a0dd428438fa2",credential:"UjVDP6QSI1bu0yiq"},{urls:"turn:a.relay.metered.ca:80?transport=tcp",username:"3c2899b6892a0dd428438fa2",credential:"UjVDP6QSI1bu0yiq"},{urls:"turn:a.relay.metered.ca:443",username:"3c2899b6892a0dd428438fa2",credential:"UjVDP6QSI1bu0yiq"},{urls:"turn:a.relay.metered.ca:443?transport=tcp",username:"3c2899b6892a0dd428438fa2",credential:"UjVDP6QSI1bu0yiq"}],iceCandidatePoolSize:10},xp=document.querySelectorAll('input[name="role"]'),Op=document.getElementById("senderControls"),Mp=document.getElementById("receiverControls"),Li=document.getElementById("callControls"),$l=document.getElementById("statsControls"),Vr=document.getElementById("ptzControls"),Lp=document.getElementById("resolution"),Fp=document.getElementById("framerate"),Bp=document.getElementById("codecSelect"),Fi=document.getElementById("startCamera"),Dr=document.getElementById("joinCall"),Up=document.getElementById("hangUpBtn"),ql=document.getElementById("callIdInput"),Yr=document.getElementById("callIdDisplay"),fr=document.getElementById("copyCallId"),kr=document.getElementById("localVideo"),Hl=document.getElementById("remoteVideo"),Nr=document.getElementById("remoteVideoContainer"),De=document.getElementById("resolutionDisplay"),Ns=document.getElementById("fullscreenBtn"),Jr=document.getElementById("startStatsRecording"),Zr=document.getElementById("stopStatsRecording"),ts=document.getElementById("downloadStats"),xr=document.getElementById("statsDisplay"),jp=document.getElementById("zoomInBtn"),zp=document.getElementById("zoomOutBtn"),$p=document.getElementById("zoomSlider");document.getElementById("zoomValue");const qp=document.getElementById("tiltUpBtn"),Hp=document.getElementById("tiltDownBtn"),Gp=document.getElementById("tiltSlider");document.getElementById("tiltValue");const Kp=document.getElementById("panLeftBtn"),Qp=document.getElementById("panRightBtn"),Wp=document.getElementById("panSlider");document.getElementById("panValue");const Xp=document.getElementById("ptzResetBtn");let X,Yt,At,dt,$={},ge,Gl,$t=[],Or=!1,We="sender",$e=null,Vt=null;function kn(){kr.srcObject=null,Hl.srcObject=null,kr.style.display="none",Nr.style.display="none",De.style.display="none",Vr.style.display="none",Li.style.display="none",$l.style.display="none",Yr.textContent="",ql.value="",fr.textContent="コピー",Fi.disabled=!1,Dr.disabled=!1,xr.textContent="",$t=[],$e=null,Jr.disabled=!1,Zr.disabled=!0,ts.disabled=!0,dt&&(dt.close(),dt=null),Vt&&(clearInterval(Vt),Vt=null)}function Kl(n){We=n,Op.style.display=n==="sender"?"block":"none",Mp.style.display=n==="receiver"?"block":"none",kn()}function Ql(){const n=new RTCPeerConnection(Np);return n.onconnectionstatechange=()=>{console.log(`PeerConnection state changed to: ${n.connectionState}`);const t=n.connectionState==="connected";$l.style.display=t?"block":"none",t&&We==="receiver"?Vt||(Vt=setInterval(ig,1e3)):(Vt&&(clearInterval(Vt),Vt=null),De.style.display="none"),t||Bi()},n}function Yp(n,t){const e=n.split(`\r
`),r=e.findIndex(f=>f.startsWith("m=video"));if(r===-1)return n;const s=new RegExp(`a=rtpmap:(\\d+) ${t}/90000`,"i"),o=e.find(f=>s.test(f));if(!o)return n;const a=o.match(s)[1],u=e[r].split(" "),h=[u[0],u[1],u[2],a,...u.slice(3).filter(f=>f!==a)];return e[r]=h.join(" "),e.join(`\r
`)}async function Jp(){Bi(),Vt&&(clearInterval(Vt),Vt=null),Yt&&(Yt.getTracks().forEach(n=>n.stop()),Yt=null),X&&(X.close(),X=null),At&&(await Pp(At).catch(n=>console.error("Error deleting document: ",n)),At=null),ge=null,kn()}function Wl(n,t){n.onicecandidate=e=>{e.candidate&&Mi(Vi(t),e.candidate.toJSON())}}function Xl(n){Bl(n,t=>{t.docChanges().forEach(e=>{if(e.type==="added"){const r=new RTCIceCandidate(e.doc.data());X.addIceCandidate(r)}})})}async function Zp(){Fi.disabled=!0;const n=Lp.value,t=parseInt(Fp.value,10),e=Bp.value,r={video:{...kp[n],frameRate:{ideal:t},pan:!0,tilt:!0,zoom:!0},audio:!1};try{Yt=await navigator.mediaDevices.getUserMedia(r),kr.srcObject=Yt,kr.style.display="block",[ge]=Yt.getVideoTracks(),X=Ql(),Yt.getTracks().forEach(h=>X.addTrack(h,Yt)),tg(),At=Vi(wn(zl,"calls"));const s=wn(At,"offerCandidates"),o=wn(At,"answerCandidates");Wl(X,s),Xl(o);const a=await X.createOffer(),u=Yp(a.sdp,e);await X.setLocalDescription({type:a.type,sdp:u}),await Mi(At,{offer:{type:a.type,sdp:u}}),Yr.textContent=At.id,Li.style.display="block",Bl(At,h=>{const f=h.data();f?.answer&&!X.currentRemoteDescription&&X.setRemoteDescription(new RTCSessionDescription(f.answer))})}catch(s){console.error("Error starting camera or creating call:",s),alert("Failed to access the camera. Please ensure it is available and permissions are granted."),kn()}}function tg(){console.log("SENDER: Creating DataChannel 'ptz'..."),dt=X.createDataChannel("ptz"),dt.onopen=()=>{console.log("SENDER: DataChannel is open. Sending capabilities...");const n=ge.getCapabilities();$={zoom:n.zoom||null,pan:n.pan||null,tilt:n.tilt||null},console.log("SENDER: Sending capabilities:",$),dt.send(JSON.stringify({type:"capabilities",data:$}))},dt.onmessage=n=>{const t=JSON.parse(n.data);console.log("SENDER: Received command:",t),t.type==="command"&&ge&&rg(t.command,t.value)},dt.onclose=()=>console.log("SENDER: DataChannel is closed."),dt.onerror=n=>console.error("SENDER: DataChannel error:",n)}async function eg(){const n=ql.value.trim();if(!n){alert("Please enter a Call ID.");return}Dr.disabled=!0;try{At=Vi(zl,"calls",n);const t=await bp(At);if(!t.exists()||!t.data().offer){alert("Invalid Call ID."),kn();return}const e=t.data().offer;X=Ql();const r=wn(At,"offerCandidates"),s=wn(At,"answerCandidates");X.ontrack=a=>{Hl.srcObject=a.streams[0],Nr.style.display="inline-block"},X.ondatachannel=ng,Wl(X,s),Xl(r),await X.setRemoteDescription(new RTCSessionDescription(e));const o=await X.createAnswer();await X.setLocalDescription(o),await Mi(At,{answer:o},{merge:!0}),Yr.textContent=At.id,Li.style.display="block"}catch(t){console.error("Error joining call:",t),alert("An error occurred while joining the call. Please check the Call ID."),kn()}finally{Dr.disabled=!1}}function ng(n){console.log(`RECEIVER: ondatachannel event fired. Channel label: '${n.channel.label}'`),n.channel.label==="ptz"&&(dt=n.channel,dt.onopen=()=>console.log("RECEIVER: DataChannel is open."),dt.onmessage=t=>{const e=JSON.parse(t.data);console.log("RECEIVER: Received message:",e),e.type==="capabilities"&&(sg(e.data),Vr.style.display="block")},dt.onclose=()=>{console.log("RECEIVER: DataChannel is closed."),Vr.style.display="none"},dt.onerror=t=>console.error("RECEIVER: DataChannel error:",t))}async function rg(n,t){if(document.visibilityState!=="visible"){console.warn("SENDER: Page is not visible. Skipping PTZ command to prevent SecurityError.");return}if(!ge||ge.readyState!=="live"){console.warn("SENDER: videoTrack is not available to apply PTZ constraints.");return}console.log(`SENDER: Applying constraint - type: ${n}, value: ${t}`);try{await ge.applyConstraints({advanced:[{[n]:t}]})}catch(e){console.error(`SENDER: Error applying ${n} constraint:`,e)}}function sg(n){console.log("RECEIVER: Setting up PTZ controls with capabilities:",n),$=n,["zoom","pan","tilt"].forEach(t=>{const e=!!$[t],r=document.getElementById(`${t}Slider`),s=document.getElementById(`${t}Value`);if(document.querySelectorAll(`button[id$="${t.charAt(0).toUpperCase()+t.slice(1)}Btn"]`).forEach(o=>o.disabled=!e),r&&(r.disabled=!e),e){const{min:o,max:a,step:u}=$[t];r.min=o,r.max=a,r.step=u;const h=(t==="pan"||t==="tilt")&&o<0&&a>0?0:o;r.value=h,s.textContent=parseFloat(h).toFixed(2)}})}function et(n,t){if(X?.connectionState!=="connected"||dt?.readyState!=="open"){console.warn(`RECEIVER: Cannot send command. Connection state: ${X?.connectionState}, DataChannel state: ${dt?.readyState}`);return}if(!$[n]){console.warn(`RECEIVER: PTZ type '${n}' is not supported.`);return}const{min:e,max:r}=$[n],s=Math.max(e,Math.min(r,t)),o={type:"command",command:n,value:s};try{console.log("RECEIVER: Sending command:",o),dt.send(JSON.stringify(o)),document.getElementById(`${n}Slider`).value=s,document.getElementById(`${n}Value`).textContent=s.toFixed(2)}catch(a){console.error("RECEIVER: Error sending command via DataChannel:",a)}}async function ig(){if(!(!X||We!=="receiver"||X.connectionState!=="connected"))try{const n=await X.getStats();let t=!1;n.forEach(e=>{e.type==="inbound-rtp"&&e.mediaType==="video"&&e.frameWidth&&e.frameHeight&&(De.textContent=`${e.frameWidth} x ${e.frameHeight}`,De.style.display="block",t=!0)}),t||(De.style.display="none")}catch(n){console.error("Error getting stats for resolution display:",n),De.style.display="none"}}function og(){!X||Or||(Or=!0,$t=[],$e=null,Jr.disabled=!0,Zr.disabled=!1,ts.disabled=!0,xr.textContent="記録中...",Gl=setInterval(async()=>{if(!X)return;const n=await X.getStats(),t={timestamp:new Date().toISOString()};We==="sender"?ag(n,t):cg(n,t),Object.keys(t).length>1&&($t.push(t),xr.textContent=`記録中... ${$t.length} 個`),$e=n},1e3))}function ag(n,t){n.forEach(e=>{if(e.type==="outbound-rtp"&&e.mediaType==="video"){const r=$e?.get(e.id),s=e.bytesSent-(r?.bytesSent??0),o=e.packetsSent-(r?.packetsSent??0);t.sent_resolution=`${e.frameWidth}x${e.frameHeight}`,t.sent_fps=e.framesPerSecond,t.sent_bitrate_kbps=Math.round(Math.max(0,s)*8/1e3),t.packets_sent_per_second=Math.max(0,o),t.total_encode_time_s=e.totalEncodeTime,t.keyframes_encoded=e.keyFramesEncoded,t.quality_limitation_reason=e.qualityLimitationReason,t.quality_limitation_resolution_changes=e.qualityLimitationResolutionChanges,t.retransmitted_packets_sent=e.retransmittedPacketsSent,t.nack_count=e.nackCount}if(e.type==="remote-inbound-rtp"&&e.mediaType==="video"&&(t.receiver_jitter_ms=(e.jitter*1e3).toFixed(4)??"N/A",t.receiver_packets_lost=e.packetsLost,t.receiver_fraction_lost=e.fractionLost,t.rtt_rtcp_ms=(e.roundTripTime*1e3).toFixed(4)??"N/A"),e.type==="candidate-pair"&&e.nominated&&e.state==="succeeded"){t.available_outgoing_bitrate_kbps=e.availableOutgoingBitrate?Math.round(e.availableOutgoingBitrate/1e3):"N/A",t.rtt_ice_ms=(e.currentRoundTripTime*1e3).toFixed(4)??"N/A";const r=n.get(e.remoteCandidateId);r&&r.candidateType&&(t.connection_type=r.candidateType)}})}function cg(n,t){n.forEach(e=>{if(e.type==="inbound-rtp"&&e.mediaType==="video"){const r=$e?.get(e.id),s=e.bytesReceived-(r?.bytesReceived??0),o=e.packetsReceived-(r?.packetsReceived??0);t.received_resolution=`${e.frameWidth}x${e.frameHeight}`,t.received_fps=e.framesPerSecond,t.received_bitrate_kbps=Math.round(Math.max(0,s)*8/1e3),t.packets_received_per_second=Math.max(0,o),t.jitter_ms=(e.jitter*1e3).toFixed(4)??"N/A",t.packets_lost=e.packetsLost,t.frames_dropped=e.framesDropped,t.total_decode_time_s=e.totalDecodeTime,t.keyframes_decoded=e.keyFramesDecoded,t.jitter_buffer_delay_s=e.jitterBufferDelay,t.fir_count=e.firCount,t.pli_count=e.pliCount,t.jitter_buffer_emitted_count=e.jitterBufferEmittedCount}if(e.type==="candidate-pair"&&e.nominated&&e.state==="succeeded"){const r=n.get(e.remoteCandidateId);r&&r.candidateType&&(t.connection_type=r.candidateType)}})}function Bi(){Or&&(clearInterval(Gl),Or=!1,$e=null,Jr.disabled=!1,Zr.disabled=!0,ts.disabled=$t.length===0,xr.textContent=`記録停止。${$t.length} 個`)}function lg(){if($t.length===0){alert("ダウンロードするデータがありません");return}const n=new Set;$t.forEach(u=>Object.keys(u).forEach(h=>n.add(h)));const t=Array.from(n),r=[t.join(","),...$t.map(u=>t.map(h=>{const f=u[h]??"";return typeof f=="string"&&f.includes(",")?`"${f.replace(/"/g,'""')}"`:f}).join(","))].join(`
`),s=new Blob([r],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(s),a=document.createElement("a");a.href=o,a.download=`webrtc_stats_${We}_${new Date().toISOString().replace(/[:.]/g,"-")}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o)}function ug(){xp.forEach(t=>{t.addEventListener("change",e=>Kl(e.target.value))}),fr.addEventListener("click",async()=>{const t=Yr.textContent.trim();if(t)try{await navigator.clipboard.writeText(t),fr.textContent="コピー済み",setTimeout(()=>{fr.textContent="コピー"},1500)}catch(e){alert("コピーに失敗"),console.error("Failed to copy Call ID: ",e)}}),Fi.addEventListener("click",Zp),Dr.addEventListener("click",eg),Up.addEventListener("click",Jp),Jr.addEventListener("click",og),Zr.addEventListener("click",Bi),ts.addEventListener("click",lg);const n=t=>parseFloat(document.getElementById(`${t}Slider`).value);jp.addEventListener("click",()=>et("zoom",n("zoom")+$.zoom.step)),zp.addEventListener("click",()=>et("zoom",n("zoom")-$.zoom.step)),$p.addEventListener("input",()=>et("zoom",n("zoom"))),qp.addEventListener("click",()=>et("tilt",n("tilt")+$.tilt.step)),Hp.addEventListener("click",()=>et("tilt",n("tilt")-$.tilt.step)),Gp.addEventListener("input",()=>et("tilt",n("tilt"))),Qp.addEventListener("click",()=>et("pan",n("pan")+$.pan.step)),Kp.addEventListener("click",()=>et("pan",n("pan")-$.pan.step)),Wp.addEventListener("input",()=>et("pan",n("pan"))),Xp.addEventListener("click",()=>{$.zoom&&et("zoom",$.zoom.min),$.tilt&&et("tilt",0),$.pan&&et("pan",0)}),window.addEventListener("keydown",t=>{if(We!=="receiver"||Vr.style.display==="none"||["INPUT","SELECT","TEXTAREA"].includes(document.activeElement.tagName))return;const e=s=>parseFloat(document.getElementById(`${s}Slider`).value);let r=!1;switch(t.key){case"ArrowUp":$.tilt&&(et("tilt",e("tilt")+$.tilt.step),r=!0);break;case"ArrowDown":$.tilt&&(et("tilt",e("tilt")-$.tilt.step),r=!0);break;case"ArrowLeft":$.pan&&(et("pan",e("pan")-$.pan.step),r=!0);break;case"ArrowRight":$.pan&&(et("pan",e("pan")+$.pan.step),r=!0);break;case"+":case"PageUp":$.zoom&&(et("zoom",e("zoom")+$.zoom.step),r=!0);break;case"-":case"PageDown":$.zoom&&(et("zoom",e("zoom")-$.zoom.step),r=!0);break;case"r":case"R":$.zoom&&et("zoom",$.zoom.min),$.tilt&&et("tilt",0),$.pan&&et("pan",0),r=!0;break}r&&t.preventDefault()}),Ns.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():Nr.requestFullscreen().catch(t=>{alert(`フルスクリーンにできませんでした: ${t.message} (${t.name})`)})}),document.addEventListener("fullscreenchange",()=>{document.fullscreenElement===Nr?Ns.textContent="通常表示":Ns.textContent="フルスクリーン"})}Kl(document.querySelector('input[name="role"]:checked').value);ug();
