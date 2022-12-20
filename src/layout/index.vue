<template>
  <el-container id="container1" class="app-container">
    <el-aside class="sidebar-container" :width="asideWidth">
      <Menu />
    </el-aside>
    <el-container
      class="container"
      :class="{ hidderContainer: !$store.getters.siderType }"
    >
      <el-header><Headers /></el-header>
      <el-main><RouterView /></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import Menu from './Menu'
import Headers from './headers/index.vue'
// import variables from '@/styles/variables.scss'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const asideWidth = computed(() => {
  return store.getters.siderType ? '210px' : '67px'
})
// const backcolor = ref(variables.menuBg1)
</script>

<style lang="scss" scoped>
// #container1 {
//   background-color: '#db70db';
// }
.sidebar-container {
  height: 100%;
  background-color: '#db70db';
}
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - 210px); //calc(100% - $mySideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - 67px); //calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
