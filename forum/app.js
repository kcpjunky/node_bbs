
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , lib = require('./lib');

var app = module.exports = express.createServer();

var models = require('./models');
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride('_method'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.redirect('top', '/topics');
});

//開発環境
app.configure('development', function(){
  
  models.init('localhost', 'forum_dev');
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//本番環境
app.configure('production', function(){
 models.init('localhost', forum_prod);
// app.use(express.errorHandler()); 
});

app.configure('test', function() {
	models.init('localhost', 'forum_test');
//	app.use(express.errorHandler());
});

//View Helper
app.helpers(lib.helpers);


//Dynamic view helper
app.dynamicHelpers(lib.dynamicHelpers);

// Routes

app.get('/', routes.index);

app.get('/topics/:topic_id?', routes.topics.show);
//パラメータがないときはindexに飛ばしたいときnextを使う
//app.get('/topics/:topic_id?', function(req, res, next) {
//	var topic_id = req.param('topic_id');
//	if (!topic_id) {
//		return next();
//	}
//	routes.topics.show;
//});

//個別ページ
app.get('/topics/:topic_id/posts/:post_id', routes.topics.posts.show);

app.post('/topics/:topic_id/posts', routes.topics.posts.create);


app.get('/topics', routes.topics.index);

//app.get('/topics/:topic_id?', routes.topics.index);

app.del('/topics/:topic_id/posts/:post_id', routes.topics.posts.delete);

app.post('/users', routes.users.create);

//登録フォーム
app.get('/sessions/new', routes.sessions.new);

app.get('/sessions/destroy', routes.sessions.delete);

//login
app.post('/sessions', routes.sessions.create);




//error handler
//next(err)で順番にapp.errorを処理
app.error(lib.notFoundHandler);
app.error(lib.errorHandler);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


