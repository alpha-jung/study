<template>
    <div style="padding: 10px;">
        <h4>팔로워</h4>
        <input placeholder="" @input="search($event.target.value)" />
        <div class="post-header" v-for="(data, i) in follower" :key="{i}">
            <div class="profile" :style="`background-image: url(${data.image})`"></div>
            <span class="profile-name">{{ data.name }}</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'MyPage',
    props: {
        one: Number,
    },
    /**
     * Composition API
     * setup()
     *  > 데이터 생성, 조작 가능
     *  > methods, computed, watch 생성 가능
     *  > hook 도 걸 수 있음
     */
    setup(props) {
        // 데이터 생성하기 위해선 ref 함수 사용
        // ref 함수 사용해야 해당 변수 값이 변경될 때 재렌더링 가능
        let follower = ref([]);
        let saveFollower;

        // reft 함수와 같이 reactive 함수로 데이터 생성 가능
        // 보통 reactive 는 Array, Object 데이터 생성 때 사용하고 나머지 타입은 ref 로 생성
        // 기능은 같기에, 엄격하게 작성하지 않는 이상 ref 만 사용해도 무관
        // let test = reactive({ name: 'kim' });
        // test;

        // Composition API 에서 props 사용법
        let { one } = toRefs(props);
        console.log(one.value);

        // Composition API 에서 watch, computed 사용법
        // watch 첫번째 매개변수에는 감시할 변수명 삽입
        watch(one, () => {
            
        })

        let result = computed(() => {
            return follower.value.length;
        })

        console.log(result);

        let store = useStore();
        console.log(store.state.name);
        console.log(store.commit(''));

        onMounted(() => {
            axios.get('/follower.json')
                .then(res => {
                    follower.value = res.data;
                    saveFollower = [...follower.value];
                    console.log(follower);
                })
                .catch(err => {
                    console.log(err);
                });
        })

        function search(text) {
            follower.value = [...saveFollower];

            if (text != '' && text != undefined) {
                let copyFollower = [...follower.value];

                console.log(text);

                follower.value = copyFollower.filter((data) => {
                    console.log(data.name.indexOf(text));
                    return data.name.indexOf(text) > -1;
                });
            }

            console.log(follower);
        }

        // return 해줘야 사용 가능
        return { follower, search };
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>