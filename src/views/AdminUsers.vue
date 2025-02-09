<script setup>
import { ref, computed } from 'vue'
import { SearchIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'

// Sample Users Data
const users = ref([
  { id: 1, name: 'Tamara Ekiye', email: 'tamara@example.com', role: 'Admin' },
  { id: 2, name: 'Otter Lover', email: 'otter@example.com', role: 'User' },
  { id: 3, name: 'Crystal Castles', email: 'fleeceknights@example.com', role: 'Moderator' },
])

const searchQuery = ref('')

// Computed: Filter Users
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Delete User Function
const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id)
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Users</h2>

    <!-- Search Bar -->
    <div class="flex items-center gap-2 mb-4">
      <SearchIcon class="w-5 h-5 text-gray-500" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users..."
        class="p-2 border rounded w-full"
      />
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 border">Name</th>
            <th class="p-3 border">Email</th>
            <th class="p-3 border">Role</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="text-center">
            <td class="p-3 border">{{ user.name }}</td>
            <td class="p-3 border">{{ user.email }}</td>
            <td class="p-3 border">{{ user.role }}</td>
            <td class="p-3 border flex justify-center gap-2">
              <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                <PencilIcon class="w-4 h-4 inline" /> Edit
              </button>
              <button
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                @click="deleteUser(user.id)"
              >
                <TrashIcon class="w-4 h-4 inline" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="filteredUsers.length === 0" class="text-gray-500 mt-4">No users found.</p>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}
</style>
