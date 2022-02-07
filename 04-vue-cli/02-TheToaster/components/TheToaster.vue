<template>
  <div class="toasts">
    <the-toast v-if="toaster.length" :toaster="toaster" />
  </div>
</template>

<script>
import TheToast from './TheToast.vue';

export default {
  name: 'TheToaster',

  components: {
    TheToast,
  },

  data() {
    return {
      toaster: [],
    };
  },

  methods: {
    success(message) {
      const obj = {
        toastClass: 'toast_success',
        toastMessage: message,
        toastIcon: 'check-circle',
        timeout: 5000,
      };
      this.toaster.push(obj);
      setTimeout(() => this.toaster.splice(0, 1), obj.timeout);
    },

    error(message) {
      const obj = {
        toastClass: 'toast_error',
        toastMessage: message,
        toastIcon: 'alert-circle',
        timeout: 5000,
      };
      this.toaster.push(obj);
      setTimeout(() => this.toaster.splice(0, 1), obj.timeout);
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
