import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Test from '@/views/test'
import Runhome from '@/views/runhome'
import Login from '@/views/login'

// buy send 
import Tobuy from '@/views/tobuy'
import Tosend from '@/views/tosend'
import Toget from '@/views/toget'
import Toqueue from '@/views/toqueue'

// userinfo
import ToorderList from '@/views/orderList'
import ToorderInfo from '@/views/orderInfo'
import Userinfo from '@/views/userinfo'
import Coupon from '@/views/coupon'
import Toorderworking from '@/views/orderworking'
// ----runmen
import Register from '@/views/runmen/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Runhome',
      name: 'Runhome',
      component: Runhome
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: { requiresAuth: true }
    },
    {
      path: '/', 
      redirect: '/Runhome'
    },
    {
      path:'/login',
      name:'Login',
      component: Login,
    },
    {
      path:'/tobuy',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Tobuy',
      component: Tobuy,
    },
    {
      path:'/tosend',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Tosend',
      component: Tosend,
    },
    {
      path:'/toget',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Toget',
      component: Toget,
    },
    {
      path:'/toqueue',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Toquque',
      component: Toqueue,
    },
    {
      path:'/toorderList',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'ToorderList',
      component: ToorderList,
    },
    {
      path:'/toorderInfo/:id',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'ToorderInfo',
      component: ToorderInfo,
    },
    {
      path:'/toorderworking/:id',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Toorderworking',
      component: Toorderworking,
    },
    {
      path:'/userinfo',
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Userinfo',
      component: Userinfo,
    },
    {
      path:'/coupon',         //优惠券
      meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name:'Coupon',
      component: Coupon,
    },
    //runmen
    {
      path:'/register',
  /*    meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },*/
      name:'Register',
      component: Register,
    }  
  ]
})
