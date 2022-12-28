<template>
  <div>
    <div class="head">
      <div class="headPhoto">
        <img
          :src="require('@/assets/headPhoto.jpg')"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="headInfor">
        <div class="username">{{ username }}</div>
        <span class="location">{{ province }} {{ city }}</span>
        <div class="gender">{{ gender }}</div>
        <div class="introduction">个性签名:{{ introduction }}</div>
        <div class="guanzhu">
          <button @click="getConcernList">关注数: {{ concernnum }}</button>
        </div>
        <div class="fensi">
          <button @click="getFanList">粉丝数: {{ fansnum }}</button>
        </div>
        <el-dialog
          :model-value="dialogVisible"
          :title="dialogTitle"
          v-if="dialogVisible"
          width="40%"
          @close="handleClose"
        >
          <div v-for="item in nameList" :key="item">{{ item }}</div>
        </el-dialog>
      </div>
    </div>
    <div class="search">
      <el-col :span="7">
        <el-input
          placeholder="搜索图片名称"
          clearable
          v-model="form.message"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="getPicture"
        >{{ $t('table.search') }}
      </el-button>
    </div>
    <div class="body">
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
        <div class="picUser">照片作者：{{ item.username }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getFansNum,
  getConcernNum,
  getFansList,
  getConcernerList,
  getOriginPics,
  getSearchMyPicture
} from '@/api/users'
import { ref } from 'vue'
const username = localStorage.getItem('username')
const province = localStorage.getItem('province')
const city = localStorage.getItem('city')
const gender = localStorage.getItem('gender')
const introduction = localStorage.getItem('introduction')
const fansnum = ref(0)
const concernnum = ref(0)
const dialogVisible = ref(false)
const nameList = ref([])
const pictureList = ref([])
const dialogTitle = ref('')
const form = ref({
  message: '',
  username: username
})
const handleClose = () => {
  dialogVisible.value = false
}
const getFans = async () => {
  const res = await getFansNum(username)
  fansnum.value = res.data
}
const getConcern = async () => {
  const res = await getConcernNum(username)
  concernnum.value = res.data
}
const getFanList = async () => {
  nameList.value = []
  const res = await getFansList(username)
  for (let i = 0; i < res.data.length; i++) {
    nameList.value.push(res.data[i].username)
  }
  dialogTitle.value = '粉丝姓名'
  dialogVisible.value = true
}
const getConcernList = async () => {
  nameList.value = []
  const res = await getConcernerList(username)
  for (let i = 0; i < res.data.length; i++) {
    nameList.value.push(res.data[i].username)
  }
  dialogTitle.value = '关注博主的姓名'
  dialogVisible.value = true
}
const getOriginPic = async () => {
  pictureList.value = []
  const res = await getOriginPics(username)
  for (let i = 0; i < res.data.length; i++) {
    pictureList.value.push(res.data[i])
  }
}
const getPicture = async () => {
  pictureList.value = []
  if (form.value.message === '') getOriginPic()
  else {
    const res = await getSearchMyPicture(form.value)
    for (let i = 0; i < res.data.length; i++) {
      pictureList.value.push(res.data[i])
    }
  }
}
getFans()
getConcern()
getOriginPic()
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 200px;
  display: flex;
  // background-color: blue;
  border-bottom-style: dashed;
  border-bottom-color: blue;
}
.headPhoto {
  width: 20%;
  height: 100%;
  // background-color: aqua;
}
.headInfor {
  width: 70%;
  height: 100%;
  // background-color: antiquewhite;
  display: block;
}
.introduction {
  border-style: ridge;
}
.search {
  height: 40px;
  width: 100%;
  border-bottom-color: blue;
  border-bottom-style: double;
}
.body {
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
</style>
