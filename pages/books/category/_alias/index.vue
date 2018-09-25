<template>
    <div>
        <nuxt-link tag="li" :to="`/books/category/${$route.params.alias}/${subcategory.alias}`" v-for="subcategory in subcategories" :key="subcategory.id" append><a>{{subcategory.name}}</a></nuxt-link>
        <li v-for="book in books" :key="book.id">{{book.title}} || {{book.description}}</li>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subcategories: [],
            books: []
        }
    },
    mounted() {
        let id = this.$store.getters.categories.find(item => {
            if(item.alias == this.$route.params.alias) {
                return item
            }
        })
        this.$http.post('http://bootcamp.opole.pl/subcategories', {id: id.id}, {emulateJSON: true})
        .then(response => {
            return response.body.sub_categories
        })
        .then(data => {
            for(let i in data) {
                this.subcategories.push(data[i])
            }
        })
        const books = this.$http.get('http://bootcamp.opole.pl/books/my-books/category/' + id.id + '/87f4')
        .then(response => {
            return response.body.books
        })
        .then(data => {
            for(let i in data) {
                this.books.push(data[i])
            }
        })
    }
}
</script>

<style>

</style>
