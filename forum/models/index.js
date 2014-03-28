var mongoose = require('mongoose');

exports.init = function(host, db) {
	mongoose.connect('mongodb://' + host + '/' + db);
};

exports.topics = [
	{ url: '/topics/1', name: 'Connect' },
	{ url: '/topics/2', name: 'Express' },
	{ url: '/topics/3', name: 'Socket.IO' },
	{ url: '/topics/4', name: 'Mocha' },
	{ url: '/topics/5', name: 'Vows' }
];
	
//スキーマ
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	topic_id: {type: Number, required: true},
	title: {type: String, required: true},
	detail: {type:String, required: true},
	username: {type: String, default: 'anonymous'},
	created_at: {type: Date, default: Date.now}
});

exports.PostModel =  mongoose.model('Post', PostSchema);
