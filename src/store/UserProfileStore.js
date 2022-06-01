import { defineStore } from 'pinia'

export const useUserProfileStore = defineStore('UserProfileStore', {
  state: () => {
    return {
      UserNameWalletAddress: null
    }
  },
  getters: {
    getUsernameAddress: state => state.UserNameWalletAddress
  }

})
