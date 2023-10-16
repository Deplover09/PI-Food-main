import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from 'morgan';
import routes from "./routes/indexRoutes";

const server = express();

server.set("port", process.env.port || 3001);
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(cookieParser());
server.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  }
);

server.use("/", routes);

export default server;
