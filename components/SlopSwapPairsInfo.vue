<template>
  <div>
    <b-list-group>
      <b-list-group-item>Reserve 0: {{ reserve0 }}</b-list-group-item>
      <b-list-group-item>Reserve 1: {{ reserve1 }}</b-list-group-item>
      <b-list-group-item>User's Pair Balance: {{ UserPairbalance }}</b-list-group-item>
      <b-list-group-item>Token 0: {{ token0 }}</b-list-group-item>
      <b-list-group-item>Token 1: {{ token1 }}</b-list-group-item>
      <b-list-group-item>Total Supply: {{ totalSupply }}</b-list-group-item>
      <b-list-group-item>Equivalent Value0: {{ getAmountValue0 }}</b-list-group-item>
      <b-list-group-item>Equivalent Value2: {{ getAmountValue1 }}</b-list-group-item>
      <b-list-group-item>
        <b-button @click="getAmountOut()">
          Get Amount Out
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
const ethers = require('ethers')
const PAIR = require('~/static/artifacts/SlopSwapPair.json')
const ROUTER = require('~/static/artifacts/SlopSwapRouter.json')
// const FACTORY = require('~/static/artifacts/SlopSwapFactory.json')
const BEP20 = require('~/static/artifacts/IERC20.json')

export default {
  name: 'SlopSwapPairsInfo',
  components: {
  },
  data () {
    return {
      sellToken: { ChainID: 56, TokenName: 'Wrapped BNB', TokenSymbol: 'WBNB', TokenContract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#f0b90b' },
      buyToken: { ChainID: 56, TokenName: 'PancakeSwap Token (Cake)', TokenSymbol: 'Cake', TokenContract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', TokenDecimal: 18, TokenType: 'ERC20', BrandPrimary: '#d1884f' },
      amountIn: 0.1,
      UserPairbalance: null,
      balance0: null,
      balance1: null,
      reserve0: null,
      reserve1: null,
      token0: null,
      token1: null,
      totalSupply: null,
      getAmountValue0: null,
      getAmountValue1: null,
      WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      PairContractAddress: '0xD1eAbB3Bce6E50F000463589d137c182B39B179D',
      MainnetFactory: '0x0533B75362E3Be13E78f245e50674c9a6dd9c17A',
      MainnetRouter: '0x42A77DEdD13520141aaF1720EF88086B5Cae95f5',
      routerInstance: null
    }
  },
  beforeMount () {
    this.fetchPairData()
    this.quoteCheck()
  },
  methods: {
    // This function returns the conversion rate between two token addresses
    //    `address1` - An Ethereum address of the token to swaped from (either a token or AUT)
    //    `address2` - An Ethereum address of the token to swaped to (either a token or AUT)
    //    `amountIn` - Amount of the token at address 1 to be swaped from
    //    `routerContract` - The router contract to carry out this swap
    async getAmountOut () {
      const address1 = this.sellToken.TokenContract
      const address2 = this.buyToken.TokenContract
      const amountIn = this.amountIn
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]

      const router = await new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, signer)

      try {
        const token1 = new ethers.Contract(address1, BEP20.abi, signer)
        alert('Token 1: ' + token1)
        const token1Decimals = this.sellToken.TokenDecimal

        const token2 = new ethers.Contract(address2, BEP20.abi, signer)
        alert('Token 2: ' + token2)
        const token2Decimals = this.buyToken.TokenDecimal

        const ValuesOut = await router.getAmountsOut(
          ethers.utils.parseUnits(String(amountIn), token1Decimals),
          [address1, address2]
        )
        const AmountOut = ValuesOut[1] * 10 ** (-token2Decimals)
        alert('amount out: ', AmountOut)
        return Number(AmountOut)
      } catch {
        return false
      }
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
        const address1 = this.sellToken.TokenContract
        const address2 = this.buyToken.TokenContract

        // Get decimals for each coin
        const coin1 = new ethers.Contract(address1, BEP20.abi, signer)
        alert('Coin1: ' + coin1)
        const coin2 = new ethers.Contract(address2, BEP20.abi, signer)
        alert('Coin2: ' + coin2)

        const coin1Decimals = this.sellToken.TokenDecimal
        const coin2Decimals = this.buyToken.TokenDecimal

        const pair = await new ethers.Contract(String(this.PairContractAddress), PAIR.abi, signer)

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
        alert('error!')
        alert(err)
        return [0, 0]
      }
    },

    // This function returns the reserves stored in a the liquidity pool between the token of address1 and the token
    // of address2, as well as the liquidity tokens owned by accountAddress for that pair.
    //    `address1` - An Ethereum address of the token to trade from (either a token or AUT)
    //    `address2` - An Ethereum address of the token to trade to (either a token or AUT)
    //    `factory` - The current factory
    //    `signer` - The current signer
    async getReserves (
      address1,
      address2,
      factory,
      signer,
      accountAddress
    ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const accounts = await provider.send('eth_requestAccounts', [])
        this.account = accounts[0]
        const pairAddress = await factory.getPair(address1, address2)
        const pair = new ethers.Contract(pairAddress, PAIR.abi, signer)

        if (this.PairContractAddress !== '0x0000000000000000000000000000000000000000') {
          const reservesRaw = await this.fetchReserves(address1, address2, pair, signer)
          const LiquidityTokensBN = await pair.balanceOf(String(this.account))
          const liquidityTokens = Number(
            ethers.utils.formatEther(LiquidityTokensBN)
          )

          return [
            reservesRaw[0].toPrecision(6),
            reservesRaw[1].toPrecision(6),
            liquidityTokens
          ]
        } else {
          alert('no reserves yet')
          return [0, 0, 0]
        }
      } catch (err) {
        alert('error!')
        alert(err)
        return [0, 0, 0]
      }
    },
    async fetchPairData () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]

      const pair = new ethers.Contract(String(this.PairContractAddress), PAIR.abi, signer)

      const getReserveData = await pair.getReserves()

      this.reserve0 = ethers.utils.formatEther(String(getReserveData[0]))

      this.reserve1 = ethers.utils.formatEther(String(getReserveData[1]))

      const Pairbalance = await pair.balanceOf(this.account)

      this.UserPairbalance = ethers.utils.formatEther(String(Pairbalance))

      const token0 = await pair.token0()
      this.token0 = token0

      const token1 = await pair.token1()
      this.token1 = token1

      const PairTotalSupply = await pair.totalSupply()
      this.totalSupply = ethers.utils.formatEther(String(PairTotalSupply))

      // alert('Reserve Data 0: ' + getReserveData[0] + ' Reserve Data 1: ' + getReserveData[1])
    },
    async quoteCheck () {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      const accounts = await provider.send('eth_requestAccounts', [])
      this.account = accounts[0]

      const router = new ethers.Contract(String(this.MainnetRouter), ROUTER.abi, signer)

      this.routerInstance = router

      const inputAmount = 1

      const EthertoWei = ethers.utils.parseEther(String(inputAmount))

      alert(EthertoWei)

      const getAmountValue0 = await router.quote(String(EthertoWei), '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')

      this.getAmountValue0 = ethers.utils.formatEther(String(getAmountValue0))

      const getAmountValue1 = await router.quote(String(EthertoWei), '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')

      this.getAmountValue1 = ethers.utils.formatEther(String(getAmountValue1))
    }
  }
}
</script>
<style scoped>

</style>
