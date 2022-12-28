<template>
  <div class="body">
    <div class="searchArea">
      <el-form
        ref="formRef"
        :model="form"
        class="login-form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="搜索吧！" prop="message">
          <el-col :span="14">
            <el-input
              placeholder="搜索......"
              clearable
              v-model="form.message"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="搜索类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="按名字搜索图片" />
            <el-radio label="按标签搜索图片" />
            <el-radio label="按用户搜索图片" />
          </el-radio-group>
        </el-form-item>
        <el-button
          style="margin-left: 50px"
          type="primary"
          :icon="Search"
          @click="onSubmit"
          >搜索
        </el-button>
      </el-form>
    </div>
    <div class="showSearchData">
      <el-card class="elCardBody">
        <h2>搜索结果(默认展示关注的用户图片)</h2>
        <div class="picBlock" v-for="item in pictureList" :key="item">
          <!-- <div style="width: 40px; height: 40px"><img :src="item.fname" /></div> -->
          <!-- :src="require('@/assets/headPhoto.jpg')" -->
          <div>
            <el-image
              style="width: 90%; height: 150px"
              :src="require('@/assets/headPhoto.jpg')"
            />
          </div>
          <div class="picName">照片名：{{ item.name }}</div>
          <div class="picIntro">照片介绍：{{ item.intro }}</div>
          <div class="picUser">
            <button class="button" @click="showUserPage(item.username)">
              照片作者：{{ item.username }}
            </button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="latestArea">
      <el-card>
        <h2>最近发布</h2>
        <div class="picBlock" v-for="item in latestPictureList" :key="item">
          <!-- <div style="width: 40px; height: 40px"><img :src="item.fname" /></div> -->
          <!-- :src="require('@/assets/headPhoto.jpg')" -->
          <div>
            <el-image
              style="width: 90%; height: 150px"
              :src="require('@/assets/headPhoto.jpg')"
            />
          </div>
          <div class="picName">照片名：{{ item.name }}</div>
          <div class="picIntro">照片介绍：{{ item.intro }}</div>
          <div class="picUser">
            <button class="button" @click="showUserPage(item.username)">
              照片作者：{{ item.username }}
            </button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {
  getOriginPicsTime,
  getSearchPicture,
  getAllOriginPics,
  getSearchTagsPicture,
  getSearchUsersPicture
} from '@/api/users'
import { ref } from 'vue'
import router from '@/router'
const form = ref({
  message: '',
  type: '按名字搜索图片'
})
// const queryForm = ref({
//   query: '',
//   pagenum: 1,
//   pagesize: 8
// })
const username = localStorage.getItem('username')
const pictureList = ref([])
const latestPictureList = ref([])
const total = ref(0)
const onSubmit = async () => {
  pictureList.value = []
  if (form.value.message === '') {
    await getAllsOriginPic()
  } else {
    if (form.value.type === '按名字搜索图片') {
      await getSearchPictures()
    } else if (form.value.type === '按标签搜索图片') {
      await getTagsPicture()
    } else if (form.value.type === '按用户搜索图片') {
      await getUsersPicture()
    }
  }
}
const getAllsOriginPic = async () => {
  pictureList.value = []
  const res = await getAllOriginPics(username)
  for (let i = 0; i < res.data.length; i++) {
    pictureList.value.push(res.data[i])
  }
}
const getTagsPicture = async () => {
  pictureList.value = []
  const res = await getSearchTagsPicture(form.value.message)
  for (let i = 0; i < res.data.length; i++) {
    pictureList.value.push(res.data[i])
  }
}
const getUsersPicture = async () => {
  pictureList.value = []
  const res = await getSearchUsersPicture(form.value.message)
  for (let i = 0; i < res.data.length; i++) {
    pictureList.value.push(res.data[i])
  }
}
const getSearchPictures = async () => {
  pictureList.value = []
  const res = await getSearchPicture(form.value.message)
  for (let i = 0; i < res.data.length; i++) {
    pictureList.value.push(res.data[i])
  }
}
const getOriginPicByTime = async () => {
  total.value = 0
  latestPictureList.value = []
  const res = await getOriginPicsTime()
  for (let i = 0; i < res.data.length; i++) {
    latestPictureList.value.push(res.data[i])
    total.value = total.value + 1
  }
}
const showUserPage = (queryName) => {
  if (queryName === username) router.replace({ name: 'myhome' })
  else {
    localStorage.setItem('queryName', queryName)
    router.replace({ name: 'otherhome' })
  }
}
getAllsOriginPic()
getOriginPicByTime()
</script>

<style lang="scss" scoped>
.elCardBody {
  width: 100%;
  height: auto;
}
.picBlock {
  float: left;
  height: 250px;
  width: 250px;
  margin-right: calc(20% - 240px);
  margin-bottom: 5px;
  margin-top: 5px;
}
.button:hover {
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px #888888;
}
</style>
