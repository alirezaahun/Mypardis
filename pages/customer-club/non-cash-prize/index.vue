<template>
  <div class="tw-mt-4">
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="item in nonCashAwards">
        <div
          :key="item.id"
          class="tw-col-span-12 md:tw-col-span-4 tw-px-0 md:tw-px-2 tw-py-2"
        >
          <NuxtLink :to="`/customer-club/cash-prize/${item?.id}`">
            <NonCashPrizeCard :data-model="item" />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import awards from '~/mixins/awards'
import NonCashPrizeCard from '~/components/cards/non-cash-prize-card'

export default {
  name: 'Index',
  components: { NonCashPrizeCard },
  mixins: [awards],
  layout: 'customer-club',
}
</script>
