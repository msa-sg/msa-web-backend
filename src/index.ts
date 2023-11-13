import express, {Application, Request, Response} from "express";
import http from "http";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import config from "./config";
import yaml from 'yaml'
import router from "./router";
import mongoose from "mongoose";
import session from 'express-session';

const app: Application = express();

// Cors
app.use(
  cors({
    credentials: true,
  })
);


// Session Cookie: Let https://www.npmjs.com/package/express-session handle session instead of our own logic -- more secure
var sess = {
  secret: config.access_token_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: config.session_duration
  }
};

if(app.get('env') === 'production'){
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess))


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

app.get("/", async (req: Request, res: Response) => {
  res.send("Backend API");
})

app.use("/", router());

const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf-8')
const swaggerDocument = yaml.parse(swaggerFile)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {explorer: true})
);

export default app;