<template>
  <ui-input v-bind="$attrs" :type="type" v-model="formatedDate" @input="updateValue">
    <template v-for="name in Object.keys($slots)" v-slot:[name]> <slot :name="name"></slot></template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import moment from 'moment';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  emits: ['update:modelValue'],

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: String,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },

  computed: {
    formatedDate() {
      if (!this.modelValue) {
        return '';
      }
      if (this.type === 'date') {
        return moment(this.modelValue).utc().format('YYYY-MM-DD');
      }
      if (this.type === 'time') {
        if (this.$attrs.step && +this.$attrs.step % 60 !== 0) {
          return moment.utc(this.modelValue).utc().format('HH:mm');
        } else {
          return moment.utc(this.modelValue).utc().format('HH:mm');
        }
      }
      if (this.type === 'datetime-local') {
        return moment.utc(this.modelValue).utc().format('YYYY-MM-DDTHH:mm');
      }
    },
  },
};
</script>
