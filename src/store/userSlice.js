import { createSlice } from '@reduxjs/toolkit'


// Redux store 에 state 보관하는 법
let user = createSlice({
    name : 'user',
    initialState : { name : 'Kim', age : 20 },
    /*
        Redux 의 state 변경하는 법
        - state 수정해주는 함수 생성
        - 원할 때 해당 함수 실행해달라고 store.js 에 요청
    */
    reducers : {
        changeName(state) {
            //return 'John Kim'
            // return 'John ' + name // 기존 state
            state.name = 'John Park'
        },
        addAge(state, action) {
            // state 가 Object/Array 면 return 없이 직접 수정 가능
            // 파라미터 사용 시, 파라미터명.payload 작성 필요
            // state 변경 함수를 보통 action 이라 칭함
            state.age += action.payload
        }
    }
})

// 함수 변수로 만든 후 export
export let { changeName, addAge } = user.actions

export default user