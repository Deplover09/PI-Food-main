import mongoose from "mongoose";
import { RecipeModel, DietModel } from "./models/exportModels";
import bulkCreate from "./bulkCreate";
import dotenv from "dotenv";
dotenv.config();
const { MONGODB_URI } = process.env;

const runDatabase = async (): Promise<void> => {
  try {
    typeof MONGODB_URI === "string" && (await mongoose.connect(MONGODB_URI));
    console.log("server database connected");

    const collectionsToReset = [RecipeModel, DietModel];
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
    console.log("bullcreate execute");
    await bulkCreate();
  } catch (error) {
    console.error("Error initializing databases", error);
  }
};

export default runDatabase;
