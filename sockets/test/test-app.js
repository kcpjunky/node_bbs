var request = require('supertest');
var app = require('../app');

describe('/', function() {
    it ('should return 200 with Content-Lnegth', function() {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html')
            .expect(200);
    });
});
