<template>
    <div>
        <div class="section no-pad-bot" id="index-banner" >
            <div class="container">
                <h1 class="header orange-text">Edit Restaurant</h1>
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
            <form @submit="handleDeleteSubmit">
                <div class ="row">
                    <h3>Delete Restaurant</h3>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="delete_confirmation" type="text" v-model="delete_confirmation" :class="{invalid: errors.delete_confirmation}">
                        <label for="delete_confirmation">Please type 'delete' to confirm deletion</label>
                        <span v-if="errors.delete_confirmation" class="helper-text" :data-error="errors.delete_confirmation" />
                    </div>
                    <button class="btn waves-effect waves-light red" type="submit" name="action" >Delete
                        <i class="material-icons right">delete</i>
                    </button>
                </div>
            </form>
            <div class="row">
                <h3>Manage reviews</h3>
                <table class="center highlight">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Rating</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr  v-if="!reviews.length"><td>No reviews</td><td/></tr>
                        <tr 
                        class="pointer"
                        v-for="review in reviews" 
                        :key="review.review_id" 
                        v-on:click="$router.push('/admin/reviews/' + review.review_id)"
                        >
                            <td>{{review.comment}}</td>
                            <td>{{review.rating}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'EditRestaurant',
  data: function () {
    return {
        id: 0,
        name: '',
        reviews: [],
        errors: {},
        delete_confirmation: ''
    }
  },
  mounted() {
      this.getRestaurant()
  },
  methods: {
      getRestaurant() {
          this.$http.get(this.$api_url + '/restaurants/' + this.$route.params.slug)
          .then(response => {
              this.id = response.data.restaurant_id
              this.name = response.data.name;
              this.reviews = response.data.all_reviews;
              setTimeout(() => {
                window.M.updateTextFields()
              }, 100);
          }).catch((e) => {
              console.log(e)
              this.$toast.error("Unable to get restaurant");
          })
      },
      handleSubmit(e) {
          e.preventDefault()
          let data = {
              name: this.name,
          }
          this.errors = {}
          this.$http.put(this.$api_url + '/restaurants/' + this.id, data)
          .then(response => {
              this.$toast.success('Restaurant updated')
              this.$router.push('/admin/restaurants/' + response.data.slug)
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
                } else if (error.response.status ==  404) {
                    this.$toast.error("Invalid restaurant");
                } else if (error.response.status ==  500) {
                    this.$toast.error("There was a problem with the server");
                }
            });
      },
      handleDeleteSubmit(e) {
          e.preventDefault()
          this.errors = {}
          if (this.delete_confirmation != 'delete') {
              this.errors['delete_confirmation'] = "Please type 'delete' to confirm deletion"
          } else {
              this.$http.delete(this.$api_url + '/restaurants/' + this.id)
              .then(() => {
                this.$toast.success('Restaurant deleted')
                this.$router.push('/admin/restaurants')
              }).catch((error) => {
                console.log(error)
                this.$toast.error('Unable to delete restaurant')
              })
          }
      }
  }
}
</script>

<style scoped> 
.row {
    text-align: left;
}
</style>