/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 *//*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */function n(){var s=[].slice.call(arguments);function c(t,e){Object.keys(e).forEach(function(r){~s.indexOf(r)||(t[r]=e[r])})}return function(){for(var e=[].slice.call(arguments),r=0,a={};r<e.length;r++)c(a,e[r]);return a}}/*!
 * Primary Exports
 */var u=o;function o(s,c,t){var e=n("name","message","stack","constructor","toJSON"),r=e(c||{});this.message=s||"Unspecified AssertionError",this.showDiff=!1;for(var a in r)this[a]=r[a];if(t=t||o,Error.captureStackTrace)Error.captureStackTrace(this,t);else try{throw new Error}catch(i){this.stack=i.stack}}/*!
 * Inherit from Error.prototype
 */o.prototype=Object.create(Error.prototype);/*!
 * Statically set name
 */o.prototype.name="AssertionError";/*!
 * Ensure correct constructor
 */o.prototype.constructor=o;o.prototype.toJSON=function(s){var c=n("constructor","toJSON","stack"),t=c({name:this.name},this);return s!==!1&&this.stack&&(t.stack=this.stack),t};export{u as a};
//# sourceMappingURL=assertion-error-DjoNT2lE.js.map
