<template>
  <div class="tw-relative tw-rounded">
    <div
      v-if="!showMap"
      class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-bg-dark tw-bg-opacity-50 tw-z-40"
    >
      <div
        class="tw-w-full tw-h-full tw-flex tw-justify-around tw-items-center"
      >
        <div class="tw-flex tw-items-center tw-flex-col">
          <div
            v-if="latLng && latLng.length"
            class="tw-bg-green-600 tw-rounded-full tw-p-2 tw-mb-4"
          >
            <i class="tw-w-12 tw-block" v-html="initIcon('check')"></i>
          </div>
          <button
            class="tw-w-max tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
            @click="handleShowMap"
          >
            {{ latLng && latLng.length ? $__('editLocation') : $__('selectLocation') }}
          </button>
        </div>
      </div>
    </div>
    <MpSelectLocation v-model="latLng" class="tw-w-full tw-h-80" />
    <button
      v-if="latLng && latLng.length"
      class="tw-absolute tw-bottom-6 tw-left-4 tw-w-max tw-bg-green-600 hover:tw-bg-green-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
      @click="saveLocation"
    >
      {{ $__('saveLocation') }}
    </button>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'
import MpSelectLocation from '~/components/ui-kit/mp-select-location'
export default {
  name: 'CreateAdSelectLocation',
  components: { MpSelectLocation },
  props: {
    value: {
      type: Array,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      initIcon,
      latLng: [],
      showMap: false,
    }
  },
  watch: {
    value: {
      handler(value) {
        this.latLng = value
      },
      immediate: true
    }
  },
  methods: {
    handleShowMap() {
      this.showMap = true
    },
    saveLocation() {
      this.showMap = false
      this.$emit('input', this.latLng)
    },
  },
}
</script>

<style scoped></style>
