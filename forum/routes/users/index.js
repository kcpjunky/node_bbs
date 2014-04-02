var models = require('../../models'),
	lib = require('../../lib'),
	User = models.UserModel;

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
			console.log("error occurs user create");
			if (err === 11000) {
				console.log("user already exist");
				//ユーザー名重複
				req.flash('registerErr', 'username already exist!');
				req.flash('registerErr', 'select another username1');
				return res.redirect('back');
			}

			if (err.name === 'ValidationError') {
				console.log("validation error")
				if (err.errors.password_mismatch) {
					//パスワードミスマッチ
					console.log("validation console.error();");
					req.flash('registerErr', 'two passwords doesn\'t match!');
					console.log("invalid passowrd");
				} else {
					// その他エラー
					console.log("unknown error");
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
	res.redirect('top');

	});
};
