const {server} = require('./server')


server.listen(process.env.API_PORT, function () {
    console.log('app listening at port %s', process.env.API_PORT);
});