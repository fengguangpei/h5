<script setup>
import { ref, reactive, nextTick, onMounted } from "vue"
import { ClickOutside as vClickOutside } from 'element-plus'
const message = ref("")
const inputRef = ref(null)
const visible = ref(false)
const popupRef = ref(null)
const containerRef = ref(null)
const messageList = reactive([
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
  {
    text: '这是一条消息最大的亟待解决顶焦度计顶焦度计顶焦度计将顶焦度计顶焦度计顶焦度计激动激动'
  },
])
const animation = ref(false)
const image = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
const operation = "display: flex;flex-direction: row;flex-wrap: wrap;"
const button = "margin: 0 10px 0; color: #fff;font-size: 14px;"
let flag = false
// 发送消息
const send = () => {
  flag = false
  const text = message.value
  message.value = ""
  inputRef.value.blur()
  if (text.trim()) {
    messageList.push({
      text
    })
    nextTick(() => {
      window.scrollTo(0, 0)
      const element = document.querySelector(".chat-container")
      containerRef.value.scrollTo({
        left: element.scrollHeight,
        top: element.scrollHeight
      })
    })
  }
}
const focus = () => {
  flag = true
  const element = document.querySelector(".chat-container")
  if (element.scrollTop + element.clientHeight === element.scrollHeight) {
    return
  }
  containerRef.value.scrollTo({
    left: element.scrollHeight,
    top: element.scrollHeight
  })
  nextTick(() => {
    animation.value = true
  })
}
const blur = () => {
  flag = false
  animation.value = false
  nextTick(() => {
    window.scrollTo(0, 0)
  })
}
// 长按
let timeout = null
const touchStart = (e) => {
  // eslint-disable-next-line no-import-assign
  timeout = setTimeout(() => {
    popupRef.value = e.target
    visible.value = true
    clearTimeout(timeout)
    timeout = null
  }, 500)
}
const touchEnd = (e) => {
  e.preventDefault()
  if (timeout) {
    clearTimeout(timeout)
  }
}
const clickOutside = () => {
  popupRef.value = null
  visible.value = false
}
const showTip = () => {
  alert("点击了复制按钮")
}
const stop = (e) => {
  flag && e.preventDefault()
}
onMounted(() => {
  inputRef.value.focus()
  nextTick(() => {
    inputRef.value.blur()
  })
})
</script>

<template>
  <div class="top">
    聊天界面
  </div>
  <div class="chat-container" @touchmove="stop" :class="{ 'test': animation }" ref="containerRef">
    <div v-for="( item, index ) in  messageList " :key="item.text + index" class="message-item">
      <el-image :src="image"></el-image>
      <p v-click-outside="clickOutside" @touchstart="touchStart($event, item)" @touchend="touchEnd($event, item)">
        {{ item.text }}
      </p>
    </div>
    <!-- 消息气泡 -->
    <el-popover :virtual-ref="popupRef" v-model:visible="visible" virtual-triggering placement="top" effect="dark"
      width="85vw">
      <div :style="operation">
        <el-button @click="showTip" :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>复制</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>转发</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>收藏</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>删除</span>
        </el-button>
      </div>
      <div :style="operation" style="margin-top: 15px;">
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>多选</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>引用</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>提醒</span>
        </el-button>
        <el-button :style="button" link :bg="false">
          <el-icon>
            <CopyDocument />
          </el-icon>
          <span>翻译</span>
        </el-button>
      </div>
    </el-popover>
  </div>
  <!-- 输入框 -->
  <div class="bottom" @touchmove="stop">
    <el-input v-model="message" ref="inputRef" @blur="blur" @focus="focus" @keyup.enter="send" placeholder="请输入消息..."
      enterkeyhint="send" type="textarea" :autosize="{ minRows: 1.5, maxRows: 3 }"></el-input>
  </div>
</template>

<style scoped>
@keyframes Toggle {
  0% {
    transform: translateY(8px));
  }

  100% {
    transform: translateY(-8px)
  }
}

.test {
  animation-name: Toggle;
  animation-duration: 450ms;
  animation-timing-function: ease-out;
  animation-delay: 50ms;
}

.top {
  line-height: 30px;
  text-align: center;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 20;
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid #fff;
}

.chat-container {
  width: 100vw;
  background-color: #eee;
  position: fixed;
  top: 40px;
  bottom: 60px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 5px 10px;
}

:deep .el-textarea {
  background-color: #fff;
}

:deep .el-textarea__inner {
  margin: 10px;
  border-width: 0.5px;
  width: calc(100% - 20px);
  z-index: 400;
  -webkit-user-select: text;
}

.message-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
}

p {
  background-color: #fff;
  margin: 5px 0 0 10px;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  max-width: 60vw;
}

.bottom {
  height: 60px;
  width: 100vw;
  position: fixed;
  left: 0;
  background-color: #fff;
  bottom: 0;
  z-index: 20;
}

:deep .el-image {
  width: 40px;
  height: 40px;
  border-radius: 20%;
}
</style>
