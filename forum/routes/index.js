var logger = require('../config/log.js');

/*
 * GET: topページ
 */
exports.index = function(req, res, next){
    if (err) {
        logger.error(err);
        return next(err);
    }
    console.log('routes.index');

    res.redirect('login');
};

exports.topics = require('./topics');
exports.sessions = require('./sessions');
exports.users = require('./users');
