import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'addElement',
    component: () => import('../views/AddElement.vue')
  },
  {
    path: '/view/:elementId',
    name: 'viewElement',
    component: () => import('../views/ViewElement.vue')
  },
  {
    path: '/edit/:elementId',
    name: 'editElement',
    component: () => import('../views/EditElement.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
