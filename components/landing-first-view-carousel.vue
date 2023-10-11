<template>
  <div v-if="list.length" class="tw-m-0 md:tw--mx-4">
    <carousel
      v-bind="carouselOptions"
      :per-page-custom="[
        [0, 1],
        [767, 2],
      ]"
    >
      <slide v-for="item in list" :key="item.id" class="tw-p-0 md:tw-px-4">
        <div class="tw-rounded-2xl tw-shadow-default tw-overflow-hidden">
          <div class="tw-pt-[70%] tw-relative">
            <img class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-w-full tw-h-full tw-object-cover" :src="`https://app.pardisnow.ir/${item?.photo?.dir}/${item?.photo?.path}`" alt="" />
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
export default {
  name: 'LandingFirstViewCarousel',
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  data: () => {
    return {
      carouselOptions: {
        rtl: true,
        loop: true,
        paginationEnabled: false,
        navigationNextLabel:
          '<svg class="w-6 h-6" viewBox="0 0 512 512"><path d="M387.3,255.73a40.63,40.63,0,0,0-11.9-28.79l-222-222a16.8,16.8,0,0,0-23.76,23.76l222,222a7.14,7.14,0,0,1,0,10.07l-222,222a16.8,16.8,0,0,0,23.76,23.76l222-222A40.63,40.63,0,0,0,387.3,255.73Z"/></svg>',
        navigationPrevLabel:
          '<svg class="w-6 h-6" viewBox="0 0 512 512"><path d="M124.7,255.73a40.63,40.63,0,0,1,11.9-28.79l222-222a16.8,16.8,0,1,1,23.76,23.76l-222,222a7.14,7.14,0,0,0,0,10.07l222,222a16.8,16.8,0,0,1-23.76,23.76l-222-222A40.63,40.63,0,0,1,124.7,255.73Z"/></svg>',
        autoplay: true,
        autoplayTimeout: 4000,
        navigationEnabled: true,
      },
      advertisements: [
        {
          url: require('~/assets/images/shared/wide-img-1.jpg'),
        },
        {
          url: require('~/assets/images/shared/wide-img-2.jpg'),
        },
        {
          url: require('~/assets/images/shared/wide-img-3.jpg'),
        },
      ],
    }
  },
}
</script>
