<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('aboutMyPardis')" to="/" />
    </div>
    <div v-html="contactUsContent" />
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import { aboutUs } from '~/shared/api'

export default {
  name: 'ContactUs',
  components: { BackNavigation },
  layout: 'default',
  data() {
    return {
      contactUsContent: '',
    }
  },
  beforeMount() {
    this.getAboutAndContact()
  },
  methods: {
    async getAboutAndContact() {
      const { data } = await this.$Api.get(aboutUs.getAboutAndContact, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.contactUsContent = data.contactUsText ?? ''
    },
  }
}
</script>
