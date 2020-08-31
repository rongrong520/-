<template>
  <div>
    <el-table :data="get_MemberList" border>
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <!-- 状态是需要去判断的，而不是去写数字 -->
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button @click="edit(item.row.id)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted(){
    //页面一加载就获取菜单列表
    this.getMemberListAction();
  },
  computed: {
    ...mapGetters(["get_MemberList"]),
  },
  methods: {
    //获取菜单列表
    ...mapActions(["getMemberListAction"]),
    //获取当前数据的id
    edit(uid) {
      this.$emit("edit", {
        isAdd: false,
        uid,
      });
    },
  },
};
</script>

<style lang="" scoped>
.el-table {
  margin-top: 20px;
}
</style>
