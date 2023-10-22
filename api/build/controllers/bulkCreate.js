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
const axios_1 = __importDefault(require("axios"));
const { APIKEY } = process.env;
const getRecipesApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
        const results = url.data.results;
        if (results.length > 0) {
            const response = yield Promise.all(results.map((result) => {
                var _a, _b, _c;
                return ({
                    name: result.title,
                    // vegetarian: result.vegetarian,
                    // vegan: result.vegan,
                    // glutenFree: result.glutenFree,
                    // dairyFree: result.dairyFree,
                    image: result.image,
                    // id: result.id,
                    // score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    // types: result.dishTypes?.map((element: string) => element),
                    diets: (_a = result.diets) === null || _a === void 0 ? void 0 : _a.map((element) => element),
                    summary: result.summary,
                    steps: ((_b = result.analyzedInstructions[0]) === null || _b === void 0 ? void 0 : _b.steps)
                        ? (_c = result.analyzedInstructions[0]) === null || _c === void 0 ? void 0 : _c.steps.map((item) => item.step).join("\n")
                        : "",
                });
            }));
            console.log(response[0]);
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
        const dietsApi = yield axios_1.default.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`);
        const diets = dietsApi.data.results.map((el) => el.diets);
        return diets;
    }
    catch (error) {
        console.error(error);
        return [];
    }
});
const bulkCreate = () => __awaiter(void 0, void 0, void 0, function* () {
    // const productsOnDatabase = await Product.findAll();
});
