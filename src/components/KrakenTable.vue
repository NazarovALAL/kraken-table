<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">
        Kraken Pairs
      </b-navbar-brand>
    </b-navbar>
    <b-table striped hover :items="pairsArr" :fields="fields" :busy="isBusy">
      <template v-slot:cell(pair)="data">
        <span>{{ data.item.Pair | splitPair }}</span>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      fields: ['Pair', { key: 'Bid', sortable: true }, { key: 'Ask', sortable: true }],
      isBusy: true
    }
  },
  mounted () {
    this.getTicker().then(() => {
      this.isBusy = false
    })
    setInterval(this.getTicker, 14500)
  },
  computed: {
    ...mapGetters([
      'pairsArr'
    ])
  },
  methods: {
    getTicker () {
      return this.$store.dispatch('getPairsUpdates').catch(err => {
        this.warningToast(err)
      })
    }
  },
  warningToast (err) {
    this.$bvToast.toast(err, {
      title: 'Ошибка сервера',
      autoHideDelay: 5000,
      variant: 'danger',
      solid: true,
      toaster: 'b-toaster-top-center'
    })
  }
}
</script>

<style scoped lang="sass">
</style>
