import mongoose from "mongoose";
import { RecipeModel, DietModel } from "./models/exportModels";
import bulkCreate from "./bulkCreate";
import dotenv from "dotenv";
dotenv.config();
const { mongoDbPassword } = process.env;
const encodedPassword =
  typeof mongoDbPassword === "string" && encodeURI(mongoDbPassword);

const runDatabase = async (): Promise<void> => {
  try {
    typeof encodedPassword === "string" &&
      (await mongoose.connect(
        `mongodb+srv://piFoods:${encodedPassword}@cluster0.fkpbeuc.mongodb.net/?retryWrites=true&w=majority`
      ));
    console.log("server working");

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
    console.log("bullcreateexecute");
    await bulkCreate();
  } catch (error) {
    console.error("Error restarting database foods", error);
  }
};

export default runDatabase;
