<template>
 <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">
      <router-link id="logo-container" to="/" class="brand-logo">Restauranto</router-link>
      <ul class="right hide-on-med-and-down">
        <li><router-link v-if="!loggedIn" to="/auth">Login</router-link></li>
        <li><a href="#" v-if="loggedIn">{{ user }}</a></li>
        <li><a href="#" v-if="loggedIn" @click="logout">Logout</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><router-link to="/auth">Login</router-link></li>
      </ul>
      <a  href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>


<script>
import EventBus from '../EventBus'
export default {
  name: 'Nav',
  data: function () {
    return {
      loggedIn: false,
      user: 'asd'
    }
  },
  mounted: function() {
    EventBus.$on("loggedIn", () => {
      this.checkLogin()
    })
    this.checkLogin()
  },
  destroyed: function () {
    EventBus.$off("loggedIn")
  },
  methods: {
    checkLogin() {
      let user = localStorage.getItem('user')
      if (user != null) {
        user= JSON.parse(user)
        this.loggedIn = true;
        this.user = user.name;
      } else {
        this.user = ''
        this.loggedIn = false
      }
    }, 
    logout() {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      this.$toast.success("logged Out")
      this.$router.push("/").catch(()=>{})
      EventBus.$emit("loggedOut")
      this.checkLogin();
    }
  }
}
</script>

<style lang="css" scoped>
    nav .brand-logo {
        position: relative;
    }
</style>