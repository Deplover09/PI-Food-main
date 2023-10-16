import express from "express";
const { getInfoByName, getAllInfo, getDBInfo } = require("./functions");
// infoTotal, nameApi, infoDB,
const router = express.Router();

const getRecipes = async (req: express.Request, res: express.Response) => {
  const { name } = req.query;

  try {
    if (name) {
      const infoByName = await getInfoByName(name);
      return res.send(infoByName);
    } else {
      const repiceTotal = await getAllInfo();

      return res.send(repiceTotal);
    }
  } catch (err) {
    console.log(err);
  }
};

export default getRecipes
