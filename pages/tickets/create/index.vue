<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('ticketRegistration')" />
    </div>
    <div class="tw-mt-8">
      <TextInput v-model="title" :title="$__('title')" />
      <TextareaInput
        v-model="description"
        :title="$__('description')"
        class="tw-mt-6"
      />

      <div class="tw-mt-8 tw-text-start md:tw-text-center">
        <button
          class="tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
          @click="createNewTicket"
        >
          {{ $__('create') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/form-field/TextInput'
import TextareaInput from '~/components/form-field/TextareaInput'
import { tickets } from '~/shared/api'
import BackNavigation from '~/components/back-navigation'

export default {
  name: 'Index',
  components: { TextareaInput, TextInput, BackNavigation },
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    async createNewTicket() {
      const requestBody = {
        title: this.title,
        description: this.description,
      }
      await this.$Api.post(tickets.store, requestBody)
      this.$router.push({
        name: 'tickets',
      })
    },
  },
}
</script>
