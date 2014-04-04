var request = require('supertest');

var models = require('../../models/index.js');
var expect = require('expect.js');

describe('models/index.js', function() {
    describe('userModel.setPassword',function() {

        it('setPassword(p1,p2) p1===p2のときtrueをかえす', function() {
            var User = models.UserModel;

            var user = new User();
            var p1 = 'testtesttest';
            var p2 = 'testtesttest';

            expect(user.setPassword(p1, p2)).to.be(true);

        });

        it('setPassword(p1,p2) p1!==p2のときfalseをかえす', function() {
            var User = models.UserModel;

            var user = new User();
            var p1 = 'testtesttest';
            var p2 = 'testtesttes';

            expect(user.setPassword(p1, p2)).to.be(false);

        });
    });
});
