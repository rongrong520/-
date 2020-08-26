<template>
  <div class="wrap">
    <!-- 头部区域 -->
    <header>
      <div class="logo">
        <img src="../assets/images/index_images/logo.jpg" alt />
      </div>
      <!-- 搜索 -->
      <div class="seach">
        <form action>
          <input type="seach" placeholder="寻找商品" @keyup.13="enter" />
        </form>
      </div>
      <!-- 设置 -->
      <div class="set">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <!-- 导航区域 -->
    <div class="nav clearfix">
      <div v-for="item in navlist" :key="item.id" ref="aa" @click="getinfo(item.id-1)">
        <a>{{item.name}}</a>
      </div>
      <div class="item"></div>
    </div>
    <!-- banner -->
    <div class="banner">
      <img src="../assets/images/index_images/banner.jpg" alt />
    </div>
    <!-- 菜单入口 -->
    <div class="menu">
      <div>
        <img src="../assets/images/index_images/icon_1.jpg" alt />
        <p>限时抢购</p>
      </div>
      <div>
        <img src="../assets/images/index_images/icon_2.jpg" alt />
        <p>积分商城</p>
      </div>
      <div>
        <img src="../assets/images/index_images/icon_3.jpg" alt />
        <p>联系我们</p>
      </div>
      <div>
        <img src="../assets/images/index_images/icon_4.jpg" alt @click="transfer" />
        <p>商品分类</p>
      </div>
    </div>
    <!-- 秒杀开始 -->
    <div class="seckill">
      <div class="seckill-left">
        <span class="myimage"></span>
        <span class="text">限时秒杀</span>
        <p>每天零点场 好货秒不停</p>
        <div class="time clearfix">
          <span class="times">02</span>
          <span class="timer">:</span>
          <span class="times">16</span>
          <span class="timer">:</span>
          <span class="times">45</span>
          <span class="seckill-one">秒杀</span>
        </div>
        <img src="../assets/images/index_images/shop_5.jpg" alt />
        <div class="price">&yen;14.8</div>
      </div>
      <div class="seckill-right">
        <div class="top">
          <div>
            <span class="text">品牌上新</span>
            <span class="text-one">折</span>
            <p>每日9点 抢大牌</p>
            <img src="../assets/images/index_images/brand.jpg" alt class="item" />
          </div>
          <div class="right">
            <img src="../assets/images/index_images/shop_1.jpg" alt />
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <span class="text">每日十件</span>
            <p>只为你选好货</p>
            <img src="../assets/images/index_images/shop_2.jpg" alt />
          </div>
          <div class="right">
            <span class="text">拼啊</span>
            <p>超级好价拼团</p>
            <img src="../assets/images/index_images/shop_3.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 秒杀结束 -->
    <!-- bar图 -->
    <div class="bar">
      <img src="../assets/images/index_images/bar.jpg" alt />
    </div>
    <!-- bar图结束 -->
    <!-- 货物区开始 -->
    <div class="goods">
      <div class="navs">
        <div ref="str" class="goods-nav naver" @click="tabcom='hot'" >热门推荐</div>
        <div ref="str" class="goods-nav" @click="tabcom='find'">发现好货</div>
        <div ref="str" class="goods-nav" @click="tabcom='special_session'">只看专场</div>
        <div ref="str" class="goods-nav" @click="tabcom='commodity'">只看商品</div>
      </div>
      <div :is="tabcom"></div>
    </div>
  </div>
</template>
<script>
import find from "../views/find";
import special_session from "../views/special_session";
import hot from "../views/hot";
import commodity from "../views/commodity";

export default {
  data() {
    return {
      tabcom: "hot",
      navlist: [
        {
          id: 1,
          name: "推荐",
        },
        {
          id: 2,
          name: "女装",
        },
        {
          id: 3,
          name: "鞋包",
        },
        {
          id: 4,
          name: "居家",
        },
        {
          id: 5,
          name: "母婴儿童",
        },
        {
          id: 6,
          name: "美食",
        },
        {
          id: 7,
          name: "果然",
        },
      ],
    };
  },
  mounted() {
    this.$refs.aa[0].className = "first fl";
  },
  methods: {
    transfer() {
      //编程式导航
      this.$router.push("/foodtransfer");
    },
    enter() {
      this.$router.push("/foodlist");
    },
    getinfo(str) {
      this.$refs.aa.forEach((element) => {
        element.className = "";
      });

      this.$refs.aa[str].className = "first fl";
    },
    
  },
  components: {
    find,
    special_session,
    hot,
    commodity,
  },
};
</script>
<style  >
@import "../assets/css/index.css";
</style>