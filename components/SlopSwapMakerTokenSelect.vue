<template>
  <b-container class="text-center">
    <b-row class="maker-token-container">
      <b-col class="px-0">
        <div class="mtoken-select-container">
          <b-button
            class="maker-token-select-btn"
            block
            @click="$bvModal.show('makerselect')"
          >
            <b-img
              :src="require(`@/assets/img/tokens/${MakerToken.TokenContract}.png`)"
              fluid
              alt="Selected token that user wants to trade"
              class="maker-token-img"
            />
            {{ MakerToken.TokenSymbol }}
            <i class="fa-solid fa-caret-down" />
          </b-button>

          <b-modal
            id="makerselect"
            title="Select Trading Token"
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
          >
            <ul v-for="token in tokens" :key="token.TokenContract" class="my-2">
              <b-link
                class="maker-link"
                @click="changeMakerToken(token.ChainID, token.TokenName, token.TokenSymbol, token.TokenContract, token.TokenDecimal, token.TokenType, token.BrandPrimary)"
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
const ethers = require('ethers')
const tokenList = require('~/node_modules/slopswapxlibs/tokenLists/BSCTokenList.json')

export default {
  name: 'SlopSwapMakerTokenSelect',
  components: {},
  data () {
    return {
      tokens: tokenList,
      MakerToken: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'BEP-20', BrandPrimary: '#f0b90b' },
      MetamaskConnection: Object,
      MakerAmount: null,
      MakerDollarAmount: null
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
    changeMakerToken (ChainID, TokenName, TokenSymbol, TokenContract, TokenDecimal, TokenType, BrandPrimary) {
      this.MakerToken = { ChainID: `${ChainID}`, TokenName: `${TokenName}`, TokenSymbol: `${TokenSymbol}`, TokenContract: `${TokenContract}`, TokenDecimal: `${TokenDecimal}`, TokenType: `${TokenType}`, BrandPrimary: `${BrandPrimary}` }
      this.sellAmount = null
      this.buyAmount = null
      this.$bvModal.hide('makerselect')
      this.$bvModal.hide('takerselect')
      // this.$bvModal.hide('TokenA')
      // this.$bvModal.hide('TokenB')
      this.quoteResponse = {}
      // const MakerTokenContract = this.MakerToken.TokenContract
      this.$emit('changeMakerTokenBalance', this.MakerToken)
      this.$emit('changeMakerToken', this.MakerToken)
    },
    async RetrieveUserBalances () {
      // Define Token A & B
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which ism
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      // const signer = provider.getSigner()
      // alert('Signer: ' + signer)

      const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // this.UserAccount = account.address
      // alert('Wallet User: ' + account)
      // alert('Before Token Symbol')
      alert(account)
    }
  } // END OF METHODS
} // END OF EXPORT DEFAULT
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
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
  margin-right: 0rem;
  margin-left: 0rem;
  border-radius: 4rem;
  border-color: #FFFFFF;
  background-color: #c1272d;
  /*background-image: url(~/assets/img/page-graphics/dark-gray-splatter.png);
  background-position: top left;
  background-size: 70%;*/

}
.maker-token-img {
  max-height: 32px;
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
