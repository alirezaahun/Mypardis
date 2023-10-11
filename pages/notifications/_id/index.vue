<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('receivedMessages')" />
    </div>
    <div class="tw-mt-6">
      <div class="tw-font-semibold tw-text-lg tw-py-2">
        <span>{{ notificationDetail.title ?? '' }}</span>
      </div>
      <div
        class="tw-text-lg tw-pb-4 tw-border-b tw-border-b-gray-200 tw-flex tw-items-center"
      >
        <i class="tw-w-6" v-html="initIcon('schedule')"></i>
        <span class="tw-px-1" />
        <span>{{ notificationDetail.ago ?? '' }}</span>
      </div>
      <div class="tw-text-lg tw-py-4">
        <span>{{ notificationDetail.description ?? '' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import notification from '~/mixins/notification'
import { initIcon } from '~/shared/utility'
import { notifications } from '~/shared/api'

export default {
  name: 'Index',
  components: { BackNavigation },
  mixins: [notification],
  data() {
    return {
      initIcon,
    }
  },
  mounted() {
    this.fetchNotification()
  },
  methods: {
    async fetchNotification() {
      const id = this.$route.params.id ?? null
      await this.$Api.get(notifications.setView(id))
    },
  },
}
</script>
