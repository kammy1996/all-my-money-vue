import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';

Vue.use(VueRouter);


const routes = [
    {
    path:'/',
    name:'Dashboard',
    component:() => import(`../views/dashboard.vue`) ,
     meta: { requiresAuth: true },
  },
  {
    path:'/login',
    name:'LoginForm',
    component:() => import(`../components/user/login-form.vue`),
    meta : { disableIfLoggedIn : true}
  },
  {
    path:'/register',
    name:'RegisterForm',
    component:() => import(`../components/user/register-form.vue`),
    meta : { disableIfLoggedIn : true}
  },
  {
    path:'/records',
    name:'Records',
    component:() => import(`../views/records/records.vue`),
     meta: { requiresAuth: true },
  },
  {
    path:'/records/settings',
    name:'RecordSettings',
    component:() => import(`../views/records/record-settings.vue`),
     meta: { requiresAuth: true },
  },
  {
    path:'/networth',
    name:'Networth',
    component:() => import(`../views/networth.vue`),
     meta: { requiresAuth: true },
  },
  {
    path:'/goals',
    name:'Goals',
    component:() => import(`../views/goals.vue`),
     meta: { requiresAuth: true },
  },
  {
    path:'/subscription',
    name:'Subscription',
    component:() => import(`../views/subscription.vue`),
     meta: { requiresAuth: true },
  },
  {
    path:'*',
    redirect:'/login'
  } 
]

const router = new VueRouter({
  routes,
  mode:'history'
})


router.beforeEach((to,from,next) => {
  const authStatus = Cookie.get('token');

  if(to.meta.disableIfLoggedIn) {
    if(authStatus) next('/');
  }

   if(to.meta.requiresAuth) {
    if(!authStatus) next ('/login')
    else next();
  } 
  next();
});


export default router;