<template>
    <div>Editing Restaurant: {{restaurant.name}}</div>
</template>


<script>
export default {
  name: 'EditRestaurant',
  data: function () {
    return {
        restaurant: {}
    }
  },
  mounted() {
      this.getRestaurant()
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