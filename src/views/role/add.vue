<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加角色':'编辑角色'"
      :visible.sync="isShow.dialogshow"
      center
    >
      <el-form :model="roleform" :rules="rules" ref="ruleForm" >
        <el-form-item prop="rolename" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleform.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label='角色权限' :label-width="formLabelWidth">
          <el-tree
            :data="get_MenuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :default-checked-keys="defaultChecked"
            check-strictly
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="roleform.status" 
          active-color="#13ce66"
           inactive-color="#ff4949"
           :active-value="1"
            :inactive-value="2"
           ></el-switch>
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util";
export default {
  data() {
    return {
      editid:0,
      defaultChecked: [],
       formLabelWidth:"120px" ,//默认勾选的key
      roleform: {
        rolename: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      defaultProps: {//树结构的显示配置项
          children: 'children',
          label: 'title'
        }
    };
  },
  mounted() {
    this.getMenuListAction();
    //获取角色列表
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters(['get_MenuList'])
  },
   props: ["isShow"],
  methods: {
    reset() {
      this.roleform = {
        rolename:'',
        status: 1,
      }
      //清空tree结构权限的选择状态
      this.$refs.tree.setCheckedKeys([]);
      //子组件去修改父组件的弹框状态
      this.$emit("close", false);
    },
    //触发菜单列表的调取
    ...mapActions(['getMenuListAction','getRoleListAction']),
    update(id){
      this.editid = id
      getRoleInfo({id})
      .then((res)=>{
        if(res.code === 200){
          this.roleform = res.list
          //得到的数组要做二次转换
          this.defaultChecked = this.roleform.menus ? this.roleform.menus.split(","):[]
        }
      });
    },
    add(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //菜单权限 存放的是菜单编号，用逗号隔开 '1,2,3,4,27'
          this.roleform.menus = this.$refs.tree.getCheckedKeys().join(",");
          //调取接口
          //是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getRoleAdd(this.roleform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getRoleListAction();
              }
            });
          } else {
            //id编号，必填项  对数据进行编辑
            this.roleform.id = this.editid;
            // //调取添加接口
            getRoleEdit(this.roleform).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getRoleListAction();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  
};
</script>

<style lang="" scoped>
</style>
