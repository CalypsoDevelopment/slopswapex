import { defineStore } from 'pinia'
const tokens = require('@/static/postmanData/cryptoPricing/covalent-price-tickers.json')

export const useBSCPriceTickerStore = defineStore('BSCPriceTickerStore', {
  state: () => {
    return {
      tokens
    }
  },
  getters: {
    getBSCPriceTickerStore: state => state.BSCPriceTickerStore
  }

})
