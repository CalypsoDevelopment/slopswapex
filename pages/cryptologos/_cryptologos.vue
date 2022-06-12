<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-Sized-Header-Rise-Of-the-PigsV2.png" fluid alt="Responsive image" />
    </div>
    <b-container fluid>
      <b-row>
        <b-col sm="6" medium="6" lg="6" class="my-2">
          <h1>This Is The Single _cryptoLogos Page</h1>
        </b-col>

        <b-col sm="6" medium="6" lg="6" class="my-2" />

        <b-col sm="6" medium="6" lg="6" class="my-2" />
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
const cryptoJSON = require('~/static/cryptologobranding.json')

export default {
  data () {
    return {
      cryptoSelected: null,
      cryptoIndex: cryptoJSON,
      cryptologos: {}
    }
  },
  created () {
    this.getCryptoLogoById()
  },
  methods: {
    async getCryptoLogoById () {
      const cryptoLogoIdPromise = await fetch(`/cryptologos/${this.$route.params.cryptoIndex}`)
      const cryptoLogoIdJson = cryptoLogoIdPromise.json()
      cryptoLogoIdJson.then((res) => {
        this.cryptologos = res.data
      })
    }
  }
}
</script>
<style scoped>

</style>
