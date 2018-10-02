<template>
  <div class="container mt-5">
    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="title"><strong>New Title</strong></label>
      <input type="text" class="col-sm-8 col-sm-offset-2 form-control" placeholder="Type new Title..."  v-model="title">
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label"><strong>New Description</strong></label>
      <input type="text" class="col-sm-8 col-sm-offset-2 form-control" placeholder="Type new Description..."  v-model="description">
    </div>
    <div class="form-group row">
      <label for="category" class="col-sm-2 col-form-label"><strong>New Category</strong></label>
      <select v-model="category" class="col-sm-8 col-sm-offset-2 form-control" @change="getSubcategories(category)">
        <option disabled value="">Please select category</option>
        <option v-for="(category,index) in categories" :key="index" :value="category.id">{{category.name}}</option>
      </select>
    </div>
    <div class="form-group row" v-if="category">
      <label for="subcategory" class="col-sm-2 col-form-label"><strong>New Subcategory</strong></label>
      <select v-model="subcategory" class="col-sm-8 col-sm-offset-2 form-control">
        <option disabled value="">Please select subcategory</option>
        <option v-for="(subcategory,index) in subcategories" :key="index" :value="subcategory.id">{{subcategory.name}}</option>
      </select>
    </div>
    <div class="row justify-content-center">
      <button class="btn btn-success" @click="addBook">Add Book <i class="fas fa-plus-circle"></i></button>
    </div>
    <div class="mt-5">
      <div class="alert alert-success col-md-5 float-left text-center" v-if="title.length > 0">
        <span>Title is correct <i class="fas fa-thumbs-up"></i></span>
      </div>
      <div class="alert alert-success col-md-5 float-right text-center" v-if="description.length > 0">
        <span>Description is correct <i class="fas fa-thumbs-up"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async mounted() {
      try {
        await this.$store.dispatch('GET_CATEGORIES')
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    },
    data() {
      return {
        title: '',
        description: '',
        category: '',
        subcategory: '',
      }
    },
    methods: {
      async addBook() {
        try {
          if (this.title.length <= 0 || this.description.length <= 0) {
            this.$router.push('alert')
          } else {
            const newBook = {}
            this.$set(newBook, 'title', this.title)
            this.$set(newBook, 'description', this.description)
            this.$set(newBook, 'category', this.category)
            this.$set(newBook, 'subcategory', this.subcategory)
            await this.$store.dispatch('SEND_BOOK', newBook)
            this.$router.push('/books')
          }
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      async getSubcategories(value) {
        try {
          await this.$store.dispatch('GET_SUBCATEGORIES', value)
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      }
    },
    computed: {
      categories() {
        return this.$store.getters.categories
      },
      subcategories() {
        return this.$store.getters.subcategories
      }
    }
  }
</script>