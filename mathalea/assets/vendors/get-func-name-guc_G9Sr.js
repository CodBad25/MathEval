var o=Function.prototype.toString,a=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/,i=512;function f(n){if(typeof n!="function")return null;var e="";if(typeof Function.prototype.name>"u"&&typeof n.name>"u"){var t=o.call(n);if(t.indexOf("(")>i)return e;var r=t.match(a);r&&(e=r[1])}else e=n.name;return e}var u=f;export{u as g};
//# sourceMappingURL=get-func-name-guc_G9Sr.js.map
