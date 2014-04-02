var models = require('../../../models'),
	topics = models.topics,
    PostModel = models.PostModel;

exports.create = function(req, res, next) {
	console.log("topics/posts//create");
	var topic_id = req.param('topic_id');
	var title = req.param('title');
	var detail = req.param('detail');

//	res.send('topic_id: ' + topic_id
//    console.log('topic_id: ' + topic_id
//                + ' title ' + title
//				+ ' detail' + detail);
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
				req.flash('postErr', 'invalid input');

				return res.redirect('back');
			}
			return next(err);
		}
	});
};

exports.show = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');
	PostModel.findById(post_id, function(err, result) {
		if (err) {
			//error page
			return next(err);
		}

		if (!result) {

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
	var condition = {
		_id: req.param('post_id'),
		username: req.session.username
	};

	PostModel.remove(condition, function(err, result) {
		if (err) {
			//pending
			return next(err);
		}

		if (result === 0 ) {
			req.flash('deleteErr', 'Can\'t delete this topic');
			return res.redirect('back');
		}
		res.redirect('/topics/' + topic_id);
	});
};
