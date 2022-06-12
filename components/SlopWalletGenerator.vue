<template>
  <div id="body-bg" class="mx-0 px-0">
    <b-container fluid class="mx-0">
      <b-row>
        <b-col sm="12" md="6" lg="6" class="text-center">
          <b-row>
            <b-col sm="12" md="12" lg="12" class="my-4">
              <h1 class="main-title">
                MultiChain Cryptocurrency Wallet Generator
              </h1>
            </b-col>
            <b-col sm="12" md="12" lg="6">
              <div class="px-4 py-4">
                <label class="form-titles">
                  Select an Animal Type
                  <b-form-select v-model="AnimalOptionSelected" class="standard-form" :options="AnimalOptions" @change="AnimalRandomizer()" />
                </label>
              </div>
            </b-col>

            <b-col sm="12" md="12" lg="6">
              <div class="px-4 py-4">
                <label class="form-titles">
                  Size Options
                  <b-form-select v-model="SizeOptionsSelected" class="standard-form" :options="SizeOptions" @change="SizeOptionSelect()" />
                </label>
                <div class="mt-3 standard-form">
                  <!--Selected:
                  <strong>
                    {{ SizeOptionsSelected }}
                  </strong>-->
                </div>
              </div>
            </b-col>
            <b-col sm="12" md="12" lg="6">
              <div class="px-4 py-4">
                <label class="form-titles">
                  QR Code Color Selector
                  <Verte v-model="colorValue" model="hex" :value="colorValue" @change="QRCodeColorChanger(colorValue)" />
                  <br>
                  <b-form-input v-model="colorValue" value="colorValue" @change="QRCodeColorChanger($event)">
                    {{ colorValue }}
                  </b-form-input>
                </label>
              </div>
            </b-col>
          </b-row>
          <br>
          <b-button v-if="GeneratorCount === 0" pill size="lg" class="my-6" @click="GenerateEthereumWallet()">
            Generate New Wallet
          </b-button>
          <b-button v-if="GeneratorCount >= 1" pill size="lg" class="my-6" @click="RegenerateQRCode()">
            Regenerate QR Code
          </b-button>
          <!--<b-button @click="Tester()">
            Generate Animal
          </b-button>-->
        </b-col>
        <b-col sm="12" md="6" lg="6" class="text-center">
          <b-row>
            <b-col sm="12" md="12" lg="12" class="my-4">
              <h1 class="main-title">
                Generated Wallet
              </h1>
            </b-col>
            <b-col>
              <div id="qr-code" ref="qrCode" class="qr-container py-1 px-4" />
              <b-button pill size="sm" class="my-4 px-4 py-2" @click="DownloadQRCodeWallet()">
                Download QR Code
              </b-button>
              <b-list-group>
                <b-list-group-item>
                  <h2 class="form-titles">
                    Wallet Address
                  </h2>
                  <br>
                  <p class="crypto-num">
                    {{ WalletAddress }}
                  </p>
                </b-list-group-item>
                <b-list-group-item>
                  <h2 class="form-titles">
                    Seed Phrase
                  </h2>
                  <br>
                  <div class="mb-3">
                    <b-button v-b-toggle.seedPhrase pill size="sm" class="px-5 wallet-reveal-btn">
                      Reveal Seed Phrase
                    </b-button>
                  </div>
                  <b-collapse id="seedPhrase">
                    <b-card title="SlopSwap ERC20 Ethereum-Based Wallet Generator Seed Phrase">
                      <p class="seed-phrase">
                        {{ WalletSeedPhrase }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-list-group-item>
                <b-list-group-item>
                  <h2 class="form-titles">
                    Wallet Private Key
                  </h2>
                  <br>
                  <p class="crypto-num">
                    {{ WalletPrivateKey }}
                    <br>
                    <b-button pill size="sm" class="px-5 wallet-reveal-btn">
                      Reveal Seed Phrase
                    </b-button><br>
                  </p>
                </b-list-group-item>
                <b-list-group-item>
                  <h2 class="form-titles">
                    Public Key
                  </h2>
                  <br>
                  <p class="crypto-num">
                    {{ WalletPublicKey }}
                  </p>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import pickRandom from 'pick-random'
import Verte from 'verte'
import 'verte/dist/verte.css'
const ethers = require('ethers')
const dogeSeed = require('doge-seed')

export default {
  name: 'SlopWalletGenerator',
  components: {
    Verte
  },
  data () {
    return {
      colorValue: '#000000',
      AnimalOptionSelected: null,
      AnimalOptions: [
        { value: null, text: 'Please select an animal option' },
        { value: 'chicken', text: 'Chicken' },
        { value: 'bird', text: 'Bird' },
        { value: 'sheep', text: 'Sheep' },
        { value: 'rabbit', text: 'Rabbit' }
      ],
      SizeOptionsSelected: 200,
      SizeOptions: [
        { value: 200, text: '200 x 200 Pixels' },
        { value: 300, text: '300 x 300 Pixels' },
        { value: 400, text: '400 x 400 Pixels' },
        { value: 500, text: '500 x 500 Pixels' }
      ],
      value: 'https://slopswap.trade',
      size: 300,
      WalletSeedPhrase: null,
      WalletAddress: null,
      WalletPublicKey: null,
      WalletPrivateKey: null,
      QRoptions: {
        width: 300,
        height: 300,
        type: 'svg',
        data: 'https://slopswap.trade',
        image: '/chicken1.svg',
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q'
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.7,
          margin: 10
          // crossOrigin: 'anonymous'
        },
        dotsOptions: {
          type: 'classy',
          color: '#000000'
        },
        backgroundOptions: {
          color: 'transparent'
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
        },
        cornersSquareOptions: {
          color: '#35495E',
          type: 'extra-rounded'
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
        },
        cornersDotOptions: {
          color: '#35495E',
          type: 'dot'
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
        }
      },
      QRCodeOutput: null,
      QRCodeOutput2: null,
      RandomizedAnimalSelect: null,
      GeneratorCount: 0
    }
  },
  watch: {
    colorValue () {
      this.QRCodeColorChanger()
    }
  },
  mounted () {
  },
  methods: {
    async GenerateEthereumWallet () {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', [])

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      // const signer = provider.getSigner()

      // Generate mnemonic 12 word seed phrase
      const SeedPhrase = dogeSeed()
      // alert(SeedPhrase)

      // Create a wallet instance from a mnemonic...
      const Wallet = ethers.Wallet.createRandom()
      const mnemonic = String(SeedPhrase)
      const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)

      this.WalletSeedPhrase = SeedPhrase
      this.WalletAddress = Wallet.address
      this.WalletPublicKey = Wallet.publicKey
      this.WalletPrivateKey = walletMnemonic.privateKey

      this.QRoptions.data = `https://bscscan.com/address/${this.WalletAddress}`

      const QRCodeStyling = require('qr-code-styling')
      this.QRCodeOutput = new QRCodeStyling(this.QRoptions)

      this.QRCodeOutput.append(this.$refs.qrCode)
      // qrCode.append(getContext)

      this.GeneratorCount = +1
    },
    DownloadQRCodeWallet () {
      this.QRCodeOutput.download({ name: 'qr', extension: 'svg' })
    },
    RegenerateQRCode () {
      this.QRoptions.data = `https://bscscan.com/address/${this.WalletAddress}`

      const QRCodeStyling = require('qr-code-styling')
      this.QRCodeOutput2 = new QRCodeStyling(this.QRoptions)

      this.QRCodeOutput2.append(this.$refs.qrCode)
      // qrCode.append(getContext)
      this.QRCodeOutput2.download({ name: 'qr', extension: 'svg' })

      this.GeneratorCount = +1
    },
    AnimalRandomizer () {
      if (this.AnimalOptionSelected != null) {
        const rn = require('random-number')
        const options = {
          min: 1,
          max: 5,
          integer: true
        }
        const ranNum = rn(options)
        this.RandomizedAnimalSelect = this.AnimalOptionSelected + ranNum
        const ImageLink = '/' + this.RandomizedAnimalSelect + '.svg'
        this.QRoptions.image = ImageLink
      }
    },
    QRCodeColorChanger (colorValue) {
      this.QRoptions.dotsOptions.color = this.colorValue
    },
    SizeOptionSelect () {
      this.QRoptions.width = this.SizeOptionsSelected
      this.QRoptions.height = this.SizeOptionsSelected
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#body-bg {
  /* background-image: url(~/assets/img/page-graphics/wallet-generator-bg.png);*/
  min-height: 100vh;
  /*background-color: #FFFFFF;*/
}
.crypto-num {
  word-wrap: break-word;
  font-family: 'Nunito', verdana;
  font-size: 1.2rem;
  font-variant: all-small-caps;
}
.form-titles {
  font-family: 'Fredoka One', verdana;
  font-size: 1.4rem;
  font-variant: all-small-caps;
}
.wallet-reveal-btn {
  font-family: 'Nunito', verdana;
  font-size: 1.2rem;
  font-variant: all-small-caps;
}
.standard-form {
  font-family: 'Fredoka One', verdana;
  font-size: 1rem;
  font-variant: all-small-caps;
}
.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #FFFFFF;
    border: 1px solid #EFEFEF;
}
.main-title {
  font-family: 'Fredoka One', verdana;
  font-size: 1.8rem;
  font-variant: all-small-caps;
  margin-top: 2rem;
  color: #2F2D30;
}
.seed-phrase {
  font-size: 1rem;
  color: #c1272d;
  font-variant: normal !important;
  weight: 800;
}
</style>
