import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
 
  {
    path:'/records',
    name:'Records',
    component:() => import(`../views/records.vue`)
  },
  {
    path:'/',
    name:'Dashboard',
    component:() => import(`../views/dashboard.vue`)
  },
  {
    path:'/networth',
    name:'Networth',
    component:() => import(`../views/networth.vue`)
  },
  {
    path:'/goals',
    name:'Goals',
    component:() => import(`../views/goals.vue`)
  },
  {
    path:'/subscription',
    name:'Subscription',
    component:() => import(`../views/subscription.vue`)
  } 
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router;