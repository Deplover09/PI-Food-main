import { DietModel } from "../models/exportModels";
import type express from "express";
const getDietsRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.query;

  try {
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
    return res.send(err);
  }
};
const getDietsIDRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { id } = req.params;
  if (id !== undefined && id !== null) {
    const diet = await DietModel.findById(id);
    if (diet !== undefined && diet !== null) return res.send(diet);
    else return res.status(404).send("diet not found");
  } else return res.status(404).send("missing id");
};

export { getDietsRoute, getDietsIDRoute };
