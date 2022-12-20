<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="50" :src="headPhoto"></el-avatar>
      <!-- <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon> -->
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import headPhoto from '@/assets/headPhoto.jpg'
// import { ref } from 'vue'
// const squareUrl = ref('../assets/headPhoto.jpg')
import { useStore } from 'vuex'
const store = useStore()
const exit = () => {
  store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped>
::deep .el-dropdown-menu_item {
  white-space: nowrap;
}
</style>
