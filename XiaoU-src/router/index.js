import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/register',
      component:()=>import('../components/register'),
    },
    {
      path:'/login',
      component:()=>import('../components/login'),
    },
    {
      path:'/index',
      component:()=>import('../components/index'),
      children:[
        //二级路由path地址如果加'/' 调用的时候 '/二级地址' 比如：'/home'
        //二级路由path地址如果没有'/' 调用的时候 '/一级地址/二级地址' 比如：'/index/home'
        {
          path:'/home',
          component:()=>import('../views/home'),
        },
        {
          path:'/car',
          component:()=>import('../views/car')
        },
        {
          path:'/mine',
          component:()=>import('../views/mine'),
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/foodlist',
      component:()=>import('../components/foodlist'),
    },
    {
      path:'/foodtransfer',
      component:()=>import('../components/foodtransfer'),
    },
    {
      path:'/fooddetails',
      component:()=>import('../components/fooddetails')
    },
    {
      path:'/foodorder',
      component:()=>import('../components/foodorder')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
