<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h5>Navigation</h5>
      </div>
      <div class="card-body">
        <nuxt-link class="breadcrumb-item" :to="`/books/categories/`"><a>Categories</a></nuxt-link>
        <nuxt-link class="breadcrumb-item" :to="`/books/categories/${valueOfCategory.alias}`"><a>{{valueOfCategory.name}}</a></nuxt-link>
        <nuxt-link class="breadcrumb-item active" :to="`/books/categories/${valueOfCategory.alias}/${valueOfSubcategory.alias}`"><a>{{valueOfSubcategory.name}}</a></nuxt-link>
      </div>
    </div>
    <div class="row" v-if="booksOfSubcategory.length > 0">
      <BookLight v-for="book in booksOfSubcategory" class="col-sm-12 col-md-6 d-flex" :book="book" :key="book.id"></BookLight>
    </div>
    <div class="card mt-5 text-center" v-if="booksOfSubcategory.length == 0">
      <div class="card-header">
        <span>You dont't have books in this subcategory.</span>
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
      currentValueSubcategory() {
        return this.$store.getters.subcategories.find(item => {
          if (item.alias == this.$route.params.subcategory) {
            return item
          }
        })
      },
      booksOfSubcategory() {
        return this.$store.getters.booksOfSubcategory ? this.$store.getters.booksOfSubcategory : []
      },
      valueOfCategory() {
        return this.$store.getters.valueOfCategory ? this.$store.getters.valueOfCategory : []
      },
      valueOfSubcategory() {
        return this.$store.getters.valueOfSubcategory ? this.$store.getters.valueOfSubcategory : []
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('GET_CATEGORIES')
        await this.$store.dispatch('GET_SUBCATEGORIES', this.currentValueCategory.id)
        await this.$store.dispatch('GET_SUBCATEGORY_VALUE', {
          categoryValue: this.currentValueCategory.id,
          subcategoryValue: this.currentValueSubcategory.id
        })
        await this.$store.dispatch('GET_BOOKS_OF_SUBCATEGORY', this.currentValueSubcategory.id)
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    }
  }

</script>