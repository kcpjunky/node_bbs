var models = require('../../models'),
	User = models.UserModel;

exports.create = function(req, res, next) {
	var username = req.param('username'),
		password = req.param('password'),
		password2 = req.param('password2');

	var user = new User({
		username: username
	});
	user.setPassword(password, password2);
	user.save(function(err, result) {
		if (err) {
			if (err === 11000) {
				//ユーザー名重複
				return res.redirect('back');
			}

			if (err.name === 'ValidationError') {
				if (err.errors.password_mismatch) {
					//パスワードミスマッチ
					console.log("invalid passowrd");
				} else {
					// その他エラー
				}
			
				return res.redirect('back');
			}

		return next(err);
		}

		console.log(result);
		res.redirect('top');
		
	});
};

