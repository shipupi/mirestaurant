<template>
        <tr class="row" v-on:click="$router.push('/restaurants/' + slug)">   
            <td>{{name}}</td>
            <td><Rating :name="name" :rating="rating"/></td>
        </tr>
</template>

<script>
import Rating from './Rating.vue'
export default {
  name: 'RestaurantItem',
  components: {
      Rating
  },
  props: {
    rating: Number,
    name: String,
    slug: String
  },
}
</script>

<style lang="css" scoped>
    nav .brand-logo {
        position: relative;
    }

    .row {
        cursor: pointer;
    }
</style>