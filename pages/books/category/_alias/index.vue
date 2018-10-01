<template>
  <div class="container">
    <div class="row mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <nuxt-link class="breadcrumb-item" :to="`/books/category/`"><a>Category</a></nuxt-link>
          <nuxt-link class="breadcrumb-item active" :to="`/books/category/${valueOfCategory.alias}`">
            <a>{{valueOfCategory.name}}</a></nuxt-link>
        </ol>
      </nav>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="dropdown">
          <button class="dropbtn btn btn-primary">Subcategory</button>
          <div class="dropdown-content">
            <nuxt-link :to="`/books/category/${valueOfCategory.alias}/${subcategory.alias}`" v-for="subcategory in subcategories"
              :key="subcategory.id" append><a>{{subcategory.name}}</a></nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book,index) in booksOfCategory" :key="book.id">
              <th scope="row">{{index+1}}</th>
              <td>{{book.title}}</td>
              <td>{{book.description}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentValueCategory() {
        return this.$store.getters.categories.find(item => {
          if (item.alias == this.$route.params.alias) {
            return item
          }
        })
      },
      subcategories() {
        return this.$store.getters.subcategories ? this.$store.getters.subcategories : []
      },
      booksOfCategory() {
        return this.$store.getters.booksOfCategory ? this.$store.getters.booksOfCategory  : []
      },
      valueOfCategory() {
        return this.$store.getters.valueOfCategory ? this.$store.getters.valueOfCategory : []
      }
    },
    async mounted() {
      await this.$store.dispatch('GET_CATEGORIES')
      await this.$store.dispatch('GET_SUBCATEGORIES', this.currentValueCategory.id)
      await this.$store.dispatch('GET_BOOKS_OF_CATEGORY', this.currentValueCategory.id)
      await this.$store.dispatch('GET_CATEGORY_VALUE', this.currentValueCategory)
    },
  }

</script>

<style>
  .dropbtn {
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    border-radius: 15px;
    display: none;
    position: absolute;
    background-color: #fdfffe;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: bold;
  }

  .dropdown-content a:hover {
    color: red;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

</style>
