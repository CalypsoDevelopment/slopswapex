<template>
  <b-container fluid class="bg">
    <TopNavigationBarSimple />
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
import TopNavigationBarSimple from '~/components/TopNavigationBarSimple.vue'
// import SlopSwapLiquidity from '~/components/SlopSwapLiquidity.vue'

export default {
  name: 'LiquidityPairsPage',
  components: { TopNavigationBarSimple }
}
</script>
<style scoped>

</style>
