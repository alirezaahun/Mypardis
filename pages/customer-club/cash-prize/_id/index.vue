<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('awardsDetail')" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-2 sm:tw-order-1"
      >
        <div v-if="awardsDetail.title" class="tw-flex tw-items-start">
          <i class="tw-w-6" v-html="initIcon('redeem')"></i>
          <span class="tw-px-1" />
          <span class="tw-font-semibold">{{ awardsDetail.title }}</span>
        </div>
        <div v-if="awardsDetail.price" class="tw-flex tw-items-start tw-mt-2">
          <i class="tw-w-6" v-html="initIcon('payments')"></i>
          <span class="tw-px-1" />
          <span>{{ $__('convertPointsToPrice').replace('{value}', awardsDetail.price) }}</span>
        </div>
        <div v-if="awardsDetail.score" class="tw-flex tw-items-start tw-mt-2">
          <i class="tw-w-6" v-html="initIcon('diamond')"></i>
          <span class="tw-px-1" />
          <span>{{ $__('pointsRequired').replace('{value}', awardsDetail.score) }}</span>
        </div>
        <div v-if="awardsDetail.description" class="tw-mt-8">
          <h6 class="tw-text-xl">{{ $__('turnPointsIntoCash') }}</h6>

          <div class="tw-mt-4 yekanbakh-regular" v-html="awardsDetail.description"></div>
        </div>
        <div class="tw-text-center tw-mt-8">
          <button @click="receiveAward" class="tw-px-4 tw-py-2 tw-rounded tw-bg-blue-400 tw-outline-0 tw-text-xl">
            {{ $__('receiveAward') }}
          </button>
        </div>
      </div>
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-1 sm:tw-order-2"
      >
        <img
          class="tw-w-full tw-rounded-xl"
          :src="`https://app.pardisnow.ir/${awardsDetail?.photo?.dir}/${awardsDetail?.photo?.path}`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'
import { awards } from "~/shared/api";

export default {
  name: 'Index',
  data() {
    return {
      initIcon,
      awardsDetail: {},
    }
  },
  beforeMount() {
    this.fetchAwardsDetail()
  },
  methods: {
    async fetchAwardsDetail() {
      const id = Number(this.$route.params.id)
      const { data } = await this.$Api.get(awards.getById(id), { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.awardsDetail = data
    },
    async receiveAward() {
      const id = this.$route.params.id
      const { data } = await this.$Api.get(awards.request(id), { loading: 'TRANSPARENT' })
      if (!data) {
        return
      }

      this.$Toast('show', data.type)
    }
  }
}
</script>
