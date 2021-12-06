<template>
    <div>
        <div>
            <div class="input-field col s12 m4 offset-m2">
                <input id="search" type="text" v-model="search">
                <label for="search">Search</label>
            </div>
        </div>
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
                    v-for="restaurant in paginatedRestaurants" 
                    :key="restaurant.restaurant_id"
                    :name="restaurant.name" 
                    :rating="restaurant.rating" 
                    :slug="restaurant.slug" 
                />
            </tbody>
        </table>
        <ul class="pagination">
            <li :class="{disabled: currentPage == 0, 'waves-effect': currentPage != 0}"><a href="#!" @click="setPage(currentPage-1)"><i class="material-icons">chevron_left</i></a></li>
            <li v-for="i in pages" :key="i" :class="{'waves-effect': currentPage != i - 1, 'active': currentPage == i - 1 }"><a @click="setPage(i - 1)" href="#!">{{i}}</a></li>
            <li :class="{disabled: currentPage == pages - 1, 'waves-effect': currentPage != pages - 1}" ><a href="#!"  @click="setPage(currentPage+1)"><i class="material-icons">chevron_right</i></a></li>
        </ul>
    </div>
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
        perPage: 5,
        currentPage: 0,
        restaurants: [],
        search: ''
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
      },
      setPage: function(newPage) {
        if (newPage >= 0 && newPage < this.pages) {
          this.currentPage = newPage;   
        }        
      }
  },
  computed: {
    pages: function() {
        return Math.ceil(this.filteredRestaurants.length / this.perPage);
    },
    offset: function() {
        return this.currentPage * this.perPage;
    },
    filteredRestaurants: function() {
        return this.restaurants.filter(r => {
            return r.name.toLowerCase().includes(this.search.toLowerCase())
        })
    },
    paginatedRestaurants: function() {
        return this.filteredRestaurants.slice(this.offset, this.offset + this.perPage)
    }
  },
  watch: {
      search: function() {
        if (this.currentPage + 1 > this.pages){
            this.currentPage = this.pages - 1;
        }
      }
  }
}
</script>

<style lang="css" scoped>
    table {
        min-height: 500px;
        table-layout: fixed;
    }
    .
    nav .brand-logo {
        position: relative;
    }
</style>