'use strict';
var express = require('express');
var errorSettings = require('../settings/settings').error;
var api = express.Router();

function error404Handler(err, req, res, next) {
    if (err.status !== 404) {
        next(err);
        return;
    }
    res.status(404);
    res.redirect(errorSettings.error404);
}

function errorNotSpecifiedHandler(err, req, res) {
    res.status(500);
    res.redirect(errorSettings.errorAll);
}

api.use(function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

api.use(error404Handler);
api.use(errorNotSpecifiedHandler);

module.exports = api;
