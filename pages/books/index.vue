<template>
  <div class="container">
    <div class="row">
      <input type="text" placeholder="Type search" class="form-control col-sm-6 offset-sm-3 mt-5" v-model="search">
    </div>
    <div class="row">
      <div class="col-sm-3">
        <button class="btn btn-secondary" @click="sortTitle(sortByTitle=!sortByTitle)">Sort Title
          <i :class="[sortByTitle ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
      </div>
      <div class="col-sm-3">
        <button class="btn btn-secondary" @click="sortDesc(sortByDesc=!sortByDesc)">Sort Desc
          <i :class="[sortByDesc ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up']"></i>
        </button>
      </div>
      <div class="col-sm-3">
        <button class="btn btn-warning" @click="deleteSelected">Delete Selected Book</button>
      </div>
      <div class="col-sm-3">
        <input type="checkbox" v-model="checkMaster" @input="selectedMaster">
      </div>
    </div>
    <div class="row">
      <Book class="col-md-4" v-for="(book,index) in filteredBooks" :key="book.id" :index="index" :book="book"
        :masterCheck="masterCheck"></Book>
    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  import Book from '~/components/Book'
  export default {
    data() {
      return {
        search: '',
        sortByTitle: false,
        sortByDesc: false,
        checkMaster: false,
      }
    },
    async mounted() {
      try {
        await this.$store.dispatch('GET_BOOKS')
        await this.$store.dispatch('GET_RATES')
      } catch (e) {
        console.log(e);
      }
    },
    computed: {
      ...mapGetters(['books', 'masterCheck']),
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
        }
      },
      selectedMaster() {
        this.$store.dispatch('SELECTED_MASTER', !this.checkMaster)
      }
    }
  }

</script>
