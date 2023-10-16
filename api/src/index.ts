import server from "./server";
import runDatabase from "./database";


server.listen(server.get("port"), async() => {
  await runDatabase()
  console.log("server on port", server.get("port"));
});

