const config = require('config')
const mongoose = require('mongoose')

const dbURI = config.get('mongoURI')

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Connected to MongoDB at ${dbURI}`);
});

db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

module.exports = db;