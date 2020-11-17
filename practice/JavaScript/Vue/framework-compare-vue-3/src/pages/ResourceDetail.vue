<template>
    <resource-detail :resource="resource" />
</template>

<script>
    import { fetchResourcesByIdApi } from '@/actions'
    import ResourceDetail from "@/components/ResourceDetail";
    export default {
      components: { ResourceDetail },
      data() {
        return {
          resource: null
        }
      },
      async created() {
        const { id } = this.$route.params
        this.resource = await fetchResourcesByIdApi(id)
      }
    }
</script>
