<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2 tw-text-center">
        <span>
          {{ $__('enterTheCodeSent') }}
        </span>
      </div>
      <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
        <TextInput :text-center="true" v-model="state.code" />
      </div>
    </div>
    <div class="tw-mt-4">
      <span>{{ remainingTime }}</span>
    </div>
    <div class="tw-mt-8 tw-text-center md:tw-text-start">
      <button
        class="tw-bg-blue-600 hover:tw-bg-blue-500 tw-w-full md:tw-w-max tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
        @click="onLogin"
      >
        {{ $__('send') }}
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/shared/api'
import TextInput from "~/components/form-field/TextInput";

export default {
  name: 'CheckRegisterCode',
  components: {TextInput},
  data() {
    return {
      state: {
        code: '',
      },
      remainingTime: ''
    }
  },
  beforeMount() {
    this.state.phone = this.$route.query.phone ?? ''
  },
  methods: {
    async onLogin() {
      const { data } = await this.$Api.post(auth.checkPhoneAndCode, this.state, { loading: 'TRANSPARENT' })
      if (!data) {
        return
      }

      localStorage.setItem('pardisnow-auth-token', data.message.token)
      window.location.href = window.location.origin
    },
  },
}
</script>
