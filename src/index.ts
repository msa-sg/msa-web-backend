import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from './config';

import router from "./router";
import mongoose from "mongoose";

const app = express();
const config = require("config");
const morgan = require("morgan");

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(config.server.port, () => {
  console.log(`Server running on http://${config.server.hostname}:${config.server.port}/`);
});

<<<<<<< HEAD
// DB connection (old)
// const MONGO_URL = config.get("mongoURI2");
// mongoose.set("strictQuery", false);
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on("error", (error: Error) => console.log(error));
=======
const MONGO_URL: string = config.db.host;
console.log(MONGO_URL);

mongoose.set("strictQuery", false);
// mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
>>>>>>> 7268875442cfec70524439cb27e0f2f526b7ef9f

// DB connection(new)
// const dbURI = config.get("mongoURI");
const dbURI = config.get("mongoURI2");
mongoose.set("strictQuery", false);
mongoose.connect(dbURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log(`Connected to MongoDB at ${dbURI}`);
});
db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

app.set("view engine", "ejs");
app.use(express.static("public")); // set ./public/ as static folder where browser can access
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", router());
