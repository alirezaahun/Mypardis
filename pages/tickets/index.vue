<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('ticketSupport')" />
    </div>
    <div>
      <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
        <template v-for="item in headerModel">
          <div
            :key="item"
            class="tw-col-span-4 tw-my-2 tw-m-0 sm:tw-mx-2"
            :class="item.className"
          >
            <span>{{ item.title }}</span>
          </div>
        </template>
      </div>

      <template v-for="item in tickets">
        <NuxtLink :key="item.id" :to="`tickets/${item.id}`">
          <TicketpCard class="tw-mt-4" :data-model="item" />
        </NuxtLink>
      </template>

      <div class="tw-fixed tw-bottom-4 md:tw-bottom-8 tw-right-4 md:tw-right-8 tw-w-max">
        <NuxtLink to="/tickets/create">
          <buttom
            class="tw-flex tw-items-center tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded-xl tw-px-6 tw-py-4"
          >
            <i class="tw-w-6" v-html="initIcon('add')"></i>
            <span class="tw-px-1" />
            <span class="tw-text-xl">{{ $__('ticketRegistration') }}</span>
          </buttom>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { tickets } from '~/shared/api'
import TicketpCard from '~/components/cards/ticketpcard'
import { initIcon } from '~/shared/utility'

export default {
  name: 'Support',
  components: { TicketpCard },
  layout: 'default-no-footer',
  data({ $__ }) {
    return {
      initIcon,
      tickets: [],
      headerModel: [
        {
          title: $__('dateOfRegistration'),
          className: 'tw-text-end',
        },
        {
          title: $__('title'),
          className: 'tw-text-center',
        },
        {
          title: $__('status'),
          className: 'tw-text-start',
        },
      ],
    }
  },
  beforeMount() {
    this.fetchAllTickets()
  },
  methods: {
    async fetchAllTickets() {
      const { data } = await this.$Api.get(tickets.getAll, { loading: 'BLOCKER' })
      if (!data || !data.length) {
        return
      }

      console.log(data)
      this.tickets = data
    },
  },
}
</script>
