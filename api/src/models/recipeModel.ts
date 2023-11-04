import { Schema, model, type Document } from "mongoose";

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    summary: { type: String, required: true },
    healthScore: { type: Number, required: true },
    image: { type: String, required: true },
    steps: { type: String, required: true },
    diets: [
      {
        type: Schema.Types.ObjectId,
        ref: "DietsCollection",
        required: true
      }
    ],
    createdByUsers: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

export interface Recipe extends Document {
  name: string;
  summary: string;
  healthScore: number;
  image: string;
  steps: string;
  diets: string[] & Schema.Types.ObjectId[];
  createdByUsers: boolean;
}
// const RecipeModel = model("RecipesCollection", recipeSchema);

export default model<Recipe>("RecipesCollection", recipeSchema);
