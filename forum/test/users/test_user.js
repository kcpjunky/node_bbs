/**var supertest = require('supertest');
//var app = require('../../app');
var service = require('../../routes/users/index.js');

var expect = require('expect.js');
var models = require('../../models');
var User = models.UserModel;

var http = require('http');

describe('users/index create()', function() {
    //beforeEachでdb初期化
    beforeEach(function(done) {

        console.log('before');
        //各テストがはじまる前の処理
        var username = 'testuser',
            password = 'password',
            password2 = 'password';

        var user = new User({
            username: username
        });

        //初期化のためユーザをdbから削除
        user.remove(function(err, user) {
            if (err) {
                console.log('error');
                return done(err);
            }

            console.log("existed date delete");
            user.findById(user._id, function(err, result) {
                console.log(result);
            });
        });

        console.log('done');
        done();

    });

    it ('パスワード１とパスワード２が一致していたらDBに登録', function(done) {
        var req = {
            param: {
                username : 'testuser',
                password : 'password',
                password2 : 'password',
                rememberme : true
            }
        };
/*
        var options = {
            hostname: 'localhost',
            port:3000,
            path: 'users',
            method: 'POST',
            form: { username : 'testuser',
                    password : 'password',
                    password2 : 'password'
            },
            json: true
        }
        var req = http.request(options, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                var name = JSON.parse(body).username;
                console.log('name =' + name);
            });
        }).on('error', function(e) {
            console.log(e.message);
        });

        var condition = {
            username : req.param.username
        };

        var user = new User({
            username: condition.username
        });
        user.setPassword(password, password2);
        console.log(user);
        var res = {};
        var next = {};
        service.create(req,res,next, function(err) {
            done();
        });


        console.log(User.find(condition));
        User.findOne(condition, function(err, foundUser) {
            expect(foundUser.username).to.be(condition.username);
        });

        done();
        //expect(User.findOne(condition)).not.to.be(undefined);

    });

    afterEach(function(done) {
        //各テスト後の処理
        done();
    })
})
*/
