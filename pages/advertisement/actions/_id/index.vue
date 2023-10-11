<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('actions')" />
    </div>
    <div>
      <ul>
        <template v-for="(item, index) in actions">
          <li :key="item.title"
              @click="handleAction(item.action)"
              :class="[ index < actions.length - 1 ? 'tw-border-b tw-border-b-gray-200' : '' ]"
              class="tw-flex tw-items-center tw-py-4 tw-px-2 hover:tw-bg-primary-400">
            <i class="tw-w-6" v-html="initIcon(item.icon)"></i>
            <span class="tw-px-1" />
            <span>{{ item.title }}</span>
          </li>

        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { initIcon } from "~/shared/utility";
import {advertisement} from "~/shared/api";

export default {
  name: "index",
  data({ $__ }) {
    return {
      initIcon,
      id: '',
      actions: [
        {
          title: $__('view'),
          icon: 'visibility',
          action: 'view'
        },
        {
          title: $__('edit'),
          icon: 'edit',
          action: 'edit'
        },
        {
          title: $__('delete'),
          icon: 'delete',
          action: 'delete'
        }
      ]
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id)
  },
  methods: {
    onViewAd() {
      this.$router.push({
        name: 'advertisement-id',
        params: {
          id: this.id
        }
      })
    },
    async onDeleteAd() {
      await this.$Api.delete(advertisement.delete(this.id), { loading: 'TRANSPARENT' })
      this.$router.push({
        name: 'advertisement'
      })
    },
    onEditAd() {
      this.$router.push({
        name: 'advertisement-edit-id',
        params: {
          id: this.id
        }
      })
    },
    handleAction(action) {
      switch (action) {
        case 'view':
          this.onViewAd()
          break
        case 'delete':
          this.onDeleteAd()
          break
        case 'edit':
          this.onEditAd()
          break
      }
    }
  }
}
</script>
