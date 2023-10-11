import { awards } from "~/shared/api";

export default {
  data() {
    return {
      cashAwards: [],
      nonCashAwards: []
    }
  },
  beforeMount() {
    this.fetchAwardsFromState()
    if (!this.cashAwards.length && !this.nonCashAwards.length) {
      this.fetchAwards()
    }
  },
  methods: {
    fetchAwardsFromState() {
      this.cashAwards = this.$store.state.awards.cashAwardsList
      this.nonCashAwards = this.$store.state.awards.nonCashAwardsList
    },
    async fetchAwards() {
      const { data } = await this.$Api.get(awards.index, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.cashAwards.length = 0
      this.nonCashAwards.length = 0

      if (data.length) {
        this.$store.commit('awards/setAwardsList', data)

        this.fetchAwardsFromState()
      }
    }
  }
}
