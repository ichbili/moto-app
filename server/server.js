const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Article} = require('./models/article');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000; // process.env.PORT pour Heroku

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/article', (req, res) => {
  var article = new Article({
    titreArticle: req.body.tarticle,
    smallText: req.body.textsmall,
    imgArticle: req.body.imgurl
  });
  article.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/articles', (req, res) => {
  Article.find().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/articles/:article_id', (req, res) => {
  var articleID = req.params.article_id;
  if(!ObjectID.isValid(articleID)) {
    return res.status('404').json({message: 'Not an ObjectID'});
  }

  Article.findById(articleID).then((article) => {
    if(!article) {
      return res.status('404').json({message: 'Ressource not found !!'});
    }

    res.json(article);
  }).catch((e) => {
    res.status('400').json({message: e});
  });
});

router.delete('/articles/:article_id', (req, res) => {
  var articleID = req.params.article_id;
  if(!ObjectID.isValid(articleID)) {
    return res.status('404').json({message: 'Not an ObjectID'});
  }

  Article.findByIdAndRemove(articleID).then((article) => {
    if (!article) {
      return res.status(404).json({message: 'Ressource not found !!'});
    }

    res.json({article});
  }).catch((e) => {
    res.status(400).send();
  });
});

router.patch('/articles/:article_id', (req, res) => {
  var articleID = req.params.article_id;
  //var body = _.pick(req.body, ['tarticle', 'textsmall', 'imgurl']);
  var titreArticle =  req.body.tarticle;
  var smallText = req.body.textsmall;
  var imgArticle = req.body.imgurl;
  if(!ObjectID.isValid(articleID)) {
    return res.status('404').json({message: 'Not an ObjectID'});
  }

  Article.findByIdAndUpdate(articleID, {titreArticle, smallText, imgArticle}, {returnOriginal: true})
    .then((article) => {
      if (!article) {
        return res.status(404).json({message: 'Ressource not found !!'});
      }

    res.json({article});
  }).catch((e) => {
    res.status(400).json({message: 'Problem while updating the doc in the db'});
  });
});

router.post('/user', (req, res) => {
  // var article = new Article({
  //   titreArticle: req.body.tarticle,
  //   smallText: req.body.textsmall,
  //   imgArticle: req.body.imgurl
  // });
//   var object = { 'a': 1, 'b': '2', 'c': 3 };
//
// _.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
  var userReq = _.pick(req.body, ['email', 'password', 'access', 'token']);
  var user = new User({email: userReq.email, password: userReq.password, tokens: [{access: userReq.access, token: userReq.token}]});
  var user = new User(_.pick(req.body, ['email', 'password']));
  user.tokens = [_.pick(req.body, ['access', 'token'])];
  console.log(user);
  user.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});

module.exports = {app}; // to send app server.test.js
