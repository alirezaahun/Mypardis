<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('myAd')" to="/" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="item in adsList">
        <div
          :key="item.id"
          class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-hidden md:tw-block"
        >
          <AdCard :card-model="item" @view="onViewAd" @edit="onEditAd" @delete="onDeleteAd" />
        </div>

        <div
          @click="showAdsCardActions(item)"
          :key="item.id"
          class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-block md:tw-hidden"
        >
          <NuxtLink :to="`advertisement/actions/${item.id}`">
            <AdCard :card-model="item" @view="onViewAd" @edit="onEditAd" @delete="onDeleteAd" />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AdCard from '~/components/cards/ad-card'
import BackNavigation from '~/components/back-navigation'
import { advertisement } from '~/shared/api'

export default {
  name: 'Advertisement',
  components: { AdCard, BackNavigation },
  layout: 'default',
  data() {
    return {
      adsList: [],
    }
  },
  beforeMount() {
    this.fetchAllAds('BLOCKER')
  },
  methods: {
    async fetchAllAds(loading) {
      const { data } = await this.$Api.get(advertisement.getAllAds, {
        loading
      })
      if (!data) {
        return
      }

      this.adsList.length = 0
      if (data.length) {
        this.adsList = data
      }
    },
    onViewAd(item) {
      this.$router.push({
        name: 'advertisement-id',
        params: {
          id: item.id
        }
      })
    },
    onEditAd(item) {
      this.$router.push({
        name: 'advertisement-edit-id',
        params: {
          id: item.id
        }
      })
    },
    async onDeleteAd(item) {
      await this.$Api.delete(advertisement.delete(item.id), { loading: 'TRANSPARENT' })
      this.fetchAllAds('TRANSPARENT')
    },
  },
}
</script>
