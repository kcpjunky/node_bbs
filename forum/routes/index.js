/*
 * GET: topページ
 */
exports.index = function(req, res, next){

    console.log('routes.index');
    res.render('sessions/new', {
        title: 'Login'
    });
};

exports.topics = require('./topics');
exports.sessions = require('./sessions');
exports.users = require('./users');
