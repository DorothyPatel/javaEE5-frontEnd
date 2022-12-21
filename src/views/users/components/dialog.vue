<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <template #footer>
      <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          v-if="dialogTitle === '添加用户'"
        >
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// import { trigger } from '@vue/reactivity'
import { defineEmits, ref, defineProps, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
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
  username: '',
  password: '',
  email: '',
  mobile: ''
})
const formRef = ref(null)

const rules = ref({
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    {
      required: true,
      message: 'Please input mobile',
      trigger: 'blur'
    },
    {
      pattern: '^1[345789][0-9]{9}$',
      message: 'please input correct phoneNumber',
      trigger: 'blur'
    }
  ]
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
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      ElMessage({
        message: i18n.global.t('message.updateSuccess'),
        type: 'success'
      })
      emits('initUserList')
      handleClose()
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped></style>
