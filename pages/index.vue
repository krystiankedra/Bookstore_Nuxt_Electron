<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4 class="alert-heading">Bootcamp Bookstore</h4>
      </div>
      <div class="card-body">
        <p>Bookstore application. Basic on CRUD technology.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use it's Vuex, VueResource, NuxtJs, VueJs.</p>
        <hr>
        <nuxt-link tag="button" :to="`/books/`" class="btn btn-outline-primary col-md-3 col-sm-12"><span class="badge badge-light" v-if="amountBooksList">{{amountBooksList}}</span>
          View Book List <i class="fas fa-sign-out-alt"></i></nuxt-link>
      </div>
      <div class="card-footer text-center">&copy; Krystian Kędra</div>
    </div>
  </div>
</template>

<script>
  export default {
    async mounted() {
      this.$store.dispatch('GET_BOOKS')
    },
    computed: {
      amountBooksList() {
        return this.$store.getters.books.length
      }
    }
  }

</script>