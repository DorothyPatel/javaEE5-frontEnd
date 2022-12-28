<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
  </el-dialog>
</template>

<script setup>
// import { trigger } from '@vue/reactivity'
import { defineEmits, ref, defineProps, watch } from 'vue'
const props = defineProps({
  dialogTitle: {
    title: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {
      // this is a notw
    }
  }
})
const form = ref({
  username: ''
})

// 监听dialogTableValue的值的改变
watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)
const emits = defineEmits(['update:modelValue', 'initUserList'])
const handleClose = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
