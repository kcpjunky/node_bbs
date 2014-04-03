var models = require('../../../models'),
	topics = models.topics,
    PostModel = models.PostModel;

var logger = require('../../../config/log.js');

exports.create = function(req, res, next) {
	console.log("topics/posts/create");
	var topic_id = req.param('topic_id');
	var title = req.param('title');
	var detail = req.param('detail');

	// modelに値を割り当てる
	var post = new PostModel({
		topic_id: topic_id,
		title: title,
		detail: detail,
		username: req.session.username
	});

	post.save(function(err, result) {
	//console.log(result);

		if (err) {

			if (err.name == 'ValidationError') {
				logger.error('validation error occured');
				req.flash('postErr', 'invalid input');

				return res.redirect('back');
			} else {
				logger.error('unknown error occured');
			}
			return next(err);
		} else {
			logger.info('post save success');
			res.redirect('/topics/' + topic_id);
		}
	});
};

exports.show = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');
	PostModel.findById(post_id, function(err, result) {
		if (err) {
			//error page
			logger.error('no post found post_id = ' + post_id);
			return next(err);
		}

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

exports.delete = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');
	var condition = {
		_id: ObjectId(post_id),
		username: req.session.username
	};

	console.log(req.param('post_id'));
	PostModel.remove(condition, function(err, result) {
		if (err) {
			logger.error('failed to remove post , post_id = ' + condition._id + ' username = ' + condition.username);
			//pending
			return next(err);
		}

		if (result === 0 ) {
			logger.error('no such post post_id = ' + condition._id);
			req.flash('deleteErr', 'Can\'t delete this topic');
			return res.redirect('back');
		}
		res.redirect('/topics/' + topic_id);
	});
};
