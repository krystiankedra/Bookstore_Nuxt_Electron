<template>
  <div class="container">
    <div class="card mt-5 flex-fill">
      <div class="card-header">
        <div class="container">
          <div class="text-center">
            <h6 class="card-title"><strong>{{book.title}}</strong></h6>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="text-justify"><strong>Description: </strong>{{book.description}}</p>
        <nuxt-link tag="button" class="btn btn-outline-primary btn-margin col-md-3 col-sm-12" :to="`/books/${book.id}`">Details
          <i class="fas fa-info"></i></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['book']
  }
</script>