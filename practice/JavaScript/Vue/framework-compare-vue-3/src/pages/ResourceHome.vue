<template>
  <div class="container">
    <resource-header />
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your Resources</span>
          <span class="badge badge-secondary badge-pill">6</span>
        </h4>
        <resource-search />
        <resource-list />
      </div>
      <!-- {/* Update Form Starts */} -->
      <!-- {/* <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Resource</h4>
        <resource-update />
      </div> */}
      {/* Update Form Ends */} -->
      <!-- {/* Detail View Starts */} -->
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Resource</h4>
        <resource-detail />
      </div>
      <!-- {/* Detail View Ends */} -->
    </div>
  </div>
</template>

<script>
import ResourceHeader from '@/components/Header';
import ResourceSearch from '@/components/ResourceSearch';
import ResourceList from '@/components/ResourceList';
// import ResourceUpdate from '@/components/ResourceUpdate';
import ResourceDetail from '@/components/ResourceDetail';
export default {
  components: {
    ResourceHeader,
    ResourceSearch,
    ResourceList,
    // ResourceUpdate,
    ResourceDetail,
  },
};
</script>
