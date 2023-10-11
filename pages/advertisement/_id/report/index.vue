<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('report')" />
    </div>
    <div>
      <TextareaInput
        v-model="state.description"
        :title="$__('description')"
        class="tw-mt-6"
      />
      <div class="tw-mt-8 tw-text-center md:tw-text-start">
        <button
          class="tw-bg-blue-600 hover:tw-bg-blue-500 tw-w-full md:tw-w-max tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
          @click="createReport"
        >
          {{ $__('report') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextareaInput from "~/components/form-field/TextareaInput";
import { advertisement } from "~/shared/api";

export default {
  name: "index",
  components: {TextareaInput},
  data() {
    return {
      state: {
        description: ''
      }
    }
  },
  methods: {
    async createReport() {
      const id = this.$route.params.id
      await this.$Api.post(advertisement.report(id), this.state, { loading: 'TRANSPARENT' })

      this.$router.push({
        name: 'advertisement-id',
        params: {
          id
        }
      })
    }
  }
}
</script>
