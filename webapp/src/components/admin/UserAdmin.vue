<template>
    <div class="container">
        <div class="row">
            <h1 class="header orange-text">Admin Page</h1>
        </div>
        <div class="row">
            <ul class="center-align tabs">
                <li class="tab col s3 offset-s3"><router-link to="/admin/restaurants" >Restaurants</router-link></li>
                <li class="tab col s3"><router-link to="/admin/users" class="active">Users</router-link></li>
            </ul>
        </div>
        <div class="row">
            <div class="column s12 left-align">
                <router-link to="/admin/create_user" class="waves-effect waves-light btn-large "><i class="material-icons left">add</i>New User</router-link>
                <table class="center highlight">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr> 
                    </thead>
                    <tbody>
                        <tr  v-if="!users.length"><td>No users</td><td/></tr>
                        <tr 
                        class="pointer"
                        v-for="user in users" 
                        :key="user.id" 
                        v-on:click="$router.push('/admin/users/' + user.user_id)"
                        >
                            <td>{{user.user_id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'UserAdmin',
  data: function () {
    return {
        users: []
    }
  },
  mounted() {
      this.getusers()
      window.M.AutoInit()
  },
  methods: {
      getusers() {
          this.$http.get(this.$api_url + '/users')
          .then(response => {
              this.users = response.data
          }).catch(() => {
              this.$toast.error("Unable to get users");
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