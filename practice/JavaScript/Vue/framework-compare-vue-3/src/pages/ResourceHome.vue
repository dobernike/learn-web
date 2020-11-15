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
        <resource-list :resources="resources" />
        <button @click="addResource" class="btn btn-sm btn-primary">
          Add Resource
        </button>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">
          Resource
          <button @click="toggleView" class="btn btn-sm btn-success">
            Toggle
          </button>
        </h4>
        <resource-detail v-if="isDetailView" />
        <resource-update v-else />
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
export default {
  components: {
    ResourceHeader,
    ResourceSearch,
    ResourceList,
    ResourceUpdate,
    ResourceDetail,
  },
  data() {
    return {
      isDetailView: true,
      resources: [
        {
          _id: '1',
          title: 'Resource 1 Title',
          description: 'Resource 1 Description',
          type: 'video',
          link: '',
        },
        {
          _id: '2',
          title: 'Resource 2 Title',
          description: 'Resource 2 Description',
          type: 'book',
          link: '',
        },
        {
          _id: '3',
          title: 'Resource 3 Title',
          description: 'Resource 3 Description',
          type: 'blog',
          link: '',
        },
      ],
    };
  },
  computed: {
    // it will be re-evaluated every time reactive dependency will change
    resourcesLength() {
      return this.resources.length;
    },
  },
  methods: {
    // it will be re-evaluated every time
    toggleView() {
      this.isDetailView = !this.isDetailView;
    },
    addResource() {
      const rnd = Math.random();
      const _id = '_' + rnd.toString(36).slice(2);
      const type = ['book', 'blog', 'video'][Math.floor(rnd * 3)];
      const newResource = {
        _id,
        title: `Resource ${_id} Title`,
        description: `Resource ${_id} Description`,
        link: ``,
        type,
      };

      this.resources.push(newResource);
    },
  },
};
</script>
