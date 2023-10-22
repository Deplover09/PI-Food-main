"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dietSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    recipes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'recipeModel',
        }],
}, {
    timestamps: true,
});
const dietModel = (0, mongoose_1.model)("Model", dietSchema);
exports.default = dietModel;
