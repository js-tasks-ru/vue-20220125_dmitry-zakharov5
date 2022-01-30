import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      require: true,
    }
  },

  computed: {
    iconSrc() {
      if (this.agendaItem.type) { return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg` }
      else { return '/assets/icons/icon-key.png' };
    },

    agendaTitle() {
      if (!this.agendaItem.title) { return agendaItemDefaultTitles[this.agendaItem.type] }
      else { return this.agendaItem.title };
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconSrc" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
        <p v-if=" agendaItem.type === 'talk' " class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if=" agendaItem.description ">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
