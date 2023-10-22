"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipesRoutes_1 = __importDefault(require("./recipesRoutes"));
// const recipesParamsRoute = require('./getRecipeParams.js')
// const dietsRoute = require ('./getDiets.js')
// const postRoute = require ('./postRecipe.js')
const router = (0, express_1.Router)();
router.use('/recipes', recipesRoutes_1.default);
// router.use('/recipesParams', recipesParamsRoute); //715594
// router.use('/diets', dietsRoute);
// router.use('/postRecipe', postRoute)
exports.default = router;
