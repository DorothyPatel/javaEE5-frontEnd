<template>
  <el-container class="app-wrapper">
    <el-aside class="sidebar-container">
      <Menu />
    </el-aside>
    <el-container class="container">
      <el-header><Headers /></el-header>
      <el-main><RouterView /></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import Menu from './Menu'
import Headers from './headers/index.vue'
// import variables from '@/styles/variables.scss'
// import { ref } from 'vue'
// const asideWidth = ref($sideBarWidth)
</script>

<style lang="scss" scoped>
.sidebar-container {
  background-color: cadetblue;
  width: $mySideBarWidth;
}
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $mySideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
