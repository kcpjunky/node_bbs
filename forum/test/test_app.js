var request = require('supertest');
var app = require('../app');
var expect = require('expect.js');


var models = require('../models'),
    lib = require('../lib'),
    User = models.UserModel,
    Post = models.PostModel;
/**
 * '/'にアクセスすると'/sessions/new'に遷移する
 *
 */
describe('/', function() {
    it('redirect to /top status code 302 ', function() {
        var expected_body = 'Hello World';
        request(app)
            .get('/')
            .expect(302)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });
    });

    it('/sessions/newにリダイレクト', function() {
        request(app)
            .get('/')
            .expect(302)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
            });
    });
});

/**
 * '/sessions/new'
 */
describe('/sessions/new', function() {
    it('return 200 and get [title]', function() {
        request(app)
            .get('/sessions/new')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                //expect(res.param('title')).to.be('title');
            });
    });
});

/**
 * /sessions/destroy　にアクセスしたらloginページに遷移する
 * status302
 */
describe('/sessions/destroy', function() {
    it('return 302', function() {
        request(app)
            .get('/sessions/destroy')
            .expect(302)
            .end(function(err, res) {
                console.log(res.status);
                if (err) {
                    throw err;
                }
            });
    });

    it('when GET /topics, should return 200', function (done) {
        request(app)
            .get("/topics")
            .expect(200)
            .end(function (err, res) {
                if(err) {
                    console.log("test error" + err);
                }
        done();
      });
  });

  describe('POST /users',function() {

      before(function(done) {
          models.init('localhost', 'forum_test');
          User.remove(function(err, User) {
              if (err) return handleError(err);

              done();
          });
      });
      it('/usersにたいしてPOSTするとuser登録', function(done) {
          var postData = {
              username : "postUser",
              password : "postpass",
              password2 : "postpass"
          };

          request(app)
              .post('/users')
              .send({username: 'postUser', password : 'postPass', password2: 'postPass'})
              .expect(302)
              .end(function(err, res) {
                  if (err) {
                      console.log(err);
                      return done(err);
                  }
                  console.log("aaaa");
                  done();
              });
      });
  })
});
