import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import localBooks from '../assets/data/localBooks.json'
Vue.use(VueResource);


const createStore = () => {
  return new Vuex.Store({
    state: {
      books: [],
      rates: [],
      selectedBooks: [],
      checkMaster: false,
    },
    getters: {
      books: state => {
        return state.books
      },
      rates: state => {
        return state.rates
      },
      masterCheck: state => {
        return state.checkMaster
      }
    },
    actions: {
      async 'GET_BOOKS'({commit}) {
        const books = []
        await Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
        .then(response => {
          return response.data.books
        })
        .then(data => {
          for(let i in localBooks.books) {
            books.unshift(localBooks.books[i])
          }
          for(let i in data) {
            books.unshift(data[i])
          }
        })
        commit('SET_BOOKS', books)
      },
      async 'SEND_BOOK'({commit}, payload) {
        await Vue.http.post('http://bootcamp.opole.pl/books/add-book/87f4', payload, {emulateJSON: true})
        commit('ADD_BOOK', payload)
      },
      async 'DELETE_BOOK'({commit}, payload) {
        await Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + payload.bookId + '/87f4')
        commit('DELETE_BOOK_LOCAL', payload)
      },
      async 'MODIFY_BOOK'({commit}, payload) {
        await Vue.http.post('http://bootcamp.opole.pl/books/edit-book/' + payload.bookId + '/87f4', {title: payload.title, description: payload.description}, {emulateJSON: true})
        await Vue.http.post('http://bootcamp.opole.pl/books/rate/87f4', {id: payload.bookId, rate: payload.rate}, {emulateJSON: true})
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
        const rates = response.body.rates
        commit('SET_RATES', rates)
        commit('MODIFY_BOOK_LOCAL', payload)
      },
      'SORT_BY_TITLE'({commit}, payload) {
        commit('SORTED_TITLE', payload)
      },
      'SORT_BY_DESCRIPTION'({commit}, payload) {
        commit('SORTED_DESCRIPTION', payload)
      },
      async 'GET_RATES'({commit}) {
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
        const rates = response.body.rates
        commit('SET_RATES', rates)
      },
      'SELECTED_BOOK'({commit}, payload) {
          commit('SELECTED_BOOK_LOCAL', payload)
      },
      async 'DELETE_SELECTED'({commit}) {
        for (let i in this.state.selectedBooks) {
          await Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + this.state.selectedBooks[i].bookId + '/87f4')
          commit('DELETE_BOOK_LOCAL', this.state.selectedBooks[i])
        }
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
        const books = response.data.books
        commit('SET_BOOKS', books)
      },
      'SELECTED_MASTER'({commit}, payload) {
        commit('SELECTED_MASTER_LOCAL', payload)
      },
    },
    mutations: {
      'SET_BOOKS': (state, payload) => {
        state.books = payload
      },
      'ADD_BOOK': (state, payload) => {
        state.books.unshift(payload)
      },
      'DELETE_BOOK_LOCAL': (state, payload) => {
        state.books.splice(payload.index, 1)
      },
      'MODIFY_BOOK_LOCAL': (state, payload) => {
        Vue.set(state.books[payload.index], 'title', payload.title)
        Vue.set(state.books[payload.index], 'description', payload.description)
      },
      'SORTED_TITLE': (state, payload) => {
        if (payload) {
          return state.books.sort(
            (element1, element2) => element1.title.toLowerCase() < element2.title.toLowerCase() ? -1 : 1);
        } else {
          return state.books.sort(
            (element1, element2) => element1.title.toLowerCase() < element2.title.toLowerCase() ? 1 : -1);
        }
      },
      'SORTED_DESCRIPTION': (state, payload) => {
        if (payload) {
          return state.books.sort(
            (element1, element2) => element1.description.toLowerCase() < element2.description.toLowerCase() ? -1 : 1);
        } else {
          return state.books.sort(
            (element1, element2) => element1.description.toLowerCase() < element2.description.toLowerCase() ? 1 : -1);
        }
      },
      'SET_RATES': (state, payload) => {
        state.rates = payload;
      },
      'SELECTED_BOOK_LOCAL': (state, payload) => {
        if (state.selectedBooks.length > state.books.length) {
          return false
        } else {
          if (payload.checked) {
            state.selectedBooks.unshift(payload)
          } else if (!payload.checked) {
            state.selectedBooks.splice(payload.index, 1)
          } else {
            state.selectedBooks.splice(payload.index, 1)
          }
        }
      },
      'SELECTED_MASTER_LOCAL': (state, payload) => {
        state.checkMaster = payload
      },
    }
  })
}
export default createStore