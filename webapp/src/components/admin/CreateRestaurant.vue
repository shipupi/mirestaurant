<template>
    <div>
        <div class="section no-pad-bot" id="index-banner" >
            <div class="container">
                <h1 class="header orange-text">Create Restaurant</h1>
            </div>
        </div>
        <div class="container">
            <form @submit="handleSubmit">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" v-model="name" :class="{invalid: errors.name}">
                        <label for="name">Name</label>
                        <span v-if="errors.name" class="helper-text" :data-error="errors.name" />
                    </div>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light" type="submit" name="action" >Save
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
export default {
  name: 'CreateRestaurant',
  data: function () {
    return {
        name: '',
        errors: {}
    }
  },
  mounted() {
  },
  methods: {
      handleSubmit(e) {
          e.preventDefault()
          let data = {
              name: this.name,
          }
          this.errors = {}
          this.$http.post(this.$api_url + '/restaurants/', data)
          .then((response) => {
              let restaurant = response.data;
              this.$router.push('/admin/restaurants/' + restaurant.slug)
              this.$toast.success('Restaurant created')
          }).catch((error) => {
                if (error.response.status == 400 || error.response.status == 401) {
                    let errors = {}
                    this.$toast.error("Invalid input");
                    let err = error.response.data.errors
                    err.forEach(e => {
                        errors[e.param] = e.msg
                    })
                    this.errors = Object.assign({}, this.errors, errors)
                    console.log(this.errors)
                } else if (error.response.status ==  500) {
                    this.$toast.error("There was a problem with the server");
                }
            });
      }
  }
}
</script>

<style scoped> 
.row {
    text-align: left;
}
</style>