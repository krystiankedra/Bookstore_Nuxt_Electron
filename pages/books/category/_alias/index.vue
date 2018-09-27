<template>
  <div class="container">
    <div class="row mt-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <nuxt-link tag="li" class="breadcrumb-item" :to="`/books/category/`"><a>Category</a></nuxt-link>
          <nuxt-link tag="li" class="breadcrumb-item active" :to="`/books/category/${valueOfRouter.alias}`">
            <a>{{valueOfRouter.name}}</a></nuxt-link>
        </ol>
      </nav>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="dropdown">
          <button class="dropbtn btn btn-primary">Subcategory</button>
          <div class="dropdown-content">
            <nuxt-link tag="li" :to="`/books/category/${$route.params.alias}/${subcategory.alias}`" v-for="subcategory in subcategories"
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
            <tr v-for="(book,index) in books" :key="book.id">
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
    data() {
      return {
        subcategories: [],
        books: [],
        valueOfRouter: ''
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
          return this.valueOfRouter = item
        }
      })
      await this.$http.post('http://bootcamp.opole.pl/subcategories', {id: currentID.id}, { emulateJSON: true
        })
        .then(response => {
          for (let i in response.body.sub_categories) {
            this.subcategories.push(response.body.sub_categories[i])
          }
        })
      await this.$http.get('http://bootcamp.opole.pl/books/my-books/category/' + currentID.id + '/87f4')
        .then(response => {
          for (let i in response.body.books) {
            this.books.push(response.body.books[i])
          }
        })
    }
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
