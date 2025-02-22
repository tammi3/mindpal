<script setup>
import { useTherapistStore } from '../stores/therapist.js'
import { useSearchTherapists } from '@/composables/searchTherapists.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
const therapistStore = useTherapistStore()
const { therapists, search, specialisations } = storeToRefs(therapistStore)

const selectedSpecialisation = ref('')

const filteredTherapists = useSearchTherapists(therapists, search)
async function getTherapists(filter) {
  await therapistStore.getTherapists(filter)
}

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  await getTherapists('All')
})
</script>
<template>
  <div class="py-16 px-6 text-center">
    <p class="text-Sushi font-semibold uppercase tracking-widest text-lg mb-2">Meet Our Experts</p>
    <h2 class="text-4xl font-bold text-Tiber">Your Mental Health Support Team</h2>
    <p class="text-gray-600 max-w-2xl mx-auto mt-3">
      Our dedicated team of therapists, counselors, and mental health professionals are here to
      guide you toward well-being.
    </p>
    <!-- Search and Filters Section -->

    <div class="flex flex-col md:flex-row gap-4 my-8">
      <!-- Search Bar -->
      <input
        v-model="search"
        type="text"
        placeholder="Search articles..."
        class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Sushi"
      />
      <!-- Category Filter -->
      <select
        v-model="selectedSpecialisation"
        @change="getTherapists(selectedSpecialisation)"
        class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Sushi"
      >
        <option value="All" selected>All</option>

        <option
          v-for="specialisation in specialisations"
          :key="specialisation"
          :value="specialisation"
        >
          {{ specialisation }}
        </option>
      </select>
    </div>

    <!-- Therapists Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      <!-- Therapist Card -->
      <div
        v-for="therapist in filteredTherapists"
        :key="therapist"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          src="https://via.placeholder.com/400x300"
          alt="Therapist Photo"
          class="w-full h-48 object-cover"
        />
        <div class="text-left p-6">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ therapist.name.firstName }} {{ therapist.name.lastName }}
          </h3>
          <p class="text-sm text-gray-500">{{ therapist.specialisation }}</p>
          <router-link
            :to="'/therapist/' + therapist.id"
            class="mt-6 flex justify-center items-center h-7 w-full bg-Sushi text-white px-4 py-2 text-lg text-semibold rounded-lg hover:bg-blue-700"
          >
            View Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
