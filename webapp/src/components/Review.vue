<template>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <div class="centered"> 
        <Rating :rating="rating" :name="name"/>
      </div>
      <p>I am a very simple card. I am good at containing small bits of information.
      I am convenient because I require little markup to use effectively.</p>
    </div>
    <div class="card-action">
      <a href="#">This is a link</a>
      <a href="#">This is a link</a>
    </div>
  </div>
</template>


<script>
import Rating from './Rating.vue'
export default {
  name: 'Review',
  components: {
    Rating
  },
  props: {
    rating: Number,
    name: String,
  }
}
</script>

<style scoped>
.page-footer {
    margin-top: auto;
    padding-top: 0;
}

.card {
  min-height: 200px
}

.centered {
  display: flex;
  justify-content: center;
}

.col {
  margin-right: auto;
}
</style>