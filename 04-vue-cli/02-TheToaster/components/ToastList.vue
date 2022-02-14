<template>
  <div
    v-for="(item, index) in toaster"
    :key="item.toasterId"
    class="toast"
    :class="{
      'toast_success': item.toastType === 'success',
      'toast_error': item.toastType === 'error',
    }"
  >
    <ui-icon class="toast__icon" :icon="toastIcon[item.toastType]" />
    <slot>{{ item.toastMessage }}</slot>
    <div @click="close(index)" class="toast_button-close">х</div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'ToastList',
  props: {
    toaster: Array,
  },

  components: {
    UiIcon,
  },

  data() {
    return {
      toastIcon: {
        'success': 'check-circle',
        'error': 'alert-circle',
      },
    };
  },

  methods: {
    close(index) {
      this.toaster.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
.toast_button-close {
  margin-left: 10px;
  margin-bottom: 2.5px;
  cursor: pointer;
}
</style>
