<template>
  <div
    class="tw-rounded tw-border tw-border-white tw-overflow-hidden hover:tw-bg-primary-400 tw-transition-all"
  >
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-flex-col tw-p-2 tw-flex-1">
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span class="tw-font-bold">{{ cardModel.title ?? ''}}</span>
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span>{{ cardModel.ago ?? '' }}</span>
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span>{{ cardModel.published ?? '' }}</span>
        </p>
      </div>
      <div class="tw-hidden md:tw-block">
        <div class="tw-flex tw-flex-col tw-items-center">
          <div v-for="item in cardActions" :key="item.icon" class="tw-my-1">
            <i
              @click="onCardAction(item.action)"
              class="tw-block tw-w-8 tw-rounded tw-bg-white tw-p-1 tw-opacity-70 hover:tw-opacity-90 tw-cursor-pointer"
              v-html="initIcon(item.icon, '#444557')"
            ></i>
          </div>
        </div>
      </div>
      <div class="tw-px-1"></div>
      <div>
        <NuxtImg
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
  name: 'AdCard',
  props: {
    cardModel: {
      Type: Object,
      required: true,
    },
  },
  emits: ['view', 'edit', 'delete'],
  data() {
    return {
      initIcon,
      cardActions: [
        {
          icon: 'visibility',
          action: 'view'
        },
        {
          icon: 'edit',
          action: 'edit'
        },
        {
          icon: 'delete',
          action: 'delete'
        }
      ]
    }
  },
  methods: {
    onCardAction(action) {
      switch (action) {
        case 'view':
          this.$emit('view', this.cardModel)
          break
        case 'delete':
          this.$emit('delete', this.cardModel)
          break
        case 'edit':
          this.$emit('edit', this.cardModel)
          break
      }
    }
  }
}
</script>
