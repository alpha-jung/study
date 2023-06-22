import { createWebHistory, createRouter } from "vue-router";
import List from './components/List.vue'
import Home from './components/Home.vue'
import Detail from './components/Detail.vue'
import Author from './components/Author.vue'
import Comment from './components/Comment.vue'

const routes = [
    {
        paht: '/',
        component: Home,
    },
    {
        path: '/list',
        component: List,
    },
    {
        // 파라미터에 정규식도 사용 가능
        // ex) /datail/:id(\\d+) => 숫자만 찾아주는 정규식 문법
        path: '/detail/:id',
        component: Detail,
        children: [
            {
                path: "author",
                component: Author,
            },
            {
                path: "comment",
                component: Comment,
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;