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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDietsIDRoute = exports.getDietsRoute = void 0;
const exportModels_1 = require("../models/exportModels");
const getDietsRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        if (name !== undefined && name !== null) {
            const dietsFromDbByName = yield exportModels_1.DietModel.findByName(name);
            if (dietsFromDbByName !== undefined && dietsFromDbByName !== null)
                return res.send(dietsFromDbByName);
            else
                return res.status(404).send("diet not found ");
        }
        const dietsFromDb = yield exportModels_1.DietModel.find();
        return res.send(dietsFromDb);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.getDietsRoute = getDietsRoute;
const getDietsIDRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id !== undefined && id !== null) {
            const diet = yield exportModels_1.DietModel.findById(id);
            if (diet !== undefined && diet !== null)
                return res.send(diet);
            else
                return res.status(404).send("diet not found");
        }
        else
            return res.status(404).send("missing id");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.getDietsIDRoute = getDietsIDRoute;
