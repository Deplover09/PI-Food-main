import { Schema, model } from "mongoose";

const dietSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const dietModel = model("Model", dietSchema);

export default dietModel;
