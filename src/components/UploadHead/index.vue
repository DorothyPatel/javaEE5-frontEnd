<template>
  <el-upload
    :headers="headers"
    action="/api/permission/file/upload"
    :show-file-list="false"
    accept=".jpg,.png,.gif,.jpeg"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script setup>
// 引入loading
import { Loading } from 'element-ui'
let loadingInstance = null
export default {
  data() {
    return {
      // 设置上传的请求头部
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
  },
  props: {
    value: {
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  methods: {
    // 上传校验
    beforeAvatarUpload(file) {
      // loading加载
      loadingInstance = Loading.service(this.$store.state.LoadingoOptions)
      // 校验图片大小 2就是2M
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        // 上传失败,关闭loading
        loadingInstance.close()
      }
      return isLt2M
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code !== 200) {
        this.$message.error(res.message)
        return false
      }
      // 接口返回的图片传给父组件
      this.$emit('getValue', res.data)
      // 关闭loading加载
      loadingInstance.close()
      this.$message.success('上传成功')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
