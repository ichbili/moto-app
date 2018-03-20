const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Actu} = require('./../models/actu');

describe('POST /todos', () => {
  it('should create a new actu', (done) => {
    var tActu = 'Titre actu text';
    var textSmall = 'text explicatif de lactu';
    var imgActu = 'url de limage';

    request(app)
      .post('/actus')
      .send({tactu: tActu, textsmall: textSmall, imgurl: imgActu})
      .expect(200)
      .expect((res) => {
        expect(res.body.titreActu).toBe(tActu);
        expect(res.body.smallText).toBe(textSmall);
        expect(res.body.imgActu).toBe(imgActu);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Actu.find({titreActu: tActu}).then((actus) => {
          expect(actus.length).toBe(1);
          expect(actus[0].titreActu).toBe(tActu);
          done();
        }).catch((e) => done(e));
      });
  });
});
