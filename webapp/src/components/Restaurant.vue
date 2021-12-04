<template>
  <div>
    <div class="section no-pad-bot" id="index-banner">
      <div class="container">
        <h1 class="header orange-text">Red Lobster</h1>
      </div>
    </div>
    <div class="container">
      <h3 class="blue-text s12"> Latest review  </h3>
      <Review class="s12 "/>
    </div>
  </div>
</template>

<script>
import Review from "./Review.vue"
export default {
  name: 'Restaurant',
  components: {
    Review
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  text-align: left;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
