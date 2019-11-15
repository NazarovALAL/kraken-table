import axios from 'axios'

export default {
  getTicker (requestPairs) {
    return axios.get('https://api.kraken.com/0/public/Ticker?pair=' + requestPairs)
  }
}
