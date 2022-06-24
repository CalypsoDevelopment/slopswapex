<script>
import axios from 'axios'
import SlopSwapLiquidityMakerTokenSelect from '~/components/SlopSwapLiquidityMakerTokenSelect.vue'
import SlopSwapLiquidityTakerTokenSelect from '~/components/SlopSwapLiquidityTakerTokenSelect.vue'
const ethers = require('ethers')
const qs = require('qs')
const BEP20 = require('~/static/artifacts/IERC20.json')
const PAIR = require('~/static/artifacts/SlopSwapPair.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
// const tokenList = require('~/node_modules/slopswapxlibs/tokenLists/BSCTokenList.json')

export default {
  name: 'SlopSwapLiquidityFunction',
  components: {
    SlopSwapLiquidityMakerTokenSelect,
    SlopSwapLiquidityTakerTokenSelect
  },
  data () {
    return {
      MainnetFactory: '0x0533B75362E3Be13E78f245e50674c9a6dd9c17A',
      factory: null,
      MainnetRouter: '0x42A77DEdD13520141aaF1720EF88086B5Cae95f5',
      router: null,
      ActivePairAddress: null,
      pair: null,
      WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      WETHInstance: null,
      account: null,
      signer: null,
      TokenA: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#f0b90b' },
      TokenAContractInstance: null,
      TokenB: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      TokenBContractInstance: null,
      amountA: null,
      amountB: null,
      ReservesRawData: null,
      amountOut: null,
      PairQuote: null,
      // Below are the results from Liquidity Quote
      AmountADesired: null,
      AmountAOptimal: null,
      AmountBDesired: null,
      AmountBOptimal: null,
      AmountOut: null
    }
  },
  beforeMount () {
    this.liquidityConnect()
  },
  methods: {
    /* The function getAmountOut is used to get a preview of a swap. It calls the Router function getAmountsOut with the amount of the first token and an array of the addresses of the tokens to be swapped as parameters. It returns the amount out of the second token. */
    async getAmountOut () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)
      const amountIn = ethers.utils.parseEther(this.amountA)
      try {
        const ValuesOut = await this.router.getAmountsOut(
          ethers.utils.parseEther(amountIn),
          [TokenA, TokenB]
        )
        const AmountOut = ethers.utils.formatEther(ValuesOut[1])
        this.amountOut = Number(AmountOut)
      } catch {
        alert('The function GetAmountOut() returned false')
        return false
      }
    },
    async fetchReserves () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)
      try {
        const reservesRaw = await this.pair.getReserves()
        const results = [
          Number(ethers.utils.formatEther(reservesRaw[0])),
          Number(ethers.utils.formatEther(reservesRaw[1]))
        ]

        return [
          (await this.pair.token0()) === TokenA ? results[0] : results[1],
          (await this.pair.token1()) === TokenB ? results[1] : results[0]
        ]
      } catch (err) {
        alert('no reserves yet')
        return [0, 0]
      }
    },
    async getReserves () {
      // const pairAddress = await factory.getPair(address1, address2);
      // const pair = new Contract(pairAddress, PAIR.abi, signer);
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)
      const reservesRaw = await this.fetchReserves(TokenA, TokenB, this.pair)
      const liquidityTokensBN = await this.pair.balanceOf(this.account)
      const liquidityTokens = Number(
        ethers.utils.formatEther(liquidityTokensBN)
      ).toFixed(2)

      return [
        reservesRaw[0].toFixed(2),
        reservesRaw[1].toFixed(2),
        liquidityTokens
      ]
    },
    quote (amount1, reserve1, reserve2) {
      const amount2 = amount1 * (reserve2 / reserve1)
      const amountOut = Math.sqrt(amount2 * amount1)
      return [amount2, amountOut]
    },
    async quoteAddLiquidity () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)
      const amountADesired = this.amountA
      const amountBDesired = this.amountB
      const reservesRaw = await this.fetchReserves(TokenA, TokenB, this.pair) // Returns the reserves already formated as ethers
      const reserveA = reservesRaw[0]
      const reserveB = reservesRaw[1]

      if (reserveA === 0 && reserveB === 0) {
        const amountOut = Math.sqrt(reserveA * reserveB)
        return [
          amountADesired.toString(),
          amountBDesired.toString(),
          amountOut.toString()
        ]
      } else {
        const [amountBOptimal, amountOut] = this.quote(amountADesired, reserveA, reserveB)
        if (amountBOptimal <= amountBDesired) {
          alert('AmountB is Optimal: ' + amountBOptimal + 'Desired Amount A: ' + amountADesired + ' Amount Out: ' + amountOut)
          this.AmountADesired = amountADesired.toString()
          this.AmountBOptimal = amountBOptimal.toString()
          this.AmountOut = amountOut.toString()
        } else {
          const [amountAOptimal, amountOut] = this.quote(
            amountBDesired,
            reserveB,
            reserveA
          )
          alert('Amount A is Optimal: ' + amountAOptimal + ' AmountOut: ' + amountOut)
          this.AmountAOptimal = amountAOptimal.toString()
          this.AmountBDesired = amountBDesired.toString()
          this.AmountOut = amountOut.toString()
        }
      }
    },
    async liquidityConnect () {
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      this.account = accounts[0]

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      this.signer = signer

      const FactoryInstance = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, signer)
      this.factory = FactoryInstance

      const RouterInstance = new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, signer)
      this.router = RouterInstance

      // Get Current Pair Contract if it exists
      const WETH = new ethers.Contract(String(this.WETH), BEP20.abi, signer)
      this.WETHInstance = WETH

      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)

      const TokenAInstance = new ethers.Contract(TokenA, BEP20.abi, signer)
      this.TokenAContractInstance = TokenAInstance
      const TokenBInstance = new ethers.Contract(TokenB, BEP20.abi, signer)
      this.TokenBContractInstance = TokenBInstance

      const pairAddress = await this.factory.getPair(TokenA, TokenB)
      this.ActivePairAddress = String(pairAddress)
      const pair = new ethers.Contract(this.ActivePairAddress, PAIR.abi, signer)
      this.pair = pair
      alert('Success, All Contracts Instances Established!')
    },
    ChangePairTokenA (LiquidityMakerToken) {
      this.TokenA = LiquidityMakerToken
      // alert('Liquidity Token A has been changed to \nChainID: ' + this.TokenA.ChainID + '\nLiquidity Token Name:  ' + this.TokenA.TokenName + ' \nLiquidity Token Symbol: ' + this.TokenA.TokenSymbol + '\nLiquidity Token Contract: ' + this.TokenA.TokenContract + '\nLiquidity Token Decimal: ' + this.TokenA.TokenDecimal + '\nLiquidity Token Type: ' + this.TokenA.TokenType)
      this.amountA = null
      this.amountB = null
      /* this.CheckTradingPair()
      this.WalletStatusCheck()
      this.CheckForLiquidityTokens() */
      this.$bvModal.hide('TokenA')
    },
    ChangePairTokenB (LiquidityTakerToken) {
      this.TokenB = LiquidityTakerToken
      // alert('Liquidity Token B has been changed to \nChainID: ' + this.TokenB.ChainID + '\nLiquidity Token Name:  ' + this.TokenB.TokenName + ' \nLiquidity Token Symbol: ' + this.TokenB.TokenSymbol + '\nLiquidity Token Contract: ' + this.TokenB.TokenContract + '\nLiquidity Token Decimal: ' + this.TokenB.TokenDecimal + '\nLiquidity Token Type: ' + this.TokenB.TokenType)
      this.amountA = null
      this.amountB = null
      /* this.CheckTradingPair()
      this.WalletStatusCheck()
      this.CheckForLiquidityTokens() */
      this.$bvModal.hide('TokenB')
    },
    async PairQuoteCheck () {
      const TokenAFormatted = ethers.utils.parseUnits(this.amountA, this.TokenA.TokenDecimal)
      // alert(priceFormatter)
      /* const QuoteReview = `
      Adding Liquidity to Token Pair - ${this.TokenA.TokenSymbol}/${this.TokenB.TokenSymbol}
      ${TokenAFormatted}
      =================`
       alert(QuoteReview) */

      const params = {
        // Not all token symbols are supported. The address of the token can be used instead.
        sellToken: this.TokenA.TokenContract,
        buyToken: this.TokenB.TokenContract,
        // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
        sellAmount: String(TokenAFormatted)
      }

      const response = await axios.get(
    `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(params)}`
      )
      this.PairQuote = response
      // alert(this.PairQuote)
      this.amountB = ethers.utils.formatUnits(String(this.PairQuote.data.buyAmount), this.TokenB.TokenDecimal)

      // Units.convert(String(this.quote.data.buyAmount), 'wei', 'ether')
    }
  }
}
</script>

<template>
  <b-container class="align-vertical-container" fluid>
    <b-row class="vertical-content">
      <b-col sm="12" md="4" lg="4">
        <SlopSwapLiquidityMakerTokenSelect @changeLiquidityMakerToken="ChangePairTokenA($event)" />
        <b-form-input v-model="amountA" class="liquidity-input-field" placeholder="0.0" @change="PairQuoteCheck()" />
      </b-col>
      <b-col sm="12" md="4" lg="4">
        <div>
          <b-list-group v-if="AmountOut != null">
            <b-list-group-item>
              <span v-if="AmountADesired != null">Token Amount A: {{ AmountADesired }}</span>
              <span v-if="AmountAOptimal != null">Token A Optimal Amount: {{ AmountAOptimal }}</span>
            </b-list-group-item>
            <b-list-group-item>
              <span v-if="AmountBDesired != null">Token Amount B: {{ AmountBDesired }}</span>
              <span v-if="AmountBOptimal != null">Token B Optimal Amount: {{ AmountBOptimal }}</span>
            </b-list-group-item>
            <b-list-group-item>
              <span>Liquidity Token Received Quote {{ AmountOut }}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col sm="12" md="4" lg="4">
        <SlopSwapLiquidityTakerTokenSelect @changeLiquidityTakerToken="ChangePairTokenB($event)" />
        <b-form-input v-model="amountB" class="liquidity-input-field" placeholder="0.0" />
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col>
        <div>
          <b-button-group>
            <b-button
              size="lg"
              variant="warning"
              @click="quoteAddLiquidity()"
            >
              1. Add Liquidity Quote
            </b-button>
            <b-button
              disabled
              size="lg"
              variant="warning"
            >
              2. Add Liquidity
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.align-vertical-container {
  height: 100vh;
}
.vertical-content {
  vertical-align: middle;
}
.liquidity-input-field {
  border-radius: 2rem;
}
</style>
