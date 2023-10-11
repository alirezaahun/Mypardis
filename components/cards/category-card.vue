<template>
  <div class="tw-flex tw-items-center">
    <div>
      <img class="tw-w-16 tw-h-16 tw-rounded tw-shadow-default tw-object-cover" :src="imageUrl" alt="">
    </div>
    <div class="tw-flex-1 tw-flex">
      <span class="tw-px-2" />
      <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis">
        <span>{{ title }}</span>
      </p>
    </div>
    <i class="tw-w-6" v-html="initIcon('chevronLeft')"></i>
  </div>
</template>

<script>
import { initIcon } from "~/shared/utility";

export default {
  name: "CategoryCard",
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    imageUrl: {
      required: true,
      type: String,
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
