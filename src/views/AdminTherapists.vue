<script setup>
import { useTherapistStore } from '../stores/therapist.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useSearchTherapists } from '@/composables/searchTherapists.js'
const therapistStore = useTherapistStore()
const { therapists, search, specialisations } = storeToRefs(therapistStore)
const selectedSpecialisation = ref('')
const loadingTab = ref(true)
const filteredTherapists = useSearchTherapists(therapists, search)
const approveTherapist = (id) => {
  const therapist = therapists._value.find((t) => t.id === id)
  if (therapist) therapist.status = 'Approved'
}

const rejectTherapist = (id) => {
  const therapist = therapists._value.find((t) => t.id === id)
  if (therapist) therapist.status = 'Rejected'
}
async function getTherapists(filter) {
  await therapistStore.getTherapists(filter)
}
async function download(id) {
  await therapistStore.downloadTherapistFile(id)
}
onMounted(async () => {
  await getTherapists('All')
  setTimeout(() => {
    loadingTab.value = false
  }, 2000)
})
</script>

<template>
  <div>
    <div v-show="!loadingTab" class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="border p-3">Name</th>
            <th cope="col" class="px-6 py-3">Specialisation</th>
            <th cope="col" class="px-6 py-3">Date</th>
            <th cope="col" class="px-6 py-3">Time</th>
            <th cope="col" class="px-6 py-3">Status</th>

            <th cope="col" class="px-6 py-3">Actions</th>
            <th cope="col" class="px-6 py-3 whitespace-nowrap">Download File</th>
          </tr>
        </thead>
        <tbody v-if="filteredTherapists.length > 0">
          <tr
            v-for="therapist in filteredTherapists"
            :key="therapist"
            class="bg-white border-b hover:bg-gray-50"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ therapist.name.firstName }} {{ therapist.name.lastName }}
            </th>
            <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
              {{ therapist.specialisation }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              {{
                therapist.creationTime.toDate().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ therapist.creationTime.toDate().toLocaleTimeString('en-US') }}
            </td>
            <td
              :class="[
                'px-6 py-4 whitespace-nowrap ',
                therapist.status === 'Pending' ? 'text-yellow-500' : '',
                therapist.status === 'Approved' ? 'text-green-500' : '',
                therapist.status === 'Rejected' ? 'text-red-500' : '',
              ]"
            >
              {{ therapist.status }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                @click="approveTherapist(therapist.id)"
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                @click="rejectTherapist(therapist.id)"
              >
                Reject
              </button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                @click="download(therapist.id)"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loadingTab">
      <div class="w-full h-dvh animate-pulse bg-gray-300"></div>
    </div>
  </div>
</template>
