
/*
 * GET home page.
 */

exports.test = function(req, res){
  res.render('test', 
  { title: 'Express',
  	name : 'akutsu',
	age  : 'keita'
	})
};
