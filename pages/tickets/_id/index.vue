<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="ticketData.title ?? ''" />
    </div>
    <div>
      <template v-for="item in replays">
        <DetailTicketCard :key="item.id" class="tw-mt-4" :data-model="item" />
      </template>
    </div>
  </div>
</template>

<script>
import DetailTicketCard from "~/components/cards/detail-ticket-card";
import { tickets } from "~/shared/api";

export default {
  name: "index",
  components: {DetailTicketCard},
  data() {
    return {
      replays: [],
      ticketData: {}
    }
  },
  beforeMount() {
    this.fetchTicketsDetail()
  },
  methods: {
    async fetchTicketsDetail() {
      const id = this.$route.params.id
      const { data } = await this.$Api.get(tickets.show(id), { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      console.log(data);
      this.ticketData = data
      if (data.replays && data.replays.length) {
        this.replays = data.replays
      }
    }
  }
}
</script>
