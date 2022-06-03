<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/220-Sized-Header-Rise-Of-the-Pigs.png" fluid alt="Responsive image" />
    </div>
    <BSCSpotPriceTicker />
    <b-container fluid>
      <b-row>
        <b-col cols="2" class="text-center">
          <div>
            <b-card
              title="Card Title"
              img-src="~/assets/img/page-graphics/Life-On-the-Farm-Blog.jpg"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </b-card-text>

              <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
          </div>
        </b-col>

        <b-col cols="8" class="text-center">
          <div class="app-container">
            <SlopSwapTraderV2 />
          </div>
        </b-col>
        <b-col cols="2" class="text-center"></b-col>
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
  /*background: rgb(195,181,155);
  background: linear-gradient(90deg, rgba(195,181,155,1) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,1) 100%);
  background: rgb(255,185,0);
  background: linear-gradient(90deg, rgba(255,185,0,1) 0%, rgba(198,191,177,1) 50%, rgba(255,255,255,1) 100%);
  min-height: 100vh;*/
  min-height: 100vh;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(46,163,230,1) 48%, rgba(255,158,46,1) 100%);
}
.slopswap-logo {
  max-height: 100px;
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
