<template>
 <div>
<h1>欢迎光临</h1>
 </div>
</template>

<script>
export default {
 data() {
 return {

 };
 },
 mounted() {
    //组件一加载就渲染折线图
    //初始化
    // let myChart = this.$eh.init(document.getElementById("con"));
    // //创建配置项
    // let option = {
    //   xAxis: {
    //     type: "category",
    //     data: ["周一", "周二", "周三", "周四", "周五"],
    //   },
    //   yAxis: {
    //     type: "value",
    //   },
    //   series: [
    //     //data替换成后端的数据
    //     {
    //       data: [77, 119, 220, 106, 50],
    //       type: "line",
    //     },
    //   ],
    // };
    // // 设置配置项
    // myChart.setOption(option)
  },
};
</script>

<style lang="" scoped>

</style>
