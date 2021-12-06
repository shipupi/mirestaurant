<template>
<div class="col s12 offset-s0 m5 offset-m1">
    <form @submit.prevent="handleSubmit">
        <div class="row">
            <h1 class="header orange-text">Login</h1>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="login-email" type="email" v-model="email" class="validate">
                <label for="login-email">Email</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="login-password" type="password" v-model="password" class="validate">
                <label for="login-password">Password</label>
            </div>
        </div>
        <div class="row">
            <button class="btn waves-effect waves-light" type="submit" name="action" >Submit
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
</div>
</template>

<script>
import EventBus from '../../EventBus'

export default {
  name: 'Login',
  data () {
    return {
      email : "",
      password : ""
    }
  },
  methods: {
      handleSubmit(e) {
        e.preventDefault()
        if (this.password.length > 0) {
            this.$http.post(this.$api_url + '/auth/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                this.$toast.success("Logged in")
                let is_admin = response.data.user.is_admin
                localStorage.setItem('user',JSON.stringify(response.data.user))
                localStorage.setItem('jwt',response.data.access_token)
                this.$http.defaults.headers.common = {'Authorization': `bearer ${response.data.access_token}`}
                if (localStorage.getItem('jwt') != null) {
                    EventBus.$emit('loggedIn')
                    if (is_admin == true) {
                        this.$router.push('/admin/restaurants')
                    }
                    else {
                        this.$router.push('/')
                    }
                } else {
                    console.log("Error saving storage")
                }
            })
            .catch((error) => {
                if (error.response.status == 400 || error.response.status == 401) {
                    this.$toast.error("Invalid credentials");
                } else if (error.response.status ==  500) {
                    this.$toast.error("There was a problem with the server");
                }
            });
        }
    }
  }
}
</script>