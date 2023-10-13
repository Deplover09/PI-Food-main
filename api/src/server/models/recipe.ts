import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  healthScore: { type: Number, required: true },
  image: { type: String, required: true },
  steps: { type: String, required: true },
  createdInDb: {type:Boolean, required: true},
},{
  timestamps: true
});

const recipeModel = model("Model", recipeSchema);

export default recipeModel;
