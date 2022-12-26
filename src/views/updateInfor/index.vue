<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">用户信息修改</h3>
    </div>
    <el-form
      ref="formRef"
      :model="form"
      class="login-form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="newusername">
        <el-input v-model="form.newusername" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="男" />
          <el-radio label="女" />
          <el-radio label="保密" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在地" prop="locate">
        <linkage @getLawyerListInfo="handleData"></linkage>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="form.qq" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="自我介绍" prop="introduction">
        <el-input
          v-model="form.introduction"
          maxlength="99"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-button type="primary" class="login-button" @click="onSubmit"
        >注册信息提交</el-button
      >
    </el-form>
  </div>
  {{ form }}
</template>

<script setup>
import { ref } from 'vue'
// import router from '@/router'
import { useStore } from 'vuex'
import { checkUserName } from '@/api/register'
import { ElMessage } from 'element-plus'
// import uploadhead from '@/components/UploadHead'
import linkage from '@/components/SsqSelector/index.vue'
// do not use same name with ref
const store = useStore()
const form = ref({
  oldusername: localStorage.getItem('username'),
  newusername: localStorage.getItem('username'),
  gender: localStorage.getItem('gender'),
  province: localStorage.getItem('province'),
  city: localStorage.getItem('city'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  qq: localStorage.getItem('qq'),
  mobile: localStorage.getItem('mobile'),
  introduction: localStorage.getItem('introduction')
})
const formRef = ref(null)
const handleData = (event) => {
  if (event[1] === 'province') {
    form.value.province = event[0]
  }
  if (event[1] === 'city') {
    form.value.city = event[0]
  }
}
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid && form.value.province !== '' && form.value.city !== '') {
      store.dispatch('app/changeInformation', form.value)
    } else {
      checkLocation()
      console.log('error submit!!')
      return false
    }
  })
}
// const init = () => {}
const checkUsername = async (rule, value, callback) => {
  const res = await checkUserName(value)
  if (res.success === false) {
    if (value !== form.value.oldusername) {
      ElMessage({
        message: '您的用户名已经被使用或不符合规则，请重试',
        type: 'warning'
      })
      form.value.newusername = ''
    }
  }
}
const checkLocation = (rule, value, callback) => {
  if (form.value.province === '' || form.value.city === '') {
    ElMessage({
      message: '您的所在地未填写完整',
      type: 'warning'
    })
  }
}
const rules = ref({
  newusername: [
    {
      required: true,
      message: 'please input username',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 15,
      message: 'length should be 6 to 15',
      trigger: 'blur'
    },
    {
      validator: checkUsername,
      trigger: 'blur'
    }
  ],
  gender: [
    {
      required: true,
      message: 'please input password',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: false,
      message: 'please input username',
      trigger: 'blur'
    },
    {
      min: 0,
      max: 12,
      message: 'length should be 0 to 12',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: false,
      message: 'Please input email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  qq: [
    {
      required: false,
      message: 'please input username',
      trigger: 'blur'
    },
    {
      pattern: '^[1-9][0-9]{5,9}$',
      message: 'please input correct qq',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: false,
      message: 'Please input mobile',
      trigger: 'blur'
    },
    {
      pattern: '^1[345789][0-9]{9}$',
      message: 'please input correct phoneNumber',
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      required: false,
      message: 'Please input mobile',
      trigger: 'blur'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
