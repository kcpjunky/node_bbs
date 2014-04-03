var request = require('supertest');
var app = require('../app');

/**
 * '/'にアクセスすると'/top'にリダイレクトされる
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
});
