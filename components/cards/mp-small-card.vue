<template>
  <div>
    <div class="tw-p-2 tw-flex tw-items-center tw-rounded-xl tw-bg-primary-600 tw-text-white hover:tw-bg-primary-400 tw-transition-all">
      <div>
        <img class="tw-w-16 tw-h-16 tw-rounded tw-shadow-default tw-object-cover" :src="imageUrl" alt="">
      </div>
      <div class="tw-flex-1 tw-flex">
        <span class="tw-px-2" />
        <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis">
          <span>{{ title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MPSmallCard",
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
