var mongoose = require('mongoose');
var models = require('../../models'),
    lib = require('../../lib'),
    Post = models.PostModel,
    User = models.UserModel;
var app = require('../../app');
var url = require('url');

//var service = require('../../routes/users/index.js');

var expect = require('expect.js');

var superagent = require('superagent');
var connect = require('connect');

//app.listen(3000);
describe('topics', function() {

    describe('show', function() {
        var testUser1 = superagent.agent();

        before(function(done) {
            var i = 0;
            Post.remove(function(err, result) {
                if (err) {
                    done(err);
                }
            });
            models.init('localhost', 'forum_test');
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

        it ('ログインしていない状態だとリダイレクト', function(done) {


            testUser1.get('http://127.0.0.1:3000/topics')
                .query({topic_id : 1})
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    expect(res.status).to.be(302);
                    expect(res.redirect).to.be(true);
                    //expect(res.headers[:])
                    //console.log(res);
                    console.log(res.body);
                    //console.log(res);
                    done();
                });
        });
    });
});
