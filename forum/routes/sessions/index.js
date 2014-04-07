var models = require('../../models'),
	lib = require('../../lib'),
	User = models.UserModel;

// ログ用モジュール
var logger = require('../../config/log.js');

/**
 * セッションがあったらtopicsページ
 * なかったらログインページに遷移
 */
exports.new = function(req, res, next) {

	if (req.session.username) {
		logger.info('session login');
		res.redirect('top');
	}
	res.render('sessions/new', {
		title: 'Login'
	});
};

/**
 * セッション情報作成
 */
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

/**
 * セッション情報の削除
 */
exports.delete = function(req, res) {
	// セッション削除
	req.session.destroy();

    // クッキー情報削除
	res.clearCookie('authtoken', {path: '/'});
	logger.info('session deleted');

	res.redirect('login');
};
