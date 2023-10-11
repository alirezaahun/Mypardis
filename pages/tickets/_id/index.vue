<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('ticketSupport')" />
    </div>
    <div>
      <DetailTicketCard />
    </div>
  </div>
</template>

<script>
import DetailTicketCard from "~/components/cards/detail-ticket-card";
export default {
  name: "index",
  components: {DetailTicketCard}
}
</script>
