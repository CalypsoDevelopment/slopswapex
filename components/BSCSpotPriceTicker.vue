<template>
  <div>
  </div>
</template>
<script>
// import CryptoAniTicker from '~/components/CryptoAniTicker.vue'

export default {
  name: 'BSCSpotPriceTicker',
  components: {
  },
  data () {
    return {
      active: 4,
      TickerData: false
    }
  },
  beforeMount () {
    this.fetchTickerData()
  },
  methods: {
    async fetchTickerData () {
      const TickerDataRequest = await this.$axios.$get('https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&key=ckey_58f88ae689904d67bb81f4d84d4')
      this.TickerData = TickerDataRequest
    }
  }
}
</script>
<style scoped>

</style>
