<template>
  <div class="wrap">
    <div class="foot">
      <router-link active-class="icon" to="/home">
        
        <span class="iconfont icon-shouye1"></span>
        <p class="home-page">首页</p>
      </router-link>
      <router-link active-class="icon" to="/car">
    
        <span class="iconfont icon-cart1"></span>
        <p class="home-page">购物车</p>
      </router-link>
      <router-link active-class="icon" to="/mine">
        <span class="iconfont icon-renwu"></span>
        <p class="home-page">个人中心</p>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
.icon {
  color: #f9570c;
}
</style>
