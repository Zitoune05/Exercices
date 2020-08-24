"use strict";

var express = require('express');

var app = express();
app.use(function (req, res) {
  res.json({
    message: 'votre requête a bien été reçue !'
  });
});
module.exports = app;