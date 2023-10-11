<template>
  <div>
    <div
      :class="errorMessageList.length ? 'tw-border-red-500' : 'tw-border-gray-300'"
      class="text-input tw-relative tw-border tw-border-gray-300 tw-text-gray-200 tw-rounded tw-h-14 tw-px-3 tw-w-full tw-text-xl"
    >
      <input
        ref="input"
        :value="value"
        class="text-input__input tw-h-full tw-bg-transparent tw-w-full"
        :class="[textCenter ? 'tw-text-center' : '']"
        :placeholder="placeholder"
        :required="validation?.required"
        :isValid="isValid"
        type="text"
        @input="emitInputValue"
        @focus="onInputFocus"
        @focusout="onInputFocusout"
      />
      <span
        class="text-input__title tw-bg-primary tw-px-2 tw-transition-all tw-text-lg"
        :class="[titleStatus === 'open' ? 'text-input__title-open' : '']"
        @click="onTitleClick"
        >{{ `${title} ${validation.required ? '*' : ''}` }}</span
      >
      <div
        v-if="errorMessageList.length"
        class="tw-absolute tw--bottom-3 tw-right-2 tw-bg-primary tw-text-red-500 tw-px-2"
      >
        <span class="tw-text-sm tw-rounded">
          {{ errorMessageList[0].text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
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
    title: {
      type: String,
      required: false,
      default: '',
    },
    textCenter: {
      type: Boolean,
      required: false,
      default: false,
    },
    validation: {
      required: false,
      default: {
        required: false
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      inputValue: this.value,
      errorMessageList: [],
      isFocused: false,
      isValid: true,
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
      this.inputValue = e.target.value
      this.$emit('input', e.target.value)
    },
    onInputFocus() {
      this.isFocused = true
    },
    onInputFocusout() {
      if (this.validation.required && !this.inputValue) {
        this.isValid = false
        this.errorMessageList.push({
          type: 'required',
          text: this.$__('fillFieldIsRequired')
        })
      }
      this.isFocused = false
    },
    onTitleClick() {
      this.$refs.input.focus()
    },
  },
  watch: {
    value: {
      handler(value) {
        this.inputValue = value
      }
    },
    inputValue: {
      handler(value) {
        if (value && this.validation.required && this.errorMessageList.findIndex(el => el.type === 'required') !== -1) {
          this.errorMessageList = this.errorMessageList.filter(el => el.type !== 'required')
        }

        if (value && this.validation.required) {
          this.isValid = true
        }

        if (!value && this.validation.required) {
          this.isValid = false
        }
      },
      immediate: true
    },
    isValid: {
      handler(value) {
        if (this.validation.required && !this.inputValue) {
          this.isValid = false
        }
        this.$emit('isValid', value)
      },
      immediate: true
    }
  },
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
