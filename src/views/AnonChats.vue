<script setup>
import { ref } from 'vue'

const chatrooms = ref([
  {
    id: 'anxietySupport',
    name: '🧘 Anxiety Support',
  },
  {
    id: 'depressionAndLoneliness',
    name: '😔 Depression & Loneliness',
  },
  {
    id: 'motivationAndPositivity',
    name: '🚀 Motivation & Positivity',
  },
  {
    id: 'mentalHealthGeneral',
    name: '💬 General Mental Health',
  },
  {
    id: 'ventAndRant',
    name: '🛑 Vent & Rant',
  },
])
</script>
<template>
  <div class="w-full bg-white p-4">
    <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">🕵️ Anonymous Chatrooms</h2>

    <!-- Chat List -->
    <div class="mt-4 space-y-5">
      <!-- Anonymous Chat Tab (Pinned) -->
      <router-link
        v-for="chatroom in chatrooms"
        :key="chatroom.id"
        :to="'/anon-chatroom/' + chatroom.id"
        class="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm mb-2 cursor-pointer hover:bg-gray-200"
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
