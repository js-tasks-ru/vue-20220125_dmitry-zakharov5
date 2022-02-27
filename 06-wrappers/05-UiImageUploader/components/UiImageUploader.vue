<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="uploaderClass" :style="uploaderBgImage">
      <span class="image-uploader__text">{{ text }}</span>
      <input
        type="file"
        ref="input"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        :disabled="loading"
        @change="selectImage"
        @click="removeImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  props: {
    preview: String,
    uploader: Function,
  },

  inheritAttrs: false,

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      loading: false,
      url: undefined,
    };
  },

  created() {
    if (this.preview) {
      this.url = this.preview;
    }
  },

  methods: {
    selectImage() {
      const image = this.$refs.input.files[0];
      this.url = URL.createObjectURL(image);
      this.$emit('select', image);
      if (this.uploader) {
        this.uploadImage(image);
      }
    },

    async uploadImage(image) {
      try {
        this.loading = true;
        const res = await this.uploader(image);
        this.$emit('upload', res);
      } catch (err) {
        this.$emit('error', err);
        this.url = undefined;
        this.$refs.input.value = null;
      } finally {
        this.loading = false;
      }
    },

    removeImage(event) {
      if (this.url) {
        event.preventDefault();
        this.url = undefined;
      }
      this.$emit('remove');
      this.$refs.input.value = null;
      return;
    },
  },
  computed: {
    uploaderClass() {
      return {
        'image-uploader__preview-loading': this.loading,
      };
    },

    uploaderBgImage() {
      if (!this.url) {
        return '--bg-url: var(--default-cover)';
      }
      return `--bg-url: url(${this.preview})`;
    },

    text() {
      if (!this.url && !this.loading) {
        return 'Загрузить изображение';
      }
      if (this.loading) {
        return 'Загрузка...';
      }
      if (this.url && !this.loading) {
        return 'Удалить изображение';
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
  background-image: var(--bg-url);
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
