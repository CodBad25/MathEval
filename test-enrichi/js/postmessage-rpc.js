import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/.pnpm/eventemitter3@3.1.2/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.pnpm/eventemitter3@3.1.2/node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/error.js
var require_error = __commonJS({
  "node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/error.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var RPCError = (
      /** @class */
      function(_super) {
        __extends(RPCError2, _super);
        function RPCError2(code, message, path) {
          var _this = _super.call(this, "Error #" + code + ": " + message) || this;
          _this.code = code;
          _this.message = message;
          _this.path = path;
          Object.setPrototypeOf(_this, RPCError2.prototype);
          return _this;
        }
        RPCError2.prototype.toReplyError = function() {
          return {
            code: this.code,
            message: this.message,
            path: this.path
          };
        };
        return RPCError2;
      }(Error)
    );
    exports.RPCError = RPCError;
  }
});

// node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/reorder.js
var require_reorder = __commonJS({
  "node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/reorder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Reorder = (
      /** @class */
      function() {
        function Reorder2() {
          this.lastSequentialCall = -1;
          this.queue = [];
        }
        Reorder2.prototype.reset = function(counter) {
          this.lastSequentialCall = counter - 1;
          this.queue = [];
        };
        Reorder2.prototype.append = function(packet) {
          if (packet.counter <= this.lastSequentialCall + 1) {
            var list = [packet];
            this.lastSequentialCall = packet.counter;
            this.replayQueue(list);
            return list;
          }
          for (var i = 0; i < this.queue.length; i++) {
            if (this.queue[i].counter > packet.counter) {
              this.queue.splice(i, 0, packet);
              return [];
            }
          }
          this.queue.push(packet);
          return [];
        };
        Reorder2.prototype.replayQueue = function(list) {
          while (this.queue.length) {
            var next = this.queue[0];
            if (next.counter > this.lastSequentialCall + 1) {
              return;
            }
            list.push(this.queue.shift());
            this.lastSequentialCall = next.counter;
          }
        };
        return Reorder2;
      }()
    );
    exports.Reorder = Reorder;
  }
});

// node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/types.js
var require_types = __commonJS({
  "node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isRPCMessage(data) {
      return (data.type === "method" || data.type === "reply") && typeof data.counter === "number";
    }
    exports.isRPCMessage = isRPCMessage;
    exports.defaultRecievable = {
      readMessages: function(callback) {
        window.addEventListener("message", callback);
        return function() {
          return window.removeEventListener("message", callback);
        };
      }
    };
  }
});

// node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/rpc.js
var require_rpc = __commonJS({
  "node_modules/.pnpm/@mixer+postmessage-rpc@1.1.4/node_modules/@mixer/postmessage-rpc/dist/rpc.js"(exports) {
    var __extends = exports && exports.__extends || function() {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var eventemitter3_1 = require_eventemitter3();
    var error_1 = require_error();
    var reorder_1 = require_reorder();
    var types_1 = require_types();
    function objToError(obj) {
      return new error_1.RPCError(obj.code, obj.message, obj.path);
    }
    var magicReadyCallId = -1;
    var RPC = (
      /** @class */
      function(_super) {
        __extends(RPC2, _super);
        function RPC2(options) {
          var _this = _super.call(this) || this;
          _this.options = options;
          _this.calls = /* @__PURE__ */ Object.create(null);
          _this.callCounter = 0;
          _this.reorder = new reorder_1.Reorder();
          _this.listener = function(ev) {
            if (_this.options.origin && _this.options.origin !== "*" && ev.origin !== _this.options.origin) {
              return;
            }
            var packet;
            try {
              packet = JSON.parse(ev.data);
            } catch (e) {
              return;
            }
            if (!types_1.isRPCMessage(packet) || packet.serviceID !== _this.options.serviceId) {
              return;
            }
            if (_this.isReadySignal(packet)) {
              var params = packet.type === "method" ? packet.params : packet.result;
              if (params && params.protocolVersion) {
                _this.remoteProtocolVersion = params.protocolVersion;
              } else {
                _this.remoteProtocolVersion = _this.remoteProtocolVersion;
              }
              _this.callCounter = 0;
              _this.reorder.reset(packet.counter);
              _this.emit("isReady", true);
            }
            for (var _i = 0, _a = _this.reorder.append(packet); _i < _a.length; _i++) {
              var p = _a[_i];
              _this.emit("recvData", p);
              _this.dispatchIncoming(p);
            }
          };
          _this.unsubscribeCallback = (options.receiver || types_1.defaultRecievable).readMessages(_this.listener);
          _this.isReady = new Promise(function(resolve) {
            var response = { protocolVersion: options.protocolVersion || "1.0" };
            _this.expose("ready", function() {
              resolve();
              return response;
            });
            _this.call("ready", response).then(resolve).catch(resolve);
          });
          return _this;
        }
        RPC2.prototype.create = function(options) {
          var rpc = new RPC2(options);
          return rpc.isReady.then(function() {
            return rpc;
          });
        };
        RPC2.prototype.expose = function(method, handler) {
          var _this = this;
          this.on(method, function(data) {
            if (data.discard) {
              handler(data.params);
              return;
            }
            new Promise(function(resolve) {
              return resolve(handler(data.params));
            }).then(function(result) {
              return {
                type: "reply",
                serviceID: _this.options.serviceId,
                id: data.id,
                result
              };
            }).catch(function(err) {
              return {
                type: "reply",
                serviceID: _this.options.serviceId,
                id: data.id,
                error: err instanceof error_1.RPCError ? err.toReplyError() : { code: 0, message: err.stack || err.message }
              };
            }).then(function(packet) {
              _this.emit("sendReply", packet);
              _this.post(packet);
            });
          });
          return this;
        };
        RPC2.prototype.call = function(method, params, waitForReply) {
          var _this = this;
          if (waitForReply === void 0) {
            waitForReply = true;
          }
          var id = method === "ready" ? magicReadyCallId : this.callCounter;
          var packet = {
            type: "method",
            serviceID: this.options.serviceId,
            id,
            params,
            method,
            discard: !waitForReply
          };
          this.emit("sendMethod", packet);
          this.post(packet);
          if (!waitForReply) {
            return;
          }
          return new Promise(function(resolve, reject) {
            _this.calls[id] = function(err, res) {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            };
          });
        };
        RPC2.prototype.destroy = function() {
          this.emit("destroy");
          this.unsubscribeCallback();
        };
        RPC2.prototype.remoteVersion = function() {
          return this.remoteProtocolVersion;
        };
        RPC2.prototype.handleReply = function(packet) {
          var handler = this.calls[packet.id];
          if (!handler) {
            return;
          }
          if (packet.error) {
            handler(objToError(packet.error), null);
          } else {
            handler(null, packet.result);
          }
          delete this.calls[packet.id];
        };
        RPC2.prototype.post = function(message) {
          message.counter = this.callCounter++;
          this.options.target.postMessage(JSON.stringify(message), this.options.origin || "*");
        };
        RPC2.prototype.isReadySignal = function(packet) {
          if (packet.type === "method" && packet.method === "ready") {
            return true;
          }
          if (packet.type === "reply" && packet.id === magicReadyCallId) {
            return true;
          }
          return false;
        };
        RPC2.prototype.dispatchIncoming = function(packet) {
          switch (packet.type) {
            case "method":
              this.emit("recvMethod", packet);
              if (this.listeners(packet.method).length > 0) {
                this.emit(packet.method, packet);
                return;
              }
              this.post({
                type: "reply",
                serviceID: this.options.serviceId,
                id: packet.id,
                error: { code: 4003, message: 'Unknown method name "' + packet.method + '"' },
                result: null
              });
              break;
            case "reply":
              this.emit("recvReply", packet);
              this.handleReply(packet);
              break;
            default:
          }
        };
        return RPC2;
      }(eventemitter3_1.EventEmitter)
    );
    exports.RPC = RPC;
  }
});
export default require_rpc();
//# sourceMappingURL=@mixer_postmessage-rpc.js.map
