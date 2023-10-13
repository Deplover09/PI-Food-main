"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// import { conn } from './db.js';
// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
server_1.default.listen(server_1.default.get("port"), () => {
    console.log('server on port', server_1.default.get("port"));
});
// });
