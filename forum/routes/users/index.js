var models = require('../../models'),
	lib = require('../../lib'),
	User = models.UserModel;

var logger = require('../../config/log.js');

exports.create = function(req, res, next) {
	console.log("now user creating");
	var username = req.param('username'),
		password = req.param('password'),
		password2 = req.param('password2'),
		rememberme = req.param('rememberme');

	var user = new User({
		username: username
	});
	user.setPassword(password, password2);
	user.save(function(err, result) {
		if (err) {
			if (err === 11000) {
				var errStr = 'user already exists';
				logger.error(errStr);
				//ユーザー名重複
				req.flash('registerErr', errStr);
				req.flash('registerErr', 'select another username1');
				return res.redirect('back');
			}

			if (err.name === 'ValidationError') {

				if (err.errors.password_mismatch) {
					//パスワードミスマッチ
					logger.error(err.name + ': two passwords doesn\'t match!')
					req.flash('registerErr', 'two passwords doesn\'t match!');
				} else {
					// その他エラー
					console.log(err);
					logger.fatal(err);
					logger.fatal('unknown error has occured at user.save()');
					req.flash('registerErr', 'check your inputs again!');
				}

				return res.redirect('back');
			}

		return next(err);
		}

		if (rememberme) {
			console.log("remember me");
			var newtoken = {
				username: result.username,
				authcookie: result.authcookie

			};
			lib.setCookie(res, JSON.stringify(newtoken));
		}
	//	console.log(result);
	console.log("create");
	req.session.username = result.username;
	res.redirect('login');

	});
};
