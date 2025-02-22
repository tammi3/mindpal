import { computed } from 'vue'

export function useSearchArticles(articles, search) {
  return computed(() => {
    return articles.value.filter((article) => {
      return article.title.toLowerCase().includes(search.value.toLowerCase())
    })
  })
}
