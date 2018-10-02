<template>
  <div class="jumbotron">
    <h3 class="text-center"><strong>Title: </strong>{{valueOfBook.title}}</h3>
    <p class="text-justify mt-3"><strong>Description: </strong>{{valueOfBook.description}}</p>
    <p class="text-justify mt-3"><strong>Category: </strong>{{valueOfCategory.name}}</p>
    <p class="text-justify mt-3"><strong>Subcategory: </strong>{{valueOfSubcategory.name}}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      valueOfBook() {
        return this.$store.getters.valueOfBook ? this.$store.getters.valueOfBook : []
      },
      valueOfSubcategory() {
        return this.$store.getters.valueOfSubcategory ? this.$store.getters.valueOfSubcategory : []
      },
      valueOfCategory() {
        return this.$store.getters.valueOfCategory ? this.$store.getters.valueOfCategory : []
      },
    },
    async mounted() {
      try {
        await this.$store.dispatch('GET_VALUE_OF_BOOK', this.$route.params.id)
        await this.$store.dispatch('GET_SUBCATEGORY_VALUE', {categoryValue: this.valueOfBook.category, subcategoryValue: this.valueOfBook.subcategory})
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    }
  }
</script>