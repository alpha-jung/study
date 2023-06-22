import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { addItem } from './../store.js'
// import { Context1 } from './../App.js'


/*
    styled-components

    style 을 설정한 컴포넌트를 생성하게 해주는 라이브러리

    ** 장점
    1. CSS 파일이 없어도 됨
    2. 스타일이 다른 js 파일로 오염되지 않음
       > App.css 파일에 스타일 작성하면 모든 js 파일에 적용됨
       > 이를 방지하려면 컴포넌트.module.css 라고 파일명을 바꿔주면 됨
         (ex) App.module.css -> App.js 에만 적용

    3. 페이지 로딩시간 단축


    ** 단점
    1. JS파일 매우 복잡해짐
    2. 중복 스타일은 컴포넌트간 import 할텐데 CSS 와 다른 점이 없음
    3. 협업 시 CSS 담당자의 숙련도 이슈
*/
let Btn = styled.button`
    background : ${ props => props.bg };
    color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding : 10px;
`

let Box = styled.div`
    background : grey;
    padding : 20px;
`

// 기존 styled component복사 가능
// let NewBtn = styled.button(Btn)`
// `

/*
    Component 의 Lifecycle

    페이지에 장착 (mount)
    내용 업데이트 (update)
    제거 (unmount)

    Lifecycle 을 알면 간섭 ( 코드 작성 ) 이 가능

    ** 예전 방법
    class Detail2 extends React.Component {
        componentDidMount() {
            // component mount 시 코드 실행
        }

        componentDidUpdate() {
            // component update 시 코드 실행
        }

        componentWillUnmount() {
            // component unmount 시 코드 실행
        }
    }

    ** 최신 방법
    useEffect 사용

    useEffect(() => {
        // mount, update 시 코드 실행
        let a = setTimeout(() => {}, 2000);
        console.log('hello');

        return() => {
            // useEffect 동작 전에 실행되는 부분
            // clean up function 이라고 함
            // 기존 코드 제거하는 코드 작성
            // ex) 서버에 데이터 요청 중 재렌더링할 시, 기존 데이터 요청은 제거
            // clean up function 은 mount 시 실행되지 않고 unmount 시 실행됨
            clearTimeout(a);
        }
    }, [])

    useEffect 실행 조건 넣을 수 있는 곳은 []
    ex) [count] -> count 값이 변경될 때마다 실행
    1회만 실행하고 싶으면 [] 안을 비우면 됨

    useEffect 안에 있는 코드는 html 렌더링 후에 동작
    
    ** useEffect 안에 적는 코드들
    1. 어려운 연산
    2. 서버에서 데이터 가져오는 작업
    3. 타이머 장착 시
*/


function Detail(props) {

    // let {items} = useContext(Context1)
    // console.log(items);

    let data = useSelector((state) => { return state })
    let dispatch = useDispatch()


    let[count, setCount] = useState(0);
    let[warn, setWarn] = useState(true);
    let[text, setText] = useState('');
    let[tab, setTab] = useState(0);
    let {id} = useParams();

    let shoe = props.shoes.find((data) => {
        return data.id === (id * 1);
    });

    // 최근 방법
    useEffect(() => {
        // mount, update 시 코드 실행
        let a = setTimeout(function() {
            // document.querySelector('.alert').style.display = 'none';
            setWarn(false);
        }, 2000);

        console.log(2);

        return () => {
            console.log(1);
            clearTimeout(a);
        }
    }, [])

    // useEffect(() => {
    //     // let check = /^[0-9]+$/;

    //     // if(!check.test(text)) {
    //     //     alert("숫자만 입력해주세요.");
    //     // }

    //     if(isNaN(text)) {
    //         alert("숫자만 입력해주세요.");
    //     }
    // }, [text])

    // const onChange = (e) => {
    //     setText(e.target.value);
    // }

    let [fade, setFade] = useState('')

    useEffect(() => {
        let a = setTimeout(() => { setFade('end') }, 100)

        return () => {
            clearTimeout(a);
            setFade('')
        }
    }, [])

    return (
        <div className={`container start ${fade}`}>
            {
                warn == true ?
                <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div>
                : null
            }
            
            {count}
            <input onChange={(e) => {setText(e.target.value)}} value={text} />
            <Box>
                <Btn bg="blue" onClick={() => { setCount(count + 1) }}>버튼</Btn>
                <Btn bg="orange">버튼</Btn>
            </Box>
            
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (id * 1 + 1) + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}원</p>
                    <button className="btn btn-danger" onClick={() => { dispatch(addItem(shoe)) }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <TabContent tab={tab} shoes={props.shoes}></TabContent>
        </div>
    )
}

function TabContent({tab, shoes}) {
    // props 대신 {tab} 이라고 하면 tab 바로 사용 가능

    // if(props.tab == 0) {
    //     return <div>내용0</div>
    // } else if(props.tab == 1) {
    //     return <div>내용1</div>
    // } else if(props.tab == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')
    // let {items} = useContext(Context1)

    // console.log(items);

    useEffect(() => {
        let a = setTimeout(() => { setFade('end') }, 100)

        return () => {
            clearTimeout(a);
            setFade('')
        }
    }, [tab])

    return (<div className={`start ${fade}`}>
       { [<div>{shoes[0].title}</div>, <div>{shoes[1].title}</div>, <div>{shoes[2].title}</div>][tab] }
    </div>)
}

export default Detail;