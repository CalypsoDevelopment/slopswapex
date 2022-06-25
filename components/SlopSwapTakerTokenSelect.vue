<template>
  <b-container class="text-center">
    <b-row class="taker-token-container">
      <b-col class="px-0">
        <div class="ttoken-select-container">
          <b-button
            class="taker-token-select-btn"
            block
            @click="$bvModal.show('takerselect')"
          >
            <b-img
              :src="require(`@/assets/img/tokens/${TakerToken.TokenContract}.png`)"
              fluid
              alt="Selected token that user wants to receive"
              class="taker-token-img"
            />
            {{ TakerToken.TokenSymbol }}
            <i class="fa-solid fa-caret-down" />
          </b-button>

          <b-modal
            id="takerselect"
            title="Select Trading Token"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <ul v-for="token in tokens" :key="token.TokenContract" class="my-2">
              <b-link
                class="maker-link"
                @click="changeTakerToken(token.ChainID, token.TokenName, token.TokenSymbol, token.TokenContract, token.TokenDecimal, token.TokenType, token.BrandPrimary)"
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
  name: 'SlopSwapTakerTokenSelect',
  components: {},
  data () {
    return {
      tokens: tokenList,
      TakerToken: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      MetamaskConnection: Object,
      TakerAmount: null,
      TakerDollarAmount: null
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
    changeTakerToken (ChainID, TokenName, TokenSymbol, TokenContract, TokenDecimal, TokenType, BrandPrimary) {
      this.TakerToken = { ChainID: `${ChainID}`, TokenName: `${TokenName}`, TokenSymbol: `${TokenSymbol}`, TokenContract: `${TokenContract}`, TokenDecimal: `${TokenDecimal}`, TokenType: `${TokenType}`, BrandPrimary: `${BrandPrimary}` }
      this.sellAmount = null
      this.buyAmount = null
      this.$bvModal.hide('makerselect')
      this.$bvModal.hide('takerselect')
      // this.$bvModal.hide('TokenA')
      // this.$bvModal.hide('TokenB')
      this.quoteResponse = {}
      // const TakerTokenContract = this.TakerToken.TokenContract
      this.$emit('changeTakerTokenBalance', this.TakerToken)
      this.$emit('changeTakerToken', this.TakerToken)
    }
  } // END OF METHODS
} // END OF EXPORT DEFAULT
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
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
  border-color: #FFFFFF;
  background-color: #c1272d;
  /*background-image: url(~/assets/img/page-graphics/dark-gray-splatter.png);
  background-position: bottom right;
  background-size: 80%;*/
}
.taker-token-img {
  max-height: 32px;
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
