import { notifications } from '~/shared/api'

export default {
  data() {
    return {
      notificationsList: [],
      notificationDetail: {}
    }
  },
  beforeMount() {
    if (this.$store.state.notifications.notificationsList.length) {
      this.notificationsList = this.$store.state.notifications.notificationsList
    } else {
      this.fetchNotifications()
    }
  },
  methods: {
    async fetchNotifications() {
      const { data } = await this.$Api.get(notifications.getAll, {
        loading: 'BLOCKER',
      })
      if (!data && !data.length) {
        return
      }

      this.notificationsList = data
    },
  },
  watch: {
    notificationsList: {
      handler(value) {
        const id = this.$route.params.id ?? null
        const target = value.filter(el => +el.id === +id)
        if (id && target.length) {
          this.notificationDetail = target[0]
        }
      },
      immediate: true
    }
  }
}
