<script setup>
import HeaderView from '@/components/HeaderView.vue'
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
  <div>
    <HeaderView />
    <div class="py-16 px-6 text-center">
      <p class="text-Sushi font-semibold uppercase tracking-widest text-lg mb-2">
        Meet Our Experts
      </p>
      <h2 class="text-4xl font-bold text-gray-800">Your Mental Health Support Team</h2>
      <p class="text-gray-600 max-w-2xl mx-auto mt-3">
        Our dedicated team of therapists, counselors, and mental health professionals are here to
        guide you toward well-being.
      </p>
      <div class="w-full space-x-3 p-4 flex justify-center items-center">
        <div class="w-96 h-10 relative bg-gray-400/25 shadow-md rounded-lg">
          <input
            v-model="search"
            class="focus:outline-none absolute bg-transparent top-0 left-0 h-full w-full pr-2 pl-12"
            type="text"
            placeholder="Search therapist by name"
          />
          <svg
            class="absolute top-1 left-3 flex justify-center items-center pr-3"
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#000000"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="relative">
          <label
            for="selectFilter"
            id="filterButton"
            class="bg-gray-600 absolute inset-0 font-semibold text-white text-center px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
          >
            Choose a Specialisation
          </label>

          <select
            id="selectFilter"
            v-model="selectedSpecialisation"
            @change="getTherapists(selectedSpecialisation)"
            class="block opacity-0 p-2 w-72 cursor-pointer text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
          >
            <option>All</option>
            <option
              v-for="specialisation in specialisations"
              :key="specialisation"
              :value="specialisation"
            >
              {{ specialisation }}
            </option>
          </select>
        </div>
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
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ therapist.name.firstName }} {{ therapist.name.lastName }}
            </h3>
            <p class="text-sm text-gray-500">{{ therapist.specialisation }}</p>
            <router-link
              :to="'/therapist/' + therapist.id"
              class="mt-6 flex justify-center items-center h-7 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              View Profile
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
