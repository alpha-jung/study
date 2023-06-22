<template>
    <div @click="sendFilter" :class="`${filter} filter-item`" :style="`background-image: url(${imageUrl})`">
        <!-- slot : 부모에서 보내는 데이터 받는 또 다른 방법 -->
        <!-- props 보다 직관적 -->
        <!-- 태그 안에 데이터 바인딩할 때만 slot 사용 -->
        <!-- slot 여러개 사용할 때, name 사용 ex) <slot name="filter"></slot> -->
        <!-- 자식에서 부모로 데이터 보낼 때도 사용 ex) <slot :msg="msg"></slot> -->
        <!-- 부모에선 <template v-slot:default="작명"><span>{{ 작명.msg }}</span></template> 이렇게 사용 가능 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FilterBox',
    props: {
        imageUrl: String,
        filter: String,
    },
    methods: {
        sendFilter() {
            /**
             * 
             * mitt 으로 데이터 전송하는 방법
             * 1. this.emitter.emit() 으로 전송
             * 2. this.emitter.on() 으로 수신
             */
            this.emitter.emit('filter', this.filter);
        }
    }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>