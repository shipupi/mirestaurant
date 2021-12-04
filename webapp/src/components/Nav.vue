<template>
 <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">Restauranto</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="#">Login</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><a href="#">Login</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'Nav',
}
</script>

<style lang="css" scoped>
    nav .brand-logo {
        position: relative;
    }
</style>