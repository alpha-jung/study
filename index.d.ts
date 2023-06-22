declare let test: string[];
declare let test2: {
    name?: string;
};
declare let test3: string | number;
declare let members: (number | string)[];
declare let obj: {
    a: string | number;
};
type MyType = string | number;
declare let test4: MyType;
declare function f1(x: number): number;
type Member = [number, boolean];
declare let john: Member;
type Member2 = {
    [key: string]: string;
};
declare let smith: Member2;
declare class User {
    name: string;
    constructor(name: string);
}
declare let test5: string;
declare let info: {
    singer: string;
    song: string;
};
declare let project: {
    member: string[];
    days: number;
    started: boolean;
};
declare let anyTest: any;
declare let unknownTest: unknown;
declare let unknownTest2: string;
declare function f2(x?: number | string): void;
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
declare function ntf(x: number | string): string | number;
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
type Animal2 = {
    name: string;
    age: number;
};
declare let animal: Animal;
declare let animal2: Animal2;
type Girlfriend = {
    readonly name: string;
    age?: number;
};
declare const girlfriend: Girlfriend;
declare const girlfriend2: {
    name: string;
};
type Name = string;
type Age = number;
type PositionX = {
    x: number;
};
type PositionY = {
    y: number;
};
type Position = PositionX & PositionY;
declare let position: Position;
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
declare let str: '대머리' | '솔로';
declare function tf6(a: 'hello'): 1 | 0;
type Rsp = '가위' | '바위' | '보';
declare function tf7(rsp: Rsp): Rsp[];
declare let data: {
    readonly name: "kim";
};
declare function tf8(a: 'kim'): void;
type FunctionType = (a: number) => number;
declare let tf9: FunctionType;
declare let memberInfo: {
    name: string;
    plusOne: FunctionType;
    changeName: () => void;
};
type CutZero = (str: string) => string;
type RemoveDash = (str: string) => number;
declare let tf10: CutZero;
declare let tf11: RemoveDash;
type CRF = (str: string, c: CutZero, r: RemoveDash) => number;
declare let tf12: CRF;
declare let title: Element | null;
declare let link: Element | null;
declare let button: Element | null;
declare let img: Element | null;
declare let naver: NodeListOf<Element>;
declare class Person {
    name: string;
    constructor(name: string);
    getName(): string;
    printName(): void;
}
declare let person1: Person;
declare let person2: Person;
declare class Car {
    model: string;
    price: number;
    constructor(model: string, price: number);
    tax(): number;
}
declare let car1: Car;
declare class Word {
    num: number[];
    str: string[];
    constructor(...params: (string | number)[]);
}
declare let word: Word;
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
interface Student {
    name: string;
}
interface Teacher extends Student {
    age: number;
}
declare let student: Student;
declare let teacher: Teacher;
interface Product {
    brand: string;
    serialNumber: number;
    model: string[];
}
declare let product: Product;
interface Cart {
    product: string;
    price: number;
}
declare let cart: Cart[];
declare function max(...args: number[]): number;
declare let tobj1: {
    user: string;
    comment: number[];
    admin: boolean;
};
declare function tf13({ user, comment, admin }: {
    user: string;
    comment: number[];
    admin: boolean;
}): void;
declare let tarr1: (string | number | boolean)[];
declare function tf14([a, b, c]: (number | string | boolean)[]): void;
/**
 * 추가적인 Narrowing 방법
 * 1. & 연산자로 null, undefined 타입 체크
 * 2. in 키워드로 object narrowing
 * 3. instance of 연산자 사용
 * 4. 비슷한 object 타입 검사할 경우, literal type 만들기
 */
declare function tf15(a: string | undefined): void;
type Fish = {
    swim: string;
};
type Bird = {
    fly: string;
};
declare function tf16(animal: Fish | Bird): void;
type Vehicle = {
    wheel: '4개';
    color: string;
};
type Bike = {
    wheel: '2개';
    color: string;
};
declare function tf17(x: Vehicle | Bike): void;
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
declare function tf18(): never;
declare class User2 {
    job: string;
    name: string;
    private age;
    protected gender: string;
    private x;
    protected y: number;
    static z: number;
    private static test1;
    static test2: number;
    constructor(name: string, job: string);
    setAge(age: number): void;
    static addOne(num: number): void;
    static printX(): void;
}
declare class User3 extends User2 {
    getY(): void;
}
declare let user2: User2;
declare let user3: User3;
type SquareStyle = {
    width: number;
    height: number;
    color: string;
};
declare class Square {
    style: SquareStyle;
    constructor(style: SquareStyle);
    draw(): void;
}
declare let squareStyle: {
    width: number;
    height: number;
    color: string;
};
declare let square: Square;
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
declare function tf19<MyType>(x: MyType[]): MyType;
interface LengthCheck {
    length: number;
}
declare function tf20<MyType extends LengthCheck>(x: MyType): number;
declare let generic: number;
declare let generic2: string;
declare let generic3: number;
declare function tf21<MyType extends (string | string[])>(str: MyType): void;
declare let tdata1: string;
declare function tf22<MyType extends Animal2>(data: string): MyType;
declare let tresult1: Animal2;
declare class Person3<T> {
    name: T;
    constructor(a: T);
}
declare let tdata2: Person3<string>;
/**
 *
 * tuple type
 * array 자료의 타입 순서 (위치) 지정
 * option 지정은 가장 뒤 값에서부터 설정해야 함
 * ex) let tuple :[string, boolean?, number] => error
 */
declare let tuple: [string, boolean?, number?];
declare function tf23(...x: [number, string]): void;
declare function tf24(a: number, b: string): void;
declare let arr1: number[];
declare let arr2: [number, number, ...number[]];
declare let tuple2: [string, number, boolean];
declare let arr3: [string, number, ...boolean[]];
declare function tf25(...x: [string, boolean, ...(number | string)[]]): void;
declare function tf26(...x: [...(number | string)[]]): [string[], number[]];
declare let data_a: number;
interface StringOnly {
    name: string;
    age: string;
    location: string;
}
/**
 *
 * index signature
 * Object 타입 지정 한번에 가능한 문법
 * 속성 이름이 숫자인 경우에도 사용 가능
 */
interface StringOnly2 {
    [key: string]: string | number;
}
declare let user4: StringOnly;
declare let user5: StringOnly2;
interface CssType {
    'font-size': CssType | number;
}
declare let css: CssType;
interface Test1 {
    [key: string]: string | number;
}
declare let tobj2: Test1;
interface Test2 {
    'font-size': number;
    [key: string]: number | Test2;
}
declare let tobj3: Test2;
interface Person4 {
    [key: string]: number;
}
type PersonKeys = keyof Person4;
declare let person5: PersonKeys;
type Car2 = {
    color: boolean;
    model: boolean;
    price: boolean | number;
};
type TypeChanger<MyType> = {
    [key in keyof MyType]: string;
};
type Car3 = TypeChanger<Car2>;
type Bus = {
    color: string;
    model: boolean;
    price: number;
};
type TypeChanger2<MyType> = {
    [key in keyof MyType]: string | number;
};
type Bus2 = TypeChanger2<Bus>;
type TypeChanger3<MyType, T> = {
    [key in keyof MyType]: T;
};
type Bus3 = TypeChanger3<Bus, boolean>;
/**
 *
 * 조건문으로 타입만들기
 * 1. type if 문은 삼항연산자 사용
 * 2. 조건식은 extends 사용
 */
type Age3<T> = T extends string ? T : unknown;
declare let age3: Age3<string>;
declare let age4: Age3<number>;
type FirstItem<T> = T extends any[] ? T[0] : any;
declare let fi1: FirstItem<string[]>;
declare let fi2: FirstItem<number>;
/**
 *
 * infer
 * 조건문에서 사용 가능
 * 타입을 왼쪽에서 추출해서 infer 오른쪽에 있는 변수에 담음
 *
 */
type Person5<T> = T extends infer R ? R : unknown;
type person6 = Person5<string>;
type TypeExtracter<T> = T extends (infer R)[] ? R : unknown;
type te = TypeExtracter<string[]>;
type TypeExtracter2<T> = T;
type te2 = TypeExtracter2<() => void>;
