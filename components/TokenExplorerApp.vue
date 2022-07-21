<template>
  <b-container fluid class="my-4">
    <b-row>
      <b-col
        v-for="token in TokenData.tokens"
        :key="token.address"
        sm="12"
        md="6"
        lg="6"
        class="text-center"
      >
        <div class="app-container">
          <ul>
            <li class="token-cards">
              <b-card
                :title="token.name"
                :img-src="require(`../assets/img/tokens/${token.logo}`)"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 100vw"
                class="token-card mb-2"
              >
                <div class="token-address">
                  <b-input-group size="md">
                    <b-form-input v-model="contractAddress" type="text" class="contract-input" :placeholder="token.address" />
                    <b-button
                      id="copyAddress"
                      type="button"
                      variant="primary"
                      class="copy-contract"
                      :value="contractAddress"
                      @click="CopyCryptoAddress(token.address)"
                    >
                      <i class="fa-solid fa-copy" />
                    </b-button>
                  </b-input-group>
                </div>
              </b-card>
            </li>
          </ul>
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
</template>
<script>
// import tokens from '@/src/data/bsctokens.json'
import { useTokenStore } from '@/src/store/TokenStore.js'
// import TopNavbarComplex from '~/components/TopNavbarComplex.vue'
// import SlopSwapPairsInfo from '~/components/SlopSwapPairsInfo.vue'
// import TokenExplorerApp from '~/components/TokenExplorerApp.vue'

export default {
  name: 'TokenExplorerApp',
  components: {},
  data () {
    return {
      TokenData: useTokenStore()
    }
  },
  methods: {
    getTokenImage (tokenLogoFile) {
      const imgURL = `/assets/img/tokens/${tokenLogoFile}`
      return imgURL
    },
    async CopyCryptoAddress (address) {
      // const copyText = document.getElementById('copyAddress')
      // copyText.value = address
      const executeCmd = await navigator.clipboard.writeText(address)
      alert('Copied the text: ' + address)
      return executeCmd
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
ul  {
  list-style-type: none;
}
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.contract-input {
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.token-address {
  margin-bottom: 1rem;
  font-size: 0.80rem;
  font-family: 'Nunito', sans-serif;
}
.copy-contract {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
.token-card {
  border-radius: 2rem;
}
.token-card img {
  height: 50px;
  margin-top: 1rem;
}
</style>
