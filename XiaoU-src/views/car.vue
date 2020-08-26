<template>
  <div class="wrap">
    <header>
      <!-- arrow -->
      <div class="arrow" @click="$router.go(-1)">
        <img src="../assets/images/public/arrow.jpg" alt />
      </div>
      <div class="text">购物车</div>
      <!-- 设置 -->
      <div class="set">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <div class="car-goods" v-for="(item,index) in goodlist" :key="item.id">
      <input type="checkbox" v-model="item.checked" />

      <img :src="item.img" alt />
      <div class="first">
        <p class="one">{{item.name}}</p>
        <p class="two">规格：{{item.spe}}</p>
        <p class="three">&yen;{{item.price.toFixed(2)}}</p>
      </div>
      <div class="right">
        <span class="one" @click="sub(index)">-</span>
        <span class="two">{{item.num}}</span>
        <span class="three" @click="add(index)">+</span>
      </div>
    </div>
    <div class="car-goods car-three">
      <div class="left-one">
        <input type="checkbox" v-model="allCheck" @change="checkAll" />
        <span>全选</span>
      </div>
      <div class="center-one">
        <p>
          <span class="text-one">总计：</span>
          <span class="text-two">{{allprice.toFixed(2)}}</span>
        </p>
        <p class="text-three">不含运费，已优惠&yen;0.00</p>
      </div>
      <div class="right-one" @click="check">去结算(两件)</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allCheck: false,
      goodlist: [
        {
          id: 1,
          name: "欧莱雅面霜",
          spe: "50g",
          img: require("../assets/images/order/shop.jpg"),
          num: 1,
          price: 120,
          checked: false,
        },
        {
          id: 2,
          name: "欧莱雅面霜",
          spe: "50g",
          img: require("../assets/images/order/shop.jpg"),
          num: 1,
          price: 120,
          checked: false,
        },
        {
          id: 3,
          name: "欧莱雅面霜",
          spe: "50g",
          img: require("../assets/images/order/shop.jpg"),
          num: 1,
          price: 120,
          checked: false,
        },
      ],
    };
  },
  watch: {
    goodlist: {
      deep: true,
      handler() {
        this.allCheck = this.goodlist.every((item) => item.checked);
      },
    },
  },
  methods: {
    //全选事件
    checkAll() {
      //    console.log(this.allCheck);
      this.goodlist.map((item) => {
        item.checked = this.allCheck;
      });
    },
    //删除
    del(i) {
      this.goodlist.splice(i, 1);
    },
    //减法
    sub(i) {
      //    console.log(this.num);
      // console.log(this.goodlist[i].num);
      // console.log(this.goodlist[i]);
      if (this.goodlist[i].num == 0) {
        return;
      }
      this.goodlist[i].num--;
    },
    add(i) {
      this.goodlist[i].num++;
    },
    check() {
      this.$router.push("/foodorder");
    },
  },
  computed: {
    //计算属性
    allprice() {
      let sum = 0;
      // console.log(sum);

      this.goodlist.map((item) => {
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
};
</script>
<style  scoped>
@import "../assets/css/shoppingcar.css";
</style>