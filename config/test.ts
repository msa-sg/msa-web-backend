import * as dotenv from 'dotenv';
dotenv.config({path: `${__dirname}/../.env.test`})

module.exports = {
    DBHOST: process.env.DBHOST
}