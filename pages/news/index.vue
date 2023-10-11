<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('news')" to="/" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div
        v-for="item in newsList"
        :key="item.id"
        class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2"
      >
        <NuxtLink :to="`news/${item.id}`">
          <IntroductionCard
            class="tw-cursor-pointer"
            :title="item.title"
            :subTitle="item.subTitle"
            :description="item.description"
            :imageUrl="item.imageUrl"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import IntroductionCard from '~/components/cards/introduction-card'
import { news } from '~/shared/api'

export default {
  name: 'Index',
  components: { IntroductionCard },
  layout: 'default',
  data() {
    return {
      newsList: [],
    }
  },
  beforeMount() {
    this.fetchNewsList()
  },
  methods: {
    async fetchNewsList() {
      const { data } = await this.$Api.get(news.list, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.newsList.length = 0
      if (data.length) {
        this.newsList = data.map((el) => {
          return {
            id: el.id,
            title: el.title,
            subTitle: el.min_description,
            description: el.ago,
            imageUrl: `https://app.pardisnow.ir/${el.photo.dir}/${el.photo.path}`,
          }
        })
      }
    },
  },
}
</script>
