<template>
    <div class="wrap">
       <header>
            <!-- arrow -->
            <div class="arrow" @click="$router.go(-1)">
                <img src="../assets/images/public/arrow.jpg" alt="">
            </div>
            <div class="text">
                我的订单
            </div>
            <!-- 设置 -->
            <div class="set">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
        <div class="head">
            <div class="head-one">
                <img src="../assets/images/mine_images/head.jpg" alt="">
            </div>
            <div class="head-two">
                <p>悠溯</p>
                <p><i>V1</i></p>
            </div>
            <div class="head-three">
                每日签到
            </div>
        </div>
        <div class="aside">
            <div class="aside-one">
                <img src="../assets/images/mine_images/icon_1.jpg" alt="">
                <p>全部订单</p>
            </div>
            <div class="aside-two">
                <img src="../assets/images/mine_images/icon_2.jpg" alt="">
                <p>待付款</p>
            </div>
            <div class="aside-three">
                <img src="../assets/images/mine_images/icon_3.jpg" alt="">
                <p>待收货</p>
            </div>
        </div>
         <div class="bodys-first-one">
            <div class="bodys body-first">
                <img src="../assets/images/mine_images/icon_4.jpg" alt="">
                <div class="bodys-one">
                    <span>地址管理</span>
                </div>
                <img src="../assets/images/public/right.jpg" alt="">
            </div>
            <div class="bodys body-second">
                <img src="../assets/images/mine_images/icon_5.jpg" alt="">
                <div class="bodys-one">
                    <span>我的钱包</span>
                </div>
                <p>200余额</p>
                <img src="../assets/images/public/right.jpg" alt="">
            </div>
            <div class="bodys body-third">
                <img src="../assets/images/mine_images/icon_6.jpg" alt="">
                <div class="bodys-one">
                    <span>我的优惠券</span>
                </div>
                <img src="../assets/images/public/right.jpg" alt="">
            </div>
            <div class="bodys body-fourth">
                <img src="../assets/images/mine_images/icon_7.jpg" alt="">
                <div class="bodys-one">
                    <span>我的二维码</span>
                </div>
                <img src="../assets/images/public/right.jpg" alt="">
            </div>
            <div class="bodys body-fifth">
                <img src="../assets/images/mine_images/icon_8.jpg" alt="">
                <div class="bodys-one">
                    <span>我的小伙伴</span>
                </div>
                <img src="../assets/images/public/right.jpg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style  scoped>
    @import '../assets/css/mine.css';
</style>