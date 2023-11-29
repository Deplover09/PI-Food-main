import server from "./server";
import runDatabase from "./database";
import dotenv from "dotenv";
dotenv.config();
const { MONGODB_URI } = process.env;

server.listen(server.get("port"), () => {
  if (typeof MONGODB_URI !== "string") {
    throw new Error(
      "Please define the DB_URL environment variable inside .env.local"
    );
  }
  runDatabase()
    .then(() => {
      console.log("Database is connected.");
      console.log("Server is listening on port", server.get("port"));
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
      throw new Error(error);
    });
});
