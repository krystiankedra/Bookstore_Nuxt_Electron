<template>
  <div class="container mt-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <nuxt-link tag="li" class="breadcrumb-item" :to="`/books/category/`"><a>Category</a></nuxt-link>
        <nuxt-link tag="li" class="breadcrumb-item" :to="`/books/category/${valueOfRouterCategory.alias}`"><a>{{valueOfRouterCategory.name}}</a></nuxt-link>
        <nuxt-link tag="li" class="breadcrumb-item active" :to="`/books/category/${valueOfRouterCategory.alias}/${valueOfRouterSubcategory.alias}`"><a>{{valueOfRouterSubcategory.name}}</a></nuxt-link>
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
        <tr v-for="(book,index) in books" :key="book.id">
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
    data() {
      return {
        subcategories: [],
        books: [],
        valueOfRouterCategory: '',
        valueOfRouterSubcategory: ''
      }
    },
    async mounted() {
      let currentID = this.$store.getters.categories.find(item => {
        if (item.alias == this.$route.params.alias) {
          return item
        }
      })
      const categories = []
      let response = await this.$http.get('http://bootcamp.opole.pl/categories')
      let responseData = response.data.categories
      for (let i in responseData) {
        categories.unshift(responseData[i])
      }
      categories.find(item => {
        if (item.id == currentID.id) {
          return this.valueOfRouterCategory = item
        }
      })
      await this.$http.post('http://bootcamp.opole.pl/subcategories', {
          id: currentID.id
        }, {
          emulateJSON: true
        })
        .then(response => {
            for (let i in response.body.sub_categories) {
              this.subcategories.push(response.body.sub_categories[i])
            }
        })
      let currentSubID = this.subcategories.find(item => {
        if (item.alias == this.$route.params.subcategories) {
          return this.valueOfRouterSubcategory = item
        }
      })
      await this.$http.get('http://bootcamp.opole.pl/books/my-books/subcategory/' + currentSubID.id + '/87f4')
        .then(response => {
          for (let i in response.body.books) {
            this.books.push(response.body.books[i])
          }
        })
    }
  }
</script>