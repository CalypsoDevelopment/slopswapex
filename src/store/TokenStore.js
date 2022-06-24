import { defineStore } from 'pinia'
import tokens from '@/src/data/bsctokens.json'
export const useTokenStore = defineStore('TokenStore', {

  // state
  state: () => {
    return {

      tokens

    }
  }

  // actions

  // getters

})
