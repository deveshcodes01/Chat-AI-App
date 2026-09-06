"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverClient = exports.apiSecret = exports.apikey = void 0;
const stream_chat_1 = require("stream-chat");
exports.apikey = process.env.STREAM_API_KEY;
exports.apiSecret = process.env.STREAM_API_SECRET;
if (!exports.apikey || !exports.apiSecret) {
    throw new Error("Missing required environment variables for STREAM_API_KEY and STREAM_API_SECRET");
}
exports.serverClient = new stream_chat_1.StreamChat(exports.apikey, exports.apiSecret);
//# sourceMappingURL=serverClient.js.map