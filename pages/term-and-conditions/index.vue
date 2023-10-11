<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('termsAndConditions')" />
    </div>
    <div v-html="description" />
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import { termsAndConditions } from "~/shared/api";

export default {
  name: 'TermAndConditions',
  components: { BackNavigation },
  layout: 'default',
  data() {
    return {
      description: ''
    }
  },
  methods: {
    async getTermsAndConditions() {
      const { data } = await this.$Api.get(termsAndConditions.getTermsAndConditions, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.description = data.description ?? ''
    }
  },
  beforeMount() {
    this.getTermsAndConditions()
  }
}
</script>
