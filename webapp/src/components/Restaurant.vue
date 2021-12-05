<template>
  <div>
    <div class="section no-pad-bot" id="index-banner" v-if="Object.keys(restaurant).length == 0">
      <div class="container">
        <h1 class="header orange-text">Restaurant not found</h1>
      </div>
    </div>
    <div class="section no-pad-bot" id="index-banner" v-if="Object.keys(restaurant).length > 0">
      <div class="container">
          <h1 class="header orange-text">Red Lobster</h1>
          <div class="title-container"><Rating :rating="4.3" name="Red Lobster"/></div>
      </div>
    </div>
    <div class="container" v-if="Object.keys(restaurant).length > 0">
      <div class="row">
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Latest review  </h3>
          </div>
          <div class="row">
            <Review 
              :key="1" 
              :name="restaurant.name" 
              :rating="restaurant.reviews.latest.rating" 
              :message="restaurant.reviews.latest.comment"
              :user="restaurant.reviews.latest.user"
            />
          </div>
        </div>
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Highest review  </h3>
          </div>
          <div class="row">
            <Review 
              :key="2" 
              :name="restaurant.name" 
              :rating="restaurant.reviews.highest.rating" 
              :message="restaurant.reviews.highest.comment"
              :user="restaurant.reviews.highest.user"
            />
          </div>
        </div>
        <div class="col s12 m3">
          <div class="row title-container">
            <h3 class="blue-text center-align"> Lowest review  </h3>
          </div>
          <div class="row">
            <Review 
              :key="3" 
              :name="restaurant.name" 
              :rating="restaurant.reviews.lowest.rating" 
              :message="restaurant.reviews.lowest.comment"
              :user="restaurant.reviews.lowest.user"
            />
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
  },
  data () {
    return {
        restaurant: {}
    }
  },
  mounted() {
    this.getRestaurant();
  },
  methods: {
    getRestaurant() {
      this.$http.get(this.$api_url + '/restaurants/' + this.$route.params.slug)
      .then(response => {
          this.restaurant = response.data
      }).catch(() => {
          this.$toast.error("Unable to get restaurant");
      })
    }
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
