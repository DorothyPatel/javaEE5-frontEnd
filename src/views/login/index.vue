<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">{{ $t('login.title') }}</h3>
    </div>
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <el-form-item prop="name">
        <!-- <el-icon :size="20" class="svg-container">
          <Edit />
        </el-icon> -->
        <svg-icon icon="user" class="svg-container"></svg-icon>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- <el-icon :size="20" class="svg-container">
          <Edit />
        </el-icon> -->
        <svg-icon icon="password" class="svg-container"></svg-icon>
        <el-input v-model="form.password" :type="passwordType"></el-input>
        <svg-icon
          icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          @click="changeType"
        ></svg-icon>
      </el-form-item>
      <el-button type="primary" class="login-button" @click="handleLogin">{{
        $t('login.btnTitle')
      }}</el-button>
      <el-button type="info" class="login-button" @click="handleRegister">{{
        $t('login.switch')
      }}</el-button>
    </el-form>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useStore } from 'vuex'
// import { Edit } from '@element-plus/icons-vue'
// import { login } from '@/api/login'
const store = useStore()
const form = ref({
  name: '',
  password: ''
})
const rules = ref({
  name: [
    {
      required: true,
      message: 'please input Activity name',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'please input Activity password',
      trigger: 'blur'
    }
  ]
})
const formRef = ref(null)
const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      store.dispatch('app/login', form.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const handleRegister = () => {
  router.replace('/register')
}
const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
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
    margin-top: 40px;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0px;
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
      margin-bottom: 20px;
      margin-left: 0;
    }
    .register-button {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 20px;
      margin-left: 0;
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
      margin: 0px auto 40px auto;
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
