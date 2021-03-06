"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Thing = require('../models/thing');

exports.createThing = function (req, res, next) {
  var thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  var thing = new Thing(_objectSpread({}, thingObject, {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }));
  thing.save().then(function () {
    return res.status(201).json({
      message: 'Objet enregistré !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};

exports.getOneThing = function (req, res, next) {
  Thing.findOne({
    _id: req.params.id
  }).then(function (thing) {
    res.status(200).json(thing);
  })["catch"](function (error) {
    res.status(404).json({
      error: error
    });
  });
};

exports.modifyThing = function (req, res, next) {
  var thingObject = req.file ? _objectSpread({}, JSON.parse(req.body.thing), {
    imageUrl: "".concat(req.protocol, "://").concat(req.get('host'), "/images/").concat(req.file.filename)
  }) : _objectSpread({}, req.body);
  Thing.updateOne({
    _id: req.params.id
  }, _objectSpread({}, thingObject, {
    _id: req.params.id
  })).then(function () {
    return res.status(200).json({
      message: 'Objet modifié !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};

exports.deleteThing = function (req, res, next) {
  Thing.deleteOne({
    _id: req.params.id
  }).then(function () {
    res.status(200).json({
      message: 'Deleted!'
    });
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};

exports.getAllStuff = function (req, res, next) {
  Thing.find().then(function (things) {
    res.status(200).json(things);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
};