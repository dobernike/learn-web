<template>
  <!-- The Modal -->
  <div v-if="isOpen" id="myModal" class="app-modal">
    <!-- Modal content -->
    <div class="app-modal-content">
      <span @click="$emit('on-close')" class="close">&times;</span>
      <div class="mb-3">
        <slot><p>Some text in the Modal..</p></slot>
      </div>
      <button @click="$emit('on-submit')" class="btn btn-primary">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['on-close', 'on-submit'],
};
</script>

<style scoped>
/* The Modal (background) */
.app-modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.app-modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
