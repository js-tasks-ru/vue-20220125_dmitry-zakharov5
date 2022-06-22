<template>
  <ui-input :model-value="formattedDate" v-bind="$attrs" :type="type" @input="updateValue">
    <template v-for="name in Object.keys($slots)" #[name]> <slot :name="name"></slot></template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import moment from 'moment';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ['update:modelValue'],

  computed: {
    formattedDate() {
      if (this.modelValue) {
        switch (this.type) {
          case 'date':
            return moment(this.modelValue).utc().format('YYYY-MM-DD');
          case 'datetime-local':
            return moment.utc(this.modelValue).utc().format('YYYY-MM-DDTHH:mm');
          case 'time':
            if (this.$attrs.step && +this.$attrs.step % 60 !== 0) {
              return moment.utc(this.modelValue).utc().format('HH:mm');
            } else {
              return moment.utc(this.modelValue).utc().format('HH:mm');
            }
          default:
            return '';
        }
      } else {
        return '';
      }
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
