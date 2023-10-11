<template>
  <div>
    <input class="tw-bg-primary tw-border-white tw-border" v-model="phoneNumber" type="text" />
    <button @click="onLogin">ارسال درخواست</button>
  </div>
</template>

<script>
import { auth } from '~/shared/api'

export default {
  name: 'LoginForm',
  data() {
    return {
      phoneNumber: '',
    }
  },
  methods: {
    async onLogin() {
      const { data } = await this.$Api.post(auth.registerOrLogin, {
        phone: this.phoneNumber,
        pushe_token: 'vsvsdvdsds',
        invite_code: '',
      })

      if (!data) {
        return
      }

      console.log(data);
    },
  },
}
</script>
