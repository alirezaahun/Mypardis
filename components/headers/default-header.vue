<template>
  <div>
    <div class="tw-hidden md:tw-block">
      <div class="tw-h-16">
        <div class="tw-h-full tw-flex tw-justify-between">
          <div class="tw-flex tw-h-full tw-items-center">
            <i
              ref="menuIcon"
              data-attr="menu-icon"
              class="tw-w-8 tw-transition-all tw-cursor-pointer"
              @click="toggleMenu"
              v-html="initIcon('menu')"
            ></i>
            <div v-if="!fetchUserIsLoading">
              <div v-if="userIsLogin" class="tw-flex tw-items-center">
                <div class="tw-px-2" />
                <NuxtLink to="/my/profile">
                  <img
                    class="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover tw-bg-white tw-p-1"
                    :src="
                      user.profile
                        ? `https://app.pardisnow.ir/${user.profile?.dir}/${user.profile?.path}`
                        : require('~/assets/images/shared/person.png')
                    "
                    alt=""
                  />
                </NuxtLink>
                <div class="tw-px-2" />
                <NuxtLink to="/notifications" class="tw-relative">
                  <i
                    class="tw-w-8 tw-block"
                    v-html="initIcon('notification')"
                  ></i>
                  <div
                    class="tw-absolute tw--top-2 tw--right-1 tw-bg-blue-500 tw-text-sm tw-px-1 tw-rounded-xl tw-font-semibold"
                  >
                    {{ user.notification_count ?? 0 }}
                  </div>
                </NuxtLink>
              </div>
              <div v-if="!userIsLogin" class="tw-flex tw-items-center">
                <div class="tw-px-4" />
                <NuxtLink to="/auth">
                  <button class="tw-bg-blue-600 tw-rounded tw-p-2 tw-text-sm">
                    ورود / ثبت نام
                  </button>
                </NuxtLink>
              </div>
            </div>
            <div class="tw-px-4" />
            <ul class="tw-flex tw-items-center t-p-0">
              <li
                v-for="item in headerMenuItems"
                :key="item.title"
                class="tw-flex"
              >
                <nuxtLink :to="item.to">
                  {{ item.title }}
                </nuxtLink>
                <span class="tw-px-4" />
              </li>
              <li class="tw-flex">
                <span class="tw-px-8" />
                <NuxtLink to="/advertisement/create/categories">
                  <button
                    class="tw-flex tw-items-center tw-bg-blue-600 tw-rounded tw-p-2 tw-text-sm"
                  >
                    <i class="tw-w-4" v-html="initIcon('add')"></i>
                    <span class="tw-px-1" />
                    <span>{{ $__('createNewAdvertisement') }}</span>
                  </button>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="tw-flex tw-items-center tw-h-full">
            <NuxtLink to="/">
              <img
                class="tw-w-16"
                src="~/assets/images/logos/my-pardis-logo.png"
                :alt="$__('myPardis')"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-block md:tw-hidden">
      <div class="tw-h-16">
        <div class="tw-h-full tw-flex tw-justify-between">
          <div class="tw-flex tw-h-full tw-items-center">
            <i
              ref="mobileMenuIcon"
              data-attr="menu-icon"
              class="tw-w-8 tw-transition-all tw-cursor-pointer"
              @click="toggleMenu"
              v-html="initIcon('menu')"
            ></i>
            <div v-if="!fetchUserIsLoading">
              <div v-if="userIsLogin" class="tw-flex tw-items-center">
                <div class="tw-px-2" />
                <NuxtLink to="/my/profile">
                  <img
                    class="tw-w-10 tw-h-10 tw-rounded-full tw-object-cover tw-bg-white tw-p-1"
                    :src="
                      user.profile
                        ? `https://app.pardisnow.ir/${user.profile?.dir}/${user.profile?.path}`
                        : require('~/assets/images/shared/person.png')
                    "
                    alt=""
                  />
                </NuxtLink>
                <div class="tw-px-2" />
                <NuxtLink to="/notifications" class="tw-relative">
                  <i
                    class="tw-w-8 tw-block"
                    v-html="initIcon('notification')"
                  ></i>
                  <div
                    class="tw-absolute tw--top-2 tw--right-1 tw-bg-blue-500 tw-text-sm tw-px-1 tw-rounded-xl tw-font-semibold"
                  >
                    {{ user.notification_count ?? 0 }}
                  </div>
                </NuxtLink>
              </div>
              <div v-if="!userIsLogin" class="tw-flex tw-items-center">
                <div class="tw-px-2" />
                <NuxtLink to="/auth">
                  <button class="tw-bg-blue-600 tw-rounded tw-p-2 tw-text-sm">
                    ورود / ثبت نام
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="tw-flex tw-items-center tw-h-full">
            <NuxtLink to="/">
              <img
                class="tw-w-16"
                src="~/assets/images/logos/my-pardis-logo.png"
                :alt="$__('myPardis')"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import staticData from '~/mixins/staticData'
import { initIcon } from '~/shared/utility'

export default {
  name: 'DefaultHeader',
  mixins: [staticData],
  data: () => {
    return {
      initIcon,
      userIsLogin: false,
      fetchUserIsLoading: false,
      icons: {},
      user: {},
    }
  },
  computed: {
    sidebarIsOpen() {
      return this.$store.state.sidebar.sidebarIsOpen
    },
  },
  watch: {
    '$route.name': {
      handler() {
        this.closeSidebar()
      },
    },
    '$store.state.sidebar.sidebarIsOpen': {
      handler() {
        this.setMenuIconStyle()
      },
    },
    '$store.state.user.user': {
      handler(value) {
        if (!value) {
          return
        }
        if (value.user_id) {
          this.userIsLogin = true
        } else {
          this.userIsLogin = false
        }
        this.user = value
      },
      immediate: true,
    },
    '$store.state.user.fetchUserIsLoading': {
      handler(value) {
        this.fetchUserIsLoading = value
      },
      immediate: true,
    },
  },
  mounted() {
    this.setMenuIconStyle()
  },
  methods: {
    toggleMenu() {
      this.$store.commit('sidebar/setSidebarStatus', !this.sidebarIsOpen)
    },
    setMenuIconStyle() {
      if (this.sidebarIsOpen) {
        this.$refs.menuIcon.classList.add('toggle-menu')
        this.$refs.mobileMenuIcon.classList.add('toggle-menu')
      } else {
        this.$refs.menuIcon.classList.remove('toggle-menu')
        this.$refs.mobileMenuIcon.classList.remove('toggle-menu')
      }
    },
    closeSidebar() {
      this.$store.commit('sidebar/setSidebarStatus', false)
      this.setMenuIconStyle()
    },
  },
}
</script>

<style scoped>
.toggle-menu {
  transform: rotate(90deg);
}
</style>
