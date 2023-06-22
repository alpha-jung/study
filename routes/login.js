var router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
let { connectDb, getDb } = require('./db.js');
let db;

connectDb(() => {
    db = getDb();
});

router.use(session({ secret : 'test1234', resave : true, saveUninitialized : false }));
router.use(passport.initialize());
router.use(passport.session());

router.use('/mypage', isLogin);

router.get('/login', function(req, res) {
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', { failureRedirect : '/fail' }), function(req, res) {
    res.redirect('/');
});

router.get('/register', function(req, res) {
    res.render('register.ejs')
});

router.post('/register',  function(req, res) {
    db.collection('login').insertOne({ userId : req.body.userId, userPwd : req.body.userPwd })
    .then(result => {
        console.log(result);
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/mypage', function(req, res) {
    // deserializeUser 의 done 에서 넘겨준 파라미터가 req 에 담겨져 옴
    console.log('mypage call');
    console.log(req.user);
    res.render('mypage.ejs', { user : req.user } );
});

passport.use(new LocalStrategy({
    usernameField : 'userId',
    passwordField : 'userPwd',
    session : true,
    passReqToCallback : false,
}, function(userId, userPwd, done) {
    db = getDb();

    console.log(userId);
    console.log(userPwd);
    console.log(db);

    db.collection('login').findOne({ userId : userId })
    .then(result => {
        console.log("1");
        console.log(result);

        if(result == null) {
            return done(null, false, { message : '존재하지 않는 아이디입니다.' });
        }

        if(result.userPwd == userPwd) {
            return done(null, result);
        } else {
            return done(null, false, { message : '비밀번호가 틀렸습니다.' });
        }
    })
    .catch(err => {
        console.log("2");
        console.log(err);
    });
    
}));

passport.serializeUser(function(user, done) {
    console.log("serializeUser Function");
    console.log(user);
    done(null, user.userId);
});

// session 을 찾을 때 실행되는 함수
// 로그인한 유저의 개인 정보를 DB에서 찾는 역할
passport.deserializeUser(function(userId, done) {
    // DB 에서 userId 로 유저를 찾은 뒤에 유저 정보를 파라미터로 넣음
    db.collection('login').findOne({ userId : userId })
    .then(result => {
        done(null, result);
    })
    .catch(err => {
        console.log(err);
    });
});

function isLogin(req, res, next) {
    // 로그인 후 세션이 있으면 request 에 user 가 항상 있음
    if(req.user) {
        next();
    } else {
        res.send('로그인 후 다시 시도해주세요.');
    }
}

// module.exports = 내보낼 변수명
// require('파일 경로') / require('라이브러리명')
module.exports = router;