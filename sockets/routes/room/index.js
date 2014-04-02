//room
exports.index = function(req, res) {
    res.render('room/index', {
        roomName : req.param('roomName'),
        user : req.param('user'),
        test : 'test'
    });
};
