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
exports.postRecipes = exports.getRecipesByID = exports.getRecipes = void 0;
const exportModels_1 = require("../models/exportModels");
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (name !== null && name !== undefined) {
            const recipesFromDbByName = yield exportModels_1.RecipeModel.findByName(name);
            if (recipesFromDbByName !== null && recipesFromDbByName !== undefined)
                return res.send(recipesFromDbByName);
            else
                return res.status(404).send("recipe not found");
        }
        else {
            const recipes = yield exportModels_1.RecipeModel.find().populate("diets").exec();
            if (recipes !== null && recipes !== undefined)
                return res.send(recipes);
            else
                return res.status(404).send("recipe not found");
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.getRecipes = getRecipes;
const getRecipesByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id !== undefined && id !== null) {
            const recipe = yield exportModels_1.RecipeModel.findById(id);
            if (recipe !== undefined && recipe !== null)
                return res.send(recipe);
        }
        else
            return res.status(404).send("recipe not found");
        return res.status(404).send("missing id");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.getRecipesByID = getRecipesByID;
const postRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { image } = req.body;
    const { healthScore } = req.body;
    const { summary } = req.body;
    const { steps } = req.body;
    const { diets } = req.body;
    if (name === undefined ||
        image === undefined ||
        healthScore === undefined ||
        summary === undefined ||
        steps === undefined ||
        diets === undefined)
        return res.status(404).send("All recipes characteristics are required");
    try {
        const savingRecipe = yield exportModels_1.RecipeModel.createRecipe(name, image, healthScore, summary, steps, diets);
        if (savingRecipe !== null && savingRecipe !== undefined)
            return res.send("recipe created");
        else
            return res.status(404).send("recipe not created");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});
exports.postRecipes = postRecipes;
