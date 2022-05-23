<template>
  <div>
    <b-nav class="simple-top-nav">
      <b-nav-item>
        <b-button><i class="fa-solid fa-bars fa-1x" style="color: #FFFFFF;" /></b-button>
      </b-nav-item>
      <b-nav-item class="pt-1">
        <NuxtLink to="/">
          Trade
        </NuxtLink>
      </b-nav-item>
      <b-nav-item class="pt-1">
        <NuxtLink to="/liquidity">
          Liquidity
        </NuxtLink>
      </b-nav-item>
    </b-nav>
  </div>
</template>
<script>
export default {
  name: 'TopNavigationBarSimple',
  components: {},
  data () {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.nav.a {
  color: #6c757d;
}
.simple-top-nav a:hover {
  font-family: 'Fredoka One', cursive !important;
  color: #007bff;
  font-weight: 800;
  text-decoration: none;
}
a {
  color: #505960;
  font-variant-caps: all-small-caps;
  font-size: 1.3rem;
  font-family: 'Fredoka One', cursive;
}
.simple-top-nav {
  font-family: 'Fredoka One', cursive !important;
  color: #505960;
  font-weight: 800;
}

</style>
