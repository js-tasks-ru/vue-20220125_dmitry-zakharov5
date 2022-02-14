import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },



  computed: {
    isosDate() {
      return new Date(this.date).toISOString().substring(0, 10);
    },

    localDate() {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      const lang = navigator.language
      const date = new Date(this.date);
      return date.toLocaleDateString(lang, options);
    }
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="isosDate">{{ localDate }}</time>
      </li>
    </ul>`,
});
