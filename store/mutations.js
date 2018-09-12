import Vue from 'vue'

export default {
    'SET_BOOKS': (state, payload) => {
      Vue.set(state, 'books', payload)
    },
    'ADD_BOOK': (state, payload) => {
      Vue.set(state, 'books', [...payload])
    },
    'DELETE_BOOK_LOCAL': (state, payload) => {
      Vue.set(state, 'books', state.books.reduce((acc, currentValue) => {
        if (currentValue.id != payload.bookId) {
          acc.push({
            id: currentValue.id,
            title: currentValue.title,
            description: currentValue.description
          })
        }
        return acc
      },[]))
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
      Vue.set(state, 'rates', payload)
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
      Vue.set(state , 'checkMaster' , payload)
    },
  }