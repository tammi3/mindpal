<template>
  <div class="w-full bg-white rounded-lg p-4">
    <h2 class="text-xl font-bold mb-4 text-center">Call History</h2>

    <!-- Call history container -->
    <div class="space-y-3">
      <!-- Example Accepted Call -->
      <div class="flex items-center p-3 bg-green-100 border-l-4 border-green-500 rounded">
        <img src="https://i.pravatar.cc/40?img=1" alt="User" class="w-10 h-10 rounded-full" />
        <div class="ml-3">
          <p class="font-medium">John Doe</p>
          <p class="text-sm text-gray-500">Accepted - 5 mins ago</p>
        </div>
      </div>

      <!-- Example Missed Call -->
      <div class="flex items-center p-3 bg-red-100 border-l-4 border-red-500 rounded">
        <img src="https://i.pravatar.cc/40?img=2" alt="User" class="w-10 h-10 rounded-full" />
        <div class="ml-3">
          <p class="font-medium">Jane Smith</p>
          <p class="text-sm text-gray-500">Missed - 30 mins ago</p>
        </div>
      </div>

      <!-- Example Outgoing Call -->
      <div class="flex items-center p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
        <img src="https://i.pravatar.cc/40?img=3" alt="User" class="w-10 h-10 rounded-full" />
        <div class="ml-3">
          <p class="font-medium">Alex Johnson</p>
          <p class="text-sm text-gray-500">Outgoing - 1 hour ago</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
