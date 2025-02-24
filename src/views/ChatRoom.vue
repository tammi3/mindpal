<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { auth } from '@/db/firebase'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useGroupedMessages } from '@/composables/groupedMessages'
// import data from '../db/profanity.json'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { useChatStore } from '../stores/chat.js'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { text, messages, participantName, chats } = storeToRefs(chatStore)
const route = useRoute()
const router = useRouter()
const id = route.params.id
const user = auth.currentUser
const chatContainer = ref(null)
const chat = ref({})
const loading = ref(true)

const groupedMessages = ref(null)

watch(
  messages,
  async (newValue, oldValue) => {
    if (newValue.length !== oldValue.length) {
      await nextTick() // Wait for DOM to update
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  },
  { deep: true },
)
function returnBack() {
  router.go(-1)
}
const findChat = (chatsArray, id) => {
  return chatsArray.find((chat) => chat.id === id) || null // Return null if no match is found
}

// function formatDate(date) {
//   return date.toDate().toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//   })
// }
onMounted(async () => {
  await chatStore.getChat(id)
  await chatStore.chatHistory()
  chatStore.getChatParticipant(id, user)

  setTimeout(() => {
    chat.value = findChat(chats.value, id)
    loading.value = false
  }, 1000)
  groupedMessages.value = useGroupedMessages(messages)
})
</script>
<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div v-show="!loading" class="flex h-screen">
      <!-- Chat Area -->
      <main class="flex-1 flex flex-col w-full">
        <!-- Chat Header -->
        <div
          class="bg-white border-b p-4 shadow-sm flex justify-between items-center sticky top-12"
        >
          <div class="text-center font-bold text-lg text-Tiber mb-2">{{ participantName }}</div>

          <button @click="returnBack" class="p-2 text-Tiber">
            <FontAwesomeIcon class="text-lg font-bold" :icon="faChevronLeft" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
          <!-- Received Message -->
          <div v-if="messages?.length > 0">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="user.uid !== message.senderId ? 'flex' : 'flex justify-end'"
            >
              <!-- Date separator -->
              <!-- <div class="date-separator">{{ formatDate(message.timestamp) }}</div> -->
              <div class="mr-3" v-if="user.uid !== message.senderId && chat.user">
                <div v-show="!chat.user" class="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>

                <img
                  v-if="chat.user.updatedProfileImage"
                  :src="chat.user.img"
                  alt="User"
                  class="w-10 h-10 rounded-full"
                />
                <FontAwesomeIcon v-else class="text-3xl text-Tiber" :icon="faUserCircle" />
              </div>
              <div
                :class="[
                  'rounded-lg p-3 shadow-sm max-w-xs mb-2',
                  user.uid !== message.senderId ? 'bg-white' : 'bg-Bay_Leaf text-white',
                ]"
              >
                <p class="text-sm">{{ chatStore.decryptMessage(message.text) }}</p>
                <span
                  :class="[
                    'text-xs',
                    user.uid !== message.senderId ? ' text-gray-500' : 'text-Tiber',
                  ]"
                  >{{
                    message.timestamp.toDate().toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="p-4 bg-white border-t flex items-center space-x-3 sticky bottom-0">
          <textarea
            v-model="text"
            placeholder="Type a message..."
            class="w-full p-3 border border-Bay_Leaf rounded-lg focus:outline-none focus:ring-2 focus:ring-Bay_Leaf focus:border-Bay_Leaf"
            rows="1"
          ></textarea>

          <button
            @click="chatStore.sendMessage(id, text)"
            class="px-4 py-2 bg-Bay_Leaf text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </main>
    </div>
    <div v-if="loading" class="flex flex-col h-screen">
      <!-- Header -->
      <header class="p-4 bg-white shadow-md flex items-center border-b sticky top-12">
        <button class="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></button>
        <div class="ml-3 flex-1">
          <div class="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div class="w-24 h-3 bg-gray-200 rounded mt-1 animate-pulse"></div>
        </div>
        <button class="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></button>
      </header>

      <!-- Chat Body -->
      <main class="flex-1 p-4 overflow-y-auto space-y-4">
        <!-- Incoming Message -->
        <div class="flex items-start">
          <div class="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div class="ml-3">
            <div class="w-40 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="w-28 h-4 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
          </div>
        </div>

        <!-- Outgoing Message -->
        <div class="flex items-end justify-end">
          <div class="flex flex-col items-end">
            <div class="w-40 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="w-28 h-4 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
          </div>
        </div>

        <!-- Incoming Message -->
        <div class="flex items-start">
          <div class="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div class="ml-3">
            <div class="w-32 h-5 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="w-24 h-4 bg-gray-200 rounded-lg mt-2 animate-pulse"></div>
          </div>
        </div>
      </main>

      <!-- Chat Input -->
      <footer class="p-4 bg-white shadow-md flex items-center sticky bottom-0">
        <div class="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <button class="ml-3 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
