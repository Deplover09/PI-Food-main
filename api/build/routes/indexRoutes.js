"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dietsRoutes_1 = require("./dietsRoutes");
const recipesRoutes_1 = require("./recipesRoutes");
const router = (0, express_1.Router)();
router.get("/diets", (req, res) => {
    (0, dietsRoutes_1.getDietsRoute)(req, res)
        .then(() => {
        console.log("/diets");
    })
        .catch((error) => {
        console.error("/diets", error);
    });
});
router.get("/diets/:id", (req, res) => {
    (0, dietsRoutes_1.getDietsIDRoute)(req, res)
        .then(() => {
        console.log("/diets/:id");
    })
        .catch((error) => {
        console.error("/diets/:id", error);
    });
});
router.get("/recipes", (req, res) => {
    (0, recipesRoutes_1.getRecipes)(req, res)
        .then(() => {
        console.log("/recipes");
    })
        .catch((error) => {
        console.error("/recipes", error);
    });
});
router.get("/recipes/:id", (req, res) => {
    (0, recipesRoutes_1.getRecipesByID)(req, res)
        .then(() => {
        console.log("/recipes/:id");
    })
        .catch((error) => {
        console.error("/recipes/:id", error);
    });
});
router.post("/recipes", (req, res) => {
    (0, recipesRoutes_1.postRecipes)(req, res)
        .then(() => {
        console.log("/recipes");
    })
        .catch((error) => {
        console.error("/recipes", error);
    });
});
exports.default = router;
