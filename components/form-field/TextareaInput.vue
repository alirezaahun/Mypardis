<template>
  <div>
    <div
      class="textarea-input tw-relative tw-border tw-border-gray-300 tw-text-gray-200 tw-rounded tw-p-3 tw-w-full tw-text-xl"
    >
      <textarea
        ref="input"
        :value="value"
        class="textarea-input__input tw-h-full tw-bg-transparent tw-w-full"
        :placeholder="placeholder"
        :required="required"
        type="text"
        @input="emitInputValue"
        @focus="onInputFocus"
        @focusout="onInputFocusout"
      >
      </textarea>
      <span
        @click="onTitleClick"
        class="textarea-input__title tw-bg-primary tw-px-2 tw-transition-all tw-text-lg"
        :class="[titleStatus === 'open' ? 'textarea-input__title-open' : '']"
        >{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextareaInput',
  props: {
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      inputValue: '',
      isFocused: false,
    }
  },
  computed: {
    titleStatus() {
      if (this.isFocused || this.value) {
        return 'open'
      }

      return 'close'
    },
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
    },
    onTitleClick() {
      this.$refs.input.focus()
    }
  },
}
</script>

<style scoped lang="scss">
.textarea-input {
  background: transparent;
  outline: none;
  min-height: 150px;

  &__input {
    outline: none;
    min-height: 150px
  }

  &__title {
    position: absolute;
    right: 0.5rem;
    top: 10px;

    &-open {
      top: -15px;
    }
  }
}
</style>
