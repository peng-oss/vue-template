import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueFullscreen from 'vue-fullscreen'
import App from './App.vue'
import router from './router'

import '@/assets/css/main.scss'
import '@/assets/css/tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import {registerEcharts} from "@/plugins/echarts"
//不使用mock 请注释掉
import { mockXHR } from "@/mock/index";
mockXHR()

const app = createApp(App)
registerEcharts(app)
app.use(createPinia())
app.use(router)
// app.use(VueFullscreen)
app.mount('#app')
