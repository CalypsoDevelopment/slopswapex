<template>
  <div>
    <b-sidebar
      id="TXHistory"
      width="35%"
      class="text-center"
      title=""
      right
      shadow
    >
      <div class="px-3 py-2">
        <!--<b-img src="~/assets/img/page-graphics/SlopSwap-Brain-Character-Ledger.png" fluid alt="SlopSwap Brain Character Reading from the SlopSwap Xchange Ledger" />-->
        <h2 class="main-title">
          SlopSwap Transaction History
        </h2>
        <b-list-group>
          <b-list-group-item />
          <b-list-group-item />
          <b-list-group-item />
        </b-list-group>

        <!--<b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail />-->
      </div>
    </b-sidebar>
  </div>
</template>
<script>

export default {
  name: 'SlopSwapTXHistory',
  components: {
  },
  props: {
    txhistory: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
.main-title {
  font-variant-caps: all-small-caps;
  font-weight: 600;
  font-size: 2rem;
  font-family: 'Fredoka One', sans-serif;
}
.trade-data-dark {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  font-size: 0.94rem;
  color: #212529;
}
.trade-dat-light {
  font-variant-caps: all-small-caps;
  font-family: 'Fredoka One', sans-serif;
  color: #17a2b8;
  font-size: 0.94rem;
}
</style>
