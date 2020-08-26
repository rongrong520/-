import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('../pages/login')
    },
    {
      path:'/index',
      component:()=>import('../pages/index'),
      children:[
        {
          path:'/home',
          component:()=>import('../views/home'),
        },
        {
          path:'/menu',
          component:()=>import('../views/menu/index.vue'),
          //自定义属性meta，写在路由里
          meta:{
            name:'菜单列表'
          }
        },
        {
          path:'/role',
          component:()=>import('../views/role/index.vue'),
          //自定义属性meta，写在路由里
          meta:{
            name:'角色列表'
          }
        },
        {
          path:'/user',
          component:()=>import('../views/user.vue'),
          meta:{
            name:'管理员列表'
          }
        },
        {
          path:'/goods',
          component:()=>import('../views/goods.vue'),
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
      
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
