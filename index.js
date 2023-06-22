// import { a_name, a_age } from './a';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var test = ['kim', 'park'];
// Object 자료형에 ? 붙일 시, 해당 데이터가 없을수도 있으니 오류로 판단하지 말라는 의미
var test2 = { name: 'kim' };
// Union Type : | 사용하면 설정한 자료형 중 하나로 들어온다는 의미
var test3 = 123;
var members = [1, '2', 3];
var obj = { a: 123 };
var test4 = 123;
// 파라미터와 함수 리턴 타입도 설정 가능
function f1(x) {
    return x * 2;
}
f1(123);
var john = [123, true];
var smith = { name: 'smith' };
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
// typescript 에선 기본으로 자동으로 타입지정 해줌
var test5 = 'test5';
var info = {
    singer: 'Park Hyo Shin',
    song: 'Laughing Man'
};
var project = {
    member: ['kim', 'park'],
    days: 30,
    started: true,
};
// any 타입 : 일반 JS 변수로 만드는 방법
// 타입 관련 버그가 나도 잡아주지 않음
var anyTest;
anyTest = 123;
anyTest = [];
// unknown 타입 : 모든 자료형 허용
var unknownTest;
unknownTest = 123;
unknownTest = {};
// any 타입은 아래 상황에도 오류 발생 X
// unknown 타입은 아래 상황에서 오류 발생 O
var unknownTest2 = anyTest;
// let age :string|number;
// age++; => 오류 발생
// 변수에 해당 타입에 맞는 값을 넣어줘야 함
// let user :string = 'kim';
// let age :undefined|number = undefined;
// let married :boolean = false;
// let cheolsu :(string|undefined|number|boolean)[] = [user, age, married];
// let school : {
//     score : (number|boolean)[],
//     teacher :string,
//     friend :string|string[]
// } = {
//     score : [100, 97, 84],
//     teacher : 'Phil',
//     friend : 'John'
// };
// school.score[4] = false;
// school.friend = ['Lee', school.teacher];
// 함수에서 void 타입 활용 가능
// 파리미터가 옵션일 경우엔 ? 사용
// ex) x? : number => x : number | undefined 와 같은 의미
function f2(x) {
    return;
    // return x * 2; => 오류
}
// function tf1(name? :string) {
//     if(name) {
//         console.log('안녕하세요 ' + name);
//     } else {
//         console.log('이름이 없습니다.');
//     }
// }
// function tf2(num : number | string) :number {
//     let num2 :string = num + '';
//     console.log(num2.length);
//     return num2.length;
//     // return num.toString().length
// }
// function tf3(payment :number, haveHome :boolean, charmingScore :string) :(string|void) {
//     let result :number = 0;
//     result += payment;
//     if(haveHome) {
//         result += 500;
//     }
//     if(charmingScore == '상') {
//         result += 100;
//     }
//     if(result >= 600) {
//         return '결혼 가능';
//     }
// }
// tf3(700, false, '중');
/**
 * Type Narrowing
 * Type 이 아직 하나로 확정되지 않았을 경우 사용
 * 대표적인 Narrowing 방법 : typeof 연산자
 *
 *
 * assertion 문법 : 타입 덮어쓰기
 * ex) array[0] = x as number;
 *
 * assertion 용도
 * 1. Narrowing 할 때 사용
 * 2. 무슨 타입이 들어올지 100% 확실할 때 사용
 *
 * 이전 as 문법
 * ex) <number> x
 */
function ntf(x) {
    var array = [];
    // if(typeof x === 'number') {
    //     array[0] = x;
    // }
    array[0] = x;
    var name = 'kim';
    // name as number; => 에러
    if (typeof x === 'string') {
        return x + '1';
    }
    else {
        return x + 1;
    }
}
ntf(123);
ntf('123'); // assertion 은 버그를 확실하게 잡지 못함
var animal = 123;
var animal2 = { name: 'kim', age: 20 };
var girlfriend = {
    name: 'ember'
};
// girlfriend.name = 'yura'; => 에러 발생
// 타입스크립트 에러는 에디터 & 터미널에서만 존재
var girlfriend2 = {
    name: 'kelly'
};
var position = {
    x: 10,
    y: 20
};
// type Age2 = number;
// type Age3 = Age & Age2;
// type Color = {
//     color? :string,
//     size :number,
//     readonly position :number[]
// };
// type Info = {
//     name :string,
//     phone :number,
//     email :string,
//     adult :boolean
// };
/**
 *
 * Literal Types
 *
 * * 장점
 * 변수에 뭐가 들어올지 더 엄격하게 관리 가능
 * 자동 완성
 *
 * * 특징
 * const 변수와 유사하나, const 변수와 다르게 여러 값 지정 가능
 */
var str;
function tf6(a) {
    // return 4; => 에러
    return 1;
}
// tf6('hi'); => 에러
tf6('hello');
function tf7(rsp) {
    var arr = ['바위', '보'];
    return arr;
}
tf7('가위');
var data = {
    name: 'kim'
}; // object value 값을 그대로 타입으로 지정, object 속성들에 모두 readonly 붙여줌
function tf8(a) {
}
// 해당 함수는 kim 이라는 데이터가 아닌 kim 이라는 타입이 들어가야 함
// data.name 의 타입은 string 이기에 에러 발생
// tf8(data.name); => 에러
tf8(data.name);
var tf9 = function (a) {
    return 1;
};
var memberInfo = {
    name: 'kim',
    plusOne: function (a) {
        return a + 1;
    },
    changeName: function () {
    }
    // pluseOne : (x :number ) => number,
    // changeName : () => void
};
memberInfo.plusOne(2);
var tf10 = function (str) {
    var idx = str.indexOf('0');
    if (idx == 0) {
        str = str.replace('0', '');
    }
    // let result = str.replace(/^0+/, '');
    return str;
};
var tf11 = function (str) {
    return parseFloat(str.replace(/-/gi, ''));
};
console.log(tf10('0cutZero0'));
console.log(tf11('123-456-789'));
var tf12 = function (str, tf10, tf11) {
    var result1 = tf10(str);
    var result2 = tf11(result1);
    return result2;
};
console.log(tf12('0789-654-321-0', tf10, tf11));
console.log(tf12('010-1111-2222', tf10, tf11));
var title = document.querySelector('#title');
/**
 *
 * Typescript 에서 HTML 조작 방법
 * 1. if 문으로 null 체크
 * 2. instance of 사용 ( 제일 많이 사용 )
 * 3. as 키워드 사용 ( 비상 시 혹은 객체가 어떤 타입인지 100% 알 경우에만 사용 )
 * ex) let title = document.querySelector('#title') as Element;
 *
 * 4. ?. 사용
 * 5. tssconfig.json 에서 strict 모드 비활성화
 */
// if(title != null) {
//     title.innerHTML = 'hi';
// }
if (title instanceof Element) {
    title.innerHTML = 'hi';
}
// innerHTML 이 있으면 출력, 없으면 undefined 출력
// if(title?.innerHTML) {
//     title.innerHTML = 'hi';
// }
var link = document.querySelector('.link');
if (link instanceof HTMLAnchorElement) {
    link.href = 'https://www.youtube.com';
}
var button = document.querySelector('#button');
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
});
var img = document.querySelector('#image');
if (img instanceof HTMLImageElement) {
    img.src = 'new.png';
}
var naver = document.querySelectorAll('.naver');
if ((naver === null || naver === void 0 ? void 0 : naver.length) > 0) {
    naver === null || naver === void 0 ? void 0 : naver.forEach(function (a, idx) {
        if (a instanceof HTMLAnchorElement) {
            a.href = 'https://kakao.com';
        }
    });
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.printName = function () {
        console.log(this.name);
    };
    return Person;
}());
var person1 = new Person('Kim');
var person2 = new Person('Park');
console.log(person1);
person1.printName();
var Car = /** @class */ (function () {
    function Car(model, price) {
        this.model = model;
        this.price = price;
    }
    Car.prototype.tax = function () {
        return this.price / 10;
    };
    return Car;
}());
var car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());
var Word = /** @class */ (function () {
    function Word() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var _this = this;
        this.num = [];
        this.str = [];
        params.forEach(function (a) {
            if (typeof a === 'number') {
                _this.num.push(a);
            }
            else if (typeof a === 'string') {
                _this.str.push(a);
            }
        });
    }
    return Word;
}());
var word = new Word('kim', 3, 5, 'park');
console.log(word.num);
console.log(word.str);
;
;
var student = { name: 'kim' };
var teacher = { name: 'kim', age: 20 };
;
var product = {
    brand: 'Samsung',
    serialNumber: 1360,
    model: ['TV', 'phone']
};
;
var cart = [
    { product: '청소기', price: 7000 },
    { product: '삼다수', price: 800 }
];
function max() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var max = -1;
    args.forEach(function (a) {
        if (max < a) {
            max = a;
        }
    });
    return max;
}
console.log(max(6, 3, 7, 2));
var tobj1 = { user: 'kim', comment: [3, 5, 4], admin: false };
function tf13(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user);
    console.log(comment);
    console.log(admin);
}
tf13(tobj1);
var tarr1 = [40, 'wine', false];
function tf14(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a);
    console.log(b);
    console.log(c);
}
tf14(tarr1);
/**
 * 추가적인 Narrowing 방법
 * 1. & 연산자로 null, undefined 타입 체크
 * 2. in 키워드로 object narrowing
 * 3. instance of 연산자 사용
 * 4. 비슷한 object 타입 검사할 경우, literal type 만들기
 */
function tf15(a) {
    if (a && typeof a === 'string') {
    }
}
function tf16(animal) {
    // typeof, instanceof 는 기본적인 객체, 자료형에만 사용 가능
    // ex) number, string, object 등
    if ('swim' in animal) {
    }
}
function tf17(x) {
    if (x.wheel === '4개') {
        console.log('x is Vehicle');
    }
}
/**
 * never type 특징
 * 1. return 값이 없어야 함
 * 2. 함수 실행이 끝나지 않아야함 (endpoint가 없어야 함)
 *
 *
 * never type 등장하는 경우
 * 1. Narrowing 이 이상한 경우
 * ex)
 * function tf18(parameter :string) {
 *  if(typeof parameter == 'string') {
 *      console.log(parameter);
 *  } else {
 *      console.log(parameter); => never type 발생
 *  }
 * }
 *
 *
 * 2. 어떤 함수 표현식은 return 타입이 자동으로 never 인 경우
 * ex)
 * let tf18 = function() {
 *  throw new Error();
 * }
 *
 *
 * ** never type 을 굳이 쓸 일은 없기에, 만약 never type 이 발생할 경우 왜 발생했는지 원인 파악만 가능하면 OK.
 */
function tf18() {
    // 강제로 오류 발생하게 해서 함수 실행 종료시키기
    // throw new Error();
    while (true) {
    }
}
var User2 = /** @class */ (function () {
    // 생성자에 public 사용하면, class 내에 변수 생성 및 this 사용할 일 없이 자동으로 변수 생성 및 값 할당 가능
    function User2(name, job) {
        this.job = job;
        // 상속받은 자식 class 에서 사용 X
        this.x = 10;
        // 상속받은 자식 class 에서 사용 O
        this.y = 20;
        this.name = name;
    }
    User2.prototype.setAge = function (age) {
        this.age = age;
    };
    User2.addOne = function (num) {
        User2.test1 += num;
    };
    User2.printX = function () {
        console.log(User2.test1);
    };
    // static 은 private, public, protected 같이 설정 가능
    // 상속받은 자식 class 에서 사용 X
    User2.z = 30;
    User2.test1 = 10;
    User2.test2 = 20;
    return User2;
}());
var User3 = /** @class */ (function (_super) {
    __extends(User3, _super);
    function User3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User3.prototype.getY = function () {
        console.log(this.y);
    };
    return User3;
}(User2));
var user2 = new User2('kim', 'doctor');
console.log(user2.name);
var user3 = new User3('park', 'farmer');
user3.getY();
User2.addOne(3);
User2.addOne(4);
User2.printX();
var Square = /** @class */ (function () {
    function Square(style) {
        this.style = style;
    }
    Square.prototype.draw = function () {
        var r = Math.random();
        var square = "<div style=\"position: relative;\n        top: ".concat(r * 400, "px;\n        left: ").concat(r * 400, "px;\n        width: ").concat(this.style.width, "px;\n        height: ").concat(this.style.height, "px;\n        background: ").concat(this.style.color, ";\">\n        </div>");
        document.body.insertAdjacentHTML('beforeend', square);
    };
    return Square;
}());
var squareStyle = { width: 30, height: 30, color: 'red' };
var square = new Square(squareStyle);
square.draw();
square.draw();
square.draw();
square.draw();
square.draw();
square.draw();
square.draw();
square.draw();
/**
 *
 * unkown 타입 처리하는 방법
 * 1. Narrowing, as 사용
 * 2. Generic 사용
 *
 *
 * Generic 함수 장점
 * 1. 확장성
 * 2. 매번 다른 타입 출력 가능
 */
function tf19(x) {
    return x[0];
}
;
// Generic 타입파라미터 제한두기
// 커스텀 타입으로도 타입파라미터 제한 가능
function tf20(x) {
    // return x - 1;
    return x.length;
}
var generic = tf19([4, 2]);
var generic2 = tf19(['4', '2']);
var generic3 = tf20('100');
function tf21(str) {
    console.log(str.length);
}
tf21('hello');
tf21(['kim', 'park']);
var tdata1 = '{ "name": "dog", "age" : 1 }';
function tf22(data) {
    return JSON.parse(data);
}
var tresult1 = tf22(tdata1);
console.log(tresult1);
// class Person3<MyType extends (string | number | string[])> {
var Person3 = /** @class */ (function () {
    function Person3(a) {
        this.name = a;
    }
    return Person3;
}());
var tdata2 = new Person3('어쩌구');
/**
 *
 * tuple type
 * array 자료의 타입 순서 (위치) 지정
 * option 지정은 가장 뒤 값에서부터 설정해야 함
 * ex) let tuple :[string, boolean?, number] => error
 */
var tuple = ['dog', true, 123];
// rest parameter 타입 지정 시, tuple 가능
function tf23() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    console.log(x);
}
function tf24(a, b) {
    console.log([a, b]);
}
tf23(111, '222');
tf24(111, '222');
var arr1 = [1, 2, 3];
// spread 연산자 타입 지정
var arr2 = __spreadArray([4, 5], arr1, true); // 4,5,1,2,3
var tuple2 = ['coffee', 5400, true];
var arr3 = ['동서녹차', 4000, true, false, true, true, false, true];
function tf25() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
tf25('a', true, 6, 3, '1', 4);
function tf26() {
    // let strArr = new Array();
    // let numArr = new Array();
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    // x.forEach((a, i) => {
    //     if(typeof a === 'string') {
    //         strArr.push(a);
    //     } else {
    //         numArr.push(a);
    //     }
    // });
    // return [ strArr, numArr ];
    var result = [[], []];
    x.forEach(function (a, i) {
        if (typeof a === 'string') {
            result[0].push(a);
        }
        else {
            result[1].push(a);
        }
    });
    return result;
}
console.log(tf26('b', 5, 6, 8, 'a'));
console.log(data_a + 1);
;
var user4 = {
    name: 'kim',
    age: '20',
    location: 'seoul'
};
var user5 = {
    name: 'kim',
    age: 20,
    location: 'seoul',
    0: 'park',
    1: '30',
    2: 'incheon'
};
var css = {
    'font-size': {
        'font-size': {
            'font-size': 14
        }
    }
};
;
var tobj2 = {
    model: 'k5',
    brand: 'kia',
    price: 6000,
    year: 2030,
    date: '6월',
    percent: '5%',
    dealer: '김차장',
};
var tobj3 = {
    'font-size': 10,
    'secondary': {
        'font-size': 12,
        'third': {
            'font-size': 14
        }
    }
};
;
var person5 = 'name';
var age3;
var age4;
var fi1;
var fi2;
ext000000000000000000000000000000000000000000000000;
Car;
ends(function () { return infer; }, R)[] ? R : unknown;
