import server from "./server";
import  "../database/index";


server.listen(server.get("port"), () => {
  console.log("server on port", server.get("port"));
});

