<script setup>
import { useChatStore } from '@/stores/chat'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const chatStore = useChatStore()
const { chatrooms } = storeToRefs(chatStore)
onMounted(() => {
  chatStore.getAnonChatrooms()
})
</script>
<template>
  <div class="w-full bg-white p-4 text-Tiber">
    <h2 class="text-xl font-bold border-b pb-2">
      <FontAwesomeIcon class="pr-1" :icon="faUserSecret" /> Anonymous Chatrooms
    </h2>

    <!-- Chat List -->
    <div class="mt-4 space-y-5">
      <!-- Anonymous Chat Tab (Pinned) -->
      <router-link
        v-for="chatroom in chatrooms"
        :key="chatroom.id"
        :to="'/anon-chatroom/' + chatroom.id"
        class="flex items-center justify-between bg-Bay_Leaf p-3 rounded-md shadow-sm mb-2 cursor-pointer hover:bg-Bay_Leaf/75"
      >
        <div class="flex items-center">
          <div>
            <p class="font-bold text-gray-800">{{ chatroom.name }}</p>
            <!-- <p class="text-sm text-gray-600">Hey, anyone here?</p> -->
          </div>
        </div>

        <!-- Pinned Icon -->
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
