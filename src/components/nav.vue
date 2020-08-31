<template>
  <div>
    <!-- el-menu的属性
                default-active 默认选中 取决于子标签的index
                active-text-color 点击的文本颜色
                unique-opened	是否只保持一个子菜单的展开
                router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultactive"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
        <el-menu-item index="/home">
            <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
        </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in navList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="items in item.children" :key="items.id" :index="items.url">{{items.title}}</el-menu-item>

          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import {mapGetters,mapActions} from 'vuex'
import {getMenuList} from '../util'
export default {
  data() {
    return {
      defaultactive: "/home",
      navList:[]
    };
  },
  computed: {
    // ...mapGetters(['get_MenuList'])
  },
  mounted() {
    this.defaultactive = this.$route.path;
    // 组件一加载就调取菜单列表接口
    this.navList = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).menus : []
    // this.getMenuListAction()
    // getMenuList({
    //   istree:1
    // })
    // .then(res=>{
    //   console.log(res,'navlist');
    //   if(res.code === 200){
    //     this.navList = res.list
    //   }
    // })
    
  },
  methods: {
    // ...mapActions(['getMenuListAction'])
  },
};
</script>


<style lang="stylus" scoped>
@import '../stylus/index.styl';
.el-menu {
  min-height: 600px;
}
</style>
