<template>
  <div>
    <elbread></elbread>
    <div>
      <el-button type="primary" plain size="mini" @click="open">添加</el-button>
    </div>
    <!-- 表格渲染 -->
    <elcate  @update="update"></elcate>
    <!-- 弹框渲染 -->
    <vadd ref="vadd" :isShow="son" @close="close"></vadd>
  </div>
</template>

<script>
//引入面包屑
import elbread from "../../components/elbread";
import elcate from "./list";
import vadd from "./add";
export default {
  data() {
    return {
      son: {
        isAdd: true,
        dialogshow: false, //控制对话框的显示隐藏
      },
    };
  },
  components: {
    elbread,
    elcate,
    vadd,
  },
  methods: {
    //打开弹框
    open() {
      this.son.isAdd = true;
      this.son.dialogshow = true;
    },
    //关闭弹框
    close(e) {
      this.son.dialogshow = e;
    },
    update(e) {
      this.son.isAdd = e.isAdd;
      this.son.dialogshow = true;
      this.$refs.vadd.update(e.id)
    },
  },
};
</script>

<style lang="" scoped>
.el-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>