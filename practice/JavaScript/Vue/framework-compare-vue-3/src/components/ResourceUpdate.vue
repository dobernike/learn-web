<template>
  <form @submit.prevent="submitForm">
    <div v-if="alert?.success" class="alert alert-success">
      {{ alert.success }}
    </div>
    <div v-if="alert?.error" class="alert alert-danger">
      {{ alert.error }}
    </div>
    <div class="mb-3">
      <label htmlFor="firstName">Title</label>
      <input
        v-model="uResource.title"
        type="text"
        class="form-control"
        id="firstName"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        v-model="uResource.description"
        class="form-control"
        id="description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label htmlFor="link">Resource Link</label>
      <div class="input-group">
        <input
          v-model="uResource.link"
          type="text"
          class="form-control"
          id="link"
          placeholder="Username"
        />
      </div>
    </div>
    <div class="mb-3">
      <label htmlFor="link">Type</label>
      <select v-model="uResource.type" id="link" class="form-control">
        <option
          v-for="resourceType in types"
          :key="resourceType"
          :value="resourceType"
          >{{ resourceType }}</option
        >
      </select>
    </div>
    <hr class="mb-4" />
    <button class="btn btn-primary btn-lg btn-block" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { updateResource } from '@/actions';
export default {
  props: {
    resource: Object,
  },
  data() {
    return {
      uResource: { ...this.resource },
      types: ['blog', 'video', 'book'],
      alert: this.initAlert(),
    };
  },
  emits: ['on-resource-update'],
  watch: {
    resource(newResource) {
      this.uResource = { ...newResource };
    },
  },
  methods: {
    initAlert() {
      return { success: null, error: null };
    },
    setAlert(type, message) {
      this.alert = this.initAlert();
      this.alert[type] = message;
    },
    async submitForm() {
      try {
        const updatedResource = await updateResource(
          this.uResource._id,
          this.uResource
        );
        this.$emit('on-resource-update', updatedResource);
        this.setAlert('success', 'Resource was updated!');
      } catch (error) {
        this.setAlert('error', error?.message);
      }
    },
  },
};
</script>
