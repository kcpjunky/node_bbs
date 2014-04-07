var request = require('supertest');
//var app = require('../../app');
var service = require('../../routes/users/index.js');

var expect = require('expect.js');
var models = require('../../models');
var User = models.UserModel;
var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';
describe('db connection', function() {
    beforeEach(function(done) {
        function clearDB() {
            for (var i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function() {});
            }
            return done();
        }

        if (mongoose.connection.readyState === 0 ) {
            mongoose.connect(config.db.forum_test, function(err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }

    });
    it ('test用のdbに接続', function(err) {
        var connection = mongoose.connect('mongodb://localhost:27017/forum_test',function(err) {

        });
        console.log(connection);

        connection.on('open', function(err) {
            console.log('connect');
        });
    })
    mongoose.connect('mongodb://localhost:27017/forum_test',function(err){});
});

describe('User',function() {

    describe('find', function() {
        //各テストがはじまる前の処理
        before(function(done) {

        })
        var username = 'testuser',
            password = 'password',
            password2 = 'password';

    })
})
