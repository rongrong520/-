<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import login from './pages/login'
import index from './pages/index'
export default {
    components:{
      login,
      index
    }
}
</script>

<style>

</style>
