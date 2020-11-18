import { computed, ref } from 'vue'
export default function useSearch(resources) {
  const searchQuery = ref('')
  const setSearchQuery = value => searchQuery.value = value

  const searchedResources = computed(() => !searchQuery.value
    ? resources.value
    : resources.value.filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  return {
    searchedResources,
    setSearchQuery
  }
}
