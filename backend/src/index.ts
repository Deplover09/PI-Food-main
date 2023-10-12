import server from "./server";
// import { conn } from './db.js';

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
server.listen(server.get("port"), () => {
  console.log("server on port", server.get("port"));
});
// });
