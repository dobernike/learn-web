import { onMounted, ref } from 'vue'
import { fetchResources } from '@/actions'
export default function useResources() {
  const resources = ref([])

  const getResources = async () => {
    resources.value = await fetchResources()
  }

  onMounted(getResources)

  return {
    resources,
    getResources
  }
}
