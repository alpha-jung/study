<template>
    <div v-for="(blog, i) in blogData" :key="i">
        <!-- <h3>
            <router-link :to="{ path: '/detail/' + i }">{{ blog.title }}</router-link>
        </h3> -->
        <h3 @click="$router.push('/detail/' + i)">{{ blog.title }}</h3>
        <p>{{ blog.content }}</p>
        <p>{{ blog.date }}</p>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: {
        blogData: Array,
    }
}
</script>

<style>

</style>