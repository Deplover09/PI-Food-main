import server from "./server";
import runDatabase from "./database";

server.listen(server.get("port"), () => {
  runDatabase()
    .then(() => {
      console.log("Database is connected.");
      console.log("Server is listening on port", server.get("port"));
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
});
