<template>
  <GridCol>
    <div
      ref="textInput"
      :class="[
        styles[`height${height}`],
        styles.textInput,
        suggestions.length && styles.positionRelative,
        notVulid && styles.textInputError,
        noBorder && !notVulid ? styles.borderColorTransparent : ''
      ]"
    >
      <div
        v-if="focusInput && (suffix || !!$slots.suffix || (hint && !loading))"
      >
        <div
          v-if="!!$slots.suffix"
          :class="[
            styles.flexRowCenter,
            styles.textInputSuffix,
            suffixWidth,
            isLtr
              ? [styles.right10, styles.pL10]
              : [styles.left10, styles.pR10],
            !isLtr && styles.textInputSuffixLtr
          ]"
        >
          <slot name="suffix" />
        </div>

        <div
          v-else
          :class="[
            styles.flexRowCenter,
            styles.textInputSuffix,
            suffixWidth,
            isLtr
              ? [styles.right10, styles.pL10]
              : [styles.left10, styles.pR10],
            !isLtr && styles.textInputSuffixLtr
          ]"
        >
          <span :class="[styles.textInputSuffixText]">
            {{ suffix }}
          </span>
          <Icon
            v-if="hint"
            :class="styles.lH0"
            name="question"
            size="lg"
            :tooltip="hint"
            toolTipMaxWidth="true"
            type="disabled"
          />
          <span :class="styles.pR10" />
          <div :class="[styles.textInputSuffixDivider, styles.mT5]" />
        </div>
      </div>
      <span v-if="notVulid" :class="styles.textInputMessage">
        {{ message }}
      </span>
      <span
        v-if="!placeholder"
        :class="[
          styles.textInputTitle,
          focusInput && styles.textInputTitleFocus
        ]"
      >
        <span>
          {{ title }}
        </span>
        <span v-if="required" :class="styles.textInputTitleStar"> * </span>
      </span>
      <div
        :class="[
          styles.textInputWrapper,
          isLtr && styles.textInputLtr,
          styles.flexCenter
        ]"
      >
        <div v-if="icon" :class="styles.textInputIcon">
          <Icon :name="icon" :size="iconSize" type="disabled" />
        </div>
        <Tooltip location="bottom" :title="tooltip">
          <input
            ref="input"
            v-disabled="disabled"
            autocomplete="off"
            :class="[styles.textInputInput, clearable && styles.pR25]"
            :isvulid="computeIsVulid"
            :placeholder="placeholder"
            :readonly="isPasswordType && !focusInput"
            :type="type"
            :value="displayValue"
            :vulidation="vulidation"
            @focus="(e) => onFocusHandler(e, true)"
            @focusout="(e) => onFocusHandler(e, false)"
            @input="onInputHandler"
            @paste="onPasteHandler"
          />
        </Tooltip>
        <Progress v-if="loading" size="md" />
      </div>
      <div v-if="showSuggestedItem" :class="styles.textInputSuggestion">
        <List :class="[styles.textInputSuggestionList, styles.scrollbar]">
          <template #listItem>
            <ListItem
              v-for="item in suggestions"
              :key="item.title"
              @click="selectSuggestedItem(item)"
            >
              <span>
                {{ item.title }}
              </span>
            </ListItem>
          </template>
        </List>
      </div>
    </div>
  </GridCol>
</template>

<script>
import styles from '@sass'
import __ from '@localization'
import {
  stringPropType,
  booleanPropType,
  objectPropType
} from '@componentUtils'
import { vulidateText, faToEnDigits } from '@utils'
import { errorMessages } from '@messages'
import Icon from '../icon/Icon'
import GridCol from '../grid/GridCol'
import { arrayPropType } from '@componentUtils'
import Progress from '../progress/Progress'
import List from '../list/List'
import ListItem from '../list/ListItem'
import Tooltip from '@components/ui/tooltip/Tooltip'

export default {
  name: 'TextInput',
  components: { Tooltip, ListItem, List, Progress, GridCol, Icon },
  inject: ['lang', 'vulidator'],
  props: {
    ltr: booleanPropType(false, false),
    icon: stringPropType(false),
    hint: stringPropType(false, ''),
    type: stringPropType(false, 'text'),
    title: stringPropType(false),
    suffix: stringPropType(false),
    filter: stringPropType(false),
    iconSize: stringPropType(false, 'md'),
    disabled: booleanPropType(false, false),
    clearable: booleanPropType(false, false),
    vulidation: stringPropType(false, 'none'),
    modelValue: stringPropType(false),
    suffixStyle: objectPropType(false, {}),
    placeholder: stringPropType(),
    loading: booleanPropType(false, false),
    suggestions: arrayPropType(false, []),
    height: stringPropType(false, '50'),
    tooltip: stringPropType(false, ''),
    noBorder: booleanPropType(false, false)
  },
  emits: ['selectSuggestedItem', 'update:modelValue'],
  data() {
    return {
      styles,
      focusInput: false,
      notVulid: false,
      message: '',
      isVulid: true,
      showSuggestedItem: false
    }
  },
  computed: {
    isNumberType() {
      return this.type === 'number'
    },
    isCurrencyType() {
      return this.type === 'currency'
    },
    isEmailType() {
      return this.type === 'email'
    },
    isPasswordType() {
      return this.type === 'password'
    },
    isLtr() {
      return (
        this.isNumberType ||
        this.isEmailType ||
        this.isPasswordType ||
        this.isCurrencyType ||
        this.ltr
      )
    },
    required() {
      if (!this.vulidation.includes('required')) {
        this.resetValue()
      }
      return this.vulidation.includes('required')
    },
    computeIsVulid() {
      return this.isVulid && (this.required ? this.modelValue !== '' : true)
    },
    suffixWidth() {
      return styles[this.suffixStyle.width]
    },
    displayValue: {
      get() {
        if (this.filter === 'price') {
          return this.separateNumber(this.modelValue)
        } else {
          return this.modelValue
        }
      },
      set() {
        this.createInputEmit()
      }
    }
  },
  methods: {
    selectSuggestedItem(item) {
      this.$emit('selectSuggestedItem', item)
      document.removeEventListener('click', this.closeSuggestionList)
      this.showSuggestedItem = false
    },
    onFocusHandler(e, isFocus) {
      if (e.target.value !== '') {
        this.focusInput = true
        return
      }
      this.focusInput = isFocus
    },
    onInputHandler(e) {
      this.createInputEmit(e.target.value)
    },
    onPasteHandler(e) {
      if (!this.isNumberType) {
        return
      }

      const pastedValue = (e.clipboardData || window.clipboardData).getData(
        'text'
      )

      if (!isNaN(pastedValue)) {
        return
      }

      e.preventDefault()
    },
    separateNumber(value) {
      if (!value) {
        return ''
      }

      let castedValue = value.toString()
      castedValue = castedValue.replace(/,/g, '')

      return castedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    createInputEmit(value) {
      if (this.filter === 'price') {
        value = value.replace(/,/g, '')
      }

      if (this.vulidation.split('#').find((el) => el === 'isNumeric')) {
        value = faToEnDigits(value)
      }

      this.$emit('update:modelValue', value)
    },
    resetValue() {
      this.message = ''
      this.isVulid = true
      this.notVulid = false
    },
    closeSuggestionList(e) {
      const textInput = this.$refs.textInput
      const target = e.target

      if (textInput.contains(target)) {
        return
      }

      this.showSuggestedItem = false
    }
  },
  watch: {
    modelValue(value) {
      if (value === '') {
        this.resetValue()

        if (this.vulidator) {
          setTimeout(() => {
            this.vulidator(true)
          }, 1)
        }

        return
      }

      const vulue = value ? value.toString() : ''
      let isVulid = true

      if (this.vulidation !== 'none') {
        const vulidatorTypes = this.vulidation.split('#')

        isVulid = vulidateText(vulue, vulidatorTypes)

        if (this.required && vulue === '') {
          isVulid = false
        }

        this.isVulid = isVulid
        this.notVulid = !isVulid

        let currentInVulid = ''

        if (value === '' && this.required) {
          currentInVulid = 'required'
        } else {
          currentInVulid =
            vulidatorTypes.length > 1
              ? vulidatorTypes
                  .filter((el) => el !== 'required')[0]
                  .split('*')[0]
                  .trim()
              : vulidatorTypes[0].split('*')[0].trim()
        }

        this.message = !isVulid
          ? __(errorMessages[currentInVulid], this.lang())
          : ''
      }

      if (this.vulidator) {
        setTimeout(() => {
          this.vulidator(isVulid)
        }, 1)
      }

      this.focusInput = vulue !== ''
    },
    suggestions: {
      handler() {
        this.showSuggestedItem = true
        document.addEventListener('click', this.closeSuggestionList)
      },
      deep: true
    }
  },
  created() {
    if (this.vulidator) {
      setTimeout(() => {
        this.vulidator(true)
      }, 1)
    }

    if (this.modelValue === '') {
      return
    }

    this.focusInput = true
  }
}
</script>
