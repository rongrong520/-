<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加轮播图':'编辑轮播图'"
      :visible.sync="isShow.dialogshow"
      center
    >
      <el-form :model="bannerForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="bannerForm.title"></el-input>
        </el-form-item>
        <!--action图片上传，如果有直接上传的服务器，直接写地址，没有写#-->
        <el-form-item  prop="img" label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-change="handleChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="bannerForm.status"
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
import {mapActions } from "vuex";
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util";
export default {
  data() {
    return {
      imgURL: "", //上传图片的地址
      fileList: [], //文件上传列表数组
      dialogVisible: false, //是否打开图片弹框
      dialogImageUrl: "", //图片地址
      editid: 0,
      formLabelWidth: "120px",
      bannerForm: {
        title: "", //商品名称
        img: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图标题", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    //获取商品列表
    this.getBannerListAction();
  },
  props: ["isShow"],
  methods: {
    //图片移除的钩子函数
    handleRemove(file, fileList) {
      // this.imgURL = "";
    },
    handlePreview(file) {
      console.log(file, "点击放大查看时回调的钩子函数");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件超出选择的提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当上传文件图片发生变化的时候触发的函数
    handleChange(file) {
      this.imgURL = file.raw;
    },
    reset() {
      //清空表单
      this.bannerForm= {
        title: "", //商品名称
        img: "",
        status: 1,
      },
      this.imgURL = "";
      //重置文件上传列表
      this.fileList = [];
      this.$refs['ruleForm'].clearValidate(this.rules)
      //子组件去修改父组件的弹框状态
      this.$emit("close", false);
    },
    //触发菜单列表的调取
    ...mapActions(["getBannerListAction"]),
    update(id) {
      this.editid = id;
      getBannerInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.bannerForm = res.list;
          //对图片进行二次转化title
          this.fileList = this.bannerForm.img ? [{ url: `${this.uploadHttp}${this.bannerForm.img}` }]: [];
          
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.bannerForm;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgURL);
          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getBannerAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getBannerListAction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑 FormData添加方式不能直接赋值要用append
            file.append("id", this.editid);
            if ((this.imgURL = "")) {
              file.append("img", this.bannerForm.img);
            }
            getBannerEdit(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getBannerListAction();
              } else {
                this.$message.error(res.msg);
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
