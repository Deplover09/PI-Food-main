import mongoose from "mongoose";
import bulkCreate from "./controllers/bulkCreate";
import recipeModel from "./models/recipeModel";
import dietModel from "./models/dietModel";

const runDatabase = async () => {
  console.log(dietModel.collection.name)
  try {
   await mongoose
      .connect("mongodb://127.0.0.1:27017/foods",)
      console.log("server working")

    const collectionsToReset = [recipeModel, dietModel];
    for (const model of collectionsToReset) {
      const collectionName = model.collection.name;
      
      const collectionExists = await mongoose.connection.db
        .listCollections({ name: collectionName })
        .hasNext();

      if (collectionExists) {
        try {
          await mongoose.connection.db.dropCollection(collectionName);
          console.log(`Collection "${collectionName}" deleted.`);
        } catch (dropError) {
          console.error(
            `Error dropping collection "${collectionName}":`,
            dropError
          );
        }
      } else {
        console.error("Invalid collection name:", collectionName);
      }
    }
    await bulkCreate()
  } catch (error) {
    console.error("Error restarting database foods", error);
  }
};

export default runDatabase;
