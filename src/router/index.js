import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'
import Card from '../views/Card.vue'
// import Type from '../views/Types.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:page',
    name: 'page',
    component: Page,
  },
  {
    path: '/cards/:card',
    name: 'card',
    component: Card,
  },
  {
    path: '/cards/type/:type',
    name: 'page',
    component: Page,
  },
  {
    path: '*',
    redirect: '/cards'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
