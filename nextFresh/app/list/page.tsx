'use client'

import Image from "next/image";
import test from "/public/images/food0.png"; 
import { useState } from "react";

export default function List() {
    let products :string[] = ['Tomatoes', 'Pasta', 'Coconut'];
    let [count, setCount] = useState([0, 0, 0]);

    function changeCount(idx :number, type :string) {
        let copyCount = [...count];

        if(type == 'plus') {
            copyCount[idx]++;
        } else {
            copyCount[idx]--;
        }

        setCount(copyCount);
    }

    return (
        <div>
            <h4 className="title">상품 목록</h4>

            {
                products.map((a, i) => {
                    return (
                        <div className="food" key={i}>
                            <img className="food-img" src={`/images/food${i}.png`} />
                            {/* 외부 이미지는 width, height 속성 줘야 함 */}
                            {/* <Image src={test} className="food-img" /> */}
                            <h4>{products[i]} $40</h4>
                            <span> {count[i]} </span>
                            <button onClick={() => { changeCount(i, 'plus') }}>+</button>
                            <button onClick={() => { changeCount(i, 'minus') }}>-</button>
                        </div>
                    )
                })
            }
        </div>
    )
}