
/*
 * GET home page.
 */

exports.index = function(req, resi, next){
//  res.render('index', { title: 'Express' }
    res.redirect('top');
};

exports.topics = require('./topics');
