<template>
  <div @click="handleFullScreen" id="screenFull">
    <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount } from 'vue'
const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    // screenfull.request()
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }
}
// 我对钩子函数还不是很理解，就是这一段的逻辑
const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', changeIcon)
})
onBeforeMount(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
