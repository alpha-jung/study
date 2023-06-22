<template>
  
  <!-- <div class="start" :class="{ end : modalOpen }">
    <Modal :onerooms="onerooms" :modalIdx="modalIdx" :modalOpen="modalOpen" @modalOpen="modalOpen = $event"></Modal>
  </div> -->

  <transition name="fade">
    <Modal :onerooms="onerooms" :modalIdx="modalIdx" :modalOpen="modalOpen" @modalOpen="modalOpen = $event"></Modal>
  </transition>
  
  <Discount v-if="showDiscount == true" :discountPercent="discountPercent"></Discount>

  <button @click="priceSort">가격순 정렬</button> <br />
  <button @click="reversePriceSort">가격 역순 정렬</button> <br />
  <button @click="titleSort">제목순 정렬</button> <br />
  <button @click="reverseTitleSort">제목 역순 정렬</button> <br />
  <button @click="initSort">정렬 초기화</button> <br />

  <div class="menu">
    <a v-for="(menu, i) in menus" :key="i">
      {{ menu }}
    </a>
  </div>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <div>
    <h4 :style="fontStyle">{{ products[0] }}</h4>
    <p>{{ price[0] }} 만원</p>
  </div>
  <div>
    <h4>{{ products[1] }}</h4>
    <p>{{ price[1] }} 만원</p>
  </div>
  <div>
    <h4>{{ products[2] }}</h4>
    <p>{{ price[2] }} 만원</p>
  </div> -->

  <!-- <div v-for="(product, i) in products" :key="i">
    <img class="room-img" :src="require(`@/assets/images/room${i}.jpg`)" />
    <h4 @click="modalOpen = true">{{ product }}</h4>
    <p>{{ price[i] }} 만원</p>
    <button @click="increaseReport(i)">허위 매물 신고</button> <span>신고수 : {{ reportCounts[i] }}</span>
  </div> -->

  <Card :onerooms="onerooms" :modalOpen="modalOpen" :modalIdx="modalIdx" @modalOpen="modalOpen = $event" @modalIdx="modalIdx = $event"></Card>
  
</template>

<script>

/**
 * 
 * Vue의 LifeCycle
 * create -> mount -> component 생성 -> update -> unmount
 * 
 */

import data from './assets/oneroom.js';
import Discount from './Discount.vue';
import Modal from './Modal.vue';
import Card from './Card.vue';

// console.log(data);

export default {
  name: 'App',
  /**
   * data binding 하는 이유
   * Vue의 실시간 자동 렌더링 사용하기 위해 binding
   */
  data() {
    return {
      showDiscount: true,
      discountPercent: 30,
      onerooms: data,
      oneroomsBackup: [...data],
      modalOpen: false,
      modalIdx: 0,
      fontStyle : 'color : blue',
      price: [50, 60, 70],
      products: ['역삼동원룸', '천호동원룸', '마포구원룸'],
      reportCounts: [0, 0, 0],
      menus: ['Home', 'Products', 'About'],
    }
  },
  methods : {
    increaseReport(idx) {
      this.reportCounts[idx]++;
    },
    priceSort() {
      this.onerooms.sort(function(a, b) {
        return a.price - b.price;
      });
    },
    reversePriceSort() {
      this.onerooms.sort(function(a, b) {
        return b.price - a.price;
      });
    },
    titleSort() {
      this.onerooms.sort(function(a, b) {
        if(a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
        
      });
    },
    reverseTitleSort() {
      this.onerooms.sort(function(a, b) {
        if(b.title > a.title) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    initSort() {
      this.onerooms = [...this.oneroomsBackup];
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.showDiscount = false;
    // }, 2000);

    setInterval(() => {
      if(this.discountPercent > 0) {
        this.discountPercent--;
      }
    }, 1000);
  },  
  components: {
    Discount : Discount,
    Modal : Modal,
    Card : Card,
  }
}


</script>

<style>
  body {
    margin: 0;
  }

  div {
    box-sizing: border-box;
  }

  .black-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0, 5);
    position: fixed;
    padding: 20px;
  }

  .white-bg {
    width: 100%;
    background: white;
    border-radius: 8px;
    padding: 20px;
  }
  
  .menu {
    background: darkslateblue;
    padding: 15px;
    border-radius: 5px;
  }

  .menu a {
    color: white;
    padding: 10px;
  }

  .room-img {
    width: 100%;
    margin-top: 40px;
  }

  .start {
    opacity: 0;
    transition: all 1s;
  }

  .end {
    opacity: 1;
  }

  .fade-enter-from {
    /* opacity: 0; */
    transform: translateY(-1000px);
  }

  .fade-enter-active {
    transition: all 1s;
  }

  .fade-enter-to {
    /* opacity: 1; */
    transform: translateY(0px);
  }

  .fade-leave-from {
    opacity: 1;
  }

  .fade-leave-active {
    transition: all 1s;
  }

  .fade-leave-to {
    opacity: 0;
  }
</style>
