<template>
    <div>
        <div class="section no-pad-bot" id="index-banner" >
            <div class="container">
                <h1 class="header orange-text">Edit User</h1>
            </div>
        </div>
        <div class="container">
            <form @submit="handleSubmit">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" v-model="name" class="validate">
                        <label for="name">Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="email" v-model="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                </div>
                 <div class="row">
                    <label>
                        <input type="checkbox" />
                        <span>Admin</span>
                    </label>
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
  name: 'EditUser',
  data: function () {
    return {
        name: '',
        email: '',
        password: '',
        is_admin: false
    }
  },
  mounted() {
      this.getUser()
  },
  methods: {
      getUser() {
          this.$http.get(this.$api_url + '/users/' + this.$route.params.user_id)
          .then(response => {
              let user = response.data
              console.log(user)
              this.name = user.name;
              this.email = user.email
              this.is_admin = user.is_admin
              setTimeout(() => {
                window.M.updateTextFields()
              }, 100);
          }).catch((e) => {
              console.log(e)
              this.$toast.error("Unable to get user");
          })
      },
      handleSubmit(e) {
          e.preventDefault()
          
      }
  }
}
</script>

<style scoped> 
.row {
    text-align: left;
}
</style>