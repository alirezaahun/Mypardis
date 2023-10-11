<template>
  <div class="tw-rounded-xl tw-bg-white tw-overflow-hidden tw-text-text-gray hover:tw-bg-gray-200 tw-cursor-pointer">
    <div class="tw-flex tw-p-4">
      <div class="tw-w-1/3">
        <div class="tw-pt-[70%] tw-rounded-xl tw-overflow-hidden tw-relative">
          <img class="tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-object-cover tw-h-full"
               :src="`https://app.pardisnow.ir/${dataModel?.photo?.dir}/${dataModel?.photo?.path}`" alt="">
        </div>
      </div>
      <span class="tw-px-2" />
      <div class="tw-flex tw-flex-col tw-justify-between tw-flex-1">
        <p class="tw-overflow-hidden tw-max-h-16 tow-line-ellipsis">
          <span class="tw-font-semibold">{{ dataModel.title ?? '' }}</span>
        </p>
      </div>
    </div>
    <div class="tw-p-4 tw-border-dashed tw-border-t tw-border-primary tw-relative">
      <div class="tw-flex tw-justify-between tw-items-center ">
        <p class="tw-overflow-hidden tw-max-h-16 one-line-ellipsis">
          <span>{{ $__('pointsRequired').replace('{value}', dataModel.score ?? '') }}</span>
        </p>
        <span class="tw-text-blue-400">{{ $__('observation') }}</span>
      </div>
      <div class="tw-absolute tw-w-6 tw-h-6 tw-rounded-full tw-top-0 tw-right-0 tw-bg-primary tw-transform tw-translate-x-3 tw--translate-y-3"></div>
      <div class="tw-absolute tw-w-6 tw-h-6 tw-rounded-full tw-top-0 tw-left-0 tw-bg-primary tw-transform tw--translate-x-3 tw--translate-y-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NonCashPrizeCard",
  props: {
    dataModel: {
      type: Object,
      required: true
    }
  }
}
</script>
