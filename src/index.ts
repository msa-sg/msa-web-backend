import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./config";

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

server.listen(config.server.port, () => {
  console.log(
    `Server running on http://${config.server.hostname}:${config.server.port}/`
  );
});

const MONGO_URL: string = config.db.host;
console.log(MONGO_URL);

mongoose.set("strictQuery", false);
// mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => {console.log('MongoDB connected');});
mongoose.connection.on("error", (error: Error) => console.log(error));

app.get("/", async (req: express.Request, res: express.Response) => {
  res.send("Backend API");
})

app.use("/", router());
