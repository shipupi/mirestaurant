<template>
    <div class="container">
        <div class="row">
            <h1 class="header orange-text">Admin Page</h1>
        </div>
        <div class="row">
            <ul class="center-align tabs">
                <li class="tab col s3 offset-s3"><router-link to="/admin/restaurants" class="active">Restaurants</router-link></li>
                <li class="tab col s3"><router-link to="/admin/users">Users</router-link></li>
            </ul>
        </div>
        <div class="row">
            <div class="column s12 left-align">
                <router-link to="/admin/create_restaurant" class="waves-effect waves-light btn-large ">
                    <i class="material-icons left">add</i>New Restaurant
                </router-link>
                <table class="center highlight">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Rating</th>
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
                            <td>{{restaurant.restaurant_id}}</td>
                            <td>{{restaurant.name}}</td>
                            <td>{{restaurant.rating == -1? '-' : restaurant.rating}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
      window.M.AutoInit()
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