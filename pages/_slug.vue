<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-Sized-Header-Rise-Of-the-PigsV2.png" fluid alt="Responsive image" />
    </div>
    <BSCSpotPriceTicker />
    <b-container>
      <b-row>
        <b-col sm="4" medium="4" lg="4" class="my-5 py-3 text-center">
          <b-button pill href="/cryptologos" class="my-3 py-2 white-btn">
            <i class="fa-solid fa-circle-arrow-left" style="color: #c1272e" />
            Back
          </b-button>
          <br>
          <b-img :src="require(`../assets/img/cryptologo/${cryptoSelected.Field2_link}`)" class="crypto-logo-thumb" fluid alt="cryptoSelected.Title" />
          <br>
          <b-button pill class="my-4 white-btn">
            Download
          </b-button>
        </b-col>
        <b-col sm="8" medium="8" lg="8" class="my-5 crypto-logo-container">
          <h1 class="main-title">
            {{ tok.Headline }}
          </h1>
          <ul v-for="tok in BSCTokenList" :key="tok.Token" class="token-data-ul">
            <!--<li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title"></span><br>
              <span class="token-text">{{  }}</span>
            </li>-->
            <li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title">Token Symbol:</span>
              <br>
              <span class="token-text">{{ tok.Token_Symbol }}</span>
            </li>
            <li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title">Description:</span><br>
              <span class="token-text">{{ tok.Token }}</span>
            </li>
            <li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title">Binance Smart Contract Address:</span>
              <br>
              <span class="token-text"><b-link :href="tok.BSC_Token_Link">{{ tok.Token_Contract }}</b-link></span>
            </li>
            <li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title">Decimals:</span>
              <br>
              <span class="token-text">{{ tok.Decimals }}</span>
            </li>
            <li v-if="tok.Token_Short_Name === cryptoSelected.Title_link" class="token-data text-left">
              <span class="token-info-title">Official Website:</span>
              <br>
              <span class="token-text"><b-link :href="tok.Official_Website">{{ tok.Official_Website }}</b-link></span>
            </li>
          </ul>
        </b-col>

        <b-col sm="6" medium="6" lg="6" class="my-2" />

        <b-col sm="6" medium="6" lg="6" class="my-2" />
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import BSCSpotPriceTicker from '~/components/BSCSpotPriceTicker.vue'
const cryptoJSON = require('~/static/cryptologobranding.json')
const BSCTokenList = require('~/static/bsctokenlist.json')

export default {
  name: 'CryptoLogosSinglePage',
  components: { TopNavbarComplex, BSCSpotPriceTicker },
  data () {
    return {
      cryptoSelected: this.$route.params,
      cryptoIndex: cryptoJSON,
      BSCTokenList,
      cryptologos: {},
      CryptoIdentifier: this.$route.params.slug
    }
  },
  beforeMount () {
    this.ReturnCryptoLogoById()
  },
  created () {
    this.getCryptoLogoById()
  },
  methods: {
    async getCryptoLogoById () {
      const cryptoLogoIdPromise = await fetch(`/cryptologos/${this.$route.params.cryptoJSON}`)
      const cryptoLogoIdJson = cryptoLogoIdPromise.json()
      cryptoLogoIdJson.then((res) => {
        this.cryptologos = res.data
      })
      this.CryptoIdentifier = this.$route.params.slug
    },
    ReturnCryptoLogoById () {
      const item = this.cryptoIndex

      for (let i = 0; i < item.length; i++) {
        if (item[i].Title_link === this.CryptoIdentifier) {
          this.cryptoSelected = item[i]
        }
      }
    }

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
.main-title {
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 2.2rem;
}
.white-btn {
  background-color: #FFFFFF;
  border-color: transparent;
  color: #c1272e;
  font-family: 'Fredoka One', verdana;
  font-variant-caps: all-small-caps;
}
.token-data-ul {
  padding-left: 10px;
  line-height: 1.6rem;
}
.token-data {
  list-style: none;
  font-family: 'Fredoka One', verdana;
  font-variant-caps: all-small-caps;
  font-size: 1.2rem;
  margin-bottom: 1.1rem;
  padding-left: 15px;
}
.token-info-title {
  background-color: #FFFFFF;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 1rem;
}
.token-text {
  color: #212529;
}
.crypto-logo-thumb {
  max-height: 300px;
}
</style>
