<template>
  <div class="carousel-wrapper">
    <VueSlickCarousel v-if="store.TickerData" v-bind="slickOptions" ref="carousel">
      <b-row v-for="token in store.TickerData" :key="token" class="token-ticker-container mx-1">
        <b-col v-if="token.contract_address !== '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'" class="indi-token-module my-3">
          <img v-if="token.contract_address !== '0xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'" class="token-ticker-logo float-left" :src="`${token.logo_url}`">
          {{ token.contract_ticker_symbol }} {{ token.quote_rate }}
        </b-col>
        <!--<b-img :src="`${TickerData[0].logo_url}`" fluid alt="Responsive image" />-->
      </b-row>
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
        autoplaySpeed: 5000,
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 5000,
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
  watch: {
    slidesToShow (value) {
      this.FetchViewportSize()
    }
  },
  beforeMount () {
    this.fetchTickerData()
    this.FetchViewportSize()
  },
  methods: {
    async fetchTickerData () {
      const TickerDataRequest = await this.$axios.$get('https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&key=ckey_58f88ae689904d67bb81f4d84d4')
      this.TickerData = TickerDataRequest.data.items
      this.store.TickerData = this.TickerData
    },
    FetchViewportSize () {
      if (window.matchMedia('(max-width: 700px)').matches) {
      // Viewport is less or equal to 700 pixels wide
        this.slickOptions.slidesToShow = 3
      } else {
      // Viewport is greater than 700 pixels wide
        this.slickOptions.slidesToShow = 6
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.token-ticker-container {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', verdana;
  color: #3e3d40;
  font-size: 0.95rem;
  /* border-bottom: 1px solid #FFFFFF; */
  /* background-color: #FFFFFF; */
}
.indi-token-module {
  /* background-color: #c1272d;
  border-left: 1px solid #FFFFFF;*/
  min-height: 100%;
  /* background-color: #FFFFFF;*/
}

.token-ticker-logo {
  max-height: 22px;
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  margin-right: 1rem;
}
.carousel-wrapper {
  min-height: auto;
  background-color: #FFFFFF;
  /* border-radius: 4rem;*/
}
</style>
