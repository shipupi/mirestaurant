<template>
    <div>
        <div class="section no-pad-bot" id="index-banner" >
            <div class="container">
                <h1 class="header orange-text">Edit Review</h1>
            </div>
        </div>
        <div class="container">
            <form @submit="handleSubmit">
                <div class="row">
                    <input disabled id="restaurant_name" type="text" v-model="restaurant_name">
                    <label for="restaurant_name">Restaurant`</label>
                </div>
                <div class="row">
                    <input disabled id="user_name" type="text" v-model="user_name">
                    <label for="user_name">Author`</label>
                </div>
                <div class="row">
                    <div class="input-field">
                        <select v-model="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label>Rating</label>
                    </div>
                </div>
                <div class="row">
                    <textarea id="comment" v-model="comment" class="materialize-textarea"></textarea>
                    <label for="comment">Comment</label>
                    <div>
                        <span v-if="errors.comment" class="helper-text red-text">{{errors.comment}}</span>
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
                    <h3>Delete Review</h3>
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
        </div>
    </div>
</template>


<script>
export default {
  name: 'EditReview',
  data: function () {
    return {
        id: 0,
        comment: '',
        rating: 0,
        errors: {},
        delete_confirmation: '',
        user_name: '',
        user_email: '',
        user_id: 0,
        restaurant_id: 0,
        restaurant_name: ''

    }
  },
  mounted() {
      this.getReview()
  },
  methods: {
      getRestaurant() {
          this.$http.get(this.$api_url + '/restaurants/' + this.restaurant_id)
          .then(response => {
              this.restaurant_name = response.data.name;
              setTimeout(() => {
                window.M.AutoInit()
              }, 100);
          }).catch((e) => {
              console.log(e)
          })
      },
      getUser() {
          this.$http.get(this.$api_url + '/users/' + this.user_id)
          .then(response => {
              this.user_name = response.data.name;
              setTimeout(() => {
                window.M.AutoInit()
              }, 100);
          }).catch((e) => {
              console.log(e)
          })
      },
      getReview() {
          this.$http.get(this.$api_url + '/reviews/' + this.$route.params.id)
          .then(response => {
              this.id = response.data.review_id
              this.comment = response.data.comment
              this.rating = response.data.rating
              this.restaurant_id = response.data.restaurant_id
              this.user_id = response.data.user_id
              this.getUser()
              this.getRestaurant()
              setTimeout(() => {
                window.M.AutoInit()
              }, 100);
          }).catch((e) => {
              console.log(e)
              this.$toast.error("Unable to get review");
          })
      },
      handleSubmit(e) {
          e.preventDefault()
          let data = {
              rating: this.rating,
              comment: this.comment,
          }
          this.errors = {}
          this.$http.patch(this.$api_url + '/reviews/' + this.id, data)
          .then(() => {
              this.$toast.success('Review updated')
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
              this.$http.delete(this.$api_url + '/reviews/' + this.id)
              .then(() => {
                this.$toast.success('Review deleted')
                this.$router.push('/admin/restaurants/' + this.restaurant_id)
              }).catch((error) => {
                console.log(error)
                this.$toast.error('Unable to delete review')
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