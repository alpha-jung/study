<template>
    <div>
        <Post :postData="postData" v-if="step == 0" />

        <!-- 필터선택페이지 -->
        <div v-if="step == 1">
            <div :class="`${filter} upload-image`" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
            <div class="filters">
                <FilterBox :imageUrl="imageUrl" v-for="(filter, i) in filters" :key="{i}" :filter="filter">
                    <!-- 자식 컴포넌트의 특정 slot 에 데이터 전송하는 방법 : <template v-slot:filter>데이터</template> -->
                    <!-- html 태그도 전송 가능 ex) <template v-slot:filter><span>데이터</span></template> -->
                    <span>{{ filter }}</span>
                </FilterBox>
            </div>
        </div>


        <!-- 글작성페이지 -->
        <div v-if="step == 2">
            <div :class="`${filter} upload-image`" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
            <div class="write">
                <textarea class="write-box" @input="postContent = $event.target.value; $emit('postContent', postContent);" :value="postContent">write!</textarea>
            </div>
        </div>

        <div v-if="step == 3">
            <MyPage :one="1"></MyPage>
        </div>
    </div>
</template>

<script>

import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import MyPage from './MyPage.vue'

export default {
    name: 'Container',
    data() {
        return {
            filters: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
"inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
"reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],

            filter: '',
        }
    },
    props: {
        postData: Array,
        step: Number,
        imageUrl: String,
        postContent: String,
    },
    mounted() {
        this.emitter.on('filter', (a) => {
            this.filter = a;
        });
    },
    components: {
        Post: Post,
        FilterBox: FilterBox,
        MyPage: MyPage,
    },
    // methods: {
    //     inputPostContent(e) {
    //         this.postContent = e.target.value;
    //         console.log(this.postContent);
    //     }
    // }
}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>