<template>
  <div>
    <el-table :data="get_GoodsList" border>
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片" width="220">
        <template slot-scope="item">
          <div>
            <img class="uploadimg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <el-tag v-if="item.row.ishot ==1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <!-- 状态是需要去判断的，而不是去写数字 -->
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" :label-width="formLabelWidth">
        <template slot-scope="item">
          <el-button
            type="primary"
            @click="update(item.row.id)"
            icon="el-icon-edit"
            size="small"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="del(item.row.id)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页视图 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageInfo.size"
      @current-change="getChange"
      @prev-click="prevInfo"
      @next-click="nextInfo"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import {
  getGoodsDel,
  getGoodsCount,
  getGoodsAdd,
  getGoodsEdit,
} from "../../util";
export default {
  data() {
    return {
      total: 0,
      formLabelWidth: "120px",
      pageInfo: {
        //分页信息
        size: 2, //查询条数
        page: 1, //页码数
      },
      changePage: 1,
    };
  },
  mounted() {
    //页面一加载调取总条数
    this.getCount();
    this.getGoodsListAction(this.pageInfo);
  },
  computed: {
    ...mapGetters(["get_GoodsList"]),
  },
  methods: {
    ...mapActions(["getGoodsListAction"]),
    //点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
        changePage: this.changePage,
      });
    },
    //删除数据
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getCount();
            } else {
              this.$message.error(res.msg);
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
    //获取总条数
    getCount() {
      getGoodsCount().then((res) => {
        if (res.code === 200) {
          this.total = res.list[0].total;
          //首先判断数组是不是只有一条数据并且它并不是第一页，如果是 page页面--
          if (this.pageInfo.page != 1 && this.get_SpecsList.length == 1) {
            this.pageInfo.page--;
          }
          this.getGoodsListAction(this.pageInfo);
        }
      });
    },
    //页面发生变化会调取当前方法
    getChange(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      //重新调取列表
      this.getGoodsListAction(this.pageInfo);
    },
    //上一页事件
    prevInfo(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      //重新调取列表
      this.getGoodsListAction(this.pageInfo);
    },
    //下一页事件
    nextInfo(n) {
      this.pageInfo.page = n;
      this.changePage = n;
      //重新调取列表
      this.getGoodsListAction(this.pageInfo);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 16px 0;
}
.uploadimg{
  width: 200px;
}
</style>
