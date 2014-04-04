var log4js = require('log4js');

//設定ファイル読み込み
log4js.configure('config/log4js.json');

exports.logger = log4js.getLogger({
	"appenders": [
		{
			"type": "file",
			"filename": "/var/log/express/logfile.log"
		}
	]
});


var loggerApp = log4js.getLogger('app'),
	loggerErr = log4js.getLogger('error'),
	loggerAcs = log4js.getLogger('access');

//expressに渡すアクセスログの設定
exports.accessConfig = log4js.connectLogger(loggerAcs, { level: log4js.levels.INFO });

// アプリケーションログ
exports.info = function(str) {
	loggerApp.info(str);
} ;

// エラー　warn
exports.warn = function(str) {
	loggerErr.warn(str);
};

// エラー error
exports.error = function(str) {
	loggerErr.error(str);
};

// エラー fatal
exports.fatal = function(str) {
	loggerErr.fatal(str);
};
