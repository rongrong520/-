<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加菜单':'编辑菜单'"
      :visible.sync="isShow.dialogshow"
      center
    >
      <el-form :model="menuform" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称">
          <el-input v-model="menuform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单">
          <el-select v-model="menuform.pid" placeholder="请选择">
            <el-option value disabled>--请选择--</el-option>
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in get_MenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="menuform.type" :label="1">目录</el-radio>
          <el-radio v-model="menuform.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="menuform.type==1" label="菜单图标">
          <el-input v-model="menuform.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="menuform.type==2" label="菜单地址">
          <el-input v-model="menuform.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="menuform.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
import {mapGetters,mapActions} from 'vuex'
import {getMenuAdd,getMenuInfo,getMenuEdit} from '../../util'
export default {
    props:['isShow'],
 data() {
 return {
     editid: 0, //编辑删除用
     menuform: {
        title: "", //菜单名称
        pid: 0, //上级菜单
        type: 1,
        url: "", //菜单地址
        status: true, //状态1正常2禁用
        icon: "", //菜单图标
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger:  "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
 };
 },
  computed: {
    ...mapGetters(['get_MenuList'])
  },
 methods: {
     
     //编辑事件
    update(id) {
        this.editid = id
      //更改isAdd的状态
      
      this.isShow.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        if (res.code == 200) {
          this.menuform = res.list;
          this.menuform.type = res.list.type.toString()
          this.menuform.status = this.menuform.status===1 ?true:false
               
        }
      });
    },
     
     //调取行动
     ...mapActions(['getMenuListAction']),
     reset() {
      this.menuform = {
        title: "",
        pid: 0,
        type: 1,
        url: "",
        status: true,
        icon: "",
      };
      this.$emit('close',false)
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.menuform.status = this.menuform.status ? 1:2
          //利用深拷贝，开辟一个新的空间，切断之前的联系，不会出现双向数据绑定
          let data = JSON.parse(JSON.stringify(this.menuform));
          data.status = data.status ? 1 : 2;
          // data.type
          if (this.isShow.isAdd) {
            //调取接口
            getMenuAdd(data).then((res) => {
              console.log(res, "添加结果");
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getMenuListAction()
              }
            });
          } else {
            //必填项id从上面找变量接受
            data.id = this.editid;
            console.log(this.menuform.id);
            console.log(data);
            //调取接口
            getMenuEdit(data).then((res) => {
            //   console.log(res, "添加结果");
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getMenuListAction()
              }
            });
          }
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
