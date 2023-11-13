"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var Recipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const dietModel_1 = require("./dietModel");
const exportModels_1 = require("../models/exportModels");
let Recipe = Recipe_1 = class Recipe {
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ name });
        });
    }
    static createRecipe(name, summary, healthScore, image, steps, diets) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecipe = {
                name,
                summary,
                healthScore,
                image,
                steps,
                createdByUsers: true,
                diets
            };
            const savedRecipe = yield new exportModels_1.RecipeModel(newRecipe).save();
            if (savedRecipe.diets !== undefined) {
                yield Promise.all(savedRecipe.diets.map((d) => __awaiter(this, void 0, void 0, function* () {
                    return yield exportModels_1.DietModel.findByIdAndUpdate(d, {
                        recipes: savedRecipe._id
                    });
                })));
                return savedRecipe;
            }
            else
                return null;
        });
    }
};
exports.Recipe = Recipe;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Recipe.prototype, "summary", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Recipe.prototype, "healthScore", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: () => [String] }),
    __metadata("design:type", Array)
], Recipe.prototype, "steps", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Recipe.prototype, "createdByUsers", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => dietModel_1.Diet }),
    __metadata("design:type", Array)
], Recipe.prototype, "diets", void 0);
exports.Recipe = Recipe = Recipe_1 = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    })
], Recipe);
