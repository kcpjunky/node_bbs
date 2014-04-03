var models = require('../../models'),
	topics = models.topics,
    PostModel = models.PostModel,
	lib = require('../../lib'),
	NotFound = lib.NotFound;

//var topics = [
//	{ url: '/topics/1', name: 'Connect' },
//	{ url: '/topics/2', name: 'Express' },
//	{ url: '/topics/3', name: 'Socket.IO' },
//	{ url: '/topics/4', name: 'Mocha' },
//	{ url: '/topics/5', name: 'Vows' }
//];


exports.index = function(req, res) {
	console.log("routes index");
	console.log(topics);
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


	//topic_idを数字に変換する
	var topic_id = parseInt(req.param('topic_id'), 10);

	if (!topic_id){
		console.log("next");
		return next();
	}

	//指定したtopicIdの項目がない場合
	if (!topics[topic_id -1]) {
		return next(new NotFound(req.url));
	}
//	res.render('topics/show', {
//		title: topics[topic_id - 1].name,
//		topic_id: topic_id,
//		posts: dummy_post
//	});

	PostModel.where('topic_id', topic_id).run(function(err, result) {
		if (err) {
			//エラーをnext()二投げるとエラーページに遷移
			return next(err);
		}

		res.render('topics/show', {
			title: topics[topic_id - 1].name,
			topic_id: topic_id,
			posts: result
		});
	});
};

exports.posts = require('./posts');
