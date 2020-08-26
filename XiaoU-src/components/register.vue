<template>
 <div class="wrap">
     <header>
            <!-- arrow -->
            <div class="arrow">
                <img src="../assets/images/public/arrow.jpg" alt="">
            </div>
            <div class="text">
                注册
            </div>
            <!-- 设置 -->
            <div class="set">
                <b>登录</b>
            </div>
        </header>
        <div class="box">
            <span>昵称:</span>
            <input type="text"><br>
            <span>手机号:</span>
            <input type="passwrad">
            <span>密码:</span>
            <input type="text"><br>
            <span>验证码:</span>
            <p >重新发送()</p>
            <input type="passwrad">
            <button>
                <b>下一步</b>
            </button>
            <div class="first"><input type="checkbox">
            <span>我已同意并使用</span><span>条款和隐私政策</span>
            </div>
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
@import '../assets/css/register.css'
</style>
