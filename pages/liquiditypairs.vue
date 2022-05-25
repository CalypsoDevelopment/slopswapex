<template>
  <b-container fluid class="bg">
    <TopNavbarComplex />
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
// import SlopSwapLiquidity from '~/components/SlopSwapLiquidity.vue'

export default {
  name: 'LiquidityPairsPage',
  components: { TopNavbarComplex }
}
</script>
<style scoped>

</style>
