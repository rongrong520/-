<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加商品分类':'编辑商品分类'"
      :visible.sync="isShow.dialogshow"
      center
    >
      <el-form :model="cateForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="cateForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="catename" label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="cateForm.catename"></el-input>
        </el-form-item>
        <!--action图片上传，如果有直接上传的服务器，直接写地址，没有写#-->
        <el-form-item v-if="cateForm.pid !=0" prop="img" label="图片" :label-width="formLabelWidth">
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
            v-model="cateForm.status"
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
import { mapGetters, mapActions } from "vuex";
import { getCateAdd, getCateInfo, getCateEdit } from "../../util";
export default {
  data() {
    return {
      imgURL: "", //上传图片的地址
      fileList: [], //文件上传列表数组
      dialogVisible: false, //是否打开图片弹框
      dialogImageUrl: "", //图片地址
      defaultChecked: [], //默认勾选的key
      editid: 0,
      formLabelWidth: "120px",
      cateForm: {
        pid: 0, //上级分类编号
        catename: "", //商品名称
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择商品分类", trigger: "change" }],
        catename: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    //获取商品列表
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_CateList"]),
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
      this.cateForm = {
        pid: 0, //上级分类编号
        catename: "", //商品名称
        img: "",
        status: 1,
      };
      this.imgURL = "";
      //重置文件上传列表
      this.fileList = [];
      //子组件去修改父组件的弹框状态 
      this.$emit("close", false);
    },
    //触发菜单列表的调取
    ...mapActions(["getCateListAction"]),
    update(id) {
      this.editid = id;
      getCateInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.cateForm = res.list;
          //对图片进行二次转化catename
          this.fileList = this.cateForm.img ? [{ url: `${this.uploadHttp}${this.cateForm.img}` }]: [];
          // if (this.imgURL == "" && this.catename == "") {
          //   this.img = this.cateForm.img;
          // }
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.cateForm;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgURL);
          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getCateAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getCateListAction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑 FormData添加方式不能直接赋值要用append
            file.append("id", this.editid);
            if ((this.imgURL = "")) {
              file.append("img", this.cateForm.img);
            }
            // console.log(this.fileList);
            // console.log(this.cateForm.img,'按时');
            // console.log(this.imgURL,'wwdw');
            getCateEdit(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getCateListAction();
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
