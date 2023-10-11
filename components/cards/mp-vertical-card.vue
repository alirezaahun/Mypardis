<template>
  <div>
    <div class="">
      <div class="tw-pt-[70%] tw-relative tw-rounded-xl tw-overflow-hidden">
        <img class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-left-0 tw-object-cover" :src="imageUrl" alt="">
      </div>
      <div class="tw-p-2 tw-flex">
        <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis">
          <span>{{ title }}</span>
        </p>
        <span class="tw-px-1" />
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MPVerticalCard",
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
