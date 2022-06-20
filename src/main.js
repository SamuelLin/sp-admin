import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import '@/permission' // router guard

const app = createApp(App)

// register element plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
