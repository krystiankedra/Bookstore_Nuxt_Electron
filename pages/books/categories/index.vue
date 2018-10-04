<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h5>Navigation</h5>
      </div>
      <div class="card-body">
        <li class="breadcrumb-item active resetLi" aria-current="page">
          <nuxt-link :to="`/books/categories/`"><a>Categories</a></nuxt-link>
        </li>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-header">
        <h4 class="alert-heading">Categories of Books</h4>
      </div>
      <div class="card-body">
        <hr>
        <p class="mb-0">Select one of below categories. Use breadcrumbs to navigate beetwen categories or
          subcategories.</p>
        <hr>
      </div>
      <div class="card-footer text-center">
        <div class="text-center">
          <nuxt-link tag="button" class="btn btn-outline-primary col-sm-12 col-md-4" :to="`/books/categories/${category.alias}`" v-for="category in categories"
            :key="category.id">{{category.name}}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      categories() {
        return this.$store.getters.categories ? this.$store.getters.categories : []
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('GET_CATEGORIES')
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    }
  }
</script>

<style scoped>
  .resetLi {
    list-style: none;
  }

  .btn {
    margin: 5px;
  }

  @media only screen and (max-width:768px) {
    a .btn {
      margin-top: 5px;
      color: white;
      width: 100%;
    }
  }
</style>