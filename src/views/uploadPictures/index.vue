<template>
  <h1>分享你的图片吧!</h1>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="照片名称" prop="photoName">
      <el-input v-model="form.photoName" />
    </el-form-item>
    <el-form-item label="照片标签" prop="tags">
      <el-input v-model="form.tags" />
    </el-form-item>
    <el-form-item label="照片介绍" prop="introduction">
      <el-input
        v-model="form.introduction"
        maxlength="99"
        show-word-limit
        type="textarea"
      />
    </el-form-item>
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
      >上传图片信息</el-button
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
  photoName: '',
  tags: '',
  introduction: '',
  username: username1,
  fname: ''
})
const formRef = ref(null)
const onSubmit = () => {
  console.log(form.value)
  formRef.value.validate(async (valid) => {
    if (valid && uploadOK.value === true) {
      form.value.username = localStorage.getItem('username')
      store.dispatch('app/addPictureInfor', form.value)
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
const checkTags = (rule, value, callback) => {
  const tags1 = value.split(';')
  console.log(tags1)
  for (let i = 0; i < tags1.length; i++) {
    if (tags1[i].length <= 1 || tags1[i].length >= 6) {
      form.value.tags = ''
      callback(new Error('请用;分割标签,每个标签2--5个字'))
    }
  }
  callback()
}
const rules = ref({
  photoName: [
    {
      required: true,
      message: 'please input username',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 15,
      message: 'length should be 1 to 15',
      trigger: 'blur'
    }
  ],
  tags: [
    {
      required: true,
      message: 'please input password',
      trigger: 'blur'
    },
    {
      validator: checkTags,
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      required: false,
      message: 'please input password',
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
