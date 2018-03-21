var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

var ArticleSchema = new Schema({
  titreArticle: {
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
  imgArticle: {
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

var Article = mongoose.model('Article', ArticleSchema);
module.exports = {Article};
