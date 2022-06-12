<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-sized-page-header-provably-fair-crypto-casino.png" fluid alt="Responsive image" />
    </div>
    <b-container fluid>
      <b-row class="keno-grid mt-4">
        <b-col cols="5" class="text-left">
          <div class="keno-ctrl-panel">
            <div class="my-4">
              <b-label class="label-title ml-2">
                Current Game Status:
                <span v-if="KenoStatus === false">
                  <i class="fa-solid fa-dice" style="color: #e20000" /> Off
                </span>
                <span v-else>
                  <i class="fa-solid fa-dice" style="color: #8CC63F" /> On
                </span>
              </b-label>
            </div>
            <div class="my-4">
              <b-label class="label-title ml-2">
                Bet Amount
                <b-form-input v-model="BetAmount" placeholder="Enter Wager Amount" />
              </b-label>
              <!--<div class="mt-2">
                Value: {{ text }}
              </div>-->
            </div>
            <div>
              <b-label class="label-title ml-2">
                Risk Level
                <b-form-select v-model="KenoRiskSelected" :options="KenoRiskOptions" />
              </b-label>
            </div>

            <div class="keno-grid text-center mt-4">
              <b-button-group>
                <b-button pill class="bet-control-buttons px-4 mx-1 my-2">Auto Select</b-button>
                <b-button pill class="bet-control-buttons px-4 mx-1 my-2">Clear Card</b-button>
              </b-button-group>
            </div>

            <b-button pill block class="bet-control-buttons my-2">
              Place Bet
            </b-button>
          </div>
        </b-col>
        <b-col cols="7">
          <b-row>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  1
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  2
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  3
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  4
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  5
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  6
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  7
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  8
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  9
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  10
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  11
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  12
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  13
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  14
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  15
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  16
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  17
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  18
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  19
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  20
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  21
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  22
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  23
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  24
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  25
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  26
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  27
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  28
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  29
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  30
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number mt-1 mb-4">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  31
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  32
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  33
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  34
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  35
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  36
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  37
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  38
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  39
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  40
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  41
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  42
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  43
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  44
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  45
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  46
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  47
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  48
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  49
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  50
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  51
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  52
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  53
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  54
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  55
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  56
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  57
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  58
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  59
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  60
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  61
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  62
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  63
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  64
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  65
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  66
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  67
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  68
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  69
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  70
                </b-button>
              </b-button-group>
            </b-col>
            <b-col sm="12" medium="12" lg="12" class="text-center keno-number my-1">
              <b-button-group>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  71
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  72
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  73
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  74
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  75
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  76
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  77
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  78
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  79
                </b-button>
                <b-button class="text-center red keno-number mx-1 py-0 px-0 mb-0">
                  80
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
// import SlopSwapTraderV2 from '~/components/SlopSwapTraderV2.vue'
// import BSCSpotPriceTicker from '~/components/BSCSpotPriceTicker.vue'
// import axios from 'axios';

export default {
  name: 'KenoUserInterfacePage',
  components: { TopNavbarComplex },
  data () {
    return {
      KenoRiskSelected: 'classic',
      KenoRiskOptions: [
        { value: 'low', text: 'Low' },
        { value: 'classic', text: 'Classic' },
        { value: 'medium', text: 'Medium' },
        { value: 'high', text: 'High' }
      ],
      KenoStatus: false
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.bg {
  /*background: rgb(195,181,155);
  background: linear-gradient(90deg, rgba(195,181,155,1) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,1) 100%);
  background: rgb(255,185,0);
  background: linear-gradient(90deg, rgba(255,185,0,1) 0%, rgba(198,191,177,1) 50%, rgba(255,255,255,1) 100%);
  min-height: 100vh;*/
  min-height: 100vh;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(46,163,230,1) 10%, rgba(255,158,46,1) 100%);
}
.label-title {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  color: #212529;
}
.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e) right 0.75rem center/8px 10px no-repeat;
    border: 1px solid #ced4da;
    border-radius: 4rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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
.keno-number .btn {
  min-width: 5vw;
  min-height: 5vh;
  border: 1px solid #FFFFFF;
  /* border-radius: .5rem; */
  /* -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%); */
  color: #212529;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  -webkit-box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);
  box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);
}
.keno-ctrl-panel {
  background-color: #FD9E30;
  border-radius: 2rem;
  padding: 2rem;
  -webkit-box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);
  box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);
}
.bet-control-buttons {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  color: #212529;
  background-color: #c1272d;
  border-color: transparent;
}
.green {
  background-color: #8cc63f;
}
.red {
  background-color: #fd9e30;
}
.keno-num {
  font-weight: bold;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
}

.chain-logos {
  height: 32px;
}
.full-page-img {
  /*border-radius: 4rem;*/
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
}
p {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-family: 'Nunito', sans-serif;
}
.info-panel {
  min-height: 50vh;
}
.slopswap-logo {
  max-height: 100px;
}
.btn-primary {
  color: #fff;
  background-color: #c1272d;
  border-color: #FFFFFF;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 0.90rem;
  font-weight: 400;
}
.card-title {
  margin-bottom: 0.45rem;
  font-family: 'Fredoka One', sans-serif;
  font-variant-caps: all-small-caps;
  font-size: 1.2rem;
  font-weight: 400;
}
.farm-bg {
  background-color: #FFFFFF;
  /* padding-top: 1rem; */
  min-height: auto;
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
  /* -webkit-clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
  clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);*/
  /* background-image: url(~/assets/img/page-graphics/SlopSwap-Home-Page.png);
  background-size: 100%;
  background-position: bottom center;
  background-repeat: no-repeat; */
}
.app-container {
  min-height: 600px;
}
</style>
