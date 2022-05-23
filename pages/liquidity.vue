<template>
  <b-container fluid class="bg">
    <TopNavigationBarSimple />
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapLiquidity />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavigationBarSimple from '~/components/TopNavigationBarSimple.vue'
import SlopSwapLiquidity from '~/components/SlopSwapLiquidity.vue'

export default {
  name: 'LiquidityPage',
  components: { SlopSwapLiquidity, TopNavigationBarSimple }
}
</script>
<style scoped>
.bg {
  background-color: #e0e0e0;
  min-height: 100vh;
}
.app-container {
  min-height: 600px;
}

</style>
