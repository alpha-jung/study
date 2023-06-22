import { connectDB } from "@/util/database";

// 페이지 방문 시, 60초 동안 페이지 캐싱
export const revalidate = 60;

export default async function Home() {

  const client = await connectDB;
  const db = client.db("forum");
  // let result = await db.collection('post').find().toArray();


  // cache 사용 방법
  // cache 에 저장된 데이터를 가져올 때 사용
  // cache 를 안넣어도 default 로 가져올 수도 있음
  // cache : 'no-store' 사용하면 매번 서버로 요청해서 데이터 가져옴
  // next : revalidate : 60 사용하면 60초마다 캐싱된 데이터 가져옴
  // await fetch('', { cache : 'force-cache' });


  /**
   * DB 출력 결과 캐싱 방법
   * 1. DB 출력하는 코드를 API 로 작성 후, fetch() 로 데이터 요청
   * 2. revalidate 예약변수 사용하면 페이지 단위로 캐싱 가능
   * 
   */
  return (
    <div>Hello</div>
  )
}
