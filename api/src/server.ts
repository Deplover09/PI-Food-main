import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
// import routes from "./routes/indexRoutes";

const server = express();

server.set("port", process.env.port ?? 3001);
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(cookieParser());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(
  (
    err: Error & { status?: number },
    req: express.Request,
    res: express.Response
  ) => {
    const status = err.status ?? 500;
    const message = err.message ?? err;
    console.error(err);
    res.status(status).send(message);
  }
);

// server.use("/", routes);

export default server;
