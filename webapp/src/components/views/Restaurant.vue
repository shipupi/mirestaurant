<template>
  <div>
    <div class="section no-pad-bot" id="index-banner" v-if="Object.keys(restaurant).length == 0">
      <div class="container">
        <h1 class="header orange-text">Restaurant not found</h1>
      </div>
    </div>
    <div class="section no-pad-bot" id="index-banner" v-if="Object.keys(restaurant).length > 0">
      <div class="container">
          <h1 class="header orange-text">{{restaurant.name}}</h1>
          <div class="title-container"><Rating :rating="restaurant.rating" :name="restaurant.name"/></div>
      </div>
    </div>
    <div class="container" v-if="Object.keys(restaurant).length > 0">
      <div v-if="Object.keys(restaurant.reviews).length == 0"><h3>No reviews found</h3></div>
      <div class="row card-container" v-if="Object.keys(restaurant.reviews).length > 0">
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
      <div class="row" v-if="loggedIn">
        <form @submit="handleSubmit">
          <div class="row">
            <h3> Leave a comment</h3>
          </div>
          <div class="row">
              <textarea id="comment" v-model="comment" class="materialize-textarea"></textarea>
              <label for="comment">Comment</label>
              <div>
                  <span v-if="errors.comment" class="helper-text red-text">{{errors.comment}}</span>
              </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <select v-model="rating">
                  <option value="0" disabled selected>Choose your option</option>
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
              <button class="btn waves-effect waves-light" type="submit" name="action" >Send!
                  <i class="material-icons right">send</i>
              </button>
          </div>
        </form>
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
        restaurant: {},
        loggedIn: false,
        rating: 0,
        comment: '',
        errors: {}
    }
  },
  mounted() {
    this.checkLogin();
    this.getRestaurant();
    setTimeout(() => {
      window.M.AutoInit();
    }, 200);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if(this.rating == 0) {
        this.$toast.info("Select rating");
        return;
      }
      let data = {
          rating: this.rating,
          comment: this.comment,
      }
      this.errors = {}
      this.$http.post(this.$api_url + '/restaurants/' + this.restaurant.restaurant_id + '/rate', data)
      .then(() => {
          this.$toast.success('Restaurant rated!')
          this.getRestaurant()
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
    getRestaurant() {
      this.$http.get(this.$api_url + '/restaurants/' + this.$route.params.slug)
      .then(response => {
          this.restaurant = response.data
      }).catch(() => {
          this.$toast.error("Unable to get restaurant");
      })
    },
    checkLogin() {
      let user = localStorage.getItem('user')
      if (user != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.col {
  margin-right: auto;
}

.title-container {
  width: fit-content;
  margin-right: auto;
  margin-left: auto;
}
.card-container {
  display: flex;
  flex-flow: wrap;

}
</style>
