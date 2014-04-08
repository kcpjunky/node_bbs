
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  //サーバーがリクエストを受けとっタラいくつかの事前処理をしたあと
  // この先頭からミドルウェアをとりだし、　実行
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);

  //静的ファイルのディレクトリ設定
  app.use(express.static(__dirname + '/public'));

  //404になったときのエラーハンドラ
  app.use(function(req, res, next) {
  	  res.status(404);
	  res.render('404', {title: "お探しのページはそんざいしません"});
  });
});

//サーバにたいして環境ごとの設定を反映させる

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/test', routes.test);


app.listen(3000);
console.log("Express server listening on port %ｍd in %s mode", app.address().port, app.settings.env);
