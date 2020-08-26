<template>
  <div>
    <vnav></vnav>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
import    vnav from "../comnon/nav";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    vnav,
  },
};
</script>
<style >
</style>