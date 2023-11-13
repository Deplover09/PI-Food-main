"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./database"));
server_1.default.listen(server_1.default.get("port"), () => {
    (0, database_1.default)()
        .then(() => {
        console.log("Database is connected.");
        console.log("Server is listening on port", server_1.default.get("port"));
    })
        .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
});
