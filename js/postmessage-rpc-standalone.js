/**
 * Minimal standalone RPC implementation for browser
 * Based on @mixer/postmessage-rpc but adapted for direct browser use
 */

(function(window) {
    'use strict';

    // RPC Error class
    class RPCError extends Error {
        constructor(code, message, path) {
            super(`Error #${code}: ${message}`);
            this.code = code;
            this.message = message;
            this.path = path;
            this.name = 'RPCError';
        }
    }

    // Main RPC class
    class RPC {
        constructor(options) {
            this.target = options.target;
            this.serviceId = options.serviceId;
            this.origin = options.origin || '*';
            this.exposed = {};
            this.pendingCalls = new Map();
            this.callIdCounter = 0;

            // Listen for messages
            window.addEventListener('message', (event) => {
                this.handleMessage(event);
            });

            console.log('✅ RPC initialized with service:', this.serviceId);
        }

        /**
         * Expose a method that can be called by the remote
         */
        expose(methodName, handler) {
            this.exposed[methodName] = handler;
            console.log(`📤 Exposed method: ${methodName}`);
        }

        /**
         * Call a method on the remote
         */
        async call(methodName, params) {
            const callId = ++this.callIdCounter;

            return new Promise((resolve, reject) => {
                this.pendingCalls.set(callId, { resolve, reject });

                this.target.postMessage({
                    type: 'rpc-call',
                    serviceId: this.serviceId,
                    callId: callId,
                    method: methodName,
                    params: params
                }, this.origin);

                console.log(`📞 Calling remote method: ${methodName}`, params);

                // Timeout après 30 secondes
                setTimeout(() => {
                    if (this.pendingCalls.has(callId)) {
                        this.pendingCalls.delete(callId);
                        reject(new Error(`RPC call timeout: ${methodName}`));
                    }
                }, 30000);
            });
        }

        /**
         * Handle incoming messages
         */
        async handleMessage(event) {
            const message = event.data;

            // Log ALL messages for debugging
            if (message && typeof message === 'object' && message.type) {
                console.log(`🔔 Message received:`, message);
            }

            // Ignore non-RPC messages
            if (!message || typeof message !== 'object') return;

            // Support both @mixer/postmessage-rpc format AND our custom format
            const isMethod = message.type === 'method';
            const isReply = message.type === 'reply';
            const isError = message.type === 'error';
            const isCustomCall = message.type === 'rpc-call';
            const isCustomReply = message.type === 'rpc-reply';
            const isCustomError = message.type === 'rpc-error';

            if (!isMethod && !isReply && !isError && !isCustomCall && !isCustomReply && !isCustomError) return;

            // Check service ID (support both serviceID and serviceId)
            const msgServiceId = message.serviceID || message.serviceId;
            if (msgServiceId && msgServiceId !== this.serviceId) {
                console.log(`⏭️ Ignoring message for different service: ${msgServiceId} (ours: ${this.serviceId})`);
                return;
            }

            if (isMethod || isCustomCall) {
                // Handle incoming method call
                await this.handleIncomingCall(message, event.source);
            } else if (isReply || isCustomReply) {
                // Handle reply
                this.handleReply(message);
            } else if (isError || isCustomError) {
                // Handle error
                this.handleError(message);
            }
        }

        /**
         * Handle incoming method call
         */
        async handleIncomingCall(message, source) {
            // Support both formats: @mixer uses 'id' and 'method', our custom uses 'callId' and 'method'
            const callId = message.id !== undefined ? message.id : message.callId;
            const method = message.method;
            const params = message.params || {};

            console.log(`📥 Received call: ${method}`, params);
            console.log(`📥 Full message:`, message);

            if (!this.exposed[method]) {
                // Send error in @mixer format
                source.postMessage({
                    type: 'error',
                    serviceID: this.serviceId,
                    id: callId,
                    error: {
                        code: 404,
                        message: `Method not found: ${method}`
                    }
                }, this.origin);
                return;
            }

            try {
                const result = await this.exposed[method](params);
                // Send reply in @mixer format
                source.postMessage({
                    type: 'reply',
                    serviceID: this.serviceId,
                    id: callId,
                    result: result
                }, this.origin);
                console.log(`✅ Method ${method} returned:`, result);
            } catch (error) {
                source.postMessage({
                    type: 'error',
                    serviceID: this.serviceId,
                    id: callId,
                    error: {
                        code: 500,
                        message: error.message
                    }
                }, this.origin);
                console.error(`❌ Error in ${method}:`, error);
            }
        }

        /**
         * Handle reply from remote
         */
        handleReply(message) {
            const { callId, result } = message;

            if (this.pendingCalls.has(callId)) {
                const { resolve } = this.pendingCalls.get(callId);
                this.pendingCalls.delete(callId);
                resolve(result);
                console.log(`✅ Reply received for call ${callId}:`, result);
            }
        }

        /**
         * Handle error from remote
         */
        handleError(message) {
            const { callId, error } = message;

            if (this.pendingCalls.has(callId)) {
                const { reject } = this.pendingCalls.get(callId);
                this.pendingCalls.delete(callId);
                reject(new RPCError(error.code, error.message, error.path));
                console.error(`❌ Error received for call ${callId}:`, error);
            }
        }
    }

    // Export to window
    window.RPC = RPC;
    window.RPCError = RPCError;

    console.log('✅ RPC library loaded and exposed globally');

})(window);
