var models = require('../../models'),
	lib = require('../../lib'),
	User = models.UserModel;

var logger = require('../../config/log.js');
exports.new = function(req, res, next) {
	if (req.sessions) {
		res.render('topics');
	}
	res.render('sessions/new', {
		title: 'Login'
	});
};

exports.create = function(req, res) {
	var condition = {
		username: req.param('username'),
		password: req.param('password')
	};
	var rememberme = req.param('rememberme');
	User.findOne(condition, function(err, result) {
		if (err) {
			console.log(err.name);
			logger.error(err);
			return next(err);
		}
		if (!result) {
			logger.error('authentication failed');
			req.flash('loginErr', 'authentication failed');
			return res.redirect('back');
		}

		if (rememberme) {
			//cookieを保存
			logger.info('remember');
			var newtoken = {
				username: result.username,
				authcookie: result.authcookie
			};
			lib.setCookie(res, JSON.stringify(newtoken));
		}

		//console.log(result);

		req.session.username = result.username;
		logger.info('post create success');
		res.redirect('top');
	});
};

exports.delete = function(req, res) {
	req.session.destroy();

	res.clearCookie('authtoken', {path: '/'});
	logger.info('post')
	res.redirect('./sessions/new');
};
