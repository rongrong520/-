<template>
  <div class="wrap">
    <header>
      <!-- arrow -->
      <div class="arrow" @click="$router.go(-1)">
        <img src="../assets/images/public/arrow.jpg" alt />
      </div>
      <div class="text">确认订单</div>
      <!-- 设置 -->
      <div class="set">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
    <div class="address">
      <div class="address-one">
        <span>收货人 ：YouSu</span>
        <span>10000000000</span>
      </div>
      <div class="clearfix first">
        <p class="fl">收货地址：</p>
        <p class="fl">
          北京市海淀区隐泉路清林苑6号楼中公优就业总部
          <br />3层
        </p>
      </div>
      <img src="../assets/images/order/arrow.jpg" alt />
    </div>
    <div class="number">
      <div class="top clearfix">
        <img src="../assets/images/order/shop.jpg" alt class="fl" />
        <div class="fl first">
          <span class="one">雅诗兰黛护肤霜</span>
          <span class="two">规格：50g</span>
        </div>
        <span class="three fr">&yen;120.00</span>
      </div>
      <div class="lower">
        <span>购买数量：</span>
        <div class="first">
          <span class="one">-</span>
          <span class="two">1</span>
          <span class="three">+</span>
        </div>
      </div>
      <div class="transport">
        <span>配送方式</span>
        <span>XX快递</span>
      </div>
    </div>
    <div class="center">
      <div class="transport">
        <span>优惠券</span>
        <span>无可用</span>
      </div>
      <div class="transport">
        <span>使用积分</span>
        <div class="first">输入积分</div>
        <div class="second">使用</div>
        <p>
          可用
          <span class="text">50</span>积分
        </p>
      </div>
    </div>
    <div class="item">
      <div class="transport">
        <span>商品金额</span>
        <span class="right">&yen;68.00</span>
      </div>
      <div class="transport">
        <span>运费</span>
        <span class="right">+&yen;0.00</span>
      </div>
      <div class="transport">
        <span>优惠券</span>
        <span class="right">-&yen;0.00</span>
      </div>
      <div class="transport">
        <span>会员优惠</span>
        <span class="right">-&yen;0.00</span>
      </div>
      <div class="transport">
        <span>积分抵扣</span>
        <span class="right">-&yen;0.00</span>
      </div>
    </div>
    <div class="orders clearfix">
      <p class>
        实付金额：
        <span>&yen;68.00</span>
      </p>
      <div class="orders-one">提交订单</div>
    </div>
    <vnav></vnav>
  </div>
</template>

<script>
import vnav from "../comnon/nav";
export default {
  data() {
    return {};
  },
  components: {
    vnav,
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/order.css";
</style>
