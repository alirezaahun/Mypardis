<template>
  <div class="tw-bg-dark tw-bg-opacity-40 tw-p-2 tw-flex tw-flex-items tw-justify-between">
    <div @click="onFavorite" class="tw-p-1 tw-bg-white hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full">
      <i class="tw-w-8 tw-block" v-html="initIcon('favorite', bookmarked ? '#ef4444' : '#0ea5e9')"></i>
    </div>
    <a :href="`tel:${phoneNumber}`">
      <div class="tw-p-1 tw-bg-white hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full">
        <i class="tw-w-8 tw-block" v-html="initIcon('phone', '#0ea5e9')"></i>
      </div>
    </a>
    <div class="tw-p-1 tw-bg-white hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full">
      <i class="tw-w-8 tw-block" v-html="initIcon('share', '#0ea5e9')"></i>
    </div>
    <a v-if="lat && lng" :href="`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`" target="_blank">
      <div class="tw-p-1 tw-bg-white hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full">
        <i class="tw-w-8 tw-block" v-html="initIcon('location', '#0ea5e9')"></i>
      </div>
    </a>
    <NuxtLink :to="`/advertisement/${$route.params.id}/report`">
      <div class="tw-p-1 tw-bg-white hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full">
        <i class="tw-w-8 tw-block" v-html="initIcon('error', '#0ea5e9')"></i>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import { initIcon } from "~/shared/utility";

export default {
  name: "AdsActions",
  emits: ['onFavorite'],
  props: {
    phoneNumber: {
      type: String,
      required: true,
      default: ''
    },
    lat: {
      type: String,
      required: true,
      default: ''
    },
    lng: {
      type: String,
      required: true,
      default: ''
    },
    bookmarked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      initIcon
    }
  },
  methods: {
    onFavorite() {
      this.$emit('onFavorite')
    }
  }
}
</script>
