var mongoose = require('mongoose');
var models = require('../../models'),
    lib = require('../../lib'),
    User = models.UserModel;

var supertest = require('supertest');
//var app = require('../../app');
var service = require('../../routes/users/index.js');

var expect = require('expect.js');

describe('dbModel', function() {

    describe('UserModel', function() {
        beforeEach(function(done) {
            models.init('localhost', 'forum_test');
            User.remove(function(err, User) {
                if (err) return handleError(err);

                done();
            });
        })
        it ('データベースに新規登録できる', function(done) {
            var user = new User({
                username: 'testUser',
                password: 'testPass',

            });

            user.save(function(err, result) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                done();
            }) ;
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
                if (err) return handleError(err);

            });
            user.save(function(err, result) {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                done();
            }) ;
        })
        it ('usernameが同じものを登録できない', function(done) {
            var user = new User({
                username: 'testUser2',
                password: 'testPass2',

            });

            user.save(function(err,result){
                console.log(err);
                expect(err).not.to.be(null);
                //done();
            });
        });
    })
});
