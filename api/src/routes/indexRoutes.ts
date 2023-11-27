import { Router } from "express";
import { getDietsRoute, getDietsIDRoute } from "./dietsRoutes";
import { getRecipes, getRecipesByID, postRecipes } from "./recipesRoutes";

const router = Router();

router.get("/diets", (req, res) => {
  getDietsRoute(req, res)
    .then(() => {
      console.log("/diets");
    })
    .catch((error) => {
      console.error("/diets", error);
    });
});

router.get("/diets/:id", (req, res) => {
  getDietsIDRoute(req, res)
    .then(() => {
      console.log("/diets/:id");
    })
    .catch((error) => {
      console.error("/diets/:id", error);
    });
});
router.get("/recipes", (req, res) => {
  getRecipes(req, res)
    .then(() => {
      console.log("/recipes");
    })
    .catch((error) => {
      console.error("/recipes", error);
    });
});
router.get("/recipes/:id", (req, res) => {
  getRecipesByID(req, res)
    .then(() => {
      console.log("/recipes/:id");
    })
    .catch((error) => {
      console.error("/recipes/:id", error);
    });
});
router.post("/recipes", (req, res) => {
  postRecipes(req, res)
    .then(() => {
      console.log("/recipes");
    })
    .catch((error) => {
      console.error("/recipes", error);
    });
});

export default router;
