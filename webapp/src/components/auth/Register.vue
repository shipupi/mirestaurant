<template>
<div class="col s12 offset-s0 m5 offset-m1">
    <form @submit="handleSubmit">
        <div class="row">
            <h1 class="header orange-text">Register</h1>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input id="name" type="text" v-model="name" :class="{invalid: errors.name}">
                <label for="name">Name</label>
                <span v-if="errors.name" class="helper-text" :data-error="errors.name"/>
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
            <div class="input-field col s12">
                <input id="password" type="password" v-model="password" :class="{invalid: errors.password}">
                <label for="password">Password</label>
                <span v-if="errors.password" class="helper-text" :data-error="errors.password"/>
            </div>
        </div>
        <div class="row">
            <button class="btn waves-effect waves-light" type="submit" name="action">Register
                <i class="material-icons right">send</i>
            </button>
        </div>
    </form>
</div>
</template>
<script>
import EventBus from '../../EventBus'
export default {
  name: 'Register',
  data () {
    return {
      name: "",
      email : "",
      password : "",
      errors: {}
    }
  },
  methods: {
      handleSubmit(e) {
        e.preventDefault()
        if (this.password.length > 0) {
            this.errors = {}
            this.$http.post(this.$api_url + '/users', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
            .then(response => {
                this.$toast.success("Successfully registered!")
                let is_admin = false;
                localStorage.setItem('user',JSON.stringify(response.data.user))
                localStorage.setItem('jwt',response.data.access_token)
                this.$http.defaults.headers.common = {'Authorization': `bearer ${response.data.access_token}`}
                if (localStorage.getItem('jwt') != null) {
                    EventBus.$emit('loggedIn')
                    if (is_admin == true) {
                        this.$router.push('/admin')
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
        }
      }
    }
}
</script>