import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  props: {
    agenda: Array,
  },
  components: {
    MeetupAgendaItem,
  },

  template: `
    <ul class="agenda" v-for=" event in agenda ">
      <li class="agenda__item">
        <meetup-agenda-item :agenda-item="event"></meetup-agenda-item>
      </li>
    </ul>`,
});
