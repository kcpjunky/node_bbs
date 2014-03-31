var models = require('../../models'),
	User = models.UserModel;

exports.new = function(req, res, next) {
	res.render('sessions/new', {
		title: 'Login'
	});
};

exports.create = function(req, res) {
	var condition = {
		username: req.param('username'),
		password: req.param('password')
	};
	User.findOne(condition, function(err, result) {
		if (err) {
			return next(err);
		}
		if (!result) {
			return res.redirect('back');
		}

		console.log(result);
		res.redirect('top');
	});
};
