<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-Sized-Header-Rise-Of-the-PigsV2.png" fluid alt="Responsive image" />
    </div>
    <b-container fluid>
      <b-row>
        <b-col sm="6" medium="6" lg="6" class="my-2">
          <div>
            <b-nav>
              <b-nav-item v-b-tooltip.hover to="/trading" title="Binance Smart Chain Crypto Exchange: Live">
                <b-img src="~/assets/img/page-graphics/binance-logo.svg" fluid alt="Responsive image" class="chain-logos mx-0" />
              </b-nav-item>
              <b-nav-item title="Tron Crypto Exchange: Coming Soon">
                <b-img src="~/assets/img/page-graphics/tron-logo-coming-soon.svg" fluid alt="Responsive image" class="chain-logos mx-0" />
              </b-nav-item>
              <b-nav-item title="Ethereum Smart Chain Crypto Exchange: Live">
                <b-img src="~/assets/img/page-graphics/ethereum-logo-coming-soon.svg" fluid alt="Responsive image" class="chain-logos mx-0" />
              </b-nav-item>
              <b-nav-item>
                <b-img src="~/assets/img/page-graphics/polygon-logo-coming-soon.svg" fluid alt="Responsive image" class="chain-logos mx-0" />
              </b-nav-item>
            </b-nav>
          </div>
        </b-col>
        <b-col sm="6" medium="6" lg="6">
          <b-input-group prepend="Search" class="my-2">
            <b-form-input :type="search" placeholder="" />
            <b-input-group-append>
              <b-button variant="secondary">
                <i class="fa-solid fa-magnifying-glass" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-col sm="12" medium="12" lg="2" class="text-center" />
        <b-col sm="12" medium="12" lg="8" class="text-center">
          <b-row>
            <b-col
              v-for="item in cryptoIndex"
              :key="item.Title_link"
              class="text-center crypto-logo-container-col"
              sm="12"
              medium="12"
              lg="2"
            >
              <div>
                <b-img :src="require(`../assets/img/cryptologo/${item.Avatar}`)" class="crypto-logo-thumb" fluid :alt="item.Title" />
                <br>
                <h2 class="crypto-logo-title py-4">
                  {{ item.Title }}
                </h2>
                <br>
                <b-button pill size="sm" class="py-1" @click="$router.push(`/${item.Title_link}`)">
                  Download SVG
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" medium="12" lg="2" class="text-center" />
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
const cryptoJSON = require('~/static/cryptologobranding.json')
// import SlopSwapTraderV2 from '~/components/SlopSwapTraderV2.vue'
// import BSCSpotPriceTicker from '~/components/BSCSpotPriceTicker.vue'

export default {
  name: 'CryptoLogosPage',
  components: { TopNavbarComplex },
  data () {
    return {
      cryptoSelected: null,
      cryptoIndex: cryptoJSON
    }
  },
  methods: {
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.bg {
  /*background: rgb(195,181,155);
  background: linear-gradient(90deg, rgba(195,181,155,1) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,1) 100%);
  background: rgb(255,185,0);
  background: linear-gradient(90deg, rgba(255,185,0,1) 0%, rgba(198,191,177,1) 50%, rgba(255,255,255,1) 100%);
  min-height: 100vh;*/
  min-height: 100vh;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(46,163,230,1) 10%, rgba(255,158,46,1) 100%);
}
.crypto-logo-container-col {
  min-height: 300px;
}
.crypto-logo-title {
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 1rem;
  font-weight: 400;
  height: 60px;
}
.crypto-logo-thumb {
  max-height: 50px;
  max-width: 50px;
}
.chain-logos {
  height: 32px;
}
.full-page-img {
  /*border-radius: 4rem;*/
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
}
p {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-family: 'Nunito', sans-serif;
}
.info-panel {
  min-height: 50vh;
}
.slopswap-logo {
  max-height: 50px;
  max-width: 50px;
}
.btn-primary {
  color: #fff;
  background-color: #c1272d;
  border-color: #FFFFFF;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 0.90rem;
  font-weight: 400;
}
.card-title {
  margin-bottom: 0.45rem;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 1.2rem;
  font-weight: 400;
}
.logo-thumbnail {
  width: 100px;
}
.farm-bg {
  background-color: #FFFFFF;
  /* padding-top: 1rem; */
  min-height: auto;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
  /* -webkit-clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
  clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);*/
  /* background-image: url(~/assets/img/page-graphics/SlopSwap-Home-Page.png);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat; */
}
.app-container {
  min-height: 600px;
}
</style>
