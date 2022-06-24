<template>
  <b-container fluid class="bg">
    <TopNavbarComplex />
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapLiquidityFunction />
          </div>
        </b-col>
      </b-row>
      <!--<b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapPairsInfo />
          </div>
        </b-col>
      </b-row>-->
    </b-container>
  </b-container>
</template>
<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
// import SlopSwapPairsInfo from '~/components/SlopSwapPairsInfo.vue'
import SlopSwapLiquidityFunction from '~/components/SlopSwapLiquidityFunction.vue'

export default {
  name: 'LiquidityPairsPage',
  components: { TopNavbarComplex, SlopSwapLiquidityFunction }
}
</script>
<style scoped>

</style>
