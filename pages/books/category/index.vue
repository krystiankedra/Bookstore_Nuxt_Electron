<template>
    <div>
        <nuxt-link tag="li" :to="`/books/category/${category.alias}`" v-for="category in categories" :key="category.id"><a>{{category.name}}</a></nuxt-link>
    </div>
</template>

<script>
export default {
    computed: {
        categories() {
            return this.$store.getters.categories
        }
    }
}
</script>

<style>

</style>
