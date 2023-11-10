import express, {
  type Request,
  type Response,
  type NextFunction
} from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes/indexRoutes";

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

server.use("/", routes);

server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);

  // Customize the error response as needed
  const statusCode = 500; // Internal Server Error
  res.status(statusCode).json({
    error: {
      message: error.message,
      // You can include additional properties in the response, such as a stack trace
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }
  });
});

export default server;
