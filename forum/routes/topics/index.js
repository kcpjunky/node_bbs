var models = require('../../models'),
	topics = models.topics,
    PostModel = models.PostModel,
	lib = require('../../lib'),
	NotFound = lib.NotFound;

// ログ用モジュール
var logger = require('../../config/log.js');
var topics = [
	{ url: '/topics/1', name: 'Connect' },
	{ url: '/topics/2', name: 'Express' },
	{ url: '/topics/3', name: 'Socket.IO' },
	{ url: '/topics/4', name: 'Mocha' },
	{ url: '/topics/5', name: 'Vows' }
];

/**
 * topic一覧画面
 */
exports.index = function(req, res) {
	console.log("routes index");
	logger.info('/topics/index');

	res.render('topics/index', {
		title: 'Topics',
		topics: topics
	});
};

/**
 * 各トピックスのコメント一覧
 */
exports.show = function(req, res, next) {
	console.log("show");


	//topic_idを数字に変換する
	var topic_id = parseInt(req.param('topic_id'), 10);
	console.log('topic_id '+ topic_id);
	if (!topic_id){
		console.log("next");
		return next();
	}

	//指定したtopicIdの項目がない場合
	if (!topics[topic_id -1]) {
		return next(new NotFound(req.url));
	}

	PostModel.where('topic_id', topic_id).run(function(err, result) {
		if (err) {
			//エラーをnext()二投げるとエラーページに遷移
			logger.error(err);
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
