<template>
  <div
    class="tw-rounded tw-border tw-border-white tw-h-32 tw-overflow-hidden hover:tw-bg-primary-400 tw-transition-all"
  >
    <div class="tw-flex tw-justify-between tw-items-center tw-h-full">
      <div class="tw-flex tw-flex-col tw-justify-between tw-px-2 tw-py-3 tw-flex-1 tw-h-full">
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span class="tw-font-bold">{{ title }}</span>
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span v-html="subTitle" />
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span>{{ description }}</span>
        </p>
      </div>
      <div>
        <img
          class="tw-w-32 tw-h-32 tw-object-cover"
          :src="imageUrl"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'IntroductionCard',
  props: {
    title: {
      Type: String,
      required: false,
      default: ''
    },
    subTitle: {
      Type: String,
      required: false,
      default: ''
    },
    description: {
      Type: String,
      required: false,
      default: ''
    },
    imageUrl: {
      Type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      initIcon
    }
  }
}
</script>
