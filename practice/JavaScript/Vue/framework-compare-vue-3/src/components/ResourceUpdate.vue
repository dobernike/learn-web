<template>
  <form>
    <div class="mb-3">
      <label htmlFor="firstName">Title</label>
      <input
        type="text"
        class="form-control"
        id="firstName"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label htmlFor="email"
        >Description <span class="text-muted">(Optional)</span></label
      >
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="Very interesting book"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        class="form-control"
        id="description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label htmlFor="username">Resource Link</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
        />
      </div>
    </div>
    <hr class="mb-4" />
    <button class="btn btn-primary btn-lg btn-block" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
export default {};
</script>
