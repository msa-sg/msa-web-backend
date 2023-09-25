import * as dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../.env.development`})

module.exports = {
    DBHOST: process.env.DBHOST
}