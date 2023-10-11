<template>
  <div>
    <MPSidebar class="tw-p-4 tw-overflow-y-auto default-scrollbar" :open="open">
      <div class="tw-border-b tw-border-b-white tw-pb-4 tw-mb-4">
        <div class="tw-flex tw-justify-center">
          <img class="tw-w-16 tw-h-16 tw-object-cover tw-rounded-full" :src="user?.profile ? `https://app.pardisnow.ir/${user?.profile?.dir}/${user?.profile?.path}` : require('~/assets/images/shared/person.png')" alt="">
        </div>
        <div class="tw-flex tw-flex-col tw-items-center">
          <span class="tw-pt-2">{{ `${user.first_name ?? ''} ${user.last_name ?? ''}` }}</span>
          <div class="tw-flex tw-items-center">
            <i class="tw-w-6" v-html="initIcon('diamond')"></i>
            <span class="tw-px-1" />
            <span>{{ user.score ?? '0' }} امتیاز</span>
          </div>
          <span>
            <span>{{ $__('IdentificationCode') }}: </span>
            <span>{{ user.invite_code ?? '' }}</span>
          </span>
        </div>
        <div class="tw-text-center">
          <NuxtLink to="/my/profile" class="tw-text-blue-400">
            {{ $__('profile') }}
          </NuxtLink>
        </div>
      </div>
      <ul>
        <li class="tw-py-2" v-for="item in sidebarMenuList" :key="item.title">
          <NuxtLink class="tw-flex tw-justify-between tw-items-center " :to="item.to">
            <div class="tw-flex tw-items-center">
              <div class="tw-p-1 tw-rounded tw-bg-white">
                <i class="tw-w-6 tw-block" v-html="initIcon(item.icon, '#444557')" />
              </div>
              <span class="tw-pr-4" />
              <span>{{ item.title }}</span>
            </div>
            <i class="tw-w-8" v-html="initIcon('chevronLeft')" />
          </NuxtLink>
        </li>
        <li @click="signOut" class="tw-flex tw-justify-between tw-items-center tw-py-2 tw-cursor-pointer">
          <div class="tw-flex tw-items-center">
            <div class="tw-p-1 tw-rounded tw-bg-white">
              <i class="tw-w-6 tw-block" v-html="initIcon('logout', '#444557')" />
            </div>
            <span class="tw-pr-4" />
            <span>{{ $__('signOutOfTheUserAccount') }}</span>
          </div>
          <i class="tw-w-6" v-html="initIcon('chevronLeft')" />
        </li>
      </ul>
    </MPSidebar>
  </div>
</template>

<script>
import MPSidebar from "~/components/ui-kit/mp-sidebar";
import { initIcon } from "~/shared/utility";

export default {
  name: "DefaultSidebar",
  components: {MPSidebar},
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data({ $__ }) {
    return {
      initIcon,
      user: {},
      sidebarMenuList: [
        {
          title: $__('home'),
          to: '/',
          icon: 'home'
        },
        {
          title: $__('myAd'),
          to: '/advertisement',
          icon: 'comment'
        },
        {
          title: $__('wallet'),
          to: '/wallet',
          icon: 'wallet'
        },
        {
          title: $__('bookmarks'),
          to: '/bookmark',
          icon: 'bookmark'
        },
        {
          title: $__('specialAdRequest'),
          to: '/',
          icon: 'comment'
        },
        {
          title: $__('applicationTraining'),
          to: '/app-training',
          icon: 'onDeviceTraining'
        },
        {
          title: $__('ticketSupport'),
          to: '/tickets',
          icon: 'supportAgent'
        },
        {
          title: $__('contactUs'),
          to: '/contact-us',
          icon: 'phone'
        },
        {
          title: $__('termsAndConditions'),
          to: '/term-and-conditions',
          icon: 'gavel'
        },
        {
          title: $__('aboutMyPardis'),
          to: '/about-us',
          icon: 'group'
        },
      ]
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('pardisnow-auth-token')
      this.$router.push({
        name: 'auth'
      })
    }
  },
  watch: {
    '$store.state.user.user': {
      handler(value) {
        if (!value) {
          return
        }
        this.user = value
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>

</style>
