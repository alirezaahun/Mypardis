<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="adDetail.title ?? ''" />
    </div>
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-2 sm:tw-order-1"
      >
        <span v-if="adDetail.title" class="tw-font-bold tw-text-xl">{{ adDetail.title }}</span>
        <div class="tw-flex tw-justify-between tw-items-center tw-pt-2">
          <span v-if="adDetail.ago" class="tw-flex-1">{{ adDetail.ago }}</span>
          <span class="tw-px-2" />
          <div
            class="tw-flex tw-items-center tw-px-2 tw-py-1 tw-bg-red-400 tw-rounded-xl"
          >
            <i class="tw-w-6" v-html="initIcon('star')"></i>
            <span class="tw-px-1" />
            <span>{{ adDetail.rating ?? 0 }}</span>
          </div>
        </div>
        <div class="tw-my-4 tw-border-t tw-border-white tw-opacity-70" />
        <div>
          <ul v-if="adDetail.attributes && adDetail.attributes.length">
            <li
              v-for="item in adDetail.attributes"
              :key="item.id"
              class="tw-flex tw-items-center tw-py-2"
            >
              <span>{{ item.name ?? '' }}:</span>
              <span class="tw-px-1" />
              <span>{{ item.value ?? '' }}</span>
            </li>
          </ul>
          <p v-if="adDetail.description" class="tw-pt-4" v-html="adDetail.description" />
        </div>
        <div class="tw-my-4 tw-border-t tw-border-white tw-opacity-70" />
        <div>
          <ul>
            <li v-if="adDetail.address" class="tw-flex tw-items-center tw-py-2">
              <i class="tw-w-6" v-html="initIcon('location')"></i>
              <span class="tw-px-1" />
              <span>{{ adDetail.address }}</span>
            </li>
            <li v-if="adDetail.tel" class="tw-flex tw-items-center tw-py-2">
              <i class="tw-w-6" v-html="initIcon('phone')"></i>
              <span class="tw-px-1" />
              <span class="tw-text-xl">{{ adDetail.tel }}</span>
            </li>
          </ul>
        </div>
        <div class="tw-my-4 tw-border-t tw-border-white tw-opacity-70" />
      </div>
      <div
        class="tw-col-span-12 md:tw-col-span-6 tw-my-2 tw-m-0 sm:tw-mx-2 tw-order-1 sm:tw-order-2 tw-overflow-hidden"
      >
        <div class="tw-relative tw-h-[50vh]">
          <img
            class="tw-w-full tw-h-full tw-rounded-xl tw-object-cover"
            :src="`https://app.pardisnow.ir/${adDetail?.photo?.dir}/${adDetail?.photo?.path}`"
            alt=""
          />
          <div class="tw-absolute tw-bottom-0 tw-right-0 tw-left-0">
            <AdsActions :phone-number="adDetail?.tel"
                        :bookmarked="adDetail.bookmarked"
                        :lat="adDetail?.lat"
                        :lng="adDetail?.lng"
                        @onFavorite="onFavorite" class="tw-rounded-br-xl tw-rounded-bl-xl tw-px-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initIcon } from '~/shared/utility'
import AdsActions from '~/components/advertisement/ads-actions'
import BackNavigation from '~/components/back-navigation'
import { advertisement } from "~/shared/api";

export default {
  name: 'ViewAd',
  components: { AdsActions, BackNavigation },
  data() {
    return {
      initIcon,
      adDetail: {},
      basicInformation: [
        {
          title: 'محل',
          value: 'فاز ۱۱',
        },
        {
          title: 'قیمت',
          value: '۲۵۰۰۰۰۰۰۰',
        },
        {
          title: 'متراژ',
          value: '۸۵',
        },
        {
          title: 'تعداد اتاق',
          value: '۲',
        },
        {
          title: 'سن بنا',
          value: '۶',
        },
        {
          title: 'طبقه',
          value: '۷',
        },
      ],
    }
  },
  beforeMount() {
    this.fetchAdDetail()
  },
  methods: {
    async fetchAdDetail() {
      const id = this.$route.params.id
      const { data } = await this.$Api.get(advertisement.getById(id), { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      this.adDetail = data
    },
    async onFavorite() {
      const id = this.$route.params.id
      const params = {
        like: !this.adDetail.bookmarked
      }
      await this.$Api.post(advertisement.likeOrDisLike(id), params, { loading: 'TRANSPARENT' })
      this.adDetail.bookmarked = !this.adDetail.bookmarked
    }
  }
}
</script>
