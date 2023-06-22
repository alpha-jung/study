let a = 10;
let b = 20;
let c = 30;

// 지정한 변수 내보냄
// export default 는 파일당 1회만 사용 가능
// 여러 변수를 내보내려면 export 만 써야함
// export let a = 10; => 이렇게 변수에 바로 export 적용도 가능

export {a, b};
export default c;