var request = require('supertest');
//var app = require('../../app');
var service = require('../../routes/users/index.js');

var expect = require('expect.js');
var models = require('../../models');
var User = models.UserModel;

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
                return handleError(err);
            }

            user.findById(user._id, function(err, user) {
                console.log(user);
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


        var condition = {
            username : req.param.username
        };

        var user = new User({
            username: condition.username
        });
        console.log(user);
        var res = {};
        var next = {};
        var result = service.create;
        
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
