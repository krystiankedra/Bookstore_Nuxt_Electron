<template>
<div class="container">
  <div class="page-header">
    <h1>Error
      <small>When adding a book, complete the new title and description.</small>
    </h1>
    <button class="btn btn-danger" @click="navigationToAddBook">Try again</button>
  </div>
</div>
</template>

<script>
  export default {
    methods: {
      navigationToAddBook() {
        this.$router.push('/books/addBook')
      }
    }
  }
</script>