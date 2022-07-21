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
      MainnetFactory: '0x7914BfaC79d35B1b521268cE4C431F112f4608fb',
      factory: null,
      MainnetRouter: '0x613EBe638AF0D7F412A328933F60399e3c410328',
      router: null,
      ActivePairAddress: null,
      pair: null,
      WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      WETHInstance: null,
      provider: null,
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
      SlippageSelected: 0.03,
      SlippageOptions: [
        { value: null, text: 'Slippage' },
        { value: 0.01, text: '1%' },
        { value: 0.02, text: '2%' },
        { value: 0.03, text: '3%' },
        { value: 0.04, text: '4%' },
        { value: 0.05, text: '5%' },
        { value: 0.06, text: '6%' },
        { value: 0.07, text: '7%' },
        { value: 0.08, text: '8%' },
        { value: 0.09, text: '9%' },
        { value: 0.10, text: '10%' },
        { value: 0.11, text: '11%' },
        { value: 0.12, text: '12%' },
        { value: 0.13, text: '13%' },
        { value: 0.14, text: '14%' },
        { value: 0.15, text: '15%' },
        { value: 0.16, text: '16%' },
        { value: 0.17, text: '17%' },
        { value: 0.18, text: '18%' },
        { value: 0.19, text: '19%' },
        { value: 0.20, text: '20%' },
        { value: 0.21, text: '21%' },
        { value: 0.22, text: '22%' },
        { value: 0.23, text: '23%' },
        { value: 0.24, text: '24%' },
        { value: 0.25, text: '25%' }
      ],
      // Below are the results from Liquidity Quote
      AmountADesired: null,
      AmountAOptimal: null,
      AmountBDesired: null,
      AmountBOptimal: null,
      AmountOut: null,
      kLastProduct: null,
      cumula0: null,
      cumula1: null,
      tx: null
    }
  },
  beforeMount () {
    this.liquidityConnect()
  },
  methods: {
    async CreateTradingPair () {
      /* alert(`
          __________________________________________
          We will now create a Trading Pair for:
          ${this.TokenA.TokenContract} | ${this.TokenB.TokenContract}
          __________________________________________`) */
      const createTradingPair = await this.factory.createPair(this.TokenA.TokenContract, this.TokenB.TokenContract)
      const receipt = await createTradingPair.wait()
      this.CreateReceipt = receipt

      alert(`Transaction receipt : https://www.bscscan.com/tx/${receipt.transactionHash}`)
      this.CreatePairReceipt = receipt.logs
      this.PairCheckResp = receipt.logs + '<br>' + `Transaction receipt : <a href="https://www.bscscan.com/tx/${receipt.transactionHash}" target="_blank" title="${this.TokenA.TokenName} / ${this.TokenB.TokenName} Trading Pair Creation Transaction Receipt from SlopSwap Exchange">View Transaction on BSCscan</a>`
    },
    /* The function getAmountOut is used to get a preview of a swap. It calls the Router function getAmountsOut with the amount of the first token and an array of the addresses of the tokens to be swapped as parameters. It returns the amount out of the second token. */
    async getAmountOut () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)
      const amountIn = ethers.utils.parseEther(this.amountA)
      alert(amountIn)

      // Get a quote for the amount of tokens you will receive
      const AmountOutValues = await this.router.getAmountsOut(amountIn, [TokenA, TokenB])

      alert('AmountOutValuesA ' + ethers.utils.formatEther(AmountOutValues[0]) + ' AmountOutValuesB ' + ethers.utils.formatEther(AmountOutValues[1]))

      const TradingPairAddress = this.factory.getPair(TokenA, TokenB)
      alert(TradingPairAddress)
      const pair = new ethers.Contract(TradingPairAddress, PAIR.abi, this.signer)

      // Request the reserve token amount
      const getReserveAmounts = await pair.getReserves()
      alert('Token A Reserves: ' + getReserveAmounts[0])
      alert('Token B Reserves: ' + getReserveAmounts[1])
    },
    async fetchReserves () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)

      const TradingPairAddress = this.factory.getPair(TokenA, TokenB)
      const pair = new ethers.Contract(TradingPairAddress, PAIR.abi, this.signer)

      try {
        const reservesRaw = await pair.getReserves()
        const results = [
          Number(ethers.utils.formatEther(reservesRaw[0])),
          Number(ethers.utils.formatEther(reservesRaw[1]))
        ]

        return [
          (await pair.token0()) === TokenA ? results[0] : results[1],
          (await pair.token1()) === TokenB ? results[1] : results[0]
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
    /* async removeLiquidity (

      LiquidityTokens,
      amount1min,
      amount2min,
      routerContract,
      account,
      signer,
      factory
    ) {
      const address1 = String(this.TokenA.TokenContract)
      const address2 = String(this.TokenB.TokenContract)
      const liquidity = ethers.utils.parseEther(LiquidityTokens.toString())

      const amount1Min = ethers.utils.parseEther(amount1min.toString())
      const amount2Min = ethers.utils.parseEther(amount2min.toString())

      const time = Math.floor(Date.now() / 1000) + 200000
      const deadline = ethers.BigNumber.from(time)

      const pairAddress = await this.factory.getPair(address1, address2)
      const pair = new ethers.Contract(pairAddress, PAIR.abi, signer)

      await pair.approve(routerContract.address, liquidity)

      alert([
        address1,
        address2,
        Number(liquidity),
        Number(amount1Min),
        Number(amount2Min),
        account,
        deadline,
      ]);

      if (address1 === COINS.AUTONITY.address) {
        // Eth + Token
        await routerContract.removeLiquidityETH(
          address2,
          liquidity,
          amount2Min,
          amount1Min,
          account,
          deadline
        );
      } else if (address2 === COINS.AUTONITY.address) {
        // Token + Eth
        await routerContract.removeLiquidityETH(
          address1,
          liquidity,
          amount1Min,
          amount2Min,
          account,
          deadline
        );
      } else {
        // Token + Token
        await routerContract.removeLiquidity(
          address1,
          address2,
          liquidity,
          amount1Min,
          amount2Min,
          account,
          deadline
        );
      }
    }, */
    // Function used to add Liquidity to any pair of tokens or token-AUT
    // To work correctly, there needs to be 9 arguments:
    //    `address1` - An Ethereum address of the coin to add from (either a token or AUT)
    //    `address2` - An Ethereum address of the coin to add to (either a token or AUT)
    //    `amount1` - A float or similar number representing the value of address1's coin to add
    //    `amount2` - A float or similar number representing the value of address2's coin to add
    //    `amount1Min` - A float or similar number representing the minimum of address1's coin to add
    //    `amount2Min` - A float or similar number representing the minimum of address2's coin to add
    //    `routerContract` - The router contract to carry out this trade
    //    `accountAddress` - An Ethereum address of the current user's account
    //    `provider` - The current provider
    //    `signer` - The current signer
    async addLiquidity () {
      // Assign the token contract address to address1 and address2 that you want to add liquidity for
      const address1 = String(this.TokenA.TokenContract)
      const address2 = String(this.TokenB.TokenContract)

      // assign the amounts A & B that come from the input fields
      const amount1 = String(this.amountA)
      const amount2 = String(this.amountB)

      // Convert the Ether amount from the A & B input fields into wei
      const amountIn1 = ethers.utils.parseEther(amount1.toString())
      const amountIn2 = ethers.utils.parseEther(amount2.toString())

      const slippage = this.SlippageSelected
      alert('Line 257')
      const amnt1 = ethers.utils.parseEther(amount1)
      const amount1minNonForm = amnt1 - (Number(amnt1) * slippage)
      const amount1min = ethers.utils.parseEther(String(amount1minNonForm))

      const amnt2 = ethers.utils.parseEther(amount2)
      const amount2minNonForm = amnt2 - (Number(amnt2) * slippage)
      const amount2min = ethers.utils.parseEther(String(amount2minNonForm))
      alert('Line 256')
      const amount1Min = ethers.utils.parseEther(amount1min.toString())
      const amount2Min = ethers.utils.parseEther(amount2min.toString())

      const time = Math.floor(Date.now() / 1000) + 200000
      const deadline = ethers.BigNumber.from(time)

      const token1 = new ethers.Contract(address1, BEP20.abi, this.signer)
      const token2 = new ethers.Contract(address2, BEP20.abi, this.signer)

      await token1.approve(address1, String(amountIn1))
      await token2.approve(address2, String(amountIn2))

      alert([
        address1,
        address2,
        Number(amountIn1),
        Number(amountIn2),
        Number(amount1Min),
        Number(amount2Min),
        this.account,
        deadline
      ])

      if (address1 === this.WETH) {
        // Eth + Token
        await this.router.addLiquidityETH(
          address2,
          String(amountIn2),
          String(amount2Min),
          String(amount1Min),
          this.account,
          deadline,
          { value: String(amountIn1) }
        )
      } else if (address2 === this.WETH) {
        // Token + Eth
        await this.router.addLiquidityETH(
          address1,
          String(amountIn1),
          String(amount1Min),
          String(amount2Min),
          this.account,
          deadline,
          { value: String(amountIn2) }
        )
      } else {
        // Token + Token
        await this.router.addLiquidity(
          address1,
          address2,
          String(amountIn1),
          String(amountIn2),
          String(amount1Min),
          String(amount2Min),
          this.account,
          deadline
        )
      }
      const tx = {
        to: this.MainnetRouter,
        gasLimit: 50000
      }
      await this.signer.sendTransaction(tx)
      const txReceipt = await this.provider.getTransactionReceipt(tx, (transaction) => {
        // Emitted when the transaction has been mined
      })
      this.txReceipt = txReceipt
      this.tx = tx
      alert('Transaction Receipt: ' + this.txReceipt)
      alert('Transaction: ' + this.tx)
    },
    async quoteAddLiquidity () {
      const TokenA = String(this.TokenA.TokenContract)
      const TokenB = String(this.TokenB.TokenContract)

      const FactoryContractInstance = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, this.signer)
      this.factory = FactoryContractInstance

      const TradingPairAddress = await this.factory.getPair(TokenA, TokenB)
      const pair = new ethers.Contract(TradingPairAddress, PAIR.abi, this.signer)
      this.pair = pair

      const amountADesired = this.amountA
      const amountBDesired = this.amountB
      const reservesRaw = await this.fetchReserves() // Returns the reserves already formated as ethers
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
      this.provider = provider

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
    },
    async GetOnChainPrice () {
      const kLastProduct = await this.pair.kLast()
      alert('kLast: ' + kLastProduct)
      this.kLastProd = kLastProduct
      const cumulative0 = await this.pair.price0CumulativeLast()
      alert('Cumulative Price 0: ' + cumulative0)
      this.cumula0 = cumulative0
      const cumulative1 = await this.pair.price0CumulativeLast()
      alert('Cumulative Price 1: ' + cumulative1)
      this.cumula1 = cumulative1
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
        <div class="my-0 py-0">
          <b-form-select v-model="SlippageSelected" class="slippage-selector" :options="SlippageOptions" />
        </div>
        <div>
          <b-list-group v-if="AmountOut != null">
            <b-list-group-item>
              <span v-if="AmountADesired != null">Token Amount A: {{ AmountADesired }}</span>
              <span v-if="AmountAOptimal != null">Token A Optimal Amount: {{ AmountAOptimal }}</span>
            </b-list-group-item>
            <b-list-group-item>
              AMount Out: {{ amountOut }}
            </b-list-group-item>
            <b-list-group-item>
              <span v-if="AmountBDesired != null">Token Amount B: {{ AmountBDesired }}</span>
              <span v-if="AmountBOptimal != null">Token B Optimal Amount: {{ AmountBOptimal }}</span>
            </b-list-group-item>
            <b-list-group-item>
              <span>Liquidity Token Received Quote {{ AmountOut }}</span>
            </b-list-group-item>
            <b-list-group-item>
              kLast Product: {{ kLastProd }}
              <br>
              Cumulative Price 0: {{ cumula0 }}
              <br>
              Cumulative Price 1 {{ cumula1 }}
            </b-list-group-item>
            <b-list-group-item>
              Token A Name: {{ TokenA.TokenName }}
              <br>
              Token Address A: {{ TokenA.TokenContract }}
            </b-list-group-item>
            <b-list-group-item>
              Token Name: {{ TokenB.TokenName }}
              <br>
              Token Address B: {{ TokenB.TokenContract }}
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
              variant="secondary"
              @click="getAmountOut()"
            >
              Get Amount Out
            </b-button>
            <b-button
              size="lg"
              variant="secondary"
              @click="quoteAddLiquidity()"
            >
              1. Add Liquidity Quote
            </b-button>
            <b-button
              size="lg"
              variant="secondary"
              @click="GetOnChainPrice()"
            >
              kLast Product &amp; Cumulative Price
            </b-button>
            <b-button
              size="lg"
              variant="secondary"
              @click="addLiquidity(amountA, amountB)"
            >
              2. Add Liquidity
            </b-button>
            <b-button
              size="lg"
              variant="secondary"
              @click="CreateTradingPair()"
            >
              Create Pair
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
