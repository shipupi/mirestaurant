const config = require('config');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const routes = require('./routes/routes')


app.get('/', (req, res) => {
    res.send("Hello World!\n")
})

app.use('/api', routes)


app.listen(config.get('restaurant.server.port'), function () {
    console.log('app listening ats port %s', config.get('restaurant.server.port'));
});