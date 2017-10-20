
/**
 */
var express = require("express");

const app = express();

var port = process.env.VCAP_APP_PORT || 3000;
var host = process.env.VCAP_APP_HOST || 'localhost';

app.use(express.static(__dirname + '/dist'));

const server = app.listen(port, host, function(){
    const port = process.env.VCAP_APP_PORT || server.address().port;
    const host = process.env.VCAP_APP_HOST || server.address().host || 'localhost';

    console.log('Started listening at http://%s:%s', host, port);
});