<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('categories')" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="(category, index) in categories">
        <div
          :key="category.id"
          class="tw-col-span-12 md:tw-col-span-3 md:tw-my-2 tw-m-0 md:tw-mx-2"
        >
          <NuxtLink :key="category.id" :to="category?.childrenCount ? `/categories/${category.id}` : `/categories/advertisement/${category.id}`" class="tw-block">
            <div :class="index < categories.length - 1 && ['tw-border-b', 'tw-border-white']"
                 class="tw-block md:tw-hidden tw-py-4 tw-px-2 tw-cursor-pointer hover:tw-bg-primary-400 tw-transition-all">
              <CategoryCard :title="category.title" :image-url="`https://app.pardisnow.ir/${category?.photo?.dir}/${category?.photo?.path}`" />
            </div>

            <MPCard
              class="tw-hidden md:tw-block tw-cursor-pointer"
              :title="category.title"
              :image-url="`https://app.pardisnow.ir/${category?.photo?.dir}/${category?.photo?.path}`"
              type="all-in-one"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BackNavigation from '~/components/back-navigation'
import CategoryCard from '~/components/cards/category-card'
import { category } from '~/shared/api'
import MPCard from "~/components/cards/mp-card";

export default {
  name: 'Index',
  components: {MPCard, CategoryCard, BackNavigation },
  data() {
    return {
      categories: []
    }
  },
  beforeMount() {
    if (this.$store.state.category.categories.length) {
      this.categories = this.$store.state.category.categories
    } else {
      this.fetchCategories()
    }
  },
  methods: {
    async fetchCategories() {
      const { data } = await this.$Api(category.getCategories, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      if (data.categories && data.categories.length) {
        this.$store.commit('category/setCategoriesList', data.categories)
        this.categories = data.categories
      }
    },
  },
}
</script>
