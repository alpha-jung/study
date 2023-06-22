import logo from './logo.svg';
import './App.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { lazy, Suspense, createContext, useState, useTransition, useDeferredValue } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import bg from './img/bg.png';
import data from './data.js';
// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
import { useQuery } from 'react-query';


const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

/*
  Context API

  ** 특징
  1. state 변경 시, 쓸데없는 것까지 재렌더링
  2. 컴포넌트 재사용이 어려움
  => 이런 이유로 잘 사용하지 않음
*/
// export let Context1 = createContext()


// 성능 저하 테스트용 변수
// let a = new Array(10000).fill(0);

function App() {
  let [shoes, setShoes] = useState(data);
  let [items] = useState([10, 11, 12])
  let navigate = useNavigate();
  let [idx, setIdx] = useState(2);

  /*
    navigate(1) : 앞 페이지 이동
    navigate(-1) : 전 페이지 이동

    ** SPA (Single Page Application) 단점
    컴포넌트간 state 공유 어려움
      > Context API 또는 redux 라는 외부 라이브러리 사용하면 해결


    ** redux 사용법
    1. store.js 파일 생성 => state 를 보관하는 js
    2. index.js 에 <Provider store={store}> 작성
    => App.js 와 그 하위의 js 들은 모두 store 에 있는 state 사용 가능

    ** 공유가 필요없는 state 는 store 에 저장할 필요 없음


    ** React Query
    - 실시간 데이터를 계속 가져와야하는 사이트들에 사용하기 좋음, 그 외에는 별로 유용하진 않음
    ex) SNS, 코인거래소

    - index.js 에 관련 설정 후 사용 가능

    - 장점
    1. 성공/실패/로딩중 쉽게 파악 가능
       > result.data / result.isLoading / result.error
    
    2. 실시간으로 자동으로 재요청 (refetch) 해줌 

    3. 실패 시 retry 자동으로 해

    4. state 공유 안해도 됨

    5. ajax 결과 캐싱 가능


    ** Single Page Application 특징
    발행하면 js 파일 하나에 모든 코드 넣어짐
    => js 파일 크기가 커서 초기 로딩 속도가 느림
    => lazy 사용하여 import 하는 js 파일을 별도로 분리

    ** lazy 단점
    lazy 설정한 컴포넌트 이동할 때 로딩시간 발생
       > <Suspense> 로 감싸면 로딩중 UI 넣기 가능


    ** batch 기능
    여러 state 가 변경될 때, 마지막 state 변경 시에 렌더링되게 해주는 기능
       > ajax, setTimeout 내부라면 batching 이 일어나지 않았으나, 최신  버전에선 어디있든 잘 일어남


    ** useTransition 기능
    느린 컴포넌트 성능 향상 가능
    startTransition 으로 성능 저하 일으키는 state 변경 감싸기
    isPending 은 startTransition이 처리중일 때 true 로 변함

    - startTransition 동작 원리
    감싼 state 의 실행 시점을 지연시킴

    - useDeferredValue 써도 느린 컴포넌트 성능 향상 가능


    ** PWA
    웹사이트를 모바일 앱처럼 설치해서 쓸 수 있게 해주는 기술
    PWA 가 생성된 프로젝트를 새로 생성해야 함

    - 장점
    1. 설치 마케팅 비용 적음
    2. 아날로그 유저들 배려
    3. html, css, js 만으로 앱까지
    4. 푸시알림, 센서 등
  */

  const getData = () => {
    if(idx > 3) {
      alert("상품이 더 이상 없습니다.");
    } else {
      // 로딩중 UI 띄우기
      axios.get('https://codingapple1.github.io/shop/data' + idx + '.json')
        .then((res) => {
          console.log(res);

          let shoesCopy = [...shoes, ...res.data];

          // let shoesCopy = [...shoes];
          // res.data.forEach((a) => {
          //   shoesCopy.push(a);
          // })


          setShoes(shoesCopy);

          // 로딩중 UI 숨기기
        })
        .catch(() => {
          // 로딩중 UI 숨기기
        })


      // 동시에 ajax 요청 여러개 할 때
      // Promise.all([ axiose.get(''), axios.get('') ])
      // .then(() => {}) => 두 요청이 모두 성공했을 시
    }
  }


  let result = useQuery('getUser', () => 
    axios.get('https://codingapple1.github.io/userdata.json')
      .then((a) => {
        return a.data
    }),
    // refetch 하는 시간 설정
    // refetch 비활성화도 가능
    { staleTime : 2000 }
  )


  // let [name, setName] = useState('')
  // let [isPending, startTransition] = useTransition()
  // let state = useDeferredValue(name)

  // console.log(result);
  // console.log(result.data);
  // console.log(result.isLoading);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className=""ms-auto>
            {/* 로딩중일 때 특정 화면 보여주고 싶을 때 */}
            { result.isLoading ? '로딩 중' : result.data.name }
          </Nav>
        </Container>
      </Navbar>

      {
      /*  
        css 파일에서 이미지 불러올 때에는 ./~

        js 에서 이미지 불러올 때는 impor 변수명 from './~';
        <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}>
        
        </div>


        public 폴더에 있는 이미지 사용할 땐 /~
        public 폴더 이미지 쓰는 권장 방식 : <img src={process.env.PUBLIC-URL + '/~'} />


        ** React에서 페이지 나누는 법
        1. 컴포넌트 만들어서 상세페이지 내용 채움
        2. 특정 경로 접속하면 해당 컴포넌트 보여줌
      */
      }

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      {/* Routes Suspense 로 감싸기 */}
      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function (a, i) {
                    return (
                      <Card shoes={shoes} index={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => { getData(); setIdx(idx + 1); }}>버튼</button>
          </>
        } />
        <Route path="/detail/:id" element={
          // <Context1.Provider value={{ items }}>
          //   <Detail shoes={shoes}></Detail>
          // </Context1.Provider>

          // 특정 Route Suspense 로 감싸기
          // <Suspense fallback={<div>로딩중</div>}>
            <Detail shoes={shoes}></Detail>
          // </Suspense>
        }/>
        <Route path="/cart" element={ <Cart></Cart> }></Route>
        <Route path="/about" element={<About></About>}>
          {/* 
            Nested Routes 
            여러 유사한 페이지 필요할 때 사용

            ** 장점
            1. 뒤로 가기 버튼 이용 가능
            2. 페이지 이동이 쉬움( UI 스위치 조작 쉬움 )
          */}
          {/* <Route path="/about/member" element={<About></About>} />
          <Route path="/about/location" element={<About></About>} /> */}
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>위치</div>} />
        </Route>

        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<div><h2>첫 주문시 양배추즙 서비스</h2></div>} />
          <Route path="two" element={<div><h2>생일기념 쿠폰받기</h2></div>} />
        </Route>

        {/* Route path 에 설정된 경로 외의 경로로 접속할 시, 아래로 모두 접속 */}
        <Route path="*" element={<div>404 Not Found</div>} /> 
      </Routes>
      </Suspense>

      {/* <div className="main-bg"></div>

      <div className="container">
        <div className="row">
          {
            shoes.map(function(a, i) {
              return (
                <Card shoes={shoes} index={i}></Card>
              )
            })
          }
        </div>
      </div> */}


      {/* 성능 저하 테스트용 코드 */}
      {/* <input onChange={(e) => {
        startTransition(() => {
          setName(e.target.value)
        })

      }} />
      {
        isPending ? '로딩중' :
        a.map(() => {
          return <div>{name}</div>
          // useDeferredValue 사용 시
          // return <div>{state}</div>
        })
      } */}
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4" key={props.index}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg'} width="80%" />
      <h4>{props.shoes[props.index].title}</h4>
      <p>{props.shoes[props.index].content}</p>
    </div>
  )
}


function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      {/* Nested Routes 에 있는 요소를 보여주는 위치 지정 */}
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
