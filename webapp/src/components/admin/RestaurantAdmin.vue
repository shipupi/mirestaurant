<template>
    <div class="column s12">
        <table class="center highlight">
            <thead>
                <tr>
                    <th>Name</th>
                </tr> 
            </thead>
            <tbody>
                <tr  v-if="!restaurants.length"><td>No restaurants</td><td/></tr>
                <tr 
                  class="pointer"
                  v-for="restaurant in restaurants" 
                  :key="restaurant.id" 
                  v-on:click="$router.push('/admin/restaurants/' + restaurant.slug)"
                >
                    <td>{{restaurant.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
  name: 'RestaurantAdmin',
  data: function () {
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
<style scoped>
.pointer {
    cursor: pointer;
}
</style>