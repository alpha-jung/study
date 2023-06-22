var router = require('express').Router();
let { connectDb, getDb } = require('./db.js');
let db;

connectDb(() => {
    db = getDb();
});

router.use(isLogin);

router.post('/join', function(req, res) {
    let data = {
        title : req.body.title,
        date : new Date(),
        member : [req.body.writer, req.user.userId]
    };

    db.collection('chatroom').insertOne(data)
    .then(result => {
        console.log(result);
        res.status(200).send({ message : '채팅방이 개설되었습니다.' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message : '채팅방 개설 중 오류가 발생했습니다.' });
    });
});

router.get('/list', function(req, res) {
    db.collection('chatroom').find({ member : req.user.userId }).toArray()
        .then(result => {
            console.log(result);
            res.render('chatList.ejs', { chatrooms : result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/message/:id', function(req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    const collection = db.collection('chat');

    res.writeHead(200, {
        'Connection' : 'keep-alive',
        'Content-Type' : 'text/event-stream; charset=utf-8',
        'Cache-Control' : 'no-cache'
    });

    collection.find({ parent : req.params.id }).toArray()
    .then(result => {
        console.log(result);

        /**
        * event : 보낼 데이터 이름
        * data : 보낼 데이터
        */
        res.write('event: test\n');
        res.write('data: ' + JSON.stringify(result) + '\n\n');
    })
    .catch(err => {
        console.log(err);
    });

    // MongoDB Atlas 에서는 별 설정 없이 사용 가능
    // MongoDB 를 로컬이나 따로 설치해서 사용할 경우, replica set 해야 사용 가능
    // 컬렉션 안의 원하는 document만 감시
    // const pipeline = [
    //     { $match: { 'fullDocument.parent' : req.params.id } }
    // ];
    
    // // watch 사용 시, 해당 콜렉션 실시간 감시
    // const changeStream = collection.watch(pipeline);

    // // 콜렉션 변동 감지
    // changeStream.on('change', (result) => {
    //     console.log(result);
    //     console.log(result.fullDocument);
    // });
});

router.post('/message', function(req, res) {
    let data = {
        parent : req.body.parent,
        content : req.body.content,
        userId : req.user.userId,
        date : new Date()
    };

    db.collection('chat').insertOne(data)
    .then(result => {
        console.log('chat save');
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

module.exports = router;