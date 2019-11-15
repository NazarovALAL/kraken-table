import Vue from 'vue'
import Vuex from 'vuex'
import krakenAPI from '../api/ticker'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultPairs: {},
    requestPairs: 'DAIUSD,EOSUSD,BATUSD,ADAUSD,BCHUSD'
  },
  mutations: {
    SET_KRAKEN_PAIRS (state, data) {
      state.resultPairs = data
    }
  },
  actions: {
    getPairsUpdates () {
      return new Promise((resolve, reject) => {
        krakenAPI.getTicker(this.state.requestPairs).then(response => {
          this.commit('SET_KRAKEN_PAIRS', response.data.result)
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    pairsArr: state => {
      const pairsArr = []
      const statePairs = state.resultPairs
      for (const property in statePairs) {
        const pairsData = statePairs[property]
        pairsArr.push({
          Pair: property,
          Bid: Number(pairsData.b[0]).toFixed(5),
          Ask: Number(pairsData.a[0]).toFixed(5)
        })
      }
      return pairsArr
    }
  },
  modules: {
  }
})
