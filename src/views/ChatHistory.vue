<script setup>
import { onMounted } from 'vue'
import { format } from 'date-fns'
import { useSortedChats } from '@/composables/sortedChats'
import { useChatStore } from '../stores/chat.js'
import { storeToRefs } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)
const sortedChats = useSortedChats(chats)

function formatTimestamp(timestamp) {
  if (!timestamp) return ''

  const messageDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()

  const isSameDay = format(messageDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
  const isSameWeek = (now - messageDate) / (1000 * 60 * 60 * 24) < 7

  if (isSameDay) {
    return format(messageDate, 'h:mm a') // Show time (e.g., "2:30 PM")
  } else if (isSameWeek) {
    return format(messageDate, 'EEEE') // Show weekday (e.g., "Monday")
  } else {
    return format(messageDate, 'MM/dd/yyyy') // Show full date (e.g., "02/10/2024")
  }
}

onMounted(async () => {
  await chatStore.chatHistory()
  setTimeout(() => {
    console.log(chats.value)

    console.log(sortedChats.value)
  }, 1000)
})
</script>
<template>
  <div class="w-full bg-white shadow-lg p-4">
    <h2 class="text-xl font-bold text-Tiber border-b pb-2">💬 Chat History</h2>

    <!-- Chat List -->
    <div v-if="sortedChats.length > 0" class="mt-4 space-y-3">
      <router-link
        :to="'/chat/' + chat.id"
        v-for="chat in sortedChats"
        :key="chat.id"
        class="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <img
          v-if="chat.user.updatedProfileImage"
          :src="chat.user.img"
          alt="User"
          class="w-12 h-12 rounded-full"
        />
        <FontAwesomeIcon v-else class="mr-2 p-2 text-3xl text-Tiber" :icon="faUserCircle" />
        <!-- <spanclass="bg-Tiber/40 text-white p-2 rounded-full "
          ></spanclass=> -->
        <div class="ml-3 flex-1">
          <h3 class="font-semibold text-Tiber">
            {{ chat.user.name.firstName }} {{ chat.user.name.lastName }}
          </h3>
          <p class="text-sm text-gray-600 truncate">
            {{ chatStore.decryptMessage(chat.messages[chat.messages.length - 1].text) }}
          </p>
        </div>
        <div class="text-xs text-gray-500">
          {{ formatTimestamp(chat.messages[chat.messages.length - 1].timestamp) }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
