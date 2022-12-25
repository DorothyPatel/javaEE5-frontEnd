<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">用户注册</h3>
    </div>
    <el-form
      ref="formRef"
      :model="form"
      class="login-form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="againPassword">
        <el-input v-model="form.againPassword" type="password" />
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
      <!-- <el-form-item prop="headPhoto" label="上传头像" v-loading="loading">
        <el-upload
          class="upload-demo"
          :limit="1"
          action="/api/v1/upload/file"
          name="multipartFile"
          :on-success="uploadSucceed"
          :on-error="uploadError"
          :file-list="fileList"
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
        </div> -->
      <!-- </el-form-item> -->
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
      <el-button type="info" class="login-button" @click="handleRegister"
        >返回登录界面</el-button
      >
    </el-form>
  </div>
  {{ form }}
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import { checkUserName } from '@/api/register'
import { ElMessage } from 'element-plus'
// import uploadhead from '@/components/UploadHead'
import linkage from '@/components/SsqSelector/index.vue'
// do not use same name with ref
const store = useStore()
const form = ref({
  username: '',
  password: '',
  againPassword: '',
  gender: '',
  province: '',
  city: '',
  name: '',
  email: '',
  qq: '',
  mobile: '',
  introduction: ''
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
const handleRegister = () => {
  router.replace('/login')
}
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid && form.value.province !== '' && form.value.city !== '') {
      store.dispatch('app/register', form.value)
    } else {
      checkLocation()
      console.log('error submit!!')
      return false
    }
  })
}
const checkUsername = async (rule, value, callback) => {
  console.log(value)
  const res = await checkUserName(value)
  console.log(res)
  if (res.success === false) {
    ElMessage({
      message: '您的用户名已经被使用或不符合规则，请重试',
      type: 'warning'
    })
    form.value.username = ''
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
const repasswordValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
const rules = ref({
  username: [
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
  password: [
    {
      required: true,
      message: 'please input password',
      trigger: 'blur'
    },
    {
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,15}$',
      message:
        'please input correct password,must have letter and must have number',
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
  againPassword: [
    {
      required: true,
      message: 'please input againPassword',
      trigger: 'blur'
    },
    {
      validator: repasswordValidator,
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
      pattern: '^[1-9][0-9]{4,12}$',
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
  headPhoto: [
    {
      required: false,
      message: 'Please input mobile',
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    margin-top: -30px;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
      margin-left: 0;
      margin-bottom: 10px;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 0 auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
