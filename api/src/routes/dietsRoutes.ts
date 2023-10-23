import express from "express";
import {
  dbDiets,
  dbDietsByName,
  dbDietsByID,
} from "../controllers/dietsControllers";

const dietsRoute = async (req: express.Request, res: express.Response) => {
  const { name }: { name?: string } = req.query;
  console.log(name);

  try {
    const dietsFromDb = await dbDiets();
    if (!name) return res.send(dietsFromDb);
    const dietsFromDbByName = await dbDietsByName(name);
    return res.send(dietsFromDbByName);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
const dietsIDRoute = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (!id) return res.status(404).send("missing id");
  const diet = await dbDietsByID(id);
  if (diet) return res.send(diet);
  else return res.status(404).send("diet not found");
};

export { dietsRoute, dietsIDRoute };
