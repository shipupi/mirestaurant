<template>
  <div class="card blue-grey darken-1" >
    <div class="card-content white-text">
      <div class="centered"> 
        <Rating :rating="rating" :name="name"/>
      </div>
      <p>{{message}}</p>
    </div>
    <div class="card-action">
      <div class="orange-text">By {{user}}</div>
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
    user: String,
    message: String,
  }
}
</script>

<style scoped>
.page-footer {
    margin-top: auto;
    padding-top: 0;
}

.card {
  min-height: 200px;
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
}

.centered {
  display: flex;
  justify-content: center;
}

.col {
  margin-right: auto;
}

</style>