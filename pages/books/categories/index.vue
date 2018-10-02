<template>
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
         <nuxt-link :to="`/books/categories/`"><a>Categories</a></nuxt-link> 
        </li>
      </ol>
    </nav>
    <div class="alert alert-danger">
      <h4 class="alert-heading">Category of Books</h4>
      <p>Select one of below categories. Use breadcrumbs to navigate beetwen categories or subcategories.</p>
    </div>
    <div class="text-center">
      <nuxt-link :to="`/books/categories/${category.alias}`" v-for="category in categories" :key="category.id"><a class="btn btn-primary">{{category.name}}</a></nuxt-link>
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
  a .btn {
    margin: 5px;
    color: white;
  }

  a:hover .btn {
    color: white
  }

  @media only screen and (max-width:768px) {
    a .btn {
      margin-top: 5px;
      color: white;
      width: 100%;
    }
  }
</style>