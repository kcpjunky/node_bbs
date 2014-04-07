//var request = require('supertest');
var req = require('request');
var app = require('../../app');
var models = require('../../models/index.js');
var expect = require('expect.js');
var superagent = require('superagent');
var User = models.UserModel;
var url = require('url');
var connect = require('connect');


describe('login test', function() {
    var testUser = superagent.agent();
    beforeEach(function(done) {
        models.init('localhost', 'forum_dev');
        user = new User({
            username: 'tt',
            password: 'tt'
        });

        user.save();
        done();
    });
    it ('dbのusersドキュメントに登録されたユーザとパスワードをpostするとloginできる', function(done) {

        testUser
            .post('http://localhost:3000/sessions')
            .send({
                username: 'tt',
                password: 'tt',
                rememberme: true
            }).end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).not.to.be.empty();
                console.log(res.redirects);
                expect(res.redirects[0]).to.be('http://localhost:3000/topics');
                done();
            });
    });

    it ('dbのusersドキュメントに登録されたユーザで、パスワードが違うとログインできない', function(done) {

        testUser
            .post('http://localhost:3000/sessions')
            .send({
                username: 'tt',
                password: 't',
                rememberme: true
            }).end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).not.to.be.empty();
                console.log(res.redirects);
                expect(res.redirects[0]).to.be('http://localhost:3000/');
                done();
            });
    });
    it ('dbのusersドキュメントに登録されてないユーザだとログイン失敗', function(done) {

        testUser
            .post('http://localhost:3000/sessions')
            .send({
                username: 'uiuiu',
                password: 'tt',
                rememberme: true
            }).end(function(err, res) {
                expect(err).to.be(null);
                expect(res.redirects).not.to.be.empty();
                console.log(res.redirects);
                expect(res.redirects[0]).to.be('http://localhost:3000/');
                done();
            });
    });
});
