<template>
  <b-container fluid>
    <b-row class="trade-container">
      <b-col sm="12" medium="12" lg="12">
        <div>
          <b-nav>
            <b-nav-item active>
              <i class="fa-solid fa-gears" style="color: #6c757d;" />
            </b-nav-item>
            <b-nav-item>
              <i class="fa-solid fa-clock-rotate-left" style="color: #6c757d;" />
            </b-nav-item>
            <b-nav-item>
              <i class="fa-solid fa-chart-area" style="color: #6c757d;" />
            </b-nav-item>
            <!--<b-nav-item>
            </b-nav-item>-->
          </b-nav>
        </div>
      </b-col>
      <b-col sm="12" medium="12" lg="12">
        <div>
          <h1 class="main-title">
            <span class="blue-gray">Slop</span>Swap <span class="blue-gray">Liquidity</span>
          </h1>
        </div>
      </b-col>
      <b-col sm="12" medium="12" lg="5" class="text-center">
        <SlopSwapLiquidityMakerTokenSelect @changeLiquidityMakerToken="ChangePairTokenA($event)" @changeLiquidityMakerBalance="ChangePairTokenABalance($event)" />
        <div>
          <b-form-input v-model="TokenAPairAmount" class="maker-liquidity-amount" placeholder="0.0" @change="PairQuoteCheck()" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ MakerDollarAmount }}
          </div>-->
        </div>
        <div class="text-center mt-1 mb-1">
          <span class="label-title"><strong>Wallet Balance:</strong> {{ TokenAUserBalance }}</span>
        </div>
      </b-col>
      <b-col sm="12" medium="12" lg="2" class="text-center">
        <div class="align-middle">
          <span class="label-title">Slippage <i class="fa-solid fa-arrow-up-arrow-down" /></span>
          <b-form-select v-model="SlippageSelected" class="slippage-selector mt-2" :options="SlippageOptions" />
          <!--<i class="fa-solid fa-repeat fa-2x animate__animated animate__rotatIn" style="color: #007bff" />-->
        </div>
      </b-col>
      <b-col sm="12" medium="12" lg="5" class="text-center">
        <SlopSwapLiquidityTakerTokenSelect @changeLiquidityTakerToken="ChangePairTokenB($event)" @changeLiquidityTakerBalance="ChangePairTokenBBalance($event)" />
        <div>
          <b-form-input v-model="TokenBPairAmount" class="taker-liquidity-amount" placeholder="0.0" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ TakerDollarAmount }}
          </div>-->
        </div>
        <div class="text-center mt-1 mb-1" @change="RetrieveUserBalances(TokenA.TokenContract, TokenB.TokenContract)">
          <span class="label-title"><strong>Wallet Balance:</strong> {{ TokenBUserBalance }}</span>
        </div>
      </b-col>
      <b-col sm="12" medium="12" lg="12" @change="WalletStatusCheck()">
        <div class="my-4">
          <div>
            <b-button
              v-if="PairCheckResp === '0x0000000000000000000000000000000000000000'"
              variant="primary"
              pill
              class="my-2 button-text"
              @click="CreateTradingPair()"
            >
              Create Pair
            </b-button>
            <b-button-group size="sm" center class="mx-1">
              <b-button
                v-if="PairCheckResp != '0x0000000000000000000000000000000000000000'"
                variant="primary"
                class="my-2 button-text btn-left my-3 px-3 py-3"
                @click="addLiquidity()"
              >
                <i class="fa-solid fa-hexagon-plus" /> Add Liquidity
              </b-button>
              <b-button
                v-b-toggle.notification-sidebar
                variant="primary"
                class="my-2 button-text btn-right my-3 px-3 py-3"
              >
                <i class="fa-solid fa-hexagon-minus" /> Remove | Review LP
              </b-button>
            </b-button-group>
            <!--<b-button
                variant="primary"
                pill
                block
                class="my-2 button-text"
                @click="RemoveLiquidity(LiquidityBalance)"
              >
                <i class="fa-solid fa-minus" /> Remove Liquidity
              </b-button>-->
          </div>
        </div>
        <!--<div v-if="loggedIn" @change="CheckTradingPair()">
          <div class="lp-pair-container my-2">
            <h2 class="secondary-title">
              <div id="pair-spec-popover" class="help-section">
                <i class="fa-solid fa-circle-info pair-icon-size" />
                <span class="grey-text">Liquidity Action Notifications</span>
              </div>
            </h2>
            <div v-if="PairCheckResp === '0x0000000000000000000000000000000000000000'" class="no-exist my-1 mx-1">
              <i class="fa-solid fa-circle-info" /> This Liquidity does not exist on SlopSwap yet, would you like to be the first to create this Liquidity Pool?<br>
              <b-button pill variant="primary" class="ml-1 mr-1 button-text" @click="CreateTradingPair()">
                Create Pair
              </b-button>
            </div>
            <div v-else class="no-exist">
              <i class="fa-solid fa-circle-info" /> This Liquidity Pair already exists, would you like to add some liquidity to it?<br>
              <b-button pill variant="primary" class="ml-1 mr-1 button-text" @click="addLiquidity()">
                Add Liquidity
              </b-button>
            </div>
          </div>-->
        <!--<div>
          <div class="lp-pair-container">
            <h2 class="secondary-title">
              <div id="pair-spec-popover" class="help-section">
                <i class="fa-solid fa-circle-info pair-icon-size" />
                <span class="grey-text">Liquidity Pair Specifications</span>
              </div>
            </h2>
            <span class="lp-balance">Balance: {{ LiquidityPoolBalance }}</span><br>
            <b-link :href="`https://bscscan.com/token/${PairCheckResp}`" :title="`${TokenA.TokenSymbol} | ${TokenB.TokenSymbol} SlopSwap Liquidity Pool Pair Address is ${PairCheckResp} can be explored further on the official BSC Scan website.`" target="_blank">
              <span class="small-pair-balance">Pooled Balance: {{ HRLPReserveB }}</span>
              <b-img
                :src="require(`@/assets/img/tokens/${TokenA.TokenContract}.png`)"
                fluid
                alt="Selected token that user wants to receive"
                class="small-pair-token-img"
              />
              <span class="small-pair-symbols">{{ TokenA.TokenSymbol }}</span>
            </b-link>
            <i class="fa-solid fa-pipe" style="color: #17a2b8" />
            <b-link :href="`https://bscscan.com/token/${PairCheckResp}`" :title="`${TokenA.TokenSymbol} | ${TokenB.TokenSymbol} SlopSwap Liquidity Pool Pair Address is ${PairCheckResp} can be explored further on the official BSC Scan website.`" target="_blank">
              <span class="small-pair-symbols">{{ TokenB.TokenSymbol }}</span>
              <b-img
                :src="require(`@/assets/img/tokens/${TokenB.TokenContract}.png`)"
                fluid
                alt="Selected token that user wants to receive"
                class="small-pair-token-img"
              />
              <span class="small-pair-balance">Pooled Balance: {{ HRLPReserveA }}</span>
              <br>
            </b-link>
            <span class="small-pair-symbols blue-gray">Pair Contract Address</span>
            <br>
            <b-link :href="`https://bscscan.com/token/${PairCheckResp}`" :title="`${TokenA.TokenSymbol} | ${TokenB.TokenSymbol} SlopSwap Liquidity Pool Pair Address is ${PairCheckResp} can be explored further on the official BSC Scan website.`" target="_blank">
              <span class="lp-address">
                {{ LPAddress }}
              </span>
            </b-link>
            <b-popover target="pair-spec-popover" triggers="hover" placement="top">
              <template #title>
                Liquidity Pair
              </template>
              A liquidity pool is a vault into which participants deposit their assets in order to form a market (trading pair) and make it liquid for those wishing to trade in that pair.
            </b-popover>
          </div>
        </div>
        <div v-else class="block-inlline-notification my-4">
          <p class="notification-text pt-4">
            <i class="fa-solid fa-circle-info" /> Please connect your wallet to SlopSwap to enable blockchain interaction. Once your wallet is connected, you'll receive helpful onsite notifications associated with our exchange.<br>
          </p>
          <b-button pill class="my-2 px-2 button-text">
            <i class="fa-solid fa-plug" /> Web3 Wallet Connect
          </b-button>
        </div>
        <div class="block-inline-notification my-2">
          <p class="funfact-text">
            <strong>Fun Fact:</strong> When you connect your wallet, you establish an anonymous Web3 Profile on our exchange. Here at SlopSwap, we value individuality as much as everyone's right to remain anonymous.<br>
          </p>
        </div>-->
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios'
import SlopSwapLiquidityMakerTokenSelect from '~/components/SlopSwapLiquidityMakerTokenSelect.vue'
import SlopSwapLiquidityTakerTokenSelect from '~/components/SlopSwapLiquidityTakerTokenSelect.vue'
const ethers = require('ethers')
const qs = require('qs')
const Console = require('Console')
const BEP20 = require('~/static/artifacts/IERC20.json')
const PAIR = require('~/static/artifacts/SlopSwapPair.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
const tokenList = require('~/node_modules/slopswapxlibs/tokenLists/BSCTokenList.json')
// SlopSwap Pair Contract 0xD1eAbB3Bce6E50F000463589d137c182B39B179D
// SlopSwap Factory 0x0533B75362E3Be13E78f245e50674c9a6dd9c17A
// SlopSwap Router 0x42A77DEdD13520141aaF1720EF88086B5Cae95f5
// PancakeSwap Factory 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
// Pancake Router 0x10ED43C718714eb63d5aA57B78B54704E256024E

export default {
  name: 'SlopSwapLiquidity',
  components: { SlopSwapLiquidityMakerTokenSelect, SlopSwapLiquidityTakerTokenSelect },
  data () {
    return {
      MainnetFactory: '0x0533B75362E3Be13E78f245e50674c9a6dd9c17A',
      MainnetFactoryABI: [
        'function getPair(address tokenA, address tokenB) external view returns (address pair)',
        'function allPairs(uint) external view returns (address pair)',
        'function allPairsLength() external view returns (uint)',
        'function createPair(address tokenA, address tokenB) external returns (address pair)',
        'function feeTo() external view returns (address)',
        'function feeToSetter() external view returns (address)',
        'event PairCreated(address indexed token0, address indexed token1, address pair, uint)'
      ],
      MainnetPair: '0xD1eAbB3Bce6E50F000463589d137c182B39B179D',
      MainnetPairABI: [
        'event Approval(address indexed owner, address indexed spender, uint value)',
        'event Transfer(address indexed from, address indexed to, uint value)',

        'function name() external pure returns (string memory)',
        'function symbol() external pure returns (string memory)',
        'function decimals() external pure returns (uint8)',
        'function totalSupply() external view returns (uint)',
        'function balanceOf(address owner) external view returns (uint)',
        'function allowance(address owner, address spender) external view returns (uint)',

        'function approve(address spender, uint value) external returns (bool)',
        'function transfer(address to, uint value) external returns (bool)',
        'function transferFrom(address from, address to, uint value) external returns (bool)',

        'function DOMAIN_SEPARATOR() external view returns (bytes32)',
        'function PERMIT_TYPEHASH() external pure returns (bytes32)',
        'function nonces(address owner) external view returns (uint)',

        'function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external',
        'event Mint(address indexed sender, uint amount0, uint amount1)',
        'event Burn(address indexed sender, uint amount0, uint amount1, address indexed to)',
        'event Swap( address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to )',
        'event Sync(uint112 reserve0, uint112 reserve1)',

        'function MINIMUM_LIQUIDITY() external pure returns (uint)',
        'function factory() external view returns (address)',
        'function token0() external view returns (address)',
        'function token1() external view returns (address)',
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        'function price0CumulativeLast() external view returns (uint)',
        'function price1CumulativeLast() external view returns (uint)',
        'function kLast() external view returns (uint)',

        'function mint(address to) external returns (uint liquidity)',
        'function burn(address to) external returns (uint amount0, uint amount1)',
        'function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external',
        'function skim(address to) external',
        'function sync() external',

        'function initialize(address, address) external'
      ],
      MainnetRouter: '0x42A77DEdD13520141aaF1720EF88086B5Cae95f5',
      MainnetRouterABI: [
        'function WETH() external pure returns (address)',
        'function factory() external pure returns (address)',
        'function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut)',
        'function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) public pure returns (uint amountIn)',
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)',
        'function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB)',
        'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
        'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)',
        'function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB)',
        'function addLiquidityETH( address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline ) external payable returns (uint amountToken, uint amountETH, uint liquidity)',

        'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)',
        'function removeLiquidityETH(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external returns (uint amountToken, uint amountETH)',
        'function removeLiquidityWithPermit(address tokenA,address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) external returns (uint amountA, uint amountB)',

        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
        'function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',

        'function MINIMUM_LIQUIDITY() external pure returns (uint)',
        'function factory() external view returns (address)',
        'function token0() external view returns (address)',
        'function token1() external view returns (address)',
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        'function price0CumulativeLast() external view returns (uint)',
        'function price1CumulativeLast() external view returns (uint)',
        'function kLast() external view returns (uint)'
      ],
      WBNB: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18 },
      WBNBABI: [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function balanceOf(address) view returns (uint)',
        'function approve(address guy, uint wad) public returns (bool)'
      ],
      TokenA: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#f0b90b' },
      TokenB: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      TokenAPairAmount: null,
      TokenBPairAmount: null,
      PairTokenList: tokenList,
      SlippageSelected: 3,
      SlippageOptions: [
        { value: null, text: 'Slippage' },
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
      PairCheckResp: null,
      signer: null,
      account: null,
      loggedIn: false,
      TokenAUserBalance: null,
      TokenBUserBalance: null,
      UserAccount: null,
      LiquidityBalance: null,
      LiquidityPoolBalance: null,
      LPAddress: '0x0000000000000000000000000000000000000000',
      liquidity: null,
      Aout: null,
      Bout: null,
      HRLPReserveA: null,
      HRLPReserveB: null,
      LPTokenCon: { ChainID: 56, TokenName: 'SlopSwap LPs', TokenSymbol: 'SLOP-LPs', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#f0b90b' },
      LiquidityPoolPairObj: Object
    }
  },
  watch: {
    TokenAPairAmount (value) {
      this.PairQuoteCheck()
    }
  },
  mounted () {
    // URL connection
    /* const kline = new WebSocket('wss://dex.binance.org/api/ws/WBNB_CAKE-1DE@kline_1h')
    alert(kline)
    this.wbnbcake = kline

    // Or Subscribe method
    const conn = new WebSocket('wss://dex.binance.org/api/ws')
    conn.onopen = function (evt) {
      conn.send(JSON.stringify({ method: 'subscribe', topic: 'kline_1h', symbols: ['BNB_BTCB-1DE'] }))
    } */
  },
  beforeMount () {
    this.CheckTradingPair()
    this.RetrieveUserBalances()
    this.CheckForLiquidityTokens()
    this.WalletStatusCheck()
  },
  methods: {
    async WalletStatusCheck () {
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      Console.log('Signer: ' + signer)

      // alert('Before Account Request')
      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]
      this.loggedIn = true
    },
    async CheckForLiquidityTokens () {
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      // alert('Signer: ' + signer)

      // alert('Before Account Request')
      const accounts = await provider.send('eth_requestAccounts', [])
      const account = accounts[0]
      // alert('After Account Request: ' + account)

      const address1 = this.TokenA.TokenContract
      const address2 = this.TokenB.TokenContract

      const factory = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, signer)
      // const router = new ethers.Contract(String(this.MainnetRouter), this.MainnetRouterABI, this.signer)
      const pairAddress = await factory.getPair(String(address1), String(address2))
      // alert('Pair Address Right After Blockchain Query: ' + pairAddress)
      if (String(pairAddress) === '0x0000000000000000000000000000000000000000') {
        // alert('Inside first check!')
        this.LPAddress = '0x0000000000000000000000000000000000000000'
      } else {
        this.LPAddress = pairAddress
      }
      // alert(this.LPAddress)

      const BEP20LiquidityToken = new ethers.Contract(
        String(pairAddress), [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        provider
      )
      // alert('Line 451')

      if (this.LPAddress === '0x0000000000000000000000000000000000000000') {
        // alert('Pair does not exist on SlopSwap Yet!')
        this.LiquidityPoolPairObj = {
          LPTokenA: this.TokenA,
          LPTokenAReserves: 0,
          LPTokenB: this.TokenB,
          LPTokenBReserves: 0,
          LiquidityPairAddress: this.LPAddress,
          LPTokenBalance: 0
        }
        this.$emit('emitLP', this.LiquidityPoolPairObj)
        return
      }
      const LPTokenbalance = await BEP20LiquidityToken.balanceOf(String(account))
      // alert(LPTokenbalance)
      const ReturnTokenLPbalance = ethers.utils.formatUnits(String(LPTokenbalance), this.LPTokenCon.TokenDecimal)
      this.LiquidityPoolBalance = ReturnTokenLPbalance.substring(0, 8)
      // alert('Line 456')
      Console.log('Pair Address: ' + pairAddress)
      const pair = new ethers.Contract(String(this.LPAddress), PAIR.abi, signer)
      // alert('After Creating Pair Contract Instance')

      const TokZero = await pair.token0()
      Console.log(TokZero)
      const TokOne = await pair.token1()
      Console.log(TokOne)

      const token0 = await pair.token0()
      const token1 = await pair.token1()

      Console.log('Token 0: ' + token0)
      Console.log('Token 1: ' + token1)

      /* const klastReserves = await pair.kLast()
      alert('kLast Reserves: ' + klastReserves) */

      // alert('Before reserves Raw request')
      const reservesRaw = await pair.getReserves() // Returns the reserves already formated as ethers
      const reserveA = reservesRaw[0]
      const reserveB = reservesRaw[1]
      Console.log('Reserves Raw Token A: ' + this.TokenA.TokenSymbol + ' ' + reservesRaw[0] + ' ' + 'Reserves Raw Token B: ' + this.TokenB.TokenSymbol + ' ' + reservesRaw[1])

      const feeToAddress = await factory.feeToSetter()
      Console.log('Fee to this Dev Address: ' + feeToAddress)

      const feeOn =
        (await factory.feeTo()) !== 0x0000000000000000000000000000000000000000

      const _kLast = await pair.kLast()
      // alert('kLast: ' + _kLast)
      const kLast = Number(ethers.utils.formatEther(_kLast))

      const _totalSupply = await pair.totalSupply()
      Console.log('Total Supply: ' + _totalSupply)
      let totalSupply = Number(ethers.utils.formatEther(_totalSupply))

      if (feeOn && kLast > 0) {
        const feeLiquidity =
          (totalSupply * (Math.sqrt(reserveA * reserveB) - Math.sqrt(kLast))) /
          (5 * Math.sqrt(reserveA * reserveB) + Math.sqrt(kLast))
        totalSupply = totalSupply + feeLiquidity
      }

      const liquidity = this.LiquidityPoolBalance
      Console.log('Liquidity: ' + liquidity)
      // alert('Before IF Check LP Address: ' + this.LPAddress)
      if (this.LPAddress === '0x0000000000000000000000000000000000000000') {
        // alert('Pair does not exist on SlopSwap Yet!')
        this.LiquidityPoolPairObj = {
          LPTokenA: this.TokenA,
          LPTokenAReserves: 0,
          LPTokenB: this.TokenB,
          LPTokenBReserves: 0,
          LiquidityPairAddress: this.LPAddress,
          LPTokenBalance: 0
        }
        this.$emit('emitLP', this.LiquidityPoolPairObj)
      } else {
        const Aout = (reserveA * liquidity) / totalSupply
        const Bout = (reserveB * liquidity) / totalSupply

        Console.log('Aout: ' + Aout + ' ' + 'Bout: ' + Bout + ' ' + 'Liquidity: ' + liquidity)
        // return [liquidity, Aout, Bout]
        this.liquidity = liquidity
        this.Aout = Aout
        this.Bout = Bout
        // Now we need to build the LiquidityPoolPairObj so that we can transfer the object to the sidebar to display the data.
        // Displaying the data in the slide-out sidebar will make the the liquidity interface look much cleaner.
        this.LiquidityPoolPairObj = {
          LPTokenA: this.TokenA,
          LPTokenAReserves: reservesRaw[0],
          LPTokenB: this.TokenB,
          LPTokenBReserves: reservesRaw[1],
          LiquidityPairAddress: pairAddress,
          LPTokenBalance: LPTokenbalance
        }
        this.$emit('emitLP', this.LiquidityPoolPairObj)
      }
    },
    async quoteRemoveLiquidity (
    ) {
      // Function used to get a quote of the liquidity removal
      //    `address1` - An Ethereum address of the coin to recieve (either a token or AUT)
      //    `address2` - An Ethereum address of the coin to recieve (either a token or AUT)
      //    `liquidity` - The amount of liquidity tokens the user will burn to get their tokens back
      //    `factory` - The current factory
      //    `signer` - The current signer

      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which ism
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      // alert('Signer: ' + signer)

      const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.UserAccount = account.address

      const liquidity = this.LiquidityBalance

      const factory = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, signer)
      // const router = new ethers.Contract(String(this.MainnetRouter), this.MainnetRouterABI, this.signer)

      const address1 = this.TokenA.TokenContract
      const address2 = this.TokenB.TokenContract

      const pairAddress = await factory.getPair(String(address1), String(address2))
      Console.log('Pair Address: ' + pairAddress)
      const pair = new ethers.Contract(this.MainnetPair, PAIR.abi, signer)
      // alert('After Creating Pair Contract Instance')

      // alert('Before reserves Raw request')
      const reservesRaw = await pair.getReserves() // Returns the reserves already formated as ethers
      const reserveA = reservesRaw[0]
      const reserveB = reservesRaw[1]
      Console.log('Reserves Raw Token A: ' + reservesRaw[0] + ' ' + 'Reserves Raw Token B: ' + reservesRaw[1])

      const feeToAddress = await factory.feeToSetter()
      Console.log('Fee to this Dev Address: ' + feeToAddress)

      const feeOn =
        (await factory.feeTo()) !== 0x0000000000000000000000000000000000000000

      const _kLast = await pair.kLast()
      // alert('kLast: ' + _kLast)
      const kLast = Number(ethers.utils.formatEther(_kLast))

      const _totalSupply = await pair.totalSupply()
      Console.log('Total Supply: ' + _totalSupply)
      let totalSupply = Number(ethers.utils.formatEther(_totalSupply))

      if (feeOn && kLast > 0) {
        const feeLiquidity =
          (totalSupply * (Math.sqrt(reserveA * reserveB) - Math.sqrt(kLast))) /
          (5 * Math.sqrt(reserveA * reserveB) + Math.sqrt(kLast))
        totalSupply = totalSupply + feeLiquidity
      }

      const Aout = (reserveA * liquidity) / totalSupply
      const Bout = (reserveB * liquidity) / totalSupply

      alert('Aout: ' + Aout + ' ' + 'Bout: ' + Bout + ' ' + 'Liquidity: ' + liquidity)
      // return [liquidity, Aout, Bout]
      this.liquidity = liquidity
      this.Aout = Aout
      this.Bout = Bout
    },
    async RemoveLiquidity (
      LiquidityTokens
    ) {
      // Establish the connection to the User wallet & query Token A (Primary Liquidity Token) balance within the wallet
      // A Web3Provider wraps a standard Web3 provider, which ism
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      // alert('Signer: ' + signer)

      const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.UserAccount = account.address

      const address1 = this.TokenA.TokenContract
      const address2 = this.TokenB.TokenContract

      const pair = new ethers.Contract(String(this.MainnetPair), PAIR, signer)
      const factory = new ethers.Contract(String(this.MainnetFactory), this.MainnetFactoryABI, signer)
      const router = new ethers.Contract(String(this.MainnetRouter), this.MainnetRouterABI, signer)

      const pairAddress = await factory.getPair(String(address1), String(address2))
      alert('Pair Address: ' + pairAddress)
      // const pairsLength = await factory.allPairsLength() // Returns the reserves already formated as ethers
      // alert('Pairs Length: ' + pairsLength)

      const token1 = new ethers.Contract(String(address1), BEP20, signer)
      alert('Token1: ' + token1.address)
      const token2 = new ethers.Contract(String(address2), BEP20, signer)
      alert('Token2: ' + token2.address)

      const token1Decimals = this.TokenA.TokenDecimal
      const token2Decimals = this.TokenB.TokenDecimal
      alert('After Token Decimals')

      const Getliquidity = (LiquidityTokens) => {
        if (LiquidityTokens < 0.001) {
          return ethers.BigNumber.from(LiquidityTokens * 10 ** 18)
        }
        return ethers.utils.parseUnits(String(LiquidityTokens), 18)
      }

      const liquidity = Getliquidity(LiquidityTokens)
      alert('liquidity: ' + liquidity)

      const amount1 = this.Aout
      const amount2 = this.Bout

      const SubtractorA = amount1 * this.SlippageSelected
      const SubtractorANum = amount1 - SubtractorA
      const MinA = ethers.utils.parseUnits(String(SubtractorANum), this.TokenA.TokenDecimal)
      // alert(MinA)

      const SubtractorB = amount2 * this.SlippageSelected
      const SubtractorBNum = amount2 - SubtractorB
      const MinB = ethers.utils.parseUnits(String(SubtractorBNum), this.TokenA.TokenDecimal)
      // alert(MinB)

      const amount1Min = ethers.utils.parseUnits(String(MinA), token1Decimals)
      const amount2Min = ethers.utils.parseUnits(String(MinB), token2Decimals)
      // alert('After AmountMin')
      const time = Math.floor(Date.now() / 1000) + 200000
      const deadline = ethers.BigNumber.from(time)

      const wethAddress = await router.WETH()
      // const pairAddress = await factory.getPair(address1, address2);
      // const pair = new Contract(pairAddress, PAIR.abi, signer);
      alert('Before pair.approve')
      await pair.approve(router.address, liquidity)
      alert('After pair.approve')

      alert([
        String(address1),
        String(address2),
        Number(liquidity),
        Number(amount1Min),
        Number(amount2Min),
        String(account),
        deadline
      ])

      if (address1 === wethAddress) {
        // Eth + Token
        await router.removeLiquidityETH(
          String(address2),
          String(liquidity),
          String(amount2Min),
          String(amount1Min),
          String(account),
          deadline
        )
      } else if (address2 === wethAddress) {
        // Token + Eth
        await router.removeLiquidityETH(
          String(address1),
          String(liquidity),
          String(amount1Min),
          String(amount2Min),
          String(account),
          deadline
        )
      } else {
        // Token + Token
        await router.removeLiquidity(
          String(address1),
          String(address2),
          String(liquidity),
          String(amount1Min),
          String(amount2Min),
          String(account),
          deadline
        )
      }
    },
    async ChangePairTokenABalance (MakerTokenCon) {
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

      if (MakerTokenCon.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const TokenABalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnTokenABalance = ethers.utils.formatEther(String(TokenABalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.TokenAUserBalance = ReturnTokenABalance.substring(0, 6) + ' ' + MakerTokenCon.TokenSymbol
      } else {
        const BEP20TokenA = new ethers.Contract(
          MakerTokenCon.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )
        const TokenAbalance = await BEP20TokenA.balanceOf(String(account))
        // alert(TokenAbalance)
        const ReturnTokenAbalance = ethers.utils.formatUnits(String(TokenAbalance), MakerTokenCon.TokenDecimal)
        this.TokenAUserBalance = ReturnTokenAbalance.substring(0, 8) + ' ' + MakerTokenCon.TokenSymbol
      }
      const BEP20TokenB = new ethers.Contract(
        this.TokenB.TokenContract, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        provider
      )

      const TokenBbalance = await BEP20TokenB.balanceOf(String(account))
      // alert(TokenBbalance)
      const ReturnTokenBbalance = ethers.utils.formatUnits(String(TokenBbalance), this.TokenB.TokenDecimal)
      this.TokenBUserBalance = ReturnTokenBbalance.substring(0, 8) + ' ' + this.TokenB.TokenSymbol
    },
    async ChangePairTokenBBalance (TakerTokenCon) {
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

      if (TakerTokenCon.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const TokenBBalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnTokenBBalance = ethers.utils.formatEther(String(TokenBBalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.TokenBUserBalance = ReturnTokenBBalance.substring(0, 6) + ' ' + TakerTokenCon.TokenSymbol
      } else {
        const BEP20TokenB = new ethers.Contract(
          TakerTokenCon.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )

        const TokenBbalance = await BEP20TokenB.balanceOf(String(account))
        // alert(TokenBbalance)
        const ReturnTokenBbalance = ethers.utils.formatUnits(String(TokenBbalance), TakerTokenCon.TokenDecimal)
        this.TokenBUserBalance = ReturnTokenBbalance.substring(0, 8) + ' ' + TakerTokenCon.TokenSymbol
      }
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

      if (this.TokenA.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const TokenABalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnTokenABalance = ethers.utils.formatEther(String(TokenABalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.TokenAUserBalance = ReturnTokenABalance.substring(0, 6) + ' ' + this.TokenA.TokenSymbol
      } else {
        const BEP20TokenA = new ethers.Contract(
          this.TokenA.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )
        const TokenAbalance = await BEP20TokenA.balanceOf(String(account))
        // alert(TokenAbalance)
        const ReturnTokenAbalance = ethers.utils.formatUnits(String(TokenAbalance), this.TokenA.TokenDecimal)
        this.TokenAUserBalance = ReturnTokenAbalance.substring(0, 8) + ' ' + this.TokenA.TokenSymbol
      }

      if (this.TokenB.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const TokenBBalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnTokenBBalance = ethers.utils.formatEther(String(TokenBBalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.TokenAUserBalance = ReturnTokenBBalance.substring(0, 6) + ' ' + this.TokenB.TokenSymbol
      } else {
        const BEP20TokenB = new ethers.Contract(
          this.TokenB.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )
        const TokenBbalance = await BEP20TokenB.balanceOf(String(account))
        // alert(TokenAbalance)
        const ReturnTokenBbalance = ethers.utils.formatUnits(String(TokenBbalance), this.TokenB.TokenDecimal)
        this.TokenBUserBalance = ReturnTokenBbalance.substring(0, 8) + ' ' + this.TokenB.TokenSymbol
      }
    },
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
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      this.signer = signer

      const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.account = account
      alert(this.account)
      // const factory = new ethers.Contract(String(this.MainnetFactory), this.MainnetFactoryABI, signer)

      const address1 = this.TokenA.TokenContract
      const address2 = this.TokenB.TokenContract
      alert('After Token Address Assign Line 618')
      const RouterContract = new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, this.signer)
      alert('Line 620')
      const TokenAContract = new ethers.Contract(String(address1), BEP20.abi, this.signer)
      const TokenBContract = new ethers.Contract(String(address2), BEP20.abi, this.signer)
      alert('After Token Contact Instance Creation Line 261')

      const TokenADecimals = this.TokenA.TokenDecimal
      const TokenBDecimals = this.TokenB.TokenDecimal
      alert('TokenADecimals & TokenBDecimals ' + TokenADecimals + ' ' + TokenBDecimals + ' Line 627')

      const amount1 = this.TokenAPairAmount
      const amount2 = this.TokenBPairAmount

      alert('Amount1 ' + amount1)
      alert('Amount2 ' + amount2)

      const amountIn1 = ethers.utils.parseUnits(amount1, TokenADecimals)
      const amountIn2 = ethers.utils.parseUnits(amount2, TokenBDecimals)

      /* const amount1Min = ethers.utils.parseUnits(String(amount1), TokenADecimals)
      const amount2Min = ethers.utils.parseUnits(String(amount2), TokenBDecimals) */

      const time = Math.floor(Date.now() / 1000) + 200000
      const deadline = ethers.BigNumber.from(time)

      await TokenAContract.approve(String(this.MainnetRouter), String(amountIn1))
      await TokenBContract.approve(String(this.MainnetRouter), String(amountIn2))

      const wethAddress = await RouterContract.WETH()
      alert('WETH Address from Router Contract: ' + wethAddress)

      const SubtractorA = amount1 * this.SlippageSelected
      const SubtractorANum = amount1 - SubtractorA
      const FinalMinA = ethers.utils.parseUnits(String(SubtractorANum), this.TokenA.TokenADecimals)
      alert(FinalMinA)

      const SubtractorB = amount2 * this.SlippageSelected
      const SubtractorBNum = amount2 - SubtractorB
      const FinalMinB = ethers.utils.parseUnits(String(SubtractorBNum), this.TokenA.TokenADecimals)
      alert(FinalMinB)

      // const factory = new ethers.Contract(String(this.MainnetFactory), this.MainnetFactoryABI, signer)
      // const pairAddress = await factory.getPair(address1, address2)

      alert([
        'Address 1: ' + address1,
        'Address 2: ' + address2,
        'Amount In 1: ' + amountIn1,
        'Amount In 2: ' + amountIn2,
        'Amount 1 Min: ' + FinalMinA,
        'Amount 2 Min: ' + FinalMinB,
        'This Account: ' + this.account,
        'Deadline' + deadline
      ])

      if (address1 === wethAddress) {
        // Eth + Token
        await RouterContract.addLiquidityETH(
          String(address2),
          String(amountIn2),
          String(FinalMinB),
          String(FinalMinA),
          String(this.account),
          String(deadline),
          { value: String(amountIn1) }
        )
      } else if (address2 === wethAddress) {
        // Token + Eth
        await RouterContract.addLiquidityETH(
          String(address1),
          String(amountIn1),
          String(FinalMinA),
          String(FinalMinB),
          String(this.account),
          String(deadline),
          { value: String(amountIn2) }
        )
      } else {
        // Token + Token
        await RouterContract.addLiquidity(
          String(address1),
          String(address2),
          String(amountIn1),
          String(amountIn2),
          String(FinalMinA),
          String(FinalMinB),
          String(this.account),
          String(deadline)
        )
      }
    },
    ChangePairTokenA (LiquidityMakerToken) {
      this.TokenA = LiquidityMakerToken
      // alert('Liquidity Token A has been changed to \nChainID: ' + this.TokenA.ChainID + '\nLiquidity Token Name:  ' + this.TokenA.TokenName + ' \nLiquidity Token Symbol: ' + this.TokenA.TokenSymbol + '\nLiquidity Token Contract: ' + this.TokenA.TokenContract + '\nLiquidity Token Decimal: ' + this.TokenA.TokenDecimal + '\nLiquidity Token Type: ' + this.TokenA.TokenType)
      this.TokenAPairAmount = null
      this.TokenBPairAmount = null
      this.CheckTradingPair()
      this.WalletStatusCheck()
      this.CheckForLiquidityTokens()
      this.$bvModal.hide('TokenA')
    },
    ChangePairTokenB (LiquidityTakerToken) {
      this.TokenB = LiquidityTakerToken
      // alert('Liquidity Token B has been changed to \nChainID: ' + this.TokenB.ChainID + '\nLiquidity Token Name:  ' + this.TokenB.TokenName + ' \nLiquidity Token Symbol: ' + this.TokenB.TokenSymbol + '\nLiquidity Token Contract: ' + this.TokenB.TokenContract + '\nLiquidity Token Decimal: ' + this.TokenB.TokenDecimal + '\nLiquidity Token Type: ' + this.TokenB.TokenType)
      this.TokenAPairAmount = null
      this.TokenBPairAmount = null
      this.CheckTradingPair()
      this.WalletStatusCheck()
      this.CheckForLiquidityTokens()
      this.$bvModal.hide('TokenB')
    },
    async CheckTradingPair () {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()

      const TokenA = this.TokenA.TokenContract
      // alert('TokanA Ref. ' + TokenA)
      const TokenB = this.TokenB.TokenContract
      // alert('TokenB Ref. ' + TokenB)

      const factoryInstance = new ethers.Contract(this.MainnetFactory, this.MainnetFactoryABI, signer)
      // alert('factory Ref.' + factoryInstance)
      this.factory = factoryInstance

      const routerInstance = new ethers.Contract(this.MainnetRouter, this.MainnetRouterABI, signer)
      // alert('router Ref.' + routerInstance)
      this.router = routerInstance

      const WBNBInstance = new ethers.Contract(this.TokenA.TokenContract, this.WBNBABI, signer)
      // alert('WBNBInstance ' + WBNBInstance)
      this.WBNBConInst = WBNBInstance

      const BEP20ContractInstance = new ethers.Contract(
        this.TokenB, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        signer
      )
      this.BEP20ConInst = BEP20ContractInstance

      // alert('BEP20ContractInstance Contract Instance ' + BEP20ContractInstance)

      const checkPairs = await this.factory.getPair(TokenA, TokenB)
      // alert('Check If the Trading Pair Exists ' + checkPairs)
      this.PairCheckResp = checkPairs
      if (this.PairCheckResp === '0x0000000000000000000000000000000000000000') {
        // alert('That Trading Pair does not exist. You can be the first to start a trading pool with the pair')
      } else {
        // alert('This Trading Pair already exists, and the address is ' + this.PairCheckResp)
      }
      // alert(this.PairCheckResp)
    },
    async PairQuoteCheck () {
      const TokenAFormatted = ethers.utils.parseUnits(this.TokenAPairAmount, this.TokenA.TokenDecimal)
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
      this.TokenBPairAmount = ethers.utils.formatUnits(String(this.PairQuote.data.buyAmount), this.TokenB.TokenDecimal)

      // Units.convert(String(this.quote.data.buyAmount), 'wei', 'ether')
    },
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
    async CheckPair () {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()

      const TokenA = this.TokenA.TokenContract
      // alert('TokanA Ref. ' + TokenA)
      const TokenB = this.TokenB.TokenContract
      // alert('TokenB Ref. ' + TokenB)

      const factoryInstance = new ethers.Contract(this.MainnetFactory, this.MainnetFactoryABI, signer)
      // alert('factory Ref.' + factoryInstance)
      this.factory = factoryInstance

      const routerInstance = new ethers.Contract(this.MainnetRouter, this.MainnetRouterABI, signer)
      // alert('router Ref.' + routerInstance)
      this.router = routerInstance

      const WBNBInstance = new ethers.Contract(this.TokenA.TokenContract, this.WBNBABI, signer)
      // alert('WBNBInstance ' + WBNBInstance)
      this.WBNBConInst = WBNBInstance

      const BEP20ContractInstance = new ethers.Contract(
        this.TokenB, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        signer
      )
      this.BEP20ConInst = BEP20ContractInstance

      // alert('BEP20ContractInstance Contract Instance ' + BEP20ContractInstance)

      const checkPairs = await this.factory.getPair(TokenA, TokenB)
      // alert('Check If the Trading Pair Exists ' + checkPairs)
      this.PairCheckResp = checkPairs
      if (this.PairCheckResp === '0x0000000000000000000000000000000000000000') {
        // alert('That Trading Pair does not exist. You can be the first to start a trading pool with the pair')
        return false
      } else {
        // alert('This Trading Pair already exists, and the address is ' + this.PairCheckResp)
        return this.PairCheckResp
      }
      // alert(this.PairCheckResp)
    } // END OF CHECKPAIR
  } // END OF METHODS
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.small-pair-balance {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', cursive;
  color: #17a2b8;
}
.notification-text {
  font-variant-caps: all-small-caps;
  font-style: oblique;
}
.funfact-text {
  font-variant-caps: all-small-caps;
}
.btn-group .btn-left {
    border-top-left-radius: 4rem;
    border-bottom-left-radius: 4rem;
    background-color: #212529;
    border-color: #FFFFFF;
    font-size: 1.2rem;
    background-image: url(~/assets/img/page-graphics/light-beige-large-splatter.png);
    background-position: bottom 20px right 30px;
    background-size: 160%;
    background-repeat: no-repeat;
    font-variant-caps: all-small-caps;
    font-family: 'Fredoka One', cursive;
}
.btn-group .btn-right {
    border-top-right-radius: 4rem;
    border-bottom-right-radius: 4rem;
    background-color: #212529;
    border-color: #FFFFFF;
    font-size: 1.2rem;
    background-image: url(~/assets/img/page-graphics/light-blue-splatter.png);
    background-position: bottom left 20px;
    background-size: 160%;
    background-repeat: no-repeat;
    font-variant-caps: all-small-caps;
    font-family: 'Fredoka One', cursive;
}
.block-inline-notification {
  background-color: #FFFFFF;
  border-radius: 8rem;
  padding: 2rem;
  text-decoration: none;
}
.lp-balance {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', cursive;
  color: #505960;
}
.lp-address {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', cursive;
  color: #505960;
  font-size: 1.3rem;
}
.label-title {
  font-variant-caps: all-small-caps;
  font-size: 1.1rem;
  font-family: 'Fredoka One', cursive;
  color: #505960;
}
.grey-text {
  color: #505960;
}
.secondary-title {
  font-variant-caps: all-small-caps;
  font-size: 1.8rem;
  font-family: 'Fredoka One', cursive;
  color: #17a2b8;
}
.small-pair-token-img {
  max-height: 22px;
}
.small-pair-symbols {
  font-variant-caps: all-small-caps;
  font-size: 1.4rem;
  font-family: 'Fredoka One', cursive;
  color: #505960;
}
.pair-icon-size {
  font-size: 1.3rem;
}
.help-section {
  cursor: help;
}
.btn {
  background-color: #17a2b8;
  border: 1px solid #FFFFFF;
}
.lp-pair-container {
  /*background-color: #ffffffaa;*/
  border-radius: 8rem;
  padding: 2rem;
  text-decoration: none;
}
.lp-pair-container a:hover {
  text-decoration: none;
  padding: 2rem;
  border-radius: 8rem;
}
.link-color {
  font-variant-caps: all-small-caps;
  font-size: 1.3rem;
  font-family: 'Fredoka One', cursive;
  color: #17a2b8;
  text-decoration: none;
}
.button-text {
  font-variant-caps: all-small-caps;
  font-size: 0.85rem;
  color: #FFFFFF;
}
.dropdown-toggle {
  background-color: transparent;
  border-radius: 4rem;
}
.main-title {
  font-variant-caps: all-small-caps;
  font-weight: 600;
  font-size: 2.9rem;
  font-family: 'Fredoka One', cursive;
}
.blue-gray {
  color: #17a2b8;
}
.no-exist {
  font-variant-caps: all-small-caps;
  font-weight: 600;
  font-size: 1.3rem;
  font-family: 'Fredoka One', cursive;
  color: #ac0000;
}
.view-pair {
  font-variant-caps: all-small-caps;
  font-family: 'Arimo', sans-serif;
  font-weight: 600;
  font-size: 1rem;
}
.left-group-btn {
  border-top-left-radius: 4rem;
  border-bottom-left-radius: 4rem;
}
.right-group-btn {
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
}
.slippage-selector {
  background-color: transparent;
  border-radius: 4rem;
}
.trade-container {
  margin-top: 2rem;
  margin-bottom: auto;
  vertical-align: middle;
}
.trade-btn {
  padding: .25rem;
  margin-top: 2rem;
  font-size: 1.6rem;
  font-family: 'Arimo', sans-serif;
  font-variant: all-small-caps;
}
.maker-liquidity-amount {
  border-radius: 4rem;
  margin-top: 0rem;
  border-color: none;
}
.taker-liquidity-amount {
  border-radius: 4rem;
  margin-right: 0rem;
  border-color: none !important;
}
.dollar-value {
  font-size: 1.8rem;
}
.trade-symbol-container {
  margin-top: 3rem;
  margin-bottom:2rem;
}
</style>
