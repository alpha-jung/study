<template>
<div>
    <div v-for="(oneroom, i) in onerooms" :key="i">
        <img class="room-img" :src=oneroom.image />
        <h4 @click="$emit('modalOpen', true); $emit('modalIdx', i);">{{ oneroom.title }}</h4>
        <p>{{ oneroom.price }}원</p>
    </div>
</div>
</template>

<script>
    export default {
        name : 'Card',
        props : {
            onerooms : Array,
            modalIdx : Number,
            modalOpen : Boolean,
        }
    }
</script>