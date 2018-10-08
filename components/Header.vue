<template>
  <nav v-if="checkLogin">
    <label for="show-menu" class="show-menu btn btn-outline-primary">&#9776;</label>
    <input type="checkbox" id="show-menu" role="button">
    <ul id="menu"  class="nav nav-tabs justify-content-center text-center">
      <nuxt-link tag="li" to="/home" class="nav-link col-md-2 col-sm-12 text-center" active-class="active" exact><a>Home</a></nuxt-link>
      <nuxt-link tag="li" to="/books" class="nav-link col-md-2 col-sm-12 text-center" active-class="active" exact><a>Book List</a></nuxt-link>
      <nuxt-link tag="li" to="/books/addbook" class="nav-link col-md-2 col-sm-12 text-center" active-class="active" exact><a>Add Book</a></nuxt-link>
      <nuxt-link tag="li" to="/books/categories" class="nav-link col-md-2 col-sm-12 text-center" active-class="active" exact><a>Categories</a></nuxt-link>
      <button @click="logOut" class="col-md-2 col-sm-12 text-center btn btn-outline-danger" active-class="active" exact><a>Log Out</a></button>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    async logOut() {
      localStorage.setItem('reqToken', '');
      await this.$store.commit('SET_LOGIN_STATUS', false)
      await this.$store.commit('SET_TOKEN', '')
      await this.$router.push('/')
    }
  },
  computed: {
    checkLogin() {
      return this.$store.getters.loginStatus
    }
  }
}
</script>

<style scoped>
  .active a{
    border-color: rgb(118, 184, 228) !important;
    color: black !important;
  }

  li {
    display: inline-block;
  }

  li a, li button {
    display: block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
  }

  li ul {
    display: none;
  }

  li ul li {
    display: block;
    float: none;
  }

  li ul li a, li ul li button {
    width: auto;
    min-width: 100px;
    padding: 0 20px;
  }

  .show-menu {
    text-decoration: none;
    text-align: center;
    padding: 10px 0;
    display: none;
  }

  input[type=checkbox] {
    display: none;
  }

  input[type=checkbox]:checked~#menu {
    display: block;
  }

  @media screen and (max-width : 760px) {

    ul {
      position: static;
      display: none;
    }

    li {
      margin-bottom: 1px;
    }

    ul li,
    li a, li button,  {
      width: 100%;
    }

    .show-menu {
      display: block;
    }
  }
</style>