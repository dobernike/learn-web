<template>
  <form class="card p-2">
    <div class="input-group">
      <input
              @keyup="$emit('on-search', $event.target.value)"
              type="text"
              class="form-control"
              placeholder="Some title"
      />
      <div class="input-group-append">
        <button type="submit" class="btn btn-secondary">Search</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['on-search']
};
</script>
