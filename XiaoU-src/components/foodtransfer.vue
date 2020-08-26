<template>
  <div class="wrap">
    
    <header>
      <!-- arrow -->
      <div class="arrow" @click="$router.go(-1)">
        <img src="../assets/images/public/arrow.jpg" alt />
      </div>
      <div class="text">商品分类</div>
      <!-- 设置 -->
      <div class="set">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <div class="brand clearfix">
      <ul class="fl">
        <li class="first">施华蔻</li>
        <li>沙宣</li>
        <li>欧莱雅</li>
        <li>潘婷</li>
        <li>资生堂</li>
        <li>阿道夫</li>
        <li>卡诗</li>
        <li>海飞丝</li>
        <li>资生堂</li>
      </ul>
      <div class="item fr" >
        <div class="box">
          <span class="one">洗发类</span>
          <span class="two">更多></span>
        </div>
        <div class="myimage" v-for='item in goodlist' :key='item.id' @click="details">
          <div>
            <img :src="item.img" alt=""> 
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="item fr" >
        <div class="box">
          <span class="one">洗发类</span>
          <span class="two">更多></span>
        </div>
        <div class="myimage" v-for='item in goodlistone' :key='item.id'>
          <div>
             <img :src="item.img" alt="" > 
             <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodlist: [
        {
          id: 1,
          name: "护亮泽洗发水",
          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 2,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 3,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 4,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 5,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 6,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
      ],
      goodlistone: [
          {
          id: 7,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 8,
          name: "护亮泽洗发水",

          img: require("../assets/images/list_images/pic.jpg"),
        },
        {
          id: 9,
          name: "护亮泽洗发水",
          img: require("../assets/images/list_images/pic.jpg"),
        },
      ]
    };
  },
  methods:{
        details(){
            //编程式导航
            this.$router.push('/fooddetails')
        }
    }
};
</script>

<style lang="" scoped>
@import '../assets/css/classinfy.css';
</style>
