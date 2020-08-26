<template>
  <div class="wrap">
    <!-- 头部区域 -->
    <header>
      <!-- arrow -->
      <div class="arrow" @click="$router.go(-1)">
        <img src="../assets/images/list_images/arrow.jpg" alt />
      </div>
      <div class="logo">
        <img src="../assets/images/index_images/logo.jpg" alt />
      </div>
      <!-- 设置 -->
      <div class="set">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <!-- 搜索框 -->
    <div class="search">
      <form action>
        <input type="text" value="搜索商品" />
      </form>
    </div>
    <!-- 商品 -->
    <div class="goods">
      <div class="good" @click="details">
        <img src="../assets/images/list_images/pic.jpg" alt />
        <div class="text">
          <p>阿道夫修护滋养洗发香乳 洗发水 持久留香 520ml*2瓶 旗舰店正品焕新升级款</p>
          <span>&yen;123.00</span>
          <p class="first">3625条评论</p>
        </div>
      </div>
    </div>
    <Vnav></Vnav>
  </div>
</template>

<script>
import Vnav from "../comnon/nav";
export default {
  data() {
    return {};
  },
  components: {
    Vnav,
  },
  methods: {
      details(){
          this.$router.push('/fooddetails')
      }
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/list.css";
</style>

