import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    summary: { type: String, required: true },
    healthScore: { type: Number, required: true },
    image: { type: String, required: true },
    steps: { type: String, required: true },
    diets: [{
      type: Schema.Types.ObjectId,
      ref: 'DietsCollection',
      required: true 
    }],
    createdByUsers: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const recipeModel = model("RecipesCollection", recipeSchema);

export default recipeModel;
