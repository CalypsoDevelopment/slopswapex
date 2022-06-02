<template>
  <div>
  </div>
</template>
<script>
// import CryptoAniTicker from '~/components/CryptoAniTicker.vue'
// import { Carousel, Slide } from 'vue-carousel'
import { useBSCPriceTickerStore } from '@/src/store/BSCPriceTickerStore.js'
// const Console = require('Console')

export default {
  name: 'BSCSpotPriceTicker',
  components: {},
  data () {
    return {
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
    }
  }
}
</script>

</style>
