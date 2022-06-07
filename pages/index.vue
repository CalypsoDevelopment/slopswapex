<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg mx-0">
      <b-row>
        <b-col sm="12" medium="12" lg="12">
          <b-img src="~/assets/img/page-graphics/220-Sized-Header-Rise-Of-the-PigsV2.png" fluid alt="Responsive image" class="mx-0 full-page-img" />
        </b-col>
        <b-col sm="12" medium="12" lg="12">
          <b-img src="~/assets/img/page-graphics/current-pre-launch.png" fluid alt="Currently Pre-Launching SlopSwap in the Wild!" class="mx-0 full-page-img" />
        </b-col>
        <b-col sm="6" medium="6" lg="6">
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
          <b-input-group prepend="Search" class="mt-0">
            <b-form-input :type="search" placeholder="" />
            <b-input-group-append>
              <b-button variant="outline-success">
                <i class="fa-solid fa-magnifying-glass" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
    <BSCSpotPriceTicker />

    <b-container fluid>
      <b-row>
        <b-col sm="6" medium="6" lg="3">
          <div class="py-1 mx-2">
            <b-card
              title="Life on the Farm News"
              img-src="~/assets/img/page-graphics/Life-On-the-Farm-Blog.jpg"
              img-alt="Image"
              img-top
              tag="article"
              class="info-panel my-4 mx-2 px-1 py-1"
            >
              <b-card-text>
                Life on the Farm News is where SlopSwap keeps our users informed of the latest news within blockchain technology.
              </b-card-text>

              <b-button pill href="#" variant="primary">
                Learn About Blockchain
              </b-button>
            </b-card>
          </div>
        </b-col>

        <b-col sm="6" medium="6" lg="3">
          <div class="py-1 mx-2">
            <b-card
              title="Token Generation"
              img-src="~/assets/img/page-graphics/Crypto-Asset-Generation.jpg"
              img-alt="Image"
              img-top
              tag="article"
              class="info-panel my-4 mx-2 px-1 py-1"
            >
              <b-card-text>
                Generate & create your project token from a range of custom features. We also have token themes from popular projects.
              </b-card-text>

              <b-button pill href="#" variant="primary">
                Create Tokens
              </b-button>
            </b-card>
          </div>
        </b-col>

        <b-col sm="6" medium="6" lg="3">
          <div class="py-1 mx-1">
            <b-card
              title="Cryptocurrency Onboarding"
              img-src="~/assets/img/page-graphics/Crypto-Educational-Onboarding.jpg"
              img-alt="Image"
              img-top
              tag="article"
              class="info-panel my-4 mx-2 px-1 py-1"
            >
              <b-card-text>
                We understand that learning something new can be intimidating, but learning Web 3.0 technology is much easier than you think!
              </b-card-text>

              <b-button pill href="#" variant="primary">
                Go somewhere
              </b-button>
            </b-card>
          </div>
        </b-col>

        <b-col sm="6" medium="6" lg="3">
          <div class="py-1 mx-1">
            <b-card
              title="Life on the Farm News"
              img-src="~/assets/img/page-graphics/SlopSwap-Bridge.jpg"
              img-alt="Image"
              img-top
              tag="article"
              class="info-panel my-4 mx-2 px-1 py-1"
            >
              <b-card-text>
                We're currently working on our cross-chain bridge. Soon you'll be able to trade between the popular blockchains.
              </b-card-text>

              <b-button pill href="#" variant="primary">
                Go somewhere
              </b-button>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" medium="12" lg="2" class="text-center" />
        <b-col sm="12" medium="12" lg="8" class="text-center">
          <div class="app-container">
            <SlopSwapTraderV2 />
          </div>
        </b-col>
        <b-col sm="12" medium="12" lg="2" class="text-center" />
        <b-col sm="12" medium="12" lg="3" class="text-center" />
        <b-col sm="12" medium="12" lg="3" class="text-center" />
        <b-col sm="12" medium="12" lg="3" class="text-center" />
        <b-col sm="12" medium="12" lg="3" class="text-center" />
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import SlopSwapTraderV2 from '~/components/SlopSwapTraderV2.vue'
import BSCSpotPriceTicker from '~/components/BSCSpotPriceTicker.vue'

export default {
  name: 'IndexPage',
  components: { SlopSwapTraderV2, TopNavbarComplex, BSCSpotPriceTicker }
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
.chain-logos {
  height: 32px;
}
.full-page-img {
  border-top: 1px solid #FFFFFF;
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
  max-height: 100px;
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
.farm-bg {
  /*border-bottom: 1px solid #e0e0e0;*/
  background-color: #FFFFFF;
  /* padding-top: 1rem; */
  min-height: auto;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF
  /*-webkit-clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
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
