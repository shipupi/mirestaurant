<template>
    <table class="center highlight">
        <thead>
        <tr>
            <th>Name</th>
            <th>Rating</th>
        </tr> 
        </thead>
        <tbody>
            <tr v-if="!restaurants.length"><td>No restaurants</td><td/></tr>
            <RestaurantItem 
                v-for="restaurant in restaurants" 
                :key="restaurant.restaurant_id"
                :name="restaurant.name" 
                :rating="restaurant.rating" 
                :slug="restaurant.slug" 
            />
        </tbody>
    </table>
</template>



<script>

import RestaurantItem from './RestaurantItem.vue'

export default {
  name: 'Restaurants',
  components: {
      RestaurantItem
  },
  data () {
    return {
        restaurants: []
    }
  },
  mounted() {
      this.getRestaurants()
  },
  methods: {
      getRestaurants() {
          this.$http.get(this.$api_url + '/restaurants')
          .then(response => {
              this.restaurants = response.data
          }).catch(() => {
              this.$toast.error("Unable to get restaurants");
          })
      }
  }
}
</script>

<style lang="css" scoped>
    nav .brand-logo {
        position: relative;
    }
</style>