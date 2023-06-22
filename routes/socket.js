var router = require('express').Router();
let { connectDb, getDb } = require('./db.js');
let db;

connectDb(() => {
    db = getDb();
});

router.use(isLogin);

router.get('/join', function(req, res) {
    res.render('socket.ejs');
});

function isLogin(req, res, next) {
    // 로그인 후 세션이 있으면 request 에 user 가 항상 있음
    if(req.user) {
        next();
    } else {
        res.send('로그인 후 다시 시도해주세요.');
    }
}

module.exports = router;