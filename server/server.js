//const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Actu} = require('./models/actu');

var app = express();
const port = process.env.PORT || 3000; // process.env.PORT pour Heroku

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/actus', (req, res) => {
  var actu = new Actu({
    titreActu: req.body.tactu,
    smallText: req.body.textsmall,
    imgActu: req.body.imgurl
  });
  actu.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app}; // to send app server.test.js
