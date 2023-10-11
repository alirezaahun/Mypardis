<template>
  <div class="tw-mt-4">
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="item in cashAwards">
        <div :key="item.id" class="tw-col-span-12 md:tw-col-span-4 tw-px-0 md:tw-px-2 tw-py-2">
          <NuxtLink :to="`/customer-club/cash-prize/${item?.id}`">
            <CashPrizeCard :data-model="item" />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CashPrizeCard from '~/components/cards/cash-prize-card'
import awards from "~/mixins/awards";

export default {
  name: 'Index',
  components: { CashPrizeCard },
  layout: 'customer-club',
  mixins: [awards]
}
</script>
