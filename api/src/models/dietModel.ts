import { Schema, model, type Document } from "mongoose";

const dietSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "RecipesCollection"
      }
    ]
  },
  {
    timestamps: true
  }
);

export interface Diet extends Document {
  name: string;
  recipes: string[] & Schema.Types.ObjectId[];
}

// const DietModel: Model<Diet & Document> = model("Diet", dietSchema);
// // const DietModel = model("DietsCollection", dietSchema);

export default model<Diet>("DietsCollection", dietSchema);
