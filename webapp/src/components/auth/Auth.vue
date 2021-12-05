<template>
    <div class="section no-pad-bot" id="index-banner">
        <div class="container">
            <div class="row">
                <Login/>
                <Register/>
            </div>
        </div>
    </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
export default {
  name: 'Auth',
  components: {
      Login,
      Register
  }
}
</script>