<template>
  <div
    class="tw-rounded tw-border tw-border-white tw-overflow-hidden hover:tw-bg-primary-400 tw-transition-all"
  >
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-flex tw-flex-col tw-p-2 tw-flex-1">
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span class="tw-font-bold">آگهی فروش ملک در فاز ۱۱</span>
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span>۱۰ ساعت پیش</span>
        </p>
        <p class="tw-overflow-hidden tw-max-h-12 one-line-ellipsis tw-pt-1">
          <span>در انتظار بررسی</span>
        </p>
      </div>
      <div class="tw-hidden md:tw-block">
        <div class="tw-flex tw-flex-col tw-items-center">
          <NuxtLink v-for="item in cardActions" :key="item.icon" class="tw-my-1" :to="item.to">
            <i
              class="tw-block tw-w-8 tw-rounded tw-bg-white tw-p-1 tw-opacity-70 hover:tw-opacity-90"
              v-html="initIcon(item.icon, '#444557')"
            ></i>
          </NuxtLink>
        </div>
      </div>
      <div class="tw-px-1"></div>
      <div>
        <img
          class="tw-w-32 tw-h-32 tw-object-cover"
          src="~/assets/images/shared/43.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'

export default {
  name: 'IntroductionCard',
  props: {
    cardModel: {
      Type: Object,
      required: true,
    },
  },
  data() {
    return {
      initIcon,
      cardActions: [
        {
          icon: 'visibility',
          to: '/'
        },
        {
          icon: 'edit',
          to: '/'
        },
        {
          icon: 'delete',
          to: '/'
        }
      ]
    }
  }
}
</script>
