
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index',
      { title: 'chat',
        name: 'test'});
};

exports.room = require('./room');
