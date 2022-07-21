<template>
  <b-container fluid class="bg px-0">
    <div>
      <b-sidebar id="notification-sidebar" width="50%" shadow>
        <div class="px-0 py-2">
          <h1 class="sidebar-title text-center dark-bg py-2">
            <!--<i class="fa-solid fa-circle-info liquidity-title-info" />--> Liquidity Pair Reserve Specifications<br>
          </h1>
          <div v-if="LiquidityPoolData">
            <b-list-group class="liquidity-spec-list text-center">
              <b-list-group-item>
                <h2 class="sec-title text-center dark-bg py-1">
                  SlopSwap eXchange Reserves
                </h2>
                <b-row>
                  <b-col cols="6" class="text-right">
                    <span class="pair-data">{{ LPTokenAName }}</span>
                  </b-col>
                  <b-col cols="6" class="text-left">
                    <span class="pair-data">{{ LPTokenBName }}</span>
                  </b-col>
                </b-row>
                <span class="pair-data">{{ LPTokenBReserve }}</span>
                {{ LPTokenASymbol }}
                <b-img
                  :src="require(`@/assets/img/tokens/${LPTokenAContract}.png`)"
                  fluid
                  alt="Selected token that user wants to receive"
                  class="small-pair-token-img"
                />
                <i class="fa-solid fa-scale-balanced" />
                <b-img
                  :src="require(`@/assets/img/tokens/${LPTokenBContract}.png`)"
                  fluid
                  alt="Selected token that user wants to receive"
                  class="small-pair-token-img"
                />
                {{ LPTokenBSymbol }}
                <span class="pair-data">{{ LPTokenAReserve }}</span>
              </b-list-group-item>
              <b-list-group-item>
                <div class="mb-2">
                  <h2 class="sec-title">
                    LP Token Pair Address
                  </h2>
                  <span class="token-address">
                    <b-link :href="`https://bscscan.com/token/${LPPairAddress}`" :title="`${LPTokenASymbol} | ${LPTokenBSymbol} SlopSwap Liquidity Pool Pair Address is ${LPPairAddress} can be explored further on the official BSC Scan website.`" target="_blank">
                      {{ LPPairAddress }}
                    </b-link>
                  </span>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <b-row>
                  <b-col sm="12" medium="12" lg="12">
                    <!--LP Token Names-->
                  </b-col>
                  <b-col sm="12" medium="12" lg="12">
                    <h2 class="sec-title">
                      Global Per Token Value
                    </h2>
                    1
                    {{ LPTokenASymbol }}
                    <b-img
                      :src="require(`@/assets/img/tokens/${LPTokenAContract}.png`)"
                      fluid
                      alt="Selected token that user wants to receive"
                      class="small-pair-token-img"
                    />
                    is Equal to
                    <b-img
                      :src="require(`@/assets/img/tokens/${LPTokenBContract}.png`)"
                      fluid
                      alt="Selected token that user wants to receive"
                      class="small-pair-token-img"
                      @load="PricePerToken()"
                    />
                    {{ LPTokenBSymbol }}
                    {{ TrimCharacters(String(TokenBEqualityAmount)) }}
                    <br>
                    <!--<b-button pill @click="PricePerToken()">
                      Check Price Per
                    </b-button>-->
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-row class="px-4 py-4">
                  <b-col sm="12" medium="12" lg="12" class="py-4">
                    <b-img
                      :src="require(`@/assets/img/tokens/SLOP-LPs.png`)"
                      fluid
                      alt="SLOP-LPs is the native Liquidity Pool Token of SlopSwap Exchange"
                      class="small-pair-token-img"
                    />
                    {{ LPTokenASymbol }} | {{ LPTokenBSymbol }} Liquidity Pool Balance: <span class="pair-data">{{ TrimCharacters(LPTokenBalance) }} SLOP-LPs</span>
                    <b-form-input v-model="AmountLiquidityOut" class="text-left" placeholder="0.0" />
                    <div class="align-middle">
                      <!--<span class="label-title">Slippage <i class="fa-solid fa-arrow-up-arrow-down" /></span>-->
                      <b-form-select v-model="SlippageRemSelected" class="slippage-selector mt-2" :options="SlippageOptions" />
                      <!--<i class="fa-solid fa-repeat fa-2x animate__animated animate__rotatIn" style="color: #007bff" />-->
                    </div>
                    <!--Liquidity: {{ liquidity }}-->
                  </b-col>
                  <b-col lg="6" sm="12" class="py-2">
                    <div class="mt-2 ml-3 text-left">
                      <b-img
                        :src="require(`@/assets/img/tokens/${LPTokenAContract}.png`)"
                        fluid
                        alt="Selected token that user wants to receive"
                        class="small-pair-token-img"
                      />
                      Pooled {{ LPTokenASymbol }}:
                      <span class="pair-data">{{ TrimCharacters(LPTokenBReserve) }} {{ LPTokenASymbol }}</span>
                    </div>
                    <b-form-input v-model="Bout" disabled placeholder="0.0" />
                  </b-col>
                  <b-col lg="6" sm="12" class="py-2">
                    <div class="mt-2 mr-3 text-right">
                      <b-img
                        :src="require(`@/assets/img/tokens/${LPTokenBContract}.png`)"
                        fluid
                        alt="Selected token that user wants to receive"
                        class="small-pair-token-img"
                      />
                      Pooled {{ LPTokenBSymbol }}:
                      <span class="pair-data">{{ TrimCharacters(LPTokenAReserve) }} {{ LPTokenBSymbol }}</span>
                    </div>
                    <b-form-input v-model="Aout" disabled class="text-right" placeholder="0.0" />
                  </b-col>
                  <b-col cols="12" sm="12">
                    <!--<b-button class="my-3 px-3 py-3 btn-left" @click="quoteRemoveLiquidityV2()">
                      <i class="fa-solid fa-bullseye-arrow" /> Remove Liquidity Quote
                    </b-button>-->

                    <b-button pill block class="my-3 px-5 py-3" @click="removeLiquidity()">
                      <i class="fa-solid fa-hexagon-check" /> Remove Liquidity
                    </b-button>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item />
              <b-list-group-item>
                <!--<p class="liquidity-info">
                  By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
                </p>-->
              </b-list-group-item>
              <!--<b-list-group-item></b-list-group-item>-->
            </b-list-group>
          </div>
          <div v-else>
            <b-img src="~/assets/img/page-graphics/no-connecty-no-looky.png" fluid alt="Responsive image" />
          </div>
        </div>
      </b-sidebar>
    </div>
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/Wise-Old-OwlV2.png" fluid alt="Responsive image" />
      <!-- <b-nav tabs align="right">
        <b-nav-item active>
          <i class="fa-solid fa-circle-plus" /> Add Liquidity
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-calculator" /> Calculator
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-bell-on" /> Notifications
        </b-nav-item>
        <b-nav-item>
          <i class="fa-solid fa-message" /> Community
        </b-nav-item>
      </b-nav>-->
    </div>
    <b-container fluid>
      <b-row>
        <b-col sm="12" medium="12" lg="2" class="text-center" />
        <b-col sm="12" medium="12" lg="8" class="text-center">
          <div class="app-container">
            <SlopSwapLiquidity @emitLP="CaptureLPData($event)" />
          </div> <!-- END OF .APP_CONTAINER -->
        </b-col>
        <b-col sm="12" medium="12" lg="2" class="text-center" />
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
// import { Console } from 'console'
import axios from 'axios'
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import SlopSwapLiquidity from '~/components/SlopSwapLiquidity.vue'
const ethers = require('ethers')
const qs = require('qs')
const Console = require('Console')
// const slop = require('slopswapxlibs')
const BEP20 = require('~/static/artifacts/IERC20.json')
const PAIR = require('~/static/artifacts/SlopSwapPair.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
Console.log('Console.log is now available!')

export default {
  name: 'LiquidityPage',
  components: { SlopSwapLiquidity, TopNavbarComplex },
  data () {
    return {
      LiquidityPoolData: null,
      LPTokenAName: null,
      LPTokenAContract: null,
      LPTokenASymbol: null,
      LPTokenADecimal: null,
      LPTokenBName: null,
      LPTokenBContract: null,
      LPTokenBSymbol: null,
      LPTokenBDecimal: null,
      LPPairAddress: null,
      LPTokenBalance: null,
      UserAccount: null,
      MainnetFactory: '0x0533B75362E3Be13E78f245e50674c9a6dd9c17A',
      MainnetRouter: '0x42A77DEdD13520141aaF1720EF88086B5Cae95f5',
      Aout: null,
      Bout: null,
      Amount1min: null,
      Amount2min: null,
      account: null,
      liquidityForRemoval: null,
      AmountLiquidityOut: null,
      SlippageRemSelected: 0,
      SlippageOptions: [
        { value: 0, text: 'Slippage' },
        { value: 1, text: '1%' },
        { value: 2, text: '2%' },
        { value: 3, text: '3%' },
        { value: 4, text: '4%' },
        { value: 5, text: '5%' },
        { value: 6, text: '6%' },
        { value: 7, text: '7%' },
        { value: 8, text: '8%' },
        { value: 9, text: '9%' },
        { value: 10, text: '10%' },
        { value: 11, text: '11%' },
        { value: 12, text: '12%' },
        { value: 13, text: '13%' },
        { value: 14, text: '14%' },
        { value: 15, text: '15%' },
        { value: 16, text: '16%' },
        { value: 17, text: '17%' },
        { value: 18, text: '18%' },
        { value: 19, text: '19%' },
        { value: 20, text: '20%' },
        { value: 21, text: '21%' },
        { value: 22, text: '22%' },
        { value: 23, text: '23%' },
        { value: 24, text: '24%' },
        { value: 25, text: '25%' }
      ],
      config: {
        START_COIN: 'WBNB',
        START_AMOUNT: 0.001,
        WALLET_MIN: 0,
        TRADE_INTERVAL: 300,
        SLIPPAGE: 5,
        GWEI: 5,
        GAS_LIMIT: 450000,
        BSC_NODE: 'https://bsc-dataseed.binance.org/'
      },
      TradingConfig: null,
      amount0MinSlip: null,
      amount1MinSlip: null,
      PairPriceEquality: null,
      TokenBEqualityAmount: null
    }
  },
  watch: {
    TokenBEqualityAmount () {
      this.PricePerToken()
    },
    AmountLiquidityOut (value) {
      this.quoteRemoveLiquidityV2()
      this.fetchReserves()
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    async PricePerToken () {
      // alert('Hello')
      const params = {
        // Not all token symbols are supported. The address of the token can be used instead.
        sellToken: this.LPTokenAContract,
        buyToken: this.LPTokenBContract,
        // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
        sellAmount: '1000000000000000000'
      }

      const response = await axios.get(
      `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(params)}`
      )
      this.PairPriceEquality = response
      // alert(this.PairQuote)
      this.TokenBEqualityAmount = ethers.utils.formatUnits(String(this.PairPriceEquality.data.buyAmount), this.LPTokenBDecimal)

      // Units.convert(String(this.quote.data.buyAmount), 'wei', 'ether')
    },
    TrimCharacters (value) {
      const trimmed = value.substring(0, 10)
      return trimmed
    },
    CaptureLPData (LPData) {
      this.LiquidityPoolData = LPData
      this.$emit('emitTransferLP', this.LiquidityPoolPairObj)
      /* alert('sent from SlopSwapLiquidity.vue ' + LPData.LiquidityPairAddress + ' ' +
      'Liquidity Pool TokenA: ' + this.LiquidityPoolData.LPTokenA.TokenSymbol + ' ' + this.LiquidityPoolData.LPTokenA.TokenContract) */
      this.LPPairAddress = this.LiquidityPoolData.LiquidityPairAddress
      this.LPTokenAName = this.LiquidityPoolData.LPTokenA.TokenName
      this.LPTokenBName = this.LiquidityPoolData.LPTokenB.TokenName
      this.LPTokenAContract = this.LiquidityPoolData.LPTokenA.TokenContract
      this.LPTokenBContract = this.LiquidityPoolData.LPTokenB.TokenContract
      this.LPTokenASymbol = this.LiquidityPoolData.LPTokenA.TokenSymbol
      this.LPTokenBSymbol = this.LiquidityPoolData.LPTokenB.TokenSymbol
      this.LPTokenADecimal = this.LiquidityPoolData.LPTokenA.TokenDecimal
      this.LPTokenBDecimal = this.LiquidityPoolData.LPTokenB.TokenDecimal
      this.LPTokenAReserve = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenAReserves)
      this.LPTokenBReserve = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenBReserves)
      this.LPTokenBalance = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenBalance)
    },
    // Function used to remove Liquidity from any pair of tokens or token-AUT
    // To work correctly, there needs to be 9 arguments:
    //    `address1` - An Ethereum address of the coin to recieve (either a token or AUT)
    //    `address2` - An Ethereum address of the coin to recieve (either a token or AUT)
    //    `liquidity_tokens` - A float or similar number representing the value of liquidity tokens you will burn to get tokens back
    //    `amount1Min` - A float or similar number representing the minimum of address1's coin to recieve
    //    `amount2Min` - A float or similar number representing the minimum of address2's coin to recieve
    //    `routerContract` - The router contract to carry out this trade
    //    `accountAddress` - An Ethereum address of the current user's account
    //    `provider` - The current provider
    //    `signer` - The current signer
    async removeLiquidity () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]

      const address1 = this.LPTokenAContract
      const address2 = this.LPTokenBContract

      const token1 = new ethers.Contract(address1, BEP20.abi, signer)
      Console.log('Token1 from inside removeLiquidity() Function: ' + token1)
      const token2 = new ethers.Contract(address2, BEP20.abi, signer)
      Console.log('Token2 from inside removeLiquidity() Function: ' + token2)

      const token1Decimals = this.LPTokenADecimal
      const token2Decimals = this.LPTokenBDecimal

      const LiquidityTokens = this.LPTokenBalance

      const Getliquidity = () => {
        if (LiquidityTokens < 0.001) {
          return ethers.BigNumber.from(LiquidityTokens * 10 ** 18)
        }
        return ethers.utils.parseUnits(String(LiquidityTokens), 18)
      }

      const router = await new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, signer)
      const factory = await new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, signer)

      const liquidity = Getliquidity(LiquidityTokens)
      alert('liquidity: ' + liquidity)

      // this is where we need to calculate slippage on amount1min & amount2min, which would be derived
      // from the input
      const amount1min = this.Aout
      const amount2min = this.Bout

      const amount1Min = ethers.utils.parseUnits(String(amount1min), token1Decimals)
      const amount2Min = ethers.utils.parseUnits(String(amount2min), token2Decimals)

      const time = Math.floor(Date.now() / 1000) + 200000
      const deadline = ethers.BigNumber.from(time)

      const wethAddress = await router.WETH()
      const pairAddress = await factory.getPair(address1, address2)
      const pair = new ethers.Contract(pairAddress, PAIR.abi, signer)

      alert('Line 316, Before Amount Approve. Liquidity is: ' + liquidity)
      await pair.approve(router.address, liquidity)

      const TradeConfig = {
        startCoin: this.config.START_COIN,
        startAmount: this.config.START_AMOUNT,
        slippage: this.SlippageSelected,
        gasPrice: ethers.utils.parseUnits(String(this.config.GWEI), 'gwei'),
        gasLimit: this.config.GAS_LIMIT,
        tradeInterval: this.config.TRADE_INTERVAL,
        walletMin: this.config.WALLET_MIN
      }
      this.TradingConfig = TradeConfig

      alert('Right Before Slippage Percentage Check, Slippage is: ' + this.SlippageRemSelected)
      if (this.SlippageRemSelected !== 0) {
        /* const amountOut = await router.getAmountsOut(
          String(this.amountIn),
          [address1, address2]
        ) */
        alert('Before Slippage Applied - amountOut[0] ' + amount1Min + ' ' + 'amountOut[1] ' + amount2Min)

        const amount0MinSlip = amount1Min.sub(amount1Min.div(this.SlippageRemSelected))
        const amount1MinSlip = amount2Min.sub(amount2Min.div(this.SlippageRemSelected))

        alert('Before Slippage Applied - amount0MinSlip ' + amount0MinSlip + ' ' + 'amount1MinSlip ' + amount1MinSlip)

        this.amount0MinSlip = amount0MinSlip
        this.amount1MinSlip = amount1MinSlip

        alert([
          address1,
          address2,
          Number(liquidity),
          Number(this.amount0MinSlip),
          Number(this.amount1MinSlip),
          String(this.account),
          deadline
        ])

        if (address1 === wethAddress) {
        // Eth + Token
          await router.removeLiquidityETH(
            address2,
            String(liquidity),
            String(this.amount0MinSlip),
            String(this.amount1MinSlip),
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
            /* value: amountIn */
            }
          )
        } else if (address2 === wethAddress) {
        // Token + Eth
          await router.removeLiquidityETH(
            address1,
            liquidity,
            this.amount0MinSlip,
            this.amount1MinSlip,
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
            /* value: amountIn */
            }
          )
        } else {
        // Token + Token
          await router.removeLiquidity(
            address1,
            address2,
            liquidity,
            this.amount0MinSlip,
            this.amount1MinSlip,
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
            /* value: amountIn */
            }
          )
        }
      } else {
        alert([
          address1,
          address2,
          Number(liquidity),
          Number(amount1Min),
          Number(amount2Min),
          String(this.account),
          deadline
        ])

        if (address1 === wethAddress) {
          // Eth + Token
          await router.removeLiquidityETH(
            address2,
            liquidity,
            amount2Min,
            amount1Min,
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
              /* value: amountIn */
            }
          )
        } else if (address2 === wethAddress) {
          // Token + Eth
          await router.removeLiquidityETH(
            address1,
            liquidity,
            amount1Min,
            amount2Min,
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
              /* value: amountIn */
            }
          )
        } else {
          // Token + Token
          await router.removeLiquidity(
            address1,
            address2,
            liquidity,
            amount1Min,
            amount2Min,
            String(this.account),
            deadline,
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null
              /* value: amountIn */
            }
          )
        }
      }
    },
    quote (amount1, reserve1, reserve2) {
      const amount2 = amount1 * (reserve2 / reserve1)
      return [amount2]
    },
    // This function calls the pair contract to fetch the reserves stored in a the liquidity pool between the token of address1 and the token
    // of address2. Some extra logic was needed to make sure that the results were returned in the correct order, as
    // `pair.getReserves()` would always return the reserves in the same order regardless of which order the addresses were.
    //    `address1` - An Ethereum address of the token to trade from (either a ERC20 token or AUT)
    //    `address2` - An Ethereum address of the token to trade to (either a ERC20 token or AUT)
    //    `pair` - The pair contract for the two tokens
    async fetchReserves () {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const accounts = await provider.send('eth_requestAccounts', [])
        this.account = accounts[0]
        const address1 = this.LPTokenAContract
        const address2 = this.LPTokenBContract

        // Get decimals for each coin
        const coin1 = new ethers.Contract(address1, BEP20.abi, signer)
        Console.log('Coin1: ' + coin1)
        const coin2 = new ethers.Contract(address2, BEP20.abi, signer)
        Console.log('Coin2: ' + coin2)

        const coin1Decimals = this.LPTokenADecimal
        const coin2Decimals = this.LPTokenBDecimal

        const pair = await new ethers.Contract(String(this.LPPairAddress), PAIR.abi, signer)

        // Get reserves
        const reservesRaw = await pair.getReserves()

        // Put the results in the right order
        const results = [
          (await pair.token0()) === address1 ? reservesRaw[0] : reservesRaw[1],
          (await pair.token1()) === address2 ? reservesRaw[1] : reservesRaw[0]
        ]

        // Scale each to the right decimal place
        return [
          (results[0] * 10 ** (-coin1Decimals)),
          (results[1] * 10 ** (-coin2Decimals))
        ]
      } catch (err) {
        // alert('error!')
        alert(err)
        return [0, 0]
      }
    },
    // Function used to get a quote of the liquidity removal
    //    `address1` - An Ethereum address of the coin to recieve (either a token or AUT)
    //    `address2` - An Ethereum address of the coin to recieve (either a token or AUT)
    //    `liquidity` - The amount of liquidity tokens the user will burn to get their tokens back
    //    `factory` - The current factory
    //    `signer` - The current signer
    async quoteRemoveLiquidityV2 () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()

      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]

      const liquidity = this.AmountLiquidityOut

      const pair = new ethers.Contract(String(this.LPPairAddress), PAIR.abi, signer)
      const factory = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, signer)
      // alert('Line 316')
      const reservesRaw = await pair.getReserves() // Returns the reserves already formated as ethers
      const reserveA = reservesRaw[0]
      // alert('Reserve A ' + reserveA)
      const reserveB = reservesRaw[1]
      // alert('Reserve B ' + reserveB)

      const feeOn =
        (await factory.feeTo()) !== 0x0000000000000000000000000000000000000000
      const feeGoesToAddress = await factory.feeTo()
      Console.log('Fee to Address: ' + feeGoesToAddress)
      // alert('Transaction Fee will go to address: ' + feeGoesToAddress)

      const _kLast = await pair.kLast()
      const kLast = Number(ethers.utils.formatEther(_kLast))

      // alert('_kLast: ' + _kLast + ' ' + 'kLast: ' + kLast)

      const _totalSupply = await pair.totalSupply()
      let totalSupply = Number(ethers.utils.formatEther(_totalSupply))
      // alert('Total Supply: ' + totalSupply)

      if (feeOn && kLast > 0) {
        const feeLiquidity =
          (totalSupply * (Math.sqrt(reserveA * reserveB) - Math.sqrt(kLast))) /
          (5 * Math.sqrt(reserveA * reserveB) + Math.sqrt(kLast))
        totalSupply = totalSupply + feeLiquidity
      }

      const Aout = (reserveA * liquidity) / totalSupply
      const Bout = (reserveB * liquidity) / totalSupply

      this.Aout = ethers.utils.formatEther(String(Aout))
      this.Bout = ethers.utils.formatEther(String(Bout))
      this.liquidityForRemoval = liquidity
      // return [liquidity, Aout, Bout]
    } // END OF QUOTE REMOVE LIQUIDITY

  } // END OF METHODS
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.bg {
  /*background: rgb(224,224,224);
  background: linear-gradient(180deg, rgba(224,224,224,1) 0%, rgba(184,173,150,1) 58%, rgba(79,51,57,1) 100%);*/
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(46,163,230,1) 48%, rgba(255,158,46,1) 100%);
  min-height: 100vh;
}
.slippage-selector {
  background-color: #212529;
  color: #FFFFFF;
  border-radius: 4rem;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.liquidity-title-info {
  max-height: 22px;
}
.sec-title {
  font-family: 'Fredoka One', sans-serif;
  color: #212529;
  font-size: 1.4rem;
}
.btn {
    background-color: #212529;
    border: 1px solid #FFFFFF;
}
.btn-group .btn-left {
    border-top-left-radius: 4rem;
    border-bottom-left-radius: 4rem;
    border-color: #FFFFFF;
    background-color: #212529;
    font-variant-caps: all-small-caps;
}
.btn-group .btn-right {
    border-top-right-radius: 4rem;
    border-bottom-right-radius: 4rem;
    background-color: #212529;
    border-color: #FFFFFF;
    font-variant-caps: all-small-caps;
}
.liquidity-info {
  font-variant-caps: all-small-caps;
  font-family: 'Nunito', sans-serif;
  color: #495057;
  font-size: 1rem;
  font-weight: 800;
}
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 1.4rem;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #495057;
    background-color: #212529;
    border-radius: 8rem;
}
.liquidity-spec-list {
  font-variant-caps: all-small-caps;
  font-family: 'Nunito', sans-serif;
  color: #6c757d;
  font-weight: bold;
  font-size: 1.2rem;
}
.pair-data {
  color: #17a2b8;
  font-size: 1.1rem;
}
.token-address {
  font-size: 1.1rem;
}
.sidebar-title, .secondary-title {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #212529;
  font-size: 1.8rem;
}
/* .dark-bg {
  background-color: #17a2b8;
} */
.small-pair-token-img {
  max-height: 22px;
}
.app-container {
  min-height: 600px;
}
.farm-bg {
  /*border-bottom: 1px solid #e0e0e0;*/
  background-color: #FFFFFF;
  /* padding-top: 1rem; */
  height: auto;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
  /*background-image: url(~/assets/img/page-graphics/Wise-Old-Owl.png);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;*/
}
a {
    color:#17a2b8;
    text-decoration: none;
    background-color: transparent;
}
a.nav-link:hover, a.nav-link.active:hover {
  color: #FFFFFF;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #495057;
    background-color: #17a2b8;
    border-radius: 8rem;
}
.nav-tabs .nav-link {
    margin-bottom: 0px;
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}
</style>
