// Wrapper pour exposer RPC globalement depuis le module ES6
import { RPC } from './postmessage-rpc.js';

// Exposer RPC en tant que variable globale
window.RPC = RPC;

console.log('✅ RPC library loaded and exposed globally');
