<template>
    <table class="center highlight">
        <thead>
          <tr>
              <th>Name</th>
              <th>Rating</th>
          </tr> 
        </thead>
        <tbody>
            <RestaurantItem name="Red Lobster" :rating="4.9" slug="red-lobster" />
            <RestaurantItem name="Black Lobster" :rating="1.9" slug="black-lobster" />
        </tbody>
    </table>
</template>



<script>

import RestaurantItem from './RestaurantItem.vue'

export default {
  name: 'Restaurants',
  components: {
      RestaurantItem
  }
}
</script>

<style lang="css" scoped>
    nav .brand-logo {
        position: relative;
    }
</style>