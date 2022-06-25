<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <div class="farm-bg">
      <b-img src="~/assets/img/page-graphics/180-sized-page-header-provably-fair-crypto-casino.png" fluid alt="Lottery &amp; Keno Games at SlopSwap COming Soon!" />
    </div>
    <div class="text-center my-5">
      <b-img src="~/assets/img/page-graphics/coming-soon.png" class="crypto-bunny" fluid alt="Coming Soon! Lottery & Keno Crypto Games" />
    </div>
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
.ad-space-large {
  background-color: #FFFFFF;
  min-height: 200px;
  width: 100%;
}
.crypto-bunny {
  max-height: 300px;
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
    /* background: #fff url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e) right 0.75rem center/8px 10px no-repeat;
    border: 1px solid #ced4da; */
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
  /*background-color: #FD9E30;*/
  border-radius: 2rem;
  /* border: 1px solid #FFFFFF; */
  padding: 2rem;
  /* -webkit-box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);
  box-shadow: 5px 5px 15px -1px rgba(33,37,41,0.55);*/
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
