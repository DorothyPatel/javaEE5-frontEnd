<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">修改密码</h3>
    </div>
    <el-form
      ref="formRef"
      :model="form"
      class="login-form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="请输入原密码" prop="oldpassword">
        <el-input v-model="form.oldpassword" />
      </el-form-item>
      <el-form-item label="请输入新密码" prop="newpassword">
        <el-input v-model="form.newpassword" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="againPassword">
        <el-input v-model="form.againPassword" type="password" />
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
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
// import uploadhead from '@/components/UploadHead'
// do not use same name with ref
const store = useStore()
const form = ref({
  oldpassword: '',
  newpassword: '',
  againPassword: ''
})
const finForm = ref({
  username: '',
  password: ''
})
const formRef = ref(null)
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      finForm.value.username = localStorage.getItem('username')
      finForm.value.password = form.value.newpassword
      store.dispatch('app/changePassword', finForm.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const checkPassord = async (rule, value, callback) => {
  const localpassword = localStorage.getItem('password')
  console.log(localpassword)
  if (localpassword !== value) {
    ElMessage({
      message: '您的旧密码不正确，请重新输入',
      type: 'error'
    })
    form.value.oldpassword = ''
  }
}
const repasswordValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.newpassword) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = ref({
  oldpassword: [
    {
      required: true,
      message: 'please input oldpassword',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 15,
      message: 'length should be 6 to 15',
      trigger: 'blur'
    },
    {
      validator: checkPassord,
      trigger: 'blur'
    }
  ],
  newpassword: [
    {
      required: true,
      message: 'please input newpassword',
      trigger: 'blur'
    },
    {
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,15}$',
      message:
        'please input correct password,must have letter and must have number',
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
  ]
})
</script>

<style lang="scss" scoped>
// $bg: #2d3a4b;
// $dark_gray: #889aa4;
// $light_gray: #eee;
// $cursor: #fff;

// .login-container {
//   min-height: 100%;
//   width: 100%;
//   background-color: $bg;
//   overflow: hidden;

//   .login-form {
//     margin-top: -30px;
//     position: relative;
//     width: 520px;
//     max-width: 100%;
//     padding: 160px 35px 0;
//     margin: 0 auto;
//     overflow: hidden;

//     ::v-deep .el-form-item {
//       border: 1px solid rgba(255, 255, 255, 0.1);
//       background: rgba(0, 0, 0, 0.1);
//       border-radius: 5px;
//       color: #454545;
//     }

//     ::v-deep .el-input {
//       display: inline-block;
//       height: 47px;
//       width: 85%;

//       input {
//         background: transparent;
//         border: 0px;
//         -webkit-appearance: none;
//         border-radius: 0px;
//         padding: 12px 5px 12px 15px;
//         color: $light_gray;
//         height: 47px;
//         caret-color: $cursor;
//       }
//     }
//     .login-button {
//       width: 100%;
//       box-sizing: border-box;
//       margin-left: 0;
//       margin-bottom: 10px;
//     }
//   }

//   .tips {
//     font-size: 16px;
//     line-height: 28px;
//     color: #fff;
//     margin-bottom: 10px;

//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     display: inline-block;
//   }

//   .title-container {
//     position: relative;

//     .title {
//       font-size: 26px;
//       color: $light_gray;
//       margin: 0px auto 0 auto;
//       text-align: center;
//       font-weight: bold;
//     }

//     ::v-deep .lang-select {
//       position: absolute;
//       top: 4px;
//       right: 0;
//       background-color: white;
//       font-size: 22px;
//       padding: 4px;
//       border-radius: 4px;
//       cursor: pointer;
//     }
//   }

//   .show-pwd {
//     // position: absolute;
//     // right: 10px;
//     // top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }
// }
</style>
