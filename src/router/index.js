import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/index',
        name: 'Index',
        component: () =>
            import ('../views/Index.vue')
    },
    {
        path: '/houselist',
        name: 'HouseList',
        component: () =>
            import ('../views/Houselist.vue')
    },
    {
        path: '/aboutus',
        name: 'Aboutus',
        component: () =>
            import ('../views/Aboutus.vue')
    },
    {
        path: '/business',
        name: 'Business',
        component: () =>
            import ('../views/Business.vue')
    },
    {
        path: '/blacklisthub',
        name: 'Blacklisthub',
        component: () =>
            import ('../views/Blacklisthub.vue')
    },
    {
        path: '/blackcon',
        name: 'Blackcon',
        component: () =>
            import ('../views/Blackcon.vue')
    },
    {
        path: '/authorize',
        name: 'Authorize',
        component: () =>
            import ('../views/Authorize.vue')
    },
    {
        path: '/housedetail',
        name: 'Housedetail',
        component: () =>
            import ('../views/Housedetail.vue')
    },
    {
        path: '/news',
        name: 'News',
        component: () =>
            import ('../views/news.vue')
    },
    {
        path: '/property',
        name: 'Property',
        component: () =>
            import ('../views/property.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    document.documentElement.scrollTop = 0
    next()
})
export default router