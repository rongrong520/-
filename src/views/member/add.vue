<template>
  <div>
    <el-dialog :before-close="reset" title="编辑会员" :visible.sync="isShow.dialogshow" center>
      <el-form :model="memberform" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="memberform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="memberform.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="memberform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="memberform.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMemberInfo, getMemberEdit } from "../../util";
export default {
  props: ["isShow"],
  data() {
    return {
      editid: 0, //编辑删除用
      memberform: {
        nickname: '',//昵称
        phone: "", //手机号
        password: '', //密码
        status: "", //会员图标
      },
      rules: {
        nickname: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请选择上级会员", trigger: "blur" }
          ],
      },
    };
  },
  computed: {
    ...mapGetters(["get_MemberList"]),
  },
  methods: {
    //编辑事件
    update(uid) {
      this.editid = uid;
      //更改isAdd的状态

      this.isShow.isAdd = false;
      getMemberInfo({ uid }).then((res) => {
        if (res.code == 200) {
          this.Memberform = res.list;
          this.Memberform.status = this.Memberform.status === 1 ? true : false;
        }
      });
    },

    //调取行动
    ...mapActions(["getMemberListAction"]),
    reset() {
      this.memberform= {
        nickname: '',//昵称
        phone: "", //手机号
        password: '', //密码
        status: "", //会员图标
      },
      this.$emit("close", false);
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         //必填项id从上面找变量接受
            data.uid = this.editid;
            console.log(data);
            //调取接口
            getMemberEdit(data).then((res) => {
              // console.log(res, "添加结果");
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getMemberListAction();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
