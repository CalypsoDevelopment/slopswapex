<template>
  <b-container fluid class="bg px-0">
    <TopNavbarComplex />
    <b-container>
      <b-row>
        <b-col cols="12" class="text-center">
          <div class="app-container">
            <SlopSwapTrader />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
import SlopSwapTrader from '~/components/SlopSwapTrader.vue'

export default {
  name: 'IndexPage',
  components: { SlopSwapTrader, TopNavbarComplex }
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
