"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const server = (0, express_1.default)();
server.set("port", (_a = process.env.Port) !== null && _a !== void 0 ? _a : 3001);
server.use((0, morgan_1.default)("dev"));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
server.use((0, cookie_parser_1.default)());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
server.use("/", indexRoutes_1.default);
server.use((error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    // Customize the error response as needed
    const statusCode = 500; // Internal Server Error
    res.status(statusCode).send({
        error: {
            message: error.message,
            // You can include additional properties in the response, such as a stack trace
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        }
    });
});
exports.default = server;
