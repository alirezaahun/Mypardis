<template>
  <div>
    <div class="tw-rounded-xl tw-bg-primary-600 tw-text-white tw-overflow-hidden hover:tw-bg-primary-400 tw-transition-all">
      <div class="tw-pt-[90%] tw-relative">
        <img class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-left-0 tw-rounded tw-object-cover" :src="imageUrl" alt="">
      </div>
      <div class="tw-p-2 tw-h-16">
        <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis">
          <span>{{ title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MPAllInOneCard",
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
  }
}
</script>
