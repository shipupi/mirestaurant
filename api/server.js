const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors')
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
})
  
function errorHandler (err, req, res, next) {
    res.status(500);
    console.log(err.message);
    res.send({ error: "Something went wrong" });
}

app.use(express.json());
app.use(cors())
app.get('/', (req, res, next) => {
    try {
        throw new Error('BROKEN') // Express will catch this on its own.
    } catch ( e ) {
        next(e)
    }
})
app.use('/api', routes)
app.use(errorHandler);

exports.server = app;