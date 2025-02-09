import { computed } from 'vue'

export function useSearchTherapists(therapists, search) {
  return computed(() => {
    return therapists.value.filter((therapist) => {
      const therapistName = therapist.name.firstName + ' ' + therapist.name.lastName
      return therapistName.toLowerCase().includes(search.value.toLowerCase())
    })
  })
}
