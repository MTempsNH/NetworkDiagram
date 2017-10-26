
/**
 */
var express = require("express");

const app = express();

var port = 8903;

app.use(express.static(__dirname + '/dist'));

const server = app.listen(port, function(){

    console.log('%s started listening at %s', server.name, server.host);
});