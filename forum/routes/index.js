
/*
 * GET home page.
 */

exports.index = function(req, res){
//  res.render('index', { title: 'Express' })
res.redirect('top');
};

exports.topics = require('./topics');
