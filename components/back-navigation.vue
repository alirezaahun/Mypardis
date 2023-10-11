<template>
  <div class="tw-flex tw-justify-between tw-items-center">
    <div class="tw-flex-1">
      <h1 class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis">
        <span class="tw-text-1.5xl tw-font-bold">{{ title }}</span>
      </h1>
    </div>
    <div>
      <NuxtLink v-if="to" :to="to">
        <i class="tw-block tw-w-8" v-html="initIcon('backArrow')"></i>
      </NuxtLink>
      <i v-else class="tw-block tw-w-8 tw-cursor-pointer" v-html="initIcon('backArrow')" @click="$router.go(-1)"></i>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'BackNavigation',
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
