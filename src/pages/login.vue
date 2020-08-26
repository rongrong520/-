<template>
  <div class="wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass:""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass: [
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
          if (this.ruleForm.name == "憨憨" && this.ruleForm.pass == "123456") {
            this.$router.push("/index");
          } else {
            this.$message.error("用户名或密码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
