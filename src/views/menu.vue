<template>
  <div>
    <!-- 面包屑 -->
    <elbread></elbread>
    <!-- 添加按钮 -->
    <el-button @click="open" type="primary" plain size="mini">添加</el-button>
    <!-- 表格 -->
    <!-- 
      table表格  
      row-key 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
      default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
      tree-props	渲染嵌套数据的配置选项
    -->
    <el-table :data="get_MenuList" border row-key="id" default-expand-all :tree-props="{children: 'children'}">>
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <!-- 状态是需要去判断的，而不是去写数字 -->
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button
            @click="edit(item.row.id)"
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
          ></el-button>
          <el-button
            @click="del(item.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框弹出 -->
    <el-dialog
      :before-close="reset"
      :title="isAdd ?'添加菜单':'编辑菜单'"
      :visible.sync="dialogshow"
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
        <el-form-item v-if='menuform.type==1' label="菜单图标">
          <el-input  v-model="menuform.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if='menuform.type==2' label="菜单地址">
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
import {
  getMenuAdd,
  getMenuList,
  getMenuInfo,
  getMenuEdit,
  getMenuDel,
} from "../util";
import elbread from "../components/elbread";

export default {
  data() {
    return {
      editid: 0, //编辑删除用
      isAdd: true,
      menuform: {
        title: "", //菜单名称
        pid: 0, //上级菜单
        type: 1,
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
        icon: "", //菜单图标
      },
      dialogshow: false, //控制对话框的显示隐藏
      // tableData: [],
      //表单验证(根据产品需求定制)
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  mounted() {
    //页面一加载就获取菜单列表
    // this.getMenuListAction()();
    this.getMenuListAction()
  },
  computed: {
    ...mapGetters(['get_MenuList'])
  },
  methods: {
    //打开弹框事件
    open() {
      this.isAdd = true;
      this.dialogshow = true;
    },
    //编辑事件
    edit(id) {
      this.editid = id;
      //更改isAdd的状态
      this.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        // console.log(res, "数据");
        if (res.code == 200) {
          this.dialogshow = true;
          this.menuform = res.list;
        }
      });
    },
    //删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getMenuDel({id}).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表
                this.getMenuListAction()
            }else{
              this.$message.error(res.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取菜单列表
    ...mapActions(['getMenuListAction']),
    // get_menu_list() {
    //   getMenuList().then((res) => {
       
    //     if (res.code == 200) {
    //       this.tableData = res.list;
    //     }
    //   });
    // },
    reset() {
      this.menuform = {
        title: "",
        pid: 0,
        type: 1,
        url: "",
        status: 1,
        icon: "",
      };
      this.dialogshow = false;
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
          if (this.isAdd) {
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
            this.menuform.id = this.editid;
            //调取接口
            getMenuEdit(data).then((res) => {
              console.log(res, "添加结果");
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
  components: {
    elbread,
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
