<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('advertisements')" />
    </div>
    <div v-if="adsList.length" class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div
        v-for="item in adsList"
        :key="item.id"
        class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2"
      >
        <NuxtLink :to="`/advertisement/${item.id}`">
          <IntroductionCard
            class="tw-cursor-pointer"
            :title="item.title"
            :description="item.ago"
            :image-url="`https://app.pardisnow.ir/${item?.photo?.dir}/${item?.photo?.path}`"
          />
        </NuxtLink>
      </div>
    </div>
    <div v-else class="tw-flex tw-justify-around tw-items-center tw-h-80">
      <span>{{ $__('notAdsInCategory') }}</span>
    </div>
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import { advertisement } from '~/shared/api'
import IntroductionCard from '~/components/cards/introduction-card'

export default {
  name: 'Index',
  components: { IntroductionCard, BackNavigation },
  layout: 'default',
  data() {
    return {
      adsList: [],
    }
  },
  beforeMount() {
    this.fetchAdsByCategoryId()
  },
  methods: {
    async fetchAdsByCategoryId() {
      const id = Number(this.$route.params.id)
      const { data } = await this.$Api.get(
        advertisement.getAdvertisingByCategory(id),
        { loading: 'BLOCKER' }
      )
      if (!data) {
        return
      }

      if (data.length) {
        this.adsList = data
      }
    },
  },
}
</script>
