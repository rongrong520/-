<template>
  <div>
    <el-dialog
      :before-close="reset"
      :title="isShow.isAdd ?'添加限时秒杀':'编辑限时秒杀'"
      :visible.sync="isShow.dialogshow"
      center
    >
      <el-form :model="seckForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="seckForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="first_cateid" label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="seckForm.first_cateid" @change="changeFristid()">
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
          <el-select v-model="seckForm.second_cateid" @change="changeGoods()">
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
        <el-form-item prop="goodsid" label="商品" :label-width="formLabelWidth">
          <el-select v-model="seckForm.goodsid">
            <option value label="请选择" disable></option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seckForm.status"
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
import {getGoodsList, getSeckAdd, getSeckInfo, getSeckEdit } from "../../util";
export default {
  data() {
    return {
      timer: "",
      editid: 0,
      formLabelWidth: "120px",
      seckForm: {
       title:'',//限时秒杀名称
       begintime:'',//开始时间
       endtime:'',//结束时间
       first_cateid:'',//商品一级分类编号
       second_cateid:'',//商品二级分类编号
       goodsid:'',//商品编号
        status: 1,
      },
      secondCate:[],//二级分类
      goodsArr:[],//商品数组
      rules: {
        title: [
          { required: true, message: "请输入限时秒杀名称", trigger: "blur" },
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
    //一级分类触发事件
    changeFristid(n){
      // console.log(n);
    let index = this.get_CateList.findIndex((item)=>{
        // console.log(item,'1111');
        return item.id == this.seckForm.first_cateid
      })
      // console.log(index,'1111');
      this.secondCate = this.get_CateList[index].children
      // console.log(this.secondCate);
      if(!n){
        this.seckForm.second_cateid = ''
        this.seckForm.goodsid = "";
      }
    },

    changeGoods(n) {
      getGoodsList({
        fid: this.seckForm.first_cateid,
        sid: this.seckForm.second_cateid,
      }).then((res) => {
        if (res.code === 200) {
          this.goodsArr = res.list;
        }
      });
      //如果参数n 不是true 清空双向数据绑定(切断的是二级和三级的联动)
      if (!n) {
        this.seckForm.goodsid = "";
      }
    },
    reset() {
      //清空表单
      this.seckForm = {
       title:"",//限时秒杀名称
       begintime:'',//开始时间
       endtime:'',//结束时间
       first_cateid:'',//商品一级分类编号
       second_cateid:'',//商品二级分类编号
       goodsid:'',//商品编号
        status: 1,
      },
      this.imgURL = "";
      //重置日期插件
      this.timer = [];
      //子组件去修改父组件的弹框状态
      this.$emit("close", false);
    },
    //触发菜单列表的调取
    ...mapActions(["getCateListAction","getSeckListAction"]),
    update(id) {
      this.editid = id;
      getSeckInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.seckForm = res.list;
          
         this.timer = [
            new Date(parseFloat(this.seckForm.begintime)),
            new Date(parseFloat(this.seckForm.endtime)),
          ];
          this.changeFristid(true);
          this.changeGoods(true);
        }
      });
    },
    //添加表单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //开始时间
          this.seckForm.begintime = new Date(this.timer[0]).getTime();
          //结束时间
          this.seckForm.endtime = new Date(this.timer[1]).getTime();
          // 调取接口
          // 是否调取新增事件还是编辑事件
          if (this.isShow.isAdd) {
            //调取添加接口
            getSeckAdd(this.seckForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getSeckListAction();
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            //id用户编号，必填项  对数据进行编辑 
            this.seckForm.id = this.editid
            
            getSeckEdit(this.seckForm).then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
                //关闭弹框并清空
                this.reset();
                //重新调取列表
                this.getSeckListAction();
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
