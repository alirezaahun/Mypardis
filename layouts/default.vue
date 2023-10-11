<template>
  <div class="tw-bg-primary tw-pb-28 md:tw-pb-0">
    <header
      class="tw-sticky tw-top-0 tw-px-4 sm:tw-px-8 tw-z-50 tw-bg-primary-600"
    >
      <DefaultHeader />
    </header>
    <div class="default-layout tw-min-h-[100vh]">
      <div class="tw-py-8">
        <Nuxt />
      </div>
    </div>
    <div class="p-4 tw-block md:tw-hidden">
      <DefaultFooter />
    </div>
    <DefaultSidebar :open="sidebarIsOpen"></DefaultSidebar>

    <div v-if="blockerLoading || transparentLoading">
      <MPLoading
        :blocker-loading="blockerLoading"
        :transparent-loading="transparentLoading"
        class="tw-fixed tw-top-16 tw-right-0 tw-bottom-0 tw-left-0 tw-h-[100vh] tw-z-50"
      />
    </div>
  </div>
</template>

<script>
import DefaultHeader from '~/components/headers/default-header'
import DefaultFooter from '~/components/footer/Default'
import DefaultSidebar from '~/components/sidebar/default'
import MPLoading from '~/components/ui-kit/mp-loading'

export default {
  name: 'Default',
  components: { MPLoading, DefaultSidebar, DefaultFooter, DefaultHeader },
  data() {
    return {
      sidebarIsOpen: false,
      blockerLoading: false,
      transparentLoading: false,
    }
  },
  watch: {
    '$store.state.sidebar.sidebarIsOpen': {
      handler(value) {
        this.sidebarIsOpen = value
      },
    },
    '$route.name': {
      handler() {
        this.sidebarIsOpen = false
      },
    },
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
  },
  mounted() {
    this.sidebarIsOpen = this.$store.state.sidebar.sidebarIsOpen
  },
}
</script>
