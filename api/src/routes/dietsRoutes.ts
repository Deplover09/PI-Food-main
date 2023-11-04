import type express from "express";
import {
  dbDiets,
  dbDietsByName,
  dbDietsByID
} from "../controllers/dietsControllers";

const getDietsRoute = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.query;

  try {
    if (name !== undefined && name !== null) {
      const dietsFromDbByName = await dbDietsByName(name);
      if (dietsFromDbByName !== undefined && dietsFromDbByName !== null)
        return res.send(dietsFromDbByName);
      else return res.status(404).send("diet not found ");
    }
    const dietsFromDb = await dbDiets();
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
    const diet = await dbDietsByID(id);
    if (diet !== undefined && diet !== null) return res.send(diet);
    else return res.status(404).send("diet not found");
  } else return res.status(404).send("missing id");
};

export { getDietsRoute, getDietsIDRoute };
