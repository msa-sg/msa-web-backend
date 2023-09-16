import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGO_URL =
  "mongodb+srv://clee080:passworD@cluster0.x62uono.mongodb.net/?retryWrites=true&w=majority";
const MONGO_URL2 = "mongodb://localhost:27017/";

// mongoose.set("strictQuery", false);
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL2);
// mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
