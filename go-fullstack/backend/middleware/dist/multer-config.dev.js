"use strict";

var multer = require('multer');

var MiNE_TYPES = {
  'image/jpg': 'jpg',
  'image.jpeg': 'jpg',
  'image/png': 'png'
};
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, 'images');
  },
  filename: function filename(req, file, callback) {
    var name = file.originalname.split(' ').join('_');
    var extension = MiNE_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({
  storage: storage
}).single('image');