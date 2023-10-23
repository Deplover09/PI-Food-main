import express from "express";
import { dbDiets, dbDietsByName } from "../controllers/dietsControllers";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  const { name }: { name?: string } = req.query;

  try {
    const dietsFromDb = await dbDiets();
    if (!name) return res.send(dietsFromDb);
    const dietsFromDbByName = await dbDietsByName(name);
    return res.send(dietsFromDbByName);
  } catch (err) {
    console.log(err);
    res.send(err)
  }
});

export default router;
