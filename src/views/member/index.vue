<template>
  <div>
    <!-- 面包屑 -->
    <elbread></elbread>
    <!-- 渲染表格 -->
    <list @edit="edit"></list>
    <!-- 对话框弹出 -->
    <vDialog ref="vDialog" :isShow="son" @close="close"></vDialog>
  </div>
</template>

<script>
import elbread from "../../components/elbread";
import list from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      son: {
        isAdd: true,
        dialogshow: false, //控制对话框的显示隐藏
      },
    };
  },

  methods: {
    //关闭弹框
    close(e) {
      this.son.dialogshow = e;
    },
    //编辑事件
    edit(e) {
      this.son.isAdd = e.isAdd;
      this.son.dialogshow = true;
      this.$refs.vDialog.update(e.uid);
    },
   
  },
  components: {
    elbread,
    list,
    vDialog,
  },
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
