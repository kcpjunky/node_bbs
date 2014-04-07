var mongoose = require('mongoose'),
	utils = require('CONNECT').utils;

var crypto = require('crypto');

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

function getAuthCookie() {
	return utils.uid(32);
}

exports.getAuthCookie = getAuthCookie;

var UserSchema = new Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
	authcookie: { type: String, required: true, default: getAuthCookie },
	created_at: { type: Date, default: Date.now }
});

UserSchema.methods.setPassword = function(password, password2) {
	console.log("set password");
	if (password === password2) {
		console.log("password match");

		//パスワードセット
		//var hash = crypto.createHash('sha1').update(password).digest('hex');
		//this.password = hash;

		this.password = password;
		return true;
	}
	this.invalidate('password_mismach', new Error('Password mismatch'));
	return false;
};

exports.UserModel = mongoose.model('User', UserSchema);
