<template>
  <div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <h1 class="header left orange-text">Restaurants</h1>
      <Restaurants/>
    </div>
  </div>
</template>

<script>

import Restaurants from './Restaurants.vue'
export default {
  name: 'Home',
  components: {
    Restaurants
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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
