<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="chat-message" :class="{ 'user-message': message.isUser, 'robot-message': !message.isUser }">
        <div class="message-text">{{ message.text }}</div>
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="message" placeholder="请输入您的消息...">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import { subscribeToChat, createWebSocket } from "@/api/common/websocket";
import { sendToChatGPT } from "@/api/common/message"

export default {
  data() {
    return {
      message: "",
      reply: null,
      messages: [
      ]
    };
  },
  mounted() {
    subscribeToChat(this.onMessageReceived, "konb");
  },
  methods: {
    sendMessage() {
      const ws = createWebSocket();
      if (this.reply) {
        let m = sendToChatGPT(this.message)
        this.messages.push({
          id: this.messages.length + 1 + '',
          isUser: true,
          text: this.message
        })
        m.id = this.reply.id
        ws.next(m);
      } else {
        let msg = sendToChatGPT(this.message)
        this.messages.push({
          id: this.messages.length + 1 + '',
          isUser: true,
          text: msg.message
        })
        ws.next(msg);
      }
      this.message = ""
    },
    onMessageReceived(data) {
      console.log("sad", data)
      this.messages.push({
          id: data.id,
          isUser: false,
          text: data.message
        })
      this.reply = data
    }
  }
};
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 20px;
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 20px;
}

.chat-message {
  margin-bottom: 10px;
  max-width: 80%;
  padding: 10px;
}

.user-message {
  align-self: flex-end;
  background-color: #007aff;
  color: white;
  border-radius: 10px 10px 0 10px;
}

.robot-message {
  align-self: flex-start;
  background-color: #f2f2f2;
  color: black;
  border-radius: 10px 10px 10px 0;
}

.message-text {
  word-wrap: break-word;
  max-width: 100%;
}

.input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
}

button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #007aff;
  color: white;
}
</style>
