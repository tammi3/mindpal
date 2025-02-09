<script setup>
import { ref } from 'vue'

const reportedMessages = ref([
  {
    id: 1,
    user: 'tamaraekiye',
    message: 'This is a reported message.',
    reason: 'Harassment',
    timestamp: '2024-02-04 14:30',
  },
  {
    id: 2,
    user: 'otterlover99',
    message: 'Spam message detected.',
    reason: 'Spam',
    timestamp: '2024-02-04 15:00',
  },
])

const takeAction = (id, action) => {
  console.log(`Action taken on message ${id}: ${action}`)
  reportedMessages.value = reportedMessages.value.filter((msg) => msg.id !== id)
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Review Reported Messages</h2>

    <div class="h-[300px] overflow-y-auto" v-if="reportedMessages.length > 0">
      <div
        v-for="message in reportedMessages"
        :key="message.id"
        class="p-4 mb-3 border rounded-lg shadow-sm"
      >
        <p class="text-sm text-gray-500">{{ message.timestamp }}</p>
        <p class="font-semibold text-gray-700">{{ message.user }}</p>
        <p class="mt-2 text-gray-800">"{{ message.message }}"</p>
        <p class="text-sm text-red-500 mt-1">Reason: {{ message.reason }}</p>

        <div class="flex gap-3 mt-3">
          <button
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            @click="takeAction(message.id, 'Dismiss')"
          >
            Dismiss
          </button>
          <button
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            @click="takeAction(message.id, 'Delete')"
          >
            Delete
          </button>
          <button
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            @click="takeAction(message.id, 'Escalate')"
          >
            Escalate
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">No reported messages.</p>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}
</style>
