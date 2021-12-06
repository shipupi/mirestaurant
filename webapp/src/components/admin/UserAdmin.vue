<template>
    <div class="column s12 left-align">
        <router-link to="/admin/create_user" class="waves-effect waves-light btn-large "><i class="material-icons left">add</i>New User</router-link>
        <table class="center highlight">
            <thead>
                <tr>
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
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                </tr>
            </tbody>
        </table>
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