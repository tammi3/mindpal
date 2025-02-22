import { computed } from 'vue'

export function useGroupedMessages(messagesRef) {
  return computed(() => {
    const grouped = []

    const messages = messagesRef.value || [] // Ensure messagesRef is accessed correctly

    messages.forEach((message) => {
      if (!message.timestamp) return // Skip if timestamp is missing

      const dateObj = message.timestamp.toDate
        ? message.timestamp.toDate()
        : new Date(message.timestamp)
      const date = dateObj.toISOString().split('T')[0] // Extract YYYY-MM-DD

      if (!grouped[date]) grouped[date] = []
      grouped[date].push(message)
    })

    return grouped
  })
}
