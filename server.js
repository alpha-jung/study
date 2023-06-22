const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);

require('dotenv').config();

// nodemon : 서버 재실행 자동화 모듈

/*
    ** REST 원칙
    1. Uniform Interface ( 가장 중요한 원칙 )
    - 하나의 자료는 하나의 URL 로 설정
    - URL 하나를 알면 둘을 알 수 있어야 함
    - 요청과 응답은 정보가 충분히 들어있어야 함

    2. Clinet-Server 역할 구분
    - 브라우저는 요청 / 서버는 응답만 할 뿐
    
    3. Stateless
    - 요청간의 의존성이 없어야 함
    ex) 요청1과 요청2는 관련이 없어야 함

    4. Cacheable
    - 서버에서 보내주는 정보들은 캐싱이 가능해야 함
    - 캐싱을 위한 버전 같은것도 관리 잘해야 함
    => 브라우저가 알아서 잘해줌

    5. Layered System

    6. Code on Demand


    ** 좋은 REST API 예시
    www.example.com/products/66432
    instagram.com/explore/tags/kpop/
    facebook.com/natgeo/photos/

    - 이름짓기 원칙
    1. URL 을 명사로 작성 추천
    2. 하위문서를 나타낼 땐 /
    3. 파일 확장자 (.html) 쓰지 말기
    4. 띄어쓰기는 대시(-) 이용
    5. 자료 하나당 하나의 URL
*/


/*
    미들웨어 (MiddleWare)
    요청-응답 중간에 실행되는 코드
*/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/', require('./routes/login.js'));
app.use('/board', require('./routes/board.js'));
app.use('/chat', require('./routes/chat.js'));
app.use('/socket', require('./routes/socket.js'));

app.set('view engine', 'ejs');

// 관습적으로 public 폴더 만들어서 안에 공통적으로 사용하는 파일 저장 ex) css, js 등
// static 파일 보관하기 위해 public 폴더 사용한다는 의미
app.use('/public', express.static('public'));

let port = process.env.PORT;

// app.listen(port, function(req, res) {
//     console.log("listening to " + port);
// });

http.listen(8080, function() {
    console.log('listening on 8080');
});

io.on('connection', function(socket) {
    console.log('Connected');
    console.log(socket.id);

    socket.on('joinroom', function(data) {
        console.log(data);

        // 채팅방 입장
        socket.join('room1');
    });

    socket.on('room1-send', function(data) {
        // 해당 채팅방에 있는 유저들에게만 메세지 전송
        io.to('room1').emit('broadcast', data);
    });

    // 해당 함수에 설정한 이름(ex. user-send)으로 메세지 보내면 내부 코드 실행
    socket.on('user-send', function(data) {
        console.log(data);

        // server -> client 에게 메세지 전송
        // socket 에 접속한 모든 client 에게 메세지 전송
        io.emit('broadcast', data);

        // 서버-유저와 단독으로 소통해야할 시
        // io.to(socket.id).emit('broadcast', data);
    });
});

app.get('/', function(req, res) {
    res.render('index.ejs');
});

