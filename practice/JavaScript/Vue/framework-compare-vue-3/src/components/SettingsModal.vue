<template>
  <button @click="isOpen = true" class="btn btn-success">Settings</button>
  <modal
    :isOpen="isOpen"
    @on-close="isOpen = false"
    @on-submit="submitSettings"
  >
    <div>
      My custom content
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/shared/Modal';
export default {
  components: { Modal },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    submitSettings() {
      this.isOpen = false;
    },
  },
};
</script>
