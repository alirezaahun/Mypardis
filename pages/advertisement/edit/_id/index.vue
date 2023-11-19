<template>
  <div>
    <div class="tw-pb-4">
      <BackNavigation :title="$__('createNewAdvertisement')" />
    </div>
    <div class="tw-mt-8">
      <FormWrapper :form-data="state" @isValid="formIsValid = $event">
        <template>
          <div class="tw-grid tw-grid-cols-12 tw--m-0 sm:tw--mx-2">
            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <label
                for="photos"
                class="tw-w-max tw-flex tw-items-center tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
              >
                <i class="tw-w-6 tw-block" v-html="initIcon('add')"></i>
                <span class="tw-px-1" />
                <spam>{{ $__('addPhoto') }}</spam>
              </label>
              <input
                id="photos"
                type="file"
                class="tw-w-0 tw-h-0 tw-m-0 tw-p-0"
                accept="image/*"
                @input="addPhoto"
              />
              <div
                v-if="state.gallery.value.length"
                class="tw-grid tw-grid-cols-12 tw--mx-2"
              >
                <template v-for="item in state.gallery.value">
                  <div
                    :key="item.id"
                    class="tw-col-span-6 md:tw-col-span-3 tw-py-3 tw-px-0 tw-px-2"
                  >
                    <div
                      class="tw-relative tw-pt-[75%] tw-rounded-xl tw-overflow-y-hidden"
                    >
                      <img
                        class="tw-absolute tw-w-full tw-h-full tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-object-cover"
                        :src="`https://app.pardisnow.ir/${item?.dir}/${item?.path}`"
                        alt=""
                      />
                      <i
                        class="tw-w-8 tw-absolute tw-top-2 tw-right-2 tw-p-1 tw-shadow-default tw-rounded-xl tw-bg-white tw-cursor-pointer hover:tw-bg-gray-200"
                        @click="deletePhoto(item)"
                        v-html="initIcon('delete', '#ef4444')"
                      ></i>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <TextInput
                v-model="state.title.value"
                :validation="state.title.validation"
                :title="$__('title')"
                @isValid="state.title.isValid = $event"
              />
            </div>
            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <TextareaInput
                v-model="state.description.value"
                :validation="state.description.validation"
                :title="$__('description')"
                @isValid="state.description.isValid = $event"
              />
            </div>

            <template v-for="attr in attributesList">
              <div
                v-if="attr.type === 'text' || attr.type === 'number'"
                :key="attr.id"
                class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2"
              >
                <TextInput
                  v-model="
                    state.attributes.filter((el) => el.id === attr.id)[0].value
                  "
                  :validation="{ required: true }"
                  @isValid="
                    state.attributes.filter(
                      (el) => el.id === attr.id
                    )[0].isValid = $event
                  "
                  :title="attr.name"
                />
              </div>
              <div
                v-if="attr.type === 'list'"
                :key="attr.id"
                class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2"
              >
                <MpSelect
                  v-model="
                    state.attributes.filter((el) => el.id === attr.id)[0].value
                  "
                  :title="attr.name"
                  :items="attr.values"
                />
              </div>
              <div
                v-if="attr.type === 'boolean'"
                :key="attr.id"
                class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2"
              >
                <MpCheckbox
                  v-model="
                    state.attributes.filter((el) => el.id === attr.id)[0].value
                  "
                  :title="attr.name"
                />
              </div>
            </template>

            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <TextInput
                v-model="state.tel.value"
                :validation="state.tel.validation"
                :title="$__('telephoneNumber')"
                @isValid="state.tel.isValid = $event"
              />
            </div>
            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <TextInput
                v-model="state.address.value"
                :validation="state.address.validation"
                :title="$__('address')"
                @isValid="state.address.isValid = $event"
              />
            </div>
            <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <CreateAdSelectLocation :value="latLng" @input="changeLatLng" />
            </div>
            <!--          <div class="tw-col-span-12 tw-py-3 tw-px-0 md:tw-px-2">
              <label
                for="video"
                class="tw-w-max tw-flex tw-items-center tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
              >
                <i class="tw-w-6 tw-block" v-html="initIcon('add')"></i>
                <span class="tw-px-1" />
                <spam>{{ $__('addVideo') }}</spam>
              </label>
              <input
                id="video"
                type="file"
                class="tw-w-0 tw-h-0 tw-m-0 tw-p-0"
                accept="video/*"
                @input="addVideo"
              />
              <div
                v-if="state.gallery.value.length"
                class="tw-grid tw-grid-cols-12 tw&#45;&#45;mx-2"
              >
                <template v-for="item in state.gallery.value">
                  <div
                    :key="item.id"
                    class="tw-col-span-6 md:tw-col-span-3 tw-py-3 tw-px-0 tw-px-2"
                  >
                    <div
                      class="tw-relative tw-pt-[75%] tw-rounded-xl tw-overflow-y-hidden"
                    >
                      <img
                        class="tw-absolute tw-w-full tw-h-full tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-object-cover"
                        :src="`https://app.pardisnow.ir/${item?.dir}/${item?.path}`"
                        alt=""
                      />
                      <i
                        class="tw-w-8 tw-absolute tw-top-2 tw-right-2 tw-p-1 tw-shadow-default tw-rounded-xl tw-bg-white tw-cursor-pointer hover:tw-bg-gray-200"
                        @click="deletePhoto(item)"
                        v-html="initIcon('delete', '#ef4444')"
                      ></i>
                    </div>
                  </div>
                </template>
              </div>
            </div>-->
          </div>
        </template>

        <div class="tw-mt-8 tw-text-center md:tw-text-start">
          <button
            :disabled="!formIsValid"
            class="tw-w-full md:tw-w-max tw-bg-blue-600 hover:tw-bg-blue-500 tw-cursor-pointer tw-rounded tw-px-4 tw-py-2"
            @click="createAds"
          >
            {{ $__('edit') }}
          </button>
        </div>
      </FormWrapper>
    </div>
  </div>
</template>

<script>
import { advertisement, share } from '~/shared/api'
import BackNavigation from '~/components/back-navigation'
import TextInput from '~/components/form-field/TextInput'
import TextareaInput from '~/components/form-field/TextareaInput'
import FormWrapper from '~/components/form-field/form-wrapper'
import { initIcon } from '~/shared/utility'
import MpSelect from '~/components/form-field/mp-select'
import MpCheckbox from '~/components/form-field/mp-checkbox'
import CreateAdSelectLocation from "~/components/advertisement/create-ad-select-location";

export default {
  name: 'Index',
  components: {
    CreateAdSelectLocation,
    MpCheckbox,
    MpSelect,
    FormWrapper,
    TextareaInput,
    TextInput,
    BackNavigation,
  },
  layout: 'default-no-footer',
  data() {
    return {
      initIcon,
      showAttributeForm: false,
      latLng: [],
      state: {
        title: {
          value: '',
          validation: {
            required: true,
          },
          isValid: true,
        },
        description: {
          value: '',
          validation: {
            required: true,
          },
          isValid: true,
        },
        lat: {
          value: '',
        },
        lng: {
          value: '',
        },
        address: {
          value: '',
          validation: {
            required: false,
          },
          isValid: true,
        },
        tel: {
          value: '',
          validation: {
            required: true,
          },
          isValid: true,
        },
        gallery: {
          value: [],
        },
        video: {
          value: null,
        },
        attributes: {
          value: [],
        },
      },
      attributesList: [],
      formIsValid: true,
    }
  },
  beforeMount() {
    // this.state.category_id.value = this.$route.params.id
    this.fetchAdDetail()
  },
  methods: {
    changeLatLng(value) {
      this.latLng = value
      this.state.lat.value = this.latLng[0]
      this.state.lng.value = this.latLng[1]
    },
    onShowAttributeForm() {
      this.showAttributeForm = true
    },
    deletePhoto(item) {
      this.state.gallery.value = this.state.gallery.value.filter(
        (el) => el.id !== item.id
      )
    },
    async addPhoto(e) {
      const file = e.target.files[0]
      this.previewAvatar = URL.createObjectURL(file)
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await this.$Api.post(share.uploadFile, formData, {
        loading: 'TRANSPARENT',
      })
      if (!data) {
        return
      }

      this.state.gallery.value.push(data)
    },
    async addVideo(e) {
      const file = e.target.files[0]
      this.previewAvatar = URL.createObjectURL(file)
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await this.$Api.post(share.uploadFile, formData, {
        loading: 'TRANSPARENT',
      })
      if (!data) {
        return
      }

      console.log(data)
      // this.state.video.value = data
      // console.log(this.state.video.value)
    },
    setAttributes(attributes) {
      this.state.attributes = attributes.map((el) => {
        if (el.type === 'boolean') {
          return {
            id: el.id,
            value: el.value === 'دارد',
            isValid: true,
          }
        }

        if (el.type === 'list') {
          return {
            id: el.id,
            value: el.value ? { text: el.value, value: el.value } : '',
            isValid: true,
          }
        }

        return {
          id: el.id,
          value: el.value,
          isValid: true,
        }
      })

      this.attributesList = attributes.map((el) => {
        if (el.type === 'list') {
          const data = el
          data.values = el.values.map((item) => {
            return {
              text: item.value,
              value: item.value,
            }
          })

          return data
        }

        return el
      })
    },
    setStateData(data) {
      Object.keys(data).forEach((el) => {
        if (el === 'attributes') {
          return
        }
        if (el === 'photos') {
          this.state.gallery.value = data[el]
        }
        if (Object.keys(this.state).filter((item) => item === el).length) {
          if (el === 'lat' && data[el]) {
            this.latLng.unshift(data[el])
          }
          if (el === 'lng' && data[el]) {
            this.latLng.push(data[el])
          }
          this.state[el].value = data[el]
        }
      })
    },
    async fetchAdDetail() {
      const id = this.$route.params.id
      const { data } = await this.$Api.get(advertisement.getById(id), {
        loading: 'BLOCKER',
      })
      if (!data) {
        return
      }

      if (data.attributes && data.attributes.length) {
        this.setAttributes(data.attributes)
      }
      this.setStateData(data)
      this.adDetail = data
    },
    async fetchAttribute() {
      const id = this.$route.params.id
      const { data } = await this.$Api.get(advertisement.getAttribute(id), {
        loading: 'BLOCKER',
      })
      if (!data || !data.length) {
        return
      }

      this.state.attributes = data.map((el) => {
        return {
          id: el.id,
          value: '',
          isValid: true,
        }
      })

      if (Object.keys(data).length) {
        this.attributesList = data.map((el) => {
          if (el.type === 'list') {
            const data = el
            data.values = el.values.map((item) => {
              return {
                text: item.value,
                value: item.value,
              }
            })

            return data
          }

          return el
        })
      }
    },
    handleAdsParams() {
      const data = {}
      Object.keys(this.state).forEach((el) => {
        if (el === 'gallery') {
          data[el] = this.state.gallery.value.length
            ? this.state.gallery.value.map((item) => item.id)
            : []
          return
        }

        if (el === 'attributes') {
          data[el] = this.state.attributes.length
            ? this.state.attributes.map((item) => {
                const type = this.attributesList.filter(
                  (element) => element.id === item.id
                )[0].type
                if (type === 'list') {
                  return item.value.value ?? ''
                }

                if (type === 'boolean') {
                  return item.value ? this.$__('have') : this.$__('do not have')
                }

                return item.value ?? ''
              })
            : []

          return
        }

        data[el] = this.state[el].value
      })

      return data
    },
    async createAds() {
      const params = this.handleAdsParams()
      const id = this.$route.params.id
      await this.$Api.post(advertisement.edit(id), {...params, is_favorite: false}, {
        loading: 'TRANSPARENT',
      })

      this.$router.push({
        name: 'advertisement',
      })
    },
  },
}
</script>
