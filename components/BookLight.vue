<template>
  <div>
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
        <!-- <p><strong>Category: </strong>{{categoryValue ? categoryValue.name : 'No Category Selected!'}}</p> -->
        <!-- <div class="form-group" v-if="rate">
          <strong>Rate:</strong>
          <star-rating v-model="average" :increment="0.01" :border-width="3" :star-size="25" :read-only="true"></star-rating>
        </div>
      </div> -->
      <div class="text-center">
       <nuxt-link tag="button" class="btn btn-outline-primary" :to="`/books/${book.id}`">Details <i class="fas fa-info"></i></nuxt-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:['book', 'index']
}
</script>
