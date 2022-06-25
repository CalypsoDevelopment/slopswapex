<template>
  <b-container class="text-center">
    <b-row class="taker-token-container">
      <b-col cols="12" class="px-0">
        <div class="ttoken-select-container">
          <b-button
            class="taker-token-select-btn"
            block
            @click="$bvModal.show('liquiditytakerselect')"
          >
            <b-img
              :src="require(`@/assets/img/tokens/${LiquidityTakerToken.TokenContract}.png`)"
              fluid
              alt="Selected token that user wants to receive"
              class="taker-token-img"
            />
            {{ LiquidityTakerToken.TokenSymbol }}
            <i class="fa-solid fa-caret-down" />
          </b-button>

          <b-modal
            id="liquiditytakerselect"
            title="Select Trading Token"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <ul v-for="token in tokens" :key="token.TokenContract" class="my-2">
              <b-link
                class="maker-link"
                @click="changeLiquidityTakerToken(token.ChainID, token.TokenName, token.TokenSymbol, token.TokenContract, token.TokenDecimal, token.TokenType, token.BrandPrimary)"
              >
                <b-img
                  :src="require(`@/assets/img/tokens/${token.TokenContract}.png`)"
                  fluid
                  alt="Selected token that user wants to trade"
                  class="taker-token-img"
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
const tokenList = require('~/static/tokenLists/BSCTokenList.json')
export default {
  name: 'SlopSwapLiquidityTakerTokenSelect',
  components: {},
  data () {
    return {
      tokens: tokenList,
      LiquidityTakerToken: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      MetamaskConnection: Object,
      LiquidityTakerAmount: null,
      LiquidityTakerDollarAmount: null
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
    changeLiquidityTakerToken (ChainID, TokenName, TokenSymbol, TokenContract, TokenDecimal, TokenType, BrandPrimary) {
      this.LiquidityTakerToken = { ChainID: `${ChainID}`, TokenName: `${TokenName}`, TokenSymbol: `${TokenSymbol}`, TokenContract: `${TokenContract}`, TokenDecimal: `${TokenDecimal}`, TokenType: `${TokenType}`, BrandPrimary: `${BrandPrimary}` }
      this.LiquidityMakerAmount = null
      this.LiquidityTakerAmount = null
      this.$bvModal.hide('liquiditymakerselect')
      this.$bvModal.hide('liquiditytakerselect')
      // this.$bvModal.hide('TokenA')
      // this.$bvModal.hide('TokenB')
      this.quoteResponse = {}
      // const TakerTokenContract = this.TakerToken.TokenContract
      this.$emit('changeLiquidityTakerBalance', this.LiquidityTakerToken)
      this.$emit('changeLiquidityTakerToken', this.LiquidityTakerToken)
    }
  } // END OF METHODS
} // END OF EXPORT DEFAULT
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.taker-token-container {
  margin-top: 2rem;
  margin-bottom:2rem;
}
.ttoken-select-container {
  /* padding: 1rem; */
  /* background-color: #FFFFFF; */
  border-radius: 4rem;
}
.taker-token-select-btn {
  font-family: 'Fredoka One', sans-serif !important;
  color: #FFFFFF;
  font-variant: all-small-caps;
  font-weight: 500;
  font-size: 2rem;
  padding: 0.45rem;
  border-radius: 4rem;
   background-color: #5d3d42;
  border-color: #FFFFFF;
  /*background-image: url(~/assets/img/page-graphics/light-beige-splatter.png);
  background-position: top left;
  background-size: 90%;*/
}
.taker-token-img {
  max-height: 42px;
}
.taker-link {
  width: 100%;
}
.taker-link:hover {
  text-decoration: none;
}
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}
</style>
