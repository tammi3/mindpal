<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="flex h-screen">
      <!-- Chat Area -->
      <main class="flex-1 flex flex-col w-full">
        <!-- Chat Header -->
        <div class="bg-white border-b p-4 shadow-sm flex justify-between items-center">
          <div>
            <h2 class="text-lg font-semibold">John Doe</h2>
            <p class="text-sm text-gray-500">Online</p>
          </div>
          <!-- Toggle Button for Sidebar -->
          <button id="toggleSidebar" class="md:hidden p-2 bg-gray-800 text-white rounded-lg">
            ☰
          </button>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
          <!-- Received Message -->
          <div class="flex">
            <div class="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
            <div class="bg-white rounded-lg p-3 shadow-sm max-w-xs">
              <p class="text-sm">Hey, how are you?</p>
            </div>
          </div>

          <!-- Sent Message -->
          <div class="flex justify-end">
            <div class="bg-Bay_Leaf text-white rounded-lg p-3 shadow-sm max-w-xs">
              <p class="text-sm">I'm good! How about you?</p>
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="p-4 bg-white border-t flex items-center space-x-3">
          <input
            :bind="message"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Bay_Leaf"
          />
          <button class="px-4 py-2 bg-Bay_Leaf text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '../stores/chat.js'
import { storeToRefs } from 'pinia'
const chatStore = useChatStore()
const { message } = storeToRefs(chatStore)
const originalMessage = 'Hello, this is a secure message!'
const encrypted = chatStore.encryptMessage(originalMessage)
const decrypted = chatStore.decryptMessage(encrypted)

console.log('Original:', originalMessage)
console.log('Encrypted:', encrypted)
console.log('Decrypted:', decrypted)
</script>

<style lang="scss" scoped></style>
