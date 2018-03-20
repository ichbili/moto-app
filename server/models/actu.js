var mongoose = require('mongoose');

var Actu = mongoose.model('Actu', {
  titreActu: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  smallText: {
    type: String,
    minlength: 1,
    trim: true
  },
  imgActu: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  validated: {
    type: Boolean,
    default: false
  },
  datePublication: {
    type: Date,
    default: Date.now
  }
});

module.exports = {Actu};
