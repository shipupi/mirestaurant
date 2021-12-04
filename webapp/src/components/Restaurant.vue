<template>
  <div>
    <div class="section no-pad-bot" id="index-banner">
      <div class="container">
          <h1 class="header orange-text">Red Lobster</h1>
          <div class="title-container"><Rating :rating="4.3" name="Red Lobster"/></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Latest review  </h3>
          </div>
          <div class="row">
            <Review :key="1" :name="'Red Lobster'" :rating="4"/>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Highest review  </h3>
          </div>
          <div class="row">
            <Review :key="2" :name="'Red Lobster'" :rating="5"/>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Lowest review  </h3>
          </div>
          <div class="row">
            <Review :key="1" :name="'Red Lobster'" :rating="2"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Review from "./Review.vue"
import Rating from './Rating.vue'
export default {
  name: 'Restaurant',
  components: {
    Review,
    Rating
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
}

.col {
  margin-right: auto;
}

.title-container {
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
}
</style>
