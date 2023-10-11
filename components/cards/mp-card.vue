<template>
  <div>
    <MpSmallCard v-if="type === 'small'"
                 :title="title"
                 :imageUrl="imageUrl" />
    <MPAllInOneCard v-else-if="type === 'all-in-one'"
                 :title="title"
                 :imageUrl="imageUrl" />
    <MPVerticalCard v-else-if="type === 'vertical'"
                    :title="title"
                    :rating="rating"
                    :imageUrl="imageUrl" />
  </div>
</template>

<script>
import MpSmallCard from "~/components/cards/mp-small-card";
import MPAllInOneCard from "~/components/cards/mp-all-in-one-card";
import MPVerticalCard from "~/components/cards/mp-vertical-card";
export default {
  name: 'MPCard',
  components: {MPVerticalCard, MPAllInOneCard, MpSmallCard},
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    imageUrl: {
      required: true,
      type: String,
      default: ''
    },
    rating: {
      required: false,
      type: Number,
      default: 0
    },
    type: {
      required: false,
      type: String,
      default: 'small'
    }
  }
}
</script>
