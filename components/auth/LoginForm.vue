<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
        <TextInput v-model="state.phone" :title="$__('mobilePhoneNumber')" />
      </div>
      <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
        <TextInput
          v-model="state.invite_code"
          :title="$__('IdentificationCode')"
        />
      </div>
    </div>
    <div class="tw-mt-4 tw-text-center">
      <NuxtLink to="/term-and-conditions">
        {{ $__('termsAndConditions') }}
      </NuxtLink>
    </div>
    <div class="tw-mt-8 tw-text-center md:tw-text-start">
      <button
        class="tw-bg-blue-600 hover:tw-bg-blue-500 tw-w-full md:tw-w-max tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
        @click="onLogin"
      >
        {{ $__('sendRequest') }}
      </button>
    </div>
  </div>
</template>

<script>
import { auth } from '~/shared/api'
import TextInput from '~/components/form-field/TextInput'

export default {
  name: 'LoginForm',
  components: { TextInput },
  data() {
    return {
      state: {
        phone: '',
        invite_code: '',
        pushe_token: 'vsvsdvdsds',
      },
    }
  },
  methods: {
    async onLogin() {
      const { data } = await this.$Api.post(auth.registerOrLogin, this.state, { loading: 'TRANSPARENT' })
      if (!data) {
        return
      }

      this.$router.push({
        name: 'auth-confirm-register-code',
        query: {
          phone: this.state.phone,
        },
      })
    },
  },
}
</script>
