<template>
  <div
    @click="onCard"
    class="tw-rounded tw-border tw-border-white tw-overflow-hidden hover:tw-bg-primary-400 tw-transition-all"
  >
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex tw-flex-col tw-justify-between tw-h-32 tw-p-2 tw-flex-1">
        <p class="tw-overflow-hidden tw-max-h-24 tow-line-ellipsis tw-pt-1">
          <span class="tw-font-bold">{{ cardModel.title ?? '' }}</span>
        </p>
        <div>
          <i @click="dismark" class="tw-block tw-w-8 tw-cursor-pointer hover:tw-opacity-80" v-html="initIcon('bookmark', '#ef4444')"></i>
        </div>
      </div>
      <div>
        <img
          class="tw-w-32 tw-h-32 tw-object-cover"
          :src="`https://app.pardisnow.ir/${cardModel?.photo?.dir}/${cardModel?.photo?.path}`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'BookmarkCard',
  props: {
    cardModel: {
      Type: Object,
      required: true,
    },
  },
  emits: ['dismark', 'clickCard'],
  data() {
    return {
      initIcon
    }
  },
  methods: {
    onCard() {
      this.$emit('clickCard', this.cardModel)
    },
    dismark(e) {
      e.stopPropagation()
      this.$emit('dismark', this.cardModel)
    }
  }
}
</script>
