<template>
  <div class="factory-monitor-container">
    <b-row>
      <b-col sm="12" md="12" lg="4">
        <SlopSwapLiquidityMakerTokenSelect @changeLiquidityMakerToken="ChangePairTokenA($event)" @changeLiquidityMakerBalance="ChangePairTokenABalance($event)" />
        <div>
          <b-form-input v-model="TokenAPairAmount" class="maker-liquidity-amount" placeholder="0.0" @change="PairQuoteCheck()" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ MakerDollarAmount }}
          </div>-->
          <!--<div :v-if="LiquidityQuoteReturnData[0]">
            Amount A Optimal Quote: {{ LiquidityQuoteReturnData[0] }}
          </div>-->
        </div>
      </b-col>
      <b-col sm="12" md="12" lg="4">
        <div />
      </b-col>
      <b-col sm="12" md="12" lg="4">
        <SlopSwapLiquidityTakerTokenSelect @changeLiquidityTakerToken="ChangePairTokenB($event)" @changeLiquidityTakerBalance="ChangePairTokenBBalance($event)" />
        <div>
          <b-form-input v-model="TokenBPairAmount" class="taker-liquidity-amount" placeholder="0.0" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ TakerDollarAmount }}
          </div>-->
          <!--<div v-if="LiquidityQuoteReturnData[1]">
            Amount B Desired Quote: {{ LiquidityQuoteReturnData[1] }}
          </div>-->
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12">
        <!--<div v-if="LiquidityQuoteReturnData[2]">
          Quoteed SlopSwap LP Tokens You'll Receive: {{ LiquidityQuoteReturnData[2] }}
        </div>-->
        <b-button
          pill
          @click="quoteAddLiquidity(
            Address1.TokenContract,
            address2.TokenContract,
            amountADesired,
            amountBDesired,
            factory,
            signer
          )"
        >
          Add Liquidity Quote
        </b-button>
        <b-button pill disabled>
          Add Liquidity
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios'
import SlopSwapLiquidityMakerTokenSelect from '~/components/SlopSwapLiquidityMakerTokenSelect.vue'
import SlopSwapLiquidityTakerTokenSelect from '~/components/SlopSwapLiquidityTakerTokenSelect.vue'
const ethers = require('ethers')
const qs = require('qs')
const Console = require('Console')
// const slop = require('slopswapxlibs')
const BEP20 = require('~/static/artifacts/IERC20.json')
const PAIR = require('~/static/artifacts/SlopSwapPair.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
Console.log('Console.log is now available!')
// const Console = require('Console')
export default {
  name: 'SlopSwapFactoryMonitor',
  components: {
    SlopSwapLiquidityMakerTokenSelect, SlopSwapLiquidityTakerTokenSelect
  },
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
      // PairTokenList: tokenList,
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
      LiquidityPoolPairObj: Object,
      LiquidityQuoteReturnData: null
    } // END OF RETURN {}
  }, // END OF DATA ()
  watch: {
  }, // END OF WATCH
  beforeMount () {
  }, // END OF BEFOREMOUNT
  methods: {
    async quoteAddLiquidity (
      address1,
      address2,
      amountADesired,
      amountBDesired,
      factory,
      signer
    ) {
      const pairAddress = await factory.getPair(address1, address2)
      const pair = new ethers.Contract(pairAddress, PAIR.abi, signer)

      const reservesRaw = await this.fetchReserves(address1, address2, pair) // Returns the reserves already formated as ethers
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
        const [amountBOptimal, amountOut] = this.factory.quote(amountADesired, reserveA, reserveB)
        if (amountBOptimal <= amountBDesired) {
          return [
            amountADesired.toString(),
            amountBOptimal.toString(),
            amountOut.toString()
          ]
        } else {
          const [amountAOptimal, amountOut] = this.factory.quote(
            amountBDesired,
            reserveB,
            reserveA
          )
          alert(amountAOptimal, amountOut)
          this.LiquidityQuoteReturnData = [
            amountAOptimal.toString(),
            amountBDesired.toString(),
            amountOut.toString()
          ]
        }
      }
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
    async InitiateAssetConnection () {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      this.signer = provider.getSigner()

      const factoryContractConnect = new ethers.Contract(String(this.MainnetFactory), FACTORY.abi, this.signer)
      this.factory = factoryContractConnect
      const routerContractConnection = new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, this.signer)
      this.router = routerContractConnection

      const address1 = this.Address1.TokenContract
      const address2 = this.Address2.TokenContract
      const pairAddress = await this.factory.getPair(String(address1), String(address2))
      this.pair = pairAddress

      const PairContractConnect = new ethers.Contract(String(this.pair), BEP20.abi, this.signer)
      this.PairConnect = PairContractConnect

      const getAmount = await this.router.getAmountsOut('20000000000000000', ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0x2859e4544C4bB03966803b044A93563Bd2D0DD4D'])
      alert(getAmount)
    },
    async fetchReserves () {
      try {
        const reservesRaw = await this.PairConnect.getReserves()
        const results = [
          Number(ethers.utils.formatEther(reservesRaw[0])),
          Number(ethers.utils.formatEther(reservesRaw[1]))
        ]

        return [
          (await this.PairConnect.token0()) === this.Address1.TokenContract ? results[0] : results[1],
          (await this.PairConnect.token1()) === this.Address2.TokenContract ? results[1] : results[0]
        ]
      } catch (err) {
        Console.log('no reserves yet')
        return [0, 0]
      }
    },
    async getReserves () {
      const factory = this.factory
      const pairAddress = await factory.getPair(String(this.Address1.TokenContract), String(this.Address2.TokenContract))
      const pair = new ethers.Contract(pairAddress, PAIR.abi, this.signer)
      this.pair = pair
      alert('Pair Contract Instance: ' + this.pair)
      const reservesRaw = await this.fetchReserves(String(this.Address1.TokenContract), String(this.Address2.TokenContract), String(this.pair))
      alert('Reserves Raw 0: ' + reservesRaw[0])
      alert('Reserves Raw 1: ' + reservesRaw[1])
      const liquidityTokensBN = await this.pair.balanceOf(String(this.account))
      const liquidityTokens = Number(
        ethers.utils.formatEther(liquidityTokensBN)
      ).toFixed(2)
      alert('Line 190')
      alert('reservesRaw 0: ' + reservesRaw[0].toFixed(2))
      alert('reservesRaw: 1 ' + reservesRaw[1].toFixed(2))
      alert('SlopSwap Liquidity Tokens: ' + liquidityTokens)
      return [
        reservesRaw[0].toFixed(2),
        reservesRaw[1].toFixed(2),
        liquidityTokens
      ]
    }
  } // END OF METHODS
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
.factory-monitor-container {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', verdana;
  color: #3e3d40;
  font-size: 0.95rem;
  /* border-bottom: 1px solid #FFFFFF; */
  /* background-color: #FFFFFF; */
}
</style>
