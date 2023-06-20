import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import './assets/main.css'
import Chat from '@/components/Chat.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          component: Chat
        }
      ]
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
