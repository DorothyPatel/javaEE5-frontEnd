<template>
  <h1>修改头像!</h1>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="上传图片" v-loading="loading">
      <el-upload
        class="upload-demo"
        :data="username1"
        :limit="1"
        action="/api/main/addPicture"
        :on-success="uploadSucceed"
        :on-error="uploadError"
        list-type="picture"
        :before-upload="beforeUpload"
        :on-remove="fileRemoved"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
        ref="upload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="el-upload__tip">
        图片尺寸:600*200,图片5MB以内,图片格式支持JPG、JPEG、PNG
      </div>
    </el-form-item>
    <el-button type="primary" class="login-button" @click="onSubmit"
      >修改头像</el-button
    >
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()
const username1 = store.getters.username

const uploadOK = ref(false)
const form = ref({
  username: username1,
  fname: ''
})
const formRef = ref(null)
const onSubmit = () => {
  console.log(form.value)
  formRef.value.validate(async (valid) => {
    if (valid && uploadOK.value === true) {
      form.value.username = localStorage.getItem('username')
      store.dispatch('app/updateHeadInfor', form.value)
    } else {
      if (uploadOK.value === false) {
        ElMessage({
          message: '您还未上传图片',
          type: 'warning'
        })
      }
      console.log('error submit!!')
      return false
    }
  })
}
const uploadSucceed = (res) => {
  console.log(res)
  form.value.fname = res.data
  console.log(form.value)
  uploadOK.value = true
  console.log('success')
}
const beforeUpload = () => {}
const fileRemoved = () => {
  console.log('file removed')
  uploadOK.value = false
}
const uploadError = () => {
  console.log('fail')
  ElMessage({
    message: '您的图片过于大，或者超出了数量限制,或者类型不匹配',
    type: 'warning'
  })
}
</script>

<style lang="scss" scoped></style>
