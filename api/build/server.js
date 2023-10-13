"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
// import morgan from 'morgan';
const index_1 = __importDefault(require("./routes/index"));
const server = (0, express_1.default)();
server.set("port", process.env.port || 3001);
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
// server.use(bodyParser.json({ limit: '50mb' }));
server.use((0, cookie_parser_1.default)());
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
server.use('/', index_1.default);
exports.default = server;
