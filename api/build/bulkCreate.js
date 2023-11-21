"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const exportModels_1 = require("./models/exportModels");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const APIKEY = process.env.APIKEY;
const getRecipesApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=500`);
        const results = url.data.results;
        if (results.length > 0) {
            const response = yield Promise.all(results.map((result) => {
                var _a, _b, _c, _d;
                const firstStep = (_b = (_a = result.analyzedInstructions) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.steps;
                const step = firstStep === null || firstStep === void 0 ? void 0 : firstStep.map((s) => s.step);
                return {
                    name: result.title,
                    image: result.image,
                    healthScore: result.healthScore,
                    diets: (_c = result.diets) === null || _c === void 0 ? void 0 : _c.map((element) => element),
                    summary: (_d = result.summary) === null || _d === void 0 ? void 0 : _d.replace(/<[^>]*>?/g, ""),
                    steps: step
                };
            }));
            // console.log(response[0]);
            return response;
        }
    }
    catch (error) {
        console.error(error);
        return [];
    }
    return [];
});
const getDietsApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dietsApi = yield axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=500&addRecipeInformation=true`);
        const diets = dietsApi.data.results.map((el) => el.diets);
        return diets;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
const bulkCreateDiets = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    const dietsArray = arr.flat();
    const removeDuplicates = Array.from(new Set(dietsArray));
    const strignToObj = removeDuplicates.map((d) => {
        return { name: d };
    });
    yield exportModels_1.DietModel.insertMany(strignToObj);
});
const recipesAreComplete = () => __awaiter(void 0, void 0, void 0, function* () {
    const recipesFromApi = yield getRecipesApi();
    const filterArray = recipesFromApi
        .map((obj) => {
        var _a, _b, _c, _d, _e, _f;
        const filteredObj = {
            name: (_a = obj.name) !== null && _a !== void 0 ? _a : "",
            image: (_b = obj.image) !== null && _b !== void 0 ? _b : "",
            healthScore: (_c = obj.healthScore) !== null && _c !== void 0 ? _c : 0,
            summary: (_d = obj.summary) !== null && _d !== void 0 ? _d : "",
            diets: (_e = obj.diets) !== null && _e !== void 0 ? _e : [],
            steps: (_f = obj.steps) !== null && _f !== void 0 ? _f : []
        };
        // Check if any property in the filtered object is empty
        if (filteredObj.name === "" ||
            filteredObj.image === "" ||
            filteredObj.healthScore === 0 ||
            filteredObj.summary === "" ||
            filteredObj.diets.length === 0 ||
            filteredObj.steps.length === 0) {
            return null; // Filter out objects with empty properties
        }
        return filteredObj;
    })
        .filter((obj) => obj !== null);
    return filterArray;
});
const bulkCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRecipes = yield exportModels_1.RecipeModel.find();
    const allDiets = yield exportModels_1.DietModel.find();
    if ((allRecipes === null || allRecipes === void 0 ? void 0 : allRecipes[0]) !== undefined && (allDiets === null || allDiets === void 0 ? void 0 : allDiets[0]) !== undefined) {
        console.log("recipes and diets collection are not empty");
        return undefined;
    }
    const dietsFromApi = yield getDietsApi();
    yield bulkCreateDiets(dietsFromApi);
    const recipesComplete = yield recipesAreComplete();
    if (recipesComplete !== null &&
        recipesComplete !== undefined &&
        allDiets !== undefined) {
        const PropertiesForRecipes = yield Promise.all(recipesComplete.map((r) => __awaiter(void 0, void 0, void 0, function* () {
            const idDietsObj = (yield Promise.all(r.diets.map((d) => __awaiter(void 0, void 0, void 0, function* () {
                const dietObj = yield exportModels_1.DietModel.findByName(d);
                if (dietObj !== null &&
                    dietObj !== undefined &&
                    "_id" in dietObj) {
                    return dietObj._id;
                }
                else {
                    return null;
                }
            }))));
            return {
                name: r.name,
                image: r.image,
                healthScore: r.healthScore,
                summary: r.summary,
                steps: r.steps,
                diets: idDietsObj
            };
        })));
        yield exportModels_1.RecipeModel.insertMany(PropertiesForRecipes);
        const allRecipes = yield exportModels_1.RecipeModel.find();
        for (const r of allRecipes) {
            r.diets !== undefined &&
                r.diets !== null &&
                (yield Promise.all(r.diets.map((d) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield exportModels_1.DietModel.findByIdAndUpdate(d, {
                        recipes: r._id
                    });
                }))));
        }
    }
});
exports.default = bulkCreate;
