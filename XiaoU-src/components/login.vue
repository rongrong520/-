<template>
 <div class="wrap">
<header>
            <!-- arrow -->
            <div class="arrow">
                <img src="../assets/images/public/arrow.jpg" alt="">
            </div>
            <div class="text">
                登录
            </div>
            <!-- 设置 -->
            <div class="set">
                <b>注册</b>
            </div>
        </header>
        <div class="box">
            <span>手机号:</span>
            <input type="text"><br>
            <span>密码:</span>
            <input type="passwrad">
            <p class="fr">忘记密码</p>
            <button>
                <b>登录</b>
            </button>
        </div>
 </div>
</template>

<script>
export default {
 data() {
 return {

 };
 },
};
</script>

<style lang="" scoped>
@import '../assets/css/login.css'
</style>
