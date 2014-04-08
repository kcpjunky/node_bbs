var mongoose = require('mongoose');
var models = require('../../models'),
    lib = require('../../lib'),
    User = models.UserModel,
    Post = models.PostModel;

var service = require('../../routes/users/index.js');

var expect = require('expect.js');

describe('dbModel', function() {

    describe('UserModel', function() {
        beforeEach(function(done) {
            models.init('localhost', 'forum_test');
            User.remove(function(err, User) {
                if (err) {
                    return done(err);
                }

                done();
            });
        });
        it ('データベースに新規登録できる', function(done) {
            var user = new User({
                username: 'testUser',
                password: 'testPass',

            });

            user.save(function(err, result) {
                if (err) {
                    return done(err);
                }
                expect(result).to.be.an('object');
                expect(result.username).to.be('testUser');
                expect(result.password).to.be('testPass');
                done();
            });
        });

    });

    describe('UserModel primaryname',function(){
        before(function(done){
            var user = new User({
                username: 'testUser2',
                password: 'testPass2',

            });

            models.init('localhost', 'forum_test');
            User.remove(function(err, User) {
                if (err) {
                    return done(err);
                }

            });
            user.save(function(err, result) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                done();
            }) ;
        });

        it ('同じusernameが既に保存されていたら登録できない', function(done) {
            var user = new User({
                username: 'testUser2',
                password: 'testPass2',

            });

            user.save(function(err,result){
                //console.log(err);
                expect(err).not.to.be(null);
                done();
            });
        });


    });

    describe('PostModel', function() {
        beforeEach(function(done) {
            models.init('localhost', 'forum_test');
            Post.remove(function(err, User) {
                if (err) {
                    return done(err);
                }

                done();
            });
        });

        it ('toipc_id,title,detailが指定されていたら登録できる', function(done) {
            var post = new Post({
                "topic_id" : 314918,
                title: 'testPost',
                detail: 'hello world',
                username : 'test user'
            });

            post.save(function(err,result) {
                if (err) {
                    return done(err);
                }
                expect(result).to.be.an('object');
                expect(result.title).to.be('testPost');
                expect(result.detail).to.be('hello world');
                expect(result.username).to.be('test user');
                done();
            });
        });

        it ('usernameが指定されなかったら anonymous として保存される', function(done) {
            var post = new Post({
                topic_id : 314918,
                title: 'testPost',
                detail: 'hello world',
            });

            post.save(function(err,result) {
                if (err) {
                    done(err);
                }
                expect(result.title).to.be('testPost');
                expect(result.username).to.be('anonymous');
                done();
            });
        });

        it ('titleが指定されなかったら ValidationErrorで保存できない', function(done) {
            var post = new Post({
                topic_id : 314918,
                detail: 'hello world3',
            });

            post.save(function(err,result) {
                if (err) {
                    console.log(err);
                    expect(err.name).to.be('ValidationError');
                    done();
                }

            });
        });
    });

    describe('select post', function() {
        beforeEach(function(done) {
            var i = 0;
            models.init('localhost', 'forum_test');
            Post.remove(function(err, result) {
                if (err) {
                    done(err);
                }
            });
            for (i; i < 20; i++) {
                post = new Post({
                    topic_id : 1,
                    title : 'title'+ i,
                    detail: 'hello'+ i,
                });
                post.save(function(err) {
                    if (err) {
                        done(err);
                    }

                });
            }
            done();
        });

        it ('指定したtopic_idのポストを取得', function(done) {
            condition = {
                topic_id : 1
            };
            Post.findOne(condition, function(err, result) {
                if (err) {
                    done(err);
                }

                console.log(result);
                console.log(typeof result);
                expect(parseInt(result.topic_id)).to.be(1);
                //done();
            });
            done();
        });
/**
        it ('postsコレクションに入ってるtopic_id = 1のものの個数と、取得する個数が等しい', function(done) {
            condition = {
                topic_id : 1
            };
            var query = Post.find(condition);
            query.count(function(err, count) {
                if (err) {
                    done(err);
                }
                expect(count).to.be(20);
                done();
            });
        });
*/



    });
});
