<template>
  <div class="carousel-wrapper">
    <VueSlickCarousel v-bind="slickOptions" ref="carousel">
      <div v-for="token in store.TickerData" :key="token">
        {{ token.contract_name }}
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
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 2000,
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
.carousel-wrapper {
  max-height: 280px;
}
</style>
