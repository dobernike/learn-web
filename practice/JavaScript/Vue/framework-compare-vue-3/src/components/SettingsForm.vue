<template>
  <form>
    <div class="mb-3">
      <label htmlFor="fontSize">Font Size</label>
      <input
        :value="fontSize"
        @input="handleFontSize($event.target.value)"
        type="text"
        class="form-control"
        id="fontSize"
        placeholder="17"
      />
    </div>
    <div class="mb-3">
      <label htmlFor="theme">Theme</label>
      <select
        :value="theme"
        @input="handleTheme($event.target.value)"
        id="theme"
        class="form-control"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
    },
    fontSize: {
      type: String,
    },
  },
  emits: ['update:theme', 'update:fontSize'],
  methods: {
    handleTheme(theme) {
      this.$emit('update:theme', theme);
    },
    handleFontSize(fontSize) {
      this.$emit('update:fontSize', fontSize);
    },
  },
};
</script>
