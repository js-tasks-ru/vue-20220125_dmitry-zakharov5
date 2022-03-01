<template>
  <button @click="updateCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: this.count,
    };
  },
  watch: {
    count: {
      handler(newValue) {
        this.localCount = newValue;
      },
    },
    localCount: {
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },

  methods: {
    updateCount() {
      this.localCount += 1;
    },
  },

  emits: ['update:count'],
};
</script>
