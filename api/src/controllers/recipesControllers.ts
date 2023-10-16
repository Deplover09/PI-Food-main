import axios from "axios";

const { APIKEY } = process.env;

const getRecipesApi = async (): Promise<any[]> => {
  try {
    const APIKEY = "your_api_key";

    const url = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`
    );

    const results = url.data.results;

    if (results.length > 0) {
      const response = await Promise.all(
        results.map((result: any) => ({
          name: result.title,
          vegetarian: result.vegetarian,
          vegan: result.vegan,
          glutenFree: result.glutenFree,
          dairyFree: result.dairyFree,
          image: result.image,
          id: result.id,
          score: result.spoonacularScore,
          healthScore: result.healthScore,
          types: result.dishTypes?.map((element: string) => element),
          diets: result.diets?.map((element: string) => element),
          summary: result.summary,
          steps: result.analyzedInstructions[0]?.steps
            ? result.analyzedInstructions[0]?.steps
                .map((item: any) => item.step)
                .join("\n")
            : "",
        }))
      );

      return response;
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return [];
};

const getDietsApi = async (): Promise<any[]> => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`
    );

    const diets = dietsApi.data.results.map((el: any) => el.diets);
    return diets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
