import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
  {
    path:'/',
    name:'Index',
    component:() => import(`../views/index.vue`)
  },
  {
    path:'/records',
    name:'Records',
    component:() => import(`../views/records.vue`)
  } 
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router;