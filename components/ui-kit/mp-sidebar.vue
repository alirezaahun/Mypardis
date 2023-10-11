<template>
  <div
    v-click-outside="closeSidebar"
    class="sidebar-width tw-fixed tw-top-16 tw-bottom-0 tw-z-40 sidebar-transition tw-shadow-default tw-bg-primary tw-opacity-90"
    :class="[open ? 'tw-right-0' : 'sidebar-close']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MPSidebar',
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    closeSidebar(e) {
      if (e.target.closest('[data-attr="menu-icon"]')) {
        return
      }
      this.$store.commit('sidebar/setSidebarStatus', false)
    },
  },
  watch: {
    '$route.name': {
      handler() {
        this.$store.commit('sidebar/setSidebarStatus', false)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.sidebar-transition {
  transition: right 400ms;
}
.sidebar-width {
  width: 25%;
}

.sidebar-close {
  right: -27%;
}

@media (max-width: 640px) {
  .sidebar-width {
    width: 80%;
  }

  .sidebar-close {
    right: -82%;
  }
}
</style>
