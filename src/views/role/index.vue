<template>
  <div>
    <elbread></elbread>
    <el-button type="primary" plain size="mini" @click="open">添加</el-button>
    <!-- 表格渲染 -->
    <elrole @update='update'></elrole>
    <!-- 弹框渲染 -->
    <vadd ref="vadd" :isShow="son" @close='close'></vadd>
  </div>
</template>

<script>
//引入面包屑
import elbread from "../../components/elbread";
import elrole from "./list";
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
    elrole,
    vadd,
  },
  methods: {
    open() {
      this.son.isAdd = true;
      this.son.dialogshow = true;
    },
    //关闭弹框
    close(e) {
      this.son.dialogshow = e;
    },
    update(e){
      this.son.isAdd = e.isAdd
      this.son.dialogshow = true;
      this.$refs.vadd.update(e.id)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
