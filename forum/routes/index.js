
/*
 * GET home page.
 */

exports.index = function(req, res, next){
//  res.render('index', { title: 'Express' }
    res.redirect('top');
};

exports.topics = require('./topics');

exports.sessions = require('./sessions');

exports.users = require('./users');
