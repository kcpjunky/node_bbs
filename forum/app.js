
/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
	lib = require('./lib');

// ログ用
var logger = require('./config/log.js');
var app = module.exports = express.createServer();

var models = require('./models');

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride('_method'));
    app.use(express.cookieParser());

    //app.use(express.session({ secret: 'your secret here' }));
    //ブラウザ閉じるごとにクッキー削除
    app.use(
        express.session({
            secret: 'your secret here',
		    cookie: {
		        maxAge: false
			}
        })
	);
    app.use(express.static(__dirname + '/public'));
    app.use(lib.loginRequired);
    app.use(app.router);

    app.use(lib.loginRequired);

    app.redirect('login', '/sessions/new');
    app.redirect('top', '/topics');
});

//開発環境
app.configure('development', function(){
    app.use(logger.accessConfig);
    models.init('localhost', 'forum_dev');
    //  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//本番環境
app.configure('production', function(){
    models.init('localhost', 'forum_prod');
    app.use(logger.accessConfig);
    // app.use(express.errorHandler());
});

app.configure('test', function() {
    app.use(logger.accessConfig);
	models.init('localhost', 'forum_test');
    //app.use(express.errorHandler());
});

//View Helper
app.helpers(lib.helpers);

//Dynamic view helper
app.dynamicHelpers(lib.dynamicHelpers);

// Routes
//トップページに飛ぶ前にlib.loginRequiredでログイン確認
//app.get('/', lib.loginRequired, routes.index);
app.get('/', routes.index);

//app.get('/topics/:topic_id?',lib.loginRequired, routes.topics.show);
app.get('/topics/:topic_id?', routes.topics.show);

//個別ページ
//app.get('/topics/:topic_id/posts/:post_id', lib.loginRequired, routes.topics.posts.show);
app.get('/topics/:topic_id/posts/:post_id', routes.topics.posts.show);
// 投稿
app.post('/topics/:topic_id/posts', routes.topics.posts.create);

// topic一覧
//app.get('/topics', lib.loginRequired, routes.topics.index);
app.get('/topics', routes.topics.index);
// 投稿削除
app.del('/topics/:topic_id/posts/:post_id', routes.topics.posts.delete);

// ユーザ作成
app.post('/users', routes.users.create);

//登録・ログインフォーム
app.get('/sessions/new', routes.sessions.new);

//セッション破棄
app.get('/sessions/destroy', routes.sessions.delete);

//loginする
app.post('/sessions', routes.sessions.create);

//error handler
//next(err)で順番にapp.errorを処理
app.error(lib.notFoundHandler);
app.error(lib.errorHandler);

app.listen(3000,'localhost',function(){

    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


//テスト用
module.exports = app;
//supertestによる単体テスト時に実行
if (!module.parent) {
    app.listen(3000, '127.0.0.1');
}
