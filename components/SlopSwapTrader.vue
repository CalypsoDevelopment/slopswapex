<template>
  <b-container fluid>
    <b-row class="trade-container">
      <b-col cols="12">
        <div>
          <b-nav>
            <b-nav-item active>
              <i class="fa-solid fa-gears" />
            </b-nav-item>
            <b-nav-item>
              <i class="fa-solid fa-clock-rotate-left" />
            </b-nav-item>
            <b-nav-item>
              <i class="fa-solid fa-chart-area" />
            </b-nav-item>
            <!--<b-nav-item>
            </b-nav-item>-->
          </b-nav>
        </div>
      </b-col>
      <b-col cols="12">
        <div>
          <h1 class="main-title">
            <span class="blue-gray">Slop</span>Swap
          </h1>
        </div>
      </b-col>
      <b-col cols="5" class="text-center">
        <SlopSwapMakerTokenSelect @changeMakerToken="ChangeSellToken($event)" @changeMakerTokenBalance="MakerReCheckBalance($event)" />
        <div>
          <b-form-input v-model="sellAmount" class="maker-token-amount" placeholder="0.0" @change="MakerPriceCheck()" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ MakerDollarAmount }}
          </div>-->
        </div>
        <div>
          <div class="mt-1 mb-1">
            <span class="label-title"><strong>Wallet Balance: {{ SellTokenUserBalance }} </strong></span>
          </div>
          <b-form-input v-model="SellTokenUserBalance" placeholder="Wallet Balance" disabled class="hidden-field" />
        </div>
      </b-col>
      <b-col cols="2" class="text-center">
        <div class="align-middle trade-symbol-container">
          <i class="fa-solid fa-repeat fa-4x animate__animated animate__rotatIn" style="color: #FFFFFF" />
          <b-form-select v-model="SlippageSelected" class="slippage-selector mt-2" :options="SlippageOptions" />
        </div>
      </b-col>
      <b-col cols="5" class="text-center">
        <SlopSwapTakerTokenSelect @changeTakerToken="ChangeBuyToken($event)" @changeTakerTokenBalance="TakerReCheckBalance($event)" />
        <div>
          <b-form-input v-model="BuyTokenAmount" class="taker-token-amount" placeholder="0.0" />
          <!--<div class="mt-2 dollar-value">
            <i class="fa-solid fa-square-dollar" style="color: #6c757d;" />
            {{ TakerDollarAmount }}
          </div>-->
        </div>
        <div>
          <div class="mt-1 mb-1">
            <span class="label-title"><strong>Wallet Balance: {{ BuyTokenUserBalance }} </strong></span>
          </div>
          <b-form-input v-model="BuyTokenUserBalance" placeholder="Wallet Balance" disabled class="hidden-field" />
        </div>
      </b-col>
      <b-col cols="12">
        <div class="trade-btn-container mt-4">
          <b-button-group size="lg">
            <b-button class="left-group-btn" @click="TokenTrade()">
              Trade Quote
            </b-button>
            <!--<b-button>Button 2</b-button>-->
            <b-button class="right-group-btn" variant="info" @click="buyAction(sellAmount)">
              Make Trade
            </b-button>
          </b-button-group>
        </div>
        <!--<b-button
          pill
          block
          class="trade-btn"
          variant="primary"
          @click="buyAction (sellAmount)"
        >
          Trade Tokens
        </b-button>-->
      </b-col>
    </b-row>
    <b-row>
      <b-col />
    </b-row>
  </b-container>
</template>
<script>
import SlopSwapMakerTokenSelect from '~/components/SlopSwapMakerTokenSelect.vue'
import SlopSwapTakerTokenSelect from '~/components/SlopSwapTakerTokenSelect.vue'
const axios = require('axios')
const ethers = require('ethers')
const qs = require('qs')
const Console = require('Console')
Console.log('Console.log is now available!')
const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
// const BEP20 = require('~/static/artifacts/IERC20.json')
// const slop = require('slopswapxlibs')

// SlopSwap Factory 0x0533B75362E3Be13E78f245e50674c9a6dd9c17A
// SlopSwap Router 0x42A77DEdD13520141aaF1720EF88086B5Cae95f5
// PancakeSwap Factory 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
// Pancake Router 0x10ED43C718714eb63d5aA57B78B54704E256024E

export default {
  name: 'SlopSwapTrader',
  components: { SlopSwapMakerTokenSelect, SlopSwapTakerTokenSelect },
  data () {
    return {
      MainnetFactory: '0x0533B75362E3Be13E78f245e50674c9a6dd9c17A',
      factory: null,
      WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      MainnetRouter: '0x42A77DEdD13520141aaF1720EF88086B5Cae95f5',
      router: null,
      sellToken: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#f0b90b' },
      sellAmount: null,
      buyToken: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      buyAmount: null,
      WBNBABI: [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function balanceOf(address) view returns (uint)',
        'function approve(address guy, uint wad) public returns (bool)'
      ],
      quote: null,
      SellTokenAmount: null,
      BuyTokenAmount: null,
      MakerDollarAmount: 0.00,
      TakerDollarAmount: 0.00,
      SlippageSelected: 0.01,
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
      TradingConfig: null,
      BEP20: null,
      WBNBContract: null,
      tokenIn: null,
      tokenOut: null,
      WBNBbalance: null,
      SellTokenUserBalance: null,
      BuyTokenUserBalance: null,
      config: {
        START_COIN: 'WBNB',
        START_AMOUNT: 0.001,
        WALLET_MIN: 0,
        TRADE_INTERVAL: 300,
        SLIPPAGE: 15,
        GWEI: 5,
        GAS_LIMIT: 450000,
        BSC_NODE: 'https://bsc-dataseed.binance.org/'
      }
    }
  },
  beforeMount () {
    this.checkBalance(this.sellToken.TokenContract, this.buyTokenContract)
  },
  methods: {
    async TokenTrade () {
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
      // const dai = this.DAI.TokenContract
      // alert('DAI Token Contract Address: ' + dai)

      // const provider = new ethers.providers.JsonRpcProvider()
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])
      alert('Line 211')
      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      // alert(signer)

      const factoryInstance = new ethers.Contract(this.MainnetFactory, FACTORY.abi, signer)
      // alert('Factory Contract Instance Object ' + factoryInstance)
      this.factory = factoryInstance
      alert('Line 221')
      const routerInstance = new ethers.Contract(this.MainnetRouter, ROUTER.abi,
        signer)
      alert('Router Contract Instance Object ' + routerInstance)
      this.router = routerInstance
      alert('Line 266')
      const BEP20ContractInstance = new ethers.Contract(
        this.buyToken.TokenContract, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        signer
      )
      alert('Buy Token General Contract Instance ' + BEP20ContractInstance)
      this.BEP20 = BEP20ContractInstance
      const WBNBInstance = new ethers.Contract(this.WETH, this.WBNBABI, signer)
      this.WBNBContract = WBNBInstance

      alert(`Trading Pair: ${this.sellToken.TokenSymbol}/${this.buyToken.TokenSymbol}`)

      async function checkBalance () {
        // Seller WBNB Balance Check
        if (this.sellToken.TokenContract === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
          const wbnbBalance = await signer.getBalance()
          const bnbFormatEther = ethers.utils.formatEther(wbnbBalance)
          const balance = await WBNBInstance.balanceOf(provider.address)
          // const humanBalance = ethers.utils.formatEther(balance)
          const BuyTokenBalance = await this.BEP20.balanceOf(signer.getAddress())
          const BuyTokenFormat = ethers.utils.formatEther(BuyTokenBalance)
          // alert(chalk.magenta(`[INFO] wallet balance: ${bnbHuman} BNB`))
          // alert(chalk.magenta(`[INFO] wallet balance: ${humanBalance} ${tokenSymbol}`))
          // alert(chalk.magenta(`[INFO] wallet balance: ${saHuman} ${saSymbol}`))
          alert('wbnbBalance ' + wbnbBalance)
          alert('WBNB Formatted Balance ' + bnbFormatEther)
          alert('DAI TokenBalance ' + BuyTokenFormat)
          return balance
        }
      }
      checkBalance()

      const tokenInRef = this.sellToken.TokenContract
      this.tokenIn = tokenInRef
      const tokenOutRef = this.buyToken.TokenContract
      this.tokenOut = tokenOutRef

      const checkSignerAddress = signer.getAddress()
      alert('Token In (Sell Token) ' + this.tokenIn + ' Token Out (Buy Token) ' + this.tokenOut + ' Traders Address: ' + checkSignerAddress)
    }, // END OF TOKENTRADE()
    async MakerReCheckBalance (sellTok) {
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

      if (sellTok.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const sellTokenBalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnSellTokenBalance = ethers.utils.formatEther(String(sellTokenBalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.SellTokenUserBalance = ReturnSellTokenBalance.substring(0, 6) + ' ' + sellTok.TokenSymbol
      } else {
        const BEP20sellToken = new ethers.Contract(
          sellTok.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )
        const sellTokenbalance = await BEP20sellToken.balanceOf(String(account))
        // alert(TokenAbalance)
        const ReturnSellTokenbalance = ethers.utils.formatUnits(String(sellTokenbalance), sellTok.TokenDecimal)
        this.SellTokenUserBalance = ReturnSellTokenbalance.substring(0, 8) + ' ' + sellTok.TokenSymbol
      }
      const BEP20BuyToken = new ethers.Contract(
        this.buyToken.TokenContract, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        provider
      )

      const buyTokenbalance = await BEP20BuyToken.balanceOf(String(account))
      // alert(buyTokenbalance)
      const ReturnBuyTokenbalance = ethers.utils.formatUnits(String(buyTokenbalance), this.buyToken.TokenDecimal)
      this.BuyTokenUserBalance = ReturnBuyTokenbalance.substring(0, 8) + ' ' + this.buyToken.TokenSymbol
    },
    async TakerReCheckBalance (buyTok) {
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
      if (buyTok.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const buyTokenBalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnBuyTokenBalance = ethers.utils.formatEther(String(buyTokenBalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.BuyTokenUserBalance = ReturnBuyTokenBalance.substring(0, 6) + ' ' + buyTok.TokenSymbol
      } else {
        const BEP20BuyToken = new ethers.Contract(
          buyTok.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )

        const buyTokenbalance = await BEP20BuyToken.balanceOf(String(account))
        // alert(buyTokenbalance)
        const ReturnBuyTokenbalance = ethers.utils.formatUnits(String(buyTokenbalance), buyTok.TokenDecimal)
        this.BuyTokenUserBalance = ReturnBuyTokenbalance.substring(0, 8) + ' ' + buyTok.TokenSymbol
      }
    },
    async checkBalance () {
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

      if (this.sellToken.TokenSymbol === 'WBNB') {
        // Get Token Balance through Metamask
        const sellTokenBalance = await provider.getBalance(String(account))
        // alert(TokenABalance)
        const ReturnSellTokenBalance = ethers.utils.formatEther(String(sellTokenBalance))
        // alert('User TokenA Balance: ' + ConvertWeiToEther + ' WBNB')

        this.SellTokenUserBalance = ReturnSellTokenBalance.substring(0, 6) + ' ' + this.sellToken.TokenSymbol
      } else {
        const BEP20sellToken = new ethers.Contract(
          this.sellToken.TokenContract, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function balanceOf(address) view returns (uint)'
          ],
          provider
        )
        const sellTokenbalance = await BEP20sellToken.balanceOf(String(account))
        // alert(TokenAbalance)
        const ReturnSellTokenbalance = ethers.utils.formatUnits(String(sellTokenbalance), this.TokenA.TokenDecimal)
        this.SellTokenUserBalance = ReturnSellTokenbalance.substring(0, 8) + ' ' + this.sellToken.TokenSymbol
      }
      const BEP20BuyToken = new ethers.Contract(
        this.buyToken.TokenContract, [
          'function name() view returns (string)',
          'function symbol() view returns (string)',
          'function balanceOf(address) view returns (uint)'
        ],
        provider
      )

      const buyTokenbalance = await BEP20BuyToken.balanceOf(String(account))
      // alert(buyTokenbalance)
      const ReturnBuyTokenbalance = ethers.utils.formatUnits(String(buyTokenbalance), this.buyToken.TokenDecimal)
      this.BuyTokenUserBalance = ReturnBuyTokenbalance.substring(0, 8) + ' ' + this.buyToken.TokenSymbol
    },
    async buyAction (sellQuantity) {
      // const provider = new ethers.providers.JsonRpcProvider()
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner()
      alert('[INFO] ready to buy')
      try {
        let amountOutMin = 0
        const amountIn = ethers.utils.parseEther(sellQuantity)
        if (parseInt(this.TradingConfig.slippage) !== 0) {
          const amounts = await this.router.getAmountsOut(amountIn, [this.tokenIn, this.tokenOut])
          amountOutMin = amounts[1].sub(amounts[1].div(`${this.SlippageSelected}`))
        }

        const buyTokenSymbol = await this.BEP20.symbol()
        const sellTokenSymbol = await this.WBNBContract.symbol()

        alert(`
          Buying ${buyTokenSymbol} using ${sellTokenSymbol}
          =================
          tokenIn: ${ethers.utils.formatEther(amountIn).toString()} ${this.tokenIn} (${sellTokenSymbol})
          tokenOut: ${ethers.utils.formatEther(amountOutMin).toString()} ${this.tokenOut} (${buyTokenSymbol})
          `)

        let tx
        if (this.TradingConfig.startCoin === 'BNB' || this.TradingConfig.startCoin === 'WBNB') {
          tx = await this.router.swapExactETHForTokens(
            amountOutMin,
            [this.tokenIn, this.tokenOut],
            signer.getAddress(),
            Date.now() + 1000 * 60 * 5, // 5 minutes
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice,
              nonce: null,
              value: amountIn
            })
        } else {
          tx = await this.router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            [this.tokenIn, this.tokenOut],
            signer.getAddress(),
            Date.now() + 1000 * 60 * 5, // 5 minutes
            {
              gasLimit: this.TradingConfig.gasLimit,
              gasPrice: this.TradingConfig.gasPrice
            })
        }
        const receipt = await tx.wait()
        alert(`Transaction receipt : https://www.bscscan.com/tx/${receipt.transactionHash}`)
        const lastSwapEvent = receipt.logs.slice(-1)[0]
        const swapInterface = new ethers.utils.Interface(['event Swap (address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)'])
        const parsed = swapInterface.parseLog(lastSwapEvent)
        const receivedTokens = parsed.args.amount0Out.isZero() ? parsed.args.amount1Out : parsed.args.amount0Out
        const tokens = ethers.utils.formatEther(receivedTokens)
        alert(`Swapped for tokens: ${tokens} ${buyTokenSymbol}`)
        return tokens
      } catch (err) {
        alert(err)
      }
    },
    SlippageCheck () {
      alert('The Slippage is currently: ' + this.SlippageSelected)
    },
    async MakerPriceCheck () {
      const priceFormatter = ethers.utils.parseUnits(String(this.sellAmount), this.sellToken.TokenDecimal)
      alert(priceFormatter)
      const QuoteReview = `
      Buying ${this.buyToken.TokenSymbol} Contract: ${this.buyToken.TokenContract}  using ${this.sellToken.TokenSymbol} in the amount of
      ${priceFormatter}
      =================`
      alert(QuoteReview)

      const params = {
        // Not all token symbols are supported. The address of the token can be used instead.
        sellToken: this.sellToken.TokenContract,
        buyToken: this.buyToken.TokenContract,
        // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
        sellAmount: String(priceFormatter)
      }

      const response = await axios.get(
    `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(params)}`
      )
      this.quote = response
      // alert(this.quote)
      // const BuyAmountWei = this.quote.data.buyAmount
      this.BuyTokenAmount = ethers.utils.formatUnits(String(this.quote.data.buyAmount), this.buyToken.TokenDecimal)

      // Units.convert(String(this.quote.data.buyAmount), 'wei', 'ether')
    },
    ChangeSellToken (MakerToken) {
      alert(MakerToken.TokenContract)
      this.sellToken = MakerToken
      alert('The Sell Token has been changed to \nChainID ' + this.sellToken.ChainID + '\nSell Token Name:  ' + this.sellToken.TokenName + ' \nSell Token Symbol: ' + this.sellToken.TokenSymbol + '\nSell Token Contract: ' + this.sellToken.TokenContract + '\nSell Token Decimal: ' + this.sellToken.TokenDecimal + '\nSell Token Type: ' + this.buyToken.TokenType)
      this.sellAmount = null
      this.buyAmount = null
      this.BuyTokenAmount = null
    },
    ChangeBuyToken (TakerToken) {
      this.buyToken = TakerToken
      alert('The Buy Token has been changed to \nChainID: ' + this.buyToken.ChainID + '\nBuy Token Name: ' + this.buyToken.TokenName + '\nBuy Token Symbol: ' + this.buyToken.TokenSymbol + '\nBuy Token Contract: ' + this.buyToken.TokenContract + '\nBuy Token Decimal: ' + this.buyToken.TokenDecimal + '\nBuy Token Type: ' + this.buyToken.TokenType)
      this.sellAmount = null
      this.buyAmount = null
      this.BuyTokenAmount = null
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.label-title {
  font-variant-caps: all-small-caps;
  font-size: 1.3rem;
  font-family: 'Fredoka One', cursive;
  color: #505960;
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
.hidden-field {
  visibility: hidden;
}
.left-group-btn {
  border-top-left-radius: 4rem;
  border-bottom-left-radius: 4rem;
  font-variant-caps: all-small-caps;
  font-size: 0.85rem;
}
.right-group-btn {
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  font-variant-caps: all-small-caps;
  font-size: 0.85rem;
}
.slippage-selector {
  background-color: transparent;
  border-radius: 4rem;
}
.trade-container {
  margin-top: 8rem;
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
.maker-token-amount {
  border-radius: 4rem;
  margin-top: 1rem;
}
.taker-token-amount {
  border-radius: 4rem;
  margin-top: 1rem;
}
.dollar-value {
  font-size: 1.8rem;
}
.trade-symbol-container {
  margin-top: 3rem;
  margin-bottom:2rem;
}
.animate__animated.animate__rotatIn {
  --animate-duration: 2s;
}
</style>
