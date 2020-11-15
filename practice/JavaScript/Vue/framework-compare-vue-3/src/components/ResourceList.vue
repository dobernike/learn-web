<template>
  <ul class="list-group mb-3">
    <li
      v-for="resource in resources"
      :key="resource._id"
      class="list-group-item d-flex justify-content-between lh-condensed"
    >
      <div>
        <h6 class="my-0">{{ resource.title }}</h6>
        <small class="text-muted">{{ resource.description }}</small>
      </div>
      <span class="text-muted">{{ resource.type }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    resources: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
