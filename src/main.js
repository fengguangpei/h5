import { createApp, nextTick } from 'vue'
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

let baseOffset = 0
let extendOffset = 0
let node = null
let time = 1
document.addEventListener('selectionchange', () => {
  if (time === 2) {
    return
  }
  if (time === 3) {
    time = 1
    return
  }
  const selection = window.getSelection()
  node = selection.baseNode
  baseOffset = selection.anchorOffset
  extendOffset = selection.focusOffset
  selection.empty()
  time++
  setTimeout(() => {
    const range = new Range()
    range.setStart(node, baseOffset)
    range.setEnd(node, extendOffset)
    selection.addRange(range)
  }, 1000)
})
