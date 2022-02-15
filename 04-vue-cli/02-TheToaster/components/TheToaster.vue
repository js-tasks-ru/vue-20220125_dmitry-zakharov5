<template>
  <div class="toasts">
    <toast-list :toaster="toaster" />
  </div>
</template>

<script>
import ToastList from './ToastList.vue';

export default {
  name: 'TheToaster',

  components: {
    ToastList,
  },

  data() {
    return {
      toaster: [],
    };
  },

  methods: {
    success(message) {
      this.addToast(message, 'success');
      this.removeToast(5000);
    },

    error(message) {
      this.addToast(message, 'error');
      this.removeToast(5000);
    },

    addToast(message, type) {
      let uniId = 0;
      const toast = {
        toastId: uniId++,
        toastMessage: message,
        toastType: type,
      };
      this.toaster.push(toast);
    },

    removeToast(timeout) {
      setTimeout(() => this.toaster.splice(0, 1), timeout);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
