<template>
  <div class="container">
    <resource-header />
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your Resources</span>
          <span class="badge badge-secondary badge-pill">{{
            resourcesLength
          }}</span>
        </h4>
        <resource-search />
        <resource-list
          :resources="resources"
          :activeId="activeResource?._id"
          @on-item-click="selectResource"
        />
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">
          Resource {{ activeResource?._id }}
          <template v-if="hasResource">
            <button
              @click="toggleView"
              :class="`btn btn-sm ${toggleBtnClass} mr-2`"
            >
              {{ isDetailView ? 'Update' : 'Detail' }}
            </button>
            <resource-delete
              @on-resource-delete="
                hydrateResources($event, 'delete');
                !hasResources ? (isDetailView = true) : null;
              "
              :activeId="activeResource?._id"
            />
          </template>
        </h4>
        <resource-detail v-if="isDetailView" :resource="activeResource" />
        <resource-update
          v-else
          @on-resource-update="hydrateResources($event, 'update')"
          :resource="activeResource"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ResourceHeader from '@/components/Header';
import ResourceSearch from '@/components/ResourceSearch';
import ResourceList from '@/components/ResourceList';
import ResourceUpdate from '@/components/ResourceUpdate';
import ResourceDetail from '@/components/ResourceDetail';
import ResourceDelete from '@/components/ResourceDelete';
import { fetchResources } from '@/actions';
export default {
  components: {
    ResourceHeader,
    ResourceSearch,
    ResourceList,
    ResourceUpdate,
    ResourceDetail,
    ResourceDelete,
  },
  data() {
    return {
      isDetailView: true,
      selectedResource: null,
      resources: [],
    };
  },
  // created is called once options are resolved(data, computed, methods...) and instance created
  async created() {
    const resources = await fetchResources();
    this.resources = resources;
  },
  computed: {
    // it will be re-evaluated every time reactive dependency will change
    resourcesLength() {
      return this.resources.length;
    },
    toggleBtnClass() {
      return this.isDetailView ? 'btn-warning' : 'btn-primary';
    },
    hasResource() {
      return this.resourcesLength > 0;
    },
    activeResource() {
      return (
        this.selectedResource || (this.hasResource && this.resources[0]) || null
      );
    },
  },
  methods: {
    // it will be re-evaluated every time
    toggleView() {
      this.isDetailView = !this.isDetailView;
    },
    selectResource(selectedResource) {
      // TODO: it`s copied by reference!
      this.selectedResource = selectedResource;
    },
    hydrateResources(newResource, operation) {
      const index = this.resources.findIndex((r) => r._id === newResource._id);

      if (operation === 'update') {
        this.resources[index] = newResource;
        this.selectResource(newResource);
      } else {
        this.resources.splice(index, 1);
        this.selectResource(this.resources[0] || null);
      }
    },
  },
};
</script>
