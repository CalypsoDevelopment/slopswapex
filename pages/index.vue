<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <!--<div>
        <b-img src="~/assets/img/SlopSwap-Rise-Of-The-Pigs.png" fluid alt="SlopSwap Crypto Currency Exchange & Blockchain Community Resource" class="slopswap-logo" />
      </div>-->
      <!-- <b-nav tabs align="right">
        <b-nav-item active>
          <i class="fa-solid fa-circle-plus" /> Add Liquidity
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-calculator" /> Calculator
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-bell-on" /> Notifications
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-message" /> Community
        </b-nav-item>
      </b-nav>-->
    </div>
    <BSCSpotPriceTicker />
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapTraderV2 />
          </div>
        </b-col>
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
.bg {
  background-color: #e0e0e0;
  min-height: 100vh;
}
.slopswap-logo {
  max-height: 100px;
}
.farm-bg {
  /*border-bottom: 1px solid #e0e0e0;*/
  background-color: #FFFFFF;
  padding-top: 1rem;
  min-height: 240px;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  background-image: url(~/assets/img/slopswap-crew.png);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
}
.app-container {
  min-height: 600px;
}
</style>
