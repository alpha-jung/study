'use client'

import {age, name} from './data';
import Hello from './hello';

console.log(name + ' , ' + age);

export default function List() {
    let carts :string[] = ['Tomatoes', 'Pasta'];

    return (
        <div>
            <h4 className="title">Cart</h4>
            {
                carts.map((a, i) => {
                    return (
                        <CartItem item={carts[i]}></CartItem>
                    )
                })
            }
            <Banner name="삼성카드"></Banner>
            <Banner name="현대카드"></Banner>
            <Button color="red"></Button>
            <Button color="blue"></Button>
            <Hello></Hello>
        </div>
    )
}


/**
 * 
 * Next.js 컴퍼넌트 종류
 * 1. server component
 * 2. client component
 *  > tsx (js) 파일 최상단에 'use client' 를 작성하면 해당 파일 안의 component 는 client component 가 됨
 * 
 * ** 차이점
 * 1. server component 에는 html 에 자바스크립트 기능 넣기 불가능
 *  > React의 useState, usesEffect 사용 불가능
 *  > client component 는 가능
 * 
 * 2. server component 는 로딩 속도 빠름
 *  > client component 는 느림 ( javascript, hydration 이 필요하기 때문 )
 * 
 * 3. server component 는 검색 엔진에 노출됨
 * 
 * 
 * ** 큰 페이지는 server component 사용, JS 기능 필요한 곳만 client component 사용
 * 
 */ 
function CartItem(props :{item :string}) {
    return (
        <div className="cart-item">
            <p>{props.item}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
}

function Banner(props :{name :string}) {
    return <h5>{props.name} 결제 행사중</h5>
}

function Button(props :{color :string}) {
    return <button style={{ background: props.color }}>버튼</button>
}