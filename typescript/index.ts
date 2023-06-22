// import { a_name, a_age } from './a';

let test :string[] = ['kim', 'park'];

// Object 자료형에 ? 붙일 시, 해당 데이터가 없을수도 있으니 오류로 판단하지 말라는 의미
let test2 : { name? : string } = { name : 'kim' };

// Union Type : | 사용하면 설정한 자료형 중 하나로 들어온다는 의미
let test3 : string | number = 123;

let members :(number | string)[] = [1, '2', 3];
let obj : { a: string | number } = { a : 123 };

type MyType = string | number;

let test4 : MyType = 123;


// 파라미터와 함수 리턴 타입도 설정 가능
function f1(x :number) :number {
    return x * 2;
}

f1(123);

// 튜플 타입
type Member = [number, boolean];
let john:Member = [123, true];

type Member2 = {
    // Object 내에 다수의 데이터 설정이 필요할 시, 아래와 같이 사용
    // 글자로 된모든 Object 속성의 타입은 :string
    [key :string] : string
}

let smith : Member2 = { name : 'smith' };

class User {
    name :string;

    constructor(name :string) {
        this.name = name;
    }
}

// typescript 에선 기본으로 자동으로 타입지정 해줌
let test5 = 'test5';

let info : { singer :string, song :string } = {
    singer : 'Park Hyo Shin',
    song : 'Laughing Man'
};

let project : { member :string[], days :number, started :boolean} = {
    member : ['kim', 'park'],
    days : 30,
    started : true,
}

// any 타입 : 일반 JS 변수로 만드는 방법
// 타입 관련 버그가 나도 잡아주지 않음
let anyTest :any;
anyTest = 123;
anyTest = [];

// unknown 타입 : 모든 자료형 허용
let unknownTest :unknown;
unknownTest = 123;
unknownTest = {};

// any 타입은 아래 상황에도 오류 발생 X
// unknown 타입은 아래 상황에서 오류 발생 O
let unknownTest2 :string = anyTest;

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
function f2(x? :number | string) :void {
    
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
function ntf(x :number|string) {
    let array :number[] = [];
    
    // if(typeof x === 'number') {
    //     array[0] = x;
    // }

    array[0] = x as number;

    let name :string = 'kim';
    // name as number; => 에러

    if(typeof x === 'string') {
        return x + '1';
    } else {
        return x + 1;
    }
}

ntf(123);
ntf('123'); // assertion 은 버그를 확실하게 잡지 못함


// function tf4(arr :(number|string)[]) : number[] {
//     let tmp :number[] = [];

//     arr.forEach((a, i) => {
//         tmp[i] = parseInt(arr[i] as string);
//     });

//     return tmp;
// }

// console.log(tf4(['1', 2, '3']));


// function tf5(obj : { subject :(string|string[])}) :string {
//     if(Array.isArray(obj.subject)) {
//         return obj.subject[obj.subject.length - 1];
//     } else {
//         return obj.subject;
//     }
// }

// console.log(tf5({ subject : 'math' }));
// console.log(tf5({ subject : ['science', 'art', 'korean'] }));
// tf5({ hello : 'hi' });


/**
 * 
 * Type Alias ( 타입 별칭 (변수) )
 * 
 * Union Type 으로 합치기 기능
 * & 연산자로 Object 타입 합치기 가능
 * 같은 이름의 Type Alias 재정의 불가능
 * 
 */
type Animal = string | number | undefined;
type Animal2 = { name :string, age :number };

let animal :Animal = 123;
let animal2 :Animal2 = { name : 'kim', age : 20 };

type Girlfriend = {
    readonly name :string,
    age? :number
};

const girlfriend :Girlfriend = {
    name : 'ember'
};

// girlfriend.name = 'yura'; => 에러 발생
// 타입스크립트 에러는 에디터 & 터미널에서만 존재

const girlfriend2 = {
    name : 'kelly'
};

// girlfriend2.name = 'yura'; => 변경 가능

type Name = string;
type Age = number;
// type Person = Name | Age;
type PositionX = { x :number };
type PositionY = { y :number };
type Position = PositionX & PositionY;

let position :Position = {
    x : 10,
    y : 20
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

let str :'대머리' | '솔로';

function tf6(a :'hello') : 1 | 0 {
    // return 4; => 에러
    return 1;
}

// tf6('hi'); => 에러
tf6('hello');

type Rsp = '가위' | '바위' | '보';

function tf7(rsp :Rsp) : Rsp[] {
    let arr : Rsp[] = ['바위', '보'];

    return arr;
}

tf7('가위');

let data = {
    name : 'kim'
} as const; // object value 값을 그대로 타입으로 지정, object 속성들에 모두 readonly 붙여줌

function tf8(a : 'kim') {

}

// 해당 함수는 kim 이라는 데이터가 아닌 kim 이라는 타입이 들어가야 함
// data.name 의 타입은 string 이기에 에러 발생
// tf8(data.name); => 에러
tf8(data.name);


// 함수 Type 저장해서 쓰는 법
type FunctionType = (a :number) => number;

let tf9 :FunctionType = function(a) {
    return 1;
}

let memberInfo = {
    name : 'kim',
    plusOne : function(a :number) {
        return a + 1;
    } as FunctionType,
    changeName : () :void => {

    }

    // pluseOne : (x :number ) => number,
    // changeName : () => void
}

memberInfo.plusOne(2);

type CutZero = (str :string) => string;
type RemoveDash = (str :string) => number;


let tf10 :CutZero = function(str) {
    let idx = str.indexOf('0');

    if(idx == 0) {
        str = str.replace('0', '');
    }

    // let result = str.replace(/^0+/, '');

    return str;
}

let tf11 :RemoveDash = function(str) {
    return parseFloat(str.replace(/-/gi, ''));
}

console.log(tf10('0cutZero0'));
console.log(tf11('123-456-789'));

type CRF = (str :string, c :CutZero, r: RemoveDash) => number;

let tf12 :CRF = function(str, tf10, tf11) {
    let result1 = tf10(str);
    let result2 = tf11(result1);

    return result2;
}

console.log(tf12('0789-654-321-0', tf10, tf11));
console.log(tf12('010-1111-2222', tf10, tf11));


let title = document.querySelector('#title');

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

if(title instanceof Element) {
    title.innerHTML = 'hi';
}

// innerHTML 이 있으면 출력, 없으면 undefined 출력
// if(title?.innerHTML) {
//     title.innerHTML = 'hi';
// }

let link = document.querySelector('.link');

if(link instanceof HTMLAnchorElement) {
    link.href = 'https://www.youtube.com';
}

let button = document.querySelector('#button');
button?.addEventListener('click', function() {

});


let img = document.querySelector('#image');

if(img instanceof HTMLImageElement) {
    img.src = 'new.png';
}

let naver = document.querySelectorAll('.naver');

if(naver?.length > 0) {
    naver?.forEach((a, idx) => {
        if(a instanceof HTMLAnchorElement) {
            a.href = 'https://kakao.com';
        }
    });
}

class Person {
    name :string;

    constructor(name :string) {
        this.name = name;
    }

    getName() :string {
        return this.name;
    }

    printName() {
        console.log(this.name);
    }
}

let person1 = new Person('Kim');
let person2 = new Person('Park');
console.log(person1);
person1.printName();


class Car {
    model :string;
    price :number;

    constructor(model :string, price :number) {
        this.model = model;
        this.price = price;
    }

    tax() :number {
        return this.price / 10;
    }
}

let car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());


class Word {
    num :number[] = [];
    str :string[] = [];

    constructor(...params: (string|number)[]) {
        params.forEach((a) => {
            if(typeof a === 'number') {
                this.num.push(a);
            } else if(typeof a === 'string') {
                this.str.push(a);
            }
        });
    }
}

let word = new Word('kim', 3, 5, 'park');
console.log(word.num);
console.log(word.str);


/**
 * interface 장점
 * - extends 로 복사 가능
 * 
 * type 의 경우, & 기호 ( intersection type ) 로 extends 와 유사한 기능 가능
 * & 사용할 때 중복 속성이 있어도 합칠 때는 오류가 안나기에 주의
 * 
 * ex) 
 *  type Student { name :string }
 *  type Teacher { age :number } & Student;
 * 
 * 
 * type 과 interface 의 차이점
 * - interface 는 중복선언 가능
 * - type 은 중복선언 불가능
 * 
 */
interface Student { name :string };
interface Teacher extends Student {
    age :number
};

let student :Student = { name : 'kim' };
let teacher :Teacher = { name : 'kim', age : 20 };


interface Product {
    brand :string,
    serialNumber :number,
    model :string[]
};

let product :Product = {
    brand : 'Samsung',
    serialNumber : 1360,
    model : ['TV', 'phone']
};

interface Cart {
    product :string,
    price :number
};


let cart :Cart[] = [
    { product : '청소기', price : 7000 },
    { product : '삼다수', price : 800 }
];


function max(...args :number[]) {
    let max = -1;

    args.forEach((a) => {
        if(max < a) {
            max = a;
        }
    });
    
    return max;
}

console.log(max(6, 3, 7, 2));

let tobj1 = { user : 'kim', comment : [3,5,4], admin : false };

function tf13({user, comment, admin} : {user :string, comment :number[], admin :boolean}) {
    console.log(user);
    console.log(comment);
    console.log(admin);
}

tf13(tobj1);

let tarr1 = [40, 'wine', false];

function tf14([a, b, c] : (number | string | boolean)[]) {
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
function tf15(a :string | undefined) {
    if( a && typeof a === 'string' ) {

    }
}

type Fish = { swim :string };
type Bird = { fly :string };

function tf16(animal : Fish | Bird) {
    // typeof, instanceof 는 기본적인 객체, 자료형에만 사용 가능
    // ex) number, string, object 등
    if('swim' in animal) {

    }

}

type Vehicle = {
    wheel : '4개',
    color :string
};

type Bike = {
    wheel : '2개',
    color :string
};

function tf17(x : Vehicle | Bike) {
    if(x.wheel === '4개') {
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
function tf18() :never {
    // 강제로 오류 발생하게 해서 함수 실행 종료시키기
    // throw new Error();

    while(true) {

    }
}


class User2 {
    public name :string;
    private age :number;
    protected gender :string;

    // 상속받은 자식 class 에서 사용 X
    private x = 10;

    // 상속받은 자식 class 에서 사용 O
    protected y = 20;

    // static 은 private, public, protected 같이 설정 가능
    // 상속받은 자식 class 에서 사용 X
    static z = 30;

    private static test1 = 10;
    public static test2 = 20;

    // 생성자에 public 사용하면, class 내에 변수 생성 및 this 사용할 일 없이 자동으로 변수 생성 및 값 할당 가능
    constructor(name :string, public job :string) {
        this.name = name;
    }

    setAge(age :number) {
        this.age = age;
    }

    static addOne(num :number) {
        User2.test1 += num;
    }

    static printX() {
        console.log(User2.test1);
    }
}

class User3 extends User2 {
    getY() {
        console.log(this.y);

    }
}


let user2 = new User2('kim', 'doctor');
console.log(user2.name);

let user3 = new User3('park', 'farmer');
user3.getY();

User2.addOne(3);
User2.addOne(4);
User2.printX();

type SquareStyle = {
    width :number,
    height :number,
    color :string
};

class Square {
    constructor(public style :SquareStyle) {

    }

    draw() {
        let r = Math.random();
        let square = `<div style="position: relative;
        top: ${r * 400}px;
        left: ${r * 400}px;
        width: ${this.style.width}px;
        height: ${this.style.height}px;
        background: ${this.style.color};">
        </div>`;

        document.body.insertAdjacentHTML('beforeend', square);
        
    }
}


let squareStyle = {width: 30, height: 30, color: 'red'};
let square = new Square(squareStyle);
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
function tf19<MyType>(x: MyType[]) :MyType {
    return x[0];
}

interface LengthCheck {
    length :number
};

// Generic 타입파라미터 제한두기
// 커스텀 타입으로도 타입파라미터 제한 가능
function tf20<MyType extends LengthCheck>(x : MyType) {
    // return x - 1;
    return x.length;
}

let generic = tf19<number>([4,2]);
let generic2 = tf19<string>(['4', '2']);
let generic3 = tf20<string>('100');

function tf21<MyType extends (string | string[])>(str :MyType) {
    console.log(str.length);
}

tf21<string>('hello');
tf21<string[]>(['kim', 'park']);

let tdata1 = '{ "name": "dog", "age" : 1 }';

function tf22<MyType extends Animal2>(data :string) :MyType {
    return JSON.parse(data);
}

let tresult1 :Animal2 = tf22<Animal2>(tdata1);
console.log(tresult1);


// class Person3<MyType extends (string | number | string[])> {
class Person3<T> {
    name;
    
    constructor(a: T) {
        this.name = a;
    }
}

let tdata2 = new Person3('어쩌구');


/**
 * 
 * tuple type
 * array 자료의 타입 순서 (위치) 지정
 * option 지정은 가장 뒤 값에서부터 설정해야 함
 * ex) let tuple :[string, boolean?, number] => error
 */
let tuple :[string, boolean?, number?] = ['dog', true, 123];


// rest parameter 타입 지정 시, tuple 가능
function tf23(...x:[number, string]) {
    console.log(x);
}

function tf24(a :number, b:string) {
    console.log([a,b]);
}

tf23(111,'222');
tf24(111, '222');

let arr1 = [1,2,3];

// spread 연산자 타입 지정
let arr2 :[number, number, ...number[]] = [4,5, ...arr1]; // 4,5,1,2,3


let tuple2 :[string, number, boolean] = ['coffee', 5400, true];
let arr3 :[string, number, ...boolean[]] = ['동서녹차', 4000, true, false, true, true, false, true];


function tf25(...x:[string, boolean, ...(number|string)[]]) {

}

tf25('a', true, 6, 3, '1', 4);


function tf26(...x:[...(number|string)[]]) {
    // let strArr = new Array();
    // let numArr = new Array();

    // x.forEach((a, i) => {
    //     if(typeof a === 'string') {
    //         strArr.push(a);
    //     } else {
    //         numArr.push(a);
    //     }
    // });

    // return [ strArr, numArr ];

    let result :[string[], number[]] = [[], []];

    x.forEach((a, i) => {
        if(typeof a === 'string') {
            result[0].push(a);
        } else {
            result[1].push(a);
        }
    });

    return result;
}

console.log(tf26('b', 5, 6, 8, 'a'));


declare let data_a :number;

console.log(data_a + 1);

// typescript 는 ts 파일의 모든 변수들이 전역 변수
// 로컬 모듈로 설정하면 다른 ts 파일에서 동일한 변수명으로 생성 가능


interface StringOnly {
    name: string,
    age: string,
    location: string
};

/**
 * 
 * index signature
 * Object 타입 지정 한번에 가능한 문법
 * 속성 이름이 숫자인 경우에도 사용 가능
 */
interface StringOnly2 {
    [key: string] : string | number
}

let user4 :StringOnly = {
    name: 'kim',
    age: '20',
    location: 'seoul'
};

let user5 :StringOnly2 = {
    name: 'kim',
    age: 20,
    location: 'seoul',
    0 : 'park',
    1 : '30',
    2 : 'incheon'
};

interface CssType {
    // 'font-size': {
    //     'font-size': {
    //         'font-size': number;
    //     }
    // }

    // Recursive 하게 타입 만드는 법
    'font-size': CssType | number
}

let css :CssType = {
    'font-size' : {
        'font-size' : {
            'font-size' : 14
        }
    }
};


interface Test1 {
    [key: string] : string | number
};

let tobj2: Test1 = {
    model: 'k5',
    brand: 'kia',
    price: 6000,
    year: 2030,
    date: '6월',
    percent: '5%',
    dealer: '김차장',
};

interface Test2 {
    // 'font-size': Test2 | number,
    // 'secondary': {
    //     'font-size': Test2 | number,
    //     'third': {
    //         'font-size': Test2 | number
    //     }
    // }

    'font-size': number,
    [key: string]: number | Test2
}

let tobj3: Test2 = {
    'font-size': 10,
    'secondary': {
        'font-size': 12,
        'third': {
            'font-size': 14
        }
    }
};


// let obj1 = { name : 'kim' };
// Object.keys(obj);   // object 가 가지고 있는 key 값들을 array 에 담아 출력

interface Person4 {
    // age: number,
    // name: string

    // index signature 에다가 keyof 사용하면 string | number 
    [key :string] : number
};


// key값을 전부 가져오는 keyof
// keyof 를 object type 에 사용하면 object 타입이 가지고 있는 모든 key 값을 union type 으로 합쳐서 출력
type PersonKeys = keyof Person4;
let person5 :PersonKeys = 'name';

type Car2 = {
    color: boolean,
    model: boolean,
    price: boolean | number
};


// 타입변환기
type TypeChanger<MyType> = {
    [key in keyof MyType] :string
};

type Car3 = TypeChanger<Car2>;


type Bus = {
    color : string,
    model : boolean,
    price : number
};

type TypeChanger2<MyType> = {
    [key in keyof MyType] : string | number
};

type Bus2 = TypeChanger2<Bus>;

type TypeChanger3<MyType, T> = {
    [key in keyof MyType] : T
};

type Bus3 = TypeChanger3<Bus, boolean>;


/**
 * 
 * 조건문으로 타입만들기
 * 1. type if 문은 삼항연산자 사용
 * 2. 조건식은 extends 사용
 */
type Age3<T> = T extends string ? T : unknown;
let age3 :Age3<string>;
let age4 :Age3<number>;

type FirstItem<T> = T extends any[] ? T[0]: any;
let fi1 :FirstItem<string[]>;
let fi2 :FirstItem<number>;


/**
 * 
 * infer
 * 조건문에서 사용 가능
 * 타입을 왼쪽에서 추출해서 infer 오른쪽에 있는 변수에 담음
 * 
 */
type Person5<T> = T extends infer R ? R : unknown;
type person6 = Person5<string>;

// array 내부의 타입 추출
type TypeExtracter<T> = T extends (infer R)[] ? R : unknown;
type te = TypeExtracter<string[]>;


// 함수를 넣으면 함수의 return 타입 추출
// ReturnType<> 이라는 함수와 동일
// ex) ReturnType<() => void>
type TypeExtracter2<T> = T ext000000000000000000000000000000000000000000000000...Car...............................................................................................................................................ends ( () => infer R)[] ? R : unknown;
type te2 = TypeExtracter2<() => void>;
