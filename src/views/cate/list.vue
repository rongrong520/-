<template>
  <div>
    <el-table 
    :data="get_CateList"
     border 
     row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="item">
          <div>
            <img class="uploadimg" :src="item.row.img? uploadHttp+item.row.img : ''" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" >
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import { getCateDel} from "../../util";
export default {
  data() {
    return {
      formLabelWidth: "120px",
    };
  },
  mounted() {
    //页面一加载调取
    this.getCateListAction();
  },
  computed: {
    ...mapGetters(["get_CateList"]),
  },
  methods: {
    ...mapActions(["getCateListAction"]),
    //点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
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
          getCateDel({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
              this.getCateListAction();
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
