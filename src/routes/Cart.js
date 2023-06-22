import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, addAge } from './../store/userSlice.js'
import { increaseCount, removeItem } from './../store.js'
import { memo, useMemo, useState } from 'react'


function calc() {
    // 반복문 10억번 돌리는 함수라 가정
    return;
}


/*
    ** memo
    필요할 때만 재렌더링하려면 memo 사용

    - 원리 : props 가 변할 때만 재렌더링 해줌
*/
// 
let Child = memo( function() {
    console.log('re-rendering');
    return <div>자식임</div>
})

function Cart() {

    // Redux store 의 state 가져오는 법
    // store 안에 있는 모든 state 를 뜻함
    // return state.user => user 라는 항목만 가져옴
    // ((state) => state.user) 로 축약 가능
    let data = useSelector((state) => { return state })
    
    // store.js 로 요청보내는 함수
    let dispatch = useDispatch()

    let items = data.items;

    let [count, setCount] = useState(0);

    // Cart 가 재렌더링 될 때마다 실행
    /*
        useMemo()
        컴포넌트 렌더링 시, 1회만 실행해줌
        state 설정 시, state 가 변화할 때만 실행
        ex) let result = useMemo(() => { return calc() }, [state]);
        (useEffect와 동일)

        
    */
    let result = useMemo(() => { return calc() });

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={() => { setCount(count + 1) }}>+</button>

            <h6>{data.user.name}({data.user.age}) 의 장바구니</h6>
            <button onClick={() => { dispatch(addAge(3)) }}>나이 증가</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((a, i) => {
                            return <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{items[i].name} <button onClick={() => { dispatch(removeItem(items[i].id)) }}>삭제</button></td>
                                <td>{items[i].count}</td>
                                <td><button onClick={() => { dispatch(increaseCount(items[i].id)) }}>+</button></td>
                            </tr>
                        })
                    }
                    {/* <tr>
                        <td>1</td>
                        <td>{items[0].name}</td>
                        <td>{items[0].count}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{items[1].name}</td>
                        <td>{items[1].count}</td>
                        <td></td>
                    </tr> */}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart