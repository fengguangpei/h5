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
let flag = false
let timer = null
// document.addEventListener('selectionchange', () => {
//   if (timer) {
//     return
//   }
//   const selection = window.getSelection()
//   node = node || selection.baseNode
//   baseOffset = selection.anchorOffset
//   extendOffset = selection.focusOffset
//   timer = setTimeout(() => {
//     selection.empty()
//     setTimeout(() => {
//       const selection = window.getSelection()
//       const range = new Range()
//       range.setStart(node, baseOffset)
//       range.setEnd(node, extendOffset)
//       selection.addRange(range)
//     })
//   }, 2000)
// })
