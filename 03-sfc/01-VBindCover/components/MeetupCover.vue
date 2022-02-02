<template>
  <div class="meetup-cover">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
      required: false,
      default: 'title',
    },
    image: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      styles: {
        bgImage: `url(${this.image})`,
        bgGradient: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
      },
    };
  },
};
</script>

<style scoped>
.meetup-cover {
  background-size: cover;
  background-position: center;
  background-image: v-bind('styles.bgGradient'), v-bind('styles.bgImage'), var(--default-cover);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
