<template>
  <div class="tw-text-gray-200">
    <label class="checkbox--primary tw-flex tw-items-start tw-w-fit tw-cursor-pointer" :disabled="disabled">
      <input
        :value="value"
        :checked="value"
        class="checkbox__input"
        :disabled="disabled"
        type="checkbox"
        @input="emitInputValue"
      />
        <span
          class="checkbox__icon tw-w-7 tw-h-7 tw-bg-gray-200 tw-rounded tw-border tw-border-gray-200"
        >
          <i class="tw-w-6" v-html="initIcon('check', '#e5e7eb')"></i>
        </span>
      <span class="tw-px-1" />
        <span class="checkbox__title tw-text-xl">{{ title }}</span>
    </label>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'
export default {
  name: 'MpCheckbox',
  emits: ['input'],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      initIcon,
      inputValue: this.value,
    }
  },
  methods: {
    emitInputValue(e) {
      this.inputValue = e.target.checked
      this.$emit('input', e.target.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &[disabled='true'] {
    pointer-events: none;
    cursor: not-allowed !important;
    opacity: 0.6;
  }

  &__input {
    display: none;
  }

  &__title {
    flex: 1;
  }

  &__icon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    pointer-events: none;
    transition: 0.1s;
  }

  &--primary {
    .checkbox__icon {
      border-color: #e5e7eb;
    }

    .checkbox__input:checked + .checkbox__icon {
      background: #525369;
    }
  }
}
</style>
