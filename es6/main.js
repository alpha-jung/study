let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 등장 캐릭터의 속성을 Object 자료형에 정리해두면 편리
let dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let img1 = new Image();
img1.width = 10;
img1.height = 10;
img1.src = 'lion.png';

// dino.draw();

// 장애물 class
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}


let timer = 0;
let jumpingTimer = 0;
let cactusArr = new Array();
let jumping = false;
let animation;

// 1초에 60번 실행할 코드
// 실행 횟수는 모니터의 fps에 따라 다름
function frameFunc() {
    animation = requestAnimationFrame(frameFunc);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 200 === 0) {
        let cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a, i, o) => {
        // x 좌표가 0 미만이면 제거
        a.x--;

        collisionFunc(dino, a);

        a.draw();

        if(a.x < 0) {
            o.splice(i, 1);
        }
    });

    if(jumping) {
        dino.y -= 3;
        
        jumpingTimer++;
    }

    if(!jumping) {
        if(dino.y < 200) {
            dino.y += 3;
        }
    }

    if(jumpingTimer > 100) {
        jumping = false;
        jumpingTimer = 0;
    }

    dino.draw();
}

frameFunc();


// 충돌 확인
function collisionFunc(dino, cactus) {
    let xDis = cactus.x - (dino.x + dino.width);
    let yDis = cactus.y - (dino.y + dino.height);

    if(xDis <= 0 && yDis <= 0) {
        // canvas.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

document.addEventListener('keydown', function(e) {
    if(e.code === 'Space') {
        jumping = true;
    }
});