<template>
  <div class="container">
    <div class="mt-5">
      <div class="card">
        <div class="card-header">
          <h5>Navigation</h5>
        </div>
        <div class="card-body">
          <nuxt-link class="breadcrumb-item" :to="`/books/categories/`"><a>Categories</a></nuxt-link>
          <nuxt-link class="breadcrumb-item active" :to="`/books/categories/${valueOfCategory.alias}`">
            <a>{{valueOfCategory.name}}</a></nuxt-link>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3 col-sm-12">
        <div class="dropdown">
          <button class="dropbtn btn btn-outline-primary">Subcategory</button>
          <div class="dropdown-content">
            <nuxt-link tag="button" class="btn btn-outline-success buttonubcategories col-sm-12" :to="`/books/categories/${valueOfCategory.alias}/${subcategory.alias}`"
              v-for="subcategory in subcategories" :key="subcategory.id" append>{{subcategory.name}}</nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-9 col-sm-12">
        <BookLight v-for="book in booksOfCategory" :book="book" :key="book.id" v-if="booksOfCategory.length > 0"></BookLight>
        <div class="card" v-if="booksOfCategory.length == 0">
          <div class="card-header text-center">
            <span>You dont't have books in this category.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BookLight from '~/components/BookLight'
  export default {
    components: {
      BookLight,
    },
    computed: {
      currentValueCategory() {
        return this.$store.getters.categories.find(item => {
          if (item.alias == this.$route.params.category) {
            return item
          }
        })
      },
      subcategories() {
        return this.$store.getters.subcategories ? this.$store.getters.subcategories : []
      },
      booksOfCategory() {
        return this.$store.getters.booksOfCategory ? this.$store.getters.booksOfCategory : []
      },
      valueOfCategory() {
        return this.$store.getters.valueOfCategory ? this.$store.getters.valueOfCategory : []
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('GET_CATEGORIES')
        await this.$store.dispatch('GET_SUBCATEGORIES', this.currentValueCategory.id)
        await this.$store.dispatch('GET_BOOKS_OF_CATEGORY', this.currentValueCategory.id)
        await this.$store.dispatch('GET_CATEGORY_VALUE', this.currentValueCategory)
        await this.$store.dispatch('GET_RATES')
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    },
  }
</script>

<style scoped>
  @media only screen and (max-width:768px) {
    .dropdown {
      margin-bottom: 30px;
    }
  }

  .buttonubcategories {
    min-width: 280px;
  }

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

  .dropdown:hover .dropdown-content,
  .dropdown:active .dropdown-content {
    display: block;
    opacity: .9;
  }
</style>