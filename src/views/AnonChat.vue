<script setup>
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
const chatStore = useChatStore()
const { anonChatName, anonMessages, text } = storeToRefs(chatStore)
const route = useRoute()
const router = useRouter()
const id = route.params.id
const loading = ref(true)
function returnBack() {
  router.go(-1)
}
const generateAnonId = () => {
  let anonId = sessionStorage.getItem('anonUserId')
  if (!anonId) {
    anonId = uuidv4() // Generate a unique ID
    sessionStorage.setItem('anonUserId', anonId)
  }
  return anonId
}
onMounted(() => {
  chatStore.getAnonChatMessages(id)
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
          <div class="text-center font-bold text-lg text-Tiber mb-2">{{ anonChatName }}</div>

          <button @click="returnBack" class="p-2 text-Tiber">
            <FontAwesomeIcon class="text-lg font-bold" :icon="faChevronLeft" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
          <!-- Received Message -->
          <div v-if="anonMessages?.length > 0">
            <div
              v-for="message in anonMessages"
              :key="message.id"
              :class="generateAnonId() !== message.anonymousId ? 'flex' : 'flex justify-end'"
            >
              <!-- Date separator -->
              <!-- <div class="date-separator">{{ formatDate(message.timestamp) }}</div> -->

              <FontAwesomeIcon
                v-if="generateAnonId() !== message.anonymousId"
                class="text-3xl text-Tiber mr-3"
                :icon="faUserCircle"
              />

              <div
                :class="[
                  'rounded-lg p-3 shadow-sm max-w-xs mb-2',
                  generateAnonId() !== message.anonymousId ? 'bg-white' : 'bg-Bay_Leaf text-white',
                ]"
              >
                <p class="text-sm">{{ chatStore.decryptMessage(message.text) }}</p>
                <span
                  :class="[
                    'text-xs',
                    generateAnonId() !== message.anonymousId ? ' text-gray-500' : 'text-Tiber',
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
            @click="chatStore.sendAnonMessage(id, text, generateAnonId())"
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
