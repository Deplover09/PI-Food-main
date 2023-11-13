"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = exports.DietModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const dietModel_1 = require("./dietModel");
const recipeModel_1 = require("./recipeModel");
exports.DietModel = (0, typegoose_1.getModelForClass)(dietModel_1.Diet);
exports.RecipeModel = (0, typegoose_1.getModelForClass)(recipeModel_1.Recipe);
