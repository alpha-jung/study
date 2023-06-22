/**
 * 
 * d.ts 파일
 * 타입정의 보관용 파일
 * 다른 ts 파일에서 import 가능
 * 모든 타입을 정리해놓은 레퍼런스용으로도 사용
 *  > tsconfig.json 파일에 "declaration": true 설정
 * 
 * d.ts 파일은 자동으로 글로벌 모듈이 되지 않음
 */

type Age2 = number;
interface Person { name :string }
