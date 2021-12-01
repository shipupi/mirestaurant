const config = require('config');
const express = require('express');
require('express-async-errors');
const app = express();
const routes = require('./routes/routes');
  
function errorHandler (err, req, res, next) {
    res.status(500);
    console.log(err.message);
    res.send({ error: "Something went wrong" });
}

app.use(express.json());
app.get('/', (req, res, next) => {
    try {
        throw new Error('BROKEN') // Express will catch this on its own.
    } catch ( e ) {
        next(e)
    }
})
app.use('/api', routes)
app.use(errorHandler);

app.listen(config.get('restaurant.server.port'), function () {
    console.log('app listening ats port %s', config.get('restaurant.server.port'));
});