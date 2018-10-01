<template>
  <div class="container mt-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <nuxt-link class="breadcrumb-item" :to="`/books/category/`"><a>Category</a></nuxt-link>
        <nuxt-link class="breadcrumb-item" :to="`/books/category/${valueOfCategory.alias}`"><a>{{valueOfCategory.name}}</a></nuxt-link>
        <nuxt-link class="breadcrumb-item active" :to="`/books/category/${valueOfCategory.alias}/${valueOfSubcategory.alias}`"><a>{{valueOfSubcategory.name}}</a></nuxt-link>
      </ol>
    </nav>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book,index) in booksOfSubcategory" :key="book.id">
          <th scope="row">{{index+1}}</th>
          <td>{{book.title}}</td>
          <td>{{book.description}}</td>
        </tr>
      </tbody>
    </table>
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
      currentValueSubcategory() {
        return this.$store.getters.subcategories.find(item => {
          if (item.alias == this.$route.params.subcategories) {
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
      await this.$store.dispatch('GET_CATEGORIES')
      await this.$store.dispatch('GET_SUBCATEGORIES', this.currentValueCategory.id)
      await this.$store.dispatch('GET_SUBCATEGORY_VALUE', {categoryValue: this.currentValueCategory.id, subcategoryValue: this.currentValueSubcategory.id})
      await this.$store.dispatch('GET_BOOKS_OF_SUBCATEGORY', this.currentValueSubcategory.id)
    }
  }

</script>
