import { onMounted, ref, computed } from 'vue'
import { fetchResources } from '@/actions'
export default function useResources() {
  const resources = ref([])

  const getResources = async () => {
    resources.value = await fetchResources()
  }

  onMounted(getResources)

  const resourcesLength = computed(() => resources.value.length)
  const hasResource = computed(() => resourcesLength.value > 0)

  return {
    resources,
    getResources,
    resourcesLength,
    hasResource
  }
}
