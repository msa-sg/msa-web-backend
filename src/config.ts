import * as dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../.env.${process.env.NODE_ENV}`})

interface Config{
    db: {
        host: string
    },
    server: {
        hostname: string,
        port?: number
    }
}

const configparams: Config = {
    db: {
        host: "mongodb://localhost:27017/"
    },
    server: {
        hostname: "localhost",
        port: 8080
    }
}

if(process.env.NODE_ENV === 'production'){
    console.log("Loading production configs");
    configparams.db.host = process.env.DBHOST;
}
else if(process.env.NODE_ENV === 'test'){
    console.log("Loading test configs");
}
else{
    console.log("Loading development configs");
}

export default configparams;