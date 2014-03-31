exports.new = function(req, res, next) {
	res.render('sessions/new', {
		title: 'Login'
	});
};
