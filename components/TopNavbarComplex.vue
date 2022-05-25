<template>
  <div>
    <b-navbar toggleable="lg" class="topbar-nav mx-0" type="light" variant="">
      <b-navbar-brand href="#">
        <span class="brand-main-text"><span class="blue-text">Slop</span>Swap</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            Trade
          </b-nav-item>
          <b-nav-item to="/liquidity">
            Liquidity
          </b-nav-item>
          <b-nav-item to="/liquiditypairs">
            Liquidity Pairs
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              Search
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#">
              ES
            </b-dropdown-item>
            <b-dropdown-item href="#">
              RU
            </b-dropdown-item>
            <b-dropdown-item href="#">
              FA
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'TopNavbarComplex',
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
.topbar-nav {
  border-bottom: 1px solid #FFFFFF;
}
.topbar-nav a {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', cursive;
  font-size: 1.4rem;
  font-weight: 800;
}
.brand-main-text {
  font-size: 1.8rem;
}
.blue-text {
  color: #17a2b8;
}
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
