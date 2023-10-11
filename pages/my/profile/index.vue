<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('profile')" />
    </div>
    <div class="tw-mt-4">
      <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
        <div class="tw-col-span-12 tw-text-center tw-py-4 tw-px-2">
          <label
            for="avatar"
            class="tw-cursor-pointer tw-w-28 tw-p-1 tw-h-28 tw-rounded-full tw-bg-white tw-m-auto md:tw-m-0 tw-block tw-overflow-hidden tw-border-2 tw-border-primary-700 tw-shadow-default"
          >
            <img class="tw-w-full tw-h-full tw-object-cover tw-rounded-full" :src="previewAvatar ?? require('~/assets/images/shared/person.png')" alt="">
          </label>
          <input
            id="avatar"
            type="file"
            class="tw-w-0 tw-h-0"
            accept="image/*"
            @input="changeAvatar"
          />
          <p class="tw-text-center md:tw-text-end tw--mt-2">
            {{ $__('photoUpload') }}
          </p>
        </div>
        <div class="tw-col-span-12 md:tw-col-span-6 tw-py-3 tw-px-0 md:tw-px-2">
          <TextInput v-model="state.first_name" :title="$__('firstName')" />
        </div>
        <div class="tw-col-span-12 md:tw-col-span-6 tw-py-3 tw-px-0 md:tw-px-2">
          <TextInput v-model="state.last_name" :title="$__('lastName')" />
        </div>
        <div class="tw-col-span-12 md:tw-col-span-6 tw-py-3 tw-px-0 md:tw-px-2">
          <TextInput v-model="state.email" :title="$__('email')" />
        </div>
        <div class="tw-col-span-12 md:tw-col-span-6 tw-py-3 tw-px-0 md:tw-px-2">
          <TextInput v-model="state.bank_number" :title="$__('creditNo')" />
        </div>
      </div>

      <div class="tw-block tw-mt-8 tw-text-center md:tw-text-start">
        <button
          class="tw-w-full md:tw-w-max tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
          @click="editProfile"
        >
          {{ $__('edit') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/form-field/TextInput'
import BackNavigation from '~/components/back-navigation'
import { auth, share } from '~/shared/api'

export default {
  name: 'Index',
  components: { TextInput, BackNavigation },
  layout: 'default-no-footer',
  data() {
    return {
      user: {},
      userProfile: null,
      previewAvatar: null,
      state: {
        profile: '',
        first_name: '',
        last_name: '',
        email: '',
        bank_number: '',
      },
    }
  },
  watch: {
    '$store.state.user.user': {
      handler(value) {
        if (!value) {
          return
        }
        if (value.profile && value.profile.dir && value.profile.path) {
          this.previewAvatar = `https://app.pardisnow.ir/${value.profile.dir}/${value.profile.path}`
        }
        this.state = {
          first_name: value.first_name ?? '',
          last_name: value.last_name ?? '',
          email: value.email ?? '',
          bank_number: value.bank_number ?? '',
        }
        this.user = value
      },
      immediate: true,
    },
  },
  methods: {
    async editProfile() {
      await this.$Api.post(auth.updateProfile, this.state, { loading: 'TRANSPARENT' })
      this.user = {
        ...this.user,
        emil: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        bank_number: this.state.bank_number,
        profile: this.userProfile
      }
      this.$store.commit('user/setUser', this.user)
    },
    async changeAvatar(e) {
      const file = e.target.files[0]
      this.previewAvatar = URL.createObjectURL(file)
      const formData = new FormData
      formData.append('file', file)
      const { data } = await this.$Api.post(share.uploadFile, formData, { loading: 'TRANSPARENT' })
      if (!data) {
        return
      }

      this.state.profile = data.id
      this.previewAvatar = `https://app.pardisnow.ir/${data.dir}/${data.path}`
      this.userProfile = data
    },
  },
}
</script>
