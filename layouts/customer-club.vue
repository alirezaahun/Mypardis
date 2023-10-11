<template>
  <div class="tw-bg-primary tw-pb-28 md:tw-pb-0">
    <header
      class="tw-sticky tw-top-0 tw-px-4 sm:tw-px-8 tw-z-50 tw-bg-primary-600"
    >
      <DefaultHeader />
    </header>
    <div class="default-layout tw-min-h-[100vh]">
      <div class="tw-pt-8 tw-pb-0 md:tw-pb-8">
        <div
          class="tw-flex tw-items-center tw-justify-around md:tw-justify-start"
        >
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.title"
            active-class="tw-border-b tw-border-white"
            class="tw-px-4 tw-py-2 tw-border-b tw-border-transparent hover:tw-bg-primary-400"
            :to="tab.to"
          >
            <span>{{ tab.title }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="$route.name !== 'customer-club-score-report'"
          class="tw-flex tw-items-center tw-justify-around md:tw-justify-start tw-mt-4 tw-bg-white md:tw-bg-transparent tw-px-4 tw-py-4 md:tw-px-0 tw-rounded-tl-xl tw-rounded-tr-xl"
        >
          <template v-for="item in sorts">
            <div :key="item.title" class="tw-flex">
              <NuxtLink :to="item.to">
                <button
                  class="tw-flex tw-items-center tw-bg-blue-400 hover:tw-bg-blue-500 tw-px-4 tw-py-2 tw-rounded"
                >
                  <span class="tw-text-sm">{{ item.title }}</span>
                  <span class="tw-px-1" />
                  <i class="tw-w-6 tw-block" v-html="initIcon(item.icon)"></i>
                </button>
              </NuxtLink>
              <span class="tw-px-2 tw-hidden md:tw-block" />
            </div>
          </template>
        </div>
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
import { initIcon } from '~/shared/utility'
import MPLoading from "~/components/ui-kit/mp-loading";

export default {
  name: 'CustomerClub',
  components: {MPLoading, DefaultSidebar, DefaultFooter, DefaultHeader },
  data({ $__ }) {
    return {
      initIcon,
      sidebarIsOpen: false,
      tabs: [
        {
          title: $__('customerClub'),
          to: '/customer-club/cash-prize',
        },
        {
          title: $__('scoreReport'),
          to: '/customer-club/score-report',
        },
      ],
      sorts: [
        {
          title: $__('cashPrize'),
          to: '/customer-club/cash-prize',
          icon: 'payments',
        },
        {
          title: $__('nonCashPrize'),
          to: '/customer-club/non-cash-prize',
          icon: 'redeem',
        },
      ],
      blockerLoading: false,
      transparentLoading: false,
    }
  },
  watch: {
    '$route.name': {
      handler() {
        this.sidebarIsOpen = false
      },
    },
    '$store.state.sidebar.sidebarIsOpen': {
      handler(value) {
        this.sidebarIsOpen = value
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
    },
  },
  mounted() {
    this.sidebarIsOpen = this.$store.state.sidebar.sidebarIsOpen
  },
}
</script>
