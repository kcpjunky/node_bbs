var util = require('util'),
		models = require('../models'),
		user = models.UserModel;

	var setCookie = exports.setCookie = function(res, val) {
	res.cookie('authtoken', val, {
		path: '/',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
	});
};

// ログ用モジュール
var logger = require('../config/log.js');

//error
//404 error
function NotFound(path) {
	var errStr = 'NotFound' + path;
	Error.call(this, 'Not Found');
	Error.captureStackTrace(this, this.constructor); // スタックトレースの格納
	this.name = 'NotFound';
	this.path = path;

	logger.error(errStr);

}

//NotFoundをErrorに継承させる
util.inherits(NotFound, Error);

exports.NotFound = NotFound;


// View helper
exports.helpers = {
	// urlと名前からリンク作成
	link_to: function(name, url) {
		return '<a href="' + url + '">' + name + '</a>';
	},

	//空白を&nbsp; 　改行を <br />
	text_format: function(text) {
		return text.replace(/ /g, '&nbsp;').replace(/\r\n|\n\r/g, '<br />');
	}
};

//dynamic view helper
exports.dynamicHelpers = {
	username_or_login: function(req, res) {
		if (req.session.username) {
			return '' + '<p class="login_user">Login as ' + req.session.username + '</p>'
					+ '<p class="logout"><a href="/sessions/destroy">logout</a></p>';
		}
		return '<p class="login"><a href="/sessions/new">login</a></p>';
	},
	message: function(req, res) {
		return function(type) {
			var messages = req.flash(type);
			if (!messages) {
				return '';
			}
			var buf = '<ul class = "message ' + type + '">';
			messages.forEach(function(msg) {
				var li = '<li>' + msg + '</li>';
				buf += li;
			});
			buf += '</ul>';
			return buf;
		};

	}
};



// Error handler
exports.errorHandler = function(err, req, res) {
	var title = '500 internal server error';
	logger.fatal(title);
	res.render('err', {
		status: 500,
		title: title,
		err: err
	});
};

// NotFoundのエラーハンドラ
exports.notFoundHandler = function(err, req, res, next) {
	if (err instanceof NotFound) {
		var title = '404 page not found';
		logger.error(title);
		res.render('err', {
			status: 404,
			title: title,
			err: err
		});
	} else {
		logger.error("something is wrong");
		return next(err);
	}
};

//Route-Middleware
//ログイン状態の判定
exports.loginRequired = function(req, res, next) {
	console.log("loginRequired");
	if (req.session.username) {
		return next();
	}

//	res.redirect('/sessions/new');
	if (!req.cookies.authtoken) {

		//sessionもcookieもない場合、ログインページにリダイレクト
		logger.warn('there are no session and cookie : redirect to /sessions/new');
		return res.redirect('/sessions/new');
	}
	console.log("check cookie");
	//cookieがある場合
	console.log(req.cookies.authtoken);
	var token = JSON.parse(req.cookies.authtoken);
	console.log('token = ' +token);
	console.log('username = ' + token.username);
	console.log('authcookie = ' + token.authcookie);
	var condition = {
		username: token.username,
		authcookie: token.authcookie
	}

	//cookieを用いて認証する
	User.findOne(condition, function(err, result) {
		console.log("user findone");
		if (err) {
			logger.error('error has occured at user.findOne');
			return next(err);
		}

		if (!result) {
			logger.warn('there is no record at User.findOne()');
			console.log("no results");
			return res.redirect('/sessions/new');
		}

		var update = { authcookie: models.getAuthCookie()};

		User.update(condition, update, function(err, numAffected) {
			if (err) {
				logger.warn(' update user data failed at User.update()')
				console.log("next : User update");
				return next(err);
			}

			req.session.username = result.username;
			var newtoken = {
				username: result.username,
				authcookie: update.authcookie

			};
			console.log("set cookie");
			setCookie(res, JSON.stringify(newtoken));
			next();
		});
	});
};
