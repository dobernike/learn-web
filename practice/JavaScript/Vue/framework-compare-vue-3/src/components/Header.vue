<template>
  <div class="py-5 text-center">
    <img height="150" src="../assets/logo.png" />
    <h2>Keep Resources</h2>
    <p class="lead">Keep your resource at once place</p>

    <router-link
      :to="{ name: 'resourceHomePage' }"
      class="btn btn-outline-primary mr-2"
      >Home</router-link
    >
    <router-link
      :to="{ name: 'resourceNewPage' }"
      class="btn btn-outline-primary"
      >New</router-link
    >
  </div>
</template>

<script>
export default {};
</script>
