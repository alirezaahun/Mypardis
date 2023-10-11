<template>
  <div ref="formWrapper">
    <slot></slot>
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  name: 'FormWrapper',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formIsValid: true
    }
  },
  watch: {
    formData: {
      handler(value) {
        const isValidItems = Object.values(value).filter(el => el.isValid === false)
        if (isValidItems.length) {
          this.formIsValid = false
        } else {
          this.formIsValid = true
        }
      },
      deep: true
    },
    formIsValid: {
      handler(value) {
        this.$emit('isValid', value)
      }
    }
  }
}
</script>
