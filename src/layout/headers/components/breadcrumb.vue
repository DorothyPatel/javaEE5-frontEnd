<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="noRedirect" v-if="index === breadcrumbList.length - 1">{{
        $t(`menus.${item.name}`)
      }}</span>
      <span class="Redirect" v-else @click="handleRedirect(item.path)">{{
        $t(`menus.${item.name}`)
      }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
// 获取到当前路由的完整路由表
import { useRoute, useRouter } from 'vue-router'
// 每次点击的时候，进行更新路由表的操作，所以要监听。
import { watch, ref } from 'vue'
// import { variables } from '@/styles/element/var'
const route = useRoute()
const router = useRouter()
console.log(route.matched)
const breadcrumbList = ref([])
const initBreadCrumbList = () => {
  breadcrumbList.value = route.matched
  console.log(route.matched)
}
watch(
  route,
  () => {
    initBreadCrumbList()
  },
  { deep: true, immediate: true }
)
const handleRedirect = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.noRedirect {
  color: #97a8be;
  cursor: text;
}
.Redirect {
  color: #666;
  font-weight: 600px;
  cursor: pointer;
  &.hover {
    color: #304156;
  }
}
</style>
