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
			req.flash('loginErr', 'authentication failed');
			return res.redirect('back');
		}

		//console.log(result);
		
		req.session.username = result.username;
		
		res.redirect('top');
	});
};

exports.delete = function(req, res) {
	req.session.destroy();
	res.redirect('./sessions/new');
};
