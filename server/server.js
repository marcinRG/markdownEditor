'use strict';
var express = require('express');
var path = require('path');

var pathSettings = require('./settings/settings').app;
var errorSettings = require('./settings/settings').error;
var errorHandler = require('./errorHandlers/errors');
var portDefault = require('./settings/settings').defaultPort;

var port = process.env.PORT || portDefault;
var enviroment = process.env.NODE_ENV;

var app = express();

app.use(errorSettings.url, express.static(path.join(__dirname, '../' + errorSettings.path)));
if (enviroment === 'build') {
    app.use(express.static(path.join(__dirname, '../' + pathSettings.pageProd)));
}
else {
    app.use(express.static(path.join(__dirname, '../' + pathSettings.page)));
}

app.use(errorHandler);

app.listen(port, function () {
    console.log('Express app started on port:' + port);
});

