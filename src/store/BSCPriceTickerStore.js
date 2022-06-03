import { defineStore } from 'pinia'
const Console = require('Console')
// const axios = require('axios')
Console.log('Console.log is now available!')
// const tokens = require('@/static/postmanData/cryptoPricing/covalent-price-tickers.json')

Console.log()

export const useBSCPriceTickerStore = defineStore('BSCPriceTickerStore', {
  state: () => {
    return {
      TickerData: null
    }
  },
  getters: {
    getBSCPriceTickerStore: state => state.BSCPriceTickerStore
  }

})
