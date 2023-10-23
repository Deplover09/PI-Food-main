import express from "express";
import {dbDiets, dbDietsByName} from "../controllers/dietsControllers";

// infoTotal, nameApi, infoDB,
const router = express.Router();

const getRecipes = async (req: express.Request, res: express.Response) => {
  const { name }: { name?: string } = req.query;

  try {
    const dietsFromDb = await dbDiets()
    if(!name)  return res.send(dietsFromDb)
    const dietsFromDbByName = await dbDietsByName(name)
    return res.send(dietsFromDbByName)
    
  } catch (err) {
    console.log(err);
  }
};

export default getRecipes
