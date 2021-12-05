<template>
  <div>
    <div class="section no-pad-bot" id="index-banner" >
      <div class="container">
          <h1 class="header orange-text">Admin Page</h1>
      </div>
    </div>
    <div class="container">
        <ul class="tabs">
            <li class="tab col s3"><a @click="select = 'Restaurants'" class="active" href="#">Restaurants</a></li>
            <li class="tab col s3"><a @click="select = 'Users'" href="#">Users</a></li>
        </ul>

        <div class="row" v-if="select == 'Users'">
            <UserAdmin/>
        </div>
        <div class="row" v-if="select == 'Restaurants'">
            <RestaurantAdmin/>
        </div>
    </div>
  </div>
</template>

<script>
import RestaurantAdmin from './RestaurantAdmin.vue'
import UserAdmin from './UserAdmin.vue'
export default {
  name: 'Admin',
  data: function () {
    return {
      select: "Restaurants"
    }
  },
  components: {
      RestaurantAdmin,
      UserAdmin
  },
  mounted: function() {
    
  },
  
  methods: {
  }
}
</script>