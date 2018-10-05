var express = require('express');
var graphQL = require('express-graphql');
var schema = require('./data/schema');

var app = express();

app.use('/graphql', graphQL({schema: schema, pretty: true}));

app.listen(3000, function () {
    console.log('server start');
});
