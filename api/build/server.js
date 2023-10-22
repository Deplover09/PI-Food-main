"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const server = (0, express_1.default)();
server.set("port", process.env.port || 3001);
server.use((0, morgan_1.default)('dev'));
server.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
server.use((0, cookie_parser_1.default)());
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
server.use("/", indexRoutes_1.default);
exports.default = server;
