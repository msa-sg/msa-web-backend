const express = require('express')
const morgan = require('morgan')
const db = require('./database');

const app = express()
const port = 3000;


app.listen(port, () => console.log(`Server listening at ${port}`))

app.set('view engine', 'ejs')

app.use(express.static('public'))   // set ./public/ as static folder where browser can access
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("Start coding");
});
