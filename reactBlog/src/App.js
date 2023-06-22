/* esLint-disable */

import './App.css';
import { useState } from 'react';
import React from 'react';

function App() {

  /* 
    ** Destructuring 문법
    ex) let [a, b] = [1, 2];
    => a = 1, b = 2 와 같은 의미
    react 에선 첫 번째 변수엔 값, 두 번째 변수엔 값 변경용함수가 들어감

    ** state 쓰는 이유
    변수와 다르게 state 는 값이 변경되면 자동으로 html 재렌더링 됨

    ** state 사용처
    변동 시 자동으로 html 에 반영되야 하는 부분에 사용 ( 값이 자주 변경되는 부분 )
    stae 는 사용하는 컴포넌트들 중 최상위 컴포넌트에 생성

    ** state 변경 함수 특징
    기존 state === 신규 state 의 경우, 변경 X

    ** Component 만드는 방법
    1. 다른 function 바깥에 function 생성
    2. return() 안에 html 담기
    3. <함수명></함수명> 쓰기

    ** Component 만들면 좋은 경우
    1. 반복전인 html 축약할 때
    2. 큰 페이지들
    3. 자주 변경되는 것들 ( 항상 그렇진 않음 )

    ** Component 단점
    state 를 쓸 때 불편한 점들이 생김


    ** 병렬 태그를 사용해야 할 경우, Fragement 문법 사용
    ex)
    <>
      <div></div>
      <div></div>
    </>


    ** 동적인 UI 만드는 step
    1. html css 로 미리 디자인 완성
    2. UI의 현재 상태를 state로 저장
    3. state에 따라 UI가 어떻게 보일지 작성


    ** map()

    - 사용법
    Array.map(function() {})
    ex) [1,2,3].map(function(a) { console.log(a); });

    - 특징
    array 데이터 수만큼 함수안의 코드 실행
    함수의 파라미터는 array 안의 데이터
    return 값을 array 로 담아줌


    ** 부모 -> 자식 state 전송하는 법
    1. <자식컴포넌트 작명={state 이름}>
    2. props 파라미터 등록 후 props.작명 사용
    
    - props 전송은 부모 -> 자식만 가능
  */

  let [title, changeTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [likeCnt, changeLikeCnt] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [titleIndex, setTitleIndex] = useState(0);
  let [inputValue, setInputValue] = useState('');

  const likeCntClick = function(i) {
    console.log(i);

    let likeCntCopy = [...likeCnt];
    likeCntCopy[i]++;
    changeLikeCnt(likeCntCopy);
  };

  const buttonClick = () => {
    // Array / Object 데이터 원본은 보존하는게 좋음
    let titleCopy = [...title];
    titleCopy[0] = '여자 코트 추천';
    changeTitle(titleCopy);
  };

  const sortTitle = () => {
    let titleCopy = [...title];
    titleCopy.sort();
    changeTitle(titleCopy);
  };

  const modalState = () => {
    if(!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const addTitle = () => {
    let titleCopy = [...title];
    titleCopy.unshift(inputValue);
    changeTitle(titleCopy);
  }

  const deleteTitle = (i) => {
    let titleCopy = [...title];
    titleCopy.splice(i, 1);
    changeTitle(titleCopy);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'red', fontSize: '16px' }}>ReactBlog</h4>
      </div>
      {/* <div className="list">
        <h4>{title[0]} <span onClick={likeCntClick}>👍</span> {likeCnt} <button onClick={buttonClick}>제목 변경</button></h4>
        <p>5월 1일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>5월 1일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={modalState}>{title[2]}</h4>
        <p>5월 1일 발행</p>
      </div> */}

      {
        title.map(function(a, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {modalState(); setTitleIndex(i);}}>
                {title[i]} <span onClick={(e) => { e.stopPropagation(); likeCntClick(i)}}>👍</span> {likeCnt[i]} <button onClick={buttonClick}>제목 변경</button><button onClick={() => {deleteTitle(i);}}>글삭제</button></h4>
              <p>5월 1일 발행</p>
            </div>
          )
        })
      }

      <button onClick={sortTitle}>제목 가나다순 정렬</button>
      <br />
      <input onChange={(e) => { setInputValue(e.target.value); console.log(inputValue); }}></input>
      <button onClick={addTitle}>추가</button>

      {
        // null 은 비어있는 html 용으로 자주 사용
        modal == true ? <Modal title={title} titleIndex={titleIndex} color={'skyblue'} buttonClick={buttonClick} /> : null
      }

      {
        /* <Modal></Modal>
        <Modal2></Modal2> 
        <Modal3></Modal3> */
      }
    </div>
  );
}

let Modal2 = () => {
  return (
    <div className="modal">
        <h4>제목2</h4>
        <p>날짜2</p>
        <p>상세내용2</p>
    </div>
  );
}

class Modal3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name : 'Kim',
      age : 20
    }
  }

  render() {
    return (
        <div>
          {/* this.props.** */}
          {this.state.age}
          <button onClick={() => {this.setState({age : 21})}}>버튼</button>
        </div>
    )
  }
}

/*
  Component 를 만드는 다른 방법
  
  const Modal = () => {
    return (
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>        
      </div>
    );
  }


  class Modal extends React.Component {
    constructor() {
      super()
      this.state = {
        name : 'Kim',
        age : 20
      }
    }

    render() {
      return (
        <div>
          { this.props.** }
          {this.state.age}
          <button onClick={() => {this.setState({age : 21})}}>버튼</button>
        </div>
      )
    }
  }
*/

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title[props.titleIndex]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.buttonClick}>글수정</button>   
    </div>
  );
}

export default App;
