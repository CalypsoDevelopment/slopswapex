<template>
  <div>
    <b-navbar toggleable="lg" class="topbar-nav mx-0" type="light">
      <b-navbar-brand href="https://slopswap.trade">
        <b-img src="~/assets/img/page-graphics/slopswap-rise-of-pigs.svg" fluid alt="SlopSwap Crypto Currency Exchange & Blockchain Community Resource" class="slopswap-topbar-logo" />
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
          <b-nav-item to="/liquiditypairs">
            Liquidity Pairs
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
          <b-nav-item class="">
            <b-link class="user-address" :href="`https://www.bscscan.com/address/${account}`" :title="`User Crypto Wallet Address`" target="_blank">
              {{ account }}
            </b-link>
          </b-nav-item>
          <b-nav-item>
            <b-link class="connect-btn" @click="ConnectWalletInit()">
              <span v-if="loggedIn"><i class="fa-solid fa-signal" style="color: #8CC63F" /> Connected Wallet</span>
              <span v-else><i class="fa-solid fa-signal" style="color: #c1272d" /> Connect Wallet</span>
            </b-link>
          </b-nav-item>
          <!--<b-nav-item>
            <b-button v-b-toggle.notification-sidebar variant="info" class="connect-btn" pill>
              <i class="fa-solid fa-sidebar" />
            </b-button>
          </b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
// import { mapWritableState } from 'pinia'
import { useUserProfileStore } from '@/src/store/UserProfileStore.js'
// const tokenPrices = useUserProfileStore()
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
      store: useUserProfileStore(),
      loggedIn: false,
      account: null,
      AddressURL: null
    }
  },
  computed: {
  },
  watch: {
    loggedIn (value) {
      this.ConnectWalletInit()
    },
    AddressURL (value) {
      this.formatURL()
    }
  },
  beforeMount () {
    this.ConnectWalletInit()
  },
  methods: {
    formatURL () {
      const addressLink = `https://www.bscscan.com/address/${this.account}`
      this.AddressURL = addressLink
    },
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
      const account = accounts[0]
      this.account = account
      this.loggedIn = true
      this.store.UserNameWalletAddress = this.account
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.connect-btn {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
}
.navbar-light .navbar-nav .nav-link {
  color: #3e3d40;
  font-family: 'Fredoka One', sans-serif;
}
.user-address {
  color: #2ea3e6;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: #3e3d40;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    font-family: 'Fredoka One', sans-serif;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.slopswap-topbar-logo {
  height: 30px;
}
.topbar-nav {
  /*border-bottom: 1px solid #FFFFFF;*/
}
.topbar-nav a {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
}
.brand-main-text {
  font-size: 1.8rem;
}
.blue-text {
  color: #17a2b8;
}
.nav.a {
  color: #3e3d40;
}
.simple-top-nav a:hover {
  font-family: 'Fredoka One', sans-serif !important;
  color: #007bff;
  font-weight: 800;
  text-decoration: none;
}
a {
  color: #505960;
  font-variant-caps: all-small-caps;
  font-size: 1.3rem;
  font-family: 'Fredoka One', sans-serif;
}
.simple-top-nav {
  font-family: 'Fredoka One', sans-serif !important;
  color: #505960;
  font-weight: 800;
}

</style>
