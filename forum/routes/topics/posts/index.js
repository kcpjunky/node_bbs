var models = require('../../../models'),
	topics = models.topics,
    PostModel = models.PostModel;

// ログ用モジュール
var logger = require('../../../config/log.js');

/**
 * 投稿を保存する
 */
exports.create = function(req, res, next) {
	console.log('--------------------------------');
	console.log("topics/posts/create");
	var topic_id = req.param('topic_id');
	console.log('topicid = ' + topic_id);
	var title = req.param('title');
	console.log('title = ' + title);
	var detail = req.param('detail');
	console.log('detail = ' + detail);
	var username = req.session.username || req.param('username');
	// modelに値を割り当てる
	var post = new PostModel({
		topic_id: topic_id,
		title: title,
		detail: detail,
		username: req.session.username
	});

	post.save(function(err, result) {

		if (err) {
			console.log('save error');
			if (err.name == 'ValidationError') {
				logger.error('validation error occured');
				req.flash('postErr', 'invalid input');

				return res.redirect('back');
			} else {
				logger.error('unknown error occured');
				logger.error(err);
			}
			return next(err);
		} else {
			if (!result) {
				logger.error('failed to save post');
			} else {
				logger.info('post save success');
			}

			res.redirect('/topics/' + topic_id);
		}
	});
};

/**
 *
 */
exports.show = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');

	//　選択した投稿情報を取得する
	PostModel.findById(post_id, function(err, result) {
		if (err) {
			//error page
			logger.error('no post found post_id = ' + post_id);
			logger.error(err);
			return next(err);
		}

		// 結果なしの場合
		if (!result) {
			logger.error('failed to get model post_id = ' + post_id);
			//結果が取得できなかったとき
			req.flash('getPostErr', 'Can\'t get this post');
			return res.redirect('back');
		}

		//viewに対してレンダリング
		res.render('topics/posts/show', {
			title: result.title,
			topic_id: topic_id,
			post_id: post_id,
			post: result
		});
	});
};

/**
 * 選択した投稿を削除する
 */
exports.delete = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');
	var condition = {
		_id: req.param('post_id')
	};

	console.log(req.param('post_id'));

	// 該当する投稿を削除する
	PostModel.remove(condition, function(err, result) {
		if (err) {
			logger.error(err);
			logger.error('failed to remove post , post_id = ' + condition._id + ' username = ' + condition.username);
			//pending

			return next(err);
		}

		// 結果が0件だった場合
		if (result === 0 ) {
			logger.error('no such post post_id = ' + condition._id);
			req.flash('deleteErr', 'Can\'t delete this topic');
			return res.redirect('back');
		}
		res.redirect('/topics/' + topic_id);
	});
};
