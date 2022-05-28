<template>
  <div>
    <b-navbar toggleable="lg" class="topbar-nav mx-0" type="light" variant="">
      <b-navbar-brand href="https://slopswap.trade">
        <b-img src="~/assets/img/SlopSwap-Rise-Of-The-Pigs-Simple.png" fluid alt="SlopSwap Crypto Currency Exchange & Blockchain Community Resource" class="slopswap-topbar-logo" />
        <!--<span class="brand-main-text"><span class="blue-text">Slop</span>Swap</span>-->
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
          <b-nav-item to="/">
            Yield Farming
          </b-nav-item>
          <b-nav-item to="/">
            Lottery
          </b-nav-item>
          <b-nav-item to="/">
            SlopSwapX
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--<b-nav-form>
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
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>-->
          <b-nav-item>
            <b-button pill variant="info" @click="ConnectWalletInit()">
              Connect Wallet
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button v-b-toggle.notification-sidebar variant="info" pill>
              <i class="fa-solid fa-sidebar" />
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
// import axios from 'axios'
// import SlopSwapLiquidityMakerTokenSelect from '~/components/SlopSwapLiquidityMakerTokenSelect.vue'
// import SlopSwapLiquidityTakerTokenSelect from '~/components/SlopSwapLiquidityTakerTokenSelect.vue'
const ethers = require('ethers')
// const qs = require('qs')
const Console = require('Console')
// const BEP20 = require('~/static/artifacts/IERC20.json')
// const PAIR = require('~/static/artifacts/SlopSwapPair.json')
// const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
// const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')

export default {
  name: 'TopNavbarComplex',
  components: {},
  data () {
    return {
      greeting: 'Hello World!'
    }
  },
  methods: {
    async ConnectWalletInit () {
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      Console.log('Signer: ' + signer)

      // alert('Before Account Request')
      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]
      this.loggedIn = true
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.slopswap-topbar-logo {
  max-height: 25px;
}
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
