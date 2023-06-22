var router = require('express').Router();
let path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './public/image');
    },
    filename : function(req, file, cb) {
        cb(null, file.originalname);
    },
    filefilter : function(req, file, cb) {
        // 업로드 전, 파일 검사 로직 작성
    }
});

let upload = multer({storage : storage});

let { connectDb, getDb } = require('./db.js');
let db;

connectDb(() => {
    db = getDb();
});

router.use(['write', '/add', '/edit', '/delete'], isLogin);

router.get('/write', function(req, res) {
    res.render('write.ejs');
});

router.post('/add', (req, res) => {
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.content);

    // let data = req.body;

    db.collection('counter').findOne({ name : '게시물갯수' })
    .then(result => {
        console.log(result);
        console.log(result.totalPost);

        let totalPost = result.totalPost;
        let data = {
            _id : totalPost + 1,
            title : req.body.title,
            content : req.body.content,
            userId : req.user.userId
        };

        db.collection('post')
        .insertOne(data)
        .then(result => {
            console.log("save");

            /*
                operator

                {$set : { totalPost : 바꿀 값 }}
                {$inc : { totalPost : 기존 값에 더해줄 값 }}
            */
            db.collection("counter").updateOne({ name : '게시물갯수' }, { $inc : { totalPost : 1 }})
            .then(result => {
                console.log(result);
                res.send('전송 완료');
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });

});

router.get("/list", function(req, res) {
    db.collection('post').find().toArray()
        .then(result => {
            console.log(result);
            res.render('list.ejs', { posts : result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/search', function(req, res) {
    console.log(req.query);

    let value = req.query.value;

    /*
        ** text index 장점
        1. 빠른 검색

        2. or 검색 가능
        ex) test1234 zxcv => test1234, zxcv 가 포함된 내용 검색
        
        3. - 제외 가능
        ex) test123 -zxcv => zxcv 가 포함된 내용은 검색 X
        
        4. "" 사용할 시, 정확히 일치하는 내용만 검색
        ex) "test1234" => test1234 와 정확히 일치하는 내용만 검색


        ** text index 문제점
        띄어쓰기 기준으로 단어를 저장
        한국어, 일본어, 중국어 검색에는 문제가 많음
        

        ** 문제점 해결책
        1. text index 사용하지 않고 검색할 문서의 양을 제한두기
        2. text index 만들 때 다르게 만들기
           > 띄어쓰기 단위로 indexing 금지
           > 글자 두개 단위로 indexing (nGram)
           > 해당 방법은 만들기 번거로움

        3. search index 사용
           > MongoDB Atlas 에서만 제공하는 기능
    */

    // find 함수 내에서 index 에 의해서 검색 요청하는 방식
    // db.collection('post').find({ $text : { $search : req.query.value }}).toArray()

    // $regex : 정규식 사용 ( 해당 값이 포함된 내용 검색 )
    // $options : 검색 조건, i 사용할 경우 대소문자 구분없이 검색
    db.collection('post').find({ title : { $regex : value, $options : i }}).toArray()
    .then(result => {
        console.log(result);
        res.render('list.ejs', { posts : result });
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/detail/:id', function(req, res) {
    let id = parseInt(req.params.id);

    db.collection('post').findOne({ _id : id })
    .then(result => {
        console.log(result);
        res.render('detail.ejs', { data : result });
    }).catch(err => {
        console.log(err);
    });    
});

router.get('/edit/:id', function(req, res) {
    let id = parseInt(req.params.id);

    db.collection('post').findOne({ _id : id })
    .then(result => {
        console.log(result);
        res.render('edit.ejs', { data : result });
    }).catch(err => {
        console.log(err);
    });    
});

router.put('/edit', function(req, res) {
    let data = req.body;
    let _id = parseInt(data._id);

    console.log(data);

    db.collection('post').updateOne({ _id : _id }, { $set : { title : data.title, content : data.content }})
    .then(result => {
        console.log(result);
        res.redirect('/list');
    })
    .catch(err => {
        console.log(err);
    });
});

router.delete("/delete", function(req, res) {
    // let _id = parseInt(req.body._id);
    req.body._id = parseInt(req.body._id);

    let target = {
        _id : req.body._id,
        userId : req.user.userId
    };

    db.collection('post').deleteOne(target)
    .then(result => {
        console.log(result);
        console.log("delete complete");

        if(result.deletedCount > 0) {
            res.status(200).send({ message : '게시글이 삭제되었습니다.' });
        } else {
            res.status(403).send({ message : '게시글을 삭제할 권한이 없습니다.' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message : '게시물 삭제에 실패했습니다.' });
    });
});

router.get('/upload', function(req, res) {
    res.render('upload.ejs');
});

router.post('/upload', upload.single('profile'), function(req, res) {
    /*
        여러 파일 업로드 시
        upload.array('input name', 개수);
        ex) upload.array('profile', 10);
    */
    res.send('업로드 완료');
});

router.get('/image/:imgName', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/image/' + req.params.imgName));
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