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
                    <h3>Update user information</h3>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="name" type="text" v-model="name" :class="{invalid: errors.name}">
                        <label for="name">Name</label>
                        <span v-if="errors.name" class="helper-text" :data-error="errors.name" />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="email" type="email" v-model="email" :class="{invalid: errors.email}">
                        <label for="email">Email</label>
                        <span v-if="errors.email" class="helper-text" :data-error="errors.email" />
                    </div>
                </div>
                 <div class="row">
                    <label>
                        <input type="checkbox" v-model="is_admin" />
                        <span>Admin</span>
                    </label>
                    <div>
                        <span v-if="errors.is_admin" class="helper-text red-text">{{errors.is_admin}}</span>
                    </div>
                </div>
                <div class="row">
                    <button class="btn waves-effect waves-light" type="submit" name="action" >Save
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
            <form @submit="handlePasswordSubmit">
                <div class ="row">
                    <h3>Update Password</h3>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="password" type="password" v-model="password" :class="{invalid: errors.password}">
                        <label for="password">Password</label>
                        <span v-if="errors.password" class="helper-text" :data-error="errors.password" />
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" >Save
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
            <form @submit="handleDeleteSubmit">
                <div class ="row">
                    <h3>Delete User</h3>
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
  name: 'EditUser',
  data: function () {
    return {
        name: '',
        email: '',
        password: '',
        is_admin: false,
        errors: {},
        delete_confirmation: ''
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
          let data = {}
          data.name = this.name;
          data.email = this.email;
          data.is_admin = this.is_admin;
          this.errors = {}
          this.$http.patch(this.$api_url + '/users/' + this.$route.params.user_id, data)
          .then(() => {
            //   TODO: Check if edited user is the same one that was  logged in to update name in navbar
              this.$toast.success('User updated')
              
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
                } else if (error.response.status == 500) {
                    this.$toast.error("There was a problem with the server");
                }
            });
      },
      handlePasswordSubmit(e) {
          e.preventDefault()
          let data = {}
          data.password = this.password;
          this.errors = {}
          this.$http.patch(this.$api_url + '/users/' + this.$route.params.user_id, data)
          .then(() => {
              this.$toast.success('Password updated')
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
                } else if (error.response.status == 500) {
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
              this.$http.delete(this.$api_url + '/users/' + this.$route.params.user_id)
              .then(() => {
                this.$toast.success('User deleted')
              }).catch((error) => {
                if (error.response.status == 400) {
                    this.$toast.error('Cannot delete authenticated user')
                } else {
                    this.$toast.error('Unable to delete user')
                }
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