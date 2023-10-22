"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    summary: { type: String, required: true },
    healthScore: { type: Number, required: true },
    image: { type: String, required: true },
    steps: { type: String, required: true },
    diets: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'dietModel',
            required: true
        }],
    createdByUsers: { type: Boolean, required: true },
}, {
    timestamps: true,
});
const recipeModel = (0, mongoose_1.model)("Model", recipeSchema);
exports.default = recipeModel;
