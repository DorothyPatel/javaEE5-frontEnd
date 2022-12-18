import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
// 为什么是icons这下面的
import SvgIcon from '@/icons'
const app = createApp(App)
SvgIcon(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
