<template>
  <div>
    <div class="">
      <div class="tw-pt-[70%] tw-relative tw-rounded-xl tw-overflow-hidden">
        <img
          class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-left-0 tw-object-cover"
          :src="imageUrl"
          alt=""
        />
      </div>
      <div class="tw-p-2 tw-flex tw-justify-between tw-items-start">
        <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis tw-flex-1">
          <span>{{ title }}</span>
        </p>
        <span class="tw-px-1" />
        <div class="tw-flex tw-items-center">
          <span class="tw-text-green-500">{{ rating }}</span>
          <span class="tw-pr-1" />
          <i class="tw-w-5 tw-block" v-html="initIcon('star', '#22c55e')"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'MPVerticalCard',
  props: {
    title: {
      required: true,
      type: String,
      default: '',
    },
    imageUrl: {
      required: true,
      type: String,
      default: '',
    },
    rating: {
      required: true,
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      initIcon,
    }
  },
}
</script>
