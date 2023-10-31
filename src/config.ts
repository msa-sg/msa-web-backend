import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });

interface Config {
  db: {
    host: string;
  };
  server: {
    hostname: string;
    port: number;
  };
  access_token_secret: string;
  session_duration: number;
}


const configparams: Config = {
    db: {
        host: process.env.DBHOST || "mongodb://localhost:27017/"
    },
    server: {
        hostname: process.env.DOMAIN || "localhost",
        port: Number(process.env.PORT) || 8080
    },
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || "SECRET",
    session_duration: Number(process.env.SESSION_DURATION) || 3600000
}


if (process.env.NODE_ENV === "production") {
  console.log("Loading production configs");
  configparams.db.host = process.env.DBHOST || "mongodb://localhost:27017/";
} 
else if (process.env.NODE_ENV === "test") {
  console.log("Loading test configs");
} 
else {
  console.log("Loading development configs");
}

export default configparams;
