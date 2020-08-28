"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    var userId = decodeToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'UserId non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | 'Requête non authentifiée !'
    });
  }
};