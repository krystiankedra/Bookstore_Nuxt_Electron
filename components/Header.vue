<template>
  <div class="container">
    <ul class="nav nav-tabs justify-content-center row">
      <nuxt-link to="/" class="nav-link col-md-3 col-sm-12 text-center" active-class="active" exact>Home</nuxt-link>
      <nuxt-link to="/books" class="nav-link col-md-3 col-sm-12 text-center" active-class="active" exact>Book List</nuxt-link>
      <nuxt-link to="/books/addbook" class="nav-link col-md-3 col-sm-12 text-center" active-class="active" exact>AddBook</nuxt-link>
      <nuxt-link to="/books/categories" class="nav-link col-md-3 col-sm-12 text-center" active-class="active" exact>Categories</nuxt-link>
    </ul>
  </div>
</template>