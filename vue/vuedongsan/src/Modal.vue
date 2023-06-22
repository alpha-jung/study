<template>
    <div class="black-bg" v-if="modalOpen">
        <div class="white-bg">
            <h4>{{ onerooms[modalIdx].title }}</h4>
            <p>{{ onerooms[modalIdx].content }}</p>
            <input @input="month = $event.target.value" :value="month" />
            <!-- <input v-model.number="month" />   -->
            <!-- textarea, select 에도 v-model 사용 가능 -->
            <!-- v-model.number 를 사용하여 숫자 입력 시, 문자가 아닌 숫자로 인식하게 가능 -->
            <p>{{ month }}개월 선택 : {{ onerooms[modalIdx].price * month }}원</p>
            <button @click="$emit('modalOpen', false)">닫기</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {
                month : 1,
            }
        },
        watch: {
            // 데이터 감시하는 함수명은 data 의 이름과 동일하게 작성
            month(currValue, prevValue) {
                
                if(isNaN(currValue)) {
                    alert('숫자만 입력 가능합니다.');
                    this.month = 1;
                }
            }
        },
        beforeUpdate() {
            if(this.month == 2) {
                alert('2!');
            }
        },
        props: {
            onerooms: Array,
            modalIdx: Number,
            modalOpen: Boolean,
        }
    }
</script>