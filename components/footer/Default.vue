<template>
  <div class="tw-block tw-bottom-0 tw-fixed tw-right-0 tw-left-0 tw-bg-primary-600 tw-px-2 tw-shadow-default tw-rounded-tr-2xl tw-rounded-tl-2xl">
    <div class="tw-flex tw-justify-between tw-relative">
      <div class="tw-h-full">
        <ul class="tw-flex tw-items-center tw-h-full">
          <li v-for="item in headerMenuItems.slice(0, 2)" :key="item.title">
            <NuxtLink active-class="tw-bg-primary-500" class="tw-flex tw-flex-col tw-items-center tw-p-2" :to="item.to">
              <i class="tw-w-6 tw-pb-1" v-html="initIcon(item.icon)"></i>
              <span class="tw-text-xs">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="tw-h-full">
        <ul class="tw-flex tw-items-center tw-h-full">
          <li v-for="item in headerMenuItems.slice(2, 4)" :key="item.title">
            <NuxtLink active-class="tw-bg-primary-500" class="tw-flex tw-flex-col tw-items-center tw-p-2" :to="item.to">
              <i class="tw-w-6 tw-pb-1" v-html="initIcon(item.icon)"></i>
              <span class="tw-text-xs">{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="tw-absolute tw-rounded-full tw-p-4 tw-bg-blue-600 hover:tw-bg-blue-500 add-job-button">
        <NuxtLink to="/advertisement/create/categories">
          <i class="tw-block tw-w-8" v-html="initIcon('add')"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from "~/shared/utility";

export default {
  name: "DefaultFooter",
  data({ $__ }) {
    return {
      initIcon,
      headerMenuItems: [
        {
          title: $__('advertisements'),
          to: '/',
          icon: 'comment'
        },
        {
          title: $__('categories'),
          to: '/categories',
          icon: 'toc'
        },
        {
          title: $__('customerClub'),
          to: '/customer-club/cash-prize',
          icon: 'group'
        },
        {
          title: $__('profile'),
          to: '/my/profile',
          icon: 'profile'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .add-job-button {
    left: 50%;
    top: 0;
    transform: translate(-50%, -60%);
  }
</style>
