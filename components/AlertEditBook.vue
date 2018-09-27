<template>
<div class="container">
  <div class="page-header">
    <h1>Error
      <small>When editing a book, complete the new title and description.</small>
    </h1>
    <button class="btn btn-danger" @click="navigationToBooks">Try again</button>
  </div>
</div>
</template>

<script>
  export default {
    methods: {
      navigationToBooks() {
        this.$router.push('/books')
      }
    }
  }
</script>