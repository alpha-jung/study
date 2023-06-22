let data2_a = 10;

// 로컬 모듈을 글로벌 변수로 만들고 싶을 경우, declare global {} 사용
declare global {
    type Dog = string;
}

// export 사용하면  안에 변수들이 로컬 모듈로  설정
export {}