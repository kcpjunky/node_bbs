var models = require('../../../models'),
	topics = models.topics,
    PostModel = models.PostModel;

exports.create = function(req, res, next) {
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
		detail: detail
	});

	post.save(function(err, result) {
		console.log(result);
		res.redirect('back');
	});
};

exports.show = function(req, res, next) {
	var topic_id = req.param('topic_id');
	var post_id = req.param('post_id');
	PostModel.findById(post_id, function(err, result) {
		if (err) {
			//pending
		}

		if (!result) {
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
		_id: req.param('post_id')
	};

	PostModel.remove(condition, function(err, result) {
		if (err) {
			//pending
		}

		if (result === 0 ) {
			return res.redirect('back');
		}
		res.redirect('/topics/' + topic_id);
	});
};
