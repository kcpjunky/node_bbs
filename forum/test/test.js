var math = require('./testMath.js');
var expect = require('expect.js');

expect(1).to.be.ok();

describe('test suite', function() {
	it('should expose as function', function() {
		expect(math.testMath).to.be.a('function');
	});

	it('should do math', function() {
		expect(math.testMath(1,3)).to.be.equal(4);
	});
});



