<template>
  <div>
    <div class="text-input tw-relative tw-border-2 tw-border-white tw-rounded tw-h-14 tw-px-3 tw-w-full tw-text-xl">
      <input  :value="value"
              @input="emitInputValue"
              class="text-input__input tw-h-full tw-bg-transparent tw-w-full"
              :placeholder="placeholder"
              :required="required"
              @focus="onInputFocus"
              @focusout="onInputFocusout"
              type="text">
      <span class="text-input__title tw-bg-primary tw-px-2 tw-transition-all tw-text-lg" :class="[this.titleStatus === 'open' ? 'text-input__title-open' : '']">{{ title }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'textInput',
  props: {
    value: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      inputValue: '',
      isFocused: false
    }
  },
  computed: {
    titleStatus() {
      if (this.isFocused || this.value) {
        return 'open'
      }

      return 'close'
    }
  },
  methods: {
    emitInputValue(e) {
      this.$emit('input', e.target.value)
    },
    onInputFocus() {
      this.isFocused = true
    },
    onInputFocusout() {
      this.isFocused = false
    }
  }

}
</script>

<style scoped lang="scss">
  .text-input {
    background: transparent;
    outline: none;

    &__input {
      outline: none;
    }

    &__title {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translate(0, -50%);

      &-open {
        transform: translate(0, -150%);
      }
    }
  }
</style>
