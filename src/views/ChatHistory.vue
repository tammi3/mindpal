<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '../stores/chat.js'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)
onMounted(async () => {
  await chatStore.chatHistory()
  setTimeout(() => {
    console.log(chats.value)
  }, 1000)
})
</script>
<template>
  <div class="w-full bg-white shadow-lg p-4">
    <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">💬 Chat History</h2>

    <!-- Chat List -->
    <div class="mt-4 space-y-3">
      <router-link
        :to="'/chat/' + chat.id"
        v-for="chat in chats"
        :key="chat.id"
        class="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <img
          v-if="chat.user.updatedProfileImage"
          src=""
          alt="User"
          class="w-12 h-12 rounded-full"
        />
        <span v-else class="bg-purple-500 text-white p-2 rounded-full mr-2">👤</span>
        <div class="ml-3 flex-1">
          <h3 class="font-semibold text-gray-800">
            {{ chat.user.name.firstName }} {{ chat.user.name.lastName }}
          </h3>
          <p class="text-sm text-gray-600 truncate">
            {{ chatStore.decryptMessage(chat.messages[chat.messages.length - 1].text) }}
          </p>
        </div>
        <div class="text-xs text-gray-500">
          {{
            chat.messages[chat.messages.length - 1].timestamp.toDate().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
