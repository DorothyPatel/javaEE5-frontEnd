<template>
  <el-menu
    id="menu1"
    background-color="#db70db"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
      background-color="#f4f4f5"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <!-- <span>{{ item.authName }}</span> -->
        <span>{{ $t(`manage.${item.path}`) }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          {{ $t(`menus.${it.path}`) }}
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
// import variables from '@/styles/variables.scss'
// const widdth = ref(variables.menuBg1)
// import { useStore } from 'vuex'
// const store = useStore()
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const menusList = ref([])
const initMenusList = async () => {
  const res = await menuList()
  menusList.value = res.data
  // console.log(menusList.value[0])
}
const defaultActive = ref(sessionStorage.getItem('path' || '/home'))
initMenusList()
const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
// const asideWidth = ref(variables.$sideBarWidth)
// document.getElementById('menu1').dataset.width = '$hideSideBarWidth'
</script>
<style lang="scss" scoped></style>
