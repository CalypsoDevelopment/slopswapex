<template>
  <div class="carousel-wrapper">
    <VueSlickCarousel v-if="store.TickerData" v-bind="slickOptions" ref="carousel">
      <div v-for="token in store.TickerData" :key="token" class="token-ticker-container mx-1">
        <b-row>
          <b-col class="indi-token-module">
            <b-row>
              <b-col cols="2" class="text-center">
                <b-spinner v-if="token.logo_url === '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'" label="Spinning" />
                <img v-else class="token-ticker-logo my-3" :src="`${token.logo_url}`">
              </b-col>
              <b-col cols="10" class="text-left">
                {{ token.contract_name }}<br>
                {{ token.contract_ticker_symbol }}
                {{ token.quote_rate }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <!--<b-img :src="`${TickerData[0].logo_url}`" fluid alt="Responsive image" />-->
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { useBSCPriceTickerStore } from '@/src/store/BSCPriceTickerStore.js'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// const Console = require('Console')

export default {
  name: 'BSCSpotPriceTicker',
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      slickOptions: {
        swipe: true,
        dots: false,
        autoplaySpeed: 4000,
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 1000,
        arrows: false,
        touchThreshold: 5,
        autoplay: true,
        pauseOnHover: true,
        cssEase: 'linear'
      },
      store: useBSCPriceTickerStore(),
      TickerData: false
    }
  },
  beforeMount () {
    this.fetchTickerData()
  },
  methods: {
    async fetchTickerData () {
      const TickerDataRequest = await this.$axios.$get('https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&key=ckey_58f88ae689904d67bb81f4d84d4')
      this.TickerData = TickerDataRequest.data.items
      this.store.TickerData = this.TickerData
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.token-ticker-container {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', cursive;
  color: #17a2b8;
  color: #FFFFFF;
  font-size: 1.4rem;
}
.indi-token-module {
  background-color: #505960;
  border-left: 1px solid #FFFFFF;
}
.token-ticker-logo {
  max-height: 42px;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
}
.carousel-wrapper {
  min-height: auto;
}
</style>
