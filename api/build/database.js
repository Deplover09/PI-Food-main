"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const exportModels_1 = require("./models/exportModels");
const bulkCreate_1 = __importDefault(require("./bulkCreate"));
const runDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/foods");
        console.log("server working");
        const collectionsToReset = [exportModels_1.RecipeModel, exportModels_1.DietModel];
        for (const model of collectionsToReset) {
            const collectionName = model.collection.name;
            const collectionExists = yield mongoose_1.default.connection.db
                .listCollections({ name: collectionName })
                .hasNext();
            if (collectionExists) {
                try {
                    yield mongoose_1.default.connection.db.dropCollection(collectionName);
                    console.log(`Collection "${collectionName}" deleted.`);
                }
                catch (dropError) {
                    console.error(`Error dropping collection "${collectionName}":`, dropError);
                }
            }
            else {
                console.error("Invalid collection name:", collectionName);
            }
        }
        console.log("bullcreateexecute");
        yield (0, bulkCreate_1.default)();
    }
    catch (error) {
        console.error("Error restarting database foods", error);
    }
});
exports.default = runDatabase;
