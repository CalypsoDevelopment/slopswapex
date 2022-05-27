<template>
  <b-container fluid class="bg px-0">
    <div>
      <b-sidebar id="notification-sidebar" width="600px" shadow>
        <div class="px-1 py-4">
          <h1 class="sidebar-title text-center">
            Liquidity Pair Specifications<br>
          </h1>
          <div v-if="LiquidityPoolData">
            <b-list-group class="liquidity-spec-list text-center">
              <b-list-group-item>
                <span class="pair-data">{{ LPTokenBReserve }}</span>
                {{ LPTokenASymbol }}
                <b-img
                  :src="require(`@/assets/img/tokens/${LPTokenAContract}.png`)"
                  fluid
                  alt="Selected token that user wants to receive"
                  class="small-pair-token-img"
                />
                <i class="fa-solid fa-arrows-retweet" />
                <b-img
                  :src="require(`@/assets/img/tokens/${LPTokenBContract}.png`)"
                  fluid
                  alt="Selected token that user wants to receive"
                  class="small-pair-token-img"
                />
                {{ LPTokenBSymbol }}
                <span class="pair-data">{{ LPTokenAReserve }}</span>
                <br>
                <hr>
                SLOP-LPs Balance for
                <br>
                {{ LPTokenASymbol }} | {{ LPTokenBSymbol }}
                <br>
                <b-img
                  :src="require(`@/assets/img/tokens/SLOP-LPs.png`)"
                  fluid
                  alt="SLOP-LPs is the native Liquidity Pool Token of SlopSwap Exchange"
                  class="small-pair-token-img"
                />
                <span class="pair-data">{{ LPTokenBalance }}</span> SLOP-LPs
              </b-list-group-item>
              <b-list-group-item>
                <b-row>
                  <b-col cols="12">
                    LP Token Names
                  </b-col>
                  <b-col cols="6">
                    <span class="pair-data">{{ LPTokenAName }}</span>
                  </b-col>
                  <b-col cols="6">
                    <span class="pair-data">{{ LPTokenBName }}</span>
                  </b-col>
                </b-row>
              </b-list-group-item>
              <b-list-group-item>
                LP Token Pair Address<br>
                <span class="token-address">
                  <b-link :href="`https://bscscan.com/token/${LPPairAddress}`" :title="`${LPTokenASymbol} | ${LPTokenBSymbol} SlopSwap Liquidity Pool Pair Address is ${LPPairAddress} can be explored further on the official BSC Scan website.`" target="_blank">
                    {{ LPPairAddress }}
                  </b-link>
                </span>
              </b-list-group-item>
              <b-list-group-item>
              </b-list-group-item>
              <!--<b-list-group-item></b-list-group-item>
              <b-list-group-item></b-list-group-item>-->
            </b-list-group>
          </div>
          <div v-else>
            <b-img src="~/assets/img/page-graphics/no-connecty-no-looky.png" fluid alt="Responsive image"></b-img>
          </div>
        </div>
      </b-sidebar>
    </div>
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-nav tabs align="right">
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
        <!-- <b-nav-item disabled>
          Disabled
        </b-nav-item> -->
      </b-nav>
    </div>
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapLiquidity @emitLP="CaptureLPData($event)" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import SlopSwapLiquidity from '~/components/SlopSwapLiquidity.vue'
const ethers = require('ethers')

export default {
  name: 'LiquidityPage',
  components: { SlopSwapLiquidity, TopNavbarComplex },
  data () {
    return {
      LiquidityPoolData: null,
      LPTokenAName: null,
      LPTokenAContract: null,
      LPTokenASymbol: null,
      LPTokenBName: null,
      LPTokenBContract: null,
      LPTokenBSymbol: null,
      LPPairAddress: null,
      LPTokenBalance: null
    }
  },
  methods: {
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
      this.LPTokenAReserve = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenAReserves)
      this.LPTokenBReserve = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenBReserves)
      this.LPTokenBalance = ethers.utils.formatEther(this.LiquidityPoolData.LPTokenBalance)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.bg {
  background-color: #e0e0e0;
  min-height: 100vh;
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
.sidebar-title {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 1.4rem;
}
.small-pair-token-img {
  max-height: 22px;
}
.app-container {
  min-height: 600px;
}
.nav-tabs {
  /*border-bottom: 1px solid #e0e0e0;*/
  background-color: #FFFFFF;
  padding-top: 1rem;
  min-height: 200px;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  background-image: url(~/assets/img/slopswap-crew.png);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
}
a {
    color:#17a2b8;
    text-decoration: none;
    background-color: transparent;
}
a.nav-link:hover {
  color: #495057;
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
