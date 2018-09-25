<template>
    <div>
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
    async mounted() {
        let id = this.$store.getters.categories.find(item => {
            if(item.alias == this.$route.params.alias) {
                return item
            }
        })
        await this.$http.post('http://bootcamp.opole.pl/subcategories', {id: id.id}, {emulateJSON: true})
        .then(response => {
            return response.body.sub_categories
        })
        .then(data => {
            for(let i in data) {
                this.subcategories.push(data[i])
            }
        })
        let currentId = this.subcategories.find(item => {
            if(item.alias == this.$route.params.subcategories) {
                return item
            }
        })
        await this.$http.get('http://bootcamp.opole.pl/books/my-books/subcategory/'+ currentId.id +'/87f4')
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
