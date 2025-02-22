<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { auth } from '@/db/firebase'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useGroupedMessages } from '@/composables/groupedMessages'
import data from '../db/profanity.json'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useChatStore } from '../stores/chat.js'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { text, messages, participantName } = storeToRefs(chatStore)
const route = useRoute()
const router = useRouter()
const id = route.params.id
const user = auth.currentUser
const chatContainer = ref(null)

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
function formatDate(date) {
  return date.toDate().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}
onMounted(async () => {
  await chatStore.getChat(id)
  chatStore.getChatParticipant(id, user)
  groupedMessages.value = useGroupedMessages(messages)
})
</script>
<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="flex h-screen">
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
              <div
                v-if="user.uid !== message.senderId"
                class="w-10 h-10 bg-gray-600 rounded-full mr-3"
              ></div>
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

          <!-- <input
            v-model="text"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Bay_Leaf"
          /> -->
          <button
            @click="chatStore.sendMessage(id, text)"
            class="px-4 py-2 bg-Bay_Leaf text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
