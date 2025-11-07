import{a as Ce}from"./assertion-error-DjoNT2lE.js";import{t as ce}from"./type-detect-CUrz5k6A.js";import{l as Ke}from"./loupe-C8Y9A1yz.js";import{a as Re}from"./ansi-styles-C5UZWym2.js";import{p as Le}from"./pathval-CUE1zhXm.js";import{d as Ge}from"./deep-eql-Du9ldZmS.js";import{g as He}from"./get-func-name-guc_G9Sr.js";import{c as Ue}from"./check-error-CV9Nubvx.js";var _={},j={};/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var C=function(i,r,d){var e=i.__flags||(i.__flags=Object.create(null));if(arguments.length===3)e[r]=d;else return e[r]};/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var We=C,Je=function(i,r){var d=We(i,"negate"),e=r[0];return d?!e:e};/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Ye=Ce,ee=C,Ze=ce,Qe=function(i,r){var d=ee(i,"message"),e=ee(i,"ssfi");d=d?d+": ":"",i=ee(i,"object"),r=r.map(function(o){return o.toLowerCase()}),r.sort();var t=r.map(function(o,a){var g=~["a","e","i","o","u"].indexOf(o.charAt(0))?"an":"a",v=r.length>1&&a===r.length-1?"or ":"";return v+g+" "+o}).join(", "),n=Ze(i).toLowerCase();if(!r.some(function(o){return n===o}))throw new Ye(d+"object tested must be "+t+", but "+n+" given",void 0,e)};/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var ke=function(i,r){return r.length>4?r[4]:i._obj},U={includeStack:!1,showDiff:!0,truncateThreshold:40,useProxy:!0,proxyExcludedKeys:["then","catch","inspect","toJSON"],deepEqual:null},Xe=Ke,me=U,fe=_e;function _e(b,i,r,d){var e={colors:d,depth:typeof r>"u"?2:r,showHidden:i,truncate:me.truncateThreshold?me.truncateThreshold:1/0};return Xe.inspect(b,e)}/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var et=fe,xe=U,Be=function(i){var r=et(i),d=Object.prototype.toString.call(i);if(xe.truncateThreshold&&r.length>=xe.truncateThreshold){if(d==="[object Function]")return!i.name||i.name===""?"[Function]":"[Function: "+i.name+"]";if(d==="[object Array]")return"[ Array("+i.length+") ]";if(d==="[object Object]"){var e=Object.keys(i),t=e.length>2?e.splice(0,2).join(", ")+", ...":e.join(", ");return"{ Object ("+t+") }"}else return r}else return r};/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var te=C,tt=ke,ne=Be,nt=function(i,r){var d=te(i,"negate"),e=te(i,"object"),t=r[3],n=tt(i,r),o=d?r[2]:r[1],a=te(i,"message");return typeof o=="function"&&(o=o()),o=o||"",o=o.replace(/#\{this\}/g,function(){return ne(e)}).replace(/#\{act\}/g,function(){return ne(n)}).replace(/#\{exp\}/g,function(){return ne(t)}),a?a+": "+o:o};/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var R=function(i,r,d){var e=i.__flags||(i.__flags=Object.create(null));r.__flags||(r.__flags=Object.create(null)),d=arguments.length===3?d:!0;for(var t in e)(d||t!=="object"&&t!=="ssfi"&&t!=="lockSsfi"&&t!="message")&&(r.__flags[t]=e[t])},rt=U;/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Y=function(){return rt.useProxy&&typeof Proxy<"u"&&typeof Reflect<"u"};/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var re,Oe;function ot(){if(Oe)return re;Oe=1;var b=L(),i=C,r=Y,d=R;return re=function(t,n,o){o=o===void 0?function(){}:o,Object.defineProperty(t,n,{get:function a(){!r()&&!i(this,"lockSsfi")&&i(this,"ssfi",a);var g=o.call(this);if(g!==void 0)return g;var v=new b.Assertion;return d(this,v),v},configurable:!0})},re}var st=Object.getOwnPropertyDescriptor(function(){},"length");/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Z=function(i,r,d){return st.configurable&&Object.defineProperty(i,"length",{get:function(){throw Error(d?"Invalid Chai property: "+r+'.length. Due to a compatibility issue, "length" cannot directly follow "'+r+'". Use "'+r+'.lengthOf" instead.':"Invalid Chai property: "+r+'.length. See docs for proper usage of "'+r+'".')}}),i};/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var it=function(i){var r=Object.getOwnPropertyNames(i);function d(t){r.indexOf(t)===-1&&r.push(t)}for(var e=Object.getPrototypeOf(i);e!==null;)Object.getOwnPropertyNames(e).forEach(d),e=Object.getPrototypeOf(e);return r},at=U,Me=C,ut=it,ct=Y;/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Pe=["__flags","__methods","_obj","assert"],Q=function(i,r){return ct()?new Proxy(i,{get:function d(e,t){if(typeof t=="string"&&at.proxyExcludedKeys.indexOf(t)===-1&&!Reflect.has(e,t)){if(r)throw Error("Invalid Chai property: "+r+"."+t+'. See docs for proper usage of "'+r+'".');var n=null,o=4;throw ut(e).forEach(function(a){if(!Object.prototype.hasOwnProperty(a)&&Pe.indexOf(a)===-1){var g=ft(t,a,o);g<o&&(n=a,o=g)}}),Error(n!==null?"Invalid Chai property: "+t+'. Did you mean "'+n+'"?':"Invalid Chai property: "+t)}return Pe.indexOf(t)===-1&&!Me(e,"lockSsfi")&&Me(e,"ssfi",d),Reflect.get(e,t)}}):i};function ft(b,i,r){if(Math.abs(b.length-i.length)>=r)return r;for(var d=[],e=0;e<=b.length;e++)d[e]=Array(i.length+1).fill(0),d[e][0]=e;for(var t=0;t<i.length;t++)d[0][t]=t;for(var e=1;e<=b.length;e++)for(var n=b.charCodeAt(e-1),t=1;t<=i.length;t++){if(Math.abs(e-t)>=r){d[e][t]=r;continue}d[e][t]=Math.min(d[e-1][t]+1,d[e][t-1]+1,d[e-1][t-1]+(n===i.charCodeAt(t-1)?0:1))}return d[b.length][i.length]}/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var oe,je;function dt(){if(je)return oe;je=1;var b=Z,i=L(),r=C,d=Q,e=R;return oe=function(n,o,a){var g=function(){r(this,"lockSsfi")||r(this,"ssfi",g);var v=a.apply(this,arguments);if(v!==void 0)return v;var P=new i.Assertion;return e(this,P),P};b(g,o,!1),n[o]=d(g,o)},oe}/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var se,Ne;function ht(){if(Ne)return se;Ne=1;var b=L(),i=C,r=Y,d=R;return se=function(t,n,o){var a=Object.getOwnPropertyDescriptor(t,n),g=function(){};a&&typeof a.get=="function"&&(g=a.get),Object.defineProperty(t,n,{get:function v(){!r()&&!i(this,"lockSsfi")&&i(this,"ssfi",v);var P=i(this,"lockSsfi");i(this,"lockSsfi",!0);var D=o(g).call(this);if(i(this,"lockSsfi",P),D!==void 0)return D;var q=new b.Assertion;return d(this,q),q},configurable:!0})},se}/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var ie,Ee;function lt(){if(Ee)return ie;Ee=1;var b=Z,i=L(),r=C,d=Q,e=R;return ie=function(n,o,a){var g=n[o],v=function(){throw new Error(o+" is not a function")};g&&typeof g=="function"&&(v=g);var P=function(){r(this,"lockSsfi")||r(this,"ssfi",P);var D=r(this,"lockSsfi");r(this,"lockSsfi",!0);var q=a(v).apply(this,arguments);if(r(this,"lockSsfi",D),q!==void 0)return q;var T=new i.Assertion;return e(this,T),T};b(P,o,!1),n[o]=d(P,o)},ie}/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var ae,Ae;function pt(){if(Ae)return ae;Ae=1;/*!
 * Module dependencies
 */var b=Z,i=L(),r=C,d=Q,e=R;/*!
 * Module variables
 */var t=typeof Object.setPrototypeOf=="function",n=function(){},o=Object.getOwnPropertyNames(n).filter(function(v){var P=Object.getOwnPropertyDescriptor(n,v);return typeof P!="object"?!0:!P.configurable}),a=Function.prototype.call,g=Function.prototype.apply;return ae=function(P,D,q,T){typeof T!="function"&&(T=function(){});var $={method:q,chainingBehavior:T};P.__methods||(P.__methods={}),P.__methods[D]=$,Object.defineProperty(P,D,{get:function(){$.chainingBehavior.call(this);var B=function(){r(this,"lockSsfi")||r(this,"ssfi",B);var F=$.method.apply(this,arguments);if(F!==void 0)return F;var V=new i.Assertion;return e(this,V),V};if(b(B,D,!0),t){var G=Object.create(this);G.call=a,G.apply=g,Object.setPrototypeOf(B,G)}else{var J=Object.getOwnPropertyNames(P);J.forEach(function(F){if(o.indexOf(F)===-1){var V=Object.getOwnPropertyDescriptor(P,F);Object.defineProperty(B,F,V)}})}return e(this,B),d(B)},configurable:!0})},ae}/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var ue,De;function bt(){if(De)return ue;De=1;var b=L(),i=R;return ue=function(d,e,t,n){var o=d.__methods[e],a=o.chainingBehavior;o.chainingBehavior=function(){var P=n(a).call(this);if(P!==void 0)return P;var D=new b.Assertion;return i(this,D),D};var g=o.method;o.method=function(){var P=t(g).apply(this,arguments);if(P!==void 0)return P;var D=new b.Assertion;return i(this,D),D}},ue}/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var Se=fe,gt=function(i,r){return Se(i)<Se(r)?-1:1};/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Fe=function(i){return typeof Object.getOwnPropertySymbols!="function"?[]:Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable})};/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var wt=Fe,yt=function(i){return Object.keys(i).concat(wt(i))};/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */function vt(b){return b!==b}var mt=Number.isNaN||vt,xt=ce,qe=C;function Ot(b){var i=xt(b),r=["Array","Object","function"];return r.indexOf(i)!==-1}var Mt=function(i,r){var d=qe(i,"operator"),e=qe(i,"negate"),t=r[3],n=e?r[2]:r[1];if(d)return d;if(typeof n=="function"&&(n=n()),n=n||"",!!n&&!/\shave\s/.test(n)){var o=Ot(t);return/\snot\s/.test(n)?o?"notDeepStrictEqual":"notStrictEqual":o?"deepStrictEqual":"strictEqual"}};/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Te;function Pt(){if(Te)return j;Te=1;/*!
 * Dependencies that are used for multiple exports are required here only once
 */var b=Le;/*!
 * test utility
 */j.test=Je;/*!
 * type utility
 */j.type=ce;/*!
 * expectTypes utility
 */j.expectTypes=Qe;/*!
 * message utility
 */j.getMessage=nt;/*!
 * actual utility
 */j.getActual=ke;/*!
 * Inspect util
 */j.inspect=fe;/*!
 * Object Display util
 */j.objDisplay=Be;/*!
 * Flag utility
 */j.flag=C;/*!
 * Flag transferring utility
 */j.transferFlags=R;/*!
 * Deep equal utility
 */j.eql=Ge;/*!
 * Deep path info
 */j.getPathInfo=b.getPathInfo;/*!
 * Check if a property exists
 */j.hasProperty=b.hasProperty;/*!
 * Function name
 */j.getName=He;/*!
 * add Property
 */j.addProperty=ot();/*!
 * add Method
 */j.addMethod=dt();/*!
 * overwrite Property
 */j.overwriteProperty=ht();/*!
 * overwrite Method
 */j.overwriteMethod=lt();/*!
 * Add a chainable method
 */j.addChainableMethod=pt();/*!
 * Overwrite chainable method
 */j.overwriteChainableMethod=bt();/*!
 * Compare by inspect method
 */j.compareByInspect=gt;/*!
 * Get own enumerable property symbols method
 */j.getOwnEnumerablePropertySymbols=Fe;/*!
 * Get own enumerable properties method
 */j.getOwnEnumerableProperties=yt;/*!
 * Checks error against a given set of criteria
 */j.checkError=Ue;/*!
 * Proxify util
 */j.proxify=Q;/*!
 * addLengthGuard util
 */j.addLengthGuard=Z;/*!
 * isProxyEnabled helper
 */j.isProxyEnabled=Y;/*!
 * isNaN method
 */j.isNaN=mt;/*!
 * getOperator method
 */return j.getOperator=Mt,j}/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var K=U,jt=function(b,i){/*!
 * Module dependencies.
 */var r=b.AssertionError,d=i.flag;/*!
 * Module export.
 */b.Assertion=e;/*!
 * Assertion Constructor
 *
 * Creates object for chaining.
 *
 * `Assertion` objects contain metadata in the form of flags. Three flags can
 * be assigned during instantiation by passing arguments to this constructor:
 *
 * - `object`: This flag contains the target of the assertion. For example, in
 *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
 *   contain `numKittens` so that the `equal` assertion can reference it when
 *   needed.
 *
 * - `message`: This flag contains an optional custom error message to be
 *   prepended to the error message that's generated by the assertion when it
 *   fails.
 *
 * - `ssfi`: This flag stands for "start stack function indicator". It
 *   contains a function reference that serves as the starting point for
 *   removing frames from the stack trace of the error that's created by the
 *   assertion when it fails. The goal is to provide a cleaner stack trace to
 *   end users by removing Chai's internal functions. Note that it only works
 *   in environments that support `Error.captureStackTrace`, and only when
 *   `Chai.config.includeStack` hasn't been set to `false`.
 *
 * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
 *   should retain its current value, even as assertions are chained off of
 *   this object. This is usually set to `true` when creating a new assertion
 *   from within another assertion. It's also temporarily set to `true` before
 *   an overwritten assertion gets called by the overwriting assertion.
 *
 * - `eql`: This flag contains the deepEqual function to be used by the assertion.
 *
 * @param {Mixed} obj target of the assertion
 * @param {String} msg (optional) custom error message
 * @param {Function} ssfi (optional) starting point for removing stack frames
 * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
 * @api private
 */function e(t,n,o,a){return d(this,"ssfi",o||e),d(this,"lockSsfi",a),d(this,"object",t),d(this,"message",n),d(this,"eql",K.deepEqual||i.eql),i.proxify(this)}Object.defineProperty(e,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),K.includeStack},set:function(t){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),K.includeStack=t}}),Object.defineProperty(e,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),K.showDiff},set:function(t){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),K.showDiff=t}}),e.addProperty=function(t,n){i.addProperty(this.prototype,t,n)},e.addMethod=function(t,n){i.addMethod(this.prototype,t,n)},e.addChainableMethod=function(t,n,o){i.addChainableMethod(this.prototype,t,n,o)},e.overwriteProperty=function(t,n){i.overwriteProperty(this.prototype,t,n)},e.overwriteMethod=function(t,n){i.overwriteMethod(this.prototype,t,n)},e.overwriteChainableMethod=function(t,n,o){i.overwriteChainableMethod(this.prototype,t,n,o)},e.prototype.assert=function(t,n,o,a,g,v){var P=i.test(this,arguments);if(v!==!1&&(v=!0),a===void 0&&g===void 0&&(v=!1),K.showDiff!==!0&&(v=!1),!P){n=i.getMessage(this,arguments);var D=i.getActual(this,arguments),q={actual:D,expected:a,showDiff:v},T=i.getOperator(this,arguments);throw T&&(q.operator=T),new r(n,q,K.includeStack?this.assert:d(this,"ssfi"))}};/*!
 * ### ._obj
 *
 * Quick reference to stored `actual` value for plugin developers.
 *
 * @api private
 */Object.defineProperty(e.prototype,"_obj",{get:function(){return d(this,"object")},set:function(t){d(this,"object",t)}})};/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Nt=function(b,i){var r=b.Assertion,d=b.AssertionError,e=i.flag;["to","be","been","is","and","has","have","with","that","which","at","of","same","but","does","still","also"].forEach(function(s){r.addProperty(s)}),r.addProperty("not",function(){e(this,"negate",!0)}),r.addProperty("deep",function(){e(this,"deep",!0)}),r.addProperty("nested",function(){e(this,"nested",!0)}),r.addProperty("own",function(){e(this,"own",!0)}),r.addProperty("ordered",function(){e(this,"ordered",!0)}),r.addProperty("any",function(){e(this,"any",!0),e(this,"all",!1)}),r.addProperty("all",function(){e(this,"all",!0),e(this,"any",!1)});function t(s,u){u&&e(this,"message",u),s=s.toLowerCase();var f=e(this,"object"),h=~["a","e","i","o","u"].indexOf(s.charAt(0))?"an ":"a ";this.assert(s===i.type(f).toLowerCase(),"expected #{this} to be "+h+s,"expected #{this} not to be "+h+s)}r.addChainableMethod("an",t),r.addChainableMethod("a",t);function n(s,u){return i.isNaN(s)&&i.isNaN(u)||s===u}function o(){e(this,"contains",!0)}function a(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=i.type(f).toLowerCase(),p=e(this,"message"),w=e(this,"negate"),l=e(this,"ssfi"),c=e(this,"deep"),y=c?"deep ":"",m=c?e(this,"eql"):n;p=p?p+": ":"";var x=!1;switch(h){case"string":x=f.indexOf(s)!==-1;break;case"weakset":if(c)throw new d(p+"unable to use .deep.include with WeakSet",void 0,l);x=f.has(s);break;case"map":f.forEach(function(N){x=x||m(N,s)});break;case"set":c?f.forEach(function(N){x=x||m(N,s)}):x=f.has(s);break;case"array":c?x=f.some(function(N){return m(N,s)}):x=f.indexOf(s)!==-1;break;default:if(s!==Object(s))throw new d(p+"the given combination of arguments ("+h+" and "+i.type(s).toLowerCase()+") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a "+i.type(s).toLowerCase(),void 0,l);var E=Object.keys(s),M=null,O=0;if(E.forEach(function(N){var A=new r(f);if(i.transferFlags(this,A,!0),e(A,"lockSsfi",!0),!w||E.length===1){A.property(N,s[N]);return}try{A.property(N,s[N])}catch(S){if(!i.checkError.compatibleConstructor(S,d))throw S;M===null&&(M=S),O++}},this),w&&E.length>1&&O===E.length)throw M;return}this.assert(x,"expected #{this} to "+y+"include "+i.inspect(s),"expected #{this} to not "+y+"include "+i.inspect(s))}r.addChainableMethod("include",a,o),r.addChainableMethod("contain",a,o),r.addChainableMethod("contains",a,o),r.addChainableMethod("includes",a,o),r.addProperty("ok",function(){this.assert(e(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")}),r.addProperty("true",function(){this.assert(e(this,"object")===!0,"expected #{this} to be true","expected #{this} to be false",!e(this,"negate"))}),r.addProperty("false",function(){this.assert(e(this,"object")===!1,"expected #{this} to be false","expected #{this} to be true",!!e(this,"negate"))}),r.addProperty("null",function(){this.assert(e(this,"object")===null,"expected #{this} to be null","expected #{this} not to be null")}),r.addProperty("undefined",function(){this.assert(e(this,"object")===void 0,"expected #{this} to be undefined","expected #{this} not to be undefined")}),r.addProperty("NaN",function(){this.assert(i.isNaN(e(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")});function g(){var s=e(this,"object");this.assert(s!=null,"expected #{this} to exist","expected #{this} to not exist")}r.addProperty("exist",g),r.addProperty("exists",g),r.addProperty("empty",function(){var s=e(this,"object"),u=e(this,"ssfi"),f=e(this,"message"),h;switch(f=f?f+": ":"",i.type(s).toLowerCase()){case"array":case"string":h=s.length;break;case"map":case"set":h=s.size;break;case"weakmap":case"weakset":throw new d(f+".empty was passed a weak collection",void 0,u);case"function":var p=f+".empty was passed a function "+i.getName(s);throw new d(p.trim(),void 0,u);default:if(s!==Object(s))throw new d(f+".empty was passed non-string primitive "+i.inspect(s),void 0,u);h=Object.keys(s).length}this.assert(h===0,"expected #{this} to be empty","expected #{this} not to be empty")});function v(){var s=e(this,"object"),u=i.type(s);this.assert(u==="Arguments","expected #{this} to be arguments but got "+u,"expected #{this} to not be arguments")}r.addProperty("arguments",v),r.addProperty("Arguments",v);function P(s,u){u&&e(this,"message",u);var f=e(this,"object");if(e(this,"deep")){var h=e(this,"lockSsfi");e(this,"lockSsfi",!0),this.eql(s),e(this,"lockSsfi",h)}else this.assert(s===f,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",s,this._obj,!0)}r.addMethod("equal",P),r.addMethod("equals",P),r.addMethod("eq",P);function D(s,u){u&&e(this,"message",u);var f=e(this,"eql");this.assert(f(s,e(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",s,this._obj,!0)}r.addMethod("eql",D),r.addMethod("eqls",D);function q(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"doLength"),p=e(this,"message"),w=p?p+": ":"",l=e(this,"ssfi"),c=i.type(f).toLowerCase(),y=i.type(s).toLowerCase(),m,x=!0;if(h&&c!=="map"&&c!=="set"&&new r(f,p,l,!0).to.have.property("length"),!h&&c==="date"&&y!=="date")m=w+"the argument to above must be a date";else if(y!=="number"&&(h||c==="number"))m=w+"the argument to above must be a number";else if(!h&&c!=="date"&&c!=="number"){var E=c==="string"?"'"+f+"'":f;m=w+"expected "+E+" to be a number or a date"}else x=!1;if(x)throw new d(m,void 0,l);if(h){var M="length",O;c==="map"||c==="set"?(M="size",O=f.size):O=f.length,this.assert(O>s,"expected #{this} to have a "+M+" above #{exp} but got #{act}","expected #{this} to not have a "+M+" above #{exp}",s,O)}else this.assert(f>s,"expected #{this} to be above #{exp}","expected #{this} to be at most #{exp}",s)}r.addMethod("above",q),r.addMethod("gt",q),r.addMethod("greaterThan",q);function T(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"doLength"),p=e(this,"message"),w=p?p+": ":"",l=e(this,"ssfi"),c=i.type(f).toLowerCase(),y=i.type(s).toLowerCase(),m,x=!0;if(h&&c!=="map"&&c!=="set"&&new r(f,p,l,!0).to.have.property("length"),!h&&c==="date"&&y!=="date")m=w+"the argument to least must be a date";else if(y!=="number"&&(h||c==="number"))m=w+"the argument to least must be a number";else if(!h&&c!=="date"&&c!=="number"){var E=c==="string"?"'"+f+"'":f;m=w+"expected "+E+" to be a number or a date"}else x=!1;if(x)throw new d(m,void 0,l);if(h){var M="length",O;c==="map"||c==="set"?(M="size",O=f.size):O=f.length,this.assert(O>=s,"expected #{this} to have a "+M+" at least #{exp} but got #{act}","expected #{this} to have a "+M+" below #{exp}",s,O)}else this.assert(f>=s,"expected #{this} to be at least #{exp}","expected #{this} to be below #{exp}",s)}r.addMethod("least",T),r.addMethod("gte",T),r.addMethod("greaterThanOrEqual",T);function $(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"doLength"),p=e(this,"message"),w=p?p+": ":"",l=e(this,"ssfi"),c=i.type(f).toLowerCase(),y=i.type(s).toLowerCase(),m,x=!0;if(h&&c!=="map"&&c!=="set"&&new r(f,p,l,!0).to.have.property("length"),!h&&c==="date"&&y!=="date")m=w+"the argument to below must be a date";else if(y!=="number"&&(h||c==="number"))m=w+"the argument to below must be a number";else if(!h&&c!=="date"&&c!=="number"){var E=c==="string"?"'"+f+"'":f;m=w+"expected "+E+" to be a number or a date"}else x=!1;if(x)throw new d(m,void 0,l);if(h){var M="length",O;c==="map"||c==="set"?(M="size",O=f.size):O=f.length,this.assert(O<s,"expected #{this} to have a "+M+" below #{exp} but got #{act}","expected #{this} to not have a "+M+" below #{exp}",s,O)}else this.assert(f<s,"expected #{this} to be below #{exp}","expected #{this} to be at least #{exp}",s)}r.addMethod("below",$),r.addMethod("lt",$),r.addMethod("lessThan",$);function W(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"doLength"),p=e(this,"message"),w=p?p+": ":"",l=e(this,"ssfi"),c=i.type(f).toLowerCase(),y=i.type(s).toLowerCase(),m,x=!0;if(h&&c!=="map"&&c!=="set"&&new r(f,p,l,!0).to.have.property("length"),!h&&c==="date"&&y!=="date")m=w+"the argument to most must be a date";else if(y!=="number"&&(h||c==="number"))m=w+"the argument to most must be a number";else if(!h&&c!=="date"&&c!=="number"){var E=c==="string"?"'"+f+"'":f;m=w+"expected "+E+" to be a number or a date"}else x=!1;if(x)throw new d(m,void 0,l);if(h){var M="length",O;c==="map"||c==="set"?(M="size",O=f.size):O=f.length,this.assert(O<=s,"expected #{this} to have a "+M+" at most #{exp} but got #{act}","expected #{this} to have a "+M+" above #{exp}",s,O)}else this.assert(f<=s,"expected #{this} to be at most #{exp}","expected #{this} to be above #{exp}",s)}r.addMethod("most",W),r.addMethod("lte",W),r.addMethod("lessThanOrEqual",W),r.addMethod("within",function(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"doLength"),w=e(this,"message"),l=w?w+": ":"",c=e(this,"ssfi"),y=i.type(h).toLowerCase(),m=i.type(s).toLowerCase(),x=i.type(u).toLowerCase(),E,M=!0,O=m==="date"&&x==="date"?s.toISOString()+".."+u.toISOString():s+".."+u;if(p&&y!=="map"&&y!=="set"&&new r(h,w,c,!0).to.have.property("length"),!p&&y==="date"&&(m!=="date"||x!=="date"))E=l+"the arguments to within must be dates";else if((m!=="number"||x!=="number")&&(p||y==="number"))E=l+"the arguments to within must be numbers";else if(!p&&y!=="date"&&y!=="number"){var N=y==="string"?"'"+h+"'":h;E=l+"expected "+N+" to be a number or a date"}else M=!1;if(M)throw new d(E,void 0,c);if(p){var A="length",S;y==="map"||y==="set"?(A="size",S=h.size):S=h.length,this.assert(S>=s&&S<=u,"expected #{this} to have a "+A+" within "+O,"expected #{this} to not have a "+A+" within "+O)}else this.assert(h>=s&&h<=u,"expected #{this} to be within "+O,"expected #{this} to not be within "+O)});function B(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"ssfi"),p=e(this,"message");try{var w=f instanceof s}catch(c){throw c instanceof TypeError?(p=p?p+": ":"",new d(p+"The instanceof assertion needs a constructor but "+i.type(s)+" was given.",void 0,h)):c}var l=i.getName(s);l===null&&(l="an unnamed constructor"),this.assert(w,"expected #{this} to be an instance of "+l,"expected #{this} to not be an instance of "+l)}r.addMethod("instanceof",B),r.addMethod("instanceOf",B);function G(s,u,f){f&&e(this,"message",f);var h=e(this,"nested"),p=e(this,"own"),w=e(this,"message"),l=e(this,"object"),c=e(this,"ssfi"),y=typeof s;if(w=w?w+": ":"",h){if(y!=="string")throw new d(w+"the argument to property must be a string when using nested syntax",void 0,c)}else if(y!=="string"&&y!=="number"&&y!=="symbol")throw new d(w+"the argument to property must be a string, number, or symbol",void 0,c);if(h&&p)throw new d(w+'The "nested" and "own" flags cannot be combined.',void 0,c);if(l==null)throw new d(w+"Target cannot be null or undefined.",void 0,c);var m=e(this,"deep"),x=e(this,"negate"),E=h?i.getPathInfo(l,s):null,M=h?E.value:l[s],O=m?e(this,"eql"):(S,H)=>S===H,N="";m&&(N+="deep "),p&&(N+="own "),h&&(N+="nested "),N+="property ";var A;p?A=Object.prototype.hasOwnProperty.call(l,s):h?A=E.exists:A=i.hasProperty(l,s),(!x||arguments.length===1)&&this.assert(A,"expected #{this} to have "+N+i.inspect(s),"expected #{this} to not have "+N+i.inspect(s)),arguments.length>1&&this.assert(A&&O(u,M),"expected #{this} to have "+N+i.inspect(s)+" of #{exp}, but got #{act}","expected #{this} to not have "+N+i.inspect(s)+" of #{act}",u,M),e(this,"object",M)}r.addMethod("property",G);function J(s,u,f){e(this,"own",!0),G.apply(this,arguments)}r.addMethod("ownProperty",J),r.addMethod("haveOwnProperty",J);function F(s,u,f){typeof u=="string"&&(f=u,u=null),f&&e(this,"message",f);var h=e(this,"object"),p=Object.getOwnPropertyDescriptor(Object(h),s),w=e(this,"eql");p&&u?this.assert(w(u,p),"expected the own property descriptor for "+i.inspect(s)+" on #{this} to match "+i.inspect(u)+", got "+i.inspect(p),"expected the own property descriptor for "+i.inspect(s)+" on #{this} to not match "+i.inspect(u),u,p,!0):this.assert(p,"expected #{this} to have an own property descriptor for "+i.inspect(s),"expected #{this} to not have an own property descriptor for "+i.inspect(s)),e(this,"object",p)}r.addMethod("ownPropertyDescriptor",F),r.addMethod("haveOwnPropertyDescriptor",F);function V(){e(this,"doLength",!0)}function de(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=i.type(f).toLowerCase(),p=e(this,"message"),w=e(this,"ssfi"),l="length",c;switch(h){case"map":case"set":l="size",c=f.size;break;default:new r(f,p,w,!0).to.have.property("length"),c=f.length}this.assert(c==s,"expected #{this} to have a "+l+" of #{exp} but got #{act}","expected #{this} to not have a "+l+" of #{act}",s,c)}r.addChainableMethod("length",de,V),r.addChainableMethod("lengthOf",de,V);function he(s,u){u&&e(this,"message",u);var f=e(this,"object");this.assert(s.exec(f),"expected #{this} to match "+s,"expected #{this} not to match "+s)}r.addMethod("match",he),r.addMethod("matches",he),r.addMethod("string",function(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"message"),p=e(this,"ssfi");new r(f,h,p,!0).is.a("string"),this.assert(~f.indexOf(s),"expected #{this} to contain "+i.inspect(s),"expected #{this} to not contain "+i.inspect(s))});function le(s){var u=e(this,"object"),f=i.type(u),h=i.type(s),p=e(this,"ssfi"),w=e(this,"deep"),l,c="",y,m=!0,x=e(this,"message");x=x?x+": ":"";var E=x+"when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";if(f==="Map"||f==="Set")c=w?"deeply ":"",y=[],u.forEach(function(I,z){y.push(z)}),h!=="Array"&&(s=Array.prototype.slice.call(arguments));else{switch(y=i.getOwnEnumerableProperties(u),h){case"Array":if(arguments.length>1)throw new d(E,void 0,p);break;case"Object":if(arguments.length>1)throw new d(E,void 0,p);s=Object.keys(s);break;default:s=Array.prototype.slice.call(arguments)}s=s.map(function(I){return typeof I=="symbol"?I:String(I)})}if(!s.length)throw new d(x+"keys required",void 0,p);var M=s.length,O=e(this,"any"),N=e(this,"all"),A=s,S=w?e(this,"eql"):(I,z)=>I===z;if(!O&&!N&&(N=!0),O&&(m=A.some(function(I){return y.some(function(z){return S(I,z)})})),N&&(m=A.every(function(I){return y.some(function(z){return S(I,z)})}),e(this,"contains")||(m=m&&s.length==y.length)),M>1){s=s.map(function(I){return i.inspect(I)});var H=s.pop();N&&(l=s.join(", ")+", and "+H),O&&(l=s.join(", ")+", or "+H)}else l=i.inspect(s[0]);l=(M>1?"keys ":"key ")+l,l=(e(this,"contains")?"contain ":"have ")+l,this.assert(m,"expected #{this} to "+c+l,"expected #{this} to not "+c+l,A.slice(0).sort(i.compareByInspect),y.sort(i.compareByInspect),!0)}r.addMethod("keys",le),r.addMethod("key",le);function X(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"ssfi"),w=e(this,"message"),l=e(this,"negate")||!1;new r(h,w,p,!0).is.a("function"),(s instanceof RegExp||typeof s=="string")&&(u=s,s=null);var c;try{h()}catch(H){c=H}var y=s===void 0&&u===void 0,m=!!(s&&u),x=!1,E=!1;if(y||!y&&!l){var M="an error";s instanceof Error?M="#{exp}":s&&(M=i.checkError.getConstructorName(s)),this.assert(c,"expected #{this} to throw "+M,"expected #{this} to not throw an error but #{act} was thrown",s&&s.toString(),c instanceof Error?c.toString():typeof c=="string"?c:c&&i.checkError.getConstructorName(c))}if(s&&c){if(s instanceof Error){var O=i.checkError.compatibleInstance(c,s);O===l&&(m&&l?x=!0:this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(c&&!l?" but #{act} was thrown":""),s.toString(),c.toString()))}var N=i.checkError.compatibleConstructor(c,s);N===l&&(m&&l?x=!0:this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(c?" but #{act} was thrown":""),s instanceof Error?s.toString():s&&i.checkError.getConstructorName(s),c instanceof Error?c.toString():c&&i.checkError.getConstructorName(c)))}if(c&&u!==void 0&&u!==null){var A="including";u instanceof RegExp&&(A="matching");var S=i.checkError.compatibleMessage(c,u);S===l&&(m&&l?E=!0:this.assert(l,"expected #{this} to throw error "+A+" #{exp} but got #{act}","expected #{this} to throw error not "+A+" #{exp}",u,i.checkError.getMessage(c)))}x&&E&&this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(c?" but #{act} was thrown":""),s instanceof Error?s.toString():s&&i.checkError.getConstructorName(s),c instanceof Error?c.toString():c&&i.checkError.getConstructorName(c)),e(this,"object",c)}r.addMethod("throw",X),r.addMethod("throws",X),r.addMethod("Throw",X);function pe(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"itself"),p=typeof f=="function"&&!h?f.prototype[s]:f[s];this.assert(typeof p=="function","expected #{this} to respond to "+i.inspect(s),"expected #{this} to not respond to "+i.inspect(s))}r.addMethod("respondTo",pe),r.addMethod("respondsTo",pe),r.addProperty("itself",function(){e(this,"itself",!0)});function be(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=s(f);this.assert(h,"expected #{this} to satisfy "+i.objDisplay(s),"expected #{this} to not satisfy"+i.objDisplay(s),!e(this,"negate"),h)}r.addMethod("satisfy",be),r.addMethod("satisfies",be);function ge(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"message"),w=e(this,"ssfi");if(new r(h,p,w,!0).is.a("number"),typeof s!="number"||typeof u!="number"){p=p?p+": ":"";var l=u===void 0?", and a delta is required":"";throw new d(p+"the arguments to closeTo or approximately must be numbers"+l,void 0,w)}this.assert(Math.abs(h-s)<=u,"expected #{this} to be close to "+s+" +/- "+u,"expected #{this} not to be close to "+s+" +/- "+u)}r.addMethod("closeTo",ge),r.addMethod("approximately",ge);function $e(s,u,f,h,p){if(!h){if(s.length!==u.length)return!1;u=u.slice()}return s.every(function(w,l){if(p)return f?f(w,u[l]):w===u[l];if(!f){var c=u.indexOf(w);return c===-1?!1:(h||u.splice(c,1),!0)}return u.some(function(y,m){return f(w,y)?(h||u.splice(m,1),!0):!1})})}r.addMethod("members",function(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"message"),p=e(this,"ssfi");new r(f,h,p,!0).to.be.an("array"),new r(s,h,p,!0).to.be.an("array");var w=e(this,"contains"),l=e(this,"ordered"),c,y,m;w?(c=l?"an ordered superset":"a superset",y="expected #{this} to be "+c+" of #{exp}",m="expected #{this} to not be "+c+" of #{exp}"):(c=l?"ordered members":"members",y="expected #{this} to have the same "+c+" as #{exp}",m="expected #{this} to not have the same "+c+" as #{exp}");var x=e(this,"deep")?e(this,"eql"):void 0;this.assert($e(s,f,x,w,l),y,m,s,f,!0)});function Ve(s,u){u&&e(this,"message",u);var f=e(this,"object"),h=e(this,"message"),p=e(this,"ssfi"),w=e(this,"contains"),l=e(this,"deep"),c=e(this,"eql");new r(s,h,p,!0).to.be.an("array"),w?this.assert(s.some(function(y){return f.indexOf(y)>-1}),"expected #{this} to contain one of #{exp}","expected #{this} to not contain one of #{exp}",s,f):l?this.assert(s.some(function(y){return c(f,y)}),"expected #{this} to deeply equal one of #{exp}","expected #{this} to deeply equal one of #{exp}",s,f):this.assert(s.indexOf(f)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",s,f)}r.addMethod("oneOf",Ve);function we(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"message"),w=e(this,"ssfi");new r(h,p,w,!0).is.a("function");var l;u?(new r(s,p,w,!0).to.have.property(u),l=s[u]):(new r(s,p,w,!0).is.a("function"),l=s()),h();var c=u==null?s():s[u],y=u==null?l:"."+u;e(this,"deltaMsgObj",y),e(this,"initialDeltaValue",l),e(this,"finalDeltaValue",c),e(this,"deltaBehavior","change"),e(this,"realDelta",c!==l),this.assert(l!==c,"expected "+y+" to change","expected "+y+" to not change")}r.addMethod("change",we),r.addMethod("changes",we);function ye(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"message"),w=e(this,"ssfi");new r(h,p,w,!0).is.a("function");var l;u?(new r(s,p,w,!0).to.have.property(u),l=s[u]):(new r(s,p,w,!0).is.a("function"),l=s()),new r(l,p,w,!0).is.a("number"),h();var c=u==null?s():s[u],y=u==null?l:"."+u;e(this,"deltaMsgObj",y),e(this,"initialDeltaValue",l),e(this,"finalDeltaValue",c),e(this,"deltaBehavior","increase"),e(this,"realDelta",c-l),this.assert(c-l>0,"expected "+y+" to increase","expected "+y+" to not increase")}r.addMethod("increase",ye),r.addMethod("increases",ye);function ve(s,u,f){f&&e(this,"message",f);var h=e(this,"object"),p=e(this,"message"),w=e(this,"ssfi");new r(h,p,w,!0).is.a("function");var l;u?(new r(s,p,w,!0).to.have.property(u),l=s[u]):(new r(s,p,w,!0).is.a("function"),l=s()),new r(l,p,w,!0).is.a("number"),h();var c=u==null?s():s[u],y=u==null?l:"."+u;e(this,"deltaMsgObj",y),e(this,"initialDeltaValue",l),e(this,"finalDeltaValue",c),e(this,"deltaBehavior","decrease"),e(this,"realDelta",l-c),this.assert(c-l<0,"expected "+y+" to decrease","expected "+y+" to not decrease")}r.addMethod("decrease",ve),r.addMethod("decreases",ve);function ze(s,u){u&&e(this,"message",u);var f=e(this,"deltaMsgObj"),h=e(this,"initialDeltaValue"),p=e(this,"finalDeltaValue"),w=e(this,"deltaBehavior"),l=e(this,"realDelta"),c;w==="change"?c=Math.abs(p-h)===Math.abs(s):c=l===Math.abs(s),this.assert(c,"expected "+f+" to "+w+" by "+s,"expected "+f+" to not "+w+" by "+s)}r.addMethod("by",ze),r.addProperty("extensible",function(){var s=e(this,"object"),u=s===Object(s)&&Object.isExtensible(s);this.assert(u,"expected #{this} to be extensible","expected #{this} to not be extensible")}),r.addProperty("sealed",function(){var s=e(this,"object"),u=s===Object(s)?Object.isSealed(s):!0;this.assert(u,"expected #{this} to be sealed","expected #{this} to not be sealed")}),r.addProperty("frozen",function(){var s=e(this,"object"),u=s===Object(s)?Object.isFrozen(s):!0;this.assert(u,"expected #{this} to be frozen","expected #{this} to not be frozen")}),r.addProperty("finite",function(s){var u=e(this,"object");this.assert(typeof u=="number"&&isFinite(u),"expected #{this} to be a finite number","expected #{this} to not be a finite number")})};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Et=function(b,i){b.expect=function(r,d){return new b.Assertion(r,d)},b.expect.fail=function(r,d,e,t){throw arguments.length<2&&(e=r,r=void 0),e=e||"expect.fail()",new b.AssertionError(e,{actual:r,expected:d,operator:t},b.expect.fail)}};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var At=function(b,i){var r=b.Assertion;function d(){function e(){return this instanceof String||this instanceof Number||this instanceof Boolean||typeof Symbol=="function"&&this instanceof Symbol||typeof BigInt=="function"&&this instanceof BigInt?new r(this.valueOf(),null,e):new r(this,null,e)}function t(o){Object.defineProperty(this,"should",{value:o,enumerable:!0,configurable:!0,writable:!0})}Object.defineProperty(Object.prototype,"should",{set:t,get:e,configurable:!0});var n={};return n.fail=function(o,a,g,v){throw arguments.length<2&&(g=o,o=void 0),g=g||"should.fail()",new b.AssertionError(g,{actual:o,expected:a,operator:v},n.fail)},n.equal=function(o,a,g){new r(o,g).to.equal(a)},n.Throw=function(o,a,g,v){new r(o,v).to.Throw(a,g)},n.exist=function(o,a){new r(o,a).to.exist},n.not={},n.not.equal=function(o,a,g){new r(o,g).to.not.equal(a)},n.not.Throw=function(o,a,g,v){new r(o,v).to.not.Throw(a,g)},n.not.exist=function(o,a){new r(o,a).to.not.exist},n.throw=n.Throw,n.not.throw=n.not.Throw,n}b.should=d,b.Should=d};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Dt=function(b,i){/*!
 * Chai dependencies.
 */var r=b.Assertion,d=i.flag;/*!
 * Module export.
 */var e=b.assert=function(t,n){var o=new r(null,null,b.assert,!0);o.assert(t,n,"[ negation message unavailable ]")};e.fail=function(t,n,o,a){throw arguments.length<2&&(o=t,t=void 0),o=o||"assert.fail()",new b.AssertionError(o,{actual:t,expected:n,operator:a},e.fail)},e.isOk=function(t,n){new r(t,n,e.isOk,!0).is.ok},e.isNotOk=function(t,n){new r(t,n,e.isNotOk,!0).is.not.ok},e.equal=function(t,n,o){var a=new r(t,o,e.equal,!0);a.assert(n==d(a,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",n,t,!0)},e.notEqual=function(t,n,o){var a=new r(t,o,e.notEqual,!0);a.assert(n!=d(a,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",n,t,!0)},e.strictEqual=function(t,n,o){new r(t,o,e.strictEqual,!0).to.equal(n)},e.notStrictEqual=function(t,n,o){new r(t,o,e.notStrictEqual,!0).to.not.equal(n)},e.deepEqual=e.deepStrictEqual=function(t,n,o){new r(t,o,e.deepEqual,!0).to.eql(n)},e.notDeepEqual=function(t,n,o){new r(t,o,e.notDeepEqual,!0).to.not.eql(n)},e.isAbove=function(t,n,o){new r(t,o,e.isAbove,!0).to.be.above(n)},e.isAtLeast=function(t,n,o){new r(t,o,e.isAtLeast,!0).to.be.least(n)},e.isBelow=function(t,n,o){new r(t,o,e.isBelow,!0).to.be.below(n)},e.isAtMost=function(t,n,o){new r(t,o,e.isAtMost,!0).to.be.most(n)},e.isTrue=function(t,n){new r(t,n,e.isTrue,!0).is.true},e.isNotTrue=function(t,n){new r(t,n,e.isNotTrue,!0).to.not.equal(!0)},e.isFalse=function(t,n){new r(t,n,e.isFalse,!0).is.false},e.isNotFalse=function(t,n){new r(t,n,e.isNotFalse,!0).to.not.equal(!1)},e.isNull=function(t,n){new r(t,n,e.isNull,!0).to.equal(null)},e.isNotNull=function(t,n){new r(t,n,e.isNotNull,!0).to.not.equal(null)},e.isNaN=function(t,n){new r(t,n,e.isNaN,!0).to.be.NaN},e.isNotNaN=function(t,n){new r(t,n,e.isNotNaN,!0).not.to.be.NaN},e.exists=function(t,n){new r(t,n,e.exists,!0).to.exist},e.notExists=function(t,n){new r(t,n,e.notExists,!0).to.not.exist},e.isUndefined=function(t,n){new r(t,n,e.isUndefined,!0).to.equal(void 0)},e.isDefined=function(t,n){new r(t,n,e.isDefined,!0).to.not.equal(void 0)},e.isFunction=function(t,n){new r(t,n,e.isFunction,!0).to.be.a("function")},e.isNotFunction=function(t,n){new r(t,n,e.isNotFunction,!0).to.not.be.a("function")},e.isObject=function(t,n){new r(t,n,e.isObject,!0).to.be.a("object")},e.isNotObject=function(t,n){new r(t,n,e.isNotObject,!0).to.not.be.a("object")},e.isArray=function(t,n){new r(t,n,e.isArray,!0).to.be.an("array")},e.isNotArray=function(t,n){new r(t,n,e.isNotArray,!0).to.not.be.an("array")},e.isString=function(t,n){new r(t,n,e.isString,!0).to.be.a("string")},e.isNotString=function(t,n){new r(t,n,e.isNotString,!0).to.not.be.a("string")},e.isNumber=function(t,n){new r(t,n,e.isNumber,!0).to.be.a("number")},e.isNotNumber=function(t,n){new r(t,n,e.isNotNumber,!0).to.not.be.a("number")},e.isFinite=function(t,n){new r(t,n,e.isFinite,!0).to.be.finite},e.isBoolean=function(t,n){new r(t,n,e.isBoolean,!0).to.be.a("boolean")},e.isNotBoolean=function(t,n){new r(t,n,e.isNotBoolean,!0).to.not.be.a("boolean")},e.typeOf=function(t,n,o){new r(t,o,e.typeOf,!0).to.be.a(n)},e.notTypeOf=function(t,n,o){new r(t,o,e.notTypeOf,!0).to.not.be.a(n)},e.instanceOf=function(t,n,o){new r(t,o,e.instanceOf,!0).to.be.instanceOf(n)},e.notInstanceOf=function(t,n,o){new r(t,o,e.notInstanceOf,!0).to.not.be.instanceOf(n)},e.include=function(t,n,o){new r(t,o,e.include,!0).include(n)},e.notInclude=function(t,n,o){new r(t,o,e.notInclude,!0).not.include(n)},e.deepInclude=function(t,n,o){new r(t,o,e.deepInclude,!0).deep.include(n)},e.notDeepInclude=function(t,n,o){new r(t,o,e.notDeepInclude,!0).not.deep.include(n)},e.nestedInclude=function(t,n,o){new r(t,o,e.nestedInclude,!0).nested.include(n)},e.notNestedInclude=function(t,n,o){new r(t,o,e.notNestedInclude,!0).not.nested.include(n)},e.deepNestedInclude=function(t,n,o){new r(t,o,e.deepNestedInclude,!0).deep.nested.include(n)},e.notDeepNestedInclude=function(t,n,o){new r(t,o,e.notDeepNestedInclude,!0).not.deep.nested.include(n)},e.ownInclude=function(t,n,o){new r(t,o,e.ownInclude,!0).own.include(n)},e.notOwnInclude=function(t,n,o){new r(t,o,e.notOwnInclude,!0).not.own.include(n)},e.deepOwnInclude=function(t,n,o){new r(t,o,e.deepOwnInclude,!0).deep.own.include(n)},e.notDeepOwnInclude=function(t,n,o){new r(t,o,e.notDeepOwnInclude,!0).not.deep.own.include(n)},e.match=function(t,n,o){new r(t,o,e.match,!0).to.match(n)},e.notMatch=function(t,n,o){new r(t,o,e.notMatch,!0).to.not.match(n)},e.property=function(t,n,o){new r(t,o,e.property,!0).to.have.property(n)},e.notProperty=function(t,n,o){new r(t,o,e.notProperty,!0).to.not.have.property(n)},e.propertyVal=function(t,n,o,a){new r(t,a,e.propertyVal,!0).to.have.property(n,o)},e.notPropertyVal=function(t,n,o,a){new r(t,a,e.notPropertyVal,!0).to.not.have.property(n,o)},e.deepPropertyVal=function(t,n,o,a){new r(t,a,e.deepPropertyVal,!0).to.have.deep.property(n,o)},e.notDeepPropertyVal=function(t,n,o,a){new r(t,a,e.notDeepPropertyVal,!0).to.not.have.deep.property(n,o)},e.ownProperty=function(t,n,o){new r(t,o,e.ownProperty,!0).to.have.own.property(n)},e.notOwnProperty=function(t,n,o){new r(t,o,e.notOwnProperty,!0).to.not.have.own.property(n)},e.ownPropertyVal=function(t,n,o,a){new r(t,a,e.ownPropertyVal,!0).to.have.own.property(n,o)},e.notOwnPropertyVal=function(t,n,o,a){new r(t,a,e.notOwnPropertyVal,!0).to.not.have.own.property(n,o)},e.deepOwnPropertyVal=function(t,n,o,a){new r(t,a,e.deepOwnPropertyVal,!0).to.have.deep.own.property(n,o)},e.notDeepOwnPropertyVal=function(t,n,o,a){new r(t,a,e.notDeepOwnPropertyVal,!0).to.not.have.deep.own.property(n,o)},e.nestedProperty=function(t,n,o){new r(t,o,e.nestedProperty,!0).to.have.nested.property(n)},e.notNestedProperty=function(t,n,o){new r(t,o,e.notNestedProperty,!0).to.not.have.nested.property(n)},e.nestedPropertyVal=function(t,n,o,a){new r(t,a,e.nestedPropertyVal,!0).to.have.nested.property(n,o)},e.notNestedPropertyVal=function(t,n,o,a){new r(t,a,e.notNestedPropertyVal,!0).to.not.have.nested.property(n,o)},e.deepNestedPropertyVal=function(t,n,o,a){new r(t,a,e.deepNestedPropertyVal,!0).to.have.deep.nested.property(n,o)},e.notDeepNestedPropertyVal=function(t,n,o,a){new r(t,a,e.notDeepNestedPropertyVal,!0).to.not.have.deep.nested.property(n,o)},e.lengthOf=function(t,n,o){new r(t,o,e.lengthOf,!0).to.have.lengthOf(n)},e.hasAnyKeys=function(t,n,o){new r(t,o,e.hasAnyKeys,!0).to.have.any.keys(n)},e.hasAllKeys=function(t,n,o){new r(t,o,e.hasAllKeys,!0).to.have.all.keys(n)},e.containsAllKeys=function(t,n,o){new r(t,o,e.containsAllKeys,!0).to.contain.all.keys(n)},e.doesNotHaveAnyKeys=function(t,n,o){new r(t,o,e.doesNotHaveAnyKeys,!0).to.not.have.any.keys(n)},e.doesNotHaveAllKeys=function(t,n,o){new r(t,o,e.doesNotHaveAllKeys,!0).to.not.have.all.keys(n)},e.hasAnyDeepKeys=function(t,n,o){new r(t,o,e.hasAnyDeepKeys,!0).to.have.any.deep.keys(n)},e.hasAllDeepKeys=function(t,n,o){new r(t,o,e.hasAllDeepKeys,!0).to.have.all.deep.keys(n)},e.containsAllDeepKeys=function(t,n,o){new r(t,o,e.containsAllDeepKeys,!0).to.contain.all.deep.keys(n)},e.doesNotHaveAnyDeepKeys=function(t,n,o){new r(t,o,e.doesNotHaveAnyDeepKeys,!0).to.not.have.any.deep.keys(n)},e.doesNotHaveAllDeepKeys=function(t,n,o){new r(t,o,e.doesNotHaveAllDeepKeys,!0).to.not.have.all.deep.keys(n)},e.throws=function(t,n,o,a){(typeof n=="string"||n instanceof RegExp)&&(o=n,n=null);var g=new r(t,a,e.throws,!0).to.throw(n,o);return d(g,"object")},e.doesNotThrow=function(t,n,o,a){(typeof n=="string"||n instanceof RegExp)&&(o=n,n=null),new r(t,a,e.doesNotThrow,!0).to.not.throw(n,o)},e.operator=function(t,n,o,a){var g;switch(n){case"==":g=t==o;break;case"===":g=t===o;break;case">":g=t>o;break;case">=":g=t>=o;break;case"<":g=t<o;break;case"<=":g=t<=o;break;case"!=":g=t!=o;break;case"!==":g=t!==o;break;default:throw a=a&&a+": ",new b.AssertionError(a+'Invalid operator "'+n+'"',void 0,e.operator)}var v=new r(g,a,e.operator,!0);v.assert(d(v,"object")===!0,"expected "+i.inspect(t)+" to be "+n+" "+i.inspect(o),"expected "+i.inspect(t)+" to not be "+n+" "+i.inspect(o))},e.closeTo=function(t,n,o,a){new r(t,a,e.closeTo,!0).to.be.closeTo(n,o)},e.approximately=function(t,n,o,a){new r(t,a,e.approximately,!0).to.be.approximately(n,o)},e.sameMembers=function(t,n,o){new r(t,o,e.sameMembers,!0).to.have.same.members(n)},e.notSameMembers=function(t,n,o){new r(t,o,e.notSameMembers,!0).to.not.have.same.members(n)},e.sameDeepMembers=function(t,n,o){new r(t,o,e.sameDeepMembers,!0).to.have.same.deep.members(n)},e.notSameDeepMembers=function(t,n,o){new r(t,o,e.notSameDeepMembers,!0).to.not.have.same.deep.members(n)},e.sameOrderedMembers=function(t,n,o){new r(t,o,e.sameOrderedMembers,!0).to.have.same.ordered.members(n)},e.notSameOrderedMembers=function(t,n,o){new r(t,o,e.notSameOrderedMembers,!0).to.not.have.same.ordered.members(n)},e.sameDeepOrderedMembers=function(t,n,o){new r(t,o,e.sameDeepOrderedMembers,!0).to.have.same.deep.ordered.members(n)},e.notSameDeepOrderedMembers=function(t,n,o){new r(t,o,e.notSameDeepOrderedMembers,!0).to.not.have.same.deep.ordered.members(n)},e.includeMembers=function(t,n,o){new r(t,o,e.includeMembers,!0).to.include.members(n)},e.notIncludeMembers=function(t,n,o){new r(t,o,e.notIncludeMembers,!0).to.not.include.members(n)},e.includeDeepMembers=function(t,n,o){new r(t,o,e.includeDeepMembers,!0).to.include.deep.members(n)},e.notIncludeDeepMembers=function(t,n,o){new r(t,o,e.notIncludeDeepMembers,!0).to.not.include.deep.members(n)},e.includeOrderedMembers=function(t,n,o){new r(t,o,e.includeOrderedMembers,!0).to.include.ordered.members(n)},e.notIncludeOrderedMembers=function(t,n,o){new r(t,o,e.notIncludeOrderedMembers,!0).to.not.include.ordered.members(n)},e.includeDeepOrderedMembers=function(t,n,o){new r(t,o,e.includeDeepOrderedMembers,!0).to.include.deep.ordered.members(n)},e.notIncludeDeepOrderedMembers=function(t,n,o){new r(t,o,e.notIncludeDeepOrderedMembers,!0).to.not.include.deep.ordered.members(n)},e.oneOf=function(t,n,o){new r(t,o,e.oneOf,!0).to.be.oneOf(n)},e.changes=function(t,n,o,a){arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.changes,!0).to.change(n,o)},e.changesBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.changesBy,!0).to.change(n,o).by(a)},e.doesNotChange=function(t,n,o,a){return arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.doesNotChange,!0).to.not.change(n,o)},e.changesButNotBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.changesButNotBy,!0).to.change(n,o).but.not.by(a)},e.increases=function(t,n,o,a){return arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.increases,!0).to.increase(n,o)},e.increasesBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.increasesBy,!0).to.increase(n,o).by(a)},e.doesNotIncrease=function(t,n,o,a){return arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.doesNotIncrease,!0).to.not.increase(n,o)},e.increasesButNotBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.increasesButNotBy,!0).to.increase(n,o).but.not.by(a)},e.decreases=function(t,n,o,a){return arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.decreases,!0).to.decrease(n,o)},e.decreasesBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.decreasesBy,!0).to.decrease(n,o).by(a)},e.doesNotDecrease=function(t,n,o,a){return arguments.length===3&&typeof n=="function"&&(a=o,o=null),new r(t,a,e.doesNotDecrease,!0).to.not.decrease(n,o)},e.doesNotDecreaseBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);return new r(t,g,e.doesNotDecreaseBy,!0).to.not.decrease(n,o).by(a)},e.decreasesButNotBy=function(t,n,o,a,g){if(arguments.length===4&&typeof n=="function"){var v=a;a=o,g=v}else arguments.length===3&&(a=o,o=null);new r(t,g,e.decreasesButNotBy,!0).to.decrease(n,o).but.not.by(a)};/*!
 * ### .ifError(object)
 *
 * Asserts if value is not a false value, and throws if it is a true value.
 * This is added to allow for chai to be a drop-in replacement for Node's
 * assert class.
 *
 *     var err = new Error('I am a custom error');
 *     assert.ifError(err); // Rethrows err!
 *
 * @name ifError
 * @param {Object} object
 * @namespace Assert
 * @api public
 */e.ifError=function(t){if(t)throw t},e.isExtensible=function(t,n){new r(t,n,e.isExtensible,!0).to.be.extensible},e.isNotExtensible=function(t,n){new r(t,n,e.isNotExtensible,!0).to.not.be.extensible},e.isSealed=function(t,n){new r(t,n,e.isSealed,!0).to.be.sealed},e.isNotSealed=function(t,n){new r(t,n,e.isNotSealed,!0).to.not.be.sealed},e.isFrozen=function(t,n){new r(t,n,e.isFrozen,!0).to.be.frozen},e.isNotFrozen=function(t,n){new r(t,n,e.isNotFrozen,!0).to.not.be.frozen},e.isEmpty=function(t,n){new r(t,n,e.isEmpty,!0).to.be.empty},e.isNotEmpty=function(t,n){new r(t,n,e.isNotEmpty,!0).to.not.be.empty};/*!
 * Aliases.
 */(function t(n,o){return e[o]=e[n],t})("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")("isEmpty","empty")("isNotEmpty","notEmpty")};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Ie;function L(){return Ie||(Ie=1,function(b){var i=[];/*!
 * Chai version
 */b.version="4.3.8";/*!
 * Assertion Error
 */b.AssertionError=Ce;/*!
 * Utils for plugins (not exported)
 */var r=Pt();b.use=function(g){return~i.indexOf(g)||(g(b,r),i.push(g)),b};/*!
 * Utility Functions
 */b.util=r;/*!
 * Configuration
 */var d=U;b.config=d;/*!
 * Primary `Assertion` prototype
 */var e=jt;b.use(e);/*!
 * Core Assertions
 */var t=Nt;b.use(t);/*!
 * Expect interface
 */var n=Et;b.use(n);/*!
 * Should interface
 */var o=At;b.use(o);/*!
 * Assert interface
 */var a=Dt;b.use(a)}(_)),_}var St=L();const k=Re(St),Vt=k.expect;k.version;k.Assertion;k.AssertionError;const zt=k.util;k.config;const Kt=k.use;k.should;const Rt=k.assert;k.core;export{Rt as a,Kt as b,Vt as e,zt as u};
//# sourceMappingURL=chai-DTVZgaf2.js.map
