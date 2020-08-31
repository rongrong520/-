<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加商品管理':'编辑商品管理'"
      :visible.sync="isShow.dialogshow"
      center
      @opened='createEditor'
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="first_cateid" label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="goodsForm.first_cateid" @change="changeFristid()">
            <option value label="---请选择---" disable></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in get_CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="second_cateid" label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="goodsForm.second_cateid">
            <option value label="请选择" disable></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsname" label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="market_price" label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
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
        <el-form-item prop="specsid" label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="goodsForm.specsid" @change="changeSpecsid()">
            <option value label="请选择" disable></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in  get_SpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
           
          </el-select>
        </el-form-item>
        <el-form-item prop="specsattr" label="规格属性" :label-width="formLabelWidth">
          <!-- multiple是否多选 -->
          <el-select v-model="goodsForm.specsattr" multiple >
            <option value label="请选择" disable></option>
            <!-- 动态数据 -->
             <el-option
              v-for="item in  specsattrs"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="是否新品">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="editor" >

          </div>
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
//引入富文本
import E from 'wangeditor'
import { mapGetters, mapActions } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util";
export default {
  data() {
    return {
      editor:null,//富文本标识
      specsattrs:[],//规格属性
      secondCate:[],//二级分类
      imgURL: "", //上传图片的地址
      fileList: [], //文件上传列表数组
      dialogVisible: false, //是否打开图片弹框
      dialogImageUrl: "", //图片地址
      editid: 0,
      changePage: 1,
      formLabelWidth: "120px", //默认勾选的key
      goodsForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品管理编号
        specsattr: "", //商品管理属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //获取分类列表
    this.getCateListAction();
    //获取规格列表
    this.getSpecsListAction()
  },
  computed: {
    ...mapGetters(["get_CateList",'get_SpecsList']),
  },
  props: ["isShow"],
  methods: {
    //创建富文本
    createEditor(){
      //创建并打开富文本opened
      //实例化
    this.editor = new E('#editor')
    //创建
    this.editor.create()
    //描述信息
    this.editor.txt.html(this.goodsForm.description)
    },
    //一级分类触发事件
    changeFristid(n){
      // console.log(n);
    let index = this.get_CateList.findIndex((item)=>{
        // console.log(item,'1111');
        return item.id == this.goodsForm.first_cateid
      })
      // console.log(index,'1111');
      this.secondCate = this.get_CateList[index].children
      // console.log(this.secondCate);
      if(!n){
        this.goodsForm.second_cateid = ''
      }
    },
  //选择规格触发事件
    changeSpecsid(n){
      let index = this.get_SpecsList.findIndex((item)=>{
        // console.log(item,'1111');
        return item.id == this.goodsForm.specsid
      })
      // console.log(index,'1111');
      this.specsattrs = this.get_SpecsList[index].attrs
      // console.log(this.secondCate);
      if(!n){
        this.goodsForm.specsattr = []
      }
      console.log(this.goodsForm.specsattr);
    },
    //图片移除的钩子函数
    handleRemove(file, fileList) {
      this.imgURL = "";
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
      //清空表单信息
      this.goodsForm = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品管理编号
        specsattr: "", //商品管理属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1,
      },
        this.specsArr = [
          {
            value: "",
          },
        ];
        //清空富文本编辑器
        this.editor.txt.html('')
       //描述信息
    // this.editor.txt.html(this.goodsForm.description)
        //重置文件上传列表
      this.fileList = [];
       
      //子组件去修改父组件的弹框状态
      this.$emit("close", false);
    },
    //触发菜单列表的调取
    ...mapActions(["getCateListAction", "getSpecsListAction",'getGoodsListAction']),
    update(id, changePage) {
      this.editid = id;
      this.changePage = changePage;
      getGoodsInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.goodsForm = res.list;
          this.goodsForm.specsattr = this.goodsForm.specsattr ? this.goodsForm.specsattr.split(','):[]
            //对图片进行二次转化catename
          this.fileList = this.goodsForm.img ? [{ url: `${this.uploadHttp}${this.goodsForm.img}` }]: [];
          //数据二次转化调用一级change事件，不让二级置空
          this.changeFristid(true)
          this.changeSpecsid(true)
           
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取接口
          this.goodsForm.specsattr = this.goodsForm.specsattr ? this.goodsForm.specsattr.join(','):[]
         //获取富文本内容
         this.goodsForm.description = this.editor.txt.html()
         //调用formdata
         let data = this.goodsForm
         let file = new FormData()
         for(let i in data){
           file.append(i,data[i])
         }
         console.log(this.goodsForm,'信息');
          
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //整理图片格式imgURL
            file.append('img',this.imgURL)
            //调取添加接口
            getGoodsAdd(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.isShow.getCount();
              }
            });
          } else {
            //uid用户编号，必填项  对数据进行编辑
            file.append('id',this.editid)
            // //调取添加接口
            getGoodsEdit(file).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getGoodsListAction({
                  size: 2,
                  page: this.changePage,
                });
                
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
