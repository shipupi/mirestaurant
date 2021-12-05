<template>
  <div id="app">
    <Nav/>
    <section>
      <router-view/>
    </section>
    <Footer/>
  </div>
</template>
<script>
import Nav from './components/template/Nav.vue'
import Footer from './components/template/Footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  beforeMount() {
    let jwt = localStorage.getItem('jwt')
    if (jwt) {  
      this.$http.defaults.headers.common = {'Authorization': `Bearer ${jwt}`}
      console.log("setting authorization", this.$http.defaults.headers.common)
    } else {
      console.log("no authorization found")
    }

  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
