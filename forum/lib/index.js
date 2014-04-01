var util = require('util');

//error
//404 error
function NotFound(path) {
	Error.call(this, 'Not Found');
	Error.captureStackTrace(this, this.constructor); // スタックトレースの格納
	this.name = 'NotFound';
	this.path = path;
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
	res.render('err', {
		status: 500,
		title: '500 internal server error',
		err: err
	});
};

// NotFoundのエラーハンドラ
exports.notFoundHandler = function(err, req, res, next) {
	if (err instanceof NotFound) {
		res.render('err', {
			status: 404,
			title: '404 page not found',
			err: err
		});
	} else {
		return next(err);
	}
};

//Route-Middleware
//ログイン状態の判定
exports.loginRequired = function(req, res, next) {
	if (req.session.username) {
		return next();
	}

	res.redirect('/sessions/new');
};
