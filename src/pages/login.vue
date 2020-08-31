<template>
  <div class="wrap">
    <el-form :model="loginFrom" 
    :rules="rules"
     ref="ruleForm"
     label-width="100px"
      class="login">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginFrom.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginFrom.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getLogin} from '../util'
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 15 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getLogin(this.loginFrom)
          .then(res=>{
              if(res.code===200){
                sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                this.$router.push('/index')
              }else{
                 this.$message.error(res.msg);
              }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.wrap {
  position: relative;
  background: $firstColor;
  height: 100vh;

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;

    .el-button {
      position: absolute;
      left: 50%;
      margin-left: -40px;
    }
  }
}
</style>
