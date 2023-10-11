<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('bookmarks')" to="/" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="item in bookmarksList">
        <div
          :key="item.id"
          class="tw-col-span-12 sm:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2"
        >
          <BookmarkCard
            class="tw-cursor-pointer"
            :card-model="item"
            @clickCard="onClickCard"
            @dismark="onDismark"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BookmarkCard from '~/components/cards/bookmark-card'
import BackNavigation from '~/components/back-navigation'
import { advertisement } from '~/shared/api'

export default {
  name: 'Bookmark',
  components: { BookmarkCard, BackNavigation },
  layout: 'default',
  data() {
    return {
      bookmarksList: [],
    }
  },
  beforeMount() {
    this.fetchBookmarksList('BLOCKER')
  },
  methods: {
    async fetchBookmarksList(loading) {
      const { data } = await this.$Api.get(advertisement.getBookmarks, {
        loading,
      })
      if (!data) {
        return
      }

      this.bookmarksList.length = 0
      if (data.length) {
        this.bookmarksList = data
      }
    },
    onClickCard(item) {
      this.$router.push({
        name: 'advertisement-id',
        params: {
          id: item.id
        }
      })
    },
    async onDismark(item) {
      const params = {
        like: false,
      }
      await this.$Api.post(advertisement.likeOrDisLike(item.id), params, { loading: 'TRANSPARENT' })
      this.fetchBookmarksList('TRANSPARENT')
    },
  },
}
</script>
