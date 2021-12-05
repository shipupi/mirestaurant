const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors')
const routes = require('./routes/routes');
  
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

app.listen(process.env.API_PORT, function () {
    console.log('app listening ats port %s', process.env.API_PORT);
});