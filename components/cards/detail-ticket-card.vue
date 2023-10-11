<template>
  <div class="tw-rounded-xl tw-border tw-border-white tw-overflow-hidden">
    <div
      class="tw-p-2 tw-flex tw-justify-between tw-items-center tw-bg-white tw-text-text-gray"
    >
      <span>{{ dataModel.created_at ?? '' }}</span>
      <span class="tw-px-2" />
      <span v-if="dataModel.user_id">{{ $__('you') }}</span>
      <span v-if="dataModel.supporter_id">{{ $__('supportTeam') }}</span>
    </div>
    <div class="tw-p-2">
      <span>{{ dataModel.description ?? '' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTicketCard',
  props: {
    dataModel: {
      type: Object,
      required: true
    }
  }
}
</script>
