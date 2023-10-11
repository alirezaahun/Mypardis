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
    </div>
  </div>
</template>

<script>
import { tickets } from '~/shared/api'
import TicketpCard from '~/components/cards/ticketpcard'

export default {
  name: 'Support',
  components: { TicketpCard },
  data({ $__ }) {
    return {
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
      const { data } = await this.$Api.get(tickets.getAll)
      if (!data || !data.length) {
        return
      }

      console.log(data)
      this.tickets = data
    },
  },
}
</script>
