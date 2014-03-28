var models = require('../../models'),
	topics = models.topics,
    PostModel = models.PostModel;


//var topics = [
//	{ url: '/topics/1', name: 'Connect' },
//	{ url: '/topics/2', name: 'Express' },
//	{ url: '/topics/3', name: 'Socket.IO' },
//	{ url: '/topics/4', name: 'Mocha' },
//	{ url: '/topics/5', name: 'Vows' }
//];


exports.index = function(req, res) {
	res.render('topics/index', {
		title: 'Topics',
		topics: topics
	});
};


////ダミーポスト
//var dummy_post = [{
//	title: 'dummy post',
//	detail: 'hello express',
//	username: 'jxck',
//	created_at: new Date()
//	}];

exports.show = function(req, res, next) {
	console.log("show");	
	var topic_id = req.param('topic_id');

	if (!topic_id){ 
		console.log("next");
		return next();
	}

//	res.render('topics/show', {
//		title: topics[topic_id - 1].name,
//		topic_id: topic_id,
//		posts: dummy_post
//	});

	PostModel.where('topic_id', topic_id).run(function(err, result) {
		if (err) {
			//pending
		}

		res.render('topics/show', {
			title: topics[topic_id - 1].name,
			topic_id: topic_id,
			posts: result
		});
	});
};

exports.posts = require('./posts');
