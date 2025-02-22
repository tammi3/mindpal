<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
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
          <div class="text-center font-bold text-lg text-gray-800 mb-2">🕵️ Anonymous Chatroom</div>

          <!-- Toggle Button for Sidebar -->
          <!-- <button id="toggleSidebar" class="md:hidden p-2 bg-gray-800 text-white rounded-lg">
            ☰
          </button> -->
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
          <!-- Received Message -->
          <!-- <div v-if="messages?.length > 0">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="user.uid !== message.senderId ? 'flex' : 'flex justify-end'"
            >
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
                <span class="text-xs text-gray-500">{{
                  message.timestamp.toDate().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                }}</span>
              </div>
            </div>
          </div> -->
        </div>

        <!-- Input Bar -->
        <!-- <div class="p-4 bg-white border-t flex items-center space-x-3 sticky bottom-0">
          <textarea
            v-model="text"
            placeholder="Type a message..."
            class="w-full p-3 border border-Bay_Leaf rounded-lg focus:outline-none focus:ring-2 focus:ring-Bay_Leaf focus:border-Bay_Leaf"
            rows="1"
          ></textarea> -->

        <!-- <input
            v-model="text"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Bay_Leaf"
          /> -->
        <!-- <button
            @click="chatStore.sendMessage(id, text)"
            class="px-4 py-2 bg-Bay_Leaf text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div> -->
      </main>
    </div>
  </div>
</template>
