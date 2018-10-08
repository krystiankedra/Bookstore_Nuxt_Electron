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
      <div class="btn-group col-sm-12 col-md-5">
        <button class="btn btn-outline-info" @click="sortDesc(sortByDesc=!sortByDesc)">Sort Desc
          <i :class="[sortByDesc ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
        <button class="btn btn-outline-info" @click="sortTitle(sortByTitle=!sortByTitle)">Sort Title
          <i :class="[sortByTitle ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
      </div>
      <div class="btn-group col-sm-12 col-md-5">
        <button class="btn btn-outline-danger" @click="deleteSelected"><span class="badge badge-light" v-if="amountSelectedBooks">{{amountSelectedBooks}}</span>
          Delete Selected <i class="fas fa-trash-alt"></i></button>
        <input type="checkbox" v-model="checkMaster" @input="checkMaster = !checkMaster" class="font-size-checkbox">
      </div>
      <div class="btn-group col-md-2 col-sm-12">
        <button class="btn btn-outline-primary" @click="addJson">Import From File <i class="fas fa-file"></i></button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="btn-group col-sm-12 col-md-5">
        <button class="btn btn-outline-primary" @click="prevPage"><i class="fas fa-arrow-left"></i> Previous</button>
        <button class="btn btn-outline-primary" @click="nextPage">Next <i class="fas fa-arrow-right"></i></button>
      </div>
    </div>
    <div class="row">
      <Book class="col-md-6 d-flex" v-for="(book,index) in filteredBooks" :key="book.id" :index="index" :book="book"
        :checkMaster="checkMaster"></Book>
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
        this.$store.commit('ERROR', e)
      }
    },
    data() {
      return {
        search: '',
        sortByTitle: false,
        sortByDesc: false,
        checkMaster: false,
        pageNumber: 0,
        size: 6
      }
    },
    computed: {
      filteredBooks() {
        return this.paginatedData.filter(element => {
          return (element.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            element.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        });
      },
      amountSelectedBooks() {
        return this.$store.getters.selectedBooks.length
      },
      paginatedData() {
        const start = this.pageNumber * this.size
        const end = start + this.size;
        return this.$store.getters.books.slice(start, end);
      }
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
        try {
          if (this.$store.getters.selectedBooks.length == 0) {
            this.$router.push('/books/alertSelect')
            return false;
          } else {
            await this.$store.dispatch('DELETE_SELECTED');
            this.checkMaster ? this.checkMaster = !this.checkMaster : this.checkMaster
          }
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      async addJson() {
        try {
          await this.$store.dispatch('GET_JSON')
          await this.$store.dispatch('GET_BOOKS')
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      nextPage() {
        this.pageNumber++;
      },
      prevPage() {
        this.pageNumber--;
      }
    },
  }

</script>

<style scoped>
  .font-size-checkbox {
    width: 40px;
    height: 40px;
    margin-left: 5px;
  }

  @media only screen and (max-width:768px) {
    .btn {
      width: 100%;
      margin: 5px;
    }

    .font-size-checkbox {
      width: 40px;
      height: 40px;
    }
  }

</style>
