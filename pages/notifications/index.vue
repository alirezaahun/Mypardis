<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('receivedMessages')" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="item in notificationsList">
        <div
          :key="item.id"
          class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2"
        >
          <NuxtLink :to="`/notifications/${item.id}`">
            <IntroductionCard
              class="tw-cursor-pointer"
              :title="item.title ?? ''"
              :sub-title="item.ago ?? ''"
              :description="item.viewed ? $__('seen') : $__('notSeen')"
              :image-url="require('~/assets/images/shared/notification.jpg')"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import IntroductionCard from '~/components/cards/introduction-card'
import notification from '~/mixins/notification'

export default {
  name: 'Index',
  components: { IntroductionCard, BackNavigation },
  mixins: [notification],
}
</script>
