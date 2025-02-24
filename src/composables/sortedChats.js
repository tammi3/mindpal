import { computed } from 'vue'

export function useSortedChats(chatsRef) {
  return computed(() => {
    const chats = chatsRef.value || []

    return chats
      .filter((chat) => chat.messages[chat.messages.length - 1].timestamp) // Ensure timestamp exists
      .sort((a, b) => {
        const dateA = a.messages[a.messages.length - 1].timestamp.toDate
          ? a.messages[a.messages.length - 1].timestamp.toDate()
          : new Date(a.messages[a.messages.length - 1].timestamp)
        const dateB = b.timestamp.toDate ? b.timestamp.toDate() : new Date(b.timestamp)
        return dateB - dateA // Sort descending (latest first)
      })
  })
}
