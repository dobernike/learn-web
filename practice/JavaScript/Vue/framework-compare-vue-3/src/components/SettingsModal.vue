<template>
  <button @click="isOpen = true" class="btn btn-success">Settings</button>
  <modal
    :isOpen="isOpen"
    @on-close="isOpen = false"
    @on-submit="submitSettings"
  >
    <div>
      <settings-form v-model:fontSize="fontSize" v-model:theme="theme" />
      <!-- <settings-form
        :fontSize="fontSize"
        :theme="theme"
        @update:fontSize="fontSize = $event"
        @update:theme="theme = $event"
      /> -->
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/shared/Modal';
import SettingsForm from '@/components/SettingsForm';
export default {
  components: { Modal, SettingsForm },
  data() {
    return {
      isOpen: false,
      fontSize: '',
      theme: '',
    };
  },
  methods: {
    submitSettings() {
      const settings = {
        fontSize: this.fontSize,
        theme: this.theme,
      };
      alert(JSON.stringify(settings));
      this.isOpen = false;
    },
  },
};
</script>
