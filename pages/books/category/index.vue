<template>
    <div class="container mt-5">
      <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
         <nuxt-link tag="li" :to="`/books/category/`"><a>Category</a></nuxt-link> 
        </li>
      </ol>
    </nav>
    <div class="alert alert-danger">
      <h4 class="alert-heading">Category of Books</h4>
      <p>Select one of below categories. Use breadcrumbs to navigate beetwen categories or subcategories</p>
    </div>
    <div class="text-center">
      <nuxt-link tag="li" :to="{ path:'/books/category/' + category.alias}" v-for="category in categories" :key="category.id"><a class="btn btn-primary">{{category.name}}</a></nuxt-link>
    </div> 
    </div>
</template>

<script>
  export default {
    computed: {
      categories() {
        return this.$store.getters.categories
      }
    }
  }

</script>

<style>
li {
  list-style: none;
  display: inline-block;
  margin:5px;
}
</style>
