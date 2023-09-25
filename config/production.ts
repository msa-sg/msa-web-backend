import * as dotenv from 'dotenv';
dotenv.config({path: `${__dirname}\\..\\.env.production`})

module.exports = {
    DBHOST: process.env.DBHOST
}