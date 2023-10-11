<template>
  <div class="tw-bg-primary">
    <div class="default-layout tw-min-h-[100vh]">
      <Nuxt />
    </div>
    <div v-if="blockerLoading || transparentLoading">
      <MPLoading
        :blocker-loading="blockerLoading"
        :transparent-loading="transparentLoading"
        class="tw-fixed tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-h-[100vh] tw-z-50"
      />
    </div>
  </div>
</template>

<script>
import MPLoading from '~/components/ui-kit/mp-loading'

export default {
  name: "empty",
  components: { MPLoading },
  data() {
    return {
      blockerLoading: false,
      transparentLoading: false,
    }
  },
  watch: {
    '$store.state.axios.blockerLoading': {
      handler(value) {
        this.blockerLoading = value
      },
    },
    '$store.state.axios.transparentLoading': {
      handler(value) {
        this.transparentLoading = value
      },
    }
  }
}
</script>

<style scoped>

</style>
