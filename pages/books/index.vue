<template>
  <div class="container">
    <div class="row">
      <div class="input-group mb-3 mt-5 col-sm-6 offset-sm-3">
        <input type="text" placeholder="Type search" class="form-control" v-model="search">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3 col-sm-12">
        <button class="btn btn-secondary" @click="sortTitle(sortByTitle=!sortByTitle)">Sort Title
          <i :class="[sortByTitle ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
      </div>
      <div class="col-md-3 col-sm-12">
        <button class="btn btn-secondary" @click="sortDesc(sortByDesc=!sortByDesc)">Sort Desc
          <i :class="[sortByDesc ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
      </div>
      <div class="col-md-3 col-sm-12">
        <button class="btn btn-danger" @click="deleteSelected">Delete Selected <i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="col-md-1 col-sm-12 text-center">
        <input type="checkbox" v-model="checkMaster" @input="checkMaster = !checkMaster" class="font-size-checkbox">
      </div>
      <div class="col-md-2 col-sm-12">
        <button class="btn btn-primary" @click="addJson">Import From File <i class="fas fa-file"></i></button>
      </div>
    </div>
    <div class="row">
      <Book class="col-md-4 d-flex" v-for="(book,index) in filteredBooks" :key="book.id" :index="index" :book="book" :checkMaster="checkMaster"></Book>
    </div>
  </div>
</template>

<script>
  import Book from '~/components/Book'
  export default {
    async mounted() {
      try {
        await this.$store.dispatch('GET_BOOKS')
        await this.$store.dispatch('GET_RATES')
        await this.$store.dispatch('GET_CATEGORIES')
      } catch (e) {
        console.log(e);
      }
    },
    data() {
      return {
        search: '',
        sortByTitle: false,
        sortByDesc: false,
        checkMaster: false,
      }
    },
    computed: {
      filteredBooks() {
        return this.$store.getters.books.filter(element => {
          return (element.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            element.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        });
      },
    },
    components: {
      Book
    },
    methods: {
      sortTitle(value) {
        this.$store.dispatch("SORT_BY_TITLE", value);
      },
      sortDesc(value) {
        this.$store.dispatch("SORT_BY_DESCRIPTION", value);
      },
      async deleteSelected() {
        if (this.$store.state.selectedBooks.length == 0) {
          this.$router.push('/books/alertSelect')
          return false;
        } else {
          await this.$store.dispatch('DELETE_SELECTED');
          this.checkMaster ? this.checkMaster = !this.checkMaster : this.checkMaster
        }
      },
      async addJson() {
        await this.$store.dispatch('GET_JSON')
        await this.$store.dispatch('GET_BOOKS')
      }
    },
  }
</script>

<style scoped>
  .font-size-checkbox {
    width: 25px;
    height: 25px;
  }

  @media only screen and (max-width:768px) {
    .btn {
      width: 100%;
      margin:5px;
    }
    .font-size-checkbox {
      width: 40px;
      height: 40px;
    }
  }
</style>
