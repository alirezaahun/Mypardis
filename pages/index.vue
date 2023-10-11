<template>
  <div class="tw-py-12">
    <LandingFirstViewCarousel :list="favoriteAds" />

    <div v-if="categories.length" class="tw-mt-12">
      <h3 class="tw-text-1.5xl tw-m-0 tw-font-bold">{{ $__('category') }}</h3>
      <div class="tw-mt-4">
        <div class="tw--me-2 md:tw--mx-4">
          <carousel
            v-bind="carouselOptions"
            :per-page-custom="[
              [0, 1.5],
              [767, 3],
              [1024, 4],
            ]"
          >
            <slide
              v-for="item in categories"
              :key="item.id"
              class="tw-px-2 md:tw-px-4"
              @slideclick="() => navigateToDetailCard('categories-id', item.id)"
            >
              <MPCard
                class="tw-cursor-pointer"
                :title="item.title"
                :image-url="`https://app.pardisnow.ir/${item?.photo?.dir}/${item?.photo?.path}`"
                type="small"
              />
            </slide>
          </carousel>
        </div>
      </div>
    </div>

    <div v-if="newsList && newsList.length" class="tw-mt-12">
      <h3 class="tw-text-1.5xl tw-m-0 tw-font-bold">{{ $__('news') }}</h3>
      <div :key="newsList.length" class="tw-mt-4">
        <div class="tw--me-2 md:tw--mx-4">
          <carousel
            v-bind="carouselOptions"
            :per-page-custom="[
              [0, 1.5],
              [767, 3],
              [1024, 4],
            ]"
          >
            <slide
              v-for="item in newsList"
              :key="item.id"
              class="tw-px-2 md:tw-px-4"
              @slideclick="() => navigateToDetailCard('news-id', item.id)"
            >
              <MPCard
                class="tw-cursor-pointer"
                :title="item?.title"
                :image-url="item?.imageUrl"
                type="all-in-one"
              />
            </slide>
          </carousel>
        </div>
      </div>
    </div>

    <div
      v-for="category in categoryWithAds"
      :key="category.id"
      class="tw-mt-12"
    >
      <template v-if="category.ads && category.ads.length">
        <div class="tw-flex tw-justify-between tw-items-center">
          <h3 class="tw-text-1.5xl tw-m-0 tw-font-bold one-line-ellipsis tw-flex-1">
            <span>{{ category.title ?? '' }}</span>
          </h3>
          <NuxtLink :to="`categories/advertisement/${category.id}`" class="tw-flex tw-justify-end tw-items-center">
            <span>{{ $__('showAll') }}</span>
            <span class="tw-pr-1" />
            <i class="tw-w-6" v-html="initIcon('chevronLeft')"></i>
          </NuxtLink>
        </div>
        <div class="tw-mt-4">
          <div class="tw--me-2 md:tw--mx-4">
            <carousel
              v-bind="carouselOptions"
              :per-page-custom="[
                [0, 1.5],
                [767, 3],
                [1024, 4],
              ]"
            >
              <slide
                v-for="item in category.ads"
                :key="item.id"
                class="tw-px-2 md:tw-px-4"
                @slideclick="
                  () => navigateToDetailCard('advertisement-id', item.id)
                "
              >
                <MPCard
                  class="tw-cursor-pointer"
                  :title="item.title"
                  :image-url="`https://app.pardisnow.ir/${item?.photo?.dir}/${item?.photo?.path}`"
                  :rating="item.rating"
                  type="vertical"
                />
              </slide>
            </carousel>
          </div>
        </div>
      </template>
      <template v-if="!category.ads">
        <NuxtLink :to="`/advertisement/${category.advertising_id}`">
          <div class="tw-block sm:tw-hidden tw-pt-[35%] tw-relative">
            <img
              class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-w-full tw-h-full tw-rounded-xl tw-object-cover"
              :src="`https://app.pardisnow.ir/${category?.photo?.dir}/${category?.photo?.path}`"
              alt=""
            />
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script>
import MPCard from '~/components/cards/mp-card'
import { news, advertisement, category } from '~/shared/api'
import { initIcon } from '~/shared/utility'

export default {
  name: 'IndexPage',
  components: { MPCard },
  layout: 'default',
  data: () => {
    return {
      initIcon,
      url: process.env.URL,
      carouselOptions: {
        rtl: true,
        loop: true,
        paginationEnabled: false,
        navigationNextLabel:
          '<svg class="w-6 h-6" viewBox="0 0 512 512"><path d="M387.3,255.73a40.63,40.63,0,0,0-11.9-28.79l-222-222a16.8,16.8,0,0,0-23.76,23.76l222,222a7.14,7.14,0,0,1,0,10.07l-222,222a16.8,16.8,0,0,0,23.76,23.76l222-222A40.63,40.63,0,0,0,387.3,255.73Z"/></svg>',
        navigationPrevLabel:
          '<svg class="w-6 h-6" viewBox="0 0 512 512"><path d="M124.7,255.73a40.63,40.63,0,0,1,11.9-28.79l222-222a16.8,16.8,0,1,1,23.76,23.76l-222,222a7.14,7.14,0,0,0,0,10.07l222,222a16.8,16.8,0,0,1-23.76,23.76l-222-222A40.63,40.63,0,0,1,124.7,255.73Z"/></svg>',
        autoplay: false,
        autoplayTimeout: 4000,
        navigationEnabled: true,
      },
      newsList: [],
      newAdsList: [],
      categoryWithAds: [],
      favoriteAds: [],
      categories: [],
    }
  },
  beforeMount() {
    if (this.$store.state.news.news.length) {
      this.newsList = this.$store.state.news.news
    } else {
      this.fetchNews()
    }
    if (this.$store.state.advertisement.favoriteAds.length) {
      this.favoriteAds = this.$store.state.advertisement.favoriteAds
    } else {
      this.fetchFavoriteAds()
    }
    if (this.$store.state.advertisement.categoryWithAds.length) {
      this.categoryWithAds = this.$store.state.advertisement.categoryWithAds
    } else {
      this.fetchCategoryWithAds()
    }
    if (this.$store.state.category.categories.length) {
      this.categories = this.$store.state.category.categories
    } else {
      this.fetchCategories()
    }
  },
  methods: {
    async fetchNews() {
      const { data } = await this.$Api.get(news.list, { loading: 'BLOCKER' })
      if (!data) {
        return
      }
      if (data && data.length) {
        this.newsList = data.map((news) => {
          return {
            id: news.id,
            title: news.title,
            imageUrl: `https://app.pardisnow.ir/${news.photo.dir}/${news.photo.path}`,
            rate: null,
          }
        })
        this.$store.commit('news/setNews', this.newsList)
      }
    },
    navigateToDetailCard(routeName, paramsId) {
      this.$router.push({
        name: routeName,
        params: {
          id: paramsId,
        },
      })
    },
    async fetchCategoryWithAds() {
      const { data } = await this.$Api.get(advertisement.getCategoryWithAds, {
        loading: 'BLOCKER',
      })
      if (!data) {
        return
      }

      this.categoryWithAds.length = 0
      if (data.length) {
        this.categoryWithAds = data
        this.$store.commit('advertisement/setCategoryWithAds', data)
      }
    },
    async fetchFavoriteAds() {
      const { data } = await this.$Api.get(advertisement.favoriteAds, {
        loading: 'BLOCKER',
      })
      if (!data) {
        return
      }

      this.favoriteAds.length = 0
      if (data.length) {
        this.favoriteAds = data
        this.$store.commit('advertisement/setFavoriteAds', data)
      }
    },
    async fetchCategories() {
      const { data } = await this.$Api.get(category.getCategories, {
        loading: 'BLOCKER',
      })
      if (!data) {
        return
      }

      this.categories.length = 0
      if (data.categories.length) {
        this.categories = data.categories
        this.$store.commit('category/setCategoriesList', data.categories)
      }
    },
  },
}
</script>
