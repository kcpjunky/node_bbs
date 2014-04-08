var mongoose = require('mongoose');
var models = require('../../../models'),
    lib = require('../../../lib'),
    Post = models.PostModel,
    User = models.UserModel;
var url = require('url');
var app = require('../../../app');

var service = require('../../../routes/users/index.js');

var expect = require('expect.js');

var superagent = require('superagent');
var connect = require('connect');

describe('Posts', function(done) {

    describe('create', function(done) {

            var testUser = superagent.agent();
        before(function(done) {
            models.init('localhost', 'forum_test');
            // 初期化
            Post.remove(function(err, result) {
                if (err) {
                    return done(err);
                }
                console.log('post removed');
            });
            User.remove(function(err, result) {
                if (err) {
                    return done(err);
                }
                console.log('user removed');
            });
            user = new User({
                username: 'tt',
                password: 'tt'
            });
            user.save(function(err, result) {
                if (err) {
                    done(err);
                }
                console.log('save result' + result);
            });

            testUser
                .post('http://127.0.0.1:3000/sessions')
                .type('form')
                .send({
                    username: 'tt',
                    password: 'tt',
                    rememberme: true

                }).end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    console.log('res===' + res);
                    console.log(res);

                });

            done();

        });
        it ('login', function(done) {
            testUser
                .post('http://127.0.0.1:3000/sessions')
                .type('form')
                .send({
                    username: 'tt',
                    password: 'tt',
                    rememberme: true

                }).end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    testUser.saveCookies(res);
                    expect(url.parse(res.redirects[0], false, true).pathname).to.be('/');
                    done();
            });
        });

        it ('/', function(done) {
            superagent.get('http://localhost:3000/').end(function(res) {
                console.log(res);
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                done();
            });
        });


        it ('投稿',function (done) {
            var testUser = superagent.agent();
            // modelに値を割り当てる
            var postData = new Post({
                title: 'post test',
                detail: 'post detail test',
            });
            /**
testUser
    .post('http://127.0.0.1:3000/sessions')
    .type('form')
    .send({
        username: 'tt',
        password: 'tt',
        rememberme: true

    }).end(function(err, res) {
        if (err) {
            done(err);
        }
        console.log('res===' + res);
        console.log(res);

    });*/

            console.log('ポスト')
            testUser
                .post('http://127.0.0.1:3000/topics/4/posts')
                .type('form')
                .send({
                    title: 'post test',
                    detail: 'post detail test',

                }).end(function(err, res) {
                    console.log('end');
                    if (err) {
                        console.log('erorr');
                        console.log(err);
                        done(err);
                    }
                    console.log('res = ' + res);
                    console.log(res);

                    done();
                    console.log('tes');
                });

            console.log('post.iffnd');
            Post.findOne({title: 'post test'}, function(errpost, result) {
                if (errpost) {
                    done(errpost);
                }

                if (result === null) {
                    console.log('null');
                    done();
                    //expect().fail();
                }
                console.log('result = ' +result);

                expect(result.title).to.be('post test');
                expect(result.detail).to.be('post detail test');
                expect(result.username).to.be('testuser');
                done();
            });

        });
    });
});
