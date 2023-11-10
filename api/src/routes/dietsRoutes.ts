import { DietModel } from "../models/exportModels";
import type express from "express";
import mongoose from "mongoose";

const getDietsRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.query;

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foods");
    if (name !== undefined && name !== null) {
      const dietsFromDbByName = await DietModel.findByName(name);
      if (dietsFromDbByName !== undefined && dietsFromDbByName !== null)
        return res.send(dietsFromDbByName);
      else return res.status(404).send("diet not found ");
    }
    const dietsFromDb = await DietModel.find();
    return res.send(dietsFromDb);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  } finally {
    mongoose.disconnect();
  }
};
const getDietsIDRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { id } = req.params;
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foods");
    if (id !== undefined && id !== null) {
      const diet = await DietModel.findById(id);
      if (diet !== undefined && diet !== null) return res.send(diet);
      else return res.status(404).send("diet not found");
    } else return res.status(404).send("missing id");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  } finally {
    mongoose.disconnect();
  }
};
export { getDietsRoute, getDietsIDRoute };
