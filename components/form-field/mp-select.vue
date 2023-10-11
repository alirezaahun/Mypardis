<template>
  <div
    v-click-outside="closeOptionsList"
    class="custom-select tw-text-gray-200"
  >
    <div
      class="select-selected tw-relative tw-flex tw-items-center tw-justify-between tw-px-4 tw-w-full tw-h-14 tw-border tw-border-gray-200 tw-rounded"
      @click="toggleSelect"
    >
      <div>
        <span class="tw-text-xl">{{ inputValue.value ?? '' }}</span>
      </div>
      <i class="tw-w-6" v-html="initIcon('expandMore')"></i>

      <span
        class="title tw-bg-primary tw-px-2 tw-transition-all tw-text-lg"
        :class="[inputValue.value ? 'title-open' : '']"
        @click="toggleSelect"
        >{{ `${title} ${validation.required ? '*' : ''}` }}</span
      >
    </div>
    <div
      class="select-items tw-bg-primary-400 tw-mt-2 tw-rounded tw-border-gray-300 tw-border-2"
      :class="[!isShowOptions && 'select-hide']"
    >
      <div
        v-if="!items.length"
        class="tw-text-md hover:tw-bg-primary-500 tw-p-3 tw-cursor-pointer"
      >
        {{ $__('thereIsNotAnyItem') }}
      </div>
      <template v-for="item in items">
        <div
          :key="item.value"
          class="tw-text-xl hover:tw-bg-primary-500 tw-p-3 tw-cursor-pointer"
          @click="selectItem(item)"
        >
          {{ item.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'MpSelect',
  props: {
    value: {
      type: {
        text: '',
        value: '',
      },
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    validation: {
      required: false,
      default: {
        required: false,
      },
    },
    items: {
      type: [],
      required: false,
      default: [],
    },
  },
  data() {
    return {
      initIcon,
      inputValue: this.value,
      isShowOptions: false,
    }
  },
  methods: {
    selectItem(item) {
      this.inputValue = item
      this.$emit('input', item)
      this.closeOptionsList()
    },
    toggleSelect(e) {
      e.stopPropagation()
      this.isShowOptions = !this.isShowOptions
    },
    emitInputValue(e) {
      this.$emit('input', e.target.value)
    },
    closeOptionsList() {
      this.isShowOptions = false
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
}

.custom-select select {
  display: none;
}

.select-selected {
  background-color: transparent;
}

.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

.select-items div,
.select-selected {
  user-select: none;
}

.select-items {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 40;
}

.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.title {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translate(0, -50%);

  &-open {
    transform: translate(0, -150%);
  }
}
</style>
