import { onMounted, ref, computed } from 'vue'
import { fetchResources } from '@/actions'
export default function useResources() {
  const resources = ref([])

  const getResources = async () => {
    resources.value = await fetchResources()
  }

  const hydrateResources = (resource, operation) => {
    const index = resources.value.findIndex((r) => r._id === resource._id);
    operation === 'update' ?
      resources.value[index] = resource :
      resources.value.splice(index, 1);
  }

  onMounted(getResources)

  const resourcesLength = computed(() => resources.value.length)
  const hasResource = computed(() => resourcesLength.value > 0)

  return {
    resources,
    getResources,
    resourcesLength,
    hasResource,
    hydrateResources
  }
}
