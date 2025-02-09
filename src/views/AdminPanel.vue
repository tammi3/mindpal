<script setup>
import { ref } from 'vue'

import {
  HomeIcon,
  UsersIcon,
  SettingsIcon,
  MenuIcon,
  LogOutIcon,
  StethoscopeIcon,
  FileTextIcon,
} from 'lucide-vue-next'

const isOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, route: '/admin' },
  { name: 'Users', icon: UsersIcon, route: '/admin/users' },
  { name: 'Settings', icon: SettingsIcon, route: '/settings' },
  { name: 'Therapists', icon: StethoscopeIcon, route: '/admin/therapists' },
  { name: 'Reports', icon: FileTextIcon, route: '/admin/reports' },
]
</script>

<template>
  <div class="min-h-screen bg-white flex">
    <!-- Sidebar -->
    <aside
      :class="isOpen ? 'w-64' : 'w-16'"
      class="h-dvh bg-Tiber text-white transition-all duration-300 flex flex-col"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-4">
        <span v-if="isOpen" class="text-lg font-bold">Admin</span>
        <button @click="isOpen = !isOpen">
          <MenuIcon class="w-6 h-6 text-white" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 mt-4">
        <ul>
          <li v-for="item in menuItems" :key="item.name">
            <router-link
              :to="item.route"
              class="flex items-center gap-3 p-3 hover:bg-gray-700 transition rounded-md"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span v-if="isOpen">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout -->
      <div class="mt-auto p-4">
        <button class="flex items-center gap-3 w-full p-3 bg-red-600 hover:bg-red-700 rounded-md">
          <LogOutIcon class="w-5 h-5" />
          <span v-if="isOpen">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>

      <!-- Stats Section -->
      <div class="grid grid-cols-3 gap-6 mt-5">
        <div class="bg-white p-5 shadow rounded-lg">
          <h3 class="text-lg font-medium">Total Users</h3>
          <p class="text-2xl font-bold text-blue-600">1,230</p>
        </div>
        <div class="bg-white p-5 shadow rounded-lg">
          <h3 class="text-lg font-medium">Active Therapists</h3>
          <p class="text-2xl font-bold text-green-600">24</p>
        </div>
        <div class="bg-white p-5 shadow rounded-lg">
          <h3 class="text-lg font-medium">Pending Reports</h3>
          <p class="text-2xl font-bold text-red-600">8</p>
        </div>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>
