<template>
  <div class="tw-bg-primary tw-pb-28 md:tw-pb-0">
    <header
      class="tw-sticky tw-top-0 tw-px-4 sm:tw-px-8 tw-z-50 tw-bg-primary-600"
    >
      <DefaultHeader />
    </header>
    <div class="default-layout tw-min-h-[100vh]">
      <div class="tw-pt-8">
        <Nuxt />
      </div>
    </div>
    <div class="p-4 tw-block md:tw-hidden">
      <DefaultFooter />
    </div>

    <DefaultSidebar :open="sidebarIsOpen"></DefaultSidebar>
  </div>
</template>

<script>
import DefaultHeader from '~/components/headers/default-header'
import DefaultFooter from '~/components/footer/Default'
import DefaultSidebar from '~/components/sidebar/default'

export default {
  name: 'Default',
  components: { DefaultSidebar, DefaultFooter, DefaultHeader },
  data() {
    return {
      sidebarIsOpen: false,
    }
  },
  watch: {
    '$store.state.sidebar.sidebarIsOpen': {
      handler(value) {
        this.sidebarIsOpen = value
      },
    },
  },
  mounted() {
    this.sidebarIsOpen = this.$store.state.sidebar.sidebarIsOpen
  },
}
</script>
