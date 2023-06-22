<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="changeStep">Next</li>
      <li v-if="step == 2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- vuex 사용하여 데이터 꺼내는 방법 -->
  <!-- <h4>안녕 {{ $store.state.name }} 나이는 {{ $store.state.age }}</h4> -->

  <!-- vuex 의 데이터 변경하는 방법 -->
  <!-- 하지만 vuex 의 데이터는 컴포넌트 안에서 직접 수정하는 것은 금지 ( 추적하기가 어렵기 때문 ) -->
  <!-- vuex state 데이터를 수정하고 싶다면 store.js 에 수정 방법을 정의해두고 컴포넌트에서 그 방법을 사용 -->
  <!-- 나쁜 방법 => <button @click="$store.state.name = 'park'">버튼</button> -->
  <!-- <button @click="$store.commit('setName')">button1</button>
  <button @click="$store.commit('increaseAge', 10)">button2</button> -->

  <!-- vuex 의 actions 호출하는 방법 -->
  <!-- <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">more button</button> -->

  <p>{{ name }} {{ age }} {{ likes }} {{ name2 }}</p>
  <button @click="increaseAge(10)">button</button>

  <Container :postData="postData" :step="step" :imageUrl="imageUrl" @postContent="postContent = $event" />

  <button @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input type="file" id="file" class="inputfile" accept="image/*" multiple @change="uploadImage" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>

import Container from './components/Container.vue'
import postData from './assets/post.js'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      postData: postData,
      moreCount: 0,
      step: 3,
      imageUrl: '',
      postContent: '',
      filter: '',
      counter: 0,
    }
  },
  mounted() {
    this.emitter.on('filter', (a) => {
      this.filter = a;
    });
  },
  components: {
    Container: Container,
  },
  /**
   * methods 와 차이점
   * methods 함수는 사용할 때마다 실행 / computed 는 한번 사용하면 다시 실행되지 않음 ( 초기 실행 후 가지고 있던 값을 계속 가지고 있음 )
   */

  // state 값을 가져오는 함수를 computed 에 정의함으로써 코드 길이 단축
  computed: {
    name() {
      return this.$store.state.name;
    },
    // vuex state 한번에 꺼내쓰려면 ...mapState(['state 이름'])
    // Object 사용하여 state 를 원하는 key 값으로 변경해서 사용 가능
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ name2: 'name' })
  },
  methods: {
    // vuex mutations 도 한번에 꺼내쓰려면 ...mapMutations
    // vuex actions 도 ...mapActions 로 한번에 꺼내쓰기 가능
    ...mapMutations(['increaseAge']),
    more() {
      if (this.moreCount < 2) {
        axios.get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
          .then(res => {
            console.log(res);
            this.postData.push(res.data);
            this.moreCount++;
          })
          .catch(err => {
            console.log(err);
          })
      }

    },
    changeStep() {
      if(this.step == 2) {
        this.step = 0;
      } else {
        this.step++;
      }
    },
    uploadImage(e) {
      // console.log(e.target.files);
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      console.log(url);
      this.imageUrl = url;
      this.step++;
    },
    publish() {
      let post = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imageUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.postContent,
        filter: this.filter
      };

      console.log(post);

      this.postData.unshift(post);
      this.step = 0;
    },
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
