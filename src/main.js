import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'

const app = createApp(App)
SvgIcon(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
