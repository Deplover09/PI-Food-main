import mongoose from "mongoose";

const runDatabase = async () => {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/recipes")
      .then((result) => console.log("server working"));

    const collectionsToReset = ["recipeModel", "dietModel"];
    for (const collectionName of collectionsToReset) {
      await mongoose.connection.db.dropCollection(collectionName);

      console.log(`Collection "${collectionName}" deleted.`);
    }
  } catch (error) {
    console.error("Error restarting database foods", error);
  }
}

export default runDatabase