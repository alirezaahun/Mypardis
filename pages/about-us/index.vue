<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('aboutMyPardis')" to="/" />
    </div>
    <div v-html="aboutUs" />
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import { aboutUs } from "~/shared/api";

export default {
  name: 'AboutUs',
  components: { BackNavigation },
  layout: 'default',
  data() {
    return {
      aboutUs: ''
    }
  },
  methods: {
    async getAboutAndContact() {
      const { data } = await this.$Api.get(aboutUs.getAboutAndContact, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.aboutUs = data.aboutUsText ?? ''
    }
  },
  beforeMount() {
    this.getAboutAndContact()
  }
}
</script>
