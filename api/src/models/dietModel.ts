import { Schema, model } from "mongoose";

const dietSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    recipes: [{
      type: Schema.Types.ObjectId,
      ref: 'RecipesCollection',
    }],
  },
  {
    timestamps: true,
  }
);

const dietModel = model("DietsCollection", dietSchema);

export default dietModel;
