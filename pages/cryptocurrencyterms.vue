<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-Page-Header-Crypto-Terms.png" fluid alt="SlopSwap's Cryptocurrency Trading Term Dictionary" />
    </div>
    <BSCSpotPriceTicker />
    <b-container>
      <b-row>
        <b-col sm="12" medium="8" lg="8" class="my-5 crypto-logo-container">
          <div v-for="item in CryptoTerms" class="term-container" :key="item.Title">
            <h1 class="main-title">
              {{ item.Title }}
            </h1>
            <div>
              <p>
                {{ item.Description }}
              </p>
            </div>
          </div>
        </b-col>
        <b-col sm="12" medium="4" lg="4" class="my-2">

        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import BSCSpotPriceTicker from '~/components/BSCSpotPriceTicker.vue'
const cryptoTermsJSON = require('~/static/cryptocurrency_terms.json')

export default {
  name: 'CryptoTermsSinglePage',
  components: { TopNavbarComplex, BSCSpotPriceTicker },
  data () {
    return {
      CryptoTerms: cryptoTermsJSON
    }
  },
  beforeMount () {
  },
  created () {
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
.term-container {
  margin-top: 4rem;
  margin-bottom: 4re,;
  padding: 2rem;
  border-radius: 4rem;
  border: 1px solid #FFFFFF;
  background-color: #FFFFFF;
}
.main-title {
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 2.2rem;
}

</style>
