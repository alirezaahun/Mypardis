<template>
  <div class="tw-flex tw-justify-between">
    <div class="">
      <NuxtLink :to="to">
        <i class="tw-w-16" v-html="initIcon('chevronRight')"></i>
      </NuxtLink>
    </div>
    <div class="tw-flex-1">
      <p>
        <span>{{ title }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'MPBackNavigation',
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    to: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      initIcon
    }
  }
}
</script>
