// Node < 22 has no global WebSocket, which @supabase/supabase-js requires at
// client construction. Preload this with `node --import ./ws-polyfill.mjs ...`
// when running the standalone collector/import scripts on Node 20.
import { WebSocket } from "ws";
globalThis.WebSocket = WebSocket;
