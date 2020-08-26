<template>
  <div>
    <el-container>
      <el-header>
          <h3>xxx后台管理项目</h3>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <vnav></vnav>
        </el-aside>
        <el-main>
            <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vnav from '../components/nav'
export default {
  data() {
    return {};
  },
  components: {
    vnav,
  },
};
</script>

<style lang="stylus" scoped>
    @import '../stylus/index.styl';
    .el-header{
        background $secondColor
        line-height 60px
          
    }
</style>
