import localBooks from '../assets/data/localBooks.json'
import Vue from 'vue'

export default {
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
  }