import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
var userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : ''
function hasUrl(url) {
  return userInfo.menus_url.some(item => item == url)
}

const route = new Router({
  mode: 'history',
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
          },
          beforeEnter(to, from, next) {
            hasUrl('/menu') ? next() : next('/home')
          }
        },
        {
          path:'/role',
          component:()=>import('../views/role/index.vue'),
          //自定义属性meta，写在路由里
          meta:{
            name:'角色列表'
          },
          beforeEnter(to, from, next) {
            hasUrl('/role') ? next() : next('/home')
          }
        },
        {
          path:'/user',
          component:()=>import('../views/user/index.vue'),
          meta:{
            name:'管理员列表'
          },
          beforeEnter(to, from, next) {
            hasUrl('/user') ? next() : next('/home')
          }
        },
        {
          path:'/cate',
          component:()=>import('../views/cate/index.vue'),
          meta:{
            name:'商品分类列表'
          },
          beforeEnter(to, from, next) {
            hasUrl('/cate') ? next() : next('/home')
          }
        },
        {
          path:'/spec',
          component:()=>import('../views/spec/index.vue'),
          meta:{
            name:'商品规格列表'
          },
          beforeEnter(to, from, next) {
            hasUrl('/spec') ? next() : next('/home')
          }
        },
        {
          path:'/goods',
          component:()=>import('../views/goods/index.vue'),
          meta: {
            name: '商品管理'
          },
          beforeEnter(to, from, next) {
            hasUrl('/goods') ? next() : next('/home')
          }
        },
        {
          path: '/member',
          component: () => import('../views/member/index.vue'),
          meta: {
            name: '会员管理'
          },
          beforeEnter(to, from, next) {
            hasUrl('/member') ? next() : next('/home')
          }
        },
        {
          path: '/banner',
          component: () => import('../views/banner/index.vue'),
          meta: {
            name: '轮播图管理'
          },
          beforeEnter(to, from, next) {
            hasUrl('/banner') ? next() : next('/home')
          }
        },
        {
          path: '/seck',
          component: () => import('../views/seck/index.vue'),
          meta: {
            name: '限时秒杀'
          },
          beforeEnter(to, from, next) {
            hasUrl('/seck') ? next() : next('/home')
          }
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
// 全局前置导航钩子函数
route.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }
  let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
  if (token) {
    next()
    return
  }
  next('/login')
})

export default route