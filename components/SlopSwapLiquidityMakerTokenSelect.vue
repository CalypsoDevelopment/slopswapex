<template>
  <b-container class="text-center">
    <b-row class="maker-token-container">
      <b-col cols="12">
        <div class="mtoken-select-container">
          <b-button
            class="maker-token-select-btn"
            block
            @click="$bvModal.show('liquiditymakerselect')"
          >
            <b-img
              :src="require(`@/assets/img/tokens/${LiquidityMakerToken.TokenContract}.png`)"
              fluid
              alt="Selected token that user wants to trade"
              class="maker-token-img"
            />
            {{ LiquidityMakerToken.TokenSymbol }}
            <i class="fa-solid fa-caret-down" />
          </b-button>

          <b-modal
            id="liquiditymakerselect"
            title="Select Trading Token"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <ul v-for="token in tokens" :key="token.TokenContract" class="my-2">
              <b-link
                class="maker-link"
                @click="changeLiquidityMakerToken(token.ChainID, token.TokenName, token.TokenSymbol, token.TokenContract, token.TokenDecimal, token.TokenType, token.BrandPrimary)"
              >
                <b-img
                  :src="require(`@/assets/img/tokens/${token.TokenContract}.png`)"
                  fluid
                  alt="Selected token that user wants to trade"
                  class="maker-token-img"
                /> {{ token.TokenSymbol }}
              </b-link>
            </ul>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
// const ethers = require('ethers')
// import 'animate.css'
const Console = require('Console')
Console.log('Console.log is now available!')
const slopswaplib = require('slopswapxlibs')
const tokenList = require('~/node_modules/slopswapxlibs/tokenLists/BSCTokenList.json')
export default {
  name: 'SlopSwapLiquidityMakerTokenSelect',
  components: {},
  data () {
    return {
      tokens: tokenList,
      LiquidityMakerToken: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'BEP-20', BrandPrimary: '#f0b90b' },
      MetamaskConnection: Object,
      LiquidityMakerAmount: null,
      LiquidityMakerDollarAmount: null
    }
  },
  beforeMount () {
    this.connectMeta()
  },
  methods: {
    async connectMeta () {
      const provider = slopswaplib.getProvider()
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send('eth_requestAccounts', [])
      const account = accounts[0]
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = slopswaplib.getSigner(provider)

      this.MetamaskConnection = {
        provider,
        signer,
        account
      }
    },
    changeLiquidityMakerToken (ChainID, TokenName, TokenSymbol, TokenContract, TokenDecimal, TokenType, BrandPrimary) {
      this.LiquidityMakerToken = { ChainID: `${ChainID}`, TokenName: `${TokenName}`, TokenSymbol: `${TokenSymbol}`, TokenContract: `${TokenContract}`, TokenDecimal: `${TokenDecimal}`, TokenType: `${TokenType}`, BrandPrimary: `${BrandPrimary}` }
      this.LiquidityMakerAmount = null
      this.LiquidityTakerAmount = null
      this.$bvModal.hide('liquiditymakerselect')
      this.$bvModal.hide('liquiditytakerselect')
      // this.$bvModal.hide('TokenA')
      // this.$bvModal.hide('TokenB')
      this.quoteResponse = {}
      // const MakerTokenContract = this.MakerToken.TokenContract
      this.$emit('changeLiquidityMakerBalance', this.LiquidityMakerToken)
      this.$emit('changeLiquidityMakerToken', this.LiquidityMakerToken)
    }
  } // END OF METHODS
} // END OF EXPORT DEFAULT
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.maker-token-container {
  margin-top: 2rem;
  margin-bottom:2rem;
}
.mtoken-select-container {
  /* padding: 1rem; */
  /* background-color: #FFFFFF; */
  border-radius: 4rem;
}
.maker-token-select-btn {
  font-family: 'Fredoka One', sans-serif !important;
  color: #FFFFFF;
  font-variant: all-small-caps;
  font-weight: 500;
  font-size: 2rem;
  padding: 0.45rem;
  border-radius: 4rem;
}
.maker-token-img {
  max-height: 42px;
}
.maker-link {
  width: 100%;
}
.maker-link:hover {
  text-decoration: none;
}
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}
</style>
