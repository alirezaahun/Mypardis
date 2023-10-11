<template>
  <div class="tw-mt-4">
    <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
      <template v-for="(report, index) in reportModel">
        <div :key="index" class="tw-col-span-12 md:tw-col-span-4 tw-px-0 md:tw-px-2 tw-py-2">
          <div class="tw-bg-white tw-text-text-gray tw-rounded-xl tw-p-4">
            <div class="tw-text-center">
              <dpan class="tw-font-semibold">{{ report.title ?? '' }}</dpan>
            </div>
            <ul class="tw-p-0">
              <li class="tw-flex tw-justify-between tw-items-center" v-for="item in report.values" :key="item.description">
                <span>{{ item.title }}</span>
                <span class="tw-px-2" />
                <span class="ltr">{{ item.value }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { awards } from '~/shared/api'

export default {
  name: 'Index',
  layout: 'customer-club',
  data({ $__ }) {
    return {
      reportModel: []
    }
  },
  beforeMount() {
    this.fetchScoreTransactions()
  },
  methods: {
    async fetchScoreTransactions() {
      const { data } = await this.$Api.get(awards.getScoreTransactions, { loading: 'BLOCKER' })
      if (!data) {
        return
      }

      if (data.length) {
        this.reportModel = data.map(el => {
          return {
            title: el.description,
            values: [
              {
                title: this.$__('initialValue'),
                value: el.before ?? ''
              },
              {
                title: this.$__('score'),
                value: `${el.type ?? ''}${el.after ?? ''}`
              },
              {
                title: this.$__('total'),
                value: el.total ?? ''
              }
            ]
          }
        })
      }
    }
  }
}
</script>
