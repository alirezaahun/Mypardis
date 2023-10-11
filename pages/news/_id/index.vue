<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('newsDetail')" to="/" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-2 sm:tw-order-1"
      >
        <h3 class="tw-font-bold tw-text-xl">{{ newsDetail.title ?? '' }}</h3>
        <div class="tw-flex tw-mt-2">
          <i class="tw-w-6" v-html="initIcon('schedule')"></i>
          <span class="tw-px-1" />
          <span>{{ newsDetail.ago ?? '' }}</span>
        </div>
        <div class="tw-mt-6" v-html="newsDetail?.description" />
      </div>
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-1 sm:tw-order-2"
      >
        <img
          class="tw-w-full tw-rounded-xl"
          :src="`https://app.pardisnow.ir/${newsDetail?.photo?.dir}/${newsDetail?.photo?.path}`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'
import { news } from "~/shared/api";

export default {
  name: 'Index',
  data() {
    return {
      initIcon,
      newsDetail: {}
    }
  },
  methods: {
    async fetchNewsDetail() {
      const newsId = Number(this.$route.params.id)
      const { data } = await this.$Api.get(news.getById(newsId), { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.newsDetail = data
    }
  },
  beforeMount() {
    this.fetchNewsDetail()
  }
}
</script>
