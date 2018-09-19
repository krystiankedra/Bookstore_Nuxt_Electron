<template>
  <div class="jumbotron">
    <h3 class="text-center"><strong>Title: </strong>{{book.title}}</h3>
    <p class="text-justify mt-3"><strong>Description: </strong>{{book.description}}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      book() {
        return this.$store.getters.books.find(book => {
          return book.id == this.$route.params.id
        })
      },
    },
  }

</script>

<style scoped>

</style>
