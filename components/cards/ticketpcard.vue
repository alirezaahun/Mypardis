<template>
  <div class="tw-px-4 tw-py-3 tw-bg-white hover:tw-bg-gray-200 tw-rounded tw-text-text-gray tw-cursor-pointer">
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div class="tw-col-span-4 tw-text-end">
        <p class="tw-overflow-hidden one-line-ellipsis">
          <span class="tw-text-sm">{{ dataModel.title ?? '' }}</span>
        </p>
      </div>
      <div class="tw-col-span-4 tw-text-center">
        <p class="tw-overflow-hidden one-line-ellipsis">
          <span class="tw-text-sm">{{ dataModel.created_at ?? '' }}</span>
        </p>
      </div>
      <div class="tw-col-span-4 tw-text-start">
        <span class="tw-w-max tw-px-2 tw-rounded tw-bg-blue-500" :style="{color: `#${dataModel.status.color}`}">
          <span>{{ dataModel?.status?.text ?? '' }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketpCard",
  props: {
    dataModel: {
      type: Object,
      required: true
    }
  }
}
</script>
