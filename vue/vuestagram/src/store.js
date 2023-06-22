import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state() {
        return {
            name: 'kim',
            age: 20,
            likes: [0, 0, 0],
            likesClick: [false, false, false],
            more: {}
        }
    },
    // state 수정 방법 정의하는 곳
    mutations: {
        setName(state) {
            state.name = 'park';
        },
        increaseAge(state, payload) {
            state.age += payload;
        },
        changeLikes(state, payload) {
            if(state.likesClick[payload]) {
                state.likes[payload]--;
                state.likesClick[payload] = false;
            } else {
                state.likes[payload]++;
                state.likesClick[payload] = true;
            }
        },
        setMore(state, payload) {
            state.more = payload;
        }
    },
    // 비동기 처리 하는 곳
    // mutations 는 비동기 처리에 대한 순차적 실행을 보장해주지 않음
    actions: {
        getData(context) {
            axios.get('https://codingapple1.github.io/vue/more0.json')
            .then(res => {
                console.log(res.data);
                context.commit('setMore', res.data);
            })
            .catch(err => {
                console.log(err);
            });

        }
    }
})

export default store;